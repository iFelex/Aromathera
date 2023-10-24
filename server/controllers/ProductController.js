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
        await ProductModel.update(req.body, {where: {id: req.params.id}})
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

// Actualizar solo el campo 'stock' de un producto
export const updateProductStock = async (req, res) => {
    console.log("Si entro 1 ");
    try {
      const { stockAddition } = req.body; // Nuevo stock que deseas agregar
      const product = await ProductModel.findOne({
        where: { name: req.params.productName },
      });
      console.log(stockAddition);
      if (product) {
        const updatedStock = product.stock + stockAddition;
        console.log("Si entro 2");
        // Actualiza el campo 'stock' del producto con el nuevo valor
        await product.update({ stock: updatedStock });
  
        res.json({ message: "Stock actualizado" });
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(501).json({ message: error.message });
    }
  };

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
