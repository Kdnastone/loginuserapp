import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Autenticado from "../components/lyouts/Autenticado"
import ApiResults from "../pages/ApiResults"

function Router() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Autenticado />}>       
          <Route path="results" element={<ApiResults />}/>   
          <Route path="home" element={<Home/>}/>       
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default Router