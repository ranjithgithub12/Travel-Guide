import './index.css'

const ListTravelGuide = props => {
  const {eachGuide} = props
  const {id, name, imageUrl, description} = eachGuide

  return (
    <li className="list-of-guide">
      <img src={imageUrl} alt={name} className="image" />
      <div className="content-container">
        <h1 className="name-heading">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default ListTravelGuide
