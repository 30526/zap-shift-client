import React from 'react'
import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click the \"Sign Up\" button in the top right corner and follow the registration process. It only takes a minute!"
  },
  {
    question: "How does Posture Pro help improve my posture?",
    answer: "Posture Pro uses guided exercises, real-time feedback, and personalized routines to help you build muscle memory for proper alignment over time."
  },
  {
    question: "Is Posture Pro suitable for beginners?",
    answer: "Absolutely! Posture Pro is designed for all fitness levels. Our beginner-friendly programs ease you in gradually with simple, effective movements."
  },
  {
    question: "How long does it take to see results?",
    answer: "Most users notice improvements in posture and reduced discomfort within 2–4 weeks of consistent daily practice, though results vary by individual."
  },
  {
    question: "Can I use Posture Pro on multiple devices?",
    answer: "Yes! Your account syncs seamlessly across all your devices — phone, tablet, and desktop — so you can train anywhere, anytime."
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='my-20'>
      <h3 className='text-4xl text-secondary font-bold text-center mb-4'>
        Frequently Asked Question (FAQ)
      </h3>
      <p className='text-accent text-center mb-8'>
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!
      </p>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`collapse collapse-arrow border border-secondary/20 transition-colors duration-300 ${
              openIndex === index ? 'bg-secondary/10' : 'bg-base-100'
            }`}
          >
            <input
              type="checkbox"
              checked={openIndex === index}
              onChange={() => toggle(index)}
            />
            <div className="collapse-title font-semibold text-secondary">
              {faq.question}
            </div>
            <div className="collapse-content text-sm text-black">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      <div className='text-center mt-10'>
        <button className='btn bg-primary shadow-none border-none text-secondary rounded-xl font-bold'>
            See More FAQs
        </button>
        <button className="btn bg-black rounded-full px-2.5 animate-bounce hover:animate-none">
        <FiArrowUpRight size={20} className="text-primary" />
      </button>
      </div>
    </div>
  )
}

export default FAQ