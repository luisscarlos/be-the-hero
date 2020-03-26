const connection = require('../database/connection');

module.exports = {
  //lista todos casos(incidents)
  async index(request, response) {
    const { page = 1 } = request.query;

    //retorna a quantidade de casos do banco
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5) //limita para mostrar apenas 5 resultados por busca
    .offset((page - 1) * 5) // faz a navegação da página entre os resultados
    .select([
      'incidents.*', 
      'ongs.name', 
      'ongs.email', 
      'ongs.whatsapp', 
      'ongs.city', 
      'ongs.uf'
    ]);

    //adiciono um header na resposta da requisição com a contagem de casos
    //defino o nome p/ o header, e pegando o count da resposta da requisição
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },
  
  //criar um caso(incident)
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  },

  //deleta um caso
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id) // onde id seja igual id
      .select('ong_id')
      .first(); //retorna apenas um resultado

      //confere se a id da ong que está logada é a mesma do caso que ela quer deletar
      //a ong só pode deletar seus casos(mesmo id que o seu)
      if (incident.ong_id !== ong_id) {
        return response.status(401)//status de não autorizado
        .json({ error: 'Operation not permitted.'}); 
      }

      //deleta o caso
      await connection('incidents').where('id', id).delete();

      //retorna uma resposta de sucesso e o send faz ela ser sem conteudo
      return response.status(204).send();
  }
}