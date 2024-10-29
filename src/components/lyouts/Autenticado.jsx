import { Outlet } from 'react-router-dom'

import Header from '../functionals/Header'
import Footer from '../functionals/Footer'

export default function autenticado() {
  return (
    <> 
       <Header></Header>   
       <Outlet></Outlet>
       <Footer></Footer>

    </>
  )
}