// Database Configuration
export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true // Trust the self-signed certificate
  }
}
// console.log(process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_NAME,process.env.DB_SERVER);

