# Projects Portfolio

A comprehensive collection of full-stack web applications demonstrating expertise in modern web development, database design, authentication, and software architecture.

## Technical Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **Frontend**: EJS templating, Bootstrap, JavaScript (ES6+)
- **Authentication**: Passport.js (local strategy)
- **API Architecture**: RESTful endpoints with raw SQL queries
- **Version Control**: Git, GitHub
- **DevOps**: Environment variables (dotenv), Transaction management

## Projects Overview

### 1. Animal Database Project 2024

**A full-stack animal adoption management system**

- **Features**:
  - User authentication with Passport.js
  - CRUD operations for animal listings
  - Advanced filtering by age, size, species, and date range
  - Adoption tracking with transaction-based database operations
  - Dynamic table rendering with JavaScript
- **Technologies**: Express.js, MySQL, Sequelize, EJS, Bootstrap
- **Key Achievements**:
  - Implemented transactional adoption system with INSERT IGNORE for idempotency
  - Converted ORM queries to raw SQL for performance optimization
  - Built responsive UI with dynamic filtering capabilities
  - Auto-population of database on startup for seamless deployment

**Directory**: `/Animal_Database_Project_2024`

---

### 2. Ecommerce Exam Project

**A comprehensive e-commerce platform with front-end and back-end separation**

- **Features**:

  - Dual architecture (front-end and back-end servers)
  - Product catalog with search and filtering
  - Shopping cart management
  - Order processing system
  - User authentication and role-based access control
  - Admin dashboard for product and user management
  - Membership tier system
  - Swagger API documentation

- **Technologies**: Express.js, MySQL, Sequelize, EJS, Swagger
- **Key Achievements**:
  - Implemented secure session-based authentication
  - Built scalable microservice-style front-end/back-end architecture
  - Created comprehensive API documentation with Swagger
  - Developed role-based permission system (user, admin roles)

**Directory**: `/Ecommerce_ExamProject`

---

### 3. API Gateway

**A lightweight HTTP proxy server for request forwarding and microservice routing**

- **Features**:

  - Request forwarding and routing
  - Microservice gateway pattern implementation
  - HTTP proxy functionality

- **Technologies**: Express.js, express-http-proxy
- **Key Achievements**:
  - Implemented gateway pattern for service orchestration
  - Demonstrated understanding of API architecture

**Directory**: `/gateway`

---

### 4. GoldMed Self-Built

**A course management and educational services platform**

- **Features**:

  - User authentication and account management
  - Course catalog and enrollment system
  - Educational content display
  - Contact and inquiry management
  - Role-based access control

- **Technologies**: Express.js, MySQL, Sequelize, EJS
- **Key Achievements**:
  - Built from scratch with custom authentication
  - Responsive design with responsive navigation
  - Clean code organization with MVC pattern

**Directory**: `/GoldMed_Self_Built`

---

### 5. Stock Market Self-Built

**An interactive stock market simulator and trading platform**

- **Features**:

  - User registration and login
  - Live stock portfolio tracking
  - Buy/sell stock functionality
  - User performance metrics
  - Leaderboard system

- **Technologies**: Express.js, MySQL, Sequelize, EJS, JavaScript
- **Key Achievements**:
  - Implemented real-time stock simulation
  - Built complex financial data models
  - Created intuitive trading interface

**Directory**: `/StockMarket_Self_Built`

---

### 6. TheTheoShop Self-Built

**An e-commerce product showcase with multimedia content**

- **Features**:

  - Product catalog with detailed descriptions
  - Image and video galleries
  - Product filtering and search
  - Responsive shopping interface
  - Clean product layout

- **Technologies**: Express.js, EJS, Bootstrap, Multimedia assets
- **Key Achievements**:
  - Integrated multimedia content (images, videos)
  - Built responsive product showcase
  - Professional visual design

**Directory**: `/TheTheoShop_Self_Built`

---

## Key Skills Demonstrated

### Database Design

- MySQL schema design and relationships
- Sequelize ORM model definitions
- Raw SQL query optimization
- Transaction management for data consistency
- Constraint handling (UNIQUE, PRIMARY KEY, FOREIGN KEY)

### Backend Development

- RESTful API design and implementation
- Authentication and authorization (Passport.js)
- Session management
- Error handling and validation
- Middleware implementation
- Service layer architecture

### Frontend Development

- EJS templating engine
- Bootstrap responsive design
- Dynamic DOM manipulation with JavaScript
- Fetch API for asynchronous requests
- Form validation and user feedback

### Software Engineering

- MVC architectural pattern
- Clean code practices
- Code refactoring and optimization
- Git version control and GitHub
- Environment variable management
- Debugging and troubleshooting

### DevOps & Deployment

- Environment configuration with dotenv
- Database initialization and migrations
- Application startup automation
- Security best practices (credential protection)

---

## Getting Started

Each project contains its own `package.json` and setup instructions. To run a project:

```bash
cd [project-directory]
npm install
npm run dev
```

**Note**: Each project requires a `.env` file with database credentials. See the individual project READMEs for specific environment variable requirements.

---

## What I Learned

Through building these projects, I've gained hands-on experience with:

- Full-stack development lifecycle
- Database design and optimization
- Authentication and security practices
- Debugging complex issues in production-like environments
- Code refactoring and maintainability
- Git workflow and version control
- Building scalable application architecture

---

## Security Practices

All sensitive credentials (database passwords, API keys, environment variables) are protected using:

- Environment variables stored in `.env` files
- `.gitignore` configuration to prevent credential leaks
- Session-based authentication with secure cookies
- Input validation and prepared statements

---

## Contact & Collaboration

These projects showcase my development capabilities and are available for review. I'm open to collaboration, feedback, and opportunities to apply these skills in a professional environment.

---

**Last Updated**: December 17, 2025

**Author**: BenWood79

---


## NB! : The following microservices: 
````diff
-     Ecommerce_Examproject
-     Goldmed_Self_Built
-     StockMarket_Self_Built
-     TheTheoShop_Self_Built
````
##    are still unfinished works in progress (17.12.2025)
