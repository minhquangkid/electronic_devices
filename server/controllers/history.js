const Order = require("../models/orders");

exports.getHistoryByUserId = (req, res, next) => {
  const idUser = req.query.idUser;

  Order.find({ userId: idUser })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getHistoryDetail = (req, res, next) => {
  const idOrder = req.params.id;

  Order.findById(idOrder)
    .populate("cart.productId")
    .exec((err, order) => {
      res.status(200).send(order);
    });
};

exports.getHistoryAll = (req, res, next) => {
  Order.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
