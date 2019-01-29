import React, { Component } from 'react'

let activeButton

function ShowControl(props) {
  function handlePersonData(event) {
    if (event.target.tagName !== 'BUTTON') return

    const { updatePersonData } = props

    if (typeof activeButton === 'undefined') {
      activeButton = document.querySelector('.controlls-container')
        .firstElementChild
    }

    activeButton.removeAttribute('disabled')
    activeButton = event.target
    activeButton.setAttribute('disabled', true)
    updatePersonData(event.target)
  }

  return (
    <div onClick={handlePersonData} className="controlls-container">
      <button
        type="button"
        data-type="smallData"
        className="btn btn-light"
        disabled
      >
        Show small info
      </button>
      <button type="button" data-type="bigData" className="btn btn-light">
        Show large info
      </button>
    </div>
  )
}

export default ShowControl
