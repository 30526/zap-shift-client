import React from 'react'
import merchant from '../../../assets/location-merchant.png'
import merchantBG from '../../../assets/be-a-merchant-bg.png'

const WhyChooseUs = () => {
  return (
    <div className='my-20 bg-secondary px-12 py-8 relative rounded-4xl flex items-center justify-between overflow-hidden'>
        <img src={merchantBG} className='absolute top-0' alt="Be a Merchant Background" />
<div className='flex flex-col gap-6 flex-1'>
    <h3 className='text-white text-3xl md:text-4xl font-bold'>Merchant and Customer Satisfaction<br className='hidden md:block'></br> is Our First Priority</h3>
<p className='text-white text-xs font-light'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
<div className='flex flex-col md:flex-row gap-4'>
<button className='btn bg-primary shadow-none border-none rounded-full text-secondary '>
    Become a Merchant
</button>
<button className='btn btn-primary'>
    Earn with ZapShift Courier
</button>
</div>
</div>
<div className='hidden md:block'>
<img src={merchant} className='w-full h-full' alt="Location Merchant Icon" />
</div>
 </div>
  )
}

export default WhyChooseUs