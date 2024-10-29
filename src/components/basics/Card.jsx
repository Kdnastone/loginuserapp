import PropTypes from 'prop-types'

const Card = ({title, img, information, }) => {
  return (
      <div className="card">
          <img src={img}></img>
          <h4>{title}</h4>
          <a href={information}>Saber más</a>
      </div>
  )
}

Card.propTypes = {
  title : PropTypes.string.isRequired,
  img : PropTypes.string,
  information : PropTypes.string.isRequired,
}

export default Card
