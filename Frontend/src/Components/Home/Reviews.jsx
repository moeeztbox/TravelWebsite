import { cn } from '../../lib/utils';
import Marquee from '../../UI/marquee';

// Sample reviews data with Hajj/spiritual theme
const reviews = [
  {
    name: 'Ahmed Hassan',
    username: '@ahmed_hassan',
    body: "The application process was seamless and spiritually uplifting. Truly blessed experience.",
    img: 'https://avatar.vercel.sh/ahmed',
  },
  {
    name: 'Fatima Al-Zahra',
    username: '@fatima_zahra',
    body: "Every step guided with care and wisdom. My heart feels prepared for this sacred journey.",
    img: 'https://avatar.vercel.sh/fatima',
  },
  {
    name: 'Omar Malik',
    username: '@omar_malik',
    body: "The platform made my Hajj preparation effortless. Alhamdulillah for this blessing.",
    img: 'https://avatar.vercel.sh/omar',
  },
  {
    name: 'Aisha Rahman',
    username: '@aisha_rahman',
    body: "From registration to booking - every moment felt sacred and well-organized.",
    img: 'https://avatar.vercel.sh/aisha',
  },
  {
    name: 'Yusuf Ibrahim',
    username: '@yusuf_ibrahim',
    body: "The journey of a lifetime begins here. Peaceful, professional, and spiritually enriching.",
    img: 'https://avatar.vercel.sh/yusuf',
  },
  {
    name: 'Maryam Siddique',
    username: '@maryam_siddique',
    body: "Every detail handled with reverence. My soul feels ready for this blessed pilgrimage.",
    img: 'https://avatar.vercel.sh/maryam',
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        'relative w-80 lg:w-96 cursor-pointer overflow-hidden rounded-lg border p-4 sm:p-5 md:p-6 lg:p-8 mx-2 sm:mx-3 md:mx-4',
        'border-yellow-500/30 bg-gray-900/60 backdrop-blur-sm hover:bg-gray-900/80',
        'hover:border-yellow-400/60 transition-all duration-300 hover:transform hover:scale-[1.02]',
        'shadow-xl hover:shadow-2xl hover:shadow-yellow-400/10'
      )}
    >
      <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="relative">
          <img
            // className="rounded-full border-2 border-yellow-500/40 hover:border-yellow-400/80 transition-all duration-300" 
            width="32"
            height="32"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-500/40 hover:border-yellow-400/80 transition-all duration-300"
            alt=""
            src={img}
          />
          <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm sm:text-base md:text-lg font-semibold text-white">
            {name}
          </figcaption>
          <p className="text-xs sm:text-sm md:text-base font-medium text-yellow-400/80">{username}</p>
        </div>
      </div>
      <blockquote className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed italic mb-3 sm:mb-4">
        "{body}"
      </blockquote>

      {/* Star Rating */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-yellow-400/20 to-transparent transform rotate-45 translate-x-2 -translate-y-2"></div>
      </div>
    </figure>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-black font-sans">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,215,0,0.55) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40" />

      {/* Blueish and Gold Gradient Overlay - Even More Vibrant */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(7deg, 
                      rgba(30, 58, 138, 0.2) 0%, 
                      rgba(59, 130, 246, 0.05) 15%, 
                      rgba(0, 0, 0, 0.02) 50%, 
                      rgba(251, 191, 36, 0.05) 85%, 
                      rgba(245, 158, 11, 0.1) 100%)`
        }}
      />

      {/* Blue and Gold Animated Sparkles */}
      <div className="absolute inset-0 opacity-20">
        {/* Blue sparkles on left side */}
        <div className="absolute top-[18%] left-[14%] w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
        <div className="absolute top-[31%] left-[27%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
        <div className="absolute top-[47%] left-[8%] w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-[64%] left-[23%] w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-[22%] left-[11%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '3s' }}></div>

        {/* Gold sparkles on right side */}
        <div className="absolute top-[26%] right-[19%] w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s', animationDuration: '2.2s' }}></div>
        <div className="absolute top-[43%] right-[31%] w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-[28%] right-[17%] w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1.3s', animationDuration: '2.8s' }}></div>
        <div className="absolute top-[13%] right-[9%] w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1.8s', animationDuration: '4.2s' }}></div>
        <div className="absolute bottom-[15%] right-[24%] w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '2.3s', animationDuration: '3.2s' }}></div>
      </div>

      {/* Header Section */}
      <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-12 px-4 z-10 relative pt-4 sm:pt-0">
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
          <span className="block text-white mb-1 sm:mb-2">Pilgrims'</span>
          <span className="block text-white">Sacred Testimonies</span>
        </h2>

        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent w-6 sm:w-12 md:w-16 lg:w-20"></div>
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-400/60 rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent w-6 sm:w-12 md:w-16 lg:w-20"></div>
        </div>

        <p className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
          Hear from fellow believers who have walked this blessed path before you
        </p>
      </div>

      {/* Marquee Section */}
      <div className="w-full max-w-7xl relative z-10">
        <Marquee pauseOnHover className="[--duration:30s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>

      {/* Maximum Blur Gradient overlays for smooth edges */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-96 z-20">
        <div className="h-full w-full bg-gradient-to-r from-black via-black/80 to-transparent blur-3xl"></div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-96 z-20">
        <div className="h-full w-full bg-gradient-to-l from-black via-black/80 to-transparent blur-3xl"></div>
      </div> */}

      {/* Bottom decorative section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeDemo;