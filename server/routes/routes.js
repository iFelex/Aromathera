import express, { Router } from 'express'
import { createSoap, deleteSoap, getAllSoaps, getSoap, updateSoap } from '../controllers/SoapController.js'
const router = express.Router()

router.get('/', getAllSoaps)
router.get('/:id', getSoap)
router.post('/', createSoap)
router.put('/:id', updateSoap)
router.delete('/:id', deleteSoap)

export default router