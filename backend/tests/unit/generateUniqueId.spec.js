// TESTE UNITÁRIO

const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {  //coloca categoria nesse arquivo de teste
  it('should generate an unique ID', () => { // definindo o que essa função do teste faz
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});