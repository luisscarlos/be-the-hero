const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  //listar todas ongs
  async index(request, response) {
    const ongs = await connection('ongs').select('*');
 
    return response.json(ongs);
  },

  //cadastra ong
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    //gerando um ID aleatório para Ong
    const id = generateUniqueId();
    
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,uf,
    })
  
    return response.json({ id });
  }
}