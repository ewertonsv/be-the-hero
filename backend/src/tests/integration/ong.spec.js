const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

//testa a rota de criação da ONG, ainda falta fazer para as outras rotas
describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); //zera o banco antes do teste
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('authorization', '1ad3sf') --> este comando é válido para rotas que precisam do Id no header
        .send({
            name: "Hospital dos Animais",
            email: "contato@ajude.com",
            whatsapp: "84987148366",
            city: "Parazinho",
            uf: "RN"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});