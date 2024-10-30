import PropTypes from 'prop-types'
import './containerCards.css'
import Card from '../basics/Card'

const ContainerCards = ({characters}) => {
    return (
        <div className="container-cards">
            {characters.map((character, index) => (
                <Card key={index}
                title ={character.name}
                img = {character.imageUrl}
                information = {character.sourceUrl} 
                 />
            ))}
        </div>
    )
}
ContainerCards.propTypes = {
    characters : PropTypes.array.isRequired
}

export default ContainerCards
