require("dotenv").config();

// const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;

// const MONGODB_URI =
//   "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/asm3"; // Dev

const MONGODB_URI = process.env.MONGODB_URI; // Product

module.exports = MONGODB_URI;
