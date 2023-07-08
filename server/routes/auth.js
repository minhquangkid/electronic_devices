const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/users/login", authController.postLogin);

router.post("/users/admin/login", authController.postAdminLogin);

router.post("/users/signup", authController.postSignup);

router.get("/users/:id", authController.getUser);

router.get("/users-clients", authController.getAllClients);

router.get("/users-logout", authController.getLogout);

module.exports = router;
