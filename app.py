from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

@app.route('/compra', methods=['POST'])
def procesar_compra():
    datos = request.json
    print("\n--- NUEVA COMPRA RECIBIDA ---")
    print(f"Pasajero: {datos.get('nombre')} {datos.get('apellido')}")
    print(f"Ruta: {datos.get('origen')} -> {datos.get('destino')}")
    return jsonify({"mensaje": "¡Reserva procesada con éxito por Xen Airlines!"}), 200

@app.route('/buscar', methods=['POST'])
def buscar_vuelos():
    datos = request.json
    print("\n--- BÚSQUEDA DE VUELOS ---")
    print(f"Desde: {datos.get('origen')} | Hacia: {datos.get('destino')}")
    print(f"Pasajeros: {datos.get('pps')}")
    return jsonify({"mensaje": "Vuelos encontrados"}), 200

@app.route('/membresia', methods=['POST'])
def registrar_membresia():
    datos = request.json
    print("\n--- NUEVO SOCIO REGISTRADO ---")
    print(f"Nombre: {datos.get('nombre')}")
    print(f"DNI/Doc: {datos.get('numeroDoc')}")
    return jsonify({"mensaje": "¡Registro exitoso! Bienvenido a XenAirline Pass"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)