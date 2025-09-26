const express = require("express");
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: "Carlos",
    email: "carlos@email.com",
    cpf: "11122233344",
    curso: "Matemática",
    disciplina: "Álgebra",
  },
  {
    id: 2,
    nome: "Ana",
    email: "ana@email.com",
    cpf: "55566677788",
    curso: "Português",
    disciplina: "Literatura",
  },
];

// GET /professores
router.get("/", (req, res) => res.json(professores));

// GET /professores/:id
router.get("/:id", (req, res) => {
  const prof = professores.find((p) => p.id === parseInt(req.params.id));
  if (!prof) return res.status(404).json({ error: "Professor não encontrado" });
  res.json(prof);
});

// POST /professores
router.post("/", (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;
  if (!nome || !email || !cpf)
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });

  const id = professores.length
    ? professores[professores.length - 1].id + 1
    : 1;
  const novoProf = { id, nome, email, cpf, curso, disciplina };
  professores.push(novoProf);
  res.status(201).json(novoProf);
});

// PUT /professores/:id
router.put("/:id", (req, res) => {
  const prof = professores.find((p) => p.id === parseInt(req.params.id));
  if (!prof) return res.status(404).json({ error: "Professor não encontrado" });

  const { nome, email, cpf, curso, disciplina } = req.body;
  prof.nome = nome || prof.nome;
  prof.email = email || prof.email;
  prof.cpf = cpf || prof.cpf;
  prof.curso = curso || prof.curso;
  prof.disciplina = disciplina || prof.disciplina;

  res.json(prof);
});

// DELETE /professores/:id
router.delete("/:id", (req, res) => {
  const index = professores.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "Professor não encontrado" });

  professores.splice(index, 1);
  res.json({ message: "Professor deletado com sucesso" });
});

module.exports = router;
