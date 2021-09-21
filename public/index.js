//funcion que se ejecuta cuando la pagina ya cargo, son todos los 
//eventos al inicializar
function init(){
    //propiedades del maouse
    let mouse = {
        click: false,
        move: false,
        pos: {x:0,y:0},
        posprev: false
    };
    
    //inicializacion de canvas
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    //tamaño de canvas variables segun el tamaño de la venta
    canvas.width = width;
    canvas.height = height;
    
    //socket para enviar al servidor las posiciones del usuario
    const socket = io();

    //cuando el usuario da click
    canvas.addEventListener('mousedown',(e) => {
        mouse.click = true;
    });

    //cuando el usuario deja de dar click
    canvas.addEventListener('mouseup',(e) => {
        mouse.click = false;
    });

    //cuando el usuario se mueve
    canvas.addEventListener('mousemove',(e) => {
        mouse.pos.x = e.clientX/width;
        mouse.pos.y = e.clientY/height;
        mouse.move = true;
    });

    socket.on("draw_line",data => {
        //arreglo con la posicion de donde empieza y donde termina la linea
        const line = data.line;
        //empieza el trazo
        context.beginPath();
        context.lineWith = 2;
        context.moveTo(line[0].x*width, line[0].y*height);
        context.lineTo(line[1].x*width, line[1].y*height);
        //comienza a dibujar la linea
        context.stroke();
    })
    //comprobar continuamente si el usuario esta dibujando
    function mainloop(){
        //el usuario esta "dibujando"
        if(mouse.click && mouse.move && mouse.posprev){
            //envio los datos
            socket.emit('draw_line',{line: [mouse.pos , mouse.posprev]});
            mouse.move = false;
        }
        mouse.posprev = {x:mouse.pos.x , y:mouse.pos.y};
        setTimeout(mainloop, 25);
    }
    mainloop();


}

//evento que dice si la pagina ya esta cargada
document.addEventListener('DOMContentLoaded',init);