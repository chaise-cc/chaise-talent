import { ReactElement } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

type Social = {
  name: string;
  link: string;
  icon: ReactElement;
};

const socials: Social[] = [
  {
    name: "facebook",
    link: "https://youtube.com/@ChaiseStudio",
    icon: <FaFacebook />,
  },
  {
    name: "instagram",
    link: "https://instagram.com/chaise.cc",
    icon: <FaInstagram />,
  },
  {
    name: "twitter",
    link: "https://twitter.com/chaisecc",
    icon: <FaXTwitter />,
  },
  {
    name: "linkedin",
    link: "https://linkedin.com/company/chaisecc",
    icon: <FaLinkedin />,
  },
];

const SocialMediaAction = () => {
  return (
    <div className="flex-col md:flex-row flex gap-2 md:gap-6 items-center">
      <h2 className="font-semibold">Follow Us</h2>
      <div className="flex flex-row gap-2 sm:gap-4 justify-center md:justify-normal items-center">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            className="text-lg md:text-2xl cursor-pointer"
          >
            {social?.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaAction;
