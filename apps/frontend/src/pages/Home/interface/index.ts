export interface Service {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle?: string;
  services: Service[];
}

// Vides section props
export interface Video {
  id: string;
  title: string;
  description?: string;
  videoPath: string;
  thumbnail?: string;
}
