# CampusFest
## Especificación de Requerimientos de Software (ERS)

**Proyecto:** CampusFest – Sistema Web para Gestión del Festival Estudiantil  
**Estudiante:** Christopher Fernández Matarrita  
**Curso:** SOFT-11-C1 Proyecto Integrador 1 SCV0  
**Docente:** Verónica Isabel Mora Lezcano  
**Periodo:** Segundo Cuatrimestre 2026  
**Versión:** 1.0  
**Estado:** Versión final

---

# 1. Introducción

## 1.1 Propósito

El presente documento contiene la Especificación de Requerimientos de Software (ERS) del proyecto CampusFest.

Su objetivo es establecer de forma clara y estructurada las funcionalidades, restricciones y características que debe cumplir el sistema.

Esta especificación sirve como referencia para:

- El desarrollo del sistema.
- El diseño de la arquitectura.
- La planificación de tareas.
- La creación de historias de usuario.
- La elaboración del plan de pruebas.
- La matriz de trazabilidad.
- La validación de la versión final.

---

# 2. Descripción general del sistema

CampusFest es un sistema web desarrollado para centralizar la información y gestión de un festival estudiantil.

El sistema permite a los visitantes consultar las actividades disponibles, revisar sus detalles, consultar el horario, visualizar stands, realizar inscripciones y acceder a la lista de espera cuando corresponda.

También proporciona funcionalidades administrativas para gestionar las actividades, inscripciones y stands del festival.

El sistema está compuesto por una interfaz pública para visitantes y un área administrativa para la gestión interna.

---

# 3. Objetivo del sistema

El objetivo principal de CampusFest es proporcionar una plataforma web centralizada que facilite:

- La consulta de información del festival.
- La visualización y filtrado de actividades.
- La consulta del detalle de cada actividad.
- La inscripción de participantes.
- La gestión de listas de espera.
- La consulta del horario.
- La consulta de stands.
- La comunicación con los organizadores.
- La gestión administrativa de la información del festival.

---

# 4. Alcance

## 4.1 Alcance funcional

El sistema contempla las siguientes funcionalidades principales:

1. Lista de espera.
2. Visualización y filtrado de actividades.
3. Detalle de actividad.
4. Inscripción a actividades.
5. Horario del festival.
6. Consulta de stands.
7. Contacto y preguntas frecuentes.
8. Autenticación de administrador.
9. Administración de actividades.
10. Administración de stands.
11. Administración de inscripciones.
12. Diseño responsive y menú móvil.

## 4.2 Fuera del alcance

Las siguientes funcionalidades no forman parte del alcance final del proyecto:

- Pagos en línea.
- Aplicación móvil nativa.
- Integraciones institucionales externas no definidas.
- Sistemas avanzados de autenticación fuera del alcance administrativo establecido.

---

# 5. Actores del sistema

## 5.1 Visitante

El visitante representa al usuario público del sistema.

Puede:

- Consultar actividades.
- Filtrar actividades.
- Consultar detalles.
- Revisar el horario.
- Consultar stands.
- Realizar inscripciones.
- Acceder a la lista de espera.
- Consultar preguntas frecuentes.
- Utilizar el formulario de contacto.

## 5.2 Administrador

El administrador representa al usuario encargado de gestionar la información del festival.

Puede:

- Iniciar sesión.
- Administrar actividades.
- Administrar stands.
- Consultar y gestionar inscripciones.
- Gestionar la información administrativa correspondiente.

---

# 6. Requisitos funcionales

## 6.1 Funcionalidades del visitante

### RF-FE-01 — Visualización de actividades

El sistema debe permitir al visitante visualizar las actividades disponibles del festival.

La información presentada debe permitir identificar las actividades y acceder a su información detallada.

### RF-FE-02 — Filtrado de actividades

El sistema debe permitir filtrar las actividades disponibles utilizando los criterios definidos por la interfaz.

El resultado debe actualizarse de acuerdo con los criterios seleccionados.

### RF-FE-03 — Detalle de actividad

El sistema debe permitir consultar la información detallada de una actividad.

El detalle debe presentar la información relevante de la actividad, incluyendo los datos necesarios para que el visitante pueda decidir si desea participar.

### RF-FE-03.4 — Lista de espera

Cuando una actividad no disponga de cupos disponibles, el sistema debe proporcionar al visitante acceso al formulario correspondiente de lista de espera.

El acceso debe realizarse mediante el botón disponible en la interfaz.

### RF-FE-04 — Inscripción a actividades

El sistema debe permitir al visitante realizar una inscripción a una actividad mediante el formulario correspondiente.

El formulario debe permitir ingresar la información necesaria del participante.

### RF-FE-05 — Horario del festival

El sistema debe permitir consultar el horario de las actividades del festival.

La información debe presentarse de forma organizada para facilitar la consulta de fechas, horarios y actividades.

### RF-FE-06 — Consulta de stands

El sistema debe permitir consultar los stands disponibles o registrados para el festival.

La información debe presentarse de forma organizada y comprensible.

### RF-FE-07 — Contacto y preguntas frecuentes

El sistema debe proporcionar una sección de contacto y preguntas frecuentes.

El visitante debe poder consultar información frecuente y utilizar el mecanismo de contacto disponible.

---

# 7. Requisitos administrativos

## RF-AD-01 — Crear actividad

El administrador debe poder registrar una nueva actividad en el sistema.

La información ingresada debe ser validada antes de almacenarse.

## RF-AD-02 — Editar actividad

El administrador debe poder modificar la información de una actividad existente.

Los cambios deben actualizarse correctamente en el sistema.

## RF-AD-03 — Cancelar actividad

El administrador debe poder cancelar una actividad existente.

El sistema debe actualizar su estado de acuerdo con la operación realizada.

## RF-AD-04 — Consultar inscripciones

El administrador debe poder consultar las inscripciones registradas en el sistema.

La información debe mostrarse de manera organizada.

## RF-AD-05 — Gestionar inscripciones

El administrador debe poder gestionar las inscripciones registradas de acuerdo con las operaciones disponibles en el sistema.

## RF-AD-06 — Gestionar stands

El administrador debe poder registrar y gestionar información relacionada con los stands.

## RF-AD-07 — Autenticación de administrador

El sistema debe permitir que un administrador utilice credenciales válidas para acceder al área administrativa.

Las credenciales incorrectas no deben permitir el acceso al panel administrativo.

Esta funcionalidad se valida mediante:

- CP-08-H — Autenticación de administrador.
- CP-08-E — Autenticación de administrador.

---

# 8. Requisitos de diseño responsive

## RF-RD-01 — Adaptación a diferentes tamaños

La interfaz debe adaptarse a diferentes tamaños de pantalla.

## RF-RD-02 — Visualización móvil

La interfaz debe mantener una presentación funcional en dispositivos móviles.

## RF-RD-03 — Navegación móvil

El sistema debe proporcionar un mecanismo de navegación adecuado para pantallas de tamaño reducido.

## RF-RD-06 — Menú móvil

El sistema debe proporcionar un menú móvil que permita acceder a las principales secciones de la aplicación.

El menú debe ser accesible mediante el mecanismo de navegación definido para dispositivos móviles.

Esta funcionalidad se valida mediante:

- CP-12-H — Diseño responsive y menú móvil.
- CP-12-E — Diseño responsive y menú móvil.

---

# 9. Requisitos no funcionales

## RNF-01 — Rendimiento

El sistema debe proporcionar tiempos de respuesta adecuados para las operaciones principales de consulta y navegación.

## RNF-02 — Usabilidad

La interfaz debe ser clara, consistente y fácil de utilizar para los visitantes y administradores.

Los elementos de navegación y los formularios deben presentar información comprensible.

## RNF-03 — Seguridad

El sistema debe incorporar mecanismos destinados a proteger la información y controlar el acceso a las funcionalidades administrativas.

Las medidas de seguridad incluyen:

- Autenticación.
- Autorización.
- Validación de información.
- Manejo controlado de errores.
- Protección de información sensible.

## RNF-04 — Disponibilidad

El sistema debe permanecer disponible durante el período de utilización del festival, de acuerdo con las condiciones del entorno donde sea desplegado.

## RNF-05 — Compatibilidad

El sistema debe funcionar correctamente en navegadores web modernos.

Entre los navegadores considerados se encuentran:

- Google Chrome.
- Mozilla Firefox.
- Microsoft Edge.

---

# 10. Requisitos de interfaz

La interfaz debe mantener una presentación consistente con la identidad visual definida para CampusFest.

Los elementos visuales deben respetar:

- Tipografías definidas.
- Espaciado.
- Componentes.
- Jerarquía visual.
- Elementos gráficos.
- Diseño responsive.

Los componentes deben mantener una experiencia visual consistente entre las diferentes secciones.

---

# 11. Requisitos de datos

El sistema debe almacenar y gestionar información relacionada con:

- Actividades.
- Inscripciones.
- Participantes.
- Stands.
- Administradores.
- Preguntas frecuentes.

La información debe almacenarse utilizando MongoDB.

---

# 12. Restricciones técnicas

El desarrollo del sistema utiliza las siguientes tecnologías principales:

- HTML5.
- CSS3.
- JavaScript.
- Node.js.
- Express.js.
- MongoDB.

La comunicación entre frontend y backend se realiza mediante servicios y endpoints definidos para las operaciones correspondientes.

---

# 13. Restricciones de desarrollo

El proyecto utiliza Git y GitHub para el control de versiones.

Las actividades de desarrollo y seguimiento se gestionan mediante Jira.

La documentación técnica se mantiene utilizando archivos Markdown y documentos PDF cuando corresponde.

---

# 14. Criterios generales de aceptación

Una funcionalidad se considera correctamente implementada cuando:

1. Cumple con el comportamiento definido en su requisito.
2. Permite al usuario completar el flujo correspondiente.
3. Maneja adecuadamente las condiciones alternativas contempladas.
4. No presenta errores que impidan utilizar la funcionalidad.
5. Cuenta con casos de prueba asociados.
6. Los casos de prueba correspondientes obtienen resultado PASS.
7. Existe evidencia de la ejecución cuando corresponde.

---

# 15. Trazabilidad

Los requisitos deben mantener relación con las historias de usuario y los casos de prueba correspondientes.

La matriz de trazabilidad final establece la relación:

```text
Requisito
    ↓
Historia de usuario
    ↓
Funcionalidad
    ↓
Caso Happy Path
    ↓
Caso Edge Case / Alternativo
    ↓
Resultado
    ↓
Evidencia


