import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
export default function NewIncident() {
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleNewIncidents(e) {
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
        },
      });

      history.push('/profile');
    } catch (error) {
      alert('erro ao cadastrar novo incidente, tente novamente');
    }
  }
  return (
    <div className="new-incident-container ">
      <div className="content">
        <section>
          <img src={logoImg} alt="Imagens Logo Heros" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontra um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para inicio
          </Link>
        </section>

        <form>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleNewIncidents} className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
