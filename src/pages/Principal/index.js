import { useState, useCallback, useEffect } from 'react'

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import './principal.css'

import { toast } from 'react-toastify'

import api from '../../services/api'

import { Link } from 'react-router-dom'

export default function Principal() {

    const [newRepo, setNewRepo] = useState('')
    const [repositorios, setRepositorios] = useState([])

    const [buttonLoading, setButtonLoading] = useState(false)

    //Buscar
    useEffect(() => {
        const repoStorage = localStorage.getItem('repository');

        if (repoStorage) {
            setRepositorios(JSON.parse(repoStorage));
        }

    }, []);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setButtonLoading(true)
            try {

                //pegando os dados que o usuário digitou e consumindo api
                const response = await api.get(`repos/${newRepo}`)

                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if (hasRepo) {
                    toast.error("Este repositório já foi cadastrado!")
                    throw new Error('Repositório já cadastrado!');
                }

                //pegando os dados devolvidos no get
                const data = {
                    name: response.data.full_name,
                }
                toast.success("Repositório adicionado com sucesso");
                // adicionando novo repositório à lista
                setRepositorios([...repositorios, data])
                // salvando a lista atualizada no localStorage
                localStorage.setItem('repository', JSON.stringify([...repositorios, data]));
                // limpando o input
                setNewRepo('')

            } catch (error) {
                toast.error("Repositório não encontrado");
                setNewRepo('')
            } finally {
                setButtonLoading(false)
            }

        }

        submit();

    }, [newRepo, repositorios]);

    const handleDelete = useCallback((repo) => {
        //procurando todos os repositorios com nome diferente do nome do repositorio que foi passado e armazenando no find
        const find = repositorios.filter(r => r.name !== repo);
        //agora a lista de repositorios será find, que conterá todos os repositorios antigos menos o que foi passado por parametro
        setRepositorios(find);
        localStorage.setItem('repository', JSON.stringify(find));
    }, [repositorios]);


    return (
        <div className="container">

            <h1>
                <FaGithub color='#0D2636' size={25} />
                Meus Repositórios
            </h1>

            <form className='form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='nomeusuario/nomerepositorio'
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                />
                {buttonLoading === true ? (
                    <button className='submitButton' type='submit'><FaSpinner color='#FFF' size={14} /></button>
                ) : <button className='submitButton' type='submit'><FaPlus className='spinner' color='#FFF' size={14} /></button>}
            </form>

            {repositorios.length === 0 && (
                <div className='span'>
                    <span>Você ainda não salvou nenhum repositório.</span>
                </div>
            )}

            <ul className='lista'>
                {repositorios?.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <button type='button' className='deleteButton' onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14} />
                            </button>
                            <b>Nome do repositório:</b> {repo.name}
                        </span>
                        <Link href=''>
                            <FaBars size={20} color='#0D2636' />
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    )
}