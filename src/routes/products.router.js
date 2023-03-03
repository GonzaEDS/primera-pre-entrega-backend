import { Router } from 'express'
const router = Router()
import products from '../controllers/ProductManager.js'

router.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body
    let data = await products.saveProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    )
    res.redirect('/api/products')
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.get('/', async (_req, res) => {
  try {
    let data = await products.getAll()
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.get('/:pid', async (req, res) => {
  let { pid } = req.params
  try {
    let data = []
    data.push(await products.getById(pid))
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

router.put('/:id', async (req, res) => {
  let { id } = req.params
  try {
    let data = await products.putById(id, req.body)
    if (data) {
      res.status(200).json({
        response: data
      })
    } else {
      res.status(404).json({
        resposne: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      respones: 'error'
    })
  }
})

router.delete('/:id', async (req, res) => {
  let { id } = req.params
  try {
    let data = await products.deleteById(id)
    if (data) {
      res.status(200).json({
        response: 'product deleted'
      })
    } else {
      res.status(404).json({
        response: 'can not find'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: 'error'
    })
  }
})

export default router
