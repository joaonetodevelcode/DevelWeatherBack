import databaseConnection from "../../database/dbConnection";
import dotenv from 'dotenv';

dotenv.config();

describe("Connection with database", () => {

    it("Should connect with databse", async () => {
        const response = await databaseConnection()
        console.log(response.once("open", () => {}));
    })

})