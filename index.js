const morgan = require('morgan');
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path'); 

// Acceso a archivos 
const empleados = require('./routes/empleados');
const user = require('./routes/user');
const auth = require('./middleware/auth');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'public')));

app.use("/user", user);

// Rutas protegidas solo para usuarios con tokens
app.use("/empleados", auth, empleados); 

// Si entran a la raíz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Pues dice que va jalando en el puerto 3000");
});