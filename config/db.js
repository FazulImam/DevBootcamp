const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://IFazul:${process.env.MONGODB_URI}@cluster0.neqbmuh.mongodb.net/DevBootcamp?retryWrites=true&w=majority`
  );
  console.log(`MongoDB connected ${conn.connection.host}`)
};

module.exports = connectDB;