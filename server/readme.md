## Development

`npm run dev`

## Documentation

swagger ui docs --> [/docs](http://localhost:5000/docs)

[openapi.json](http://localhost:5000/openapi/schema.json)

Examples in ./server/documentation directory.

## TO RUN THIS SERVER YOU NEED TO

open your terminal

1. `cd client/`
2. `npm install`
3. `npm start`

📑 YOU NEED TO CREATE FILE .env and into file change following values (EXAMPLE IN .env.example)

1. JWT_SECRET=type_your_jwt_secret
2. PORT=type_your_port

you also need to connect postgresql database to this project
so make sure you have created database and now connect:

1. DATABASE=your_postgresql_database
2. DB_USER=your_postgresql_database_user
3. DB_PASSWORD=your_postgresql_database_password

Used PostgreSQL VERSION 12.6
