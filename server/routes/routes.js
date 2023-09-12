import express, { Router } from 'express'
import { createSoap, deleteSoap, getAllSoaps, getSoap, updateSoap } from '../controllers/SoapController.js'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/ProductController.js'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/UserController.js'
const router = express.Router()

router.get('/allSoaps/', getAllSoaps)
router.get('/getSoap/:id', getSoap)
router.post('/createSoap/', createSoap)
router.put('/updateUser/:id', updateSoap)
router.delete('/deleteSoap/:id', deleteSoap)

router.get('/allProducts/', getAllProducts)
router.get('/getProduct/:id', getProduct)
router.post('/createProduct/', createProduct)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)

router.get('/allUsers/', getAllUsers)
router.get('/getProduct/:id', getUser)
router.post('/createUser/', createUser)
router.put('/updateProduct/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router