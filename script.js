let contador1 = 0
let contador2 = 1
let bandera = true

const secciones = document.querySelectorAll('section')
const progreso = document.querySelector('.progreso h2')
const circulos = document.querySelectorAll('.circulo')
const menu = document.querySelector('.menu')
const seccion1wrapper = document.querySelector('.seccion-1-wrapper')
const seccion5wrapper = document.querySelector('.seccion-5-wrapper')

seccion1wrapper.style.transform = 'scale(1)'

const progresoContador = () => {
  progreso.textContent = `${contador2}/${secciones.length}`
  Array.from(circulos).forEach(circulo => {
    circulo.style.backgroundColor = "transparent"
  })
  document.querySelector(`.circulo-${contador2}`)
    .style.backgroundColor = '#ddd'
}

const paginaControlador = () => {
  bandera = true
  if (contador1 === 5) {
    Array.from(secciones).forEach(seccion => {
      seccion.style.left = '0'
    })

    contador1 = 0
    contador2 = 1
    seccion1wrapper.style.transform = 'scale(1)'
    seccion5wrapper.style.transform = 'scale(1.5)'
    progresoContador()
    bandera = false
  }

  if (contador1 === -1) {
    Array.from(secciones).forEach(seccion => {
      if (seccion.classList[0] === 'seccion-5') {
        return
      }
      seccion.style.left = '-100vw'
    })
    contador1 = 4
    contador2 = 5
    seccion1wrapper.style.transform = 'scale(1.5)'
    seccion5wrapper.style.transform = 'scale(1)'
    progresoContador()
    bandera = false
  }

  progresoContador()
  return bandera
}

window.addEventListener('wheel', (e) => {
  const deltaY = e.deltaY > 0
  if (e.deltaY > 0) {
    contador1++
    contador2++
  } else {
    contador1--
    contador2--
  }

  paginaControlador()
  progresoContador()

  if (bandera) {
    document.querySelector(`.seccion-${deltaY ? contador1 : contador2}`).style
      .left = `${deltaY ? '-100vw' : '0'}`

    document.querySelector(`.seccion-${deltaY ? contador1 : contador2}-wrapper`)
      .style.transform = `scale(${deltaY ? '1.5' : '1'})`

    document.querySelector(`.seccion-${deltaY ? contador1 + 1 : contador2 + 1}-wrapper`)
      .style.transform = `scale(${deltaY ? '1' : '1.5'})`
  }
})

document.querySelector('.izq-btn').addEventListener('click', () => {
  contador1--
  contador2--
  paginaControlador() && (document.querySelector(`.seccion-${contador2}`)
    .style.left = '0')

  if (bandera) {
    document.querySelector(`.seccion-${contador2}-wrapper`)
      .style.transform = 'scale(1)'
    document.querySelector(`.seccion-${contador2 + 1}-wrapper`)
      .style.transform = 'scale(1.5)'
  }
})

document.querySelector('.der-btn').addEventListener('click', () => {
  contador1++
  contador2++
  paginaControlador() && (document.querySelector(`.seccion-${contador1}`)
    .style.left = '-100vw')
  if (bandera) {
    document.querySelector(`.seccion-${contador2}-wrapper`)
      .style.transform = 'scale(1)'
    document.querySelector(`.seccion-${contador1}-wrapper`)
      .style.transform = 'scale(1.5)'
  }
})

document.querySelector('.uvas-img').addEventListener('mouseover', () => {
  document.querySelector('.seccion-3-wrapper').style.opacity = '.5'
})

document.querySelector('.uvas-img').addEventListener('mouseout', () => {
  document.querySelector('.seccion-3-wrapper').style.opacity = '1'
})

menu.addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('cambio')
})