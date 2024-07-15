import React from 'react'
import Header from '../components/Header'
import Recommendfood from '../components/Recommendfood'
import Service from '../components/Service'
import NewFood from '../components/NewFood'

export const Home = () => {
  return (
    <div>
        <Header/>
        <Recommendfood/>
        {/* <Service/> */}
        <NewFood/>
    </div>
  )
}
