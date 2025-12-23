const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const aeropuertoS = document.getElementById("aeropuertoS").value.trim();
    const aeropuertoD = document.getElementById("aeropuertoD").value.trim();
    const fecha = document.getElementById("fecha").value;
    const vuelo = document.getElementById("vuelo").value;
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (aeropuertoS === "" || aeropuertoD === "") {
        alert("Debe seleccionar aeropuerto de salida y destino");
        return;
    }

    if (aeropuertoS === aeropuertoD) {
        alert("El aeropuerto de salida y destino no pueden ser iguales");
        return;
    }

    if (vuelo < 1 || vuelo > 4) {
        alert("El número de vuelo debe estar entre 1 y 4");
        return;
    }

    if (nombre === "" || apellido === "") {
        alert("Complete sus datos personales");
        return;
    }

    if (!correo.includes("@")) {
        alert("Correo inválido");
        return;
    }

    if (telefono.length < 6) {
        alert("Número de teléfono inválido");
        return;
    }

    const datosCompra = {
        aeropuerto_salida: aeropuertoS,
        aeropuerto_destino: aeropuertoD,
        fecha_vuelo: fecha,
        numero_vuelo: vuelo,
        nombre,
        apellido,
        correo,
        telefono
    };

    fetch("http://localhost:5000/compra", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosCompra)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.mensaje);
        form.reset();
    })
    .catch(error => {
        console.error(error);
        alert("Error al conectar con el servidor");
    });
});