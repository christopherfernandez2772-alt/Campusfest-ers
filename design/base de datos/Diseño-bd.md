```markdown
# Diseño de base de datos – CampusFest (MongoDB)

## 1- Colección: actividades
```json
{
  "_id": ObjectId,
  "nombre": String,
  "descripcion": String,
  "categoria": String,
  "fechaHora": Date,
  "ubicacion": String,
  "cupoMaximo": Number,
  "cupoDisponible": Number,
  "estado": String,
  "creadaPor": ObjectId,
  "fechaCreacion": Date,
  "fechaActualizacion": Date
}

## 2- Colección: inscripciones
```json
{
  "_id": ObjectId,
  "idActividad": ObjectId,
  "nombreCompleto": String,
  "correo": String,
  "telefono": String,
  "comentario": String,
  "tipo": String,
  "fechaRegistro": Date,
  "estado": String
}

## 3- Colección: stands
```json
{
  "_id": ObjectId,
  "nombreStand": String,
  "descripcion": String,
  "ubicacion": String,
  "responsable": String,
  "contactoCorreo": String,
  "contactoTelefono": String,
  "fechaRegistro": Date
}

## 4- Colección: administradores
```json
{
  "_id": ObjectId,
  "nombre": String,
  "correo": String,
  "passwordHash": String,
  "rol": String,
  "activo": Boolean,
  "fechaCreacion": Date
}

## 5- Colección: faq
```json
{
  "_id": ObjectId,
  "pregunta": String,
  "respuesta": String,
  "orden": Number,
  "visible": Boolean,
  "fechaCreacion": Date,
  "fechaActualizacion": Date
}

