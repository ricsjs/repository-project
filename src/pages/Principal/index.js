import { FaGithub, FaPlus } from 'react-icons/fa'
import './principal.css'

export default function Principal(){
    return(
        <div className="container">
            
            <h1>
                <FaGithub color='#0D2636' size={25}/>
                Meus Repositórios
            </h1>

            <form className='form' onSubmit={() => {}}>
                <input type='text' placeholder='Adicionar repositório'/>
                <button className='submitButton' type='submit'><FaPlus color='#FFF' size={14}/></button>
            </form>
            
        </div>
    )
}