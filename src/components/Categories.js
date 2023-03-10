import Card from "./utils/Card";

function Categories() {
  return (
    <section className="w-full bg-pagebg">
      <img
        src="herramientas-banner.webp"
        className="w-full aspect-[8/1] xl:w-max xl:min-h-32 mx-auto object-cover xl:object-contain select-none"
        alt="Banner Herramientas"
      />
      <div className="w-full xl:w-content-max-width xl:mx-auto text-black">
        <h1 className="w-max mx-auto my-2 xl:my-3 text-xs xl:text-base">
          LA CALIDAD MÁS ALTA EN HERRAMIENTAS
        </h1>
        <div className="w-1/2 xl:w-[500px] mx-auto h-[1px] bg-neutral-300" />
        <div className="px-4 pt-10 xl:px-0 xl:pt-20 pb-2 xl:pb-4">
          <h1 className="font-sans-condensed text-black text-xl xl:text-4xl font-bold">
            CATEGORÍAS POPULARES
          </h1>
        </div>
        <div className="w-full xl:w-full overflow-x-scroll scrollbar-hide">
          <div className="w-[640px] px-4 xl:px-0 xl:w-full h-max flex justify-around gap-2 pb-2">
            <Card
              img="https://bynder.sbdinc.com/m/35fdf9cc01fd1f62/Drupal_Small-DWHT0-20544_2.jpg"
              title="Herramientas Manuales"
              link="/catalogue/herramientas-manuales"
            />
            <Card
              img="https://bynder.sbdinc.com/m/340b7afb8bca1ec9/Drupal_Small-DCD795P2_F1.jpg"
              title="Herramientas Eléctricas"
              link="/catalogue/herramientas-electricas"
            />
            <Card
              img="https://bynder.sbdinc.com/m/87add7bcfcef6d95/Drupal_Small-DT99560_1.jpg"
              title="Accesorios e Insumos"
              link="/catalogue/accesorios-e-insumos"
            />
            <Card
              img="https://www.dewalt.es/EMEA/PRODUCT/IMAGES/HIRES/DCB184G-XJ/DCB184G_1.jpg?resize=530x530"
              title="Baterías y Cargadores"
              link="/catalogue/baterias-y-cargadores"
            />
          </div>
        </div>
        <div className="w-full h-20 xl:h-40 flex gap-2 px-4 xl:px-0">
          <Card title="Comprá tranquilo (img)" grow={false} />
          <Card title="Envíos a todo el país (img)" grow={false} />
        </div>
        <div className="pt-10 pb-6 px-4 xl:px-0">
          <h2 className="pb-2 xl:pb-4 font-sans-condensed text-black text-xl xl:text-4xl font-bold">
            LAS MEJORES MARCAS
          </h2>
          <div className="flex justify-around gap-2 pb-6">
            <Card square={true} img="dewalt.png" link="/catalogue?br=dewalt" />
            <Card square={true} img="stanley.png" link="/catalogue?br=stanley" />
            <Card square={true} img="cat.png" link="/catalogue?br=cat" />
          </div>
        </div>
        <div className="pb-6 px-4 xl:px-0">
          <p className="mb-4 font-sans-condensed text-black text-xl xl:text-3xl">
            Todas las categorías
          </p>
          <p className="text-sm xl:text-base">TODO: Mostrar todas las categorías</p>
        </div>
      </div>
    </section>
  );
}

export default Categories;
