# Engine Base - Node.js API Foundation
A robust Node.js foundation project built with TypeScript, featuring a clean architecture implementation using dependency injection (Inversify). This base engine provides a solid starting point for building scalable REST APIs with integrated logging, database management, and security middleware.

## Key Features
- **Express.js** - Fast, minimalist web framework
- **Sequelize ORM** - Database abstraction with MySQL support
- **Winston** - Structured logging with configurable levels
- **Inversify** - Dependency injection container for loose coupling
- **TypeScript** - Type-safe development experience
- **Security Middleware** - Helmet, CORS, and compression built-in
- **Clean Architecture** - Interface-driven design with clear separation of concerns

## Architecture Highlights
- Service layer with dependency injection pattern
- Interface-based abstractions for database and logging
- Modular route organization with versioning support
- Environment-based configuration management
- Singleton service pattern for resource efficiency

## Environment Variables:
````
MODE_DEVELOPER=true
API_PORT=3000
DB_NAME_DB
DB_USER
DB_PASSW
DB_HOST
DB_PORT
````