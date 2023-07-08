const User = require("../models/users");
const Order = require("../models/orders");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       // api_user: "node-email",
//       api_key:
//         "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",
//     },
//   })
// );

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
          //user.clearCart();
          res.status(200);

          transporter.sendMail(
            {
              to: email,
              from: "minhquangsendemail@gmail.com",
              subject: "Order succeeded!",
              html: "<h1>You successfully ordered !</h1>",
            },
            function (err, inf) {
              if (err) {
                console.log(err);
              } else {
                console.log("Email sent : " + inf.response);
              }
            }
          );

          // transporter.sendMail({
          //   to: "quangnguyenminh.it@gmail.com",
          //   from: "minhquangsendemail@gmail.com",
          //   subject: "Order succeeded!",
          //   html: "<h1>You successfully ordered !</h1>",
          // });

          //////////////////////////////////////////////////////////////////////
          //   var transporter = nodemailer.createTransport({
          //     // config mail server
          //     host: "smtp.gmail.com",
          //     port: 465,
          //     secure: true,
          //     auth: {
          //       user: "minhquangsendemail@gmail.com", //Tài khoản gmail vừa tạo
          //       pass: "Minhquang@98", //Mật khẩu tài khoản gmail vừa tạo
          //     },
          //     tls: {
          //       // do not fail on invalid certs
          //       rejectUnauthorized: false,
          //     },
          //   });

          //   var content = "";
          //   content += `
          //     <div style="padding: 10px; background-color: #003375">
          //         <div style="padding: 10px; background-color: white;">
          //             <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
          //             <span style="color: black">Đây là mail test</span>
          //         </div>
          //     </div>
          // `;
          //   var mainOptions = {
          //     // thiết lập đối tượng, nội dung gửi mail
          //     from: "NQH-Test nodemailer",
          //     to: email,
          //     subject: "Test Nodemailer",
          //     text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
          //     html: content, //Nội dung html mình đã tạo trên kia :))
          //   };
          //   transporter.sendMail(mainOptions, function (err, info) {
          //     if (err) {
          //       console.log(err);
          //       req.flash("mess", "Lỗi gửi mail: " + err); //Gửi thông báo đến người dùng
          //       res.redirect("/");
          //     } else {
          //       console.log("Message sent: " + info.response);
          //       req.flash("mess", "Một email đã được gửi đến tài khoản của bạn"); //Gửi thông báo đến người dùng
          //       res.redirect("/");
          //     }
          //   });
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
