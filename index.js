let express = require("express");
let app = express();
let cors = require("cors");
let path = require("path");
let Socket = require("./utils/sockets")
const PORT = 3000;
let {Server: HttpServer} = require("http");

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors("*"));

// handlebars
app.set("views", path.join(__dirname , "views", "ejs"));
app.set("view engine", "ejs");

// Routes
app.use(require("./routes"));

// Socket
let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);
socket.init();

httpServer.listen(PORT)