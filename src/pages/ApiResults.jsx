import { useEffect, useState } from "react"

import ContainerCards from "../components/functionals/ContainerCards"

export default function ApiResults() {

    const [characters, setCharacters] = useState([])

    const callApi = async(url) => {
        try{
            const data = await fetch(url)
            const response = await data.json()  
            setCharacters(response.data)         
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        callApi('https://api.disneyapi.dev/character')      
    }, [])

  return (
    <>
        <main>
         <ContainerCards characters={characters}></ContainerCards>
        </main> 
    </>
  )
}