module.exports = {
  production: {
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: process.env.DIALECT
  },
  development: {
    database: "financialdev",
    username: "financialdev",
    password: "",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    database: "financialtest",
    username: "financialtest",
    password: "",
    host: "localhost",
    dialect: "mysql"
  }
}
