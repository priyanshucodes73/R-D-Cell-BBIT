# BBIT R&D Cell - DFD and ERD Diagrams

## 📊 Data Flow Diagrams (DFD)

### Context Diagram (Level 0 DFD)

```
                     ┌─────────────────────────────────────┐
                     │                                     │
    ┌────────┐       │     BBIT R&D Cell Website          │       ┌────────┐
    │        │       │     Management System               │       │        │
    │ Users  │◄─────►│                                     │◄─────►│ Admin  │
    │        │       │  • Research Info                    │       │        │
    └────────┘       │  • Publications                     │       └────────┘
         │           │  • Authentication                   │            │
         │           │  • Contact Forms                    │            │
         │           │  • Email Notifications              │            │
         │           │                                     │            │
         │           └─────────────────────────────────────┘            │
         │                          │                                   │
         │                          │                                   │
         │                          ▼                                   │
         │           ┌──────────────────────────┐                      │
         │           │   External Systems       │                      │
         │           ├──────────────────────────┤                      │
         └──────────►│  • Email Server (SMTP)   │◄─────────────────────┘
                     │  • Database (PostgreSQL)  │
                     │  • File Storage           │
                     └──────────────────────────┘
```

---

### Level 1 DFD - Main Processes

```
┌─────────┐                                                    ┌─────────┐
│         │  Registration/Login Data                           │         │
│  User   │───────────────────────────────►┌─────────────┐    │  Admin  │
│         │                                 │   Process   │    │         │
│         │  JWT Token/User Info            │     1.0     │    │         │
│         │◄────────────────────────────────│ Authentication│  │         │
└─────────┘                                 │   System    │    └─────────┘
     │                                      └─────────────┘         │
     │                                            │                 │
     │                                            ▼                 │
     │                                      ┌──────────┐            │
     │                                      │   User   │            │
     │                                      │ Database │            │
     │                                      └──────────┘            │
     │                                                              │
     │                                                              │
     │  View Research Data                                         │
     │─────────────────────►┌─────────────┐                        │
     │                      │   Process   │                        │
     │  Research Info       │     2.0     │  CRUD Operations       │
     │◄─────────────────────│  Research   │◄───────────────────────┤
     │                      │ Management  │                        │
     │                      └─────────────┘                        │
     │                            │                                │
     │                            ▼                                │
     │                      ┌──────────┐                           │
     │                      │Research  │                           │
     │                      │Database  │                           │
     │                      └──────────┘                           │
     │                                                              │
     │                                                              │
     │  Contact Form Data                                          │
     │─────────────────────►┌─────────────┐                        │
     │                      │   Process   │                        │
     │  Auto-Reply Email    │     3.0     │  View Inquiries        │
     │◄─────────────────────│  Contact    │◄───────────────────────┤
     │                      │  Management │                        │
     │                      └─────────────┘                        │
     │                            │                                │
     │                            ▼                                │
     │                      ┌──────────┐                           │
     │                      │ Contact  │                           │
     │                      │ Database │                           │
     │                      └──────────┘                           │
     │                            │                                │
     │                            ▼                                │
     │                      ┌──────────┐                           │
     │                      │  Email   │                           │
     └─────────────────────►│  Server  │◄──────────────────────────┘
                            └──────────┘
```

---

### Level 2 DFD - Authentication System (Process 1.0)

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Registration Data
     ▼
┌──────────────────┐          ┌──────────────────┐
│   Process 1.1    │          │   Process 1.2    │
│  User Signup     │─────────►│ Email Verification│
│  • Validate Data │ Token    │ • Generate Token │
│  • Hash Password │          │ • Send Email     │
└──────────────────┘          └──────────────────┘
     │                              │
     │ User Record                  │ Verification Token
     ▼                              ▼
┌──────────┐                  ┌──────────┐
│   User   │                  │  Email   │
│ Database │                  │  Server  │
└──────────┘                  └──────────┘
     │
     │ 2. Login Credentials
     ▼
┌──────────────────┐
│   Process 1.3    │
│   User Login     │
│  • Verify Email  │
│  • Check Password│
│  • Generate JWT  │
└──────────────────┘
     │
     │ JWT Token
     ▼
┌─────────┐
│  User   │
└─────────┘
```

---

### Level 2 DFD - Research Management (Process 2.0)

```
                    ┌─────────┐
                    │  Admin  │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Process 2.1  │ │ Process 2.2  │ │ Process 2.3  │
│ Publications │ │   Projects   │ │   Faculty    │
│  Management  │ │  Management  │ │  Management  │
│              │ │              │ │              │
│ • Add        │ │ • Add        │ │ • Add        │
│ • Edit       │ │ • Edit       │ │ • Edit       │
│ • Delete     │ │ • Delete     │ │ • Delete     │
│ • View       │ │ • View       │ │ • View       │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────────────────────────────────────┐
│         PostgreSQL Database                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │Publications│ │ Projects │ │ Faculty  │    │
│  │   Table    │ │  Table   │ │  Table   │    │
│  └──────────┘ └──────────┘ └──────────┘    │
└──────────────────────────────────────────────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
                   ┌─────────┐
                   │  User   │
                   │(Public) │
                   └─────────┘
```

---

### Level 2 DFD - Contact Management (Process 3.0)

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ Contact Form Data
     ▼
┌──────────────────┐
│   Process 3.1    │
│  Form Validation │
│  • Name          │
│  • Email         │
│  • Message       │
└──────┬───────────┘
       │
       │ Validated Data
       ▼
┌──────────────────┐
│   Process 3.2    │
│ Save to Database │
└──────┬───────────┘
       │
       │ Contact Record
       ▼
┌──────────┐
│ Contact  │
│ Database │
└──────────┘
       │
       │ Contact Data
       ├───────────────────┬────────────────┐
       │                   │                │
       ▼                   ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Process 3.3  │  │ Process 3.4  │  │ Process 3.5  │
│Send Admin    │  │Send Auto     │  │Display in    │
│Notification  │  │Reply to User │  │Admin Panel   │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                  │
       ▼                 ▼                  ▼
┌──────────┐      ┌──────────┐      ┌──────────┐
│  Admin   │      │   User   │      │  Admin   │
│  Email   │      │  Email   │      │  Panel   │
└──────────┘      └──────────┘      └──────────┘
```

---

## 🗄️ Entity Relationship Diagram (ERD)

### Detailed ERD with Relationships

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         BBIT R&D Cell Database Schema                   │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       User           │
├──────────────────────┤
│ PK id               │
│    firstName         │
│    lastName          │
│ UK email            │
│    password (HASH)   │
│    phone             │
│    role              │
│    isVerified        │
│    verificationToken │
│    tokenExpiry       │
│    lastLogin         │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘
         │
         │ 1:N (User can have many sessions)
         │
         ▼
┌──────────────────────┐
│   UserSession        │      (Optional - for tracking)
├──────────────────────┤
│ PK id               │
│ FK userId           │
│    token (JWT)       │
│    ipAddress         │
│    userAgent         │
│    expiresAt         │
│    createdAt         │
└──────────────────────┘


┌──────────────────────┐
│    Publication       │
├──────────────────────┤
│ PK id               │
│    title             │
│    authors           │
│    journal           │
│    year              │
│    doi               │
│    citation_count    │
│    abstract          │
│    keywords          │
│    pdf_url           │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘
         │
         │ M:N (Publications can have multiple authors)
         │
         ▼
┌──────────────────────┐
│ PublicationAuthor    │      (Junction Table)
├──────────────────────┤
│ PK id               │
│ FK publicationId    │
│ FK facultyId        │
│    authorOrder       │
│    isCorresponding   │
└──────────────────────┘
         │
         │
         ▼
┌──────────────────────┐
│      Faculty         │
├──────────────────────┤
│ PK id               │
│    name              │
│    department        │
│ UK email            │
│    phone             │
│    designation       │
│    research_areas    │
│    bio               │
│    image_url         │
│    linkedIn          │
│    googleScholar     │
│    orcid             │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘
         │
         │ 1:N (Faculty leads many projects)
         │
         ▼
┌──────────────────────┐
│  ResearchProject     │
├──────────────────────┤
│ PK id               │
│    title             │
│    description       │
│    funding           │
│    status            │
│    start_date        │
│    end_date          │
│ FK faculty_lead      │
│    department        │
│    collaborators     │
│    outcomes          │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘
         │
         │ 1:N (Projects have many milestones)
         │
         ▼
┌──────────────────────┐
│ ProjectMilestone     │      (Optional Enhancement)
├──────────────────────┤
│ PK id               │
│ FK projectId        │
│    title             │
│    description       │
│    dueDate           │
│    status            │
│    completedDate     │
└──────────────────────┘


┌──────────────────────┐
│      Patent          │
├──────────────────────┤
│ PK id               │
│    title             │
│    inventors         │
│    patent_number     │
│    filing_date       │
│    grant_date        │
│    status            │
│    jurisdiction      │
│    abstract          │
│    claims            │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘
         │
         │ M:N (Patents can have multiple inventors)
         │
         ▼
┌──────────────────────┐
│   PatentInventor     │      (Junction Table)
├──────────────────────┤
│ PK id               │
│ FK patentId         │
│ FK facultyId        │
│    inventorOrder     │
└──────────────────────┘


┌──────────────────────┐
│   ContactInquiry     │
├──────────────────────┤
│ PK id               │
│    name              │
│    email             │
│    phone             │
│    subject           │
│    message           │
│    status            │
│    priority          │
│    assignedTo        │
│    resolvedDate      │
│    notes             │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘


┌──────────────────────┐
│     NewsEvent        │
├──────────────────────┤
│ PK id               │
│    title             │
│    description       │
│    event_date        │
│    end_date          │
│    location          │
│    image_url         │
│    type              │
│    category          │
│    registrationLink  │
│    isPublished       │
│    createdBy         │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘


┌──────────────────────┐
│    Registration      │
├──────────────────────┤
│ PK id               │
│    firstName         │
│    lastName          │
│    email             │
│    phone             │
│    course            │
│    college           │
│    year              │
│    purpose           │
│    status            │
│    approvedBy        │
│    approvedDate      │
│    createdAt         │
│    updatedAt         │
└──────────────────────┘


┌──────────────────────┐
│    EmailLog          │      (Optional - for tracking)
├──────────────────────┤
│ PK id               │
│    to                │
│    from              │
│    subject           │
│    type              │
│    status            │
│    errorMessage      │
│    sentAt            │
│    deliveredAt       │
└──────────────────────┘
```

---

### Simplified ERD with Cardinality

```
                    ┌─────────────┐
                    │    User     │
                    │ (id, email) │
                    └──────┬──────┘
                           │
                           │ 1:N
                           │
                           ▼
                    ┌─────────────┐
                    │UserSession  │
                    │(id, userId) │
                    └─────────────┘


┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│ Publication │         │PublicationAuthor │         │   Faculty   │
│  (id, doi)  │────────►│(publicationId,   │◄────────│ (id, name)  │
│             │   M     │  facultyId)      │    M    │             │
└─────────────┘         └──────────────────┘         └──────┬──────┘
                                                             │
                                                             │ 1:N
                                                             │
                                                             ▼
                                                      ┌─────────────┐
                                                      │   Project   │
                                                      │(id, title)  │
                                                      └─────────────┘


┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Patent    │         │ PatentInventor   │         │   Faculty   │
│(id, number) │────────►│  (patentId,      │◄────────│ (id, name)  │
│             │    M    │   facultyId)     │    M    │             │
└─────────────┘         └──────────────────┘         └─────────────┘


┌──────────────┐              ┌──────────────┐              ┌──────────────┐
│ContactInquiry│              │  NewsEvent   │              │Registration  │
│ (id, email)  │              │ (id, title)  │              │(id, email)   │
└──────────────┘              └──────────────┘              └──────────────┘
     (No relationships - Independent entities)
```

---

### Database Relationships Summary

| Parent Entity | Child Entity | Relationship Type | Cardinality |
|--------------|--------------|-------------------|-------------|
| User | UserSession | One-to-Many | 1:N |
| Publication | PublicationAuthor | Many-to-Many | M:N |
| Faculty | PublicationAuthor | Many-to-Many | M:N |
| Faculty | ResearchProject | One-to-Many | 1:N |
| ResearchProject | ProjectMilestone | One-to-Many | 1:N |
| Patent | PatentInventor | Many-to-Many | M:N |
| Faculty | PatentInventor | Many-to-Many | M:N |

**Independent Entities (No Foreign Keys):**
- ContactInquiry
- NewsEvent
- Registration
- EmailLog

---

## 📋 Attributes Details

### User Entity
- **Primary Key:** id (Auto-increment)
- **Unique Key:** email
- **Indexed Fields:** email, role, isVerified
- **Security:** password (bcrypt hashed)
- **Audit:** createdAt, updatedAt, lastLogin

### Publication Entity
- **Primary Key:** id
- **Unique Key:** doi (if available)
- **Indexed Fields:** year, authors, journal
- **Full-Text Search:** title, abstract, keywords

### Faculty Entity
- **Primary Key:** id
- **Unique Key:** email
- **Indexed Fields:** department, name
- **External Links:** linkedIn, googleScholar, orcid

### ResearchProject Entity
- **Primary Key:** id
- **Foreign Key:** faculty_lead (references Faculty.id)
- **Indexed Fields:** status, start_date
- **Enum Fields:** status (Ongoing, Completed, Proposed)

### Patent Entity
- **Primary Key:** id
- **Unique Key:** patent_number
- **Indexed Fields:** status, filing_date
- **Enum Fields:** status (Filed, Granted, Pending, Rejected)

### ContactInquiry Entity
- **Primary Key:** id
- **Indexed Fields:** status, email, createdAt
- **Enum Fields:** status (Pending, Resolved, In Progress)

### NewsEvent Entity
- **Primary Key:** id
- **Indexed Fields:** event_date, type, isPublished
- **Enum Fields:** type (News, Event, Workshop, Seminar)

### Registration Entity
- **Primary Key:** id
- **Indexed Fields:** status, course
- **Enum Fields:** status (Pending, Approved, Rejected)

---

## 🔑 Database Constraints

### Primary Key Constraints
```sql
ALTER TABLE Users ADD PRIMARY KEY (id);
ALTER TABLE Publications ADD PRIMARY KEY (id);
ALTER TABLE Faculty ADD PRIMARY KEY (id);
ALTER TABLE ResearchProjects ADD PRIMARY KEY (id);
ALTER TABLE Patents ADD PRIMARY KEY (id);
ALTER TABLE ContactInquiries ADD PRIMARY KEY (id);
ALTER TABLE NewsEvents ADD PRIMARY KEY (id);
ALTER TABLE Registrations ADD PRIMARY KEY (id);
```

### Foreign Key Constraints
```sql
-- Research Projects
ALTER TABLE ResearchProjects 
  ADD CONSTRAINT fk_faculty_lead 
  FOREIGN KEY (faculty_lead) 
  REFERENCES Faculty(id) 
  ON DELETE SET NULL;

-- Publication-Author Junction
ALTER TABLE PublicationAuthor 
  ADD CONSTRAINT fk_publication 
  FOREIGN KEY (publicationId) 
  REFERENCES Publications(id) 
  ON DELETE CASCADE;

ALTER TABLE PublicationAuthor 
  ADD CONSTRAINT fk_author 
  FOREIGN KEY (facultyId) 
  REFERENCES Faculty(id) 
  ON DELETE CASCADE;

-- Patent-Inventor Junction
ALTER TABLE PatentInventor 
  ADD CONSTRAINT fk_patent 
  FOREIGN KEY (patentId) 
  REFERENCES Patents(id) 
  ON DELETE CASCADE;

ALTER TABLE PatentInventor 
  ADD CONSTRAINT fk_inventor 
  FOREIGN KEY (facultyId) 
  REFERENCES Faculty(id) 
  ON DELETE CASCADE;
```

### Unique Constraints
```sql
ALTER TABLE Users ADD UNIQUE (email);
ALTER TABLE Faculty ADD UNIQUE (email);
ALTER TABLE Publications ADD UNIQUE (doi);
ALTER TABLE Patents ADD UNIQUE (patent_number);
```

### Check Constraints
```sql
-- User role validation
ALTER TABLE Users 
  ADD CONSTRAINT chk_role 
  CHECK (role IN ('user', 'admin', 'faculty', 'student'));

-- Publication year validation
ALTER TABLE Publications 
  ADD CONSTRAINT chk_year 
  CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM CURRENT_DATE));

-- Project status validation
ALTER TABLE ResearchProjects 
  ADD CONSTRAINT chk_status 
  CHECK (status IN ('Proposed', 'Ongoing', 'Completed', 'Suspended'));

-- Contact inquiry status
ALTER TABLE ContactInquiries 
  ADD CONSTRAINT chk_contact_status 
  CHECK (status IN ('Pending', 'In Progress', 'Resolved', 'Closed'));
```

---

## 📊 Normalization Analysis

### Current Normalization Form: **3NF (Third Normal Form)**

**1NF (First Normal Form):**
✅ All tables have primary keys
✅ All attributes contain atomic values
✅ No repeating groups

**2NF (Second Normal Form):**
✅ All non-key attributes are fully dependent on primary key
✅ No partial dependencies exist

**3NF (Third Normal Form):**
✅ No transitive dependencies
✅ All attributes depend only on primary key

**Potential Denormalization Areas (for performance):**
- `authors` field in Publications (stored as text for quick display)
- `research_areas` in Faculty (stored as text array)
- `citation_count` in Publications (cached value, updated periodically)

---

## 🎯 End of Diagrams

**Note:** These diagrams can be imported into tools like:
- **Draw.io** (diagrams.net)
- **Lucidchart**
- **Microsoft Visio**
- **PlantUML**
- **dbdiagram.io**

For visual representation, you can use online ERD tools by importing the schema or manually recreating these ASCII diagrams.
