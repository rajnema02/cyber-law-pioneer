const mongoose = require('mongoose');
const debug = require('debug')(process.env.DEBUG + 'mongodb');

// Mongoose settings
mongoose.set('strictQuery', true); // or false if you prefer loose filters

const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cedmap';
const dbName = process.env.DB_NAME || 'cedmap';

mongoose.connect(dbUri, {
  dbName,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  debug(`✅ Connected to MongoDB: ${dbName}`);
})
.catch((err) => {
  debug(`❌ MongoDB connection error: ${err.message}`);
  process.exit(1); // Stop the server if DB fails
});

mongoose.connection.on('connected', () => {
  debug(`Mongoose connected to ${dbName}`);
});

mongoose.connection.on('error', (err) => {
  debug(`Mongoose error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  debug('Mongoose connection is disconnected.');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  debug('Mongoose connection closed on app termination.');
  process.exit(0);
});
