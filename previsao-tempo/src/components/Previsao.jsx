export default function Previsao({ descricao, temp_min, temp_max, umidade, icone }) {
  return (
    <div>
      <h4>{descricao}</h4>
      <p>Min: {temp_min}</p>
      <p>Max: {temp_max}</p>
      <p>Umid.: {umidade}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icone}@2x.png`}
        alt="Ícone"
      />
    </div>
  );
}
