import Carousel from "./utils/Carousel";

function Home() {
  return (
    <div className="w-full">
      <section className="w-full h-[640px] overflow-hidden">
        <Carousel
          images={[
            "https://ar.dewalt.global/sites/ar.dewalt.global/files/2022-02/xDW_PowerStack_Unveil_WebBanner_0.png.pagespeed.ic.-5Fgr6ec02.webp",
            "https://ar.dewalt.global/sites/ar.dewalt.global/files/2021-01/xDW-Trade-Banner.jpg.pagespeed.ic.oo4Kyo2svA.webp",
            "https://ar.dewalt.global/sites/ar.dewalt.global/files/2020-07/xDEWALT-Web-Banner-Group-2-SP_0.jpg.pagespeed.ic.DMIn_pnHHI.webp",
            "https://ar.dewalt.global/sites/ar.dewalt.global/files/2020-03/xImage-DW_2000x600_0.jpg.pagespeed.ic.1rU-mJbsW0.webp",
          ]}
        />
      </section>
      <section className="w-full bg-white">
        <div className="w-content-max-width mx-auto">
          <div className="pt-20 pb-4">
            <h2 className="font-sans-condensed text-black text-4xl font-bold select-none">
              CATEGORÍAS DESTACADAS
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
      href="#"
    >
      <div className="max-w-full h-3/4 overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-full object-contain group-hover:brightness-110 transition-all duration-300"
          src={link}
          draggable="false"
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
