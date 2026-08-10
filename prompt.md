# CampusFest - AI Development Prompt

## Role

You are a senior Full Stack Software Engineer and UI/UX Designer. Your task is to build a complete, production-quality educational web application based on the specifications below.

---

# IMPORTANT LANGUAGE REQUIREMENTS

- *This prompt is written in English.*
- *The entire application must be in Spanish.*

Every piece of visible text must be in Spanish, including:

- Navigation menus
- Buttons
- Forms
- Labels
- Titles
- Headings
- Validation messages
- Alerts
- Success messages
- Error messages
- Placeholders
- Footer
- Dummy/sample content
- Modal dialogs
- Notifications

The source code (variables, functions, classes, comments, folder names, API endpoints, etc.) should remain in English following standard development practices.

- Do not add comments to the main code, just to the project copy deliverable
- For MongoDB atlas use the following connection string: 
mongodb+srv://cfernandezm_user:Fernandez202627@cluster0.qg5uz9q.mongodb.net/?appName=Cluster0
- Do not use any other technologies besides node, express, mongo and for CSS you can only use bootstrap 

---

# Project

*CampusFest*

Sistema Web para Gestión del Festival Estudiantil CampusFest

---

# Project Goal

Develop a complete Full Stack web application that allows an educational institution to manage its annual CampusFest festival.

The application must include:

- Modern responsive frontend
- REST API
- Backend
- MongoDB Atlas integration
- CRUD operations
- Responsive design
- Clean architecture
- Professional UI/UX

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Additional Technologies

- REST API
- MVC Architecture
- Fetch API
- dotenv
- CORS
- Express Router

---

# Project Structure

Use a clean architecture similar to:

text
CampusFest/

client/
│
├── css/
├── js/
├── images/
├── pages/
└── components/

server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── config/
└── utils/

package.json
README.md
.env.example


---

# UI/UX Design

The website should resemble a modern university festival portal.

Style guidelines:

- Clean
- Modern
- Friendly
- Colorful
- Professional
- Accessible

Suggested palette:

- Blue
- Purple
- Orange
- White

Design requirements:

- Rounded cards
- Soft shadows
- Consistent spacing
- Responsive layout
- Icons where appropriate
- Smooth animations
- Hover effects

---

# Responsive Requirements

## Desktop

- Horizontal navigation bar
- Multi-column cards
- Centered forms
- Hero section

## Tablet

- Adaptive responsive layout

## Mobile

- Hamburger menu
- One-column cards
- Full-width forms
- Large touch-friendly buttons

Implement custom media queries.

Support Dark Mode using CSS media queries.

---

# Functional Pages

## 1. Home

Display:

- Festival name
- Short description
- Event date
- Main venue
- Button to activities
- Button to registration
- Three featured activities

---

## 2. Activities

Display activity cards.

Each card must include:

- Nombre
- Categoría
- Fecha
- Hora
- Lugar
- Cupo disponible
- Botón *"Ver detalle"*

---

## 3. Activity Details

Display:

- Nombre
- Descripción
- Categoría
- Fecha
- Hora
- Lugar
- Cupo máximo
- Requisitos
- Botón *"Inscribirse"*

---

## 4. Registration Form

Fields:

- Nombre completo
- Identificación
- Correo electrónico
- Teléfono
- Carrera o grupo
- Actividad seleccionada
- Comentarios

Client-side validation:

- Required fields
- Email format
- Phone required
- Activity required

Validation messages must be written in Spanish.

---

## 5. Festival Schedule

Display activities ordered by:

- Date
- Time

Include:

- Nombre
- Hora
- Lugar
- Categoría
- Estado

Possible status values:

- Disponible
- Lleno
- Cancelado

---

## 6. Stands

Display stand cards.

Each card includes:

- Nombre
- Categoría
- Responsable
- Ubicación
- Descripción

---

## 7. Contact

Display:

- Organizer information
- Contact email
- Phone number
- Contact form
- Frequently Asked Questions (FAQ)

---

# Backend

Create a REST API.

## Activities

Fields:

javascript
name
description
category
date
time
location
capacity
availableSpots
requirements
status
featured


CRUD:

- Create
- Read
- Update
- Delete

---

## Participants

Fields:

javascript
fullName
identification
email
phone
career


CRUD operations.

---

## Registrations

Fields:

javascript
participant
activity
comments
registrationDate


Business rules:

- A participant cannot register twice for the same activity.
- Capacity cannot be exceeded.
- Registration automatically decreases available spots.

---

## Stands

Fields:

javascript
name
category
responsible
location
description


CRUD operations.

---

# MongoDB

- Use MongoDB Atlas.
- Create Mongoose models.
- Apply validation rules.
- Use indexes where appropriate.
- Configure environment variables.
- Use .env for sensitive information.

---

# REST API

## Activities

text
GET    /api/activities
GET    /api/activities/:id
POST   /api/activities
PUT    /api/activities/:id
DELETE /api/activities/:id


## Participants

text
GET
POST
PUT
DELETE


## Registrations

text
GET
POST
DELETE


## Stands

text
GET
POST
PUT
DELETE


---

# User Roles

## Visitor

Can:

- View activities
- Browse schedule
- Explore stands
- Register for activities
- Contact organizers

---

## Administrator

Can:

- Register activities
- Edit activities
- Cancel activities
- Manage participants
- Manage registrations
- Register stands
- Update recognitions/results

Advanced authentication is *not required*, but structure the project so authentication can easily be added later.

---

# Validation

Frontend:

- JavaScript validation

Backend:

- Express validation
- Mongoose validation

Return proper HTTP status codes and meaningful error messages.

---

# Reusable Components

Create reusable components for:

- Navbar
- Footer
- Cards
- Forms
- Buttons
- Modal dialogs
- Toast notifications
- Confirmation dialogs
- Loading spinner
- Empty states
- 404 page

---

# Accessibility

Follow accessibility best practices:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Visible focus indicators
- Alt text
- Accessible forms

---

# User Experience

Include:

- Smooth transitions
- Hover effects
- Loading indicators
- Success notifications
- Friendly error messages
- Consistent spacing
- Professional visual hierarchy

---

# Sample Data

Generate realistic Spanish sample data for:

- Activities
- Participants
- Stands

Categories:

- Cultural
- Deportivo
- Tecnológico
- Artístico
- Gastronómico
- Recreativo

---

# Code Quality

Follow professional software engineering practices:

- MVC Architecture
- Reusable modules
- Clean Code
- SOLID principles where appropriate
- Consistent formatting
- Meaningful file names
- No duplicated code

---

# Documentation

Generate a professional README.md including:

- Project description
- Features
- Technology stack
- Installation
- Environment variables
- MongoDB Atlas setup
- Running locally
- API documentation
- Folder structure
- Future improvements
- Screenshot placeholders

---

# Final Deliverable

Produce a fully functional Full Stack application that includes:

- Modern responsive frontend
- Express backend
- MongoDB Atlas integration
- Complete REST API
- Full CRUD operations
- Professional UI/UX
- Responsive design
- Clean architecture
- Spanish user interface
- Well-organized project structure
- Ready to run after npm install and .env configuration
- A copy of the project with comments explaining every code snippet 

The final project should be maintainable, scalable, and follow modern JavaScript development best practices.