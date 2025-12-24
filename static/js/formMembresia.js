const form = document.getElementById("form-membresia");

// Referencias a los inputs
const nombre = document.getElementById("nombre");
const documento = document.getElementById("documento");
const numeroDoc = document.getElementById("numero-doc"); 
const fechaNacimiento = document.getElementById("fecha-nacimiento");
const nacionalidad = document.getElementById("nacionalidad");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const contrasena = document.getElementById("contrasena");
const confirmar = document.getElementById("confirmar");
const tarjeta = document.getElementById("tarjeta");
const terminos = document.getElementById("terminos");
const datos = document.getElementById("datos");

// Evento Submit
form.onsubmit = function (e) {
    e.preventDefault();
    validarFormulario();
}

function validarFormulario() {
    if (
        nombre.value.trim() === "" ||
        documento.value === "" ||
        numeroDoc.value.trim() === "" ||
        fechaNacimiento.value === "" ||
        nacionalidad.value.trim() === ""
    ) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }
    if (!correo.value.includes("@") || !correo.value.includes(".")) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }
    if (contrasena.value.length < 6) {
        alert("La contraseña debe tener mínimo 6 caracteres.");
        return;
    }
    if (contrasena.value !== confirmar.value) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    if (!terminos.checked || !datos.checked) {
        alert("Debes aceptar los términos y condiciones para continuar.");
        return;
    }
    enviarFormulario();
}

async function enviarFormulario() {
    const datosFormulario = {
        nombre: nombre.value,
        documento: documento.value,
        numeroDoc: numeroDoc.value,
        fechaNacimiento: fechaNacimiento.value,
        nacionalidad: nacionalidad.value,
        correo: correo.value,
        telefono: telefono.value,
        contrasena: contrasena.value,
        tarjeta: tarjeta.value
    };

    try {
        const response = await fetch("/api/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosFormulario)
        });
        const data = await response.json();
        if (data.exito) {
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        } else {
            alert("Error: " + data.mensaje);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error de conexión. Intenta nuevamente.");
    }
}