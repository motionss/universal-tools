import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full py-16 grow flex flex-col justify-start items-center bg-pagebg text-black">
      <MdErrorOutline className="w-28 h-28 text-gray-400" />
      <p className="mt-3 text-xl">La página que buscas no existe :(</p>
      <Link to="/" className="mt-4 text-gray-500">
        Ir a la página principal
      </Link>
    </div>
  );
}

export default NotFound;
