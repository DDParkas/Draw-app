
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const colorPicker = document.getElementById('color-picker')
const sizeSelect = document.getElementById('range-select')
const clearButton = document.getElementById('clear')
const undoButton = document.getElementById('undo')

//Canvas 
let drawing = false
let lineColor = '#000'
let lineSize = 2
let canvasBackground = '#fff'
let actions = []

canvas.width = '800'
canvas.height = '400'
canvas.style.background = canvasBackground

const startDraw = (event) =>{
    drawing = true
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
}

const draw = (event) =>{
    if(!drawing){
        return
    }
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    context.strokeStyle = lineColor
    context.lineWidth = lineSize
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.stroke()
  
}
const stopDraw = (event) =>{
    context.closePath()
    drawing = false
    if(event.type != 'mouseout' ){

        actions.push(context.getImageData(0,0,canvas.width, canvas.height))

    }
    
}

//eventos de mouse
canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', stopDraw)
canvas.addEventListener('mouseout', stopDraw)

//eventos de touch
canvas.addEventListener('touchstart', startDraw)
canvas.addEventListener('toushmove', draw)
canvas.addEventListener('touchend', stopDraw)

//cores
const colorSelector = () => {
    lineColor = colorPicker.value
}

//tamanho
sizeSelect.value = 1
const sizeSelector = () =>{
    lineSize = sizeSelect.value
}

//clear
const clear = ()=>{
   context.fillStyle = canvasBackground
   context.clearRect( 0, 0, canvas.width, canvas.height)
   context.fillRect( 0, 0, canvas.width, canvas.height)
   actions = []
}

//undo
const undo = () => {
    if( actions.length <= 1){
        clear()
        return
    }
    actions.pop()
    context.putImageData(actions[actions.length - 1],0,0)
}


colorPicker.addEventListener('input', colorSelector)
sizeSelect.addEventListener('input', sizeSelector)
clearButton.addEventListener('click', clear)
undoButton.addEventListener('click', undo)