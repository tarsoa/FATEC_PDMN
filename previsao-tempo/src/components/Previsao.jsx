import { Card } from 'primereact/card';

export default function Previsao({ descricao, temp_min, temp_max, umidade, icone }) {
  return (
    <Card>
      <p>Min: {temp_min}°C</p>
      <p>Max: {temp_max}°C</p>
      <p>Umidade: {umidade}%</p>
      <p>{descricao}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icone}@2x.png`}
        alt="Ícone"
      />
    </Card>
  );
}
