
module. exports = io => {
    //aca se guardan todas las lineas dibujadas
    var line_history = [];

    io.on ('connection', socket => {
        console.log("se conecto un usuario");

        //recorro line_history para poder dibujar el historial
        for(let i in line_history){
            //dibujo lo que ya estaba antes de conectarme
            socket.emit('draw_line', {line:line_history[i]});
        }
        
        //escuchar los datos del usuario
        socket.on('draw_line', data =>{
            //guardar los datos en las memoria del sv
            line_history.push(data.line);
            //el servidor envia los datos "lineas " a todos los usuarios
            io.emit('draw_line',data);
        });
    });
}