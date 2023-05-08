import { useState, useCallback } from 'react'

import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa'
import './principal.css'

import { toast } from 'react-toastify'

import api from '../../services/api'

export default function Principal() {

    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])

    const [buttonLoading, setButtonLoading] = useState(false)

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setButtonLoading(true)
            try {
                //pegando os dados que o usuário digitou e consumindo api
                const response = await api.get(`repos/${newRepo}`)

                //pegando os dados devolvidos no get
                const data = {
                    name: response.data.full_name,
                    created: response.data.created_at,
                    url: response.data.git_url
                }
                toast.success("Repositório adicionado com sucesso")
                //adicionando novo repositório à lista
                setRepositorios([...repositorios, data])
                //limpando o input
                setNewRepo('')
            }catch(error){
                toast.error("Não foi possível localizar o repositório");
            }finally{
                setButtonLoading(false)
            }

        }

        submit();

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
                {buttonLoading === true ? (
                    <button className='submitButton' type='submit'><FaSpinner color='#FFF' size={14} /></button>
                ) : <button className='submitButton' type='submit'><FaPlus color='#FFF' size={14} /></button>}
            </form>

        </div>
    )
}