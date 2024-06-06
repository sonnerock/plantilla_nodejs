import { Router } from "express";
import * as db from "../db/index.js";
import { v4 as uuidv4 } from "uuid";

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

router.post("/", async (req, res) =>{
    const { marca, modelo, precio } = req.body
    
    if(marca && modelo && precio){
        //La solicitud correcta
        try {
            const text = "INSERT INTO bicicletas (id, marca, modelo, precio) VALUES ($1, $2, $3, $4) RETURNING*"
            const values = [uuidv4().slice(0,6), marca, modelo, Number(precio)]

            const result = await db.query(text, values)

            res.status(201).json({
                message: "Bicicleta creada con exito",
                status: 201,
                bicicleta: result.rows
            })
        } catch (error) {
            console.error(error)

            res.status(500).json({
                status:500,
                message: "Error interno de servidor"
            })
            
        }
    }else{
        //bad request
        res.status(400).json({
            message: "bad request",
            status: "400"
        })
    }
})

router.put("/", async (req, res) =>{
    const { id, marca, modelo, precio } = req.body

    if( id && marca && modelo && precio ) {
        try {
            const text = "UPDATE bicicletas SET marca = $2, modelo = $3, precio = $4 WHERE id = $1 RETURNING *"
            const values = [id, marca, modelo, precio]

            const result = await db.query(text, values)

            res.status(202).json({
                message: "Bicicleta actualizada con exito",
                bicicleta: result.rows
            })
        } catch (error) {
            console.error(error)
            
            res.status(500).json({
                status:500,
                message: "Error interno de servidor"
            })
        }
    } else {
        res.status(400).json({
            message: "bad request",
            status: "400",
            error: "Faltan parametros en el body"
        })
    }
})
export { router }