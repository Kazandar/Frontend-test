import React from 'react'

function Search(props) {
  function handleSearchRequest(event) {
    event.preventDefault()
    props.getSearchRequest(event.target.firstElementChild.value)
  }
  return (
    <form
      onSubmit={handleSearchRequest}
      className="search-form form-inline my-2 my-lg-0"
    >
      <input type="search" className="search-input form-control mr-sm-2" />
      <input
        type="submit"
        value=" Search"
        className="search-btn btn btn-outline-success my-2 my-sm-0"
      />
    </form>
  )
}

export default Search
