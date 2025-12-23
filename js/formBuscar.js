const form = document.getElementById("formularioINDEX");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    if (datos.origen === datos.destino) {
        alert("El origen y destino no pueden ser iguales");
        return;
    }

    try {
        await fetch("http://localhost:5000/buscar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.log("Servidor offline, pero mostrando resultados visuales.");
    }

    form.style.display = "none";
    mostrarVuelos(datos.origen, datos.destino);
});