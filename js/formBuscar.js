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

    if (origen === "Aeropuerto Internacional Jorge Chávez (Lima)") {
        mostrarVuelosDesdeLima(destino);
    } else {
        mostrarVuelos(origen, destino);
    }
});

function mostrarVuelos(origen, destino) {
    const vuelos = [
        { duracion: "1h 20m" },
        { duracion: "1h 25m" },
        { duracion: "1h 15m" },
        { duracion: "1h 30m" }
    ];

    // Generar hora de salida y precio aleatorio
    vuelos.forEach(vuelo => {
        const hora = Math.floor(Math.random() * 24).toString().padStart(2, "0");
        const minutos = (Math.floor(Math.random() * 12) * 5).toString().padStart(2, "0"); // múltiplos de 5
        vuelo.hora = `${hora}:${minutos}`;
        vuelo.precio = Math.floor(Math.random() * 300) + 100; // entre 100 y 400
    });

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

    html += botonVolver();
    resultados.innerHTML = html;
    activarBotonVolver();
}

function mostrarVuelosDesdeLima(destino) {
    const vuelosLima = {
        "Aeropuerto Internacional Alejandro Velasco Astete (Cusco)": [
            { dia: "Lunes a Domingo", salida: "06:00", llegada: "07:20" },
            { dia: "Lunes a Domingo", salida: "15:00", llegada: "16:20" }
        ],
        "Aeropuerto Internacional Rodríguez Ballón (Arequipa)": [
            { dia: "Lunes a Sábado", salida: "07:00", llegada: "08:25" },
            { dia: "Lunes a Sábado", salida: "17:00", llegada: "18:25" }
        ],
        "Aeropuerto Internacional Capitán FAP Víctor Montes (Piura)": [
            { dia: "Martes", salida: "09:05", llegada: "10:45" },
            { dia: "Jueves", salida: "15:30", llegada: "17:15" }
        ],
        "Aeropuerto Internacional Coronel FAP Francisco Secada Vignetta (Iquitos)": [
            { dia: "Miércoles", salida: "10:00", llegada: "11:50" },
            { dia: "Domingo", salida: "14:00", llegada: "15:50" }
        ],
        "Aeropuerto Inca Manco Cápac (Juliaca)": [
            { dia: "Martes", salida: "06:30", llegada: "08:10" },
            { dia: "Viernes", salida: "14:15", llegada: "15:55" },
            { dia: "Domingo", salida: "07:00", llegada: "08:40" }
        ],
        "Aeropuerto Capitán FAP Carlos Martínez de Pinillos (Trujillo)": [
            { dia: "Lunes a Viernes", salida: "08:15", llegada: "09:25" },
            { dia: "Lunes a Viernes", salida: "16:30", llegada: "17:40" },
            { dia: "Sábado", salida: "10:00", llegada: "11:10" }
        ],
        "Aeropuerto Capitán FAP Pedro Canga Rodríguez (Tumbes)": [
            { dia: "Lunes", salida: "07:45", llegada: "09:10" },
            { dia: "Miércoles", salida: "13:00", llegada: "14:25" },
            { dia: "Viernes", salida: "18:00", llegada: "19:25" }
        ]
    };

    const vuelos = vuelosLima[destino];

    if (!vuelos) {
        resultados.innerHTML = `
            <p>No hay vuelos disponibles desde Lima hacia este destino.</p>
            <img src="imagenes/triste.jpg" alt="No hay vuelos disponibles" width="50%"><br><br>
            ${botonVolver()}
        `;
        activarBotonVolver();
        return;
    }

    let html = `
        <h2>Vuelos disponibles</h2>
        <p><strong>Desde:</strong> Lima (LIM)</p>
        <p><strong>Hacia:</strong> ${destino}</p>
        <hr>
    `;

    vuelos.forEach((vuelo, i) => {
        html += `
            <div class="vuelo">
                <p><strong>Vuelo ${i + 1}</strong></p>
                <p>Día: ${vuelo.dia}</p>
                <p>Salida: ${vuelo.salida}</p>
                <p>Llegada: ${vuelo.llegada}</p>
                <hr>
            </div>
        `;
    });

    html += botonVolver();
    resultados.innerHTML = html;
    activarBotonVolver();
}

function botonVolver() {
    return `<button type="button" id="volverBuscar">Volver a buscar</button>`;
}

function activarBotonVolver() {
    document.getElementById("volverBuscar").addEventListener("click", () => {
        resultados.innerHTML = "";
        form.reset();
        form.style.display = "block";
    });
}