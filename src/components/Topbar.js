import { useRef } from "react";
import { Link } from "react-router-dom";

import { MdSearch } from "react-icons/md";
import { FiShoppingCart, FiChevronDown, FiChevronRight, FiLogIn } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

import { useAuthContext } from "./utils/AuthContext";

function Topbar() {
  const { firebase } = useAuthContext();
  const user = firebase.user;

  const productInput = useRef(null);
  const subMenu = [
    { title: "Todos los productos", link: "/catalogo" },
    {
      title: "Herramientas Eléctricas",
      link: "/catalogo?filter=electricas",
      subMenu: [
        { title: "Baterías y cargadores", link: "/baterias" },
        { title: "Taladros", link: "/taladros" },
        { title: "Atornilladores eléctricos", link: "/taladros" },
        { title: "Rotomartillos y demoledores", link: "/taladros" },
        { title: "Sierras", link: "/taladros" },
      ],
    },
    { title: "Herramientas de Jardín", link: "/catalogo?filter=jardin" },
  ];

  const signOut = async () => {
    try {
      await firebase.auth.signOut();
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="w-full mx-auto">
      <div className="w-full max-w-content-max-width mx-auto h-topbar-height relative flex">
        <Link to="/" className="min-w-[210px] h-full mx-3">
          <img
            src="/universal-tools-logo-horizontal-v4.svg"
            className="h-full py-3 object-contain"
            alt="Universal Tools Logo"
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
              className="w-[500px] h-10 px-3 outline-none text-base border-solid border border-neutral-500 
                        group-focus-within:border-neutral-300 transition-all border-r-0
                        placeholder-neutral-600"
              placeholder="Buscar productos..."
              ref={productInput}
            />
            <button
              type="submit"
              className="w-max h-10 pr-2 border-solid border border-neutral-500 
                         group-focus-within:border-neutral-300 transition-all border-l-0
                         text-dewalt hover:text-amber-200"
            >
              <MdSearch size="28" className="pl-3 border-l border-neutral-500" />
            </button>
          </form>
        </div>
        <nav className="w-full h-full flex justify-end">
          {user === null ? (
            <>
              <Link
                className="h-full p-4 flex items-center text-dewalt border-solid border-white30
                      hover:text-white active:pb-3 cursor-pointer transition-all"
                to="/signup"
              >
                {/* <FiLogIn className="w-7 mr-3" size="26" /> */}
                <div className="select-none text-sm">REGISTRATE</div>
              </Link>
              <Link
                className="h-full p-4 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white active:pb-3 cursor-pointer transition-all"
                to="/login/user"
              >
                {/* <FiLogIn className="w-7 mr-3" size="26" /> */}
                <div className="select-none text-sm">INICIAR SESIÓN</div>
              </Link>
            </>
          ) : (
            <Link
              className="h-full p-4 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white active:pb-3 cursor-pointer transition-all"
              to="/login"
            >
              <BsPersonCircle className="w-7 mr-3" size="26" />
              <div className="select-none text-sm flex items-center gap-1">
                {user.displayName.split(" ")[0]}
                <FiChevronDown size="14" />
              </div>
            </Link>
          )}
          <Link
            onClick={signOut}
            title="Carrito"
            className="h-full p-4 pr-0 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white active:pb-3 cursor-pointer transition-all"
          >
            <FiShoppingCart className="w-6" size="23" />
          </Link>
        </nav>
      </div>
      <div className="w-full h-9 bg-dewalt">
        <nav className="sm:w-full xl:w-content-max-width h-full mx-auto flex justify-start">
          <LowerButton text="Categorías" icon={<FiChevronDown size="20" />} subMenu={subMenu} />
          <LowerButton text="Ofertas" link="/ofertas" /> {/* //TODO: Pagina de ofertas*/}
          <LowerButton text="Seguí tu pedido" link="/track" />
          {/* //TODO: Pagina de tracking */}
          <div className="grow flex justify-end">
            <LowerButton text="Ayuda" link="/faq" />
            {/* //TODO: Pagina de ayuda*/}
            <LowerButton text="Contacto" link="/contacto" />
            {/* //TODO: Pagina de contacto*/}
          </div>
        </nav>
      </div>
    </header>
  );
}

function LowerButton({ text, icon, link, subMenu }) {
  const Tag = subMenu === undefined ? Link : "div";
  return (
    <Tag
      to={link}
      className={`${
        icon !== undefined ? "pl-5 pr-4 hover:pl-6 hover:pr-5" : "px-5 hover:px-6"
      } relative flex items-center text-neutral-950 hover:text-white 
      font-medium hover:bg-black active:text-neutral-300
      cursor-pointer transition-all group`}
    >
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
          {subMenu.map((v, i) => {
            const SubTag = v.subMenu === undefined ? Link : "div";
            return (
              <SubTag
                to={v.link}
                key={i}
                className="min-w-max h-9 px-5 relative text-start select-none
                         text-white hover:text-black hover:bg-white flex items-center 
                         group/sub"
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
                          className="min-w-max h-9 px-5 relative text-start text-black select-none
                                   hover:text-white hover:bg-black flex items-center"
                          key={i}
                          to={v.link}
                        >
                          {v.title}
                        </Link>
                      ))}
                    </nav>
                  </>
                )}
              </SubTag>
            );
          })}
        </nav>
      )}
    </Tag>
  );
}

export default Topbar;
