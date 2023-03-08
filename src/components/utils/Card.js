import { Link } from "react-router-dom";

function Card({ img, title, link, square = false, grow = true }) {
  return (
    <Link
      to={link}
      className={`grow w-0 bg-white ${
        title !== undefined ? (img !== undefined ? "h-72" : "h-full") : "h-60"
      } border border-gray-300 shadow-sm hover:shadow-xl hover:drop-shadow-xl rounded-lg
      flex flex-col hover:border-dewalt ${grow ? "hover:grow-[1.1]" : ""} 
      transition-all duration-300 group`}
    >
      {img !== undefined ? (
        <div className={`h-0 grow basis-0 ${square ? "aspect-square" : "w-full"} p-4 mx-auto`}>
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
          className={`w-full ${
            img !== undefined ? "h-14 items-start" : "h-full items-center"
          } text-black group-hover:text-amber-500 text-lg font-semibold 
          flex justify-center select-none transition-all`}
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
