import { Router } from "express";
import * as db from "../db/index.js"

const router = Router()

// Obtener todas las biciclets
router.get("/", async (req, res) => {
    try {
        //tratamos de obtener las bicicletas
        const text = "SELECT * FROM bicicletas"

        const result = await db.query(text)

        res.json({
            bicicletas: result.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status:500,
            message: "Error interno de servidor"
        })
    }
})

export { router }