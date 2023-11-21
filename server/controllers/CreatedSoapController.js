//importar modelo de jabon
import CreatedSoapModel from "../models/CreatedSoapModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllCreatedSoaps = async (req, res) => {
    try {
        const createdSoaps =  await CreatedSoapModel.findAll();
        res.json(createdSoaps)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getCreatedSoap = async (req, res) => {
    try {
        const createdSoap = await CreatedSoapModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(createdSoap[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createCreatedSoap = async (req, res) => {
    try {
        await CreatedSoapModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateCreatedSoap = async (req, res) => {
    try {
        await CreatedSoapModel.update(req.body, {where: {id: req.params.id}})
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteCreatedSoap = async (req, res) => {
    try {
        await CreatedSoapModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
