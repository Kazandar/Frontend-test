import React from 'react'

function Tuple(props) {
  const { id, firstName, lastName, email, phone } = props
  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  )
}

export default Tuple
