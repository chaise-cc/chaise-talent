import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { MdOutlineCheckBox } from "react-icons/md";

const ChaiseProSection = () => {
  return (
    <section className="min-h-[70vh]  mb-8 bg-main-color-50" id="chaise-pro">
      <div className="container h-full pb-12 pt-12 md:pt-0">
        <div className="flex md:hidden md:mt-8 mb-4 md:mb-8 items-center justify-center bg-main-color-100 h-9 w-max mx-auto md:mx-0 font-semibold px-4 text-xs md:text-sm md:px-8 text-main-color-600 border border-main-color-300 rounded-full">
          Chaise Pro
        </div>

        <h1 className="mb-8 block md:hidden md:mb-12 text-2xl text-center md:text-left md:text-4xl varela-round-regular">
          Tap into the expertise of{" "}
          <span className="relative text-main-color-500">
            professionals{" "}
            <div className="block absolute left-0 md:w-48 w-40 h-auto top-[90%]">
              <Image
                height={1080}
                width={1400}
                src="/images/vector-underline.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </span>
        </h1>
        <div className="flex flex-col-reverse md:gap-12 md:px-4 justify-between h-full md:flex-row items-center">
          <div className="md:w-[52%] py-8 max-w-xl">
            <div className="hidden md:flex md:mt-8 mb-4 md:mb-8 items-center justify-center bg-main-color-200 h-9 w-max mx-auto md:mx-0 font-semibold px-4 text-xs md:text-sm md:px-8 text-main-color-700 border border-main-color-700 rounded-full">
              Chaise Pro
            </div>

            <div className="w-full">
              <h1 className="mb-8 md:mb-12 hidden md:block text-2xl text-center md:text-left md:text-4xl varela-round-regular">
                Tap into the expertise of{" "}
                <span className="relative text-main-color-500">
                  professionals{" "}
                  <div className="block absolute left-0 md:w-48 w-32 h-auto top-[90%]">
                    <Image
                      height={1020}
                      width={1400}
                      src="/images/vector-home-talent.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </span>
              </h1>

              <div className="grid gap-4 md:gap-8 leading-6">
                <div className="flex gap-4 items-start max-w-lg">
                  <div className="flex gap-2 border-2 h-7 w-7 shrink-0 rounded-full justify-center items-center">
                    <MdOutlineCheckBox size={16} />
                  </div>

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold text-sm md:text-base">
                      Matching with more expertise
                    </h2>
                    <p
                      className="text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      Connect with the best when you access our curated catalog
                      of Pro freelancers
                    </p>
                  </div>
                </div>

                {/* <!--  --> */}
                <div className="flex gap-4 items-start max-w-lg">
                  <div className="flex gap-2 border-2 h-7 w-7 shrink-0 rounded-full justify-center items-center">
                    <MdOutlineCheckBox size={16} />
                  </div>

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold text-sm md:text-base">
                      Manage projects in one place
                    </h2>
                    <p
                      className=" text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      Connect with the best when you access our curated catalog
                      of Pro freelancers
                    </p>
                  </div>
                </div>

                {/*  */}
                <div className="flex gap-4 items-start max-w-lg">
                  <div className="flex gap-2 border-2 h-7 w-7 shrink-0 rounded-full justify-center items-center">
                    <MdOutlineCheckBox size={16} />
                  </div>

                  <div className="grid gap-1 md:gap-2">
                    <h2 className="font-semibold text-sm md:text-base">
                      Get expert guidance at every step
                    </h2>
                    <p
                      className="text-sm md:text-base"
                      style={{ fontWeight: 300 }}
                    >
                      Connect with the best when you access our curated catalog
                      of Pro freelancers
                    </p>
                  </div>
                </div>
              </div>

              <button className="bg-main-color-500 md:w-max w-full text-center items-center justify-center flex gap-4 text-main-color-900 mt-8 rounded-full py-3 px-6 font-semibold">
                Learn more <ArrowRight />
              </button>
            </div>
          </div>

          <div className="md:w-[48%] h-full">
            <Image
              loading="lazy"
              height={1080}
              width={1400}
              quality={100}
              src={"/images/illustrations/illustration-for-chaisepro.png"}
              alt={"the best part image"}
              className={"w-[90%] md:w-full mx-auto h-full object-cover"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChaiseProSection;
