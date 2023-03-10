import { useState, useMemo } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import "./Carousel.css";

function Carousel({ images, startingIndex }) {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(0);

  // TODO: Hacer el timer para que cambie solo

  useMemo(() => {
    setItems(
      images.map((v, i) => {
        return { link: v, position: startingIndex ? i - startingIndex : i };
      })
    );
    setActiveItem(startingIndex ?? 0);
  }, [images, startingIndex]);

  const onSelector = (index) => {
    setItems(
      items.map((v, i) => {
        v.position = index !== i ? i - index : 0;
        return v;
      })
    );
    setActiveItem(index);
  };

  return (
    <div className="relative h-full group/container">
      {items.map((v, i) => {
        return <Item key={i} link={v.link} visible={v.visible} position={v.position} />;
      })}
      <div className="absolute h-max left-1/2 -translate-x-1/2 scale-50 bottom-1 xl:scale-100 xl:bottom-4 flex justify-around gap-2">
        {items.map((v, i) => (
          <button
            key={i}
            className={`h-2 bg-white transition-all duration-500 ${
              items.findIndex((i) => i.position === 0) === i
                ? "w-4 bg-opacity-100 drop-shadow-lg"
                : "w-2 bg-opacity-20 border border-white shadow-sm"
            } rounded-3xl`}
            onClick={() => {
              if (i !== activeItem) onSelector(i, i - activeItem);
            }}
          />
        ))}
      </div>
      <div className="absolute w-full h-0 top-1/2 left-0 flex justify-between transition-all">
        <button
          className="carousel_button left-0 translate-x-1/2 group"
          onClick={() => {
            onSelector(activeItem === 0 ? items.length - 1 : activeItem - 1, 1);
          }}
        >
          <HiOutlineChevronLeft className="carousel_button_icon" />
        </button>
        <button
          className="carousel_button right-0 -translate-x-1/2 group"
          onClick={() => {
            onSelector(activeItem === items.length - 1 ? 0 : activeItem + 1, -1);
          }}
        >
          <HiOutlineChevronRight className="carousel_button_icon" />
        </button>
      </div>
    </div>
  );
}

function Item({ link, position }) {
  return (
    <img
      src={link}
      alt="hola"
      draggable="false"
      style={{ transform: `translateX(${window.innerWidth * position}px)` }}
      className="absolute h-full transition-all duration-500"
    />
  );
}

export default Carousel;
