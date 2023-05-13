const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  username: { type: String, required: true }, // bắt buộc vì trong đăng nhập có
  password: {
    type: String,
    required: true, // bắt buộc vì trong đăng nhập có
  },
  fullName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  idCard: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  isLogIn: {
    type: Boolean,
    required: true,
  }, 

});
module.exports = mongoose.model("Order", orderSchema); 


