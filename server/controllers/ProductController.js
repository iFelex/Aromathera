//importar modelo de jabon
import ProductModel from "../models/ProductModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllProducts = async (req, res) => {
    try {
        const products =  await ProductModel.findAll();
        res.json(products)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(product[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createProduct = async (req, res) => {
    try {
        await ProductModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateProduct = async (req, res) => {
    try {
        ProductModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteProduct = async (req, res) => {
    try {
        await ProductModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
