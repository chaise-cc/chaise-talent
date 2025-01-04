import { Star1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export interface ServiceCategoryCardProps {
  name: string;
  imgsrc: string;
  skillsNo: number;
  rating: number;
  slug: string;
}

const ServiceCategoryCard = ({
  name,
  imgsrc,
  slug,
  skillsNo,
  rating,
}: ServiceCategoryCardProps) => {
  return (
    <Link
      href={`/services/${slug}`}
      className="category-card relative w-full flex flex-col bg-white rounded-lg md:rounded-xl hover:scale-[103%] overflow-hidden shadow-sm  duration-300 md:px-1 md:py-2 transition-all hover:cursor-pointer varela-round-regular"
    >
      <div className="w-full h-36 md:px-4 md:pt-4 relative p-0 mb-2 bg-gray-100 md:h-52 md:rounded-xl overflow-hidden">
        <Image
          alt={"AI Services categories"}
          height={200}
          width={300}
          loading={"lazy"}
          className={"h-full w-full object-cover md:rounded-xl"}
          src={imgsrc}
        />
      </div>
      <div className="md:p-4 flex flex-col gap-2 justify-between p-2 text-start">
        <h3 className="sm:text-lg truncate text-gray-900 font-medium md:mb-1.5 mb-1">
          {name}
        </h3>

        <div className="flex justify-between flex-row items-center">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Star1
              size={12}
              color="orange"
              className={"text-main-color-500 text-lg"}
            />
            <p className="text-gray-500 text-sm leading-none md:font-semibold">
              <span>{rating}</span>/5
            </p>
          </div>

          <p className="text-gray-500 text-sm md:font-semibold">
            <span>{skillsNo}</span> skills
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCategoryCard;
