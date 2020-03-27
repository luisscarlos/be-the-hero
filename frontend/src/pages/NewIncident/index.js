import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  //função do submit do form
  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container"> {/* container com todos elementos*/}
      <div className="content"> {/*div para aplicar borda na estilização*/}
        <section> {/* elementos da esquerda */}
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontra um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            {/* O icone de Login é usado em forma de componente <FiLogIn/> */}
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}> {/* elementos da direita */}
          <input 
            placeholder="Título do caso" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <textarea 
            placeholder="Descrição" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />

          <input 
            placeholder="Whatsapp" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            // required
          />

          <input 
            placeholder="Valor em reais"
            value={value} 
            onChange={e => setValue(e.target.value)}
            required
          />
          {/* falta adicionar os campos Cidade, UF e Whatsapp pra salvar do bd */}

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}