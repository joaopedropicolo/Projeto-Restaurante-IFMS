const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const UsuariosRoutes = require("./routes/UsuarioRoute.js")
app.use("/", UsuariosRoutes)

if (require.main === module) {
const port = 8000
app.listen(port, () => {
    console.log(`aplicação rodando em localhost:${port}`)
});
}

module.exports = app;