//importar modelo de jabon
import UserModel from "../models/UserModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
    try {
        const users =  await UserModel.findAll();
        res.json(users)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(user[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateUser = async (req, res) => {
    try {
        UserModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteUser = async (req, res) => {
    try {
        await UserModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}


