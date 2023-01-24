import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";

import { ReactComponent as Logo } from "../assets/universal_tools.svg";

function Topbar() {
  const productInput = useRef(null);
  return (
    <header className="w-full mx-auto">
      <div className="w-full max-w-content-max-width mx-auto h-topbar-height relative flex">
        <Link to="/" className="w-max h-full cursor-pointer">
          <Logo className="h-full p-2" />
        </Link>
        <div className="absolute h-full left-[calc(50%-(365px/2))] flex items-center justify-center">
          <form
            className="flex group"
            onSubmit={(ev) => {
              productInput.current.value = "";
              ev.preventDefault();
              return;
            }}
          >
            <input
              type="text"
              className="w-80 h-10 px-2 outline-none border-solid border border-neutral-500 group-focus-within:border-neutral-300 transition-all border-r-0"
              placeholder="Buscar..."
              ref={productInput}
            />
            <button
              type="submit"
              className="w-max h-10 px-2 border-solid border border-neutral-500 group-focus-within:border-neutral-300 transition-all border-l-0"
            >
              <MdSearch size="28" color="#febd16" />
            </button>
          </form>
        </div>
        <nav className="w-full h-full flex justify-end last:pr-0">
          <UpperButton text="INICIAR SESIÓN" icon={<FiLogIn className="w-7 mr-3" size="26" />} />
          <UpperButton text="" icon={<FiShoppingCart className="w-6 m-3" size="23" />} />
        </nav>
      </div>
      <div className="w-full h-3 mb-3 flex justify-center items-center text-neutral-200 hover:text-white text-sm font-bold select-none">
        ENVÍOS A TODO EL PAÍS
      </div>
      <div className="w-full h-10 bg-dewalt">
        <nav className="sm:w-full xl:w-content-max-width h-full mx-auto flex justify-start">
          <LowerButton text="PRODUCTOS" />
          <LowerButton text="NOVEDADES" />
          <LowerButton text="SOPORTE" />
        </nav>
      </div>
    </header>
  );
}

function UpperButton({ icon, text }) {
  return (
    <div
      className="h-full p-4 flex items-center text-neutral-300 border-solid border-white30
                 hover:pb-5 hover:text-white active:pb-3 active:border-b-4 cursor-pointer transition-all"
    >
      {icon}
      <div className="select-none text-sm">{text}</div>
    </div>
  );
}

function LowerButton({ icon, text }) {
  return (
    <div
      className="px-8 flex items-center text-neutral-950 font-bold 
                 hover:bg-neutral-950 hover:text-dewalt
                 relative cursor-pointer transition-all"
    >
      <div className="absolute w-[1px] h-[calc(100%-12px)] right-0 bg-black"></div>
      <div className="select-none">{text}</div>
      {icon}
    </div>
  );
}

export default Topbar;
