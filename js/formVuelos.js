const formCompra = document.getElementById("formCompraFinal");

if (formCompra) {
    formCompra.addEventListener("submit", async (e) => {
        
        e.preventDefault();

        const formData = new FormData(formCompra);
        const datosParaEnviar = Object.fromEntries(formData.entries());

        if (datosParaEnviar.origen === datosParaEnviar.destino) {
            alert("El aeropuerto de salida y destino no pueden ser el mismo.");
            return;
        }

        console.log("Datos listos para enviar:", datosParaEnviar);

        try {
            const respuesta = await fetch("http://localhost:5000/compra", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosParaEnviar)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                alert("Éxito: " + resultado.mensaje);
                formCompra.reset(); 
                mostrarCuotas(false); 
            } else {
                alert("Error: " + (resultado.mensaje || "Ocurrió un problema en el servidor"));
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor Python. Asegúrate de que app.py esté ejecutándose en el puerto 5000");
        }
    });
}

function mostrarCuotas(visible) {
    const seccionCuotas = document.getElementById('seccion_cuotas');
    if (seccionCuotas) {
       
        seccionCuotas.style.display = visible ? 'block' : 'none';
    }
}