import React, { Component } from 'react'
import Tuple from '../Tuple'
import './Table.scss'

function sortColumn(event) {
  const { isPressed, currentSortedElement } = this.state

  if (currentSortedElement === event.target) {
    this.setState(prevState => ({
      personList: prevState.personList.reverse(),
      isPressed: !isPressed,
    }))
    return
  }

  this.setState({
    currentSortedElement: event.target,
    isPressed: true,
  })

  const { field, type } = event.target.dataset
  switch (type) {
    case 'number':
      this.setState(prevState => ({
        personList: prevState.personList.sort(
          (firstPerson, secondPerson) =>
            firstPerson[field] - secondPerson[field]
        ),
      }))
      break
    default:
      this.setState(prevState => ({
        personList: prevState.personList.sort((firstPerson, secondPerson) =>
          firstPerson[field] > secondPerson[field] ? 1 : -1
        ),
      }))
      break
  }
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personList: [],
      isLoading: false,
      currentSortedElement: false,
      isPressed: true,
    }
    this.sortColumn = sortColumn.bind(this)
  }

  componentDidMount() {
    fetch(
      'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    )
      .then(response => {
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          )
          return
        }
        response.json().then(data => {
          this.setState({
            personList: data,
            isLoading: false,
          })
        })
      })
      .catch(err => {
        console.log('Fetch Error :-S', err)
      })
    this.setState({ isLoading: true })
  }

  renderTable() {
    const { personList } = this.state
    return personList.map(item => (
      <Tuple
        key={item.id + item.description}
        id={item.id}
        firstName={item.firstName}
        lastName={item.lastName}
        email={item.email}
        phone={item.phone}
      />
    ))
  }

  render() {
    const { isLoading, isPressed, currentSortedElement } = this.state

    if (isLoading) {
      return (
        <img
          className="preloader"
          src="src\images\preloader.gif"
          alt="загружаю..."
        />
      )
    }
    return (
      <table>
        <thead>
          <tr onClick={this.sortColumn}>
            <th data-field="id" data-type="number">
              ID
              {currentSortedElement &&
              currentSortedElement.dataset.field === 'id' &&
              isPressed ? (
                <span>&#11014;</span>
              ) : (
                <span>&#11015;</span>
              )}
            </th>
            <th data-field="firstName" data-type="string">
              First name
              {currentSortedElement &&
              currentSortedElement.dataset.field === 'firstName' &&
              isPressed ? (
                <span>&#11014;</span>
              ) : (
                <span>&#11015;</span>
              )}
            </th>
            <th data-field="lastName" data-type="string">
              Last name
              {currentSortedElement &&
              currentSortedElement.dataset.field === 'lastName' &&
              isPressed ? (
                <span>&#11014;</span>
              ) : (
                <span>&#11015;</span>
              )}
            </th>
            <th data-field="email" data-type="string">
              Email
              {currentSortedElement &&
              currentSortedElement.dataset.field === 'email' &&
              isPressed ? (
                <span>&#11014;</span>
              ) : (
                <span>&#11015;</span>
              )}
            </th>
            <th data-field="phone" data-type="string">
              Phone
              {currentSortedElement &&
              currentSortedElement.dataset.field === 'phone' &&
              isPressed ? (
                <span>&#11014;</span>
              ) : (
                <span>&#11015;</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>{this.renderTable()}</tbody>
      </table>
    )
  }
}

export default Table
