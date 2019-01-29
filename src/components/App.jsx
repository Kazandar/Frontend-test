import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import Table from './Table'
import ShowControl from './ShowControl'
import Search from './Search'
import PersonCard from './PersonCard'
import Logo from './Logo'

class App extends Component {
  state = {
    amount: 'smallData',
    request: null,
    info: null,
    pageCount: 1,
    selected: 0,
  }

  handlePageClick = selectedPage => {
    this.setState({ selected: selectedPage.selected })
  }

  getPersonalInfo = info => {
    this.setState({ info })
  }

  setPageCount = pageCount => {
    this.setState({ pageCount })
  }

  updatePersonData = amount => {
    this.setState({
      amount: amount.dataset.type,
      selected: 0,
    })
  }

  getSearchRequest = searchRequest => {
    const request = searchRequest.trim().toLowerCase()

    this.setState({ request })
  }

  render() {
    const { amount, request, info, pageCount, selected } = this.state
    return (
      <div className="app">
        <div className="header bg-dark text-white">
          <ShowControl updatePersonData={this.updatePersonData} />
          <Logo />
          <Search getSearchRequest={this.getSearchRequest} />
        </div>
        <Table
          setPageCount={this.setPageCount}
          selected={selected}
          amount={amount}
          request={request}
          getPersonalInfo={this.getPersonalInfo}
        />
        <PersonCard info={info} amount={amount} />
        {pageCount > 1 ? (
          <ReactPaginate
            breakLinkClassName="break"
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={this.handlePageClick}
            marginPagesDisplayed={1}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            disabledClassName="disable"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
          />
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default App
