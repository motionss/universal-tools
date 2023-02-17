import Carousel from "./utils/Carousel";

function Home() {
  return (
    <div className="w-full">
      <section className="w-full h-[480px] overflow-hidden">
        <Carousel
          images={[
            "https://somosferreteria.cl/wp-content/uploads/2021/09/Banner_Dewalt_2.jpg",
            "https://www.sgs-engineering.com/media/catalog/category/Multi-Tool-Banner-Desktop_1.jpg",
            "https://i.shgcdn.com/d94965d4-7b8c-44b0-b4bc-829ccc5c5750/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
            "https://m.media-amazon.com/images/S/aplus-media/vc/c18fe86f-f3ff-4548-9e34-7f009fdf3406.__CR0,0,970,300_PT0_SX970_V1___.jpg",
          ]}
        />
      </section>
      <section className="w-full bg-white">
        <div className="w-content-max-width mx-auto">
          <div className="pt-20 pb-4">
            <h2 className="font-sans-condensed text-black text-4xl font-bold select-none">
              CATEGORÍAS POPULARES
            </h2>
          </div>
          <div className="flex justify-around gap-6 pb-12">
            <Card
              link="https://bynder.sbdinc.com/m/35fdf9cc01fd1f62/Drupal_Small-DWHT0-20544_2.jpg"
              title="Herramientas Manuales"
            />
            <Card
              link="https://bynder.sbdinc.com/m/340b7afb8bca1ec9/Drupal_Small-DCD795P2_F1.jpg"
              title="Herramientas Eléctricas"
            />
            <Card
              link="https://bynder.sbdinc.com/m/87add7bcfcef6d95/Drupal_Small-DT99560_1.jpg"
              title="Accesorios e Insumos"
            />
            <Card
              link="https://www.dewalt.es/EMEA/PRODUCT/IMAGES/HIRES/DCB184G-XJ/DCB184G_1.jpg?resize=530x530"
              title="Baterías y Cargadores"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ link, title }) {
  return (
    <a
      className="grow w-0 h-[360px] border-solid border border-black border-opacity-40
                 flex flex-col justify-start hover:border-dewalt hover:grow-[1.2] 
                 transition-all duration-300 group"
      href="/"
    >
      <div className="max-w-full h-3/4 overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-full object-contain group-hover:brightness-110 transition-all duration-300"
          src={link}
          draggable="false"
          alt={title}
        ></img>
      </div>
      <div
        className="w-full grow pt-4 items-start text-black text-lg font-bold
                   flex justify-center select-none"
      >
        {title}
      </div>
    </a>
  );
}

export default Home;
