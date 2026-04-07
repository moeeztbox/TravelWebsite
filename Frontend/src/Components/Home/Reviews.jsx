import { cn } from '../../lib/utils';
import Marquee from '../../UI/marquee';

const reviews = [
  {
    name: 'Ahmed Hassan',
    username: '@ahmed_hassan',
    body: "The platform made my Hajj preparation effortless. Every step was guided with wisdom and care.",
    img: 'https://avatar.vercel.sh/ahmed',
    tripType: 'Hajj 2023',
    location: 'Karachi, Pakistan',
    rating: 5
  },
  {
    name: 'Fatima Al-Zahra',
    username: '@fatima_zahra',
    body: "From registration to booking - every moment felt sacred and well-organized. Truly blessed experience.",
    img: 'https://avatar.vercel.sh/fatima',
    tripType: 'Umrah December 2024',
    location: 'Lahore, Pakistan',
    rating: 5
  },
  {
    name: 'Omar Malik',
    username: '@omar_malik',
    body: "The application process was seamless and spiritually uplifting. Alhamdulillah for this blessing.",
    img: 'https://avatar.vercel.sh/omar',
    tripType: 'Hajj 2024',
    location: 'Islamabad, Pakistan',
    rating: 5
  },
  {
    name: 'Aisha Rahman',
    username: '@aisha_rahman',
    body: "Every detail handled with reverence. My soul feels ready for this blessed pilgrimage.",
    img: 'https://avatar.vercel.sh/aisha',
    tripType: 'Umrah March 2024',
    location: 'Faisalabad, Pakistan',
    rating: 5
  },
  {
    name: 'Yusuf Ibrahim',
    username: '@yusuf_ibrahim',
    body: "The journey of a lifetime begins here. Peaceful, professional, and spiritually enriching.",
    img: 'https://avatar.vercel.sh/yusuf',
    tripType: 'Family Umrah 2024',
    location: 'Rawalpindi, Pakistan',
    rating: 5
  },
  {
    name: 'Maryam Siddique',
    username: '@maryam_siddique',
    body: "Outstanding service from start to finish. Made my first Hajj experience truly memorable.",
    img: 'https://avatar.vercel.sh/maryam',
    tripType: 'Hajj 2023',
    location: 'Multan, Pakistan',
    rating: 5
  },
  {
    name: 'Hassan Ali',
    username: '@hassan_ali',
    body: "Professional guidance throughout the entire process. Highly recommend for fellow pilgrims.",
    img: 'https://avatar.vercel.sh/hassan',
    tripType: 'Umrah January 2025',
    location: 'Peshawar, Pakistan',
    rating: 5
  },
  {
    name: 'Khadija Ahmed',
    username: '@khadija_ahmed',
    body: "The budget package exceeded my expectations. Quality service at an affordable price.",
    img: 'https://avatar.vercel.sh/khadija',
    tripType: 'Budget Umrah 2024',
    location: 'Quetta, Pakistan',
    rating: 4
  }
];

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-gray-50 font-sans">
      <div className="text-center space-y-4 mb-12 px-4 z-10 relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">       
          Traveller <span className="text-amber-500">Reviews</span>
        </h2>   

        <div className="flex items-center justify-center gap-3">             
          <div className="h-px bg-amber-500 w-16"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="h-px bg-amber-500 w-16"></div>
        </div>

        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Voices of Traveller's who choose a superior Umrah Experience
        </p>
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <Marquee pauseOnHover className="[--duration:30s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

const ReviewCard = ({ img, name, username, body, tripType, location, rating }) => {
  return (
    <figure
      className={cn(
        'relative w-80 lg:w-96 cursor-pointer overflow-hidden rounded-xl border p-6 mx-3',
        'border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300'
      )}
    >
      <div className="flex flex-row items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <img
            width="48"
            height="48"
            className="w-12 h-12 rounded-full"
            alt={`${name} profile`}
            src={img}
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full shadow flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <figcaption className="text-lg font-semibold text-gray-900 truncate">
            {name}
          </figcaption>
          <p className="text-sm text-gray-500 truncate">{username}</p>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block w-fit">
              {tripType}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>

      <blockquote className="text-sm text-gray-700 leading-relaxed mb-4">
        "{body}"
      </blockquote>

      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-amber-500' : 'text-gray-300'} fill-current`} 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </figure>
  );
};

export default MarqueeDemo;