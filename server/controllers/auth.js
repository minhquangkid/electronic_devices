const bcrypt = require("bcryptjs");

const User = require("../models/users");

// exports.postLogin = (req, res, next) => { // đây là cách trả về bằng status code, FE sẽ dựa theo status code mà handle
//   const email = req.query.email;
//   const password = req.query.password;
//   User.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         return res.status(404).send({ message: 'Incorrect email!' });
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             return req.session.save(err => {
//               if (err) {
//                 console.log(err);
//                 return res.status(500).send({ message: 'Login failed' });
//               }
//               res.status(200).send({ message: 'Login succeeded' });
//             });
//           }
//           res.status(401).send({ message: 'Incorrect password!' });
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).send({ message: 'Login failed' });
//         });
//     })
//     .catch(err => console.log(err));
// };

// còn đây là cách trả về mà FE sẽ dựa theo message để handle

exports.postLogin = (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "Incorrect email!" });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err) {
                console.log(err);
                return res.status(400).send({ message: "Login failed" });
              }
              res.cookie("userLoggedIn", user.email, {
                // maxAge: 86400000, // Cookie expiration time (in milliseconds)
                // httpOnly: true, // Cookie accessible only by the server
                // secure: true, // Cookie only sent over HTTPS if enabled
                // sameSite: "strict", // Restrict cookie to same-site requests
              });
              res.status(200).send(user);
            });
          }
          res.status(400).send({ message: "Incorrect password!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ message: "Login failed" });
        });
    })
    .catch((err) => console.log(err));
};

exports.postAdminLogin = (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "Incorrect email!" });
      }
      if (user.role == "Customer") {
        return res
          .status(403)
          .send({ message: "Only Admin or Counselor can login" });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err) {
                console.log(err);
                return res.status(400).send({ message: "Login failed" });
              }
              res.status(200).send(user);
            });
          }
          res.status(400).send({ message: "Incorrect password!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ message: "Login failed" });
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  const email = req.query.email;
  const password = req.query.password;
  const fullname = req.query.fullname;
  const phone = req.query.phone;
  const role = req.query.role;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.status(400).send({
          message: "E-Mail exists already, please pick a different one.",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            fullname: fullname,
            phone: phone,
            role: role,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.status(200).send({ message: "Create account successfully" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId).then((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404);
    }
  });
};

exports.getLogout = (req, res, next) => {
  res.clearCookie("userLoggedIn");
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).send({ message: "logout succeeded" });
  });
};

exports.getAllClients = (req, res, next) => {
  User.find({ role: "Customer" }).then((data) => {
    res.status(200).send(data);
  });
};
