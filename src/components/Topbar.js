import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdSearch } from "react-icons/md";
import { FiShoppingCart, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

import { useAuthContext } from "./utils/AuthContext";

function Topbar() {
  const { firebase } = useAuthContext();
  const navigate = useNavigate();
  const user = firebase.user;

  const [showUserOptions, setShowUserOptions] = useState(false);

  const searchInput = useRef(null);
  const subMenu = [
    { title: "Ver todas", link: "/categories" },
    {
      title: "Herramientas Eléctricas",
      subMenu: [
        { title: "Baterías y cargadores", link: "baterias" },
        { title: "Taladros", link: "taladros" },
        { title: "Atornilladores eléctricos", link: "taladros" },
        { title: "Rotomartillos y demoledores", link: "taladros" },
        { title: "Sierras", link: "taladros" },
      ],
    },
    { title: "Herramientas Manuales", link: "/catalogue?filter=manuales" },
    { title: "Herramientas de Jardín", link: "/catalogue?filter=jardin" },
    { title: "Accesorios e Insumos", link: "/catalogue?filter=workspace" },
    { title: "Espacio de Trabajo", link: "/catalogue?filter=workspace" },
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
    <header className="w-full mx-auto bg-black">
      <div className="w-full max-w-content-max-width mx-auto h-topbar-height relative flex">
        <Link to="/" className="min-w-[210px] h-full mr-3">
          <img
            src="/universal-tools-logo-horizontal-v4.svg"
            className="h-full py-3 object-contain"
            alt="Universal Tools Logo"
          />
        </Link>
        <div className="h-full ml-10 flex items-center">
          <form
            className="flex group shadow-sm shadow-neutral-300"
            onSubmit={(ev) => {
              console.log(searchInput.current.value);
              navigate(`/catalogue/${searchInput.current.value.replaceAll(" ", "-")}`);
              ev.preventDefault();
              return;
            }}
          >
            <input
              type="text"
              className="w-[500px] h-10 px-3 text-white outline-none border border-r-0 border-gray-500 
                        group-focus-within:border-gray-300 rounded-l-sm
                        placeholder-neutral-400 transition-all"
              placeholder="Buscar productos..."
              ref={searchInput}
            />
            <button
              type="submit"
              className="w-max h-10 pr-2 border border-l-0 border-gray-500 
                         group-focus-within:border-gray-300 rounded-r-sm
                         text-dewalt hover:text-amber-200 transition-all"
            >
              <MdSearch
                size="28"
                className="pl-3 border-l border-gray-500 group-focus-within:border-gray-300 transition-all"
              />
            </button>
          </form>
        </div>
        <nav className="w-full h-full flex justify-end">
          {user === null ? (
            <>
              <Link
                className="h-full p-4 flex items-center text-dewalt border-solid border-white30
                      hover:text-white cursor-pointer transition-all"
                to="/signup"
              >
                {/* <FiLogIn className="w-7 mr-3" size="26" /> */}
                <div className="select-none text-sm">REGISTRATE</div>
              </Link>
              <Link
                className="h-full p-4 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white cursor-pointer transition-all"
                to="/login/user"
              >
                {/* <FiLogIn className="w-7 mr-3" size="26" /> */}
                <div className="select-none text-sm">INICIAR SESIÓN</div>
              </Link>
            </>
          ) : (
            <div
              type="button"
              className="w-max h-full relative p-4 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white cursor-pointer transition-all"
              onMouseEnter={() => setShowUserOptions(true)}
              onMouseLeave={() => setShowUserOptions(false)}
            >
              <BsPersonCircle className="w-7 mr-3" size="26" />
              <div className="select-none text-sm flex items-center gap-1">
                {user.displayName.split(" ")[0]}
                <FiChevronDown size="14" />
              </div>
              <div
                className={`absolute top-full right-4 h-max bg-white text-black text-sm z-50 rounded-b-md 
                            border border-t-0 border-gray-300 shadow-xl drop-shadow-xl transition-all
                            ${
                              showUserOptions
                                ? "w-60 opacity-100 pointer-events-auto"
                                : "w-48 opacity-0 pointer-events-none"
                            }`}
              >
                <Link
                  to={"/user/purchases"}
                  className="w-full h-10 pr-4 flex justify-end items-center 
                             hover:bg-gray-100 hover:shadow-md hover:font-semibold"
                >
                  Mis compras
                </Link>
                <Link
                  to={"/user/purchases"}
                  className="w-full h-10 pr-4 flex justify-end items-center 
                             hover:bg-gray-100 hover:shadow-md hover:font-semibold"
                >
                  Mi perfil
                </Link>
                <button
                  type="button"
                  className="w-full h-10 pr-4 flex justify-end items-center border-t border-gray-300 
                             hover:bg-gray-100 hover:shadow-md hover:font-semibold"
                  onClick={signOut}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
          <Link
            to="/cart"
            title="Carrito"
            className="h-full p-4 pr-0 flex items-center text-neutral-300 border-solid border-white30
                      hover:text-white cursor-pointer transition-all"
          >
            <FiShoppingCart className="w-6" size="23" />
          </Link>
        </nav>
      </div>
      <div className="w-full h-9 bg-dewalt">
        <nav className="sm:w-full xl:w-content-max-width h-full mx-auto flex justify-start">
          <LowerButton text="Categorías" link="categories" subMenu={subMenu} navigate={navigate} />
          <LowerButton text="Ofertas" link="ofertas" /> {/* //TODO: Pagina de ofertas*/}
          <LowerButton text="Seguí tu pedido" link="track" />
          {/* //TODO: Pagina de tracking */}
          <div className="grow flex justify-end">
            <LowerButton text="Ayuda" link="faq" />
            {/* //TODO: Pagina de ayuda*/}
            <LowerButton text="Contacto" link="contacto" />
            {/* //TODO: Pagina de contacto*/}
          </div>
        </nav>
      </div>
    </header>
  );
}

function LowerButton({ text, link, subMenu }) {
  const Tag = subMenu === undefined ? Link : "div";
  return (
    <Tag
      to={Tag === Link ? link : ""}
      className={`w-max h-full relative ${
        subMenu !== undefined ? "pl-5 pr-4 hover:pl-6 hover:pr-5" : "px-5 hover:px-6"
      } flex items-center text-neutral-950 hover:bg-black hover:text-white
      font-medium transition-all group`}
    >
      <p className="select-none">{text}</p>
      {subMenu === undefined ? (
        ""
      ) : (
        <>
          <FiChevronDown size="20" className="ml-1" />
          <div
            className="absolute z-10 left-0 top-full w-64 h-max py-3 flex flex-col bg-black
                       opacity-0 pointer-events-none group-hover:w-80 border border-t-0 border-dewalt
                       group-hover:opacity-100 group-hover:pointer-events-auto transition-all"
          >
            {subMenu.map((v, i) => {
              const SubTag = v.subMenu === undefined ? Link : "div";
              return (
                <SubTag
                  to={SubTag === Link ? v.link : ""}
                  className="min-w-max h-9 px-6 relative flex items-center text-start
                            text-white hover:text-black hover:bg-dewalt hover:font-semibold select-none group/sub"
                  key={i}
                >
                  {v.title}
                  {v.subMenu === undefined ? (
                    ""
                  ) : (
                    <>
                      <FiChevronRight size="20" className="absolute w-max right-2 top-2" />
                      <div
                        className="absolute z-10 left-full -top-3 w-64 h-max py-3 flex flex-col bg-dewalt
                                  opacity-0 pointer-events-none group-hover/sub:w-80 border border-l-0 border-black
                                  group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto transition-all"
                      >
                        {v.subMenu.map((v, i) => (
                          <Link
                            to={v.link}
                            className="min-w-max h-9 px-5 relative text-start font-normal text-black select-none
                                    hover:text-white hover:bg-black hover:font-semibold flex items-center"
                            key={i}
                          >
                            {v.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </SubTag>
              );
            })}
          </div>
        </>
      )}
    </Tag>
  );
}

export default Topbar;
