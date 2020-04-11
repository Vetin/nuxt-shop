const { Router } = require("express");
const router = Router();
const { login, createUser } = require("../controllers/auth.controller");

/* Default route - /api/auth */

/* Login route  /api/auth/login */
router.post("/login", login);

/* Register route  /api/auth/reguster */
router.post("/register", createUser);

module.exports = router;
