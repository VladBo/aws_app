import express from "express";
import cors from "cors";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import routes from "./routes/api";

const app = express();
dotenv.config();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
