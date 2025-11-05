document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-container");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const tipoDoc = document.getElementById("documento").value;
        const numeroDoc = document.getElementById("numero-doc").value;
        const fechaNac = document.getElementById("fecha-nacimiento").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmar").value;
        const terminos = document.getElementById("terminos").checked;

        if (contrasena !== confirmar) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!terminos) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        alert("Registro exitoso\n ¡Bienvenido al programa XenAirline Pass!");
        form.reset();

    });
});