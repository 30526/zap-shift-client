import React from 'react'
import support1 from '../../../assets/live-tracking.png'
import support2 from '../../../assets/safe-delivery.png'

export const SupportSection = () => {
    const supportInfo =[{
        id: 1,
        title: 'Live Parcel Tracking',
        description: 'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipments journey and get instant status updates for complete peace of mind.',
        image: support1,

    }, {
        id: 2,
        title: '100% Safe Delivery',
        description: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
        image: support2,
    },
{
        id: 3,
        title: '24/7 Customer Support',
        description: 'Our dedicated customer support team is available around the clock to assist you with any inquiries or issues. We are committed to providing exceptional service and ensuring your satisfaction at every step.',
        image: support2,
    }]
  return (
    <div className='my-20'>
        <div className='border border-dashed border-secondary my-20'></div>
        <div className='grid grid-cols-1 gap-5'>
            {supportInfo.map((item) => (
                <div  key={item.id} className='group bg-[#f5f5f5]  rounded-lg overflow-hidden'>
                <div  className='flex  flex-col md:flex-row items-center gap-5 p-8'>
                    <img src={item.image} alt={item.title} className='w-36 object-contain mb-4' />
                    <div className='border border-dashed border-secondary md:h-32 w-60 md:w-0'></div>
                    <div className=''>
                        <h3 className='text-secondary text-xl font-bold mb-2'>{item.title}</h3>
                        <p className='text-accent'>{item.description}</p>
                    </div>
                </div>
                    <div className='bg-secondary h-2 w-0 group-hover:w-full transition-all duration-300'></div>
                </div>
            ))}
        </div>
                <div className='border border-dashed border-secondary my-20'></div>

    </div>
  )
}
