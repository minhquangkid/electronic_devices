const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

// const MONGODB_URI =
//   "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/asm3?retryWrites=true";

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;

const User = require("./models/users");
//const Product = require("./models/products");
// const Order = require("./models/orders");
// const Session = require("./models/sessions");

const authRoutes = require("./routes/auth");
const products = require("./routes/products");
const cartRoutes = require("./routes/cart");
const emailRoutes = require("./routes/email");
const historyRoutes = require("./routes/histories");

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json()); // cái này dùng với fetch có method là POST
app.use(express.urlencoded({ extended: false })); // cái này dùng với tag <form> có method là POST

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
//const csrfProtection = csrf();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//app.use(csrfProtection);

app.use(flash());
app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(products);
app.use(cartRoutes);
app.use(emailRoutes);
app.use(historyRoutes);

// User.createCollection().then(function (collection) {
//   console.log('Collection is created!');
// }); // tự động tạo collection trên mongodb dựa theo model bên nodejs
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
    // tạo database tên là asm3
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("Mongodb connect");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.use((req, res, next) => { // phải kiếm chỗ đặt cái này
//   res.status(404).send({ message: "Route not found" });
// });

// app.listen(5000);
