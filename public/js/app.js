const express = require('express');
const cors = require('cors');
const leadsRoutes = require('./routes/leads.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadsRoutes);

module.exports = app;

