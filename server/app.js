const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// const homeRouters = require("./routes/home");
// const hotelRouters = require("./routes/hotel");
// const roomRouters = require("./routes/rooms.js");
// const transactionRouters = require("./routes/transaction");
const User = require("./models/users");
const Product = require("./models/products");
const Order = require("./models/orders");
const Session = require("./models/sessions");
// const Hotel = require("./models/hotel");

// toàn bộ app.use() là đang sử dụng middleware
app.use(cors());

app.use(express.json()); // cái này dùng với fetch có method là POST
app.use(express.urlencoded({ extended: false })); // cái này dùng với tag <form> có method là POST

// app.get("/init", (req, res, next) => {
//   User.findOne({ isLogIn: true })
//     .then((data) => {
//       if (data) {
//         // console.log(data);

//         res.send(data);
//       } else {
//         res.status(400);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // return next(); // dùng next ở đây sẽ lỗi ?
// });
// app.use(homeRouters);
// app.use(hotelRouters);
// app.use(transactionRouters);
// app.use(roomRouters);

// User.createCollection().then(function (collection) {
//   console.log('Collection is created!');
// }); // tự động tại collection trên mongodb dựa theo model bên nodejs
// Product.createCollection().then(function (collection) {
//   console.log('Collection is created!');
// });
// Order.createCollection().then(function (collection) {
//   console.log('Collection is created!');
// });
// Session.createCollection().then(function (collection) {
//   console.log('Collection is created!');
// });
mongoose
  .connect(
    // tạo database tên là asm2
    "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/asm3?retryWrites=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("Mongodb connect");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.use((req, res, next) => { // phải kiếm chỗ đặt cái này
//   res.status(404).send({ message: "Route not found" });
// });

// app.listen(5000);
