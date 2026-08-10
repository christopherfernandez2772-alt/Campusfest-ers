# CampusFest – Documentación del Proyecto

Este repositorio contiene la documentación oficial del proyecto **CampusFest**, desarrollado para el curso **Proyecto Integrador 1**.

##  Integrante:

- **Christopher Fernandez Matarrita**

---

Todos los artefactos se encuentran en la carpeta `design/`:

- Guía de estilos  
- Wireframes  
- Mapa de navegación  
- Diseño de la base de datos  
- Estructura del sistema  
- API REST  
- Seguridad y manejo de errores  
- Matriz de trazabilidad actualizada  


Todos los artefactos se encuentran en la carpeta `design/Arquitectura`:

- Diagrama casos de uso
- Diagrama de arquitectura de Campus Fest (En capas)
- Patrones arquitectónicos empleados – CampusFest

Todos los artefactos se encuentran en la carpeta `design/base de datos`:
- Diseño de base de datos con colecciones 


---

##  Otras evidencias del Proyecto

### Jira
Actualización de historias de usuario y épicas:  
https://ucenfotec-team-pts26eyo.atlassian.net/jira/software/projects/CGDFE/list?jql=project%20%3D%20CGDFE%20ORDER%20BY%20created%20DESC%2C%20cf%5B10019%5D%20DESC

---

## Estado de las entregas

Todos los elementos solicitados en la Bitácora 3 están incluidos:

- Diagrama de arquitectura 
- Patrones arquitectónicos  
- Diseño de la base de datos  
- Estructura del sistema  
- API REST  
- Seguridad y manejo de errores  
- Tecnologías utilizadas  
- Matriz de trazabilidad actualizada  
- Historias nuevas en Jira  
---

## Toda la documentación está basada exclusivamente en los artefactos oficiales del proyecto CampusFest.

---

# API (resumen de endpoints)

Actividades
GET  /api/actividades
GET  /api/actividades/:id
POST /api/actividades
PUT  /api/actividades/:id
DELETE /api/actividades/:id

Inscripciones
POST /api/inscripciones            # Crear inscripción (público)
POST /api/inscripciones/lista-espera  # Añadir a lista de espera
GET  /api/inscripciones/actividad/:idActividad  # Obtener inscripciones por actividad (público)
DELETE /api/inscripciones/:id     # (admin)

Stands
GET  /api/stands
POST /api/stands

FAQ
GET  /api/faq
POST /api/faq
PUT  /api/faq/:id

Autenticación
POST /api/auth/login


> Responses estándar:
> - Éxito: { "success": true, "data": ... }
> - Error:  { "success": false, "message": "..." }


