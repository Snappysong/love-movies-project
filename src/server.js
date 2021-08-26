require("dotenv").config();

const { PORT = 5000 } = process.env;


const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    console.log(process.env.DATABASE_URL);
    app.listen(PORT, listener);
  })
  .catch(console.error);
