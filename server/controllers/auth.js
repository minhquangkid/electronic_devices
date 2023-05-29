const bcrypt = require('bcryptjs');

const User = require('../models/users');

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.status(400).send({message : "Login failed"})
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.status(200).send({message : "Login succeeded"})
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.status(400).send({message : "Login failed"})
        })
        .catch(err => {
          console.log(err);
          res.status(400).send({message : "Login failed"})
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  const email = req.query.email;
  const password = req.query.password;
  const fullname = req.query.fullname;
  const phone =req.query.phone;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.status(400).send({message : 'E-Mail exists already, please pick a different one.'})
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            fullname: fullname,
            phone: phone,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.status(200).send({message : "Create account successfully"})
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.status(200).send({message : "logout succeeded"})
  });
};
