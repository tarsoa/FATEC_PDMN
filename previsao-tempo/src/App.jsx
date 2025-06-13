import Busca from './components/Busca';

const App = () => {
  const buscarClima = (cidade) => {
    console.log('Buscando por:', cidade);
};

  return (
    <div>
      <h2>Previsão do Tempo</h2>
      <Busca onBuscaRealizada={buscarClima} />
    </div>
  );
};

export default App;