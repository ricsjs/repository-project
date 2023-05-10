import { useState, useCallback, useEffect } from 'react'

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import './principal.css'

import { toast } from 'react-toastify'

import api from '../../services/api'

import { Link } from 'react-router-dom'

import Modal from '../../components/Modal'

export default function Principal() {

    //useState do input
    const [newRepo, setNewRepo] = useState('')
    //array com os repositórios
    const [repositorios, setRepositorios] = useState([])
    //state do botão de carregamento
    const [buttonLoading, setButtonLoading] = useState(false)

    const [showPostModal, setShowPostModal] = useState(false)
    const [detail, setDetail] = useState()

    //Buscar
    useEffect(() => {
        //pegando os repositorios salvos no localStorage
        const repoStorage = localStorage.getItem('repository');
        //se tiver algum item adiciona ao array
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
                
                //adicionando repositorio ao array
                const hasRepo = repositorios.find(repo => repo.name === newRepo);
                //fazendo validação
                if (hasRepo) {
                    toast.error("Repositório já cadastrado!")
                    throw new Error();
                }
    
                //pegando os dados devolvidos no get
                const data = {
                    name: response.data.full_name,
                    login: response.data.owner.login,
                    link: response.data.owner.html_url,
                    descricao: response.data.description
                }
    
    
                toast.success("Repositório adicionado com sucesso");
                // adicionando novo repositório à lista
                setRepositorios([...repositorios, data])
                // salvando a lista atualizada no localStorage
                localStorage.setItem('repository', JSON.stringify([...repositorios, data]));
                // limpando o input
                setNewRepo('')
    
            } catch (error) {
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


    function toggleModal(repo) {
        setShowPostModal(!showPostModal)
        setDetail(repo)
    }
    

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
                        <Link onClick={() => toggleModal(repo)}>
                            <FaBars size={20} color='#0D2636' />
                        </Link>
                    </li>
                ))}
            </ul>

             {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={() => setShowPostModal(!setShowPostModal)}
                />
            )} 

        </div>
    )
}