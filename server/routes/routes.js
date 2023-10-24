import express, { Router } from 'express'
import { createSoap, deleteSoap, getAllSoaps, getSoap, updateSoap } from '../controllers/SoapController.js'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct , updateProductStock} from '../controllers/ProductController.js'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/UserController.js'
import { createEgress, deleteEgress, getAllEgress, getEgress, updateEgress } from '../controllers/EgressController.js'
import { createIncome, deleteIncome, getAllIncomes, getIncome, updateIncome } from '../controllers/IncomeController.js'
import { createClient, deleteClient, getAllClients, getClient, updateClient } from '../controllers/ClientController.js'
import { createOrderClient, deleteOrderClient, getAllOrderClients, getOrderClient, updateOrderClient } from '../controllers/OrderClientController.js'
import { createShoppingCart, deleteShoppingCart, getAllShoppingCarts, getShoppingCart, updateShoppingCart } from '../controllers/ShoppingCartController.js'
import { createPreference, deletePreference, getAllPreference, getPreference, updatePreference } from '../controllers/PreferenceController.js'
const router = express.Router()

router.get('/allSoaps/', getAllSoaps)
router.get('/getSoap/:id', getSoap)
router.post('/createSoap/', createSoap)
router.put('/updateUser/:id', updateSoap)
router.delete('/deleteSoap/:id', deleteSoap)

router.get('/allShoppingCarts/', getAllShoppingCarts)
router.get('/getShoppingCartt/:id', getShoppingCart)
router.post('/createShoppingCart/', createShoppingCart)
router.put('/updateShoppingCart/:id', updateShoppingCart)
router.delete('/deleteShoppingCart/:id', deleteShoppingCart)

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

router.get('/allEgress/', getAllEgress)
router.get('/getEgress/:id', getEgress)
router.post('/createEgress/', createEgress)
router.put('/updateEgress/:id', updateEgress)
router.delete('/deleteEgress/:id', deleteEgress)

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

router.get('/allClient/', getAllOrderClients)
router.get('/getClient/:id', getOrderClient)
router.post('/createClient/', createOrderClient)
router.put('/updateClient/:id', updateOrderClient)
router.delete('/deleteClient/:id', deleteOrderClient)
export default router