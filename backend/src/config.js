const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://mongo:27017/databasetest';

// Mostrar la URI que se usará para conectar a MongoDB (solo para debug)
console.log('MongoDB URI:', URI);

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});

connection.on('error', (err) => {
    console.error('❌ Error connecting to MongoDB:', err);
});
