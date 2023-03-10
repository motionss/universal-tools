import { Link } from "react-router-dom";

function Card({ img, title, link, square = false, grow = true }) {
  return (
    <Link
      to={link}
      className={`w-0 grow bg-white ${
        title !== undefined ? (img !== undefined ? "h-40 xl:h-72" : "h-full") : "h-32 xl:h-60"
      } border border-gray-300 shadow-sm hover:shadow-xl hover:drop-shadow-xl rounded-lg
      flex flex-col ${!title ? "justify-center" : ""} hover:border-dewalt ${
        grow ? "hover:grow-[1.1]" : ""
      } 
      transition-all duration-300 group`}
    >
      {img !== undefined ? (
        <div
          className={`${
            square ? "w-full aspect-square max-h-full" : "w-full h-0 grow basis-0"
          } p-4 mx-auto`}
        >
          <img
            className="w-full h-full object-contain select-none transition-all duration-300"
            src={img}
            draggable="false"
            alt={title ?? img}
          />
        </div>
      ) : (
        ""
      )}
      {title !== undefined ? (
        <div
          className={`w-full px-4 ${
            img !== undefined ? "h-14 items-start" : "h-full flex justify-center items-center"
          } text-black group-hover:text-amber-500 text-xs xl:text-lg font-semibold 
          text-center select-none transition-all`}
        >
          {title}
        </div>
      ) : (
        ""
      )}
    </Link>
  );
}

export default Card;
