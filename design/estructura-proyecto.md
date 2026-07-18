```markdown
# Estructura del sistema – CampusFest

campusfest/
├── src/
│   ├── controllers/
│   │   ├── actividades.controller.js
│   │   ├── inscripciones.controller.js
│   │   ├── stands.controller.js
│   │   ├── faq.controller.js
│   │   └── auth.controller.js
│   ├── routes/
│   │   ├── actividades.routes.js
│   │   ├── inscripciones.routes.js
│   │   ├── stands.routes.js
│   │   ├── faq.routes.js
│   │   └── auth.routes.js
│   ├── models/
│   │   ├── actividad.model.js
│   │   ├── inscripcion.model.js
│   │   ├── stand.model.js
│   │   ├── faq.model.js
│   │   └── administrador.model.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── response.js
│   └── app.js
├── public/
│   ├── css/
│   ├── js/
│   └── img/
├── views/
│   ├── visitante/
│   └── admin/
├── tests/
├── package.json
└── README.md
