import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"

import ReviewSlider from './../components/common/ReviewSlider';



const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[95%]">
          <ContactDetails />
        </div>

       
      </div>

      <div
      className="pt-5"> <Footer /></div>

      
     
    </div>
  )
}

export default Contact