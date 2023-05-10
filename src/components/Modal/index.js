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
                        <span>Nome do repositório <i>{conteudo.name}</i></span>
                    </div>
                </main>
            </div>
        </div>
    )
}