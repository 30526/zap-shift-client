import React from 'react'
import MarqueeModule from 'react-fast-marquee'
import brand1 from '../../../assets/brands/amazon.png'
import brand2 from '../../../assets/brands/casio.png'
import brand3 from '../../../assets/brands/randstad.png'
import brand4 from '../../../assets/brands/moonstar.png'
import brand5 from '../../../assets/brands/star.png'

const Marquee = MarqueeModule.default

export const BrandMarquee = () => {
  return (
    <div className='my-20'>
        <h3 className='text-center text-secondary font-bold text-3xl'>We've helped thousands of sales teams</h3>
      <Marquee speed={100} className='my-20'>
        <div className='flex gap-4 md:gap-30 justify-items-center items-center'>
        <img src={brand2} alt="Brand 2" />
        <img src={brand1} alt="Brand 1" />
        <img src={brand4} alt="Brand 4" />
        <img src={brand5} alt="Brand 5" />
        <img src={brand3} alt="Brand 3" />
        </div>
      </Marquee>
    </div>
  )
}
