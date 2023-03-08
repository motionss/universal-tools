import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function Dropdown({ items, title = "", onChange, defaultValue = 0 }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  const dropdown = useRef(null);

  useEffect(() => {
    const closeDropdown = (ev) => {
      if (dropdown.current && !dropdown.current.contains(ev.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  });

  return (
    <div className="w-full h-full relative" ref={dropdown}>
      <button
        type="button"
        title={title}
        className={`w-full h-full border ${
          showDropdown
            ? "rounded-b-none rounded-t-md border-dewalt"
            : "rounded-md border-gray-300 hover:border-gray-500"
        } shadow-sm flex`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="w-full px-3 flex justify-start items-center">
          {items[selectedItem].name}
        </span>
        <FiChevronDown
          className={`w-8 h-full mx-3 ${
            showDropdown ? "rotate-180" : ""
          } transition-all duration-300`}
        />
      </button>
      <div
        className={`absolute w-full ${
          showDropdown
            ? `h-max opacity-100 border border-t-0 border-dewalt shadow-lg drop-shadow-lg`
            : "h-0 opacity-0 border-none pointer-events-none"
        } overflow-hidden rounded-b-md top-full left-0 z-50 transition-all`}
      >
        {items.map((v, i) => (
          <button
            type="button"
            className={`w-full h-10 px-3 bg-white ${
              i === selectedItem
                ? "text-amber-500 drop-shadow-lg font-semibold pointer-events-none " +
                  "before:absolute before:w-1 before:h-full before:top-0 before:left-0 before:bg-dewalt"
                : "text-black hover:bg-gray-100 hover:font-semibold"
            } flex justify-start items-center`}
            onClick={() => {
              onChange(v);
              setSelectedItem(i);
              setShowDropdown(false);
            }}
            tabIndex={!showDropdown ? "-1" : ""}
            key={i}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
