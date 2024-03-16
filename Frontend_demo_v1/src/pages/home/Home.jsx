import React from 'react'
import Banner from './Banner'
import Category from './Category'
import Products from './Products'
import SlideProducts from './SlideProducts'
import Newletters from './Newletters'

const Home = () => {
  return (
    <>
      <Banner/>
      <Category/>
      <Products/>
      <SlideProducts title={"Recently"} decription={"A curated collection of products that our valued customers have recently viewed or purchased. At BookStore, we believe in delivering a personalized shopping experience tailored just for you."}/>
      <Newletters/>
    </>
  )
}

export default Home