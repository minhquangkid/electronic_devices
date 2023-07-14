const User = require("../models/users");
const Order = require("../models/orders");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "minhquangsendemail@gmail.com",
    pass: "ejqneshbbjjonjan",
  },
});

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
          res.status(200);

          User.findById(idUser)
            .populate("cart.items.productId")
            .exec((err, fullInf) => {
              var content = "";

              content += `
            <h1>Xin chào ${fullName}</h1>
            <p>Phone : ${phone}</p>
            <div style="text-align: center;">
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <th style="border: 1px solid black; padding: 8px;">Tên Sản Phẩm</th>
                <th style="border: 1px solid black; padding: 8px;">Hình Ảnh</th>
                <th style="border: 1px solid black; padding: 8px;">Giá</th>
                <th style="border: 1px solid black; padding: 8px;">Số Lượng</th>
                <th style="border: 1px solid black; padding: 8px;">Thành Tiền</th>
              </tr>`;

              fullInf.cart.items.forEach((e) => {
                content += `
              <tr>
                <td style="border: 1px solid black; padding: 8px;">${
                  e.productId.name
                }</td>
                <td style="border: 1px solid black; padding: 8px;">
                  <img
                    src=${e.productId.img1}
                    width="50px"
                    height="100px"
                    alt=${e.productId.name}
                  ></img>
                </td>
                <td style="border: 1px solid black; padding: 8px;">${
                  e.productId.price
                }</td>
                <td style="border: 1px solid black; padding: 8px;">${
                  e.quantity
                }</td>
                <td style="border: 1px solid black; padding: 8px;">${
                  e.productId.price * e.quantity
                } VNĐ</td>
              </tr>`;
              });

              content += `
            </table>
            </div>
            <h1>Tổng Thanh Toán</h1>
            <h1>${total} VNĐ</h1>
            <br>
            <h2>Cảm ơn bạn!</h2>`;

              transporter.sendMail(
                {
                  to: email,
                  from: "minhquangsendemail@gmail.com",
                  subject: "Order succeeded!",
                  html: content,
                },
                function (err, inf) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Email sent: " + inf.response);
                  }
                }
              );
            });

          user.clearCart();
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
