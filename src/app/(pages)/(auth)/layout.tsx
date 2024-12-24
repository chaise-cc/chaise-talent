"use client";

import Image from "next/image";
import Link from "next/link";
import "./_styles/index.scss";
import { Modal } from "@/components/custom/Modal";
import { Toaster } from "sonner";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Modal className="w-[90%] max-w-5xl">
      <div className="w-full h-screen md:overflow-hidden">
        <div className="h-full flex w-full">
          <div className="md:w-[50%] h-full bg-main-color-50 hidden md:inline-block">
            <div className=" mx-auto pt-8 flex flex-col gap-10 h-full">
              <div className="flex h-full overflow-hidden flex-col items-center gap-2">
                <Link href={"/"}>
                  <Image
                    quality={100}
                    src="/images/chaise-black.png"
                    alt="Chaise - The Future of Freelancing"
                    height={48}
                    width={200}
                    loading="lazy"
                    className=" h-8 w-20 object-cover"
                  />
                </Link>

                <h2 className="text-2xl sm:px-6 md:px-12 md:text-3xl pt-4 mb-4 text-center">
                  Unlock <span className="text-main-color-500">Limitless</span>{" "}
                  <br /> Possibilities with Chaise
                </h2>

                <Image
                  src={"/images/auth-bg.webp"}
                  alt="Chasie Authentication Flow Image"
                  height={1080}
                  priority={false}
                  quality={100}
                  width={1920}
                  loading="lazy"
                  className="object-contain h-full w-auto"
                />
              </div>
            </div>
          </div>

          <section className="md:w-[50%] w-full md:pb-8">
            <div className="h-full w-full flex items-center flex-col md:overflow-y-auto no-srollbar p-8 md:p-12">
              <Link href={"/auth/login"} className="block md:hidden">
                <Image
                  quality={100}
                  src="/images/chaise-black.png"
                  alt="Chaise - The Future of Freelancing"
                  height={48}
                  width={200}
                  loading="lazy"
                  className="mb-3 h-8 w-20 object-cover"
                />
              </Link>

              {children}
            </div>
          </section>
        </div>
      </div>

      <Toaster richColors position="top-right" />
    </Modal>
  );
}
