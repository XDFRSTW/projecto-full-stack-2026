import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"

const Perfil = () => {
    // Datos del usuario
    let [userImage, setUserImage] = useState("");
    let username = localStorage.getItem("User");
    let user = localStorage.getItem("Id");



    // Hablamos del producto

    // Id usuario
    let [userId, setUserId] = useState(user);
    // Nombre usuario
    let [ownerName, setOwnerName] = useState(username);
    // Nombre producto
    let [name, setName] = useState("");
    // Descripción producto
    let [descr, setDescr] = useState("");
    // Enlace de la imagen
    let [image, setImage] = useState("");
    // Precio delproducto
    let [price, setPrice] = useState("");
    // Localización del producto
    let [localization, setLocalization] = useState("");
    // Contacto con el dueño
    let [contact, setContact] = useState("");



    // Los datos del usuario se obtienen mediante local storage

    // Este código necesita ejecutarse dos veces para funcionar

    let Desolation = localStorage.getItem("Desolation");
    let length = 0;
    function fetchFix() {
        fetch("http://localhost:3000/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.password == Desolation ? length = index : console.log, setUserImage(userImage = dat.userImage), console.log(userImage) }))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }
    if (Desolation != "Not yet") {
        useEffect(() => {
            fetchFix()
            if (Desolation) {
                fetch("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${Desolation}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => localStorage.setItem("User", data[length].username))
                    .catch((error) => console.error("Error al obtener el usuario", error));
                // , localStorage.setItem("Desolation", "Not yet")
            }
        }, []);
    }

    // Función para ver el panel que te permite borrar el perfil 

    // Función asíncrona para borrar el perfil


    // Función para cambiar la foto de perfil del usuario
    const handleUserImage = async (e) => {
        e.preventDefault();

        try {
            const response = fetch(`http://localhost:3000/users/update/${user}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userImage })
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("Error al registrar el usuario", error);
        }


        console.log("En producción")
    }

    // Función para obtener los datos del usuario
    const handleGetUser = async (e) => {
        console.log("Hacerlo con useEffect")
    }

    // Función para crear productos
    const handleCreateProduct = async (e) => {
        console.log("En producción")
    }

    return (
        <>
            {/* Título */}
            < header >
                {/* Foto de perfil */}
                < div >
                    <img src={userImage} alt="Foto de perfil" />
                </div >
                {/* Datos del perfil y enlace a la foto */}
                < div >
                    <span>{username}</span>
                    <form onSubmit={handleUserImage}>
                        <input type="text" placeholder="*escribe" value={userImage} onChange={(e) => setUserImage(e.target.value)} />
                        <button type="submit">Cambiar</button>

                    </form>

                </div >
                {/* Eliminar perfil */}
                < div >
                    <span>Eliminar perfil</span>
                </div >
                {/* ¿seguro que quieres eliminar tu perfil? */}
                < div >
                    <p>¿Estas seguro de eliminar tu perfil?</p>
                    <div>
                        <button onClick={console.log("En producción")}>Si</button>
                        <button onClick={console.log("En producción")}>No</button>
                    </div>

                </div >

            </header >

            {/* Contenido "principal" */}
            < main >
                <div><a href="/Home" title="volver">Volver</a></div>
                <h2>Crear nuevo projecto</h2>
                {/* Formulario para crear un producto */}
                <form onSubmit={console.log("En producción")}>
                    {/* Datos del producto */}

                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" title="Escribe el nombre de tu producto">Nombre del producto</label>
                        <input id="name" type="text" placeholder="*escribe" required
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="des" title="Cuentanos algo sobre tu producto">Descripción del producto</label>
                        <input id="des" type="text" placeholder="*escribe" required
                            value={descr} onChange={(e) => setDescr(e.target.value)} />
                    </div>

                    {/* Imagen */}
                    <div>
                        <label htmlFor="img" title="Pega el enlace de una imagen que se parezca a tu producto">Enlace de imagen</label>
                        <input id="img" type="text" placeholder="*escribe" required
                            value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>

                    {/* Precio */}
                    <div>
                        <label htmlFor="price" title="Escribe el precio de tu producto y su moneda">Precio del producto</label>
                        <input id="price" type="text" placeholder="*escribe" required
                            value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    {/* Contacto */}
                    <div>
                        <label htmlFor="contact" title="Escribe tu contacto para que los usuarios puedan dar contigo">Contacto</label>
                        <input id="contact" type="text" placeholder="*escribe" required
                            value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>

                    {/* Localización */}
                    <div>
                        <label htmlFor="local" title="Escribe una ubicación cercana a ti para que los usuarios sepan siles merece la pena tu producto">Localización del producto</label>
                        <input id="local" type="text" placeholder="*escribe" required
                            value={localization} onChange={(e) => setLocalization(e.target.value)} />
                    </div>

                    {/* Botón para crear el producto */}
                    <div>
                        <button type="Submit" title="Crear un producto">Crear</button>
                    </div>
                </form>
            </main >
        </>
    )
}

export default Perfil