// rafce   	
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import striptags from 'striptags';

const Busca = ({ onBuscaRealizada }) => {
  const [termoDeBusca, setTermoDeBusca] = useState('São Paulo');
  const [previsoes, setPrevisoes] = useState([]);
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
        'http://localhost:3000/weather',
        {
          params: {
            city: termoDeBusca
          }
        }
      );
      setPrevisoes(data);   
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

      {previsoes.length> 0 && (
        <div className="mt-3 border-1 border-solid border-gray-400 p-3 border-round">
          <h3 className="mb-3 text-center">Previsão para {termoDeBusca}</h3>
          {previsoes.map((item, index) => (
            <div
              key={index}
              className="border-1 border-solid border-gray-300 p-3 border-round mb-3">          
              <p> Temperatura mínima: {item.temp_min}°C</p>
              <p> Temperatura máxima: {item.temp_max}°C</p>
              <p> Umidade relativa do ar: {item.humidity}%</p>
              <p> Descrição: {striptags(item.description)}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt="Ícone do clima"
                />  
            </div> 
          ))}                 
          </div>    
        )}
      </div>
    );
  };


export default Busca;
