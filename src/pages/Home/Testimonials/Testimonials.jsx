import { useState, useEffect } from "react";
import customerTop from '../../../assets/customer-top.png'

const testimonials = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Awlad",
    text: "Working with this team has been an absolute game-changer for our product. Their attention to detail and design sensibility elevated every single screen. I couldn't be more impressed.",
  },
  {
    name: "Sarah Mitchell",
    role: "Frontend Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    text: "The component library they delivered was clean, scalable, and a joy to work with. It saved our team weeks of effort and set a new standard for our codebase quality.",
  },
  {
    name: "James Okafor",
    role: "UX Researcher",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    text: "Rarely do you find a team that listens as carefully as they build. Every feedback session translated directly into meaningful improvements. Truly collaborative and professional.",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    text: "From kickoff to delivery, the process was seamless. They brought ideas we hadn't even considered and executed them flawlessly. Our users noticed the difference immediately.",
  },
  {
    name: "Lucas Fernandez",
    role: "Startup Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    text: "As a founder, I need partners who move fast without cutting corners. This team delivered both — beautiful work, on time, with zero drama. I'd recommend them without hesitation.",
  },
];

const QuoteIcon = () => (
  <svg
    width="48"
    height="36"
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-4 opacity-20"
  >
    <path
      d="M0 36V22.5C0 15.9 2.1 10.5 6.3 6.3C10.5 2.1 16.2 0 23.4 0v6.3c-4.2 0-7.5 1.35-9.9 4.05C11.1 13.05 9.9 16.5 9.9 20.7H18V36H0ZM30 36V22.5c0-6.6 2.1-12 6.3-16.2C40.5 2.1 46.2 0 53.4 0v6.3c-4.2 0-7.5 1.35-9.9 4.05-2.4 2.7-3.6 6.15-3.6 10.35H48V36H30Z"
      fill="#03373d"
    />
  </svg>
);

const TestimonialCard = ({ testimonial, position, onClick }) => {
  const isCenter = position === "center";
  const isLeft = position === "left";
  const isRight = position === "right";

  return (
    <>
    <div
      onClick={!isCenter ? onClick : undefined}
      className={`
        absolute top-1/2 transition-all duration-500 ease-in-out
        w-[380px] max-w-[90vw]
        ${isCenter
          ? "z-20 -translate-y-1/2 scale-100 opacity-100 left-1/2 -translate-x-1/2 cursor-default"
          : isLeft
          ? "z-10 -translate-y-1/2 scale-90 opacity-25 blur-[1px] left-[2%] cursor-pointer hover:opacity-35"
          : "z-10 -translate-y-1/2 scale-90 opacity-25 blur-[1px] right-[2%] cursor-pointer hover:opacity-35"
        }
      `}
    >
      <div
        className={`
          rounded-3xl p-8 flex flex-col gap-4
          ${isCenter
            ? "bg-white shadow-2xl shadow-indigo-100/60 border border-secondary/20"
            : "bg-white/80 shadow-lg border border-gray-100"
          }
        `}
      >
        {/* Quote Icon */}
        <QuoteIcon />

        {/* Testimonial Text */}
        <p
          className={`text-accent text-[15px] leading-relaxed text-center font-light ${
            !isCenter ? "line-clamp-3" : ""
          }`}
          style={{ fontFamily: "'Lora', serif" }}
        >
          {testimonial.text}
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 my-1" />

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full  border-2 border-secondary/40 object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white" />
          </div>
          <div>
            <p
              className="font-bold text-secondary text-sm tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {testimonial.name}
            </p>
            <p
              className="text-xs text-black font-medium mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setActive((index + testimonials.length) % testimonials.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const leftIndex = (active - 1 + testimonials.length) % testimonials.length;
  const rightIndex = (active + 1) % testimonials.length;

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-slide { animation: fadeSlideIn 0.5s ease-out both; }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center  px-4 py-16"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="text-center mb-16 fade-slide">
          <div>
         <div className='text-center flex flex-col gap-4 items-center'>
        <img src={customerTop} className='w-66' alt="Customer Testimonial" />
        <h3 className='text-4xl text-secondary font-bold'>What our customers are saying</h3>
        <p className='text-accent'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper <br /> alignment, reduce pain, and strengthen your body with ease!</p>
        </div>
    </div>
        </div>

        {/* Slider */}
        <div className="relative w-full max-w-4xl h-[340px]">
          {/* Background decorative blob */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 bg-secondary/40 rounded-full blur-3xl" />
          </div>

          {/* Side cards */}
          <TestimonialCard
            testimonial={testimonials[leftIndex]}
            position="left"
            onClick={prev}
          />
          <TestimonialCard
            testimonial={testimonials[rightIndex]}
            position="right"
            onClick={next}
          />

          {/* Center card */}
          <TestimonialCard
            testimonial={testimonials[active]}
            position="center"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5 mt-14">
          {/* Prev button */}
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-secondary border border-gray-200 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:scale-110 hover:shadow-md transition-all duration-200 active:scale-95 hover:text-secondary"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? "w-6 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-secondary hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-primary shadow-md flex items-center justify-center text-secondary hover:bg-secondary hover:scale-110 hover:shadow-lg transition-all duration-200 active:scale-95 hover:text-primary"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <p className="mt-6 text-xs text-gray-400 tracking-widest font-medium">
          {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </p>
      </div>
    </>
  );
}