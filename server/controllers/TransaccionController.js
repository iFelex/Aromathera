//importar modelo de jabon
import TransaccionModel from "../models/TransaccionModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllTransaccions = async (req, res) => {
    try {
        const transaccions =  await TransaccionModel.findAll();
        res.json(transaccions)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getTransaccion = async (req, res) => {
    try {
        const transaccion = await TransaccionModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(transaccion[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createTransaccion = async (req, res) => {
    try {
        await TransaccionModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateTransaccion = async (req, res) => {
    try {
        TransaccionModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteTransaccion = async (req, res) => {
    try {
        await TransaccionModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
