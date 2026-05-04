import React from 'react'
import MarqueeModule from 'react-fast-marquee'
import brand1 from '../../../assets/brands/amazon.png'
import brand2 from '../../../assets/brands/casio.png'
import brand3 from '../../../assets/brands/randstad.png'
import brand4 from '../../../assets/brands/moonstar.png'
import brand5 from '../../../assets/brands/star.png'

const Marquee = MarqueeModule.default

export const BrandMarquee = () => {
    console.log('Marquee:', Marquee)
  return (
    <div className='my-20'>
        <h3 className='text-center text-secondary font-bold text-3xl'>We've helped thousands of sales teams</h3>
      <Marquee speed={100} autofill={true} className='my-10'>
        <div className='flex gap-30 justify-items-center items-center'>
            <img src={brand1} alt="Brand 1" />
        <img src={brand2} alt="Brand 2" />
        <img src={brand3} alt="Brand 3" />
        <img src={brand4} alt="Brand 4" />
        <img src={brand5} alt="Brand 5" />
        </div>
      </Marquee>
    </div>
  )
}
