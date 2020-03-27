import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() { //componente Register
  // estados usados para guardar o valor dos inputs e passar para API
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) { //function para cadastrar new user
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data); //salva a ong no banco de dados
    /* o post retorna o ID da nova ong que é salva na varialvel response*/

    alert(`Seu ID de acesso: ${response.data.id}`);
    /* o .data do response, é do json enviado do insomnia 
     e o .id é o nome do campo do ID do retorno da requisição json no insomnia*/

    history.push('/'); //envia para a rota raiz da aplicação
    } catch (err) {
      alert("Erro no cadastro, tente novamente");
    }
  }

  return (
    <div className="register-container"> {/* container com todos elementos*/}
      <div className="content"> {/*div para aplicar borda na estilização*/}
        <section> {/* elementos da esquerda */}
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            {/* O icone de Login é usado em forma de componente <FiLogIn/> */}
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}> {/* elementos da direita */}
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            required
          />

          <div className="input-group"> {/*div para colocar um do lado do outro */}
          <input 
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
          
          <input
            placeholder="UF" 
            style={{ width:80 }}
            value={uf}
            onChange={e => setUf(e.target.value)}
            required
          />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}