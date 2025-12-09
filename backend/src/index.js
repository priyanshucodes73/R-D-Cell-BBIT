const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();

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

// ==================== DATABASE INITIALIZATION ====================
async function init() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync(); // Normal sync without force

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

  } catch (err) {
    console.error("DB init error", err);
    process.exit(1);
  }
}

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

app.post("/api/publications", async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/publications/:id", async (req, res) => {
  try {
    const pub = await Publication.findByPk(req.params.id);
    if (!pub) return res.status(404).json({ error: "Publication not found" });
    await pub.update(req.body);
    res.json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/api/publications/:id", async (req, res) => {
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

app.post("/api/projects", async (req, res) => {
  try {
    const project = await ResearchProject.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const project = await ResearchProject.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.update(req.body);
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
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

app.post("/api/faculty", async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json(faculty);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ===== CONTACT INQUIRIES =====
app.get("/api/contacts", async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    
    const contacts = await ContactInquiry.findAll({ 
      where,
      order: [["createdAt", "DESC"]]
    });
    res.json(contacts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/contacts", async (req, res) => {
  try {
    const contact = await ContactInquiry.create(req.body);
    res.status(201).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await ContactInquiry.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    await contact.update(req.body);
    res.json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ===== REGISTRATIONS =====
app.get("/api/registrations", async (req, res) => {
  try {
    const { registrationType, status } = req.query;
    const where = {};
    if (registrationType) where.registrationType = registrationType;
    if (status) where.status = status;
    
    const registrations = await Registration.findAll({ 
      where,
      order: [["createdAt", "DESC"]]
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

app.put("/api/registrations/:id", async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) return res.status(404).json({ error: "Registration not found" });
    await registration.update(req.body);
    res.json(registration);
  } catch (e) {
    res.status(400).json({ error: e.message });
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

app.post("/api/news-events", async (req, res) => {
  try {
    const news = await NewsEvent.create(req.body);
    res.status(201).json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/api/news-events/:id", async (req, res) => {
  try {
    const news = await NewsEvent.findByPk(req.params.id);
    if (!news) return res.status(404).json({ error: "News/Event not found" });
    await news.update(req.body);
    res.json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
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
      order: [["filingDate", "DESC"]]
    });
    res.json(patents);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/patents", async (req, res) => {
  try {
    const patent = await Patent.create(req.body);
    res.status(201).json(patent);
  } catch (e) {
    res.status(400).json({ error: e.message });
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

const port = process.env.PORT || 4000;
init().then(() => {
  app.listen(port, () => console.log(`API listening on ${port}`));
});
