let express = require("express");
let app = express();
let cors = require("cors");
let Socket = require("./utils/sockets")
const PORT = 3000;
let {Server: HttpServer} = require("http");
let path = require("path");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors("*"));
app.use(express.static(path.join(__dirname, "public")));

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