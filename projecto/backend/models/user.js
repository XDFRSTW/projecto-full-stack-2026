const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Módelo de usuario en la base de datos
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    userImage : {type: String, required: true},
    userDescr : {type: String, required: true},
    products : {type: Number, required: true},
    cart : {type: Number, required: true},
    adminLv : {type: Number, required: true}

});
// Generar una contraseña aleatoria a partir de la introducida
userSchema.pre("save", async function() {
     if(!this.isModified("password"));
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 })

const User = mongoose.model("User", userSchema);

module.exports = User;