import './modal.css'
import { FiX } from 'react-icons/fi'


export default function Modal({ conteudo, close }) {
    return (
        <div className='modal'>
            <div className='container'>
                <button onClick={close} className='close'>
                    <FiX size={25} color='#FFF' />
                </button>

                <main>
                    <h2>Detalhes do repositório</h2>
                    <div className='row'>
                        <p><strong>Nome do repositório:</strong> {conteudo.name}</p>
                        <p><strong>Criador:</strong> @{conteudo.login}</p>
                        <p><strong>Descrição:</strong> {conteudo.descricao}</p>
                        <p><strong>Link:</strong> {conteudo.link}</p>
                    </div>
                </main>
            </div>
        </div>
    )
}