import { Router } from "express";
import { access, stat } from "node:fs/promises";
import path from "node:path";

const router = Router();
const FILE_DIR = path.resolve("database/uploaded_files");
router.get("/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    console.log(filename);

    // 1⃣  Normaliza y resuelve la ruta para evitar ../ subidas
    const requestedPath = path.resolve(FILE_DIR, filename);
    console.log(requestedPath);

    // 2⃣  Comprueba que la ruta sigue dentro de FILE_DIR
    if (!requestedPath.startsWith(FILE_DIR + path.sep)) {
      res.status(400).send("Invalid path");
      return;
    }

    // 3⃣  Verifica que el archivo existe y es realmente un archivo
    await access(requestedPath); // lanza error si no existe
    const statt = await stat(requestedPath);
    if (!statt.isFile()) {
      res.status(404).send("Not a file");
    }

    // 4⃣  Envía el archivo
    res.sendFile(requestedPath);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      res.status(404).send("File not found");
      return;
    }
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

export default router;
