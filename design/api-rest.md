# API REST – CampusFest

## ACTIVIDADES
GET /api/actividades  
GET /api/actividades/:id  
POST /api/actividades  
PUT /api/actividades/:id  
DELETE /api/actividades/:id  

## INSCRIPCIONES
POST /api/inscripciones  
POST /api/inscripciones/lista-espera  
GET /api/inscripciones/actividad/:idActividad  

## STANDS
GET /api/stands  
POST /api/stands  

## FAQ
GET /api/faq  
POST /api/faq  
PUT /api/faq/:id  

## AUTENTICACIÓN
POST /api/auth/login  

## FORMATO DE RESPUESTA
Éxito:
```json
{ "success": true, "data": ... } 

Error
```json
{ "success": false, "message": "...", "details": { ... } }


