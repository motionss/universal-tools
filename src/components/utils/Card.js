import { Link } from "react-router-dom";

function Card({ img, title, link, square = false }) {
  return (
    <Link
      to={link}
      className={`grow w-0 ${
        title !== undefined ? "h-72" : "h-60"
      } border-solid border border-neutral-400 hover:shadow-lg
      flex flex-col hover:border-dewalt hover:grow-[1.2] 
      transition-all duration-300 group`}
    >
      <div className={`h-0 grow basis-0 ${square ? "aspect-square" : "w-full"} p-4 mx-auto`}>
        <img
          className="w-full h-full object-contain group-hover:brightness-[1.15] select-none transition-all duration-300"
          src={img}
          draggable="false"
          alt={title ?? img}
        />
      </div>
      {title !== undefined ? (
        <div
          className="w-full h-14 text-black group-hover:text-dewalt text-lg font-bold
                   flex justify-center items-start select-none transition-all"
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
