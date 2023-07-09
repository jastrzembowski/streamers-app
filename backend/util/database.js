const Sequelize = require('sequelize')

const sequelize = new Sequelize("streamers", "root", "13434135", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;