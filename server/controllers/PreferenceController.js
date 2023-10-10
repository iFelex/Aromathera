//importar modelo de jabon
import PreferenceModel from "../models/PreferenceModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllPreference = async (req, res) => {
    try {
        const preference = await PreferenceModel.findAll();
        res.json(preference);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Mostrar registro
export const getPreference = async (req, res) => {
    try {
        const preference = await PreferenceModel.findAll({
            where: { id: req.params.id }
        })
        res.json(preference[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear registro
export const createPreference = async (req, res) => {
    try {
        await PreferenceModel.create(req.body)
        res.json({ "message": "Registro creado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar registro
export const updatePreference = async (req, res) => {
    try {
        PreferenceModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({ "message": "Registro actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Eliminar registro
export const deletePreference = async (req, res) => {
    try {
        await PreferenceModel.destroy({
            where: { id: req.params.id }
        })
        res.json({ "message": "Registro borrado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}
