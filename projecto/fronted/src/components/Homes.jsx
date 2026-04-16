import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'
import lupa from "../images/lupa.svg"
import menu from "../images/menu.svg"
import rainbow from "../images/rainbow.svg"
import galaxia from "../images/galaxia.png"
import cart from "../images/cart.svg"

const Home = () => {
    // Por si acaso

    const history = useNavigate();
    const navigate = useNavigate();

    // Respecto a mostrar todos los productos existente (el código que yo voya usar no serviría para páginas con bases de datos
    //  de tamaños importantes, por el tiempo que tardaría en cargar (en las típicas tiendas de productos suelen mostrarse de 
    // poco en poco para no saturar la computadora, ya que cargar cientos de miles de recursos del tirón puede llevar largo rato))

    // Aquí se guardan todos los productos existentes
    let [list, setList] = useState([]);

    //    Menú desplegable
    let [panel, setPanel] = useState(false);
    // let [rainbowMode, setRainbowMode] = useState(false);   Adios al modo arcoiris


    // El buscador de productos (filtro, aunque use filtro para todo) y el carrito

    let [search, setSearch] = useState(localStorage.getItem("search"));
    let [carts, setCarts] = useState("");
    let userId = localStorage.getItem("Id");

    // Preparamos el local storage
    localStorage.setItem("Image", "userImage")

    // Hablamos del producto

    // Nombre usuario
    let [ownerName, setOwnerName] = useState("");
    // Nombre producto
    let [name, setName] = useState("");
    // Descripción producto
    let [desrc, setDesrc] = useState("");
    // Enlace de la imagen
    let [image, setImage] = useState("");
    // Precio delproducto
    let [price, setPrice] = useState("");
    // Localización del producto
    let [localization, setLocalization] = useState("");
    // Contacto con el dueño
    let [contact, setContact] = useState("");


    // Variable importante para el funcionamiento de la página (el motivo de estar en mayúscula es otro, al igual de no tener nada quever el nombre con su función. Guarda la contraseña del usuario)
    let Desolation = localStorage.getItem("Desolation");

    // Sistema para autentificar usuario
    // Para que las listas funcionen
    let length = 0;
    // Buscamos el espacio del array en el que se encuentra el usuario
    function fetchFix() {
        fetch("https://produccion-livid.vercel.app/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.password == Desolation ? length = index : console.log(); }))
            .catch((error) => console.error("Error al obtener el usuario", error));
    }
    // Si la contraseña no vale esto, se ejecuta el código
    if (Desolation != "Not yet") {
        useEffect(() => {
            fetchFix()
            if (Desolation) {
                fetch("https://produccion-livid.vercel.app/users", {
                    headers: {
                        Authorization: `Bearer ${Desolation}`,
                    },
                })
                    // console.log(data.username))
                    .then((response) => response.json())
                    .then((data) => localStorage.setItem("Id", data[length]._id))
                    .catch((error) => console.error("Error al obtener el usuario", error));
                // , localStorage.setItem("Desolation", "Not yet")
            }
        }, []);
    }

    // Función para coger los datos de los productos, una y  otra vez
    function handleNewData() {
        localStorage.setItem("search", search)

    }

    // Esto se ejecuta la primera vez que se abre la página

    useEffect(() => {
        if (search == "") {
            fetch("https://produccion-livid.vercel.app/products")
                .then((response) => response.json())
                // No se lo que he hecho con este código, pero si funciona, no se toca
                .then((data) => setList(list = data.filter((dat) => dat)))
                .catch((error) => console.error("Error al obtener el usuario", error));
        }
        else {
            fetch("https://produccion-livid.vercel.app/products")
                .then((response) => response.json())
                .then((data) => setList(list = data.filter((dat) => dat.name == search)))
                .catch((error) => console.error("Error al obtener el usuario", error));
        }
    }, []);

    // data.map((dat, index) => { setList(list.push(dat)), console.log(list) })
    // setList(data.map((dat, index) => {list.push(dat), console.log(list)}))
    // ._id = "69dfae13f7498f699ddafed1"

    // Añadir objeto al carrito
    async function handleAddToCart(id) {
       let productId = id;
        try {

            const response = fetch("https://produccion-livid.vercel.app/carts/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId })
            });
            if (response.ok) {
                history("/")
            }
        } catch (error) {
            console.error("Error al crear el producto", error);
        }
    }

    return (
        <>
            {/* Título */}
            <header className="home-header flex bg-gray-500">

                {/* Menú desplegable */}
                <button onClick={() => panel == false ? setPanel(panel = true) : setPanel(panel = false)} className="home-left">
                    <img className="home-icons" src={menu} alt="menú" />
                </button>

                {/* Menú que se muestra al pulsar el botón */}
                <div className={panel == true ? ("home-panel perfil-showPanel") : ("perfil-deletePanel invisible perfil-fontSize")}>
                    <a className="home-routes" href="/Perfil">Mi perfil</a>
                    <a className="home-routes" href="/Productos">Mis productos</a>
                    <a className="home-routes" href="/Carrito">Mi carrito</a>
                </div>

                <h1 className="home-title">Galena</h1>

                {/* Modo colorido */}
                {/* <div onClick={() => rainbowMode == false ? setRainbowMode(rainbowMode = true) : setRainbowMode(rainbowMode = false)} className={rainbowMode == false ? "home-right" : "invisible"}>
                    <img title="modo colorido ultra rgb mega rainbow reluciente con brillo ascendente de luna diamantina plus XY galaxial nebuloso dorado" className="home-icons" src={rainbow} alt="modo color" />
                </div> */}
                {/* Ya no hay modo colorido */}
            </header>

            {/* Contenido principal */}
            <main>

                {/* Buscador */}
                <div>
                    <form className="line" onSubmit={handleNewData}>
                        <button title="buscar productos" className="home-iconsLupa" type="submit"><img src={lupa} alt="buscar" /></button>
                        <input title="buscador" type="text" placeholder="buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>

                {/* Resultados (Modelo de productos sacados de la página "productos", además del código) */}
                <div className="bg-gray-300 productsBox">
                    {/* Una vez más usamos index como key, pero en el caso de esta página, no resulta efectosnegativos enel rendimiento, o al menos así aparenta ser */}
                    {list.map((cont, index) => (

                        <div className="productBox" key={index}>
                            <div>
                                <span>{cont.name} : </span>
                                <span> {cont.price}</span>
                            </div>
                            <div>
                                <img className="border border-gray-900" src={cont.image} alt="imagen" />
                                <p className="border border-gray-900 p-2">{cont.desrc}</p>
                            </div>
                            <div className="data">
                                <span>{cont.ownerName}; </span>
                                <span> {cont.contact}; </span>
                                <span> {cont.localization}</span>
                            </div>
                            <div className="buttonsBox">
                                <button className="averageButton averageIcon" onClick={() => handleAddToCart(cont._id)}><img src={cart} alt="editar" title="editar el producto" /></button>
                            </div>
                        </div>
                    ))}
                    {console.log(search)}
                </div>
            </main>
        </>
    )
}

export default Home