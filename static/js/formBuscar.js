const form = document.getElementById("formularioINDEX");
const resultados = document.getElementById("resultadosVuelos");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const origen = document.getElementById("aeropuertoS").value;
    const destino = document.getElementById("aeropuertoD").value;
    const fechaIda = document.getElementById("fechaIda").value;
    if (origen === destino) {
        alert("El origen y el destino no pueden ser iguales.");
        return;
    }
    if (!fechaIda) {
        alert("Por favor selecciona una fecha de ida.");
        return;
    }
    try {
        const response = await fetch(`/api/buscar-vuelos?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&fecha=${fechaIda}`);
        if (!response.ok) throw new Error("Error en el servidor");
        const vuelos = await response.json();
        mostrarResultados(vuelos, origen, destino, fechaIda);
    } catch (error) {
        console.error("Error buscando vuelos:", error);
        resultados.innerHTML = "<p style='color:red; text-align:center;'>Ocurrió un error al buscar.</p>";
    }
});

function mostrarResultados(vuelos, origen, destino, fecha) {
    form.style.display = "none";
    if (vuelos.length === 0) {
        resultados.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>No hay vuelos programados para el ${fecha}</h3>
                <p>Intenta con otra fecha (ej: prueba con fechas de 2025 que insertamos en la BD).</p>
                <button onclick="location.reload()" style="padding:10px;">Nueva Búsqueda</button>
            </div>
        `;
        return;
    }
    let html = `<h2>Vuelos encontrados para el ${fecha}</h2>`;
    vuelos.forEach(vuelo => {
        html += `
            <div style="border:1px solid #ccc; padding:15px; margin:10px 0; background:white; border-radius:8px;">
                <p><strong>Ruta:</strong> ${vuelo.origen} ➝ ${vuelo.destino}</p>
                <p><strong>Hora:</strong> ${vuelo.hora_salida} - ${vuelo.hora_llegada}</p>
                <p style="font-size:1.2em; color:#004aad;"><strong>Precio: $${vuelo.precio}</strong></p>
                
                <button 
                    onclick="verificarLoginYComprar(${vuelo.id})" 
                    style="background-color: #28a745; color: white; padding: 10px; border: none; cursor: pointer; width:100%;">
                    Comprar Vuelo
                </button>
            </div>
        `;
    });

    html += `<br><button onclick="location.reload()">Realizar otra búsqueda</button>`;
    resultados.innerHTML = html;
}

// FUNCIÓN DE COMPRA
async function verificarLoginYComprar(vueloId) {
    const usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
        alert("Debes iniciar sesión para comprar.");
        localStorage.setItem("vuelo_pendiente", vueloId);
        window.location.href = "login.html";
    } else {
        if(confirm("¿Confirmar compra de este vuelo?")) {
            realizarCompra(usuarioId, vueloId);
        }
    }
}

async function realizarCompra(usuarioId, vueloId) {
    try {
        const response = await fetch('/api/comprar-vuelo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: usuarioId, vuelo_id: vueloId })
        });
        const data = await response.json();
        
        if (data.exito) {
            alert("¡Compra exitosa!");
            window.location.href = "index.html";
        } else {
            alert("Error: " + data.mensaje);
        }
    } catch (error) {
        alert("Error de conexión.");
    }
}