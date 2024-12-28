"use client";

import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const SearchBoxHero = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const query = searchRef.current?.value.trim();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-container w-full h-12 md:h-[60px] flex p-1 justify-center items-center bg-[#F0F2F5] md:flex-row">
      <Input
        ref={searchRef}
        className="search-bar w-full flex-1 placeholder:text-gray-700 shadow-none placeholder:text-sm ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        type="search"
        placeholder="What are you looking for.."
      />
      <button
        onClick={handleSearch}
        className="!px-0 md:!px-6 h-full font-medium leading-none flex-shrink-0 flex bg-main-color-500 mt-0 rounded-full text-gray-900 gap-2 items-center"
      >
        <div className="h-10 md:h-auto w-10 md:w-auto flex-shrink-0 grid place-items-center">
          <SearchNormal1 size={20} variant="Outline" color="black" />
        </div>

        <span className="hidden md:block">
          <span className="leading-none">Search</span>
        </span>
      </button>
    </div>
  );
};

export default SearchBoxHero;
