import React from 'react'

const Address = ({ street, unit, city, zip, notes }) => {
  notes = notes && `(${notes})`
  street = unit ? street : `${street},`
  unit = unit && `${unit},`
  return (
    <span>{street} {unit} {city} {zip} {notes}</span>
  )
}

export default Address
