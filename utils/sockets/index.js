let {Server: SocketIo} = require("socket.io");
let moment = require("moment");
class Socket {
    static instancia;
    constructor(http){
        if (Socket.instancia){
            return Socket.instancia;
        }
        Socket.instancia = this;
        this.io = new SocketIo(http);
        this.mensajes = [];
        this.productos = [];
    }

    init() {
        try {
            this.io.on('connect', socket => {
                socket.emit("init", this.mensajes, this.productos)
                
                socket.on("chat_text", data => {
                    data = {
                        day: moment().format('L'),
                        hour: moment().format('LTS'), 
                        ...data
                    }
                    this.mensajes.push(data);
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos);
                })

                socket.on('addProduct', data => {
                    this.productos.push(data);
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos)
                })

            })

        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = Socket;