import { useState } from "react";
import {
  Search,
  ChevronDown,
  Briefcase,
  Users,
  ClipboardList,
} from "lucide-react";

export default function SearchBarComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Jobs");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    {
      name: "Jobs",
      description: "Apply to jobs posted by clients",
      icon: Briefcase,
    },
    {
      name: "Talent",
      description: "Find freelancers and agencies",
      icon: Users,
    },
    {
      name: "Projects",
      description: "See projects from other pros",
      icon: ClipboardList,
    },
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <form
      action="/nx/search/jobs/"
      method="GET"
      role="search"
      className="relative hidden  md:flex items-center w-full justify-center max-w-xl md:min-w-96 bg-white border  rounded-full  focus:ring focus:ring-blue-300"
    >
      {/* Search Bar */}
      <div className="flex w-full items-center rounded-l-full overflow-hidden gap-2">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search
              color="black"
              size={18}
              className="w-max pr-1.5 pl-1 absolute top-2.5 border-r left-2"
            />
            <input
              type="search"
              name="q"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              aria-label="Search"
              className="w-full px-4 pl-12 py-2  rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Category Selector */}
      <div className="">
        <button
          type="button"
          aria-expanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-4 py-2 border-l gap-2 focus:outline-none"
        >
          <span className="font-medium text-gray-700">{selectedCategory}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <ul
            role="listbox"
            className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-md"
          >
            {categories.map((category) => (
              <li key={category.name} role="presentation" className="p-1">
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedCategory === category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`flex items-center w-full gap-2 px-4 py-2 text-left hover:bg-blue-100 ${
                    selectedCategory === category.name
                      ? "bg-blue-100 font-semibold"
                      : ""
                  }`}
                >
                  <category.icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <span className="block">{category.name}</span>
                    <span className="block text-sm text-gray-500">
                      {category.description}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
