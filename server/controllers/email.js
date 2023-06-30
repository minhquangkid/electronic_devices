const User = require("../models/users");
const Order = require("../models/orders");

exports.postEmail = (req, res, next) => {
  const idUser = req.query.idUser;
  const email = req.query.email;
  const fullName = req.query.fullname;
  const phone = req.query.phone;
  const address = req.query.address;
  const total = req.query.total;

  User.findById(idUser) // Assuming you have the userId available in the request
    .then((user) => {
      if (!user) {
        // Handle the case where the user doesn't exist
        return res.status(404).json({ message: "User not found" });
      }

      const userCart = user.cart.items;

      const order = new Order({
        userId: idUser,
        fullName: fullName,
        email: email,
        phoneNumber: phone,
        address: address,
        cart: userCart,
        createAt: new Date(),
        status: "New",
        totalPrice: total,
      });

      order
        .save()
        .then(() => {
          user.clearCart();
          res.status(200);
        })
        .catch((err) => {
          console.log(err);
          res.status(400);
        });
    })
    .catch((error) => {
      // Handle any errors
      res.status(500).json({ error: error.message });
    });
};
