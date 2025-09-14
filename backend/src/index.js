const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://bbit:bbitpass@localhost:5432/bbitdb';
const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres', logging: false });

const Publication = sequelize.define('Publication', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.TEXT, allowNull: false },
  authors: { type: DataTypes.TEXT },
  year: { type: DataTypes.INTEGER },
  type: { type: DataTypes.STRING },
  abstract: { type: DataTypes.TEXT },
}, { timestamps: true });

async function init() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // WARNING: sync({ force: true }) will drop tables. Using sync() for dev.
    await sequelize.sync();
    const count = await Publication.count();
    if (count === 0) {
      await Publication.bulkCreate([
        { title: 'Designing Smart Campus IoT', authors: 'A. Kumar, P. Bhagat', year: 2024, type: 'Journal', abstract: 'Short abstract about smart campus IoT.' },
        { title: 'An AI approach to student attendance', authors: 'S. Sharma, P. Bhagat', year: 2023, type: 'Conference', abstract: 'Short abstract about AI attendance.' }
      ]);
      console.log('Seeded publications');
    }
  } catch (err) {
    console.error('DB init error', err);
    process.exit(1);
  }
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/publications', async (req, res) => {
  try {
    const pubs = await Publication.findAll({ order: [['year', 'DESC']] });
    res.json(pubs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/publications', async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const port = process.env.PORT || 4000;
init().then(() => {
  app.listen(port, () => console.log(`API listening on ${port}`));
});
