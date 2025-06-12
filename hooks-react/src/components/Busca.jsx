import React, {useEffect, useState } from 'react'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import striptags from 'striptags'

const Busca = () => {
    const [termoDeBusca, setTermoDeBusca] = useState('')
    const [resultados, setResultados] = useState([])
    
    // useEffect(() => {
        
    //     console.log ('Executando todas as vezes')

    // })

    // useEffect(() => {

    //     console.log ('Executando apenas uma vez')

    // }, [])

    useEffect (() => {
        

        const fazerBusca = async () => {

            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    format: 'json',
                    origin: '*',
                    srsearch: termoDeBusca
                }
            })
            setResultados(data.query.search)
        }

        fazerBusca()

    }, [termoDeBusca])

    return (

    <div>
        <IconField iconPosition='left'>
        <InputIcon className='pi pi-search'/>
        <InputText 
        placeholder='Buscar...'
        onChange={(e) => {setTermoDeBusca(e.target.value)}}
        value={termoDeBusca} />
        </IconField> 

        { resultados.map((index) => (
            <div key={index.pageid} className='my-2 border border-1 border-400'>
                <div className='border-bottom border border-1 border-400 p-2 text-center font-bold'>
                    {index.title}
                </div>
                <div className='p-2'>
                    <span dangerouslySetInnerHTML={{__html: index.snippet}}></span>
                    {/* {striptags(index.snippet)} */}
                </div>
            </div>
        ))
        }

        
    </div>
    )
}

export default Busca