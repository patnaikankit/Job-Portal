import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div>NotFound</div>
    <Link className='btn btn-success' to="/">Go Back</Link>
    </>
  )
}

export default NotFound