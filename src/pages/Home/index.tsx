import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../components/Heading'
import Button from '../../components/ui/button'

const Home = () => {
  return (
    <>
      <Heading title={"Hello Trainer!"} />
      <div>
        <ul>
          <li>
            <Link to="/login" replace={true}>Login</Link>
          </li>
          <li>
            <Link to="/register" replace={true}>Register</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Home
