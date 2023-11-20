//importar modelo de jabon
import ShoppingCartModel from "../models/ShoppingCartModel.js";

//** Metodos para el CRUD */

//Mostrar todos los registros
export const getAllShoppingCarts = async (req, res) => {
    try {
        const shoppingCarts =  await ShoppingCartModel.findAll({where: {active_status: 1}});
        res.json(shoppingCarts)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCartModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(shoppingCart[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createShoppingCart = async (req, res) => {
    try {
        await ShoppingCartModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateShoppingCart = async (req, res) => {
    try {
        await ShoppingCartModel.update({ active_status: 0}, {where: {id: req.params.id}})
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

// Actualizar solo el campo 'stock' de un shoppingCart
export const updateShoppingCartStock = async (req, res) => {
    try {
        const { stock } = req.body;
        await ShoppingCartModel.update({ stock },{where: { id: req.params.id }});        
        res.json({ message: "Stock actualizado" });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};

//Eliminar registro
export const deleteShoppingCart = async (req, res) => {
    try {
        await ShoppingCartModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteAllShoppingCart = async (req, res) => {
    try {
      await ShoppingCartModel.destroy({
        where: {},
        truncate: true,
      });
  
      res.json({ message: 'Todos los registros han sido eliminados' });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  