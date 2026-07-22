# Patrones arquitectónicos empleados – CampusFest

## 1. Arquitectura en capas

El sistema Campus Fest se implementará con una arquitectura de tres capas:

### Capa de presentación
- HTML5, CSS3, JavaScript.
- Wireframes definidos en Bitácora 2.
- Guía de estilos institucional.
- Modo oscuro automático.
- Media queries y diseño responsive.

### Capa lógica (Node.js + Express)
- Controladores por módulo: actividades, inscripciones, stands, FAQ.
- Rutas REST.
- Validaciones.
- Reglas de negocio (cupo, lista de espera, filtros, ordenamiento ±8h).
- Manejo centralizado de errores.

### Capa de datos (MongoDB)
- Colecciones: actividades, inscripciones, stands, administradores, faq.
- Almacenamiento en la nube (MongoDB Atlas).

---

## 2. Patrón MVC

### Modelos
Definen los esquemas de MongoDB para cada colección.

### Vistas
HTML/CSS/JS basados en wireframes y guía de estilos.

### Controladores
Procesan peticiones, aplican reglas y devuelven respuestas JSON.

---

## 3. API REST

- Rutas orientadas a recursos.
- Métodos HTTP estándar.
- Respuestas JSON.
- Códigos HTTP coherentes.

---

## 4. Separación de responsabilidades

- Frontend: UI/UX, accesibilidad, responsive.
- Backend: lógica, validaciones, seguridad.
- Base de datos: persistencia.

---

## 5. Manejo centralizado de errores

Middleware en Express con formato estándar:
```json
{ "success": false, "message": "Error interno del servidor" }
