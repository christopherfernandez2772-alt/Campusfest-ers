
┌────────────────────────────────────────────────┬──────────┬──────────────────┬──────────────────────────┬──────────────────────────────────────────────────────────┐
│ Requisito                                      │ Wireframe│ Historia en Jira │ Épica                    │ Endpoint                                                 │
├────────────────────────────────────────────────┼──────────┼──────────────────┼──────────────────────────┼──────────────────────────────────────────────────────────┤
│ RF-FE-01 - Página de inicio                    │ WF-01    │ HU-01            │ Gestión de Actividades   │ GET /api/actividades                                     │
│ RF-FE-02.1 - Catálogo visual                   │ WF-01    │ HU-02            │ Gestión de Actividades   │ GET /api/actividades                                     │
│ RF-FE-02.2 - Paginación (10 por página)        │ WF-01    │ HU-14            │ Gestión de Actividades   │ GET /api/actividades                                     │
│ RF-FE-02.3 - Ordenamiento por fecha (±8 horas) │ WF-01    │ HU-15            │ Gestión de Actividades   │ GET /api/actividades                                     │
│ RF-FE-02.4 - Filtros por categoría, fecha, hora│ WF-01    │ HU-16            │ Gestión de Actividades   │ GET /api/actividades                                     │
│ RF-FE-02.5 - Cupo definido por administrador   │ WF-01    │ HU-17            │ Gestión de Actividades   │ GET /api/actividades                                     │
│ RF-FE-03.1 - Detalle de actividad              │ WF-02    │ HU-03            │ Gestión de Actividades   │ GET /api/actividades/:id                                 │
│ RF-FE-03.2 - Formato flexible                  │ WF-02    │ HU-18            │ Gestión de Actividades   │ GET /api/actividades/:id                                 │
│ RF-FE-03.3 - Redirección al formulario         │ WF-02    │ HU-19            │ Gestión de Actividades   │ GET /api/actividades/:id                                 │
│ RF-FE-03.4 - Lista de espera                   │ WF-03    │ HU-20            │ Gestión de Inscripciones │ POST /api/inscripciones/lista-espera                     │
│ RF-FE-04.1 - Validaciones del formulario       │ WF-03    │ HU-04            │ Gestión de Inscripciones │ POST /api/inscripciones                                  │
│ RF-FE-04.2 - Actividad preseleccionada         │ WF-03    │ HU-21            │ Gestión de Inscripciones │ POST /api/inscripciones                                  │
│ RF-FE-04.3 - Mensaje de confirmación           │ WF-03    │ HU-22            │ Gestión de Inscripciones │ POST /api/inscripciones                                  │
│ RF-FE-04.4 - Sin envío de correo               │ WF-03    │ HU-23            │ Gestión de Inscripciones │ POST /api/inscripciones                                  │
│ RF-FE-05.1 - Agenda tipo calendario            │ WF-04    │ HU-05            │ Agenda del Festival      │ GET /api/actividades                                     │
│ RF-FE-06.1 - Stands sin imágenes               │ WF-05    │ HU-06            │ Gestión de Stands        │ GET /api/stands                                          │
│ RF-FE-06.2 - Paginación de stands              │ WF-05    │ HU-24            │ Gestión de Stands        │ GET /api/stands                                          │
│ RF-FE-06.3 - Sin filtros en stands             │ WF-05    │ HU-25            │ Gestión de Stands        │ GET /api/stands                                          │
│ RF-FE-07.1 - Confirmación en contacto          │ WF-01    │ HU-07            │ Gestión de Actividades   │ No aplica (no usa API)                                   │
│ RF-FE-07.2 - Preguntas frecuentes              │ WF-09    │ HU-26            │ Gestión de Actividades   │ GET /api/faq                                             │
│ RF-AD-01 - Crear actividad                     │ WF-07    │ HU-08            │ Gestión de Actividades   │ POST /api/actividades                                    │
│ RF-AD-02 - Editar actividad                    │ WF-07    │ HU-09            │ Gestión de Actividades   │ PUT /api/actividades/:id                                 │
│ RF-AD-03 - Cancelar actividad                  │ WF-07    │ HU-10            │ Gestión de Actividades   │ DELETE /api/actividades/:id                              │
│ RF-AD-04 - Consultar inscritos                 │ WF-08    │ HU-11            │ Gestión de Inscripciones │ GET /api/inscripciones/actividad/:idActividad            │
│ RF-AD-05 - Gestionar inscripciones             │ WF-08    │ HU-12            │ Gestión de Inscripciones │ GET /api/inscripciones/actividad/:idActividad            │
│ RF-AD-06 - Registrar stand                     │ WF-05    │ HU-13            │ Gestión de Stands        │ POST /api/stands                                         │
│ RF-RD-04 - Modo oscuro automático              │ WF-01/02 │ HU-27            │ Diseño Responsive        │ No aplica (frontend)                                     │
│ RF-RD-05 - Cumplimiento del libro de marca     │ WF-01/02 │ HU-28            │ Diseño Responsive        │ No aplica (frontend)                                     │
│ RF-RD-06 - Menú móvil flexible                 │ WF-01/02 │ HU-29            │ Diseño Responsive        │ No aplica (frontend)                                     │
└────────────────────────────────────────────────┴──────────┴──────────────────┴──────────────────────────┴──────────────────────────────────────────────────────────┘
