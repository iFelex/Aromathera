//importar modelo de jabon
import ClientModel from "../models/ClientModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllClients = async (req, res) => {
    try {
        const clients =  await ClientModel.findAll();
        res.json(clients)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getClient = async (req, res) => {
    try {
        const client = await ClientModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(client[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createClient = async (req, res) => {
    try {
        await ClientModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateClient = async (req, res) => {
    try {
        ClientModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteClient = async (req, res) => {
    try {
        await ClientModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
