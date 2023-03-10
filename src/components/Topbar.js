import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  MdChevronLeft,
  MdHelpOutline,
  MdOutlineClose,
  MdOutlineCreate,
  MdOutlineHome,
  MdOutlineLocalOffer,
  MdOutlineLocalShipping,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlinePhone,
  MdOutlineShoppingBag,
  MdSearch,
} from "react-icons/md";
import { FiShoppingCart, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsListNested, BsPerson, BsPersonCircle } from "react-icons/bs";

import { useAuthContext } from "./utils/AuthContext";

function Topbar() {
  const { firebase } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const user = firebase.user;

  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState("");
  const searchInput = useRef(null);
  const searchForm = useRef(null);

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

  useEffect(() => setShowMobileMenu(false), [location]);

  useEffect(() => {
    const resizeSearchForm = (ev) => {
      if (searchForm.current && !searchForm.current.contains(ev.target)) setSearchBarFocused(false);
    };
    window.addEventListener("mousedown", resizeSearchForm);
    return () => window.removeEventListener("mousedown", resizeSearchForm);
  });

  const logOut = async () => {
    try {
      await firebase.auth.signOut();
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="w-full mx-auto bg-black relative z-10 shadow-md">
      <div className="w-full py-2 xl:py-3 max-w-content-max-width mx-auto h-12 xl:h-topbar-height relative flex">
        <Link
          to="/"
          className={`${
            searchBarFocused
              ? "max-xl:opacity-0 max-xl:pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } min-w-min h-full mx-4 xl:mx-0 xl:ml-0 transition-all duration-200 max-xl:z-10`}
        >
          <img
            src="/universal-tools-logo-horizontal-v4.svg"
            className="min-w-max h-full object-contain hidden xl:block"
            alt="Universal Tools Logo"
          />
          <img
            src="/universal-tools-logo-notext.svg"
            className="min-w-max h-full object-contain xl:hidden"
            alt="Universal Tools Logo"
          />
        </Link>
        <div className={`w-0 grow xl:w-max h-full xl:ml-10 flex items-center`}>
          <form
            className={`absolute top-0 left-0 xl:static w-full h-full flex group xl:shadow-sm xl:shadow-neutral-300 ${
              searchBarFocused ? "" : "pl-32 xl:pl-0 pr-[6.5rem] xl:pr-0 py-2 xl:py-0"
            } transition-all`}
            onSubmit={(ev) => {
              navigate(`/catalogue/${searchInput.current.value.replaceAll(" ", "-")}`);
              setSearchBarFocused(false);
              searchForm.current.blur();
              ev.preventDefault();
              return;
            }}
            onFocus={() => setSearchBarFocused(true)}
            onBlur={() => console.log("BLUREª")}
            ref={searchForm}
          >
            <input
              type="text"
              className={`w-full xl:w-[500px] h-full px-1 xl:px-3 text-sm xl:text-base text-white outline-none border border-r-0 border-gray-500
                        xl:group-focus-within:border-white rounded-l-sm
                        placeholder-neutral-400 max-xl:placeholder:text-xs max-xl:group-focus-within:placeholder:text-sm transition-all ${
                          searchBarFocused ? "max-xl:border-0 pl-10 xl:px-3" : ""
                        }`}
              placeholder="Buscar productos..."
              onChange={(ev) => setSearchInputValue(ev.target.value)}
              ref={searchInput}
            />
            <button
              type="submit"
              className={`${
                searchBarFocused ? "w-24 py-2 xl:w-14 xl:py-2 max-xl:border-0" : "w-14 py-1"
              } h-full pr-2 xl:py-2 border border-l-0 border-gray-500
              xl:group-focus-within:border-white rounded-r-sm
              text-dewalt hover:text-amber-200 transition-all`}
            >
              <MdSearch className="w-full h-full pl-3 border-l border-gray-500 group-focus-within:border-gray-300 transition-all" />
            </button>
            <button
              type="button"
              className={`absolute top-1/2 left-0 -translate-y-1/2 ${
                searchBarFocused ? "block xl:hidden" : "hidden"
              } h-5/6 aspect-square p-1`}
              onClick={() => setSearchBarFocused(false)}
            >
              <MdChevronLeft className="w-full h-full" />
            </button>
            <button
              type="button"
              className={`absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 mr-16 ${
                searchBarFocused && searchInputValue !== "" ? "block xl:hidden" : "hidden"
              } h-full aspect-square p-3`}
              onMouseDown={(ev) => {
                ev.preventDefault();
                setSearchInputValue("");
                searchInput.current.value = "";
              }}
            >
              <MdOutlineClose className="w-full h-full" />
            </button>
          </form>
        </div>
        <nav
          className={`${
            searchBarFocused
              ? "max-xl:opacity-0 max-xl:pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } xl:w-full h-full flex justify-end overflow-hidden transition-all duration-200 max-xl:z-10`}
        >
          {user === null ? (
            <>
              <div className="hidden xl:flex">
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
              </div>
            </>
          ) : (
            <div
              type="button"
              className="w-max h-full relative p-4 hidden xl:flex items-center text-neutral-300 border-solid border-white30
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
                  to={"/user/profile"}
                  className="w-full h-10 pr-4 flex justify-end items-center 
                             hover:bg-gray-100 hover:shadow-md hover:font-semibold"
                >
                  Mi cuenta
                </Link>
                <button
                  type="button"
                  className="w-full h-10 pr-4 flex justify-end items-center border-t border-gray-300 
                             hover:bg-gray-100 hover:shadow-md hover:font-semibold"
                  onClick={logOut}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
          <button
            type="button"
            className="h-full px-[2px] py-[6px] aspect-square ml-4 block xl:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="w-full h-full relative group overflow-visible">
              <div
                className={`absolute top-0 left-0 ${
                  showMobileMenu ? "rotate-45 top-[46%]" : ""
                } w-full h-[2px] bg-gray-300 group-hover:bg-white rounded-sm transition-all`}
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-0 ${
                  showMobileMenu ? "opacity-0" : "opacity-100"
                } w-full h-[2px] bg-gray-300 group-hover:bg-white rounded-sm transition-all`}
              />
              <div
                className={`absolute bottom-0 left-0 ${
                  showMobileMenu ? "-rotate-45 bottom-[46%]" : ""
                } w-full h-[2px] bg-gray-300 group-hover:bg-white rounded-sm transition-all`}
              />
            </div>
          </button>
          <Link
            to="/cart"
            title="Carrito"
            className="h-full p-4 xl:pr-0 flex items-center text-gray-300 border-solid border-white30
                      hover:text-white cursor-pointer transition-all"
          >
            <FiShoppingCart className="w-6" size="23" />
          </Link>
        </nav>
      </div>
      <div
        className={`w-full ${
          showMobileMenu ? "h-max border-t" : "h-0 border-0"
        } bg-black border-gray-300 overflow-hidden`}
      >
        {user !== null ? (
          <>
            <div className="w-full h-14 flex justify-center items-center">
              <BsPerson className="w-8 h-8 mr-4" />
              <span>Hola, {user.displayName.split(" ")[0]}</span>
            </div>
            <div className="mx-4 mb-2 border-t border-gray-300" />
          </>
        ) : (
          ""
        )}
        <LowerButtonMobile
          icon={<MdOutlineHome className="w-full h-full" />}
          text="Inicio"
          link="/"
        />
        <LowerButtonMobile
          icon={<BsListNested className="w-full h-full" />}
          text="Categorías"
          link="/categories"
        />
        <LowerButtonMobile
          icon={<MdOutlineLocalOffer className="w-full h-full" />}
          text="Ofertas"
          link="/catalogue/offers"
        />
        <LowerButtonMobile
          icon={<MdOutlineLocalShipping className="w-full h-full" />}
          text="Seguí tu pedido"
          link="/track"
        />
        <div className="mx-4 my-2 border-t border-gray-300" />
        {user === null ? (
          <>
            <LowerButtonMobile
              icon={<MdOutlineCreate className="w-full h-full" />}
              text="Registrate"
              link="/signup"
            />
            <LowerButtonMobile
              icon={<MdOutlineLogin className="w-full h-full" />}
              text="Iniciar sesión"
              link="/login/user"
            />
          </>
        ) : (
          <>
            <LowerButtonMobile
              icon={<MdOutlineShoppingBag className="w-full h-full" />}
              text="Mis compras"
              link="/user/purchases"
            />
            <LowerButtonMobile
              icon={<BsPersonCircle className="w-full h-full" />}
              text="Mi cuenta"
              link="/user"
            />
            <LowerButtonMobile
              icon={<MdOutlineLogout className="w-full h-full" />}
              text="Cerrar sesión"
              onClick={() => logOut()}
            />
          </>
        )}
        <div className="mx-4 my-2 border-t border-gray-300" />
        <LowerButtonMobile
          icon={<MdHelpOutline className="w-full h-full" />}
          text="Ayuda"
          link="/faq"
        />
        <LowerButtonMobile
          icon={<MdOutlinePhone className="w-full h-full" />}
          text="Contacto"
          link="/contact"
        />
      </div>
      <div className={`w-full h-2 bg-dewalt block xl:hidden transition-all`} />
      <div className="w-full h-9 bg-dewalt hidden xl:block">
        <nav className="sm:w-full xl:w-content-max-width h-full mx-auto flex justify-start">
          <LowerButton text="Categorías" subMenu={subMenu} />
          <LowerButton text="Ofertas" link="/catalogue/offers" /> {/* //TODO: Pagina de ofertas*/}
          <LowerButton text="Seguí tu pedido" link="/track" />
          {/* //TODO: Pagina de tracking */}
          <div className="grow flex justify-end">
            <LowerButton text="Ayuda" link="/faq" />
            {/* //TODO: Pagina de ayuda*/}
            <LowerButton text="Contacto" link="/contact" />
            {/* //TODO: Pagina de contacto*/}
          </div>
        </nav>
      </div>
    </header>
  );
}

function LowerButtonMobile({ icon, text, link, onClick, subMenu }) {
  const Tag = link !== undefined ? Link : "button";
  return (
    <Tag
      to={link ?? ""}
      onClick={onClick ?? ""}
      className="w-full h-12 bg-black flex items-center pl-4 text-gray-300 hover:bg-neutral-900 hover:text-white"
    >
      <div className="w-6 aspect-square mr-4">{icon}</div>
      <span className="">{text}</span>
    </Tag>
  );
}

function LowerButton({ text, link, subMenu }) {
  const Tag = link !== undefined ? Link : "div";
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
