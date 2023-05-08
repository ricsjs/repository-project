import { Route, Routes } from 'react-router-dom'
import Repositorio from './pages/Repositorio'
import Principal from './pages/Principal'

export default function RoutesApp(){
    return(
        <Routes>

            <Route path='/' element={ <Principal /> } />
            <Route path='/repositorio/:repositorio' element={ <Repositorio /> }/>
        </Routes>
    )
}