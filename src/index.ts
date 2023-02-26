import { connectToTheDatabase } from "./database/connection";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { handleRouters } from "./api/routers/indexAllRouters";

export const app = express();
const port: number = Number(process.env.PORT) || 3000;

connectToTheDatabase();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

handleRouters();
app.listen(port, () => {
  console.log("Api listening on port " + port);
});
