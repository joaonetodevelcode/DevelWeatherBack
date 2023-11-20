import express from "express";
import databaseConnection from "./database/dbConnection.js";
import routes from "./routes/index.js";
import cors from "cors";

const connection = await databaseConnection();

connection.on("error", (erro) => {
    console.log("Não foi possivel conectar", erro)
});

connection.once("open", () =>  {
    console.log("Conectado com sucesso");
});

const app = express();
app.use(cors());
routes(app)

export default app;