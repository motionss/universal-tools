import React from "react";
import { MdErrorOutline } from "react-icons/md";

function NotFound() {
  return (
    <div className="w-full grow flex flex-col justify-start items-center bg-white text-black">
      <MdErrorOutline className="w-32 h-32 mt-10" />
      <p className="mt-3 text-xl">La página que buscas no existe :(</p>
    </div>
  );
}

export default NotFound;
