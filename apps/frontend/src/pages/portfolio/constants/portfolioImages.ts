// src/pages/Portfolio/constants/portfolioImages.ts
import image1 from 'src/assets/images/image1.jpg';
import image2 from 'src/assets/images/image2.jpg';
import image3 from 'src/assets/images/image3.jpg';
import image4 from 'src/assets/images/image4.jpg';
import image5 from 'src/assets/images/image5.jpg';
import image6 from 'src/assets/images/image6.jpg';
import image7 from 'src/assets/images/image7.jpg';
import image8 from 'src/assets/images/image8.jpg';
import image9 from 'src/assets/images/image9.jpg';
import image10 from 'src/assets/images/image10.jpg';
import image11 from 'src/assets/images/image11.jpg';
import image12 from 'src/assets/images/image12.jpg';
import image13 from 'src/assets/images/image13.jpg';
import image14 from 'src/assets/images/image14.jpg';
import image15 from 'src/assets/images/white-purple-balloons.png';
import image16 from 'src/assets/images/image16.jpg';
import image17 from 'src/assets/images/image17.jpg';
import image19 from 'src/assets/images/image19.jpg';
import image21 from 'src/assets/images/image21.jpg';

export const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image19,
  image21,
];

export const slides = images.map((src, index) => ({
  src,
  alt: `Portfolio ${index + 1}`,
}));

export const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};
