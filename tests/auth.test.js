const request = require("supertest");
const app = require("../index");

describe("Testes de Cadastro e Login", () => {
  const usuarioTeste = {
    nome: "Teste User",
    email: "teste@example.com",
    password: "123456",
  };

  //---------- Cadastro ----------
  test("Deve cadastrar usuário com sucesso", async () => {
    const res = await request(app)
      .post("/auth/cadastro")
      .send(usuarioTeste);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("usuarioId");
  });

  test("Não deve cadastrar usuário com email já existente", async () => {
    const res = await request(app)
      .post("/auth/cadastro")
      .send(usuarioTeste);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("Este email já está cadastrado!");
  });

  test("Não deve cadastrar usuário sem dados obrigatórios", async () => {
    const res = await request(app)
      .post("/auth/cadastro")
      .send({ email: "", password: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("Nome, email e senha são obrigatórios!");
  });

  //---------- Login ----------
  test("Deve autenticar usuário com credenciais corretas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: usuarioTeste.email, password: usuarioTeste.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.msg).toBe("Autenticado com sucesso!");
  });

  test("Não deve autenticar com senha incorreta", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: usuarioTeste.email, password: "senhaErrada" });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Senha incorreta!");
  });

  test("Não deve autenticar com email inexistente", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "naoexiste@example.com", password: "123456" });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Usuário não encontrado!");
  });
});