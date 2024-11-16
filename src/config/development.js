require("dotenv").config();

module.exports = {
  service: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  cookie: {
    secret: process.env.COOKIE_SECRET
  },
  cors: {
    origin: "localhost:5000",
    allowedHeaders: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  },
  redis: {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    maxPoolSize: 10,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
  }
};
