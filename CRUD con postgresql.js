// ¡Por supuesto! Aquí te explico cada paso del código:

/* Importación de módulos: Primero, importamos los módulos necesarios. express es el marco de trabajo que usamos para construir la aplicación web, y pg es el cliente de PostgreSQL para Node.js.
JavaScript */

const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = 3000;
/*Conexión a la base de datos: Creamos una nueva instancia de Pool de pg, que manejará la conexión a la base de datos PostgreSQL. Debes reemplazar 'tu_usuario', 'tu_base_de_datos' y 'tu_contraseña' con tus propios valores.
JavaScript
 */
const pool = new Pool({
  user: "tu_usuario",
  host: "localhost",
  database: "tu_base_de_datos",
  password: "tu_contraseña",
  port: 5432,
});
/*Middleware para parsear el cuerpo de las solicitudes: Usamos express.json() para parsear el cuerpo de las solicitudes HTTP entrantes en un objeto JSON.
JavaScript */

app.use(express.json());
/*Rutas y controladores CRUD:
CREATE: La ruta POST /personas toma los datos de la persona del cuerpo de la solicitud, los inserta en la base de datos y devuelve los datos insertados.
JavaScript */

app.post("/personas", async (req, res) => {
  const { nombre, apellido, edad, email } = req.body;
  const response = await pool.query(
    "INSERT INTO persona (nombre, apellido, edad, email) VALUES ($1, $2, $3, $4)",
    [nombre, apellido, edad, email]
  );
  res.json(response.rows);
});
/*READ: La ruta GET /personas devuelve todas las personas de la base de datos.
JavaScript */

app.get("/personas", async (req, res) => {
  const response = await pool.query("SELECT * FROM persona");
  res.json(response.rows);
});
/*UPDATE: La ruta PUT /personas/:id actualiza los datos de la persona con el ID especificado y devuelve un mensaje de éxito.
JavaScript */

app.put("/personas/:id", async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, edad, email } = req.body;
  const response = await pool.query(
    "UPDATE persona SET nombre = $1, apellido = $2, edad = $3, email = $4 WHERE id_persona = $5",
    [nombre, apellido, edad, email, id]
  );
  res.json(`Persona con ID: ${id} actualizada exitosamente`);
});
/*DELETE: La ruta DELETE /personas/:id elimina la persona con el ID especificado y devuelve un mensaje de éxito.
JavaScript */

app.delete("/personas/:id", async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(
    "DELETE FROM persona WHERE id_persona = $1",
    [id]
  );
  res.json(`Persona con ID: ${id} eliminada exitosamente`);
});
/*Iniciar el servidor: Finalmente, hacemos que nuestra aplicación escuche en el puerto 3000.
JavaScript */

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
// Escuchar en el puerto 3000
