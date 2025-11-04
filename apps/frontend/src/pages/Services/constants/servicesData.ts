import catering_buffet from 'src/assets/images/brand/logo.jpg';
import room_with_flowers from 'src/assets/images/brand/logo.jpg';
import ballons from 'src/assets/images/brand/logo.jpg';
import dowry_wrapping from 'src/assets/images/brand/logo.jpg';
import image_2 from 'src/assets/images/brand/logo.jpg';
import image_3 from 'src/assets/images/brand/logo.jpg';
import image_4 from 'src/assets/images/brand/logo.jpg';
import image_11 from 'src/assets/images/brand/logo.jpg';
import image_12 from 'src/assets/images/brand/logo.jpg';
import image_13 from 'src/assets/images/brand/logo.jpg';
import image15 from 'src/assets/images/brand/logo.jpg';

const servicesData = [
  {
    title: 'Dowry Wrapping',
    slug: 'dowry-wrapping',
    mainimage: dowry_wrapping,
    description: [
      'We specialize in elegant and culturally appropriate dowry presentations. Our unique wrapping styles blend tradition with artistry, creating beautiful, meaningful displays for engagement and marriage ceremonies.',
    ],
    images: [image15, image_2, image_3],
  },

  {
    title: 'Event Planning & Coordination',
    slug: 'event_planning',
    mainimage: ballons,
    description: [
      'We provide expert event planning and seamless coordination tailored to your vision. From concept to execution, we manage timelines, vendors, and logistics, ensuring stress-free and memorable experiences. Your event is flawlessly organized.',
    ],
    images: [room_with_flowers, image_12, image_13],
  },
  {
    title: 'Event Styling & Decoration',
    slug: 'event-styling',
    mainimage: room_with_flowers,
    description: [
      "Transforming spaces with creativity and elegance, we offer bespoke décor and styling that matches your theme. Whether it's chic, traditional, or modern, our designs set the perfect atmosphere for any celebration.",
    ],
    images: [image_11, ballons, catering_buffet],
  },
  {
    title: 'Make-up',
    slug: 'make-up',
    mainimage: room_with_flowers,
    description: [
      'Enhance your natural beauty with our professional makeup services for weddings, parties, and photoshoots. We use quality products and techniques to give you a flawless, lasting glow.',
    ],
    images: [image_4, ballons, catering_buffet],
  },
  {
    title: 'Floral Bouquet & Millinery Works',
    slug: 'floral-design',
    mainimage: room_with_flowers,
    description: [
      'From stunning bridal bouquets to stylish fascinators and headpieces, we craft floral and millinery designs that elevate your look. Our custom pieces bring elegance and freshness to every occasion.',
    ],
    images: [image_4, ballons, catering_buffet],
  },

  {
    title: 'Catering & Culinary',
    slug: 'catering',
    mainimage: room_with_flowers,
    description: [
      'Delight your guests with our mouth-watering dishes, crafted with love and quality ingredients. We offer catering services for all event types, with menus tailored to your taste and budget.',
    ],
    images: [image_4, ballons, catering_buffet],
  },
];

export default servicesData;
