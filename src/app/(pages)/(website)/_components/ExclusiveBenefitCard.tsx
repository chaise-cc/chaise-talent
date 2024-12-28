import Image from "next/image";

interface ExclusiveBenefitCardProps {
  benefit: {
    title: string;
    description: string;
    illustration?: string;
  };
}

const ExclusiveBenefitCard = ({ benefit }: ExclusiveBenefitCardProps) => {
  return (
    <div className="rounded-xl flex flex-col gap-4 shadow-sm sora-regular hover:shadow-xl bg-gray-50 hover:bg-gray-100 hover:cursor-pointer border md:border-none duration-300 p-4 py-4 md:px-6">
      <div className="py-1 md:px-2 md:py-2 flex flex-col gap-4 md:gap-4">
        <h2 className="text-xl">{benefit.title}</h2>
        <p
          className="md:line-clamp-2 text-sm md:text-base font-light"
          style={{ fontWeight: "300" }}
        >
          {benefit.description}
        </p>
      </div>

      <div className="illustration overflow-hidden md:h-80 md:p-4 md:shadow-sm md:bg-white w-full relative rounded-xl">
        <Image
          src={
            benefit.illustration
              ? benefit?.illustration
              : "/images/illustration.jpg"
          }
          height={720}
          width={720}
          quality="100"
          loading={"lazy"}
          alt={benefit.title}
          className={
            "w-full h-full object-contain md:object-cover aspect-square "
          }
        />
      </div>
    </div>
  );
};

export default ExclusiveBenefitCard;
