// TESTE DE INTEGRAÇÃO

const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => { // antes de cada teste, executa algo
    await connection.migrate.rollback(); // desfaz todas alterações no DB
    await connection.migrate.latest(); // executa a migrate para criar a table ongs abaixo
  });

  afterAll(async () => { // depois de todos testes executarem, desfaz a conexão com o DB
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@gmail.com",
        whatsapp: "85996485241",
        city: "Fortaleza",
        uf: "CE"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});