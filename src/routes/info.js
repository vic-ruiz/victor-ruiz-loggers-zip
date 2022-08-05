import { Router } from "express";
import compression from "compression";
import logger from "../winston/logger.js";
import os from "os"

const router = Router();

const obj = {
  system: process.platform,
  version: process.version,
  memory: process.memoryUsage.rss(),
  path: process.execPath,
  id: process.pid,
  folder: process.cwd(),
  cpu: os.cpus().length,
};

router.get("/" , (req, res) => {
    try {
     res.json(obj)
    } catch (error) {
      logger.error(error);
    }
  });

router.get("/zip", compression(), (req, res) => {
  try {
    logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`);
    const objMult = JSON.stringify(obj).repeat(1000);
    res.json(objMult);
  } catch (error) {
    logger.error(error);
  }
});

router.get("/nozip", (req, res) => {
  try {
    logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`);
    const objMult = JSON.stringify(obj).repeat(1000);
    res.json(objMult);
  } catch (error) {
    logger.error(error);
  }
});

router.get("*", (req, res) => {
  logger.warn(`La URL ${req.url} no es valida`);
  res.send("esta ruta no es valida");
});

router.get('/artillery', (req, res) => {
    try {
        logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`)
        console.log(obj)
        res.json(obj);
    } catch (error) {
        logger.error(error)
    }
});

export default router;