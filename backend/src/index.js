const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// ── CORS ──
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3005"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

const JWT_SECRET = process.env.JWT_SECRET || "bbit-secret-key-2025";

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
let sequelize;
if (process.env.DATABASE_URL) {
  const DATABASE_URL = process.env.DATABASE_URL;
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
  });
} else if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
  const DATABASE_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
  });
} else {
  const storage = process.env.SQLITE_STORAGE || "dev.sqlite";
  console.log(`No DATABASE_URL found — using SQLite fallback: ${storage}`);
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });
}

// ==================== MODELS ====================

// Publication Model
const Publication = sequelize.define(
  "Publication",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    authors: { type: DataTypes.TEXT },
    journal: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    doi: { type: DataTypes.STRING },
    citation_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    type: { type: DataTypes.STRING },
    abstract: { type: DataTypes.TEXT },
    keywords: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

// Research Project Model
const ResearchProject = sequelize.define(
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
    status: { type: DataTypes.STRING, defaultValue: "Ongoing" },
    description: { type: DataTypes.TEXT },
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { timestamps: true }
);

// Faculty Model
const Faculty = sequelize.define(
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
    researchInterests: { type: DataTypes.TEXT },
    phone: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

// Contact/Inquiry Model
const ContactInquiry = sequelize.define(
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

// Registration Model (for admissions, events, placements)
const Registration = sequelize.define(
  "Registration",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    registrationType: { type: DataTypes.STRING, allowNull: false }, // admission, placement, event, research
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

// News & Events Model
const NewsEvent = sequelize.define(
  "NewsEvent",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING }, // Award, Event, Achievement, Publication, etc.
    date: { type: DataTypes.DATEONLY, allowNull: false },
    description: { type: DataTypes.TEXT },
    imageUrl: { type: DataTypes.STRING },
    venue: { type: DataTypes.STRING },
    organizer: { type: DataTypes.STRING },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true }
);

// Patent Model
const Patent = sequelize.define(
  "Patent",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.TEXT, allowNull: false },
    inventors: { type: DataTypes.TEXT },
    patentNumber: { type: DataTypes.STRING },
    applicationNumber: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING }, // Filed, Granted, Published
    filingDate: { type: DataTypes.DATEONLY },
    grantDate: { type: DataTypes.DATEONLY },
    description: { type: DataTypes.TEXT },
    department: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

// User Model (for login/signup)
const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" }, // user, admin
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verificationToken: { type: DataTypes.STRING },
    verificationTokenExpiry: { type: DataTypes.DATE },
    lastLogin: { type: DataTypes.DATE },
    resetPasswordToken: { type: DataTypes.STRING },
    resetPasswordExpiry: { type: DataTypes.DATE },
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
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

// User instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this.id, 
      email: this.email, 
      role: this.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ==================== DATABASE INITIALIZATION ====================
async function init() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync({ alter: true }); // Add any new columns to existing tables

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

// Health Check
app.get("/api/health", (req, res) => res.json({ ok: true, timestamp: new Date() }));

// ===== PUBLICATIONS =====
app.get("/api/publications", async (req, res) => {
  try {
    const { year, type, limit } = req.query;
    const where = {};
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
    res.json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/publications/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pub = await Publication.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: "Publication not found" });
    await pub.destroy();
    res.json({ message: "Publication deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== RESEARCH PROJECTS =====
app.get("/api/projects", async (req, res) => {
  try {
    const { status, department } = req.query;
    const where = {};
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
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/projects/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await ResearchProject.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

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

    // Generate token
    const token = user.generateAuthToken();

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
      token
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

// Verify Email
app.get("/api/auth/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Verification token is required" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired verification token" });
    }

    // Find user
    const user = await User.findOne({ 
      where: { 
        email: decoded.email,
        verificationToken: token
      } 
    });

    if (!user) {
      return res.status(404).json({ error: "User not found or token invalid" });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.json({ message: "Email already verified" });
    }

    // Check token expiry
    if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
      return res.status(400).json({ error: "Verification token has expired" });
    }

    // Verify user
    await user.update({
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null
    });

    res.json({ 
      message: "Email verified successfully",
      user: {
        id: user.id,
        email: user.email,
        isVerified: true
      }
    });
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

const port = process.env.PORT || 4000;
init().then(() => {
  app.listen(port, () => console.log(`API listening on ${port}`));
});
