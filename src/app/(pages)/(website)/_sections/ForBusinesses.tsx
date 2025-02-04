import { DollarCircle } from "iconsax-react";
import { Edit2, Folder } from "lucide-react";
import Image from "next/image";
import { MdPeopleAlt } from "react-icons/md";

const ForBusinessesSection = () => {
  return (
    <section className=" relative mt-20 md:mt-8 mb-12 py-4" id="chaise-pro">
      <div className="h-full container">
        <div className="flex flex-col md:flex-row h-full gap-4 md:gap-12 items-center">
          <h1 className="mb-2 px-8 text-2xl text-center md:hidden md:text-4xl varela-round-regular">
            Why{" "}
            <span className="relative text-main-color-500">
              businesses{" "}
              <div className="block absolute left-0 w-28 md:w-48 h-auto top-[85%]">
                <Image
                  height={480}
                  width={680}
                  quality={100}
                  src="/images/vector-underline.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </span>
            turn to chaise
          </h1>
          <div className="md:w-[48%] w-full rounded-xl h-72 md:h-[520px] p-2 md:p-4 overflow-hidden">
            <Image
              alt=""
              width="1920"
              height="1080"
              loading="lazy"
              quality={100}
              className="w-full h-full rounded-xl object-cover"
              src="/images/illustrations/illustration-for-business.png"
            />
          </div>

          <div className="md:w-[52%] rounded-xl overflow-hidden">
            <div className="flex mb-12 absolute left-[50%] -translate-x-[50%] md:left-0 md:translate-x-0 md:relative -top-14 md:top-0 bg-main-color-100 border text-xs md:text-sm border-main-color-400 text-main-color-700 w-max h-9 justify-center items-center font-semibold px-6 rounded-full">
              For Business
            </div>

            <div className="w-full max-w-3xl">
              <h1 className="mb-8 text-2xl hidden md:block md:text-4xl varela-round-regular">
                Why{" "}
                <span className="relative text-main-color-500">
                  businesses{" "}
                  <div className="block absolute left-0 w-48 h-auto top-[90%]">
                    <Image
                      height={580}
                      width={620}
                      src="/images/vector-underline.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </span>{" "}
                turn to chaise
              </h1>
              {/*  */}
              <div className="grid gap-x-1 gap-y-4 grid-cols-2 md:gap-4 md:gap-y-12 md:leading-6">
                {/* <!--  --> */}
                <div className="flex gap-2 md:gap-4 items-start max-w-lg">
                  <Folder size={20} className="shrink-0" />

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold text-sm md:text-base">
                      Access to Diverse Talents
                    </h2>
                    <p
                      className="text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      We have the best talents for your projects irrespective of
                      their location
                    </p>
                  </div>
                </div>

                {/* <!--  --> */}
                <div className="flex gap-2 md:gap-4 items-start max-w-lg">
                  <Edit2 size={20} className="shrink-0" />

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold  text-sm md:text-base">
                      Flexibity
                    </h2>
                    <p
                      className=" text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      Flexibility to scale your workforce up or down based on
                      project demands.
                    </p>
                  </div>
                </div>

                {/* <!--  --> */}
                <div className="flex gap-2 md:gap-4 items-start max-w-lg">
                  <DollarCircle color="black" size={20} className="shrink-0" />

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold text-sm md:text-base">
                      Cost-Effective Solutions
                    </h2>
                    <p
                      className=" text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      Competitive pricing for high-quality work
                    </p>
                  </div>
                </div>

                {/* <!--  --> */}
                <div className="flex gap-2 md:gap-4 items-start max-w-lg">
                  <MdPeopleAlt size={20} className="shrink-0" />

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold text-sm md:text-base">
                      Pool of talents
                    </h2>
                    <p
                      className=" text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      Access specialized skills and expertise that may not be
                      available in-house.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:gap-4 mt-8 md:mt-12 flex-col md:flex-row">
                <button className="bg-main-color-500 text-main-color-900 border-2 border-main-color-500 rounded-full py-2 font-semibold px-8">
                  Join as Client
                </button>
                <button className="bg-transparent text-black border-2 border-black font-semibold rounded-full py-3 px-8">
                  Learn how to hire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBusinessesSection;
