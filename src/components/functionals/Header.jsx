import { Link } from 'react-router-dom'
import imagen from '../../assets/disney.png'

export default function header() {
  return (
    <header>
      <figure>
        <img src={imagen}></img>
      </figure>
      <nav>
        <Link to="home">Principal</Link>
        <Link to="results">Personajes</Link>
      </nav>
    </header>
  )
}
