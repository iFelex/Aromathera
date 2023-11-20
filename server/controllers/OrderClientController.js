import OrderClientModel from "../models/OrderClientModel.js";

export const getAllOrderClients = async (req, res) => {
    try {
        const clients =  await OrderClientModel.findAll();
        res.json(clients)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Mostrar registro
export const getOrderClient = async (req, res) => {
    try {
        const client = await OrderClientModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(client[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear registro
export const createOrderClient = async (req, res) => {
    try {
        console.log("Lola body", req.body)
        await OrderClientModel.create(req.body)
        res.json({"message":"Registro creado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar registro
export const updateOrderClient = async (req, res) => {
    try {
        OrderClientModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro actualizado"})
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar registro
export const deleteOrderClient = async (req, res) => {
    try {
        await OrderClientModel.destroy( {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro borrado"})
    } catch (error) {
        res.json({message: error.message})
    }
}
