

const Product = require('../models/products');



exports.getProducts = (req, res, next) => {

  Product.find().then(lstProduct=>{
    return res.status(200).send(lstProduct);
  })
 
};

exports.getDetailProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId).then(item=>{
    if(item){
      return res.status(200).send(item);
    } else {
      return res.status(404);
    }
  })
 
};


// exports.postSignup = (req, res, next) => {
//   // const email = req.body.email;
//   // const password = req.body.password;
//   // const confirmPassword = req.body.confirmPassword;
//   const email = req.query.email;
//   const password = req.query.password;
//   const fullname = req.query.fullname;
//   const phone =req.query.phone;

//   User.findOne({ email: email })
//     .then(userDoc => {
//       if (userDoc) {
//         req.flash('error', 'E-Mail exists already, please pick a different one.');
//         return res.status(400).send({message : 'E-Mail exists already, please pick a different one.'})
//       }
//       return bcrypt
//         .hash(password, 12)
//         .then(hashedPassword => {
//           const user = new User({
//             email: email,
//             password: hashedPassword,
//             fullname: fullname,
//             phone: phone,
//             cart: { items: [] }
//           });
//           return user.save();
//         })
//         .then(result => {
//           res.status(200).send({message : "Create account successfully"})
//         });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };


