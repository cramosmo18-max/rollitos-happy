const url = 'http://localhost:3000/socios'

function cargar() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista')
      lista.innerHTML = ''
      data.forEach(s => {
        lista.innerHTML += `<li>${s.nombre} - ${s.tipo}</li>`
      })
    })
}

function registrar() {
  const nombre = document.getElementById('nombre').value
  const tipo = document.getElementById('tipo').value

  fetch(url, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      nombre,
      tipo,
      mensualidad: tipo === 'premium' ? 120 : 80
    })
  }).then(() => cargar())
}

cargar()
