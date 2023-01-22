import React, { useMemo, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

function Home() {
  return (
    <div className="flex justify-center">
      <section className="w-full h-[640px]">
        <Carousel
          images={[
            "https://source.unsplash.com/random/1920x640?workers",
            "https://source.unsplash.com/random/1920x640?building",
            "https://source.unsplash.com/random/1920x640?tools",
            "https://source.unsplash.com/random/1920x640?gaming",
          ]}
        />
      </section>
    </div>
  );
}

function Carousel({ images, startingIndex }) {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(0);

  useMemo(() => {
    setItems(
      images.map((v, i) => {
        return { link: v, position: startingIndex ? i - startingIndex : i };
      })
    );
    setActiveItem(startingIndex ?? 0);
  }, []);

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
      <div className="absolute h-2 left-1/2 -translate-x-1/2 bottom-4 flex justify-around gap-4">
        {items.map((v, i) => (
          <button
            key={i}
            className={`w-10 h-full bg-black transition-all duration-500 ${
              items.findIndex((i) => i.position === 0) === i ? "bg-opacity-100" : "bg-opacity-50"
            }`}
            onClick={() => {
              if (i !== activeItem) onSelector(i, i - activeItem);
            }}
          />
        ))}
      </div>
      <div
        className="absolute w-[calc(100%+200px)] group-hover/container:w-full h-16 top-1/2 -translate-y-1/2 left-0 
                   -translate-x-[100px] group-hover/container:-translate-x-0 group-hover/container:px-8 
                   flex justify-between transition-all"
      >
        <button
          className="w-16 h-16 rounded-full bg-black bg-opacity-50 hover:bg-opacity-100 active:bg-opacity-75 
                     group transition-all"
          onClick={() => {
            onSelector(activeItem === 0 ? items.length - 1 : activeItem - 1, 1);
          }}
        >
          <HiOutlineChevronLeft
            size="36"
            className="text-white text-opacity-50 group-hover:text-opacity-100 group-active:bg-opacity-75 
                       transition-all -ml-[1px]"
          />
        </button>
        <button
          className="w-16 h-16 rounded-full bg-black bg-opacity-50 hover:bg-opacity-90 active:bg-opacity-75 
                     group transition-all"
          onClick={() => {
            onSelector(activeItem === items.length - 1 ? 0 : activeItem + 1, -1);
          }}
        >
          <HiOutlineChevronRight
            size="36"
            className="text-white text-opacity-50 group-hover:text-opacity-100 group-active:bg-opacity-75 
                       transition-all -ml-[1px]"
          />
        </button>
      </div>
    </div>
  );
}

function Item({ link, position }) {
  return (
    <img
      src={link}
      alt="lol"
      draggable="false"
      style={{ marginLeft: window.screen.width * position }}
      className="absolute transition-all duration-500"
    />
  );
}

export default Home;
