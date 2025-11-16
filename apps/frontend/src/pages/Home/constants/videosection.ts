import { Video } from '../interface';

const video1 = '/videos/vid1.mp4';
const video2 = '/videos/vid2.mp4';
const video3 = '/videos/vid3.mp4';

export const SHOWCASE_VIDEOS: Video[] = [
  {
    id: 'video-1',
    title: 'Elegant Celebrations',
    description: 'Creating unforgettable moments for your special day',
    videoPath: video1,
  },
  {
    id: 'video-2',
    title: 'Luxury Events',
    description: 'Transforming venues into breathtaking spaces',
    videoPath: video2,
  },
  {
    id: 'video-3',
    title: 'Perfect Moments',
    description: 'Every detail crafted to perfection',
    videoPath: video3,
  },
];

export const VIDEO_SECTION_TITLE = 'Experience Our Events';
export const VIDEO_SECTION_DESCRIPTION =
  'At Cofuel Home of Events, we create extraordinary experiences that leave lasting impressions. From intimate gatherings to grand celebrations, our team transforms your vision into reality with meticulous attention to detail, stunning aesthetics, and flawless execution. Let us bring your dream event to life.';
