const User = require('../models/users');

exports.addCart = (req, res, next) => {
  const idUser = req.query.idUser;
  const idProduct = req.query.idProduct;
  const count = req.query.count;
  
    User.findById(idUser) // Assuming you have the userId available in the request
      .then(user => {
        if (!user) {
          // Handle the case where the user doesn't exist
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Call the instance method on the retrieved user instance
        user.addToCart({ idProduct, count })
          .then(() => {
            // Handle the success case
            res.status(200).json({ message: 'Added to cart successfully' });
          })
          .catch(error => {
            // Handle any errors
            res.status(500).json({ error: error.message });
          });
      })
      .catch(error => {
        // Handle any errors
        res.status(500).json({ error: error.message });
      });

 
};

exports.getCart = (req,res,next)=>{
  const idUser = req.query.idUser;
  User.findById(idUser)
  .populate('cart.items.productId')
  .exec((err, user) => {
    if (err) {
      console.error(err);
      return res.status(400);
    }
    if (!user) {
      console.log('User not found');
     return res.status(404);
    }
    res.status(200).send(user);
  });
};

exports.updateCart = (req,res,next) =>{
  const idUser = req.query.idUser;
  const idProduct = req.query.idProduct;
  const count = req.query.count;
  
    User.findById(idUser) 
      .then(user => {
        if (!user) {
          // Handle the case where the user doesn't exist
          return res.status(404).json({ message: 'User not found' });
        }
  
        user.updateCartByProductId(idProduct,count).then(() => {
          res.status(200).json({ message: 'Updated cart successfully' });
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
        
      })
      .catch(error => {
        // Handle any errors
        res.status(500).json({ error: error.message });
      });

}

exports.deleteItemCart = (req,res,next) =>{
  const idUser = req.query.idUser;
  const idProduct = req.query.idProduct;
  
    User.findById(idUser) 
      .then(user => {
        if (!user) {
          // Handle the case where the user doesn't exist
          return res.status(404).json({ message: 'User not found' });
        }
  
        user.removeFromCart(idProduct).then(() => {
          res.status(200).json({ message: 'Delete item successfully' });
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
        
      })
      .catch(error => {
        // Handle any errors
        res.status(500).json({ error: error.message });
      });

}