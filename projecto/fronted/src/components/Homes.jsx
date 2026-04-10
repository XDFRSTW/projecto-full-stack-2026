import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"

const Home = () => {
    // Hablamos del producto
    let [name, setName] = useState("");
    // Variable importante para el funcionamiento de la página (el motivo de estar en mayúscula es otro, al igual de no tener nada quever el nombre con su función. Guarda la contraseña del usuario)
    let Desolation = localStorage.getItem("Desolation");

    // Sistema para autentificar usuario
    // Para que las listas funcionen
    let length = 0;
    // Buscamos el espacio del array en el que se encuentra el usuario
    function fetchFix() {
        fetch("http://localhost:3000/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.password == Desolation ? length = index : console.log(); }))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }
    // Si la contraseña no vale esto, se ejecuta el código
    if (Desolation != "Not yet") {
        useEffect(() => {
            fetchFix()
            if (Desolation) {
                fetch("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${Desolation}`,
                    },
                })
                    // console.log(data.username))
                    .then((response) => response.json())
                    .then((data) => localStorage.setItem("User", data[length]._id), localStorage.setItem("Desolation", "Not yet"))
                    .catch((error) => console.error("Error al obtener el usuario", error));
            }
            console.log(length)
        }, []);
    }

    // Función para coger los datos de los productos, una y  otra vez
    const handleNewData = async (e) => {
        console.log("En producción")
    }

    return (
        <>
            {/* Título */}
            <header>

                {/* Menú desplegable */}
                <button>
                    <img src={menu} alt="menú" />
                </button>

                {/* Menú que se muestra al pulsar el botón */}
                <div>
                    <a href="/Perfil">Mi perfil</a>
                    <a href="/">Mis productos</a>
                    <a href="/">Mi carrito</a>
                </div>

                <h1>Galena</h1>

                {/* Modo colorido */}
                <div>
                    <img src={rainbow} alt="modo color" />
                </div>
            </header>

            {/* Contenido principal */}
            <main>

                {/* Buscador */}
                <div>
                    <form onSubmit={handleNewData}>
                        <input title="buscador" type="text" placeholder="buscar..." value={name} onChange={(e) => setName(e.target.value)} />
                        <button type="submit"><img src={lupa} alt="buscar" /></button>
                    </form>
                </div>

                {/* Resultados */}
                <div>

                </div>
            </main>
        </>
    )
}

export default Home