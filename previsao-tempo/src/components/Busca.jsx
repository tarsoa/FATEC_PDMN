// rafce   	
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import striptags from 'striptags';

const Busca = ({ onBuscaRealizada }) => {
  const [termoDeBusca, setTermoDeBusca] = useState('São Paulo');
  const [resultado, setResultado] = useState(null);
  const [timeoutID, setTimeoutID] = useState(null);

  useEffect(() => {
    if (termoDeBusca.length >= 3) {
      if (timeoutID) clearTimeout(timeoutID);

      const novoTimeout = setTimeout(() => {
        fazerBusca();
      }, 2000);

      setTimeoutID(novoTimeout);

      return () => clearTimeout(novoTimeout);
    }
  }, [termoDeBusca]);

  const fazerBusca = async () => {
    const { data } = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: `${termoDeBusca},BR`,
            appid: '507157d5122fb8d1e388d1e29962f8ba',
            units: 'metric',
            lang: 'pt_br'
          }
        }
      );
      setResultado(data);   
  };

  return (
    <div className="p-3">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          placeholder="Digite o nome da cidade"
          value={termoDeBusca}
          onChange={(e) => setTermoDeBusca(e.target.value)}
        />
      </IconField>

      {resultado && (
        <div className="mt-3 border-1 border-solid border-gray-400 p-3 border-round">
          <h3 className="mb-2 text-center">{resultado.name}</h3>
          <p>🌡️ Temperatura mínima: {resultado.main.temp_min}°C</p>
          <p>🌡️ Temperatura máxima: {resultado.main.temp_max}°C</p>
          <p>💧 Umidade relativa do ar: {resultado.main.humidity}%</p>
          <p>📄 Descrição: {striptags(resultado.weather[0].description)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${resultado.weather[0].icon}@2x.png`}
            alt="Ícone do clima"
          />                    
        </div>
      )}
    </div>
  );
};

export default Busca;
