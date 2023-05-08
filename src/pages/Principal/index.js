import { useState, useCallback } from 'react'

import { FaGithub, FaPlus } from 'react-icons/fa'
import './principal.css'

import api from '../../services/api'

export default function Principal() {

    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            //pegando os dados que o usuário digitou e consumindo api
            const response = await api.get(`repos/${newRepo}`)

            //pegando os dados devolvidos no get
            const data = {
                name: response.data.full_name,
                created: response.data.created_at,
                url: response.data.git_url
            }

            //adicionando novo repositório à lista
            setRepositorios([...repositorios, data])
            //limpando o input
            setNewRepo('')
        }

        submit();
        console.log(repositorios)

    }, [newRepo, repositorios]);


    return (
        <div className="container">

            <h1>
                <FaGithub color='#0D2636' size={25} />
                Meus Repositórios
            </h1>

            <form className='form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Adicionar repositório'
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                <button className='submitButton' type='submit'><FaPlus color='#FFF' size={14} /></button>
            </form>

        </div>
    )
}