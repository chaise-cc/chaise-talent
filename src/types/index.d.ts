interface talentServiceReview {
  service: string;
  rating: number;
  review: string;
}

type TalentService = {
  talent: string;
  service: Service;
};

export type BasicUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  accounts: {
    type: string;
    isOnboarded: boolean;
  }[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  dateOfBirth?: string;
  phone?: string;
  preferredLanguage?: string;
  country?: string;
  accounts: {
    type: string;
    isOnboarded: boolean;
  }[];
  avatar: string;
  identityIsVerified: boolean;
  emailIsVerified: boolean;
  phoneIsVerified: boolean;
};

interface talentReview {
  talent: string;
  reviews: talentServiceReview[];
}

export type ServiceCategory = {
  id: string;
  slug: string;
  name: string;
  cover_image: string;
  subCategories: SubServiceCategories[];
};

export type SubServiceCategories = {
  id: "";
  name: string;
  slug: string;
  cover_image: string;
};

// Define the props interface
interface BlogCardProps {
  imageSrc: string;
  imageAlt: string;
  tag: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  fullWidth?: boolean;
}

type Review = {
  serviceId: string;
  userId: string;
  rating: string;
  review: string;
  dateCreated?: string;
};

type Talent = User & {
  userId: string;
  talentId: string;
  coverImage: string;
  bio: string[];
  name: string;
  isPro: boolean;
  isTopRated: boolean;
  favourites: string[];
  level: number;
  services: string[];
  reviews: Review[];
  socials: Social[];
  topSkills?: sting[];
};

type Location = {
  address?: string;
  city?: string;
  state: string;
  country: string;
};

type User = {
  name: string;
  id: string;
  email: string;
  about: string;
  gender?: string;
  location: Location;
  accounts: string[];
  avatar: string;
  dateCreated?: string;
  isClient: boolean;
  isTalent: boolean;
  language: string;
};

type Client = User & {};

type Service = {
  title: string;
  description: string;
  slug: string;
  category: string;
  niche: string;
  tags: string[];
  price: number;
  createdAt: number;
  thumbImg: string;
  images: string[];
  talentId: string;
};

type ServiceWithTalent = Omit<Service, "talentId"> & {
  talent: Talent;
};

export interface RegisterUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  password: string;
  username: string;
  about: string;
  gender: string;
  location: string;
  avartarUrl: string;
  isClient: boolean;
  isTalent: boolean;
  accountType: string;
}

export interface LoginDataInterface {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface VerifyEmailInterface {
  otp: string;
  userId: string;
}

export interface ResendOTPInterface {
  userId: string;
}

export interface ForgotPasswordInterface {
  email: string;
}

export interface ConfirmPasswordResetInterface {
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface ApiError {
  response: {
    message: string | string[];
    error: string;
    statusCode: number;
  };
  name: string;
}

export interface TokenResponseInterface {
  data: {
    token: string;
  };
}

type SocialPlatform =
  | "Twitter"
  | "X"
  | "LinkedIn"
  | "Instagram"
  | "Facebook"
  | "YouTube"
  | "TikTok"
  | "GitHub"
  | "Dribbble"
  | "Behance";

type Social = {
  platform: string; // e.g., "twitter", "linkedin", "github", etc.
  handle: string; // e.g., "mrpaulishaili"
};
