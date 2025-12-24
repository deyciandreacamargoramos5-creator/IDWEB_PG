const form = document.getElementById("formularioINDEX");
const resultados = document.getElementById("resultadosVuelos"); 

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());

    if (!datos.origen || !datos.destino) {
        alert("Selecciona un aeropuerto de origen y destino");
        return;
    }

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

function mostrarVuelos(origen, destino){
    const vuelos = [
        { hora: "06:15", duracion: "1h 20m", precio: 180 },
        { hora: "09:40", duracion: "1h 25m", precio: 210 },
        { hora: "14:30", duracion: "1h 15m", precio: 195 },
        { hora: "19:55", duracion: "1h 30m", precio: 260 }
    ];

    let html = `
        <h2>Vuelos disponibles</h2>
        <p><strong>Desde:</strong> ${origen}</p>
        <p><strong>Hacia:</strong> ${destino}</p>
        <hr>
    `;

    vuelos.forEach((vuelo, index) => {
        html += `
            <div class="vuelo">
                <p><strong>Vuelo ${index + 1}</strong></p>
                <p>Salida: ${vuelo.hora}</p>
                <p>Duración: ${vuelo.duracion}</p>
                <p>Precio: S/ ${vuelo.precio}</p>
                <hr>
            </div>
        `;
    });

    html += `
        <button type="button" id="volverBuscar">
            Volver a buscar
        </button>
    `;

    resultados.innerHTML = html;

    document.getElementById("volverBuscar").addEventListener("click", () => {
        resultados.innerHTML = "";
        form.reset();
        form.style.display = "block";
    });
};