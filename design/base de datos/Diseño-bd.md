```markdown
# Diseño de base de datos – CampusFest (MongoDB)

## 1. Colección: actividades
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
