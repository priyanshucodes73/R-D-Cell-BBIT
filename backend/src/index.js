const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const dnsPromises = require('dns').promises;

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Configure multer storage based on UPLOAD_DRIVER
const useS3 = (process.env.UPLOAD_DRIVER || "local").toLowerCase() === "s3";
let upload;
if (useS3) {
  // In-memory storage; we'll stream to S3 from req.file.buffer
  const storageMemory = multer.memoryStorage();
  upload = multer({ storage: storageMemory, limits: { fileSize: 50 * 1024 * 1024 } });
} else {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadsDir),
    filename: (_, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      cb(null, `${uniqueSuffix}-${safeName}`);
    },
  });
  upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });
}

// Setup S3 client if needed
let s3Client = null;
if (useS3) {
  const s3Region = process.env.AWS_REGION || process.env.S3_REGION || "us-east-1";
  s3Client = new S3Client({ region: s3Region });
}

// ── CORS ──
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
  : ["http://localhost:3000", "http://localhost:3005"];

// Build patterns to support exact origins and simple wildcards like '*.vercel.app' or 'https://*.vercel.app'
function patternToRegex(pattern) {
  // Allow a special '*' entry to mean allow-all
  if (pattern === "*") return "*";

  // Replace '*' with a placeholder, escape other regex chars, then restore '.*'
  const placeholder = '<<<WILDCARD>>>';
  const withPlaceholder = pattern.replace(/\*/g, placeholder);
  const escaped = withPlaceholder.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  const regexBody = escaped.replace(new RegExp(placeholder, 'g'), '.*');

  if (!/^https?:\/\//.test(pattern)) {
    // match http or https, allow optional port
    return new RegExp(`^https?:\\/\\/${regexBody}(?::\\d+)?$`);
  }

  return new RegExp(`^${regexBody}$`);
}

const originPatterns = allowedOrigins.map((o) => {
  if (o.includes("*") || o === "*") return patternToRegex(o);
  return o; // exact string
});

function isOriginAllowed(origin) {
  if (!origin) return true; // allow server-to-server or same-origin requests without Origin
  for (const p of originPatterns) {
    if (p === "*") return true;
    if (p instanceof RegExp) {
      if (p.test(origin)) return true;
    } else {
      if (origin === p) return true;
    }
  }
  return false;
}

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = isOriginAllowed(origin);
      console.log(`[CORS] origin=${origin || '(none)'} allowed=${allowed}`);
      // Respect the allow/deny decision when responding to browser requests
      return callback(null, allowed);
    },
    credentials: true,
  })
);

const JWT_SECRET = process.env.JWT_SECRET || "bbit-secret-key-2025";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || "bbit-refresh-secret-2025";

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "30d" });
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  };
}

// Email Configuration
const emailTransporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER || "noreply@bbit.edu.in",
    pass: process.env.EMAIL_PASSWORD || "your-app-password"
  }
});

// Email Templates
const sendVerificationEmail = async (email, verificationToken, firstName) => {
  const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3005"}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"BBIT R&D Cell" <${process.env.EMAIL_USER || "noreply@bbit.edu.in"}>`,
    to: email,
    subject: "Verify Your BBIT Account",
    html: `
      <!DOCTYPE html>
      <html>
  {
    key: "howToApplyPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the how-to-apply page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "internationalPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the international page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "studentServicesPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the student services page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "libraryPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the library page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "programsPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the programs page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "scholarshipPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the scholarship page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "educationLoanPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the education loan page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "registerPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the registration page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "slugPages",
    value: JSON.stringify({}),
    section: "pages",
    description: "Registry of dynamic subpage content keyed by slug.",
    type: "json",
    isPublic: true,
  },
  {
    key: "joinOurTeamPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the join our team page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "innovationEntrepreneurshipPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the innovation and entrepreneurship page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "exploreResearchPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the explore research page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "campusesPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the campuses page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "clubsPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the clubs page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "academicsPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the academics page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "loginPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the login page.",
    type: "json",
    isPublic: true,
  },
  {
    key: "verifyEmailPage",
    value: JSON.stringify({}),
    section: "pages",
    description: "Shared settings block for the email verification page.",
    type: "json",
    isPublic: true,
  },
];

      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to BBIT R&D Cell!</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for registering with Budge Budge Institute of Technology R&D Cell!</p>
            <p>Please verify your email address by clicking the button below:</p>
            <center>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </center>
            <p>Or copy and paste this link in your browser:</p>
            <p style="background: #e5e7eb; padding: 10px; border-radius: 5px; word-break: break-all;">${verificationUrl}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create this account, please ignore this email.</p>
            <p>Best regards,<br>BBIT R&D Cell Team</p>
          </div>
          <div class="footer">
            <p>Budge Budge Institute of Technology<br>Nischintapur, Budge Budge, Kolkata - 700138, West Bengal, India</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    // Ensure fetch is available in Node (node 18+ has global fetch)
    if (typeof fetch === 'undefined') {
      // eslint-disable-next-line global-require
      global.fetch = require('node-fetch');
    }
    await emailTransporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

// Send Contact Form Email Notification
const sendContactFormEmail = async (contactData) => {
  const { name, email, phone, subject, message } = contactData;

  const mailOptions = {
    from: `"BBIT R&D Cell" <${process.env.EMAIL_USER || "noreply@bbit.edu.in"}>`,
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER || "rnd@bbit.edu.in",
    replyTo: email,
    subject: `New Contact Inquiry: ${subject || "General Inquiry"}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #1e3a8a; display: block; margin-bottom: 5px; }
          .value { color: #333; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #3b82f6; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <span class="value">${name || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value">${phone || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="label">Subject:</span>
              <span class="value">${subject || "General Inquiry"}</span>
            </div>
            <div class="message-box">
              <span class="label">Message:</span>
              <div class="value">${message || "No message provided"}</div>
            </div>
            <div style="margin-top: 20px; padding: 10px; background: #e0f2fe; border-radius: 5px;">
              <strong>💡 Quick Actions:</strong><br>
              <a href="mailto:${email}" style="color: #3b82f6;">Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from BBIT R&D Cell Contact Form<br>
            Budge Budge Institute of Technology<br>
            Nischintapur, Budge Budge, Kolkata - 700138</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log(`Contact form notification sent for inquiry from ${email}`);
    return true;
  } catch (error) {
    console.error("Contact email send error:", error);
    return false;
  }
};

// Send Auto-Reply to Contact Form Submitter
const sendContactAutoReply = async (contactData) => {
  const { name, email, subject } = contactData;

  const mailOptions = {
    from: `"BBIT R&D Cell" <${process.env.EMAIL_USER || "noreply@bbit.edu.in"}>`,
    to: email,
    subject: `Thank you for contacting BBIT R&D Cell`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: #e0f2fe; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out!</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting <strong>Budge Budge Institute of Technology R&D Cell</strong>.</p>
            <p>We have received your inquiry regarding: <strong>${subject || "General Inquiry"}</strong></p>
            <p>Our team will review your message and get back to you within 24-48 hours.</p>
            
            <div class="info-box">
              <strong>📞 Need Immediate Assistance?</strong><br>
              Phone: <a href="tel:+913324820641">033-2482-0641</a><br>
              Admission Helpline: <a href="tel:+918420123333">8420123333</a> / <a href="tel:+919836888444">9836888444</a><br>
              Email: <a href="mailto:info@bbit.edu.in">info@bbit.edu.in</a>
            </div>
            
            <p>In the meantime, feel free to explore:</p>
            <ul>
              <li><a href="http://localhost:3005/research-innovation">Our Research Projects</a></li>
              <li><a href="http://localhost:3005/all-publications">Latest Publications</a></li>
              <li><a href="http://localhost:3005/innovation-entrepreneurship">Innovation & Entrepreneurship</a></li>
            </ul>
            
            <p>Best regards,<br>
            <strong>BBIT R&D Cell Team</strong></p>
          </div>
          <div class="footer">
            <p><strong>Budge Budge Institute of Technology</strong><br>
            Nischintapur, Budge Budge, Kolkata - 700138, West Bengal, India<br>
            <a href="http://www.bbit.edu.in">www.bbit.edu.in</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log(`Auto-reply sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Auto-reply email error:", error);
    return false;
  }
};

// Database Configuration
let sequelize; // will be set when models are defined
// Use persistent storage path if available (Railway, etc), otherwise fallback to local
const defaultSQLiteStorage = process.env.SQLITE_STORAGE || (process.env.NODE_ENV === 'production' ? '/app/data/dev.sqlite' : 'dev.sqlite');

// Ensure data directory exists for persistent storage
const ensureDataDirectory = () => {
  if (process.env.NODE_ENV === 'production') {
    const dataDir = path.dirname(defaultSQLiteStorage);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }
};
ensureDataDirectory();

const createPostgresSequelize = (databaseUrl) =>
  new Sequelize(databaseUrl, { dialect: "postgres", logging: false });

const createSqliteSequelize = (storage = defaultSQLiteStorage) => {
  console.log(`Using SQLite storage: ${storage}`);
  return new Sequelize({ dialect: "sqlite", storage, logging: false });
};

// Model placeholders (will be assigned by defineModels)
let Publication,
  ResearchProject,
  Faculty,
  ContactInquiry,
  Registration,
  NewsEvent,
  Patent,
  SiteSetting,
  AuditLog,
  User;

function defineModels(sq) {
  sequelize = sq;

  Publication = sequelize.define(
    "Publication",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.TEXT, allowNull: false },
      authors: { type: DataTypes.TEXT },
      journal: { type: DataTypes.STRING },
      year: { type: DataTypes.INTEGER },
      doi: { type: DataTypes.STRING },
      impactFactor: { type: DataTypes.STRING },
      citation_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      type: { type: DataTypes.STRING },
      abstract: { type: DataTypes.TEXT },
      keywords: { type: DataTypes.STRING },
      imageUrl: { type: DataTypes.STRING },
      featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: true }
  );

  ResearchProject = sequelize.define(
    "ResearchProject",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.TEXT, allowNull: false },
      principalInvestigator: { type: DataTypes.STRING },
      department: { type: DataTypes.STRING },
      fundingAgency: { type: DataTypes.STRING },
      fundingAmount: { type: DataTypes.STRING },
      startDate: { type: DataTypes.DATEONLY },
      endDate: { type: DataTypes.DATEONLY },
      imageUrl: { type: DataTypes.STRING },
      featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      status: { type: DataTypes.STRING, defaultValue: "Ongoing" },
      description: { type: DataTypes.TEXT },
      progress: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { timestamps: true }
  );

  Faculty = sequelize.define(
    "Faculty",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true },
      department: { type: DataTypes.STRING },
      designation: { type: DataTypes.STRING },
      specialization: { type: DataTypes.STRING },
      qualifications: { type: DataTypes.TEXT },
      experience: { type: DataTypes.INTEGER },
      publications: { type: DataTypes.INTEGER, defaultValue: 0 },
      projects: { type: DataTypes.INTEGER, defaultValue: 0 },
      researchInterests: { type: DataTypes.TEXT },
      phone: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );

  ContactInquiry = sequelize.define(
    "ContactInquiry",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      subject: { type: DataTypes.STRING },
      message: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.STRING, defaultValue: "pending" },
      responseMessage: { type: DataTypes.TEXT },
    },
    { timestamps: true }
  );

  Registration = sequelize.define(
    "Registration",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      registrationType: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      program: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      previousEducation: { type: DataTypes.TEXT },
      rollNumber: { type: DataTypes.STRING },
      branch: { type: DataTypes.STRING },
      eventName: { type: DataTypes.STRING },
      participants: { type: DataTypes.INTEGER, defaultValue: 1 },
      status: { type: DataTypes.STRING, defaultValue: "pending" },
      additionalInfo: { type: DataTypes.TEXT },
    },
    { timestamps: true }
  );

  NewsEvent = sequelize.define(
    "NewsEvent",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      description: { type: DataTypes.TEXT },
      imageUrl: { type: DataTypes.STRING },
      venue: { type: DataTypes.STRING },
      organizer: { type: DataTypes.STRING },
      featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { timestamps: true }
  );

  SiteSetting = sequelize.define(
    "SiteSetting",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      key: { type: DataTypes.STRING, allowNull: false, unique: true },
      // `value` kept for backward compatibility; prefer `publishedValue`/`draftValue`
      value: { type: DataTypes.TEXT },
      draftValue: { type: DataTypes.TEXT },
      publishedValue: { type: DataTypes.TEXT },
      section: { type: DataTypes.STRING, defaultValue: "general" },
      description: { type: DataTypes.TEXT },
      type: { type: DataTypes.STRING, defaultValue: "text" },
      isPublic: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { timestamps: true }
  );

  AuditLog = sequelize.define(
    "AuditLog",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      action: { type: DataTypes.STRING, allowNull: false },
      scope: { type: DataTypes.STRING, defaultValue: "Content" },
      description: { type: DataTypes.TEXT, allowNull: false },
      entityType: { type: DataTypes.STRING },
      entityId: { type: DataTypes.STRING },
      actorEmail: { type: DataTypes.STRING },
      actorRole: { type: DataTypes.STRING },
      metadata: { type: DataTypes.TEXT },
    },
    { timestamps: true }
  );

  Patent = sequelize.define(
    "Patent",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.TEXT, allowNull: false },
      inventors: { type: DataTypes.TEXT },
      patentNumber: { type: DataTypes.STRING },
      applicationNumber: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      filingDate: { type: DataTypes.DATEONLY },
      grantDate: { type: DataTypes.DATEONLY },
      description: { type: DataTypes.TEXT },
      department: { type: DataTypes.STRING },
    },
    { timestamps: true }
  );

  User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: "user" },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      verificationToken: { type: DataTypes.STRING },
      verificationTokenExpiry: { type: DataTypes.DATE },
      lastLogin: { type: DataTypes.DATE },
      resetPasswordToken: { type: DataTypes.STRING },
      resetPasswordExpiry: { type: DataTypes.DATE },
      refreshToken: { type: DataTypes.TEXT },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  // User instance methods
  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.generateAuthToken = function () {
    return jwt.sign({ id: this.id, email: this.email, role: this.role }, JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" });
  };
}

const defaultSiteSettings = [
  {
    key: "siteName",
    value: "BBIT R&D Cell",
    section: "branding",
    description: "Displayed as the site name across the website.",
    type: "text",
    isPublic: true,
  },
  {
    key: "topAnnouncement",
    value: "Register Now for Admission at BBIT - Budge Budge Institute of Technology",
    section: "header",
    description: "Top announcement bar text on the homepage.",
    type: "text",
    isPublic: true,
  },
  {
    key: "admissionHelpline",
    value: "8420123333/9836888444",
    section: "header",
    description: "Admission helpline number shown on the homepage.",
    type: "text",
    isPublic: true,
  },
  {
    key: "heroTitle",
    value: "Research, Innovation, and Entrepreneurship at BBIT",
    section: "home",
    description: "Primary hero title on the homepage.",
    type: "text",
    isPublic: true,
  },
  {
    key: "heroSubtitle",
    value: "A living research platform where faculty, students, and industry collaborate.",
    section: "home",
    description: "Supporting text under the hero title.",
    type: "text",
    isPublic: true,
  },
  {
    key: "upperNavLinks",
    value: JSON.stringify([
      { name: "CAMPUSES", href: "/campuses" },
      { name: "INTERNATIONAL", href: "/international" },
      { name: "LIBRARY", href: "/library" },
      { name: "STUDENT SERVICES", href: "/student-services" },
      { name: "CAREER", href: "/career" },
      { name: "CONTACT US", href: "/contact-us" },
    ]),
    section: "navigation",
    description: "Top utility navigation links.",
    type: "json",
    isPublic: true,
  },
  {
    key: "socialLinks",
    value: JSON.stringify([
      { name: "Whatsapp", href: "#" },
      { name: "Call", href: "tel:03324820641" },
      { name: "360", href: "#" },
      { name: "Facebook", href: "https://www.facebook.com/bbitofficial" },
      { name: "Twitter", href: "https://x.com/BbitCollege" },
      { name: "LinkedIn", href: "https://www.linkedin.com/school/budge-budge-institute-of-technology/" },
      { name: "Instagram", href: "https://www.instagram.com/bbitofficials/" },
      { name: "YouTube", href: "https://www.youtube.com/@bbitengg" },
    ]),
    section: "navigation",
    description: "Homepage social bar links.",
    type: "json",
    isPublic: true,
  },
  {
    key: "mainNavLinks",
    value: JSON.stringify([
      { name: "ABOUT", href: "/about" },
      { name: "PROGRAMS", href: "/programs" },
      { name: "ACADEMICS", href: "/academics" },
      { name: "ADMISSIONS", href: "/register" },
      { name: "CAMPUS LIFE", href: "/campus-life" },
      { name: "CLUBS & GROUPS", href: "/clubs" },
      { name: "PLACEMENTS", href: "/placements" },
      { name: "RESEARCH & DEVELOPMENT", href: "/research-innovation" },
    ]),
    section: "navigation",
    description: "Main navigation links in the homepage header.",
    type: "json",
    isPublic: true,
  },
  {
    key: "heroSlides",
    value: JSON.stringify([
      {
        image: "/event-slide-1.jpg",
        title: "Innovation & Entrepreneurship",
        subtitle:
          "Firmly established as a rapidly rising hub of excellence for innovation and entrepreneurship, BBIT actively nurtures and empowers creative ideas across diverse fields.",
        ctaLabel: "Read More",
        ctaHref: "/innovation-entrepreneurship",
      },
      {
        image: "/campus-slide-2.jpg",
        title: "Research-led Campus Life",
        subtitle:
          "Modern labs, collaborative learning, and an ecosystem designed for applied research and discovery.",
        ctaLabel: "Explore Research",
        ctaHref: "/explore-research",
      },
      {
        image: "/campus-slide-3.jpg",
        title: "Industry Collaboration",
        subtitle:
          "Partnerships with industry and research institutes that convert ideas into impact.",
        ctaLabel: "Our Projects",
        ctaHref: "/all-projects",
      },
      {
        image: "/students-slide-4.jpg",
        title: "Student Innovation",
        subtitle:
          "Students drive innovation through clubs, research, hackathons, and entrepreneurship activities.",
        ctaLabel: "Join Our Team",
        ctaHref: "/join-our-team",
      },
    ]),
    section: "homepage",
    description: "Homepage carousel slides.",
    type: "json",
    isPublic: true,
  },
  {
    key: "aboutTitle",
    value: "About BBIT R&D Cell",
    section: "home",
    description: "Heading for the about section on the homepage.",
    type: "text",
    isPublic: true,
  },
  {
    key: "aboutBody",
    value: "BBIT R&D Cell promotes research excellence, innovation, and entrepreneurship through projects, publications, patents, and industry collaboration.",
    section: "home",
    description: "About section body text on the homepage.",
    type: "text",
    isPublic: true,
  },
  {
    key: "aboutPage",
    value: JSON.stringify({
      heroTitle: "About BBIT",
      heroSubtitle:
        "Building future leaders through excellence in education, research, and innovation",
      overview: [
        "Budge Budge Institute of Technology (BBIT) is a technical institute whose main objective is to produce result-oriented and skilled professionals to meet the ever-growing demands of industries.",
        "The Institute seeks to set up a supportive environment the essence of which is care. We care for each one who enters the portal of our institution.",
        "In a larger context the BBIT intends to provide quality education on which the country can depend. The curriculum is up to date to effectively fulfill the technological requirement of India.",
      ],
      vision: "To realize the full potential of knowledge through universal education and research so as to foster a new era of development and growth through innovations.",
      mission: [
        "To open new horizons of knowledge and to promote academic growth by offering state-of-the-art undergraduate, postgraduate and research programmes.",
        "To keep pace with regional, national and global needs.",
        "To play a pioneering role in shaping future generations through collaboration between academia and industry as well as between different national and international institutions.",
      ],
      aims: [
        "Latest technology to meet the demands of front-end industries.",
        "High teacher-student ratio to ensure better interface.",
        "Impart personality traits in students to ensure bright career.",
        "Expose the students to industrial climate and practical problems.",
        "Improve communication skills, creativity and leadership qualities among students.",
      ],
      values: [
        { title: "Excellence", desc: "Striving for the highest standards in everything we do." },
        { title: "Integrity", desc: "Upholding honesty, transparency, and ethical conduct." },
        { title: "Innovation", desc: "Encouraging creativity and out-of-the-box thinking." },
        { title: "Learning", desc: "Fostering continuous learning and development." },
        { title: "Diversity", desc: "Celebrating inclusive and multicultural environment." },
        { title: "Responsibility", desc: "Contributing positively to society and environment." },
      ],
    }),
    section: "pages",
    description: "About page content blocks.",
    type: "json",
    isPublic: true,
  },
  {
    key: "contactPage",
    value: JSON.stringify({
      heroTitle: "Get in Touch",
      heroSubtitle: "We're here to answer your questions and assist you",
      cards: [
        { icon: "📞", title: "Call Us", content: "(033) 2482 0641", subtext: "Mon-Sat: 9 AM - 6 PM" },
        { icon: "📧", title: "Email Us", content: "contact@bbit.edu.in", subtext: "Response within 24 hours" },
        { icon: "📍", title: "Visit Us", content: "Nischintapur, Budge Budge", subtext: "Kolkata - 700138, West Bengal" },
        { icon: "💬", title: "Admission Helpline", content: "8420123333 / 9836888444", subtext: "B.Tech & Polytechnic" },
      ],
      officeAddress: [
        "Budge Budge Institute of Technology (BBIT)",
        "Nischintapur, Budge Budge",
        "Kolkata - 700138, West Bengal, India",
      ],
      contactNumbers: [
        "Phone: (033) 2482 0641",
        "Admission: 8420123333 / 9836888444",
      ],
      officeHours: [
        { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
        { day: "Saturday", time: "9:00 AM - 2:00 PM" },
        { day: "Sunday", time: "Closed" },
      ],
    }),
    section: "pages",
    description: "Contact page content blocks.",
    type: "json",
    isPublic: true,
  },
  {
    key: "admissionsPage",
    value: JSON.stringify({
      heroTitle: "BBIT Admissions 2025",
      heroSubtitle: "Begin your journey to excellence. Join BBIT's world-class academic programs",
      quickLinks: [
        { title: "How to Apply", href: "/how-to-apply", desc: "Step-by-step application process", icon: "FaFileAlt" },
        { title: "Scholarships", href: "/scholarship", desc: "Financial aid options available", icon: "FaRupeeSign" },
        { title: "Education Loan", href: "/education-loan", desc: "Easy financing options", icon: "FaRupeeSign" },
        { title: "Apply Now", href: "/register", desc: "Start your application today", icon: "FaUserGraduate" },
      ],
      process: [
        { step: "1", title: "Registration", desc: "Create your account and fill the application form online" },
        { step: "2", title: "Entrance Exam", desc: "Appear for JEE Main/WBJEE or BBIT entrance test" },
        { step: "3", title: "Counseling", desc: "Participate in counseling process based on your rank" },
        { step: "4", title: "Document Verification", desc: "Submit all required documents for verification" },
        { step: "5", title: "Fee Payment", desc: "Complete admission by paying the fees" },
      ],
      programs: [
        { level: "B.Tech", programs: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "IT"], seats: 60 },
        { level: "M.Tech", programs: ["CSE", "ECE", "Mechanical", "Structural"], seats: 18 },
        { level: "MBA", programs: ["General Management", "Marketing", "Finance", "HR"], seats: 120 },
        { level: "MCA", programs: ["Computer Applications", "Data Science"], seats: 60 },
        { level: "B.Sc", programs: ["Physics", "Chemistry", "Mathematics"], seats: 40 },
        { level: "M.Sc", programs: ["Physics", "Chemistry", "Mathematics"], seats: 20 },
      ],
    }),
    section: "pages",
    description: "Admissions page content blocks.",
    type: "json",
    isPublic: true,
  },
  {
    key: "footerAddress",
    value: "Budge Budge Institute of Technology\nNischintapur, Budge Budge\nKolkata - 700 138, West Bengal, India",
    section: "footer",
    description: "Postal address shown in the footer.",
    type: "textarea",
    isPublic: true,
  },
  {
    key: "footerPhone",
    value: "033-2482-0641",
    section: "footer",
    description: "Main phone number in the footer.",
    type: "text",
    isPublic: true,
  },
  {
    key: "footerHelpline",
    value: "8420123333 / 9836888444",
    section: "footer",
    description: "Student helpline number in the footer.",
    type: "text",
    isPublic: true,
  },
  {
    key: "footerEmail",
    value: "contact@bbit.edu.in",
    section: "footer",
    description: "Contact email shown in the footer.",
    type: "text",
    isPublic: true,
  },
  {
    key: "footerCopyright",
    value: "Copyright © 2025. BBIT. All Rights Reserved.",
    section: "footer",
    description: "Footer copyright notice.",
    type: "text",
    isPublic: true,
  },
  {
    key: "footerLinks",
    value: JSON.stringify([
      {
        title: "Apply Here",
        links: [
          { name: "BBIT Admissions", href: "/admissions" },
          { name: "BBIT Education Loan", href: "/education-loan" },
          { name: "How to Apply?", href: "/how-to-apply" },
          { name: "BBIT Scholarship", href: "/scholarship" },
          { name: "BBIT Admission Office", href: "/admission-office" },
          { name: "BBIT Student Feedback", href: "/student-feedback" },
          { name: "BBIT Student Facilitation", href: "/student-services" },
          { name: "BBIT International Student Facilitation", href: "/international" },
          { name: "BBIT Alumni Membership", href: "/alumni" },
          { name: "eSanad", href: "/esanad" },
          { name: "Guinness World Records", href: "/guinness" },
        ],
      },
      {
        title: "Learn Here",
        links: [
          { name: "IQAC", href: "/iqac" },
          { name: "Organogram", href: "/organogram" },
          { name: "Other Committees", href: "/committees" },
          { name: "Pay Fee Online", href: "/pay-fee" },
          { name: "BBIT Institutes", href: "/institutes" },
          { name: "Teaching Practices", href: "/teaching-practices" },
          { name: "System of Evaluation", href: "/evaluation" },
          { name: "BBIT Placements", href: "/placements" },
          { name: "Clubs & Groups", href: "/clubs" },
          { name: "BBIT Edge", href: "/bbit-edge" },
          { name: "QS Asia Rankings 2024", href: "/qs-rankings" },
          { name: "NIRF Rankings 2025", href: "/nirf-rankings" },
          { name: "BBIT Unnao Campus", href: "/campuses" },
        ],
      },
      {
        title: "Visit Here",
        links: [
          { name: "RTI", href: "/rti" },
          { name: "Grievance", href: "/grievance" },
          { name: "BBIT News", href: "/news" },
          { name: "BBIT Blog", href: "/blog" },
          { name: "Alumni", href: "/alumni" },
          { name: "Maps", href: "/maps" },
          { name: "Distance Calculator", href: "/distance-calculator" },
          { name: "About Budge Budge", href: "/about-budge-budge" },
          { name: "QS World University Rankings", href: "/qs-world-rankings" },
          { name: "ABET Accreditation", href: "/abet" },
          { name: "QS World University Rankings by Subject 2025", href: "/qs-subject-rankings" },
        ],
      },
      {
        title: "Live Here",
        links: [
          { name: "BBIT Hostels", href: "/hostels" },
          { name: "BBIT Transport", href: "/transport" },
          { name: "BBIT Sports", href: "/sports" },
          { name: "Cultural Activities", href: "/cultural" },
          { name: "BBIT Student Welfare", href: "/student-welfare" },
          { name: "BBIT Libraries", href: "/library" },
          { name: "e-Samadhan", href: "/e-samadhan" },
          { name: "Discipline & Student Conduct", href: "/discipline" },
        ],
      },
      {
        title: "Others",
        links: [
          { name: "Courses Fee Details", href: "/fee-details" },
          { name: "Student Grievance Redressal Cell", href: "/grievance-cell" },
          { name: "Ombudsperson", href: "/ombudsperson" },
          { name: "Procedures And Policies", href: "/policies" },
          { name: "PPCB Report", href: "/ppcb-report" },
          { name: "Mandatory Disclosure", href: "/mandatory-disclosure" },
          { name: "Disclaimer", href: "/disclaimer" },
          { name: "UGC - Public Self Disclosure document", href: "/ugc-disclosure" },
          { name: "e-SCR Report", href: "/escr-report" },
        ],
      },
    ]),
    section: "footer",
    description: "Footer navigation columns and link groups.",
    type: "json",
    isPublic: true,
  },
  {
    key: "facebookUrl",
    value: "https://www.facebook.com/bbitofficial",
    section: "social",
    description: "Facebook profile URL.",
    type: "text",
    isPublic: true,
  },
  {
    key: "twitterUrl",
    value: "https://x.com/BbitCollege",
    section: "social",
    description: "Twitter/X profile URL.",
    type: "text",
    isPublic: true,
  },
  {
    key: "linkedinUrl",
    value: "https://www.linkedin.com/school/budge-budge-institute-of-technology/",
    section: "social",
    description: "LinkedIn profile URL.",
    type: "text",
    isPublic: true,
  },
  {
    key: "instagramUrl",
    value: "https://www.instagram.com/bbitofficials/",
    section: "social",
    description: "Instagram profile URL.",
    type: "text",
    isPublic: true,
  },
  {
    key: "youtubeUrl",
    value: "https://www.youtube.com/@bbitengg",
    section: "social",
    description: "YouTube channel URL.",
    type: "text",
    isPublic: true,
  },
  {
    key: "placementsPage",
    value: JSON.stringify({
      heroTitle: "Placement & Career Development",
      heroSubtitle: "Empowering students with skills and opportunities for successful careers",
      placementStats: [
        { label: "Placement Rate", value: "95%", icon: "📈", color: "green" },
        { label: "Average Package", value: "₹12 LPA", icon: "💰", color: "blue" },
        { label: "Highest Package", value: "₹45 LPA", icon: "🚀", color: "purple" },
        { label: "Companies Visited", value: "300+", icon: "🏢", color: "orange" },
      ],
      placementProcess: [
        { step: "1", title: "Pre-Placement Training", description: "Comprehensive training on aptitude, technical skills, and soft skills", duration: "6 months" },
        { step: "2", title: "Resume Building", description: "Professional guidance to create impactful resumes and portfolios", duration: "2 weeks" },
        { step: "3", title: "Mock Interviews", description: "Multiple rounds of mock interviews with industry experts", duration: "Ongoing" },
        { step: "4", title: "Company Registration", description: "Students register for companies based on eligibility criteria", duration: "As per schedule" },
        { step: "5", title: "Placement Drives", description: "On-campus and virtual recruitment drives throughout the year", duration: "Sep - Apr" },
        { step: "6", title: "Offer & Onboarding", description: "Final offers, documentation, and joining formalities", duration: "Post selection" },
      ],
      industryWise: [
        { industry: "IT Services", companies: 120, avgPackage: "₹8 LPA", placements: "450+" },
        { industry: "Product Based", companies: 45, avgPackage: "₹18 LPA", placements: "80+" },
        { industry: "Consulting", companies: 35, avgPackage: "₹12 LPA", placements: "65+" },
        { industry: "Core Engineering", companies: 40, avgPackage: "₹9 LPA", placements: "70+" },
        { industry: "Finance & Banking", companies: 25, avgPackage: "₹15 LPA", placements: "40+" },
        { industry: "Analytics", companies: 20, avgPackage: "₹10 LPA", placements: "35+" },
        { industry: "EdTech", companies: 15, avgPackage: "₹8 LPA", placements: "25+" },
      ],
      successStories: [
        { name: "Ananya Gupta", company: "Google", package: "₹45 LPA", branch: "B.Tech CSE", year: "2024", quote: "The placement cell prepared me thoroughly for Google's rigorous interview process." },
        { name: "Vikram Singh", company: "Microsoft", package: "₹42 LPA", branch: "B.Tech CSE", year: "2024", quote: "Mock interviews and coding practice sessions were instrumental in my success." },
        { name: "Sneha Reddy", company: "Goldman Sachs", package: "₹40 LPA", branch: "MBA Finance", year: "2024", quote: "The industry exposure and mentorship helped me land my dream finance role." },
      ],
      placementTeam: [
        { name: "Prof. Rajesh Khanna", designation: "Director - Training & Placements", experience: "20+ years", specialization: "Career Guidance" },
        { name: "Dr. Meera Sharma", designation: "Deputy Director - Placements", experience: "15+ years", specialization: "Industry Relations" },
        { name: "Mr. Amit Patel", designation: "Training Coordinator", experience: "10+ years", specialization: "Technical Training" },
        { name: "Ms. Priya Kapoor", designation: "Soft Skills Trainer", experience: "8+ years", specialization: "Communication & Personality" },
      ],
    }),
    section: "pages",
    description: "Placements page content blocks.",
    type: "json",
    isPublic: true,
  },
  {
    key: "researchInnovationPage",
    value: JSON.stringify({
      heroTitle: "Research & Development",
      heroSubtitle: "Advancing knowledge through cutting-edge research and fostering innovation",
      researchStats: [
        { label: "Research Projects", value: "150+", icon: "🧪" },
        { label: "Publications (2024)", value: "250+", icon: "📝" },
        { label: "Patents Filed", value: "35", icon: "📜" },
        { label: "Research Grants", value: "₹50Cr+", icon: "💵" },
      ],
      researchCenters: [
        { name: "AI & Machine Learning Lab", head: "Dr. Rajesh Kumar", focus: "Deep Learning, NLP, Computer Vision", projects: 25, publications: 45, funding: "₹5 Cr", icon: "🧠" },
        { name: "IoT Research Center", head: "Dr. Priya Sharma", focus: "Smart Cities, Industrial IoT, Edge Computing", projects: 20, publications: 35, funding: "₹4 Cr", icon: "📡" },
        { name: "Cybersecurity Lab", head: "Dr. Amit Verma", focus: "Blockchain, Ethical Hacking, Data Privacy", projects: 18, publications: 30, funding: "₹3.5 Cr", icon: "🔒" },
        { name: "Robotics & Automation Center", head: "Dr. Sunita Reddy", focus: "Industrial Robots, Drones, Autonomous Systems", projects: 15, publications: 28, funding: "₹4.5 Cr", icon: "🤖" },
        { name: "Data Science Lab", head: "Dr. Vikram Singh", focus: "Big Data Analytics, Predictive Modeling, BI", projects: 22, publications: 40, funding: "₹3 Cr", icon: "📊" },
        { name: "Renewable Energy Lab", head: "Dr. Meena Joshi", focus: "Solar Energy, Wind Power, Energy Storage", projects: 12, publications: 25, funding: "₹6 Cr", icon: "⚡" },
      ],
      ongoingProjects: [
        { title: "AI-Powered Healthcare Diagnostics", pi: "Dr. Rajesh Kumar", funding: "SERB - ₹80 Lakhs", duration: "2023-2026", status: "Ongoing", progress: 65, desc: "Developing AI models for early detection of diseases using medical imaging" },
        { title: "Smart City Infrastructure Monitoring", pi: "Dr. Priya Sharma", funding: "DST - ₹1.2 Cr", duration: "2024-2027", status: "Ongoing", progress: 40, desc: "IoT-based real-time monitoring system for urban infrastructure" },
        { title: "Blockchain for Supply Chain Security", pi: "Dr. Amit Verma", funding: "ICSSR - ₹60 Lakhs", duration: "2023-2025", status: "Ongoing", progress: 80, desc: "Implementing blockchain technology for transparent supply chain management" },
        { title: "Autonomous Agricultural Robots", pi: "Dr. Sunita Reddy", funding: "ICAR - ₹1.5 Cr", duration: "2024-2028", status: "Ongoing", progress: 35, desc: "Developing autonomous robots for precision agriculture and crop monitoring" },
      ],
      publications: [
        { title: "Deep Learning Approaches for Medical Image Analysis", authors: "Dr. Rajesh Kumar, et al.", journal: "IEEE Transactions on Medical Imaging", year: "2024", impact: "10.5" },
        { title: "IoT-Enabled Smart Grid Management System", authors: "Dr. Priya Sharma, et al.", journal: "Journal of Network and Computer Applications", year: "2024", impact: "7.2" },
        { title: "Blockchain-Based Secure Data Sharing Framework", authors: "Dr. Amit Verma, et al.", journal: "Computers & Security", year: "2024", impact: "5.8" },
        { title: "Autonomous Navigation for Mobile Robots", authors: "Dr. Sunita Reddy, et al.", journal: "Robotics and Autonomous Systems", year: "2024", impact: "6.5" },
      ],
      patents: [
        { title: "AI-Based Disease Prediction System", inventors: "Dr. Rajesh Kumar, Dr. Meena Joshi", number: "IN 202411023456", status: "Granted", year: "2024" },
        { title: "Smart Energy Management Device", inventors: "Dr. Priya Sharma, Dr. Vikram Singh", number: "IN 202411034567", status: "Granted", year: "2024" },
        { title: "Blockchain-Based Authentication System", inventors: "Dr. Amit Verma", number: "IN 202411045678", status: "Filed", year: "2024" },
        { title: "Autonomous Crop Monitoring Robot", inventors: "Dr. Sunita Reddy, Dr. Rajesh Kumar", number: "IN 202411056789", status: "Filed", year: "2024" },
      ],
      innovationPrograms: [
        { name: "Innovation Hub", description: "State-of-the-art facility for prototyping and product development", capacity: "100 projects", equipment: "3D Printers, Laser Cutters, Electronics Lab", icon: "💡" },
        { name: "Startup Incubator", description: "Support for student and faculty startups with funding and mentorship", startups: "25 active", funding: "Up to ₹10 Lakhs/startup", icon: "🚀" },
        { name: "Industry Collaboration", description: "Partnerships with leading companies for joint research projects", partners: "50+ companies", projects: "80+ collaborative", icon: "🤝" },
        { name: "Research Internships", description: "Opportunities for students to work on cutting-edge research", students: "200+ annually", stipend: "₹10K-25K/month", icon: "👨‍🔬" },
      ],
      fundingSources: [
        { name: "DST (Department of Science & Technology)", projects: 25, amount: "₹15 Cr" },
        { name: "SERB (Science & Engineering Research Board)", projects: 18, amount: "₹8 Cr" },
        { name: "AICTE (All India Council for Technical Education)", projects: 15, amount: "₹5 Cr" },
        { name: "ICSSR (Indian Council of Social Science Research)", projects: 10, amount: "₹3 Cr" },
        { name: "Industry Funded Projects", projects: 35, amount: "₹12 Cr" },
        { name: "International Collaborations", projects: 12, amount: "₹7 Cr" },
      ],
    }),
    section: "pages",
    description: "Research & development page content blocks.",
    type: "json",
    isPublic: true,
  },
  {
    key: "careerPage",
    value: JSON.stringify({
      heroTitle: "Career Development & Placements",
      heroSubtitle: "Building careers and connecting talent with opportunities",
      stats: [
        { value: "95%", label: "Placement Rate" },
        { value: "₹12 LPA", label: "Average Package" },
        { value: "₹45 LPA", label: "Highest Package" },
        { value: "300+", label: "Recruiters" },
        { value: "2000+", label: "Offers (2024)" },
      ],
    }),
    section: "pages",
    description: "Career page content blocks.",
    type: "json",
    isPublic: true,
  },
  {
    key: "campusLifePage",
    value: JSON.stringify({
      heroTitle: "Vibrant Campus Life",
      heroSubtitle: "Experience a dynamic blend of academics, culture, sports, and innovation",
      stats: [
        { value: "50+", label: "Student Clubs" },
        { value: "200+", label: "Annual Events" },
        { value: "15,000+", label: "Active Students" },
        { value: "40+", label: "Sports Facilities" },
      ],
    }),
    section: "pages",
    description: "Campus life page content blocks.",
    type: "json",
    isPublic: true,
  },
];

function normalizeDefaultSetting(setting) {
  return {
    ...setting,
    // set both publishedValue and draftValue to the default value
    publishedValue: typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value),
    draftValue: typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value),
    value: typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value),
  };
}



// ==================== DATABASE INITIALIZATION ====================
async function init() {
  try {
    // Try Postgres if env is present, otherwise use SQLite
    let dbSequelize;
    if (process.env.DATABASE_URL || (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)) {
      const pgUrl = process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`;

      const pg = createPostgresSequelize(pgUrl);
      try {
        await pg.authenticate();
        console.log("DB connected (Postgres)");
        dbSequelize = pg;
        defineModels(pg);
      } catch (err) {
        console.error("Postgres connection failed, falling back to SQLite:", err && err.message ? err.message : err);
        const sqlite = createSqliteSequelize();
        dbSequelize = sqlite;
        defineModels(sqlite);
      }
    } else {
      const sqlite = createSqliteSequelize();
      dbSequelize = sqlite;
      defineModels(sqlite);
      console.log(`No DATABASE_URL found — using SQLite fallback: ${defaultSQLiteStorage}`);
    }

    // Sync models to database to create base schema (if not already created)
    try {
      await dbSequelize.sync({ alter: false }); // false = don't modify existing tables
      if (AuditLog) {
        await AuditLog.sync();
      }
      console.log("Database schema synced");
    } catch (e) {
      console.error("Database sync error", e && e.message ? e.message : e);
      throw e;
    }

    // Use Umzug with SequelizeStorage to run migrations in /migrations
    try {
      const { Umzug, SequelizeStorage } = require("umzug");

      const umzug = new Umzug({
        migrations: {
          // migrations are CommonJS modules exporting `up` (and optional `down`)
          glob: path.join(__dirname, "..", "migrations", "*.js"),
        },
        context: dbSequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize: dbSequelize }),
        logger: console,
      });

      const pending = await umzug.pending();
      if (pending && pending.length) {
        console.log(`Running ${pending.length} pending migrations`);
        await umzug.up();
      } else {
        console.log("No pending migrations");
      }
    } catch (e) {
      console.error("Migration runner error", e && e.stack ? e.stack : e);
      throw e;
    }

    // Seed Publications
    const pubCount = await Publication.count();
    if (pubCount === 0) {
      await Publication.bulkCreate([
        {
          title: "Deep Learning Approaches for Early Detection of Cardiovascular Diseases",
          authors: "Dr. Jayanta Basak, Dr. Moumita Paul, Dr. Sagar Chakraborty",
          journal: "IEEE Transactions on Medical Imaging",
          year: 2024,
          doi: "10.1109/TMI.2024.12345",
          citation_count: 45,
          impactFactor: "10.5",
          imageUrl: "/pubs/dl-cvd.jpg",
          type: "Journal",
          abstract: "Novel deep learning framework for early detection of cardiovascular diseases through automated ECG analysis.",
          keywords: "Deep Learning, Healthcare, ECG, Cardiovascular",
        },
        {
          title: "IoT-Based Smart Campus Infrastructure for Sustainable Energy Management",
          authors: "Dr. Sandeep Malik, Dr. Uddyalok Chakraborty, Priya Sharma",
          journal: "Journal of Network and Computer Applications",
          year: 2024,
          doi: "10.1016/j.jnca.2024.45678",
          citation_count: 32,
          impactFactor: "7.2",
          imageUrl: "/pubs/iot-campus.jpg",
          type: "Journal",
          abstract: "Comprehensive IoT-based infrastructure for campus-wide energy management.",
          keywords: "IoT, Smart Campus, Energy Management, Sustainability",
        },
      ]);
      console.log("Seeded publications");
    }

    // Seed Faculty
    const facultyCount = await Faculty.count();
    if (facultyCount === 0) {
      await Faculty.bulkCreate([
        {
          name: "Dr. Jayanta Basak",
          email: "jayanta.basak@bbit.edu.in",
          department: "Computer Science",
          designation: "Professor",
          specialization: "AI & Machine Learning",
          qualifications: "Ph.D. in Computer Science, M.Tech, B.Tech",
          experience: 15,
          publications: 45,
          researchInterests: "Deep Learning, Computer Vision, Natural Language Processing",
          phone: "+91-9876543210",
        },
        {
          name: "Dr. Sandeep Malik",
          email: "sandeep.malik@bbit.edu.in",
          department: "Electronics",
          designation: "Associate Professor",
          specialization: "IoT Systems",
          qualifications: "Ph.D. in Electronics Engineering, M.Tech",
          experience: 12,
          publications: 38,
          researchInterests: "Internet of Things, Smart Cities, Embedded Systems",
          phone: "+91-9876543211",
        },
      ]);
      console.log("Seeded faculty");
    }

    // Seed Research Projects
    const projectCount = await ResearchProject.count();
    if (projectCount === 0) {
      await ResearchProject.bulkCreate([
        {
          title: "AI-Powered Healthcare Diagnosis System",
          principalInvestigator: "Dr. Jayanta Basak",
          department: "Computer Science",
          fundingAgency: "DST-SERB",
          fundingAmount: "₹80 Lakhs",
          startDate: "2023-01-01",
          endDate: "2026-12-31",
          status: "Ongoing",
          description: "Developing an AI-based diagnostic tool for early detection of diseases using medical imaging",
          progress: 65,
        },
        {
          title: "Smart Campus IoT Infrastructure",
          principalInvestigator: "Dr. Sandeep Malik",
          department: "Electronics",
          fundingAgency: "Industry Collaboration",
          fundingAmount: "₹1.2 Cr",
          startDate: "2023-07-01",
          endDate: "2025-06-30",
          status: "Ongoing",
          description: "Implementing IoT sensors and analytics for energy optimization across campus",
          progress: 75,
        },
      ]);
      console.log("Seeded research projects");
    }

    // Seed Patents
    const patentCount = await Patent.count();
    if (patentCount === 0) {
      await Patent.bulkCreate([
        {
          title: "AI-Based Disease Prediction System",
          inventors: "Dr. Jayanta Basak, Dr. Moumita Paul",
          patentNumber: "IN 202411023456",
          status: "Granted",
          filingDate: "2023-05-15",
          grantDate: "2024-08-20",
          description: "A novel AI system for predicting cardiovascular diseases",
          department: "Computer Science",
        },
        {
          title: "Smart Energy Management Device",
          inventors: "Dr. Sandeep Malik, Dr. Vikram Singh",
          patentNumber: "IN 202411034567",
          status: "Granted",
          filingDate: "2023-08-10",
          grantDate: "2024-09-15",
          description: "IoT-based energy monitoring and optimization device",
          department: "Electronics",
        },
      ]);
      console.log("Seeded patents");
    }

    // Seed News & Events
    const newsCount = await NewsEvent.count();
    if (newsCount === 0) {
      await NewsEvent.bulkCreate([
        {
          title: "BBIT Wins National Innovation Challenge",
          category: "Award",
          date: "2024-12-05",
          description: "Our student team secured first place at the National Level Innovation Challenge",
          venue: "New Delhi",
          organizer: "AICTE",
          featured: true,
        },
        {
          title: "International Research Symposium 2025",
          category: "Event",
          date: "2025-03-10",
          description: "Annual research symposium featuring keynote speakers from MIT, Stanford, and IITs",
          venue: "BBIT Campus",
          organizer: "R&D Cell, BBIT",
          featured: true,
        },
      ]);
      console.log("Seeded news & events");
    }

    // Seed default admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@bbit.edu.in";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@BBIT2026";
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      await User.create({
        firstName: "BBIT",
        lastName: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        isVerified: true,
      });
      console.log(`Admin user created: ${adminEmail}`);
    } else if (existingAdmin.role !== "admin") {
      await existingAdmin.update({ role: "admin", isVerified: true });
      console.log(`Existing user promoted to admin: ${adminEmail}`);
    }

    // Seed editable site settings
    const settingCount = await SiteSetting.count();
    if (settingCount === 0) {
      await SiteSetting.bulkCreate(defaultSiteSettings.map(normalizeDefaultSetting));
      console.log("Seeded site settings");
    }

  } catch (err) {
    console.error("DB init error", err);
    process.exit(1);
  }
}

// ==================== MIDDLEWARE ====================

// Auth token verifier
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token required" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

async function recordAuditLog({ action, scope = "Content", description, entityType = null, entityId = null, actor = null, metadata = null }) {
  if (!AuditLog) return;

  try {
    await AuditLog.create({
      action,
      scope,
      description,
      entityType,
      entityId: entityId != null ? String(entityId) : null,
      actorEmail: actor?.email || null,
      actorRole: actor?.role || null,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  } catch (error) {
    console.warn("Failed to record audit log", error.message);
  }
}

function auditActorFromRequest(req) {
  return req.user ? { email: req.user.email, role: req.user.role } : null;
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

// Admin-only guard
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: "Too many requests from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

const heavyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: { error: "Too many requests, slow down" },
  standardHeaders: true,
  legacyHeaders: false,
});

// ==================== API ROUTES ====================

app.post("/api/uploads", authenticateToken, requireAdmin, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // If S3 driver is enabled, upload to S3 and return the S3 URL.
    if (useS3 && s3Client) {
      const bucket = process.env.S3_BUCKET || process.env.AWS_S3_BUCKET;
      if (!bucket) return res.status(500).json({ error: "S3 bucket not configured (S3_BUCKET)" });

      // Generate key
      const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;

      const params = {
        Bucket: bucket,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype || "application/octet-stream",
        ACL: process.env.S3_ACL || "public-read",
      };

      const cmd = new PutObjectCommand(params);
      s3Client.send(cmd)
        .then(() => {
          // Build public URL. Prefer explicit S3_PUBLIC_URL if set.
          let url;
          if (process.env.S3_PUBLIC_URL) {
            url = `${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/${encodeURIComponent(key)}`;
          } else {
            const region = process.env.AWS_REGION || process.env.S3_REGION || "us-east-1";
            // Note: virtual-hosted style
            if (region === "us-east-1") {
              url = `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;
            } else {
              url = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;
            }
          }
          res.status(201).json({ url, key, filename: req.file.originalname, mimeType: req.file.mimetype, size: req.file.size });
        })
        .catch((err) => {
          console.error("S3 upload error", err && err.message ? err.message : err);
          res.status(500).json({ error: "S3 upload failed" });
        });
      return;
    }

    // Local disk fallback - return a safe relative URL by default
    const fileUrl = `/uploads/${req.file.filename}`;
    // Prefer a configured FRONTEND_URL for an absolute URL, but return a relative path in `url` so clients
    // can load files from the current origin without depending on env configuration.
    const frontendUrlRaw = process.env.FRONTEND_URL || null;
    const frontendUrl = frontendUrlRaw ? String(frontendUrlRaw).replace(/\/$/, "") : null;
    const absoluteUrl = frontendUrl ? `${frontendUrl}${fileUrl}` : `${process.env.FRONTEND_URL || "http://localhost:3005"}${fileUrl}`;

    res.status(201).json({
      // `url` is relative and safe for use from the current origin.
      url: fileUrl,
      // `absoluteUrl` is provided for clients that prefer a full URL.
      absoluteUrl,
      path: fileUrl,
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Check
app.get("/api/health", (req, res) => res.json({ ok: true, timestamp: new Date() }));

function parseSiteSettingValue(setting) {
  if (!setting) return null;
  // Prefer the publishedValue if present, fall back to legacy `value`.
  const raw = setting.publishedValue ?? setting.value ?? null;
  if (raw == null) return null;
  if (setting.type === "json") {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}

function toSiteSettingsObject(settings) {
  return settings.reduce((acc, setting) => {
    acc[setting.key] = parseSiteSettingValue(setting);
    return acc;
  }, {});
}

app.get("/api/site-settings", async (req, res) => {
  try {
    const settings = await SiteSetting.findAll({ where: { isPublic: true }, order: [["section", "ASC"], ["key", "ASC"]] });
    res.json({ settings: toSiteSettingsObject(settings) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/site-settings/admin", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const settings = await SiteSetting.findAll({ order: [["section", "ASC"], ["key", "ASC"]] });
    res.json(settings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/site-settings/:key", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    console.log('PUT /api/site-settings body:', req.body);
    // Accepts a draft save by default. To publish immediately, set `publish: true`.
    const { value, draftValue, publish, section, description, type, isPublic } = req.body;

    const payload = {};

    // helper: if incoming string looks double-encoded (e.g. '""'), unwrap once
    const normalizeIncoming = (v) => {
      if (v === null || v === undefined) return v;
      if (typeof v !== "string") return JSON.stringify(v ?? "");
      // unwrap a JSON-encoded string like "..."
      if (v.length >= 2 && v[0] === '"' && v[v.length - 1] === '"') {
        try {
          const parsed = JSON.parse(v);
          if (typeof parsed === 'string') return parsed;
        } catch (err) {
          // not JSON parsable, keep original
        }
      }
      return v;
    };

    if (draftValue !== undefined) {
      payload.draftValue = normalizeIncoming(draftValue);
    } else if (value !== undefined) {
      // legacy clients may send `value` — treat as draft
      payload.draftValue = normalizeIncoming(value);
    }

    if (publish) {
      // publish the draft (or provided value) to publishedValue
      const publishSource = payload.draftValue ?? (value !== undefined ? normalizeIncoming(value) : undefined);
      if (publishSource !== undefined) payload.publishedValue = publishSource;
    }

    if (section !== undefined) payload.section = section;
    if (description !== undefined) payload.description = description;
    if (type !== undefined) payload.type = type;
    if (isPublic !== undefined) payload.isPublic = Boolean(isPublic);

    // Use find/update or create to avoid unexpected upsert behavior
    let setting = await SiteSetting.findOne({ where: { key } });
    if (!setting) {
      const created = await SiteSetting.create({ key, ...payload });
      setting = created;
    } else {
      await setting.update(payload);
    }

    await recordAuditLog({
      action: publish ? "publish_setting" : "save_setting",
      scope: "Site settings",
      description: `${key} was ${publish ? "published" : "saved as draft"}.`,
      entityType: "SiteSetting",
      entityId: key,
      actor: auditActorFromRequest(req),
      metadata: { key, publish: Boolean(publish), section: section ?? setting.section },
    });

    res.json({ message: "Site setting saved", setting });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/site-settings/:key/publish", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await SiteSetting.findOne({ where: { key } });
    if (!setting) return res.status(404).json({ error: "Setting not found" });

    const publishValue = value !== undefined ? (typeof value === "string" ? value : JSON.stringify(value)) : setting.draftValue ?? setting.value;

    await SiteSetting.update({ publishedValue: publishValue }, { where: { key } });
    const updated = await SiteSetting.findOne({ where: { key } });

    // If site logo or app icon was published, attempt to generate PWA-friendly PNG icons (192x192, 512x512)
    if (key === 'siteLogo' || key === 'appIcon') {
      try {
        const sharp = require('sharp')
        const axios = require('axios')

        // Determine the source URL or local file path
        let logoUrl = publishValue
        if (!logoUrl) logoUrl = ''

        let buffer = null

        if (/^https?:\/\//i.test(logoUrl)) {
          // Fetch remote URL
          const r = await axios.get(logoUrl, { responseType: 'arraybuffer', timeout: 15000 })
          buffer = Buffer.from(r.data)
        } else if (typeof logoUrl === 'string' && logoUrl.startsWith('/uploads/')) {
          // Local upload path served by this server
          const localPath = path.join(__dirname, '..', logoUrl)
          if (fs.existsSync(localPath)) {
            buffer = fs.readFileSync(localPath)
          }
        } else if (typeof logoUrl === 'string' && logoUrl.startsWith(process.env.FRONTEND_URL || 'http://localhost:3005')) {
          // URL points to frontend uploads; try to map to local uploads
          const rel = logoUrl.replace(process.env.FRONTEND_URL || 'http://localhost:3005', '')
          const localPath = path.join(__dirname, '..', rel)
          if (fs.existsSync(localPath)) {
            buffer = fs.readFileSync(localPath)
          } else {
            // fallback: try HTTP fetch
            const r = await axios.get(logoUrl, { responseType: 'arraybuffer', timeout: 15000 })
            buffer = Buffer.from(r.data)
          }
        } else if (typeof logoUrl === 'string' && logoUrl.startsWith('/')) {
          const localPath = path.join(__dirname, '..', logoUrl)
          if (fs.existsSync(localPath)) buffer = fs.readFileSync(localPath)
        }

        if (buffer) {
          const slug = key === 'appIcon' ? 'app-icon' : 'site-logo'
          const out192 = path.join(uploadsDir, `${slug}-192.png`)
          const out512 = path.join(uploadsDir, `${slug}-512.png`)

          // Generate PNG icons locally first
          await sharp(buffer).resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(out192)
          await sharp(buffer).resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(out512)

          let pwaUrl = null

          // If using S3, upload generated icons to S3 and set public URL
          if (useS3 && s3Client) {
            try {
              const bucket = process.env.S3_BUCKET
              const region = process.env.AWS_REGION || process.env.S3_REGION || 'us-east-1'
              const key192 = `pwa-icons/${slug}-192.png`
              const key512 = `pwa-icons/${slug}-512.png`

              const body192 = fs.readFileSync(out192)
              const body512 = fs.readFileSync(out512)

              await s3Client.send(new PutObjectCommand({ Bucket: bucket, Key: key192, Body: body192, ContentType: 'image/png' }))
              await s3Client.send(new PutObjectCommand({ Bucket: bucket, Key: key512, Body: body512, ContentType: 'image/png' }))

              // Construct public URL. Allow override via S3_BASE_URL env var
              if (process.env.S3_BASE_URL) {
                pwaUrl = `${process.env.S3_BASE_URL.replace(/\/$/, '')}/${key512}`
              } else {
                pwaUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key512}`
              }
            } catch (s3err) {
              console.warn('S3 upload failed, falling back to local files', s3err && s3err.message ? s3err.message : s3err)
            }
          }

          // If no S3 or upload failed, ensure local uploads are served and use that URL
          if (!pwaUrl) {
            const publicBase = process.env.FRONTEND_URL || 'http://localhost:3005'
            pwaUrl = `${publicBase}/uploads/${slug}-512.png`

            // Also copy to frontend/public/icons for static hosting convenience (local dev)
            try {
              const frontendIcons = path.join(__dirname, '..', '..', 'frontend', 'public', 'icons')
              if (!fs.existsSync(frontendIcons)) fs.mkdirSync(frontendIcons, { recursive: true })
              fs.copyFileSync(out192, path.join(frontendIcons, `${slug}-192.png`))
              fs.copyFileSync(out512, path.join(frontendIcons, `${slug}-512.png`))
            } catch (copyErr) {
              // Not critical
              console.warn('Failed copying PWA icons to frontend/public/icons', copyErr && copyErr.message ? copyErr.message : copyErr)
            }
          }

          // Upsert a helper setting `siteLogoPwa` or `appIconPwa` so frontends and manifest can use it
          const pwaKey = key === 'appIcon' ? 'appIconPwa' : 'siteLogoPwa'
          const [pwaSetting, created] = await SiteSetting.findOrCreate({ where: { key: pwaKey }, defaults: { key: pwaKey, draftValue: pwaUrl, publishedValue: pwaUrl, section: 'branding', type: 'image', isPublic: true, description: 'Auto-generated PWA icon (512x512)' } });
          if (!created) {
            await pwaSetting.update({ draftValue: pwaUrl, publishedValue: pwaUrl })
          }
        }
      } catch (err) {
        console.warn('Failed to generate PWA icons for site/app icon:', err && err.message ? err.message : err)
      }
    }

    await recordAuditLog({
      action: "publish_setting",
      scope: "Site settings",
      description: `${key} was published.`,
      entityType: "SiteSetting",
      entityId: key,
      actor: auditActorFromRequest(req),
      metadata: { key },
    });

    res.json({ message: "Published", setting: updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/site-settings/publish-all", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const settings = await SiteSetting.findAll();
    const updatedKeys = [];

    for (const setting of settings) {
      const publishValue = setting.draftValue ?? setting.value;
      if (publishValue !== undefined && publishValue !== null) {
        await setting.update({ publishedValue: publishValue });
        updatedKeys.push(setting.key);
      }
    }

    await recordAuditLog({
      action: "publish_all_settings",
      scope: "Publishing",
      description: `Published ${updatedKeys.length} site settings.`,
      entityType: "SiteSetting",
      entityId: "bulk",
      actor: auditActorFromRequest(req),
      metadata: { updatedKeys },
    });

    res.json({ message: "All site settings published", updatedKeys });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Serve a PNG version of the site/app icon on demand (resized)
app.get('/api/site-logo.png', async (req, res) => {
  try {
    const size = parseInt(req.query.size, 10) || 192;
    // Load public site settings and prefer PWA overrides
    const settings = await SiteSetting.findAll();
    const obj = toSiteSettingsObject(settings);
    const siteLogo = obj.appIconPwa || obj.siteLogoPwa || obj.appIcon || obj.siteLogo || '/icons/bbit-logo-circle.svg';

    let buffer = null;

    // Helper to send PNG
    const sendPng = async (buf) => {
      const out = await sharp(buf).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.status(200).send(out);
    };

    // Absolute URL -> fetch
    if (/^https?:\/\//i.test(siteLogo)) {
      try {
        const r = await axios.get(siteLogo, { responseType: 'arraybuffer', timeout: 5000 });
        buffer = Buffer.from(r.data);
        return await sendPng(buffer);
      } catch (err) {
        console.warn('Failed to fetch remote siteLogo for PNG conversion', err && err.message ? err.message : err);
      }
    }

    // Local uploads path (/uploads/...) -> read from uploadsDir
    if (siteLogo.startsWith('/uploads/')) {
      const rel = siteLogo.split('/uploads/')[1];
      const abs = path.join(uploadsDir, rel);
      if (fs.existsSync(abs)) {
        buffer = fs.readFileSync(abs);
        return await sendPng(buffer);
      }
    }

    // Frontend public assets (/icons/... or other) -> resolve in frontend/public
    if (siteLogo.startsWith('/')) {
      const candidate = path.join(__dirname, '..', '..', 'frontend', 'public', siteLogo.replace(/^\//, ''));
      if (fs.existsSync(candidate)) {
        buffer = fs.readFileSync(candidate);
        return await sendPng(buffer);
      }
    }

    // Fallback: try reading the default svg in frontend public
    try {
      const fallback = path.join(__dirname, '..', '..', 'frontend', 'public', 'icons', 'bbit-logo-circle.svg');
      if (fs.existsSync(fallback)) {
        buffer = fs.readFileSync(fallback);
        return await sendPng(buffer);
      }
    } catch (err) {
      console.warn('Fallback site-logo read failed', err && err.message ? err.message : err);
    }

    // Ultimate fallback: transparent 1x1 PNG
    const transparent = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=', 'base64');
    return await sendPng(transparent);
  } catch (e) {
    console.error('site-logo.png error', e && e.message ? e.message : e);
    res.status(500).json({ error: 'Failed generating site logo PNG' });
  }
});

app.post("/api/site-settings/reset", authenticateToken, requireAdmin, async (req, res) => {
  try {
    for (const setting of defaultSiteSettings.map(normalizeDefaultSetting)) {
      await SiteSetting.upsert(setting);
    }

    await recordAuditLog({
      action: "reset_site_settings",
      scope: "Site settings",
      description: "Site settings were reset to defaults.",
      entityType: "SiteSetting",
      entityId: "reset",
      actor: auditActorFromRequest(req),
    });

    res.json({ message: "Site settings reset to defaults" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Export accreditation evidence bundle as ZIP
app.get('/api/accreditation/export', authenticateToken, requireAdmin, async (req, res) => {
  const archiver = require('archiver');
  const os = require('os');
  const tmp = require('path').join(os.tmpdir(), `accredit_export_${Date.now()}`);
  try {
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });

    // collect published settings and relevant models
    const settings = await SiteSetting.findAll();
    const settingsObj = {};
    settings.forEach((s) => {
      const raw = s.publishedValue ?? s.value ?? s.draftValue ?? null;
      settingsObj[s.key] = safeJsonParse(raw);
    });

    // Save settings JSON
    const fsExtra = require('fs');
    fsExtra.writeFileSync(path.join(tmp, 'site-settings.json'), JSON.stringify(settingsObj, null, 2));

    // Collect core tables
    const pubs = await Publication.findAll();
    const projs = await ResearchProject.findAll();
    const facs = await Faculty.findAll();
    const pats = await Patent.findAll();

    fsExtra.writeFileSync(path.join(tmp, 'publications.json'), JSON.stringify(pubs.map(p => p.toJSON()), null, 2));
    fsExtra.writeFileSync(path.join(tmp, 'research-projects.json'), JSON.stringify(projs.map(p => p.toJSON()), null, 2));
    fsExtra.writeFileSync(path.join(tmp, 'faculty.json'), JSON.stringify(facs.map(f => f.toJSON()), null, 2));
    fsExtra.writeFileSync(path.join(tmp, 'patents.json'), JSON.stringify(pats.map(p => p.toJSON()), null, 2));

    // Find uploaded files referenced in settings (simple scan for '/uploads/' strings)
    const filePaths = new Set();
    const collectFilesFromValue = (val) => {
      if (!val) return;
      if (typeof val === 'string') {
        if (val.includes('/uploads/')) {
          // extract path after /uploads
          const idx = val.indexOf('/uploads/');
          const rel = val.substring(idx + 9); // removes '/uploads/'
          const absolute = path.join(uploadsDir, rel);
          if (fs.existsSync(absolute)) filePaths.add(absolute);
        }
      } else if (Array.isArray(val)) {
        val.forEach(collectFilesFromValue);
      } else if (typeof val === 'object') {
        Object.values(val).forEach(collectFilesFromValue);
      }
    };

    Object.values(settingsObj).forEach(collectFilesFromValue);

    // Also scan publications/projects/faculty for imageUrl fields
    pubs.forEach(p => { if (p.imageUrl) { if (p.imageUrl.includes('/uploads/')) { const rel = p.imageUrl.split('/uploads/')[1]; const abs = path.join(uploadsDir, rel); if (fs.existsSync(abs)) filePaths.add(abs); } } });
    projs.forEach(p => { if (p.imageUrl) { if (p.imageUrl.includes('/uploads/')) { const rel = p.imageUrl.split('/uploads/')[1]; const abs = path.join(uploadsDir, rel); if (fs.existsSync(abs)) filePaths.add(abs); } } });
    facs.forEach(f => { if (f.imageUrl) { if (f.imageUrl.includes('/uploads/')) { const rel = f.imageUrl.split('/uploads/')[1]; const abs = path.join(uploadsDir, rel); if (fs.existsSync(abs)) filePaths.add(abs); } } });

    // Create ZIP and stream to response
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="accreditation_export_${Date.now()}.zip"`);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', (err) => { throw err; });
    archive.pipe(res);

    // append files from tmp folder
    archive.directory(tmp, false);

    // append referenced uploads into a subfolder
    for (const fp of Array.from(filePaths)) {
      const base = path.basename(fp);
      archive.file(fp, { name: path.join('uploads', base) });
    }

    await archive.finalize();
  } catch (err) {
    console.error('Export error', err);
    res.status(500).json({ error: err.message || String(err) });
  } finally {
    // cleanup temporary files after a short delay to ensure stream finished
    setTimeout(() => {
      try { fs.rmdirSync(tmp, { recursive: true }); } catch (e) { }
    }, 5 * 1000);
  }
});

app.get("/api/admin/audit-log", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "12", 10) || 12, 50);
    const logs = await AuditLog.findAll({ order: [["createdAt", "DESC"]], limit });
    res.json({
      logs: logs.map((log) => ({
        ...log.toJSON(),
        metadata: log.metadata ? safeJsonParse(log.metadata) : null,
      })),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== PUBLICATIONS =====
app.get("/api/publications", async (req, res) => {
  try {
    const { year, type, limit } = req.query;
    const where = {};
    // support featured filter: ?featured=true
    if (req.query.featured !== undefined) {
      const val = String(req.query.featured).toLowerCase();
      if (val === "true" || val === "1") where.featured = true;
      else if (val === "false" || val === "0") where.featured = false;
    }
    if (year) where.year = year;
    if (type) where.type = type;

    const pubs = await Publication.findAll({
      where,
      order: [["year", "DESC"], ["citation_count", "DESC"]],
      limit: limit ? parseInt(limit) : undefined,
    });
    res.json(pubs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/publications/:id", async (req, res) => {
  try {
    const pub = await Publication.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: "Publication not found" });
    res.json(pub);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/publications", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    await recordAuditLog({
      action: "create_publication",
      scope: "Publications",
      description: `Created publication ${pub.title}.`,
      entityType: "Publication",
      entityId: pub.id,
      actor: auditActorFromRequest(req),
    });
    res.status(201).json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/publications/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pub = await Publication.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: "Publication not found" });
    await pub.update(req.body);
    await recordAuditLog({
      action: "update_publication",
      scope: "Publications",
      description: `Updated publication ${pub.title}.`,
      entityType: "Publication",
      entityId: pub.id,
      actor: auditActorFromRequest(req),
    });
    res.json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/publications/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pub = await Publication.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: "Publication not found" });
    const title = pub.title;
    await pub.destroy();
    await recordAuditLog({
      action: "delete_publication",
      scope: "Publications",
      description: `Deleted publication ${title}.`,
      entityType: "Publication",
      entityId: req.params.id,
      actor: auditActorFromRequest(req),
    });
    res.json({ message: "Publication deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Attach uploaded image to a publication (atomic upload + attach)
app.post(
  "/api/publications/:id/image",
  authenticateToken,
  requireAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      const pub = await Publication.findByPk(req.params.id);
      if (!pub) return res.status(404).json({ error: "Publication not found" });

      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      // Reuse S3/local upload logic from /api/uploads
      let url;
      if (useS3 && s3Client) {
        const bucket = process.env.S3_BUCKET || process.env.AWS_S3_BUCKET;
        if (!bucket) return res.status(500).json({ error: "S3 bucket not configured (S3_BUCKET)" });

        const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const key = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;
        const params = {
          Bucket: bucket,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype || "application/octet-stream",
          ACL: process.env.S3_ACL || "public-read",
        };
        const cmd = new PutObjectCommand(params);
        await s3Client.send(cmd);
        if (process.env.S3_PUBLIC_URL) {
          url = `${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/${encodeURIComponent(key)}`;
        } else {
          const region = process.env.AWS_REGION || process.env.S3_REGION || "us-east-1";
          if (region === "us-east-1") {
            url = `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;
          } else {
            url = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;
          }
        }
      } else {
        // local disk
        url = `${process.env.FRONTEND_URL || "http://localhost:3005"}/uploads/${req.file.filename}`;
      }

      const updates = {};
      if (req.body.featured !== undefined) updates.featured = req.body.featured === "true" || req.body.featured === true;
      if (req.body.impactFactor !== undefined) updates.impactFactor = req.body.impactFactor;
      updates.imageUrl = url;

      await pub.update(updates);
      await recordAuditLog({
        action: "update_publication_image",
        scope: "Publications",
        description: `Updated publication image for ${pub.title}.`,
        entityType: "Publication",
        entityId: pub.id,
        actor: auditActorFromRequest(req),
      });
      res.status(200).json(pub);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ===== RESEARCH PROJECTS =====
app.get("/api/projects", async (req, res) => {
  try {
    const { status, department } = req.query;
    const where = {};
    // support featured filter: ?featured=true
    if (req.query.featured !== undefined) {
      const val = String(req.query.featured).toLowerCase();
      if (val === "true" || val === "1") where.featured = true;
      else if (val === "false" || val === "0") where.featured = false;
    }
    if (status) where.status = status;
    if (department) where.department = department;

    const projects = await ResearchProject.findAll({
      where,
      order: [["startDate", "DESC"]]
    });
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await ResearchProject.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/projects", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await ResearchProject.create(req.body);
    await recordAuditLog({
      action: "create_project",
      scope: "Projects",
      description: `Created project ${project.title}.`,
      entityType: "ResearchProject",
      entityId: project.id,
      actor: auditActorFromRequest(req),
    });
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/projects/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await ResearchProject.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.update(req.body);
    await recordAuditLog({
      action: "update_project",
      scope: "Projects",
      description: `Updated project ${project.title}.`,
      entityType: "ResearchProject",
      entityId: project.id,
      actor: auditActorFromRequest(req),
    });
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/projects/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await ResearchProject.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const title = project.title;
    await project.destroy();
    await recordAuditLog({
      action: "delete_project",
      scope: "Projects",
      description: `Deleted project ${title}.`,
      entityType: "ResearchProject",
      entityId: req.params.id,
      actor: auditActorFromRequest(req),
    });
    res.json({ message: "Project deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Attach uploaded image to a project (atomic upload + attach)
app.post(
  "/api/projects/:id/image",
  authenticateToken,
  requireAdmin,
  upload.single("file"),
  async (req, res) => {
    try {
      const project = await ResearchProject.findByPk(req.params.id);
      if (!project) return res.status(404).json({ error: "Project not found" });

      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      let url;
      if (useS3 && s3Client) {
        const bucket = process.env.S3_BUCKET || process.env.AWS_S3_BUCKET;
        if (!bucket) return res.status(500).json({ error: "S3 bucket not configured (S3_BUCKET)" });

        const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const key = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;
        const params = {
          Bucket: bucket,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype || "application/octet-stream",
          ACL: process.env.S3_ACL || "public-read",
        };
        const cmd = new PutObjectCommand(params);
        await s3Client.send(cmd);
        if (process.env.S3_PUBLIC_URL) {
          url = `${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/${encodeURIComponent(key)}`;
        } else {
          const region = process.env.AWS_REGION || process.env.S3_REGION || "us-east-1";
          if (region === "us-east-1") {
            url = `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`;
          } else {
            url = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;
          }
        }
      } else {
        url = `${process.env.FRONTEND_URL || "http://localhost:3005"}/uploads/${req.file.filename}`;
      }

      const updates = {};
      if (req.body.featured !== undefined) updates.featured = req.body.featured === "true" || req.body.featured === true;
      updates.imageUrl = url;
      await project.update(updates);
      res.status(200).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// ===== FACULTY =====
app.get("/api/faculty", async (req, res) => {
  try {
    const { department } = req.query;
    const where = {};
    if (department) where.department = department;

    const faculty = await Faculty.findAll({
      where,
      order: [["publications", "DESC"]]
    });
    res.json(faculty);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/faculty/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json(faculty);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/faculty", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/faculty/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    await faculty.update(req.body);
    res.json(faculty);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/faculty/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    await faculty.destroy();
    res.json({ message: "Faculty record deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== CONTACT INQUIRIES =====
app.get("/api/contacts", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    const contacts = await ContactInquiry.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    res.json(contacts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/contacts", async (req, res) => {
  try {
    // Save contact inquiry to database
    const contact = await ContactInquiry.create(req.body);

    // Send notification email to admin
    const adminEmailSent = await sendContactFormEmail(req.body);

    // Send auto-reply to user
    const autoReplySent = await sendContactAutoReply(req.body);

    res.status(201).json({
      message: "Thank you for contacting us! We'll get back to you soon.",
      contact,
      emailNotifications: {
        adminNotified: adminEmailSent,
        autoReplySent: autoReplySent
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/contacts/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contact = await ContactInquiry.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    await contact.update(req.body);
    res.json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/contacts/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contact = await ContactInquiry.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    await contact.destroy();
    res.json({ message: "Contact inquiry deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== REGISTRATIONS =====
app.get("/api/registrations", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { registrationType, status } = req.query;
    const where = {};
    if (registrationType) where.registrationType = registrationType;
    if (status) where.status = status;
    const registrations = await Registration.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    res.json(registrations);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/registrations", async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json(registration);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/registrations/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) return res.status(404).json({ error: "Registration not found" });
    await registration.update(req.body);
    res.json(registration);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/registrations/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) return res.status(404).json({ error: "Registration not found" });
    await registration.destroy();
    res.json({ message: "Registration deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== NEWS & EVENTS =====
app.get("/api/news-events", async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    const where = {};
    if (category) where.category = category;
    if (featured) where.featured = featured === 'true';

    const news = await NewsEvent.findAll({
      where,
      order: [["date", "DESC"]],
      limit: limit ? parseInt(limit) : undefined,
    });
    res.json(news);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/news-events", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const news = await NewsEvent.create(req.body);
    res.status(201).json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/news-events/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const news = await NewsEvent.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News/Event not found" });
    await news.update(req.body);
    res.json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/news-events/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const news = await NewsEvent.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News/Event not found" });
    await news.destroy();
    res.json({ message: "News/Event deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== PATENTS =====
app.get("/api/patents", async (req, res) => {
  try {
    const { status, department } = req.query;
    const where = {};
    if (status) where.status = status;
    if (department) where.department = department;
    const patents = await Patent.findAll({
      where,
      order: [["filingDate", "DESC"]],
    });
    res.json(patents);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/patents/:id", async (req, res) => {
  try {
    const patent = await Patent.findByPk(req.params.id);
    if (!patent) return res.status(404).json({ error: "Patent not found" });
    res.json(patent);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/patents", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const patent = await Patent.create(req.body);
    res.status(201).json(patent);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/patents/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const patent = await Patent.findByPk(req.params.id);
    if (!patent) return res.status(404).json({ error: "Patent not found" });
    await patent.update(req.body);
    res.json(patent);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/patents/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const patent = await Patent.findByPk(req.params.id);
    if (!patent) return res.status(404).json({ error: "Patent not found" });
    await patent.destroy();
    res.json({ message: "Patent deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== STATISTICS =====
app.get("/api/stats", async (req, res) => {
  try {
    const stats = {
      publications: await Publication.count(),
      projects: await ResearchProject.count(),
      faculty: await Faculty.count(),
      patents: await Patent.count(),
      activeProjects: await ResearchProject.count({ where: { status: 'Ongoing' } }),
      recentPublications: await Publication.count({ where: { year: new Date().getFullYear() } }),
      pendingContacts: await ContactInquiry.count({ where: { status: "pending" } }),
      pendingRegistrations: await Registration.count({ where: { status: "pending" } }),
    };
    res.json(stats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ==================== AUTH ROUTES ====================

// User Signup
app.post("/api/auth/signup", authLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: "First name, last name, email and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user
    const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      verificationToken,
      verificationTokenExpiry
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken, firstName);

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({
      message: emailSent
        ? "User registered successfully. Please check your email to verify your account."
        : "User registered successfully. Email verification pending.",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified
      },
      token,
      emailSent
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// User Login
app.post("/api/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Persist refresh token (rotate)
    await user.update({ refreshToken });

    // Set refresh token as secure httpOnly cookie for auth endpoints
    res.cookie("refreshToken", refreshToken, cookieOptions());

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token: accessToken
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get Current User Profile (Protected Route)
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update User Profile (Protected Route)
app.put("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ firstName, lastName, phone });

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Refresh access token using refresh token in httpOnly cookie
app.post("/api/auth/refresh", async (req, res) => {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token" });

    let payload;
    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (e) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const user = await User.findByPk(payload.id);
    if (!user || !user.refreshToken) return res.status(403).json({ error: "Invalid refresh token" });
    if (user.refreshToken !== token) return res.status(403).json({ error: "Refresh token mismatch" });

    // rotate tokens
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    await user.update({ refreshToken: newRefreshToken });
    res.cookie("refreshToken", newRefreshToken, cookieOptions());

    res.json({ token: accessToken, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Logout - revoke refresh token and clear cookie
app.post("/api/auth/logout", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user) await user.update({ refreshToken: null });
    res.clearCookie("refreshToken", cookieOptions());
    res.json({ message: "Logged out" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Verify Email
app.get("/api/auth/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Token required' });

    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) return res.status(404).json({ error: 'User not found or token invalid' });

    if (user.isVerified) return res.json({ message: 'Email already verified' });

    if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
      return res.status(400).json({ error: 'Verification token has expired' });
    }

    await user.update({ isVerified: true, verificationToken: null, verificationTokenExpiry: null });

    res.json({ message: 'Email verified successfully', user: { id: user.id, email: user.email, isVerified: true } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Resend Verification Email
app.post("/api/auth/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    // Generate new verification token
    const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.update({
      verificationToken,
      verificationTokenExpiry
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken, user.firstName);

    res.json({
      message: emailSent
        ? "Verification email sent successfully"
        : "Failed to send verification email",
      emailSent
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Change Password (Protected Route)
app.post("/api/auth/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Current password and new password are required"
      });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Update password
    await user.update({ password: newPassword });

    res.json({ message: "Password changed successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Forgot Password — sends reset link by email
app.post("/api/auth/forgot-password", authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ where: { email } });
    // Always respond OK to prevent user enumeration
    if (!user) return res.json({ message: "If that email exists, a reset link has been sent." });

    const resetToken = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: "1h" });
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.update({ resetPasswordToken: resetToken, resetPasswordExpiry: resetExpiry });

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3005"}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: `"BBIT R&D Cell" <${process.env.EMAIL_USER || "noreply@bbit.edu.in"}>`,
      to: email,
      subject: "Reset Your BBIT Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head><style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style></head>
        <body>
          <div class="container">
            <div class="header"><h1>Password Reset Request</h1></div>
            <div class="content">
              <p>Hi ${user.firstName},</p>
              <p>We received a request to reset your BBIT account password.</p>
              <p>Click the button below to reset it. This link expires in <strong>1 hour</strong>.</p>
              <center><a href="${resetUrl}" class="button">Reset Password</a></center>
              <p>Or copy this link:<br><code style="background:#e5e7eb;padding:8px;display:block;border-radius:4px;word-break:break-all">${resetUrl}</code></p>
              <p>If you did not request a password reset, please ignore this email.</p>
              <p>Best regards,<br><strong>BBIT R&amp;D Cell Team</strong></p>
            </div>
            <div class="footer"><p>Budge Budge Institute of Technology<br>Nischintapur, Budge Budge, Kolkata - 700138</p></div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await emailTransporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Reset email error:", emailErr);
    }

    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Reset Password — consumes token and sets new password
app.post("/api/auth/reset-password", authLimiter, async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: "Token and new password are required" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const user = await User.findOne({
      where: { id: decoded.id, resetPasswordToken: token },
    });
    if (!user) return res.status(404).json({ error: "Invalid or expired reset token" });

    if (user.resetPasswordExpiry && new Date() > user.resetPasswordExpiry) {
      return res.status(400).json({ error: "Reset token has expired" });
    }

    await user.update({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    });

    res.json({ message: "Password reset successfully. You can now log in with your new password." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== ROOT ENDPOINT =====
app.get("/", (req, res) => {
  res.json({
    message: "BBIT R&D Cell API",
    version: "2.0.0",
    status: "running",
    endpoints: {
      auth: {
        signup: "POST /api/auth/signup  [rate-limited]",
        login: "POST /api/auth/login  [rate-limited]",
        verifyEmail: "GET /api/auth/verify-email?token=...",
        resendVerification: "POST /api/auth/resend-verification",
        forgotPassword: "POST /api/auth/forgot-password  [rate-limited]",
        resetPassword: "POST /api/auth/reset-password  [rate-limited]",
        me: "GET /api/auth/me  [protected]",
        updateProfile: "PUT /api/auth/profile  [protected]",
        changePassword: "POST /api/auth/change-password  [protected]",
      },
      publications: "GET|POST /api/publications  (write: admin)",
      publicationById: "GET|PUT|DELETE /api/publications/:id  (write: admin)",
      projects: "GET|POST /api/projects  (write: admin)",
      projectById: "GET|PUT|DELETE /api/projects/:id  (write: admin)",
      faculty: "GET|POST /api/faculty  (write: admin)",
      facultyById: "GET|PUT|DELETE /api/faculty/:id  (write: admin)",
      newsEvents: "GET|POST /api/news-events  (write: admin)",
      newsEventById: "GET|PUT|DELETE /api/news-events/:id  (write: admin)",
      patents: "GET|POST /api/patents  (write: admin)",
      patentById: "GET|PUT|DELETE /api/patents/:id  (write: admin)",
      contacts: "GET[admin]|POST /api/contacts",
      contactById: "PUT|DELETE /api/contacts/:id  [admin]",
      registrations: "GET[admin]|POST /api/registrations",
      registrationById: "PUT|DELETE /api/registrations/:id  [admin]",
      stats: "GET /api/stats",
    },
  });
});

// Helper: synthesize a short reply from local site data when AI provider fails
async function synthesizeFromSiteData(query) {
  try {
    if (!query || typeof query !== 'string') return null;
    // build a simple keyword string from query (ignore short words)
    const words = query
      .replace(/[^a-zA-Z0-9\s]/g, ' ')
      .split(/\s+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 3)
      .slice(0, 6);

    let like = '%' + (words.length ? words.join('%') : query.slice(0, 20)) + '%';

    const snippets = [];

    // Publications
    try {
      const pubs = await Publication.findAll({ where: { [Op.or]: [{ title: { [Op.like]: like } }, { abstract: { [Op.like]: like } }] }, limit: 3 });
      for (const p of pubs) {
        snippets.push(`Publication: ${p.title}${p.authors ? ' — ' + p.authors : ''}\n${(p.abstract || '').slice(0, 300)}${(p.abstract && p.abstract.length > 300) ? '...' : ''}`);
      }
    } catch (e) {
      // ignore
    }

    // Research projects
    try {
      const projs = await ResearchProject.findAll({ where: { [Op.or]: [{ title: { [Op.like]: like } }, { description: { [Op.like]: like } }] }, limit: 3 });
      for (const pr of projs) {
        snippets.push(`Project: ${pr.title} (${pr.status})\n${(pr.description || '').slice(0, 300)}${(pr.description && pr.description.length > 300) ? '...' : ''}`);
      }
    } catch (e) { }

    // News / Events
    try {
      const news = await NewsEvent.findAll({ where: { [Op.or]: [{ title: { [Op.like]: like } }, { description: { [Op.like]: like } }] }, limit: 3 });
      for (const n of news) {
        snippets.push(`News: ${n.title} (${n.date})\n${(n.description || '').slice(0, 300)}${(n.description && n.description.length > 300) ? '...' : ''}`);
      }
    } catch (e) { }

    // Site settings (public)
    try {
      const sets = await SiteSetting.findAll({ where: { isPublic: true, [Op.or]: [{ key: { [Op.like]: like } }, { publishedValue: { [Op.like]: like } }, { draftValue: { [Op.like]: like } }, { value: { [Op.like]: like } }] }, limit: 6 });
      for (const s of sets) {
        const v = (s.publishedValue || s.draftValue || s.value || '').slice(0, 250);
        if (v) snippets.push(`Setting: ${s.key} — ${v}${v.length >= 250 ? '...' : ''}`);
      }
    } catch (e) { }

    if (!snippets.length) return null;

    const header = "I couldn't reach the external AI service; here are relevant items from the website that may help:";
    return `${header}\n\n${snippets.slice(0, 8).join('\n\n')}\n\nIf you want more detail, ask about one of the items above.`;
  } catch (err) {
    console.warn('synthesizeFromSiteData failed', err && err.message ? err.message : err);
    return null;
  }
}

// ===== AI Proxy Endpoint =====
// POST /api/ai/chat { message: string }
app.post("/api/ai/chat", async (req, res) => {
  let apiKey = process.env.OPENROUTER_API_KEY;
  // If API key is not set in env, allow using an admin-published SiteSetting key 'openRouterApiKey'
  if (!apiKey) {
    try {
      const siteKey = await SiteSetting.findOne({ where: { key: 'openRouterApiKey' } });
      apiKey = siteKey?.publishedValue || siteKey?.draftValue || siteKey?.value || null;
    } catch (e) {
      console.warn('Could not read openRouterApiKey from SiteSetting', e && e.message ? e.message : e);
    }
  }
  const message = (req.body && req.body.message) ? String(req.body.message) : null;
  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  if (!message) return res.status(400).json({ error: "Missing 'message' in request body" });
  if (!apiKey) return res.status(500).json({ error: "OPENROUTER_API_KEY not configured on server" });

  const systemPrompt = [
    "You are BBIT Assistant, a helpful, concise AI assistant for the Budge Budge Institute of Technology R&D Cell website.",
    "Help users with admissions, programs, research, projects, publications, placements, campus life, contact info, and admin/site features.",
    "If you are unsure about a specific internal detail, say so briefly and point the user to the relevant site page or admin panel.",
    "Keep replies short, natural, and friendly unless the user asks for detail."
  ].join(" ");

  const safeHistory = history
    .slice(-8)
    .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
    .map((item) => ({ role: item.role, content: item.content }));

  try {
    const payload = {
      model: process.env.OPENROUTER_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...safeHistory,
        { role: "user", content: message }
      ],
      max_tokens: 600,
      temperature: 0.6,
    };

    // Use axios for server-side requests (more robust error messages)
    // Try multiple base endpoints as a short-term fallback for DNS issues.
    // eslint-disable-next-line global-require
    const axios = require('axios')
    let providerRes = null
    const endpoints = [
      process.env.OPENROUTER_ENDPOINT || 'https://api.openrouter.ai/api/v1/chat/completions',
      'https://openrouter.ai/api/v1/chat/completions',
    ]
    const maxAttempts = 2
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    let lastErr = null
    for (const endpoint of endpoints) {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`AI proxy: trying endpoint=${endpoint} attempt=${attempt}`)
          providerRes = await axios.post(endpoint, payload, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': process.env.OPENROUTER_REFERER || process.env.FRONTEND_URL || 'http://localhost:3000',
              'X-Title': process.env.OPENROUTER_TITLE || 'BBIT R&D Cell Assistant',
            },
            timeout: 15000,
            validateStatus: () => true,
          })

          if (!providerRes || typeof providerRes.status === 'undefined') {
            throw new Error('No response from AI provider')
          }

          if (providerRes.status >= 200 && providerRes.status < 300) {
            // success
            lastErr = null
            break
          }

          // If server error, retry on same endpoint
          if (providerRes.status >= 500 && attempt < maxAttempts) {
            await sleep(400 * attempt)
            continue
          }

          // Non-retriable status
          console.error('AI provider error', providerRes.status, providerRes.data)
          throw new Error(`AI provider error ${providerRes.status}`)
        } catch (err) {
          lastErr = err
          // If network DNS ENOTFOUND or similar, break to try next endpoint
          const code = err && err.code ? err.code : (err && err.response && err.response.status) ? String(err.response.status) : null
          if (code === 'ENOTFOUND' || (err && err.message && /ENOTFOUND|getaddrinfo/i.test(err.message))) {
            console.warn(`Endpoint ${endpoint} DNS lookup failed: ${err.message}`)
            break
          }

          if (attempt >= maxAttempts) {
            // give up this endpoint and try next
            break
          }
          // network error on this attempt - wait and retry
          await sleep(400 * attempt)
        }
      }

      // if providerRes is successful, stop trying further endpoints
      if (providerRes && providerRes.status >= 200 && providerRes.status < 300) break
    }

    if (!providerRes || typeof providerRes.status === 'undefined' || providerRes.status >= 300) {
      throw lastErr || new Error('AI provider requests failed')
    }

    const data = providerRes.data
    // Try multiple possible response shapes
    let reply = null;
    if (data.choices && Array.isArray(data.choices) && data.choices[0]) {
      if (data.choices[0].message && data.choices[0].message.content) reply = data.choices[0].message.content;
      else if (typeof data.choices[0].text === 'string') reply = data.choices[0].text;
    }
    if (!reply && data.output && Array.isArray(data.output) && data.output[0] && data.output[0].content) {
      // some providers use output[0].content
      reply = data.output[0].content[0]?.text || data.output[0].content[0]?.data?.text;
    }
    if (!reply && typeof data === 'string') reply = data;

    return res.json({ reply: reply || "(no reply)", source: "openrouter", raw: data });
  } catch (err) {
    console.error('AI proxy error', err);
    // Try local site data synthesis as a fallback before simple canned replies
    try {
      const local = await synthesizeFromSiteData(message);
      if (local) return res.json({ reply: local, source: "local-site" });
    } catch (e) {
      console.warn('Local synthesis failed', e && e.message ? e.message : e);
    }

    const lower = message.toLowerCase();
    let reply = "I'm here to help with BBIT-related questions.";
    if (/hello|hi|hey/.test(lower)) reply = "Hello. How can I help you with BBIT today?";
    else if (/project/.test(lower)) reply = "You can browse projects on the Research Projects pages or manage them from the admin panel.";
    else if (/publication|paper|journal/.test(lower)) reply = "Publications are managed from the admin panel and displayed on the Publications pages.";
    else if (/admission|apply|registration/.test(lower)) reply = "Admissions and registration content can be updated from the admin site settings.";
    else if (/contact|email/.test(lower)) reply = "Use the Contact Us page for office details, email, and inquiry forms.";
    else if (/admin|panel|settings/.test(lower)) reply = "The admin panel lets you manage page content, navigation, and site settings.";

    return res.json({ reply, source: "fallback" });
  }
});

// AI health endpoint
app.get('/api/ai/health', async (req, res) => {
  try {
    let hasKey = Boolean(process.env.OPENROUTER_API_KEY);
    if (!hasKey) {
      try {
        const siteKey = await SiteSetting.findOne({ where: { key: 'openRouterApiKey' } });
        const found = siteKey?.publishedValue || siteKey?.draftValue || siteKey?.value || null;
        hasKey = Boolean(found);
      } catch (e) {
        console.warn('Health: could not read openRouterApiKey from SiteSetting', e && e.message ? e.message : e);
      }
    }
    res.json({ ok: true, hasKey });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Lightweight provider connectivity check (performs a small test request)
app.get('/api/ai/check-provider', async (req, res) => {
  let apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    try {
      const siteKey = await SiteSetting.findOne({ where: { key: 'openRouterApiKey' } });
      apiKey = siteKey?.publishedValue || siteKey?.draftValue || siteKey?.value || null;
    } catch (e) {
      console.warn('check-provider: could not read openRouterApiKey from SiteSetting', e && e.message ? e.message : e);
    }
  }
  if (!apiKey) return res.status(500).json({ ok: false, error: 'OPENROUTER_API_KEY not configured' })

  try {
    // Try multiple endpoints to handle transient DNS or egress issues
    // eslint-disable-next-line global-require
    const axios = require('axios')
    const payload = {
      model: process.env.OPENROUTER_MODEL || 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: 'ping' }],
      max_tokens: 1,
      temperature: 0,
    }

    const endpoints = [process.env.OPENROUTER_ENDPOINT || 'https://api.openrouter.ai/api/v1/chat/completions', 'https://openrouter.ai/api/v1/chat/completions']
    let lastR = null
    for (const endpoint of endpoints) {
      try {
        console.log(`check-provider: testing endpoint ${endpoint}`)
        const r = await axios.post(endpoint, payload, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          timeout: 8000,
          validateStatus: () => true,
        })
        lastR = r
        if (r && r.status >= 200 && r.status < 300) return res.json({ ok: true, status: r.status, data: r.data })
        // if not success, continue to next endpoint
      } catch (err) {
        console.warn('check-provider endpoint failed', endpoint, err && err.message ? err.message : err)
        lastR = lastR || { status: 0, data: { error: err && err.message ? err.message : String(err) } }
      }
    }

    if (!lastR) return res.status(502).json({ ok: false, error: 'No response from provider' })
    return res.json({ ok: lastR.status >= 200 && lastR.status < 300, status: lastR.status, data: lastR.data })
  } catch (err) {
    console.error('Provider check failed', err && err.message ? err.message : err)
    return res.status(502).json({ ok: false, error: err.message })
  }
})

const port = process.env.PORT || 4000;
init().then(() => {
  app.listen(port, () => console.log(`API listening on ${port}`));
});

// Diagnostics endpoint: resolve DNS from the running server
app.get('/api/diagnostics/dns', async (req, res) => {
  const host = req.query.host || 'api.openrouter.ai';
  try {
    const addresses = await dnsPromises.lookup(host, { all: true });
    return res.json({ ok: true, host, addresses });
  } catch (err) {
    console.error('DNS diagnostic failed', err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, host, error: err.message });
  }
});
