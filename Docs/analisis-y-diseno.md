# CampusFest
## Documento de Análisis y Diseño de Software

**Proyecto:** CampusFest – Sistema Web para Gestión del Festival Estudiantil  
**Estudiante:** Christopher Fernández Matarrita  
**Curso:** SOFT-11-C1 Proyecto Integrador 1 SCV0  
**Docente:** Verónica Isabel Mora Lezcano  
**Periodo:** Segundo Cuatrimestre 2026  
**Versión:** 1.0

---

# 1. Introducción

## 1.1 Propósito

El presente documento describe el análisis y diseño técnico del sistema web CampusFest.

Su propósito es documentar las decisiones de arquitectura, organización del sistema, diseño de la base de datos, estructura del proyecto, API REST, seguridad y manejo de errores.

El diseño se construye a partir de los requisitos funcionales y no funcionales definidos previamente en la Especificación de Requerimientos de Software.

Durante la fase de diseño se definió una arquitectura web de tres capas compuesta por una capa de presentación, una capa lógica y una capa de datos.

---

# 2. Descripción general del sistema

CampusFest es una aplicación web destinada a centralizar la información y gestión del festival estudiantil.

El sistema permite consultar actividades, revisar la agenda, consultar stands, realizar inscripciones y utilizar una lista de espera.

También proporciona funcionalidades administrativas para gestionar actividades, inscripciones, stands y preguntas frecuentes.

El sistema contempla principalmente dos perfiles:

- Visitante.
- Administrador.

---

# 3. Arquitectura del sistema

CampusFest utiliza una arquitectura de tres capas.

## 3.1 Capa de presentación

La capa de presentación es responsable de la interacción con el usuario.

Tecnologías principales:

- HTML5
- CSS3
- JavaScript
- Media queries
- Componentes de interfaz responsive

Responsabilidades:

- Mostrar las páginas del sistema.
- Presentar actividades.
- Mostrar formularios.
- Validar información del lado del cliente.
- Permitir la navegación.
- Adaptar la interfaz a diferentes tamaños de pantalla.

---

## 3.2 Capa lógica

La capa lógica contiene la lógica principal de la aplicación.

Tecnologías:

- Node.js
- Express.js
- JavaScript

Componentes:

- Routes
- Controllers
- Models
- Middlewares
- Validaciones
- Manejo de errores

Responsabilidades:

- Procesar solicitudes HTTP.
- Ejecutar reglas de negocio.
- Validar información.
- Gestionar operaciones CRUD.
- Coordinar la comunicación con MongoDB.
- Controlar autenticación y autorización administrativa.

---

## 3.3 Capa de datos

La capa de datos utiliza MongoDB como sistema de almacenamiento.

Colecciones principales:

- actividades
- inscripciones
- stands
- administradores
- faq

Esta capa permite almacenar y consultar la información utilizada por el sistema.

---

# 4. Arquitectura lógica

El flujo general de una solicitud es:

```text
Usuario
   │
   ▼
Frontend
HTML / CSS / JavaScript
   │
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Models
   │
   ▼
MongoDB
   │
   ▼
Respuesta
   │
   ▼
Frontend
