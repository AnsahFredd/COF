import { ServiceCategory } from '../interface';

import eventPlanning from 'src/assets/images/image24.jpg';
import dowryWrapping from 'src/assets/images/dowry_wrapping.jpg';
import eventStyling from 'src/assets/images/image24.jpg';
import culineryImage from 'src/assets/images/image17.jpg';
import floralBouquet from 'src/assets/images/image25.jpg';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'main-services',
    title: 'Making Your Events An Occasion To Remember',
    services: [
      {
        id: 'event-planning',
        title: 'Event Planning',
        image: eventPlanning,
        description: 'Complete event coordination from concept to execution',
      },
      {
        id: 'dowry-wrapping',
        title: 'Dowry Wrapping',
        image: dowryWrapping,
        description: 'Elegant traditional gift presentation',
      },
      {
        id: 'event-styling',
        title: 'Event Styling',
        image: eventStyling,
        description: 'Bespoke styling and design for your special day',
      },
      {
        id: 'culinery',
        title: 'Culinery',
        image: culineryImage,
        description: 'Exquisite catering and dining experiences',
      },
      {
        id: 'floral-bouquet',
        title: 'Floral Bouquet',
        image: floralBouquet,
        description: 'Stunning floral arrangements and designs',
      },
    ],
  },
];
