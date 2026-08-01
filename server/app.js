const path = require('path');
const express = require('express');
const cors = require('cors');

const activityRoutes = require('./routes/activityRoutes');
const participantRoutes = require('./routes/participantRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const standRoutes = require('./routes/standRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/activities', activityRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/stands', standRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'CampusFest API está en línea' });
});

// Serves the static frontend
app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  return res.sendFile(path.join(__dirname, '..', 'client', 'pages', '404.html'), (err) => {
    if (err) next(err);
  });
});

app.use('/api', notFound);
app.use(errorHandler);

module.exports = app;
