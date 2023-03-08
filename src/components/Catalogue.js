import { MdSearchOff, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BsGrid, BsList, BsPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

import result from "../test";
import { useEffect, useMemo, useState } from "react";

import Dropdown from "./utils/Dropdown";

function Catalogue() {
  let { search } = useParams();
  search = search !== undefined ? search.replaceAll("-", " ") : search;

  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);

  const [sortBy, setSortBy] = useState("relevant");
  const [view, setView] = useState("list");

  useEffect(() => {
    setData(null);
    (async () => {
      // TODO: Llamar a la api para buscar productos
      await new Promise((r) => setTimeout(r, 1500));
      setData(result);
    })();
  }, [search]);

  useMemo(() => {
    if (!data) return;

    console.log(sortBy);

    setProducts(
      data.products.sort((a, b) => {
        console.log(sortBy);
        switch (sortBy) {
          default:
          case "relevant":
            return a.purchases < b.purchases ? 1 : a.purchases > b.purchases ? -1 : 0;
          case "price_asc":
            var aPrice = a.offerPrice ?? a.normalPrice;
            var bPrice = b.offerPrice ?? b.normalPrice;
            return aPrice < bPrice ? -1 : aPrice > bPrice ? 1 : 0;
          case "price_desc":
            aPrice = a.offerPrice ?? a.normalPrice;
            bPrice = b.offerPrice ?? b.normalPrice;
            return aPrice < bPrice ? 1 : aPrice > bPrice ? -1 : 0;
        }
      })
    );
  }, [data, sortBy]);

  return (
    <section className="w-full grow bg-pagebg">
      <div className="w-content-max-width pt-6 mx-auto flex text-black">
        {search !== undefined ? (
          <>
            <div className="h-max w-80">
              <div className="mb-8">
                <span className="text-sm text-neutral-600">RESULTADOS PARA:</span>
                <p className="mb-2 text-2xl font-semibold overflow-visible">
                  {CapitalizeFirstLetter(search)}
                </p>
                {data ? (
                  <span className="text-sm text-neutral-600">
                    {result.products.length} productos
                  </span>
                ) : (
                  ""
                )}
              </div>
              {data ? (
                <div className="mb-8">
                  <span className="block mb-2 font-semibold">Categorías</span>
                  <ul className="text-sm flex flex-col gap-1 text-neutral-600">
                    <li>
                      <button>Herramientas manuales</button>
                    </li>
                    <li>
                      <button>Herramientas eléctricas</button>
                    </li>
                    <li>
                      <button>Herramientas de jardín</button>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="h-max grow flex flex-col">
              {data ? (
                <>
                  <div className="w-full h-14 p-2 mb-2 bg-white border border-gray-300 rounded-md shadow-sm flex justify-between">
                    <div className="flex items-center">
                      <span className="px-2 pb-[1px] font-semibold">Ordenar por</span>
                      <div className="w-52 h-full">
                        <Dropdown
                          items={[
                            { name: "Más vendidos", value: "relevant" },
                            { name: "Menor precio", value: "price_asc" },
                            { name: "Mayor precio", value: "price_desc" },
                          ]}
                          title="Ordenar por"
                          onChange={(v) => setSortBy(v.value)}
                        />
                      </div>
                    </div>
                    <div className="h-full flex gap-2">
                      <button
                        type="button"
                        title="Ver en cuadrícula"
                        className={`h-full aspect-square rounded-md border ${
                          view === "grid"
                            ? "text-dewalt border-dewalt"
                            : "text-gray-500 border-gray-300 hover:border-gray-500"
                        } transition-all shadow-sm`}
                        onClick={() => setView("grid")}
                      >
                        <BsGrid className="w-full h-full p-2" />
                      </button>
                      <button
                        type="button"
                        title="Ver en lista"
                        className={`h-full aspect-square rounded-md border ${
                          view === "list"
                            ? "text-dewalt border-dewalt"
                            : "text-gray-500 border-gray-300 hover:border-gray-500"
                        } transition-all shadow-sm`}
                        onClick={() => setView("list")}
                      >
                        <BsList className="w-full h-full p-2" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`w-full h-max mb-12 ${
                      view === "list" ? "bg-white border border-gray-300 rounded-md shadow-sm" : ""
                    }`}
                  >
                    {view === "grid"
                      ? Array(Math.ceil(products.length / 3))
                          .fill("")
                          .map((_, i) => (
                            <div
                              className={`${
                                view === "grid" ? "w-full h-max mb-2 flex justify-between" : ""
                              }`}
                            >
                              {products.slice((i + 1) * 3 - 3, (i + 1) * 3).map((v, i) => (
                                <Product
                                  info={{
                                    id: v.id,
                                    title: v.title,
                                    normalPrice: v.normalPrice,
                                    offerPrice: v.offerPrice,
                                    brand: result.brands.find((b) => b.id === v.brandId),
                                    img: v.img,
                                    receivedFavorite: v.favorite,
                                  }}
                                  view={view}
                                  key={i}
                                />
                              ))}
                            </div>
                          ))
                      : products.map((v, i) => (
                          <Product
                            info={{
                              id: v.id,
                              title: v.title,
                              normalPrice: v.normalPrice,
                              offerPrice: v.offerPrice,
                              brand: result.brands.find((b) => b.id === v.brandId),
                              img: v.img,
                              receivedFavorite: v.favorite,
                            }}
                            view={view}
                            key={i}
                          />
                        ))}
                  </div>
                </>
              ) : (
                <div
                  className="w-full py-10 bg-white border border-gray-300 
                             flex justify-center items-center rounded-md shadow-sm"
                >
                  <img src="/loading.svg" className="w-16 h-16" alt="Loading" />
                  <span className="ml-4 text-xl font-light">Buscando productos...</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full py-16 bg-white text-black flex flex-col justify-start items-center rounded-md shadow-md">
            <MdSearchOff className="w-32 h-32 text-gray-300" />
            <p className="mt-3 text-xl">
              {result.products.length === 0
                ? "No se encontraron productos que coincidan con tu búsqueda."
                : "Usá el buscador de arriba para encontrar lo que querés."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Product({ info, view }) {
  const { id, title, normalPrice, offerPrice, brand, img, receivedFavorite } = info;
  const productLink = `/product/${encodeURIComponent(`${id}-${title.replaceAll(" ", "-")}`)}`;
  const brandSearchLink = `/catalogue/${brand.name.toLowerCase()}`;

  const [favorite, setFavorite] = useState(receivedFavorite);

  const updateFavorite = () => {
    // TODO: Actualizar favorito en bd por api
    setFavorite(!favorite);
  };

  return (
    <div
      className={`${
        view === "grid"
          ? "w-[314px] h-[500px] bg-white rounded-md shadow-sm border border-gray-300 hover:shadow-xl hover:drop-shadow-xl flex flex-col transition-all"
          : "w-full h-52 p-4 border-t border-neutral-300 first:border-t-0 flex"
      } relative group`}
    >
      <Link
        to={productLink}
        className={
          view === "grid" ? "w-full p-2 aspect-square border-b border-gray-300" : "w-48 h-full"
        }
      >
        <img className="w-full h-full object-contain" src={img} alt={title} />
      </Link>
      <div
        className={`${
          view === "grid" ? "w-full h-full p-4" : "w-0 grow-[8] h-full pl-4"
        } flex flex-col`}
      >
        <Link
          to={productLink}
          className={`mb-2 ${
            view === "grid" ? "text-sm" : "text-xl pr-8"
          } w-full font-light hyphens-none line-clamp-2`}
        >
          {title}
        </Link>
        {offerPrice !== null ? (
          <p className="text-sm font-light">
            <del>{FormatPrice(normalPrice)}</del>
          </p>
        ) : (
          ""
        )}
        <Link to={productLink} className="flex items-center">
          <span className="text-2xl">{FormatPrice(offerPrice ?? normalPrice)}</span>
          {offerPrice !== null ? (
            <span className="ml-3 text-green-600">{`${Math.round(
              ((normalPrice - offerPrice) / normalPrice) * 100
            )}% OFF`}</span>
          ) : (
            ""
          )}
        </Link>
        <div className={`${view === "grid" ? "w-full h-0" : "w-max"} grow flex items-end`}>
          <button
            type="button"
            className="h-8 p-4 pl-2 bg-dewalt border border-gray-300 hover:border-gray-500 shadow-sm hover:shadow-md
                       flex items-center rounded-md transition-all"
          >
            <BsPlus className="w-6 h-6 mr-2" />
            <span className="text-sm font-semibold">Añadir al carrito</span>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="absolute top-0 right-0 w-6 h-6 m-4 text-dewalt opacity-0 pointer-events-none 
                   group-hover:opacity-100 group-hover:pointer-events-auto transition-all
                   before:absolute before:-top-1/4 before:-left-1/4 before:w-[150%] before:h-[150%]
                   before:bg-white before:bg-opacity-50 before:rounded-3xl"
        onClick={updateFavorite}
      >
        <MdFavoriteBorder className="relative w-full h-full" />
        <MdFavorite
          className={`absolute w-full h-full top-0 left-0 ${
            favorite ? "p-0" : "p-4"
          } transition-all duration-300`}
        />
      </button>
      <div className="absolute right-0 bottom-0 w-max h-max m-4 flex flex-col justify-end items-end">
        <Link
          to={brandSearchLink}
          title={brand.name}
          className="w-20 h-20 p-2 rounded-md border border-gray-300 hover:border-gray-500 
                     shadow-sm hover:shadow-md transition-all"
        >
          <img className="w-full h-full object-contain" src={brand.img} alt={brand} />
        </Link>
      </div>
    </div>
  );
}

function FormatPrice(price) {
  return "$ " + price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

function CapitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Catalogue;
