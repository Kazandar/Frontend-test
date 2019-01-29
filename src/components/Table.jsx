import React, { Component } from 'react'
import Tuple from './Tuple'
import TableHeader from './TableHeader'

const maxTuplesOnPage = 50
let activeString

class Table extends Component {
  state = {
    personList: [],
    isLoading: false,
    currentSortedElement: false,
    isPressed: true,
  }

  componentDidMount() {
    const url =
      'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    this.getPersonData(url)
  }

  componentDidUpdate(prevProps) {
    const { amount, request } = this.props

    if (prevProps.amount !== amount) {
      const url =
        amount === 'smallData'
          ? 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
          : 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
      this.getPersonData(url)
    }

    if (prevProps.request !== request) {
      this.filterBySearch(request)
    }
  }

  handleSortColumn = event => {
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

    const { field, type } = event.target.dataset.type
      ? event.target.dataset
      : event.target.parentElement.dataset

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

  handlePersonInfo = event => {
    if (event.target.tagName !== 'TD') return

    if (typeof activeString !== 'undefined') {
      activeString.classList.remove('active-string')
    }
    activeString = event.target.parentElement
    activeString.classList.add('active-string')

    const { personList } = this.state
    const { getPersonalInfo } = this.props
    const tuple = event.target.parentElement.children
    const result = []
    personList.forEach(person => {
      if (
        String(person.id) === tuple[0].innerHTML &&
        person.phone === tuple[4].innerHTML
      ) {
        result.push(person)
      }
    })
    getPersonalInfo(result)
  }

  filterBySearch = req => {
    const { initPersonList } = this.state

    if (req === '') {
      this.setState(
        {
          personList: initPersonList,
        },
        this.calculatePageCount
      )
      return
    }

    const searchResult = initPersonList.filter(
      person =>
        String(person.id).includes(req) ||
        person.firstName.toLowerCase().includes(req) ||
        person.lastName.toLowerCase().includes(req) ||
        person.email.toLowerCase().includes(req) ||
        person.phone.toLowerCase().includes(req)
    )

    this.setState(
      {
        personList: searchResult,
      },
      this.calculatePageCount
    )
  }

  calculatePageCount = () => {
    const { personList } = this.state
    const { setPageCount } = this.props
    const pageCount = Math.ceil(personList.length / maxTuplesOnPage)
    setPageCount(pageCount)
  }

  getPersonData = url => {
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.error(
            `Looks like there was a problem. Status Code: ${response.status}`
          )
          return
        }
        response.json().then(data => {
          this.setState({
            personList: data,
            initPersonList: data,
            isLoading: false,
          })
          this.calculatePageCount()
        })
      })
      .catch(err => {
        console.error('Fetch Error :-S', err)
      })
    this.setState({ isLoading: true })
  }

  renderTable() {
    const { personList } = this.state
    const { selected } = this.props

    if (personList.length === 0)
      return <div className="empty">Записей не обнаружено</div>

    const startIndex = selected === 0 ? 0 : selected * maxTuplesOnPage
    const endIndex = startIndex + maxTuplesOnPage

    const table = []
    for (let i = startIndex; i <= endIndex && personList[i]; i++) {
      table.push(
        <Tuple
          key={personList[i].id + personList[i].description}
          id={personList[i].id}
          firstName={personList[i].firstName}
          lastName={personList[i].lastName}
          email={personList[i].email}
          phone={personList[i].phone}
        />
      )
    }
    return table
  }

  render() {
    const {
      isLoading,
      isPressed,
      currentSortedElement,
      personList,
    } = this.state

    if (isLoading) {
      return (
        <div className="preloader-container">
          <img
            className="preloader"
            src="src\images\oct_loader_product_OLD.gif"
            alt="загружаю..."
          />
        </div>
      )
    }

    return personList.length ? (
      <table
        className="table bg-light text-dark"
        onClick={this.handlePersonInfo}
      >
        <TableHeader
          handleSortColumn={this.handleSortColumn}
          currentSortedElement={currentSortedElement}
          isPressed={isPressed}
        />
        <tbody>{this.renderTable()}</tbody>
      </table>
    ) : (
      <div className="empty">Записей не обнаружено</div>
    )
  }
}

export default Table
