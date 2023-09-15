//importar modelo de jabon
import EgressModel from "../models/EgressModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllEgress = async (req, res) => {
    try {
        const egress =  await EgressModel.findAll();
        res.json(egress)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getEgress = async (req, res) => {
    try {
        const egress = await EgressModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(egress[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createEgress = async (req, res) => {
    try {
        await EgressModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateEgress = async (req, res) => {
    try {
        EgressModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteEgress = async (req, res) => {
    try {
        await EgressModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
