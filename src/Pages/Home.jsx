import React from "react"
import Hero from "../Components/Hero"
import LatestCollection from "../Components/LatestCollection"
import BestSeller from "../Components/BestSeller"
import HomeFooter from "../Components/HomeFooter"

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <HomeFooter />
    </div>
  )
}

export default Home
