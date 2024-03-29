import express, { Router } from 'express'
import { createSoap, deleteSoap, getAllSoaps, getSoap, updateSoap } from '../controllers/SoapController.js'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct , updateProductStock} from '../controllers/ProductController.js'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/UserController.js'
import { createEgress, deleteEgress, getAllEgress, getEgress, updateEgress } from '../controllers/EgressController.js'
import { createTransaccion, deleteTransaccion, getAllTransaccions, getTransaccion, updateTransaccion } from '../controllers/TransaccionController.js'
import { createIncome, deleteIncome, getAllIncomes, getIncome, updateIncome } from '../controllers/IncomeController.js'
import { createClient, deleteClient, getAllClients, getClient, updateClient } from '../controllers/ClientController.js'
import { createOrderClient, deleteOrderClient, getAllOrderClients, getOrderClient, updateOrderClient, cancelOrder, approveOrder} from '../controllers/OrderClientController.js'
import { createShoppingCart, deleteShoppingCart, getAllShoppingCarts, getShoppingCart, updateShoppingCart, deleteAllShoppingCart } from '../controllers/ShoppingCartController.js'
import { createCreatedSoap, deleteCreatedSoap, getAllCreatedSoaps, getCreatedSoap, updateCreatedSoap } from '../controllers/CreatedSoapController.js'
import { createPreference, deletePreference, getAllPreference, getPreference, updatePreference, deleteAllPreference } from '../controllers/PreferenceController.js'
import { paymentLink} from '../controllers/PaymentController.js'

const router = express.Router()

router.get('/allSoaps/', getAllSoaps)
router.get('/getSoap/:id', getSoap)
router.post('/createSoap/', createSoap)
router.put('/updateUser/:id', updateSoap)
router.delete('/deleteSoap/:id', deleteSoap)

router.get('/allShoppingCarts/', getAllShoppingCarts)
router.get('/getShoppingCart/:id', getShoppingCart)
router.post('/createShoppingCart/', createShoppingCart)
router.patch('/updateShoppingCart/:id', updateShoppingCart)
router.delete('/deleteShoppingCart/:id', deleteShoppingCart)
router.delete('/deleteAllShoppingCart/', deleteAllShoppingCart)

router.get('/allProducts/', getAllProducts)
router.get('/getProduct/:id', getProduct)
router.post('/createProduct/', createProduct)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.put('/updateProductStock/:name', updateProductStock);
router.get('/allUsers/', getAllUsers)
router.get('/getUser/:id', getUser)
router.get('/getUser/:rol', getUser)
router.post('/createUser/', createUser)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

router.get('/allPreference/', getAllPreference)
router.get('/getPreference/:id', getPreference)
router.post('/createPreference/', createPreference)
router.put('/updatePreference/:id', updatePreference)
router.delete('/deletePreference/:id', deletePreference)
router.delete('/deleteAllPreference', deleteAllPreference);

router.get('/allEgress/', getAllEgress)
router.get('/getEgress/:id', getEgress)
router.post('/createEgress/', createEgress)
router.put('/updateEgress/:id', updateEgress)
router.delete('/deleteEgress/:id', deleteEgress)

router.get('/allTransaccion/', getAllTransaccions)
router.get('/getTransaccion/:id', getTransaccion)
router.post('/createTransaccion/', createTransaccion)
router.put('/updateTransaccion/:id', updateTransaccion)
router.delete('/deleteTransaccion/:id', deleteTransaccion)

router.get('/allCreatedSoap/', getAllCreatedSoaps)
router.get('/getCreatedSoap/:id', getCreatedSoap)
router.post('/createCreatedSoap/', createCreatedSoap)
router.put('/updateCreatedSoap/:id', updateCreatedSoap)
router.delete('/deleteCreatedSoap/:id', deleteCreatedSoap)


router.get('/allIncome/', getAllIncomes)
router.get('/getIncome/:id', getIncome)
router.post('/createIncome/', createIncome)
router.put('/updateIncome/:id', updateIncome)
router.delete('/deleteIncome/:id', deleteIncome)

router.get('/allClient/', getAllClients)
router.get('/getClient/:id', getClient)
router.post('/createClient/', createClient)
router.put('/updateClient/:id', updateClient)
router.delete('/deleteClient/:id', deleteClient)

router.get('/allOrderClient/', getAllOrderClients)
router.get('/getOrderClient/:id', getOrderClient)
router.post('/createOrderClient/', createOrderClient)
router.put('/updateOrderClient/:id', updateOrderClient)
router.delete('/deleteOrderClient/:id', deleteOrderClient)
router.put('/cancelOrder/:id', cancelOrder)
router.put('/approveOrder/:id', approveOrder)

router.post('/paymentLink/:amount', paymentLink)

export default router