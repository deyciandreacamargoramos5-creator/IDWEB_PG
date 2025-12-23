const form = document.getElementById("form-membresia");
const nombre = document.getElementById("nombre");
const documento = document.getElementById("documento");
const numeroDoc = document.getElementById("numero-doc");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmar = document.getElementById("confirmar");
const terminos = document.getElementById("terminos");
const datosCheck = document.getElementById("datos");

form.onsubmit = function (e) {
    e.preventDefault();
    validarFormulario();
}

function validarFormulario() {
    if (nombre.value.trim() === "" || numeroDoc.value.trim() === "" || correo.value === "") {
        alert("Completa todos los campos obligatorios");
        return;
    }
    if (contrasena.value !== confirmar.value) {
        alert("Las contraseñas no coinciden");
        return;
    }
    if (!terminos.checked || !datosCheck.checked) {
        alert("Debes aceptar los términos y condiciones");
        return;
    }
    enviarFormulario();
}

function enviarFormulario() {
    const datosFormulario = {
        nombre: nombre.value,
        documento: documento.value,
        numeroDoc: numeroDoc.value,
        correo: correo.value,
        contrasena: contrasena.value
    };

    fetch("http://localhost:5000/membresia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.mensaje);
        form.reset();
    })
    .catch(err => alert("Error: No se pudo conectar con el servidor"));
}