const morgan = require('morgan');
const express = require("express");
const app = express();
const cors = require('cors');
//Accedemos a los otros archivos
const empleados = require('./routes/empleados');
const user = require('./routes/user');
const auth = require('./middleware/auth');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.status(200).json({ message: "Bienvenido al sistema de RH de NODE JS" }));
app.use("/user", user);

// Rutas protegidas solo para usuarios con tokens
app.use(auth); 
app.use("/empleados", empleados);

app.listen(process.env.PORT || 3000, () => {
    console.log("Pues dice que va jalando");
});