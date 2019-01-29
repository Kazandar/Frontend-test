import React from 'react'

function PersonCard(props) {
  const { info } = props
  if (!info) return <div />
  const { firstName, description, address } = info[0]
  const { streetAddress, city, state, zip } = address

  return (
    <div className="card person-card text-white bg-dark">
      <h2 className="card-title">
        <b>Selected User</b> {firstName}
      </h2>
      <p className="description">{description}</p>
      <h3 className="card-title">
        <b>Address</b>
      </h3>
      <div className="address">
        <span>
          <b>Street:</b> {streetAddress}
        </span>
        <span>
          <b>City:</b> {city}
        </span>
        <span>
          <b>State:</b> {state}
        </span>
        <span>
          <b>Zip:</b> {zip}
        </span>
      </div>
    </div>
  )
}

export default PersonCard
