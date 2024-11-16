module.exports = {
  service: {
    port: 4000,
    host: '127.0.0.1',
    endpoint: 'sample',
  },
  cookie: {
    secret: 'COOKIE_KEY'
  },
  cors: {
    origin: "localhost:5000",
    allowedHeaders: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
  redis: {
    password: 'REDIS_PASSWORD'
  },
  cockroach: {
    user: 'root',
    maxPoolSize: 10,
    host: '127.0.0.1',
    port: 26257,
  }
}