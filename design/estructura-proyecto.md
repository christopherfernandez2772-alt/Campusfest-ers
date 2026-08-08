```markdown
# Estructura del sistema – CampusFest

campusfest/
├── .env
├── .env.example
├── .gitattributes
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── node_modules/
│
├── server/
│
├── client/
│
└── design/

server/
├── models/
│   ├── Activity.js
│   ├── Participant.js
│   ├── Registration.js
│   └── Stand.js
│
├── controllers/
│   ├── activityController.js
│   ├── adminController.js
│   ├── participantController.js
│   ├── registrationController.js
│   └── standController.js
│
├── routes/
│   ├── activityRoutes.js
│   ├── adminRoutes.js
│   ├── participantRoutes.js
│   ├── registrationRoutes.js
│   └── standRoutes.js
│
├── middleware/
│   ├── adminAuth.js
│   ├── errorHandler.js
│   └── sanitize.js
│
└── services/
    └── registrationService.js

client/
├── index.html
│
├── pages/
│   ├── activities.html
│   ├── activity-detail.html
│   ├── registration.html
│   └── admin.html
│
├── js/
│   ├── api.js
│   ├── activities.js
│   ├── activity-detail.js
│   ├── registration.js
│   ├── admin.js
│   └── home.js
│
├── components/
│   ├── navbar.js
│   ├── footer.js
│   ├── cards.js
│   ├── modal.js
│   ├── toast.js
│   └── spinner.js
│
└── css/
    └── styles.css
