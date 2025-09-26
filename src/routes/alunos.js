const express = require("express");
const router = express.Router();

let alunos = [
  {
    id: 1,
    nome: "Antonio",
    email: "antonio@email.com",
    cpf: "1112338883839",
    dataNascimento: "04/03/2001"
  },
  {
    id: 2,
    nome: "Maria",
    email: "ana@email.com",
    cpf: "55566677788",
    dataNascimento: "05/02/2002"
  },
];

// GET /alunos
router.get("/", (req, res) => res.json(alunos));

// GET /alunos/:id
router.get("/:id", (req, res) => {
  const aluno = alunos.find((p) => p.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
  res.json(aluno);
});

// POST /alunos
router.post("/", (req, res) => {
  const { nome, email, cpf, dataNascimento } = req.body;
  if (!nome || !email || !cpf || !dataNascimento)
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });

  const id = alunos.length
    ? alunos[alunos.length - 1].id + 1
    : 1;
  const novoAluno = { id, nome, email, cpf, dataNascimento };
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// PUT /alunos/:id
router.put("/:id", (req, res) => {
  const aluno = alunos.find((p) => p.id === parseInt(req.params.id));
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

  const { nome, email, cpf, dataNascimento } = req.body;
  aluno.nome = nome || aluno.nome;
  aluno.email = email || aluno.email;
  aluno.cpf = cpf || aluno.cpf;
  aluno.dataNascimento = dataNascimento || aluno.dataNascimento;

  res.json(aluno);
});

// DELETE /alunos/:id
router.delete("/:id", (req, res) => {
  const index = alunos.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "Aluno não encontrado" });

  // alunos.splice(index, 1);
  alunos.splice(index, 1);
  res.json({ message: "Aluno deletado com sucesso" });
});

module.exports = router;