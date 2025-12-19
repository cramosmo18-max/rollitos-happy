const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const archivo = './socios.json'

// get
app.get('/socios', (req, res) => {
  const data = fs.readFileSync(archivo)
  res.json(JSON.parse(data))
})

// get por id (basado en lab 06: get /users/2)
app.get('/socios/:id', (req, res) => {
  const socios = JSON.parse(fs.readFileSync(archivo))
  const id = parseInt(req.params.id)

  const socio = socios.find(s => s.id === id)

  if (!socio) {
    return res.status(404).json({ mensaje: 'socio no encontrado' })
  }

  res.json(socio)
})


// post
app.post('/socios', (req, res) => {
  const socios = JSON.parse(fs.readFileSync(archivo))
  const nuevo = {
    id: socios.length + 1,
    ...req.body
  }
  socios.push(nuevo)
  fs.writeFileSync(archivo, JSON.stringify(socios, null, 2))
  res.json(nuevo)
})

// put
app.put('/socios/:id', (req, res) => {
  const socios = JSON.parse(fs.readFileSync(archivo))
  const id = parseInt(req.params.id)
  const index = socios.findIndex(s => s.id === id)
  socios[index] = { id, ...req.body }
  fs.writeFileSync(archivo, JSON.stringify(socios, null, 2))
  res.json(socios[index])
})

// delete
app.delete('/socios/:id', (req, res) => {
  let socios = JSON.parse(fs.readFileSync(archivo))
  socios = socios.filter(s => s.id != req.params.id)
  fs.writeFileSync(archivo, JSON.stringify(socios, null, 2))
  res.json({ mensaje: 'socio eliminado' })
})

app.listen(3000, () => {
  console.log('web service rollitos happy activo')
})
