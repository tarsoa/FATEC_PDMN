//rafce
import React from 'react'
import Accordion from './components/Accordion'
import Busca from './components/Busca'

const itens = [
  {
    titulo: 'Java',
    conteudo: 'Liguagem compilada e interpretada.'
  },
  {
    titulo: 'Python',
    conteudo: 'Linguagem iterpretada e dinamicamente tipada.'
  },
  {
    titulo: 'Javascript',
    conteudo: 'Interpretada. Executa do lado do cliente e do lado do servidor.'
  }

]
const App = () => {
  const expressaoJSX = <Busca />
  return (
    <div>
      {expressaoJSX}
    </div>
  )
}

export default App
