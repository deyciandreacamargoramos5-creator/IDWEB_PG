const form = document.getElementById("form-membresia");

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
        alert("Completa todos los campos obligatorios");
        return;
    }
    if (!correo.value.includes("@")) {
        alert("Correo electrónico inválido");
        return;
    }
    if (contrasena.value.length < 6) {
        alert("La contraseña debe tener mínimo 6 caracteres");
        return;
    }
    if (contrasena.value !== confirmar.value) {
        alert("Las contraseñas no coinciden");
        return;
    }
    if (!terminos.checked || !datos.checked) {
        alert("Debes aceptar los términos y el uso de datos");
        return;
    }
    enviarFormulario();
}

function enviarFormulario() {

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

    fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosFormulario)
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data.mensaje);
        form.reset();
    })
    .catch(error => {
        console.error(error);
        alert("Error al conectar con el servidor");
    });
}