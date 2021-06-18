import {
  FaCocktail,
  FaBeer,
  FaHiking,
  FaShuttleVan,
  FaUmbrellaBeach,
} from 'react-icons/fa'
import { GiCampfire, GiBeachBucket, GiCampingTent } from 'react-icons/gi'

const ServicesData = [
  {
    id: 1,
    icon1: <FaCocktail />,
    icon2: <FaBeer />,
    title: 'Halal Drinks',
    info: 'We provide a wide and various list of Halal drinks which makes your vacation much happier',
  },
  {
    id: 2,
    icon1: <FaHiking />,
    icon2: <FaShuttleVan />,
    title: 'Outdoor Trips',
    info: 'Very good planned trips for families and youth with all Halal rules either on foot or by vans',
  },
  {
    id: 3,
    icon1: <FaUmbrellaBeach />,
    icon2: <GiBeachBucket />,
    title: 'Private Beaches',
    info: 'Very clean, safe and private beaches which any one can enjoy with, all by Halal rules',
  },
  {
    id: 4,
    icon1: <GiCampfire />,
    icon2: <GiCampingTent />,
    title: 'Camping In Nature',
    info: 'Most funiest camping trips in some of the most beautiful natural views in world',
  },
]

export default ServicesData
