import React, { useState } from "react";
import { X } from "lucide-react";

type TagInputProps = {
  tags: string[];
  onChange: (updatedTags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
};

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = "Add tags...",
  maxTags = 5,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      onChange([...tags, newTag]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border p-2 rounded-md">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-main-color-100 text-main-color-700 px-3 py-1 rounded-full text-sm"
        >
          {tag}
          <button
            type="button"
            className="ml-2 text-main-color-500 hover:text-main-color-700"
            onClick={() => handleRemoveTag(tag)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      {tags.length < maxTags && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow bg-transparent border-none outline-none text-sm py-1 px-2"
        />
      )}
    </div>
  );
};

export default TagInput;
