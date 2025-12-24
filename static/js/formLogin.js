document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mensajeError = document.getElementById("mensajeError");

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.exito) {
            localStorage.setItem("usuario_id", data.usuario.id);
            localStorage.setItem("usuario_nombre", data.usuario.nombre);
            
            alert("Bienvenido " + data.usuario.nombre);
            window.location.href = "index.html";
        } else {
            mensajeError.textContent = data.mensaje;
        }

    } catch (error) {
        mensajeError.textContent = "Error de conexión con el servidor";
    }
});