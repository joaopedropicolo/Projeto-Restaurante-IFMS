const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/perfil", require("./routes/perfilRoutes"));
app.use("/mesas", require("./routes/mesaRoutes"));
app.use("/reservas", require("./routes/reservaRoutes"));

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));