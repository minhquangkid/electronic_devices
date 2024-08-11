module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).redirect("http://localhost:3000/signin");
  }
  next();
};
