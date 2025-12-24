from flask import Flask, request, jsonify, send_from_directory
import mysql.connector
from flask_cors import CORS
import os

# CAMBIO IMPORTANTE
app = Flask(__name__, static_folder='static')
CORS(app)

# CONFIGURACIÓN BASE DE DATOS
def obtener_conexion():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="", 
        database="xen_db"
    )

# RUTAS PARA SERVIR LAS PÁGINAS 
@app.route('/')
def index():
    return send_from_directory('static', 'index.html')
@app.route('/<path:nombre_archivo>')
def servir_archivos(nombre_archivo):
    print(f"Buscando en carpeta static: {nombre_archivo}") 
    return send_from_directory('static', nombre_archivo)


# RUTAS DE LA API
@app.route('/api/buscar-vuelos', methods=['GET'])
def buscar_vuelos():
    origen = request.args.get('origen')
    destino = request.args.get('destino')
    fecha = request.args.get('fecha')
    conn = obtener_conexion()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM vuelos WHERE origen = %s AND destino = %s"
    parametros = [origen, destino]
    if fecha:
        query += " AND fecha = %s"
        parametros.append(fecha)
    cursor.execute(query, tuple(parametros))
    vuelos = cursor.fetchall()
    cursor.close()
    conn.close()
    for vuelo in vuelos:
        if 'hora_salida' in vuelo: vuelo['hora_salida'] = str(vuelo['hora_salida'])
        if 'hora_llegada' in vuelo: vuelo['hora_llegada'] = str(vuelo['hora_llegada'])
        if 'fecha' in vuelo: vuelo['fecha'] = str(vuelo['fecha'])
            
    return jsonify(vuelos)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    conn = obtener_conexion()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT id, nombre, email FROM usuarios WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    usuario = cursor.fetchone()
    cursor.close()
    conn.close()
    if usuario:
        return jsonify({"exito": True, "usuario": usuario})
    else:
        return jsonify({"exito": False, "mensaje": "Credenciales incorrectas"})

@app.route('/api/comprar-vuelo', methods=['POST'])
def comprar_vuelo():
    data = request.json
    usuario_id = data.get('usuario_id')
    vuelo_id = data.get('vuelo_id')
    conn = obtener_conexion()
    cursor = conn.cursor()
    try:
        query = "INSERT INTO compras (usuario_id, vuelo_id) VALUES (%s, %s)"
        cursor.execute(query, (usuario_id, vuelo_id))
        conn.commit()
        resultado = {"exito": True, "mensaje": "Compra registrada correctamente"}
    except Exception as e:
        resultado = {"exito": False, "mensaje": str(e)}
    finally:
        cursor.close()
        conn.close()
    return jsonify(resultado)

# RUTA PARA REGISTRAR NUEVOS USUARIOS
@app.route('/api/registro', methods=['POST'])
def registro():
    data = request.json
    nombre = data.get('nombre')
    email = data.get('correo')
    password = data.get('contrasena')
    tipo_doc = data.get('documento')
    num_doc = data.get('numeroDoc')
    fecha_nac = data.get('fechaNacimiento')
    nacionalidad = data.get('nacionalidad')
    telefono = data.get('telefono')
    tarjeta = data.get('tarjeta')
    conn = obtener_conexion()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id FROM usuarios WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"exito": False, "mensaje": "Este correo electrónico ya está registrado."})
        sql = """
            INSERT INTO usuarios 
            (nombre, email, password, tipo_documento, numero_documento, fecha_nacimiento, nacionalidad, telefono, numero_tarjeta) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        valores = (nombre, email, password, tipo_doc, num_doc, fecha_nac, nacionalidad, telefono, tarjeta)
        cursor.execute(sql, valores)
        conn.commit()
        return jsonify({"exito": True, "mensaje": "Usuario registrado exitosamente."})
    except Exception as e:
        print("Error en registro:", e)
        return jsonify({"exito": False, "mensaje": "Error en el servidor al guardar datos."})
    
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    print("--- SERVIDOR INICIADO ---")
    print("La carpeta de archivos es: 'static'")
    print("Entra a: http://localhost:5000")
    app.run(debug=True, port=5000)