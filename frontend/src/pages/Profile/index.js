import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  //busca a storage salva pelo Logon no handleLogin
  const ongID = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', { //pega o header "Authorization" da rota profile
      headers: {
        Authorization: ongID,
      }
    }).then(response => { //então executa a função
      setIncidents(response.data); //response recebe response.data que é o array de casos
    })
  }, [ongID]);

  //função do botão deletar incident
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, { //chama a função delete da api(backend)
        headers: { //busca também no header o ID da ONG para ter certeza que ela
          Authorization: ongID, //está tentando deletar o caso que ela criou (mesmo ID do caso(ongID)).
        }
      });

      //faz atualizar a lista de casos na interface
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }

  }

  //função do botão logout
  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      {/* lista de casos */}
      <ul>
        {incidents.map(incident => ( //vai percorrer todos casos
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            {/* botão deletar */}
            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}