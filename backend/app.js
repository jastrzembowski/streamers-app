const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();
const cors = require('cors');


const streamerRoutes = require("./routes/streamers");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(streamerRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
    app.listen(5000, () => {
      console.log(`Server is running on port 5000`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
