const express = require("express");
const { userRegister, userLogin, getUser, updateUser, deleteUser } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// router para iniciar sesión
router.post("/login", userLogin);
// router para registrarse
router.post("/register", userRegister);
// router para obtener los datos del usuario
router.get("/", getUser)
// router para cambiar los datos del  usuario
router.put("/update/:id", updateUser)
// router para eliminar usuario
router.delete("/delete/:id", deleteUser)

module.exports = router;