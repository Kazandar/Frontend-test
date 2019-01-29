import React from 'react'

function TableHeader(props) {
  const { handleSortColumn, currentSortedElement, isPressed } = props

  return (
    <thead>
      <tr onClick={handleSortColumn}>
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
  )
}

export default TableHeader
