const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Importar routers
const professoresRouter = require("./routes/professores");
const alunosRouter = require("./routes/alunos");

// Mapear rotas
app.use("/professores", professoresRouter);
app.use("/alunos", alunosRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
