//importar modelo de jabon
import IncomeModel from "../models/IncomeModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllIncomes = async (req, res) => {
    try {
        const incomes =  await IncomeModel.findAll();
        res.json(incomes)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getIncome = async (req, res) => {
    try {
        const income = await IncomeModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(income[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createIncome = async (req, res) => {
    try {
        await IncomeModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateIncome = async (req, res) => {
    try {
        IncomeModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteIncome = async (req, res) => {
    try {
        await IncomeModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
