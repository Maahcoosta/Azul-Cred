
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const leadsRouter = require('./src/routes/leads');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/leads', leadsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});