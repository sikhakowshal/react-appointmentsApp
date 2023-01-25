import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updateStarredStatus} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStarImg = () => {
    updateStarredStatus(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={onClickStarImg}
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
