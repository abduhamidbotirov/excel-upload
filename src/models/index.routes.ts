import excelRouter from "./excel/excel.routes.js";
import express from "express";
const router = express.Router();
router.use("/excel", excelRouter)
router.use('/test', () => { });
export default router