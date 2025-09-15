const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const UsuariosRoutes = require("./routes/UsuarioRoute.js")
app.use("/usuarios", UsuariosRoutes)

const port = 8000
app.listen(port, (err) => {
    console.log(`aplicação rodandoem localhost:${port}`)
});