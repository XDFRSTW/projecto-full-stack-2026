import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../index.css'

const RegLog = () => {
    // Alternamos mediante un botón si queremos registrarnos o iniciar sesión
    let [regLog, setAction] = useState(true);
    // Los datos de los usuarios
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [userImage, setUserImage] = useState("https://i.pinimg.com/originals/9d/7c/74/9d7c745207ba381b7bc4d41912ef4196.jpg?nii=t");
    let [adminLv, setAdminLv] = useState("averageUser");
    // constante importada
    const history = useNavigate();
    const navigate = useNavigate();
    // evitar repeticiones de los nombres de usuario en la base de datos
    let [rejectRegister, setReject] = useState(false);
    // mensaje para el usuario
    let [message, setMessage] = useState("");



    // Función para registrarse
    const handleRegister = async (e) => {
        e.preventDefault();
        // Nos aseguramos antes de nada que el nombre de usuario no exista
        fetch("http://localhost:3000/users")
            .then((response) => response.json())
            .then((data) => data.map((dat, index) => { dat.username == username ? setReject(rejectRegister = true) : console.log("buscando usuarios...") }))
            .catch((error) => console.error("Error al obtener el mensaje", error));

        // Evitar que se creen usuarios con el mismo nombre
        if (rejectRegister == true) {
            setMessage(message = "El nombre de usuario ya existe")
        }
        // Si no existe el nombre de usuario, creamos el usuario
        // Esperamos unos segundos para confirmar si existe el usuario
        setTimeout(() => {
            if (rejectRegister == false) {

                try {
                    // await ha sido eliminado del fetch para que no se repitan los nombres de usuario (era la solución más simple que había podido encontrar)
                    const response = fetch("http://localhost:3000/users/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password, userImage, adminLv })
                    });
                    if (response.ok) {
                        // Cambiando valores de los inputs a "" para que se vea bonito
                        setUsername(username = "")
                        setPassword(password = "")
                        history("/")
                    }
                    // mensaje de usuario creado
                    setMessage(message = "Usuario creado con éxito. Prueba a iniciar sesión")
                } catch (error) {
                    console.error("Error al registrar el usuario", error);
                    setMessage(message = "No se ha podido crear el usuario")
                }
            }
        }, (3000))
    }

    // Función para iniciar sesión, aún en producción
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Conectandoa la base de datos
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                fetch("http://localhost:3000/users")
                    .then((response) => response.json())
                    // Técnica peligrosísima para autentificar usuario.La contraseña solo está expuesta durante unos segundos
                    .then((data) => data.map((dat, index) => { dat.username == username ? localStorage.setItem("Desolation", dat.password) : console.log("buscando usuario...") }))
                    .catch((error) => console.error("Error al obtener el mensaje", error));

                const data = await response.json();
                // Esto que puedes apreciar está puesto como comentario porque no hacía más que darme errores, por lo que he tenidoque optar por otros métodos para autentificar los usuarios
                // localStorage.setItem("token", data.token);
                navigate("/home");
                // data.token
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            setMessage(message = "Usuario creado con éxito. Prueba a iniciar sesión")
        }
    }

    return (
        <>
            <div>
                <div>

                    {/* Título de la web */}
                    <header>
                        <h1>Galena</h1>
                    </header>

                    {/* Imagen del mineral "Galena" */}
                    <div><img className="regLog-Image" src="Galena.png" alt="Galena" title="Galena" /></div>

                    {/* Información proporcionada al usuario */}
                    <div>
                        <p>Una vez registrado, vuelve a introducir los datos seleccionando la opción "Iniciar sesión" (si no sucede nada es porque los datos se han colocado mal). La creación del usuario puede llevar un rato, un mensaje por pantalla te avisará de ello</p>
                    </div>

                    <div>
                        {/* Botones para intercalar la funcionalidad del formulario */}
                        <button onClick={() => setAction(regLog = true)}>Registrarse</button>
                        <button onClick={() => setAction(regLog = false)}>Iniciar sesión</button>
                    </div>

                    <div>
                        {/* Formulario para iniciar sesión o registrarse */}
                        <form onSubmit={regLog == true ? handleRegister : handleLogin}>
                            {/* Nombre usuario */}
                            <label htmlFor="name">Nombre de usuario</label>
                            <input value={username} type="text" title="name" placeholder="*escribe"
                                required id="name" onChange={(e) => setUsername(e.target.value)} />
                            {/*  Contraseña */}
                            <label htmlFor="pin">Contraseña</label>
                            <input value={password} type="password" title="pin" placeholder="*escribe"
                                required id="pin" onChange={(e) => setPassword(e.target.value)} />
                            {/* Botón para subir datos */}
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                    
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default RegLog