const mongoose = require("mongoose");
// Módelo de producto del carrito en la base de datos
// Va a ser un lío completo el código para que el carrito funcione debidamente
const cartSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    productId: {type: String, required: true}
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

// Esto de aquí es para copiar y pegar rápidamente el modelo de carrito a portman
// "userId": "non",
// "ownerName": "paco" ,
