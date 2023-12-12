const mongoose = require('mongoose');
let uri = "mongodb+srv://gorayausman061:Z0GiGTFr4JIPiUvl@cluster0.vdk3ku9.mongodb.net/TODO?retryWrites=true&w=majority"
// dunction for Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;