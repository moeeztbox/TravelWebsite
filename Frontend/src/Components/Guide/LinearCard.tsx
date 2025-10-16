import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '../../UI/linear-modal';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface CardItem {
  id: number;
  url: string;
  title: string;
  description: string;
  tags: string[];
}

// Different content for each tab
const umrahItems: CardItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Ihram Preparation",
    description: "Begin your spiritual journey by entering the state of Ihram. This involves purification, wearing the prescribed attire, and making the sincere intention for Umrah. The white seamless garments symbolize purity, equality, and unity among pilgrims.",
    tags: ["Purification", "Intention", "Spiritual", "Preparation", "Unity"],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    title: "Tawaf",
    description: "Perform seven circuits around the Holy Kaaba, starting from the Black Stone. This act of worship represents the unity of believers in the worship of the One God. Each circuit is accompanied by specific prayers and supplications.",
    tags: ["Kaaba", "Circuits", "Prayer", "Unity", "Worship"],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1464822759844-dfa37c4d2d3e?w=800&h=600&fit=crop",
    title: "Sa'i",
    description: "Walk seven times between the hills of Safa and Marwah, commemorating Hajar's search for water for her son Ismail. This ritual symbolizes trust in God and the perseverance of faith during difficult times.",
    tags: ["Safa", "Marwah", "Perseverance", "Trust", "Faith"],
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    title: "Halq or Taqsir",
    description: "Complete your Umrah by shaving or trimming the hair. For men, shaving the head is preferred, while women trim a small portion of their hair. This act symbolizes spiritual rebirth and the completion of the Umrah rites.",
    tags: ["Shaving", "Trimming", "Completion", "Rebirth", "Purification"],
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
    title: "Prayer at Maqam Ibrahim",
    description: "After completing Tawaf, pray two rak'ahs behind Maqam Ibrahim if possible. This spot marks where Prophet Ibrahim stood while building the Kaaba and is a place where prayers are especially accepted.",
    tags: ["Prayer", "Ibrahim", "Acceptance", "Blessings", "Thanksgiving"],
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800&h=600&fit=crop",
    title: "Zamzam Water",
    description: "Drink from the blessed Zamzam water, which miraculously sprang forth for Hajar and Ismail. This water is considered sacred and carries numerous blessings for those who drink it with faith and intention.",
    tags: ["Zamzam", "Blessings", "Miracle", "Healing", "Faith"],
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    title: "Supplications",
    description: "Throughout your Umrah, make abundant supplications for yourself, your family, and the entire Muslim Ummah. The times between rituals are especially blessed for having one's prayers answered.",
    tags: ["Dua", "Prayer", "Blessings", "Mercy", "Forgiveness"],
  },
];

const hajjItems: CardItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    title: "Day of Tarwiyah",
    description: "On the 8th of Dhul-Hijjah, pilgrims proceed to Mina after Fajr prayer. They spend the day in prayer and preparation for the standing at Arafat. This day marks the beginning of the Hajj rituals proper.",
    tags: ["Mina", "Preparation", "Prayer", "Dhul-Hijjah", "Beginning"],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1547996160-81dfd9acbc54?w=800&h=600&fit=crop",
    title: "Day of Arafat",
    description: "The 9th of Dhul-Hijjah is the most important day of Hajj. Pilgrims stand in prayer and supplication at Arafat from noon until sunset. This standing is the essence of Hajj and a time of immense forgiveness.",
    tags: ["Arafat", "Forgiveness", "Supplication", "Essence", "Mercy"],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1587132135051-6a34a8a498c8?w=800&h=600&fit=crop",
    title: "Muzdalifah",
    description: "After sunset on the 9th, pilgrims proceed to Muzdalifah where they combine Maghrib and Isha prayers. They collect pebbles for the stoning ritual and spend the night in prayer and reflection under the open sky.",
    tags: ["Muzdalifah", "Pebbles", "Prayer", "Reflection", "Night"],
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    title: "Stoning Jamarat",
    description: "On the 10th of Dhul-Hijjah, pilgrims stone the largest Jamrah (pillar) with seven pebbles. This ritual symbolizes the rejection of evil and temptation, following the example of Prophet Ibrahim.",
    tags: ["Jamarat", "Stoning", "Evil", "Temptation", "Ibrahim"],
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=800&h=600&fit=crop",
    title: "Animal Sacrifice",
    description: "After stoning, pilgrims offer a sacrificial animal or participate in the Hady sacrifice. This commemorates Prophet Ibrahim's willingness to sacrifice his son Ismail and demonstrates obedience to God.",
    tags: ["Sacrifice", "Obedience", "Ibrahim", "Ismail", "Commemoration"],
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Tawaf al-Ifadah",
    description: "Pilgrims return to Makkah to perform Tawaf al-Ifadah, which is an essential pillar of Hajj. This Tawaf symbolizes the completion of the major Hajj rituals and the pilgrim's return to normal state.",
    tags: ["Tawaf", "Completion", "Pillar", "Essential", "Return"],
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    title: "Farewell Tawaf",
    description: "Before leaving Makkah, pilgrims perform the Farewell Tawaf (Tawaf al-Wada). This final circuit around the Kaaba is a bittersweet moment of departure and a prayer for return to the Holy City.",
    tags: ["Farewell", "Departure", "Return", "Prayer", "Final"],
  },
];

const journeyItems: CardItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1464822759844-dfa37c4d2d3e?w=800&h=600&fit=crop",
    title: "Spiritual Preparation",
    description: "Begin your journey with sincere repentance, clearing debts, and seeking knowledge about the rites. The spiritual preparation is as important as the physical journey to the Holy Lands.",
    tags: ["Repentance", "Knowledge", "Sincerity", "Preparation", "Cleansing"],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
    title: "Travel Arrangements",
    description: "Plan your journey with reliable travel agents, ensure proper documentation, and make necessary vaccinations. A well-planned journey allows you to focus on worship without distractions.",
    tags: ["Planning", "Documentation", "Vaccinations", "Travel", "Preparation"],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
    title: "Medina Visit",
    description: "Many pilgrims choose to visit Medina before or after Hajj/Umrah. Visiting the Prophet's Mosque and praying there brings immense blessings and completes the spiritual journey.",
    tags: ["Medina", "Prophet", "Mosque", "Blessings", "Visit"],
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800&h=600&fit=crop",
    title: "Historical Sites",
    description: "Explore significant historical sites including Mount Uhud, Quba Mosque, and Qiblatain Mosque. These sites connect you to Islamic history and the lives of the Prophet and his companions.",
    tags: ["History", "Uhud", "Quba", "Heritage", "Companions"],
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    title: "Cultural Experience",
    description: "Experience the rich cultural heritage of Saudi Arabia and connect with Muslims from around the world. This diversity reflects the universal nature of Islam and its message.",
    tags: ["Culture", "Diversity", "Unity", "Heritage", "Global"],
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    title: "Return Home",
    description: "Return as a newborn, free from sins. Maintain the spiritual high and implement the lessons learned during your journey. Share your experiences and inspire others in their faith.",
    tags: ["Return", "Reborn", "Sins", "Inspiration", "Transformation"],
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1547996160-81dfd9acbc54?w=800&h=600&fit=crop",
    title: "Lifelong Impact",
    description: "The journey of Hajj or Umrah is not just a physical trip but a transformation that lasts a lifetime. It reshapes your perspective, strengthens faith, and creates lasting spiritual memories.",
    tags: ["Transformation", "Impact", "Faith", "Memories", "Lifelong"],
  },
];

const tabContent = {
  umrah: {
    items: umrahItems,
    title: "Umrah Guide",
    description: "Umrah can be performed throughout the year and also forms an integral part of Hajj itself. Find out how to perform Umrah here.",
    subtitle: "Rites of Umrah"
  },
  hajj: {
    items: hajjItems,
    title: "Hajj Guide",
    description: "Hajj is the fifth pillar of Islam and is obligatory once in a lifetime for every Muslim who is physically and financially capable. Learn about the steps of Hajj.",
    subtitle: "Days of Hajj"
  },
  journey: {
    items: journeyItems,
    title: "Spiritual Journey",
    description: "The journey to the Holy Lands is a transformative experience that encompasses preparation, travel, and lifelong spiritual impact. Discover the complete journey.",
    subtitle: "Journey Stages"
  }
};

export default function LinearCard() {
  const [activeTab, setActiveTab] = useState('umrah');
  const currentContent = tabContent[activeTab as keyof typeof tabContent];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='max-w-5xl mx-auto grid grid-cols-3 gap-4 my-20'>
      {/* Centered Navigation Buttons */}
      <div className='col-span-3 flex justify-center gap-4 mb-8'>
        <button
          onClick={() => handleTabClick('umrah')}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === 'umrah'
              ? 'bg-amber-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
          }`}
        >
          Umrah
        </button>
        <button
          onClick={() => handleTabClick('hajj')}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === 'hajj'
              ? 'bg-amber-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
          }`}
        >
          Hajj
        </button>
        <button
          onClick={() => handleTabClick('journey')}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === 'journey'
              ? 'bg-amber-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
          }`}
        >
          Journey
        </button>
      </div>

      <h1 className='col-span-3 text-4xl font-bold text-amber-600 text-center'>{currentContent.title}</h1>
      <p className='col-span-3 text-lg font-normal text-gray-700 text-center'>{currentContent.description}</p>
      
      {/* Row 1: Cards 1 & 2 */}
      <div className='col-span-2'>
        <Card item={currentContent.items[0]} />
      </div>
      <div className='col-span-1'>
        <Card item={currentContent.items[1]} />
      </div>
      
      <h1 className='col-span-3 text-3xl font-bold text-amber-600 text-center'>{currentContent.subtitle}</h1>
      
      {/* Row 2: Cards 3, 4, 5 */}
      <div className='col-span-1'>
        <Card item={currentContent.items[2]} />
      </div>
      <div className='col-span-1'>
        <Card item={currentContent.items[3]} />
      </div>
      <div className='col-span-1'>
        <Card item={currentContent.items[4]} />
      </div>

      {/* Row 3: Cards 6 & 7 */}
      <div className='col-span-1'>
        <Card item={currentContent.items[5]} />
      </div>
      <div className='col-span-2'>
        <Card item={currentContent.items[6]} />
      </div>
    </div>
  );
}

function Card({ item }: { item: CardItem }) {
  return (
    <Dialog
      key={item.id}
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.5,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className='flex w-full flex-col overflow-hidden border dark:bg-neutral-900 bg-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-900 h-full'
      >
        <DialogImage
          src={item.url}
          alt={item.title}
          className='h-52 w-full object-cover'
        />
        <div className='flex flex-grow flex-row items-end justify-between p-3'>
          <div>
            <DialogTitle className='text-zinc-950 text-xl dark:text-zinc-50'>
              {item.title}
            </DialogTitle>
          </div>
          <button className='absolute bottom-2 right-2 p-2 dark:bg-neutral-800 bg-white hover:bg-neutral-50 rounded-lg dark:hover:bg-neutral-900'>
            <Plus className='w-6 h-6' />
          </button>
        </div>
      </DialogTrigger>
      <DialogContainer className='pt-20'>
        <DialogContent
          style={{
            borderRadius: '24px',
          }}
          className='relative flex h-full mx-auto flex-col overflow-y-auto border dark:bg-black bg-white hover:bg-neutral-50 dark:hover:bg-neutral-950 lg:w-[900px] w-[80%]'
        >
          <DialogImage
            src={item.url}
            alt={item.title}
            className='h-full object-contain w-[60%] mx-auto'
          />
          <div className='p-6'>
            <DialogTitle className='text-5xl text-zinc-950 dark:text-zinc-50'>
              {item.title}
            </DialogTitle>

            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: -40 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: -50 },
              }}
            >
              <p className='mt-2 text-zinc-500 dark:text-zinc-500'>
                {item.description}
              </p>
            </DialogDescription>
          </div>
          <DialogClose className='text-zinc-50 dark:bg-neutral-900 bg-neutral-200 p-4 hover:bg-neutral-500 rounded-lg dark:hover:bg-neutral-800' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}