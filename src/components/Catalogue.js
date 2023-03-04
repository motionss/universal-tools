import React from "react";
import { useSearchParams } from "react-router-dom";

function Catalogue() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("s").replaceAll("-", " ");
  return (
    <section className="w-full grow bg-white">
      <div className="w-content-max-width pt-6 mx-auto flex text-black">
        <div className="h-max w-80">
          <div className="mb-8">
            <span className="text-sm text-neutral-600">RESULTADOS PARA:</span>
            <p className="mb-2 text-2xl font-semibold overflow-visible">
              {CapitalizeFirstLetter(search)}
            </p>
            <span className="text-sm text-neutral-600">20 productos</span>
          </div>
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
        </div>
        <div className="h-max grow flex flex-col">
          <div className="w-full h-14 mb-2 border border-black"></div>
          <div className="w-full h-max mb-12">
            <Product
              info={{
                title: "Set Juego De Llaves Y Puntas 108 Pzas DeWalt",
                normalPrice: 48000,
                offerPrice: 24000,
                brand: "dewalt",
                img: "https://http2.mlstatic.com/D_NQ_NP_703898-MLA53735145430_022023-O.webp",
              }}
            />
            <Product
              info={{
                title: "Juego 12 Llaves Combinadas Acodadas Stanley Stmt97569",
                normalPrice: 17900,
                offerPrice: null,
                brand: "stanley",
                img: "https://http2.mlstatic.com/D_NQ_NP_924588-MLA53604773769_022023-O.webp",
              }}
            />
            <Product
              info={{
                title: "Amoladora angular DeWalt DWE4010 de 50 Hz amarilla 700 W 220 V + accesorio",
                normalPrice: 48000,
                offerPrice: null,
                brand: "dewalt",
                img: "https://http2.mlstatic.com/D_NQ_NP_984542-MLA46237611933_062021-O.webp",
              }}
            />
            <Product
              info={{
                title: "Amoladora angular DeWalt DWE4010 de 50 Hz amarilla 700 W 220 V + accesorio",
                normalPrice: 40680,
                offerPrice: 33900,
                brand: "dewalt",
                img: "https://http2.mlstatic.com/D_NQ_NP_641184-MLA40777149261_022020-O.webp",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Product({ info }) {
  const { title, normalPrice, offerPrice, brand, img } = info;
  return (
    <div className="w-full h-52 py-4 flex border-t border-neutral-300 first:border-t-0">
      <img className="h-full w-48 object-contain" src={img} />
      <div className="w-0 grow-[8] h-full pl-4">
        <p className="mb-2 text-xl font-light hyphens-none">{title}</p>
        {offerPrice !== null ? (
          <p className="text-sm font-light">
            <del>{FormatPrice(normalPrice)}</del>
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center">
          <span className="text-3xl">{FormatPrice(offerPrice ?? normalPrice)}</span>
          {offerPrice !== null ? (
            <span className="ml-3 text-green-600">{`${Math.round(
              ((normalPrice - offerPrice) / normalPrice) * 100
            )}% OFF`}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-0 grow h-full flex justify-center items-end">
        <img className="w-16 h-16 object-contain" src={brand + ".png"} />
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
