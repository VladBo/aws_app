import express, { Request, Response, NextFunction } from "express";
import { uploadS3, S3 } from "../middleware/upload";
import imageController from "../controllers/image";

const router = express.Router();

router.post("/upload", uploadS3.single("file"), imageController);

router.post("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

router.delete("/images/{name}/delete");

export default router;
