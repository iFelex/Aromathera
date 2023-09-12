import express, { Router } from 'express'
import { createSoap, deleteSoap, getAllSoaps, getSoap, updateSoap } from '../controllers/SoapController.js'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/ProductController.js'
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

export default router