// rafce
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';

const Busca = () => {
const [termo, setTermo] = useState('São Paulo');
const [resultados, setResultados] = useState([]);
const [timeoutId, setTimeoutId] = useState(null);

const apiKey = '507157d5122fb8d1e388d1e29962f8ba';

  useEffect(() => {
    if (termo.length >= 3) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const id = setTimeout(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${termo}&appid=${apiKey}&units=metric&lang=pt_br`)
          .then(res => res.json())
          .then(data => setResultados(data.list));
      }, 2000);

      setTimeoutId(id);

      return () => clearTimeout(id);
    }
  }, [termo]);

  return (
    <div style={{ padding: '1rem' }}>
      <label htmlFor="cidade">Digite o nome da cidade:</label><br />
      <input
        id="cidade"
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Ex: São Paulo"
        style={{ width: '300px', padding: '8px', marginTop: '4px' }}
      />

      <h3 style={{ marginTop: '1.5rem' }}>Previsão para {termo}</h3>

      {resultados.map((item, index) => {
        const dataHora = new Date(item.dt * 1000);
        const data = dataHora.toLocaleDateString('pt-BR');
        const hora = dataHora.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        const { temp_min, temp_max, humidity } = item.main;
        const { description, icon } = item.weather[0];

        return (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              maxWidth: '350px'
            }}
          >
            <p><strong>Data:</strong> {data} - {hora}</p>
            <p><strong>Temp. mínima:</strong> {temp_min}°C</p>
            <p><strong>Temp. máxima:</strong> {temp_max}°C</p>
            <p><strong>Umidade:</strong> {humidity}%</p>
            <p><strong>Descrição:</strong> {description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Busca;