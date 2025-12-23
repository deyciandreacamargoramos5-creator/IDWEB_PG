const form = document.getElementById("formularioINDEX");
const aeropuertoS = document.getElementById("aeropuertoS");
const aeropuertoD = document.getElementById("aeropuertoD");
const resultados = document.getElementById("resultadosVuelos");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const origen = aeropuertoS.value.trim();
    const destino = aeropuertoD.value.trim();

    if (origen === "" || destino === "") {
        alert("Selecciona un aeropuerto de origen y destino");
        return;
    }

    if (origen === destino) {
        alert("El aeropuerto de origen y destino no pueden ser iguales");
        return;
    }

    form.style.display = "none";
    mostrarVuelos(origen, destino);
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