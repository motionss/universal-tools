import { useRef } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { FiShoppingCart, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

function Topbar() {
  const productInput = useRef(null);
  const subMenu = [
    { title: "Todos los productos", link: "/catalogo" },
    {
      title: "Herramientas Eléctricas",
      link: "/catalogo?filter=manuales",
      subMenu: [
        { title: "Baterías y cargadores", link: "/baterias" },
        { title: "Taladros", link: "/taladros" },
        { title: "Atornilladores eléctricos", link: "/taladros" },
        { title: "Rotomartillos y demoledores", link: "/taladros" },
        { title: "Sierras", link: "/taladros" },
      ],
    },
    { title: "Herramientas de Jardín", link: "/catalogo?filter=electricas" },
  ];
  return (
    <header className="w-full mx-auto">
      <div className="w-full max-w-content-max-width mx-auto h-topbar-height relative flex">
        <Link to="/" className="min-w-[210px] h-full mx-3">
          <img
            src="/universal-tools-logo-horizontal-v3.svg"
            className="h-full py-3 object-contain"
          />
        </Link>
        <div className="h-full ml-10 flex items-center">
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
              className="w-[500px] h-10 px-2 outline-none text-base border-solid border border-neutral-500 
                        group-focus-within:border-neutral-300 transition-all border-r-0
                        placeholder-neutral-600"
              placeholder="Buscar productos..."
              ref={productInput}
            />
            <button
              type="submit"
              className="w-max h-10 px-2 border-solid border border-neutral-500 
                         group-focus-within:border-neutral-300 transition-all border-l-0
                         text-dewalt"
            >
              <MdSearch size="28" />
            </button>
          </form>
        </div>
        <nav className="w-full h-full flex justify-end last:pr-0">
          <Link
            className="h-full p-4 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white active:pb-3 cursor-pointer transition-all"
            to="/login"
          >
            <BsPersonCircle className="w-7 mr-3" size="26" />
            <div className="select-none text-sm">INICIAR SESIÓN</div>
          </Link>
          <button
            className="h-full p-4 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white active:pb-3 cursor-pointer transition-all"
          >
            <FiShoppingCart className="w-6 m-3" size="23" />
          </button>
        </nav>
      </div>
      <div className="w-full h-9 bg-dewalt">
        <nav className="sm:w-full xl:w-content-max-width h-full mx-auto flex justify-start">
          <LowerButton text="Categorías" icon={<FiChevronDown size="20" />} subMenu={subMenu} />
          <LowerButton text="Ofertas" />
          <LowerButton text="Seguí tu pedido" />
          <div className="grow flex justify-end">
            <LowerButton text="Ayuda" />
            <LowerButton text="Contacto" />
          </div>
        </nav>
      </div>
    </header>
  );
}

function LowerButton({ text, icon, subMenu }) {
  return (
    <a
      className={`${
        icon !== undefined ? "pl-5 pr-4 hover:pl-6 hover:pr-5" : "px-5 hover:px-6"
      } relative flex items-center text-neutral-950 hover:text-white font-bold
      uppercase hover:bg-black active:text-neutral-300
      cursor-pointer transition-all group`}
    >
      {/* <div className="absolute w-[1px] h-[calc(100%-12px)] right-0 bg-black" /> */}
      <p className="select-none">{text}</p>
      {icon !== undefined ? <div className="ml-1">{icon}</div> : ""}
      {subMenu === undefined ? (
        ""
      ) : (
        <nav
          className="absolute z-10 left-0 top-full w-64 h-max py-3 flex flex-col bg-black
                     opacity-0 pointer-events-none group-hover:w-80
                     group-hover:opacity-100 group-hover:pointer-events-auto
                     transition-all"
        >
          {subMenu.map((v, i) => (
            <a
              className="min-w-max h-9 px-5 relative font-bold text-start text-white hover:text-black hover:bg-white flex items-center
                         group/sub"
              key={i}
            >
              {v.title}
              {v.subMenu === undefined ? (
                ""
              ) : (
                <>
                  <FiChevronRight size="20" className="absolute w-max right-2 top-2" />
                  <nav
                    className="absolute z-10 left-full -top-3 w-64 h-max py-3 flex flex-col bg-white
                     opacity-0 pointer-events-none group-hover/sub:w-80
                     group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto
                     transition-all"
                  >
                    {v.subMenu.map((v, i) => (
                      <Link
                        className="min-w-max h-9 px-5 relative font-bold text-start text-black hover:text-white hover:bg-black flex items-center"
                        key={i}
                        to={v.link}
                      >
                        {v.title}
                      </Link>
                    ))}
                  </nav>
                </>
              )}
            </a>
          ))}
        </nav>
      )}
    </a>
  );
}

export default Topbar;
