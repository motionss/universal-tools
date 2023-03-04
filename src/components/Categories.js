import Card from "./utils/Card";

function Categories() {
  return (
    <section className="w-full bg-white">
      <div className="w-content-max-width mx-auto text-black">
        <img
          src="herramientas-banner.webp"
          className="w-full h-32 object-cover select-none"
          alt="Banner Herramientas"
        />
        <h1 className="w-max mx-auto my-3">LA CALIDAD MÁS ALTA EN HERRAMIENTAS</h1>
        <div className="w-[500px] mx-auto h-[1px] mb-6 bg-neutral-300" />
        <div className="pt-10 pb-6">
          <p className="mb-4 font-sans-condensed text-black text-4xl font-bold">
            CATEGORÍAS POPULARES
          </p>
          <div className="flex justify-around gap-6">
            <Card
              img="https://bynder.sbdinc.com/m/35fdf9cc01fd1f62/Drupal_Small-DWHT0-20544_2.jpg"
              title="Herramientas Manuales"
              link="/catalogue?q=manuales"
            />
            <Card
              img="https://bynder.sbdinc.com/m/340b7afb8bca1ec9/Drupal_Small-DCD795P2_F1.jpg"
              title="Herramientas Eléctricas"
              link="/catalogue?q=electricas"
            />
            <Card
              img="https://bynder.sbdinc.com/m/87add7bcfcef6d95/Drupal_Small-DT99560_1.jpg"
              title="Accesorios e Insumos"
              link="/catalogue?q=accesorios"
            />
            <Card
              img="https://www.dewalt.es/EMEA/PRODUCT/IMAGES/HIRES/DCB184G-XJ/DCB184G_1.jpg?resize=530x530"
              title="Baterías y Cargadores"
              link="/catalogue?q=baterias"
            />
          </div>
        </div>
        <div className="w-full h-40 my-6 flex gap-6">
          <div
            className="h-full grow basis-0 p-3 border border-neutral-400 
                       flex justify-center items-center hover:shadow-lg transition-all duration-300"
          >
            <p className="text-lg">Comprá tranquilo</p>
          </div>

          <div
            className="h-full grow basis-0 p-3 border border-neutral-400 
                       flex justify-center items-center hover:shadow-lg transition-all duration-300"
          >
            <p className="text-lg">Envíos a todo el país</p>
          </div>
        </div>
        <div className="pt-10 pb-6">
          <p className="mb-4 font-sans-condensed text-black text-4xl font-bold">
            LAS MEJORES MARCAS
          </p>
          <div className="flex justify-around gap-6 pb-12">
            <Card square={true} img="dewalt.png" link="/catalogue?br=dewalt" />
            <Card square={true} img="stanley.png" link="/catalogue?br=stanley" />
            <Card square={true} img="cat.webp" link="/catalogue?br=cat" />
          </div>
        </div>
        <div className="pb-6">
          <p className="mb-4 font-sans-condensed text-black text-3xl">Todas las categorías</p>
          <p>TODO: Mostrar todas las categorías</p>
        </div>
      </div>
    </section>
  );
}

export default Categories;
