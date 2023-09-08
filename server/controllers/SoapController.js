//importar modelo de jabon
import SoapModel from "../models/SoapModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllSoaps = async (req, res) => {
    try {
        const soaps =  await SoapModel.findAll();
        res.json(soaps)
    } catch (error) {
        res.json({message: error.message})
    }
}
//Mostrar registro
export const getSoap = async (req, res) => {
    try {
        const soap = await SoapModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(soap[0])
    } catch (error) {
        res.json({message: error.message})
    }
}
//Crear registro
export const createSoap = async (req, res) => {
    try {
        await SoapModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
//Actualizar registro
export const updateSoap = async (req, res) => {
    try {
        SoapModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
//Eliminar registro
export const deleteSoap = async (req, res) => {
    try {
        await SoapModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
