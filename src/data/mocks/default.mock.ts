import { RiTwitterXFill } from "react-icons/ri";
import {
  FaBehance,
  FaFigma,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

export const AVATAR_MALE = "/images/users/default_male.webp";
export const AVATAR_FEMALE = "/images/users/female.webp";
export const SERVICE_IMAGE = "/images/services/default.jpg";
export const HEADER_COVER_IMAGE = "/images/header_cover/default.webp";
export const BASE_URL = "https://talent.chaise.cc";

export const ACCOUNT_TYPES = ["talent", "client"];

export const SOCIALS = [
  {
    name: "twitter",
    link: `https://x.com/`,
    icon: RiTwitterXFill,
  },
  {
    name: "linkedin",
    link: `https://linkedin.com/in/`,
    icon: FaLinkedin,
  },
  {
    name: "instagram",
    link: `https://instagram.com/`,
    icon: FaInstagram,
  },
  {
    name: "behance",
    link: `https://behance.com/`,
    icon: FaBehance,
  },
  {
    name: "github",
    link: `https://github.com/`,
    icon: FaGithub,
  },
  {
    name: "figma",
    link: `https://figma.com/@`,
    icon: FaFigma,
  },
];
