import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
    dateValue: '',
    isStarredSelected: false,
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      dateValue: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const dateString = event.target.value
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd MMMM yyyy, EEEE')
    this.setState({date: formattedDate, dateValue: dateString})
  }

  updateStarredStatus = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      isStarredSelected: !prevState.isStarredSelected,
    }))
  }

  render() {
    const {appointmentsList, title, dateValue, isStarredSelected} = this.state

    let filteredList
    if (isStarredSelected) {
      filteredList = appointmentsList.filter(each => each.isStarred === true)
    } else {
      filteredList = appointmentsList
    }

    const starredButtonClassName = isStarredSelected
      ? 'starred-selected-button'
      : 'starred-button'

    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="responsive-container">
            <form className="form-container" onSubmit={this.onSubmitDetails}>
              <label htmlFor="titleInput" className="input-label">
                Title
              </label>
              <input
                type="text"
                className="title-input"
                id="titleInput"
                value={title}
                placeholder="Title"
                onChange={this.onChangeTitle}
              />
              <label className="input-label" htmlFor="dateInput">
                Date
              </label>
              <input
                type="date"
                value={dateValue}
                id="dateInput"
                className="date-input"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <div className="appointments-item-container">
            <div className="appointments-heading-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={starredButtonClassName}
                type="button"
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>
            <ul className="appointments">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  updateStarredStatus={this.updateStarredStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
