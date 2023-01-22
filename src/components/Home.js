import Carousel from "./utils/Carousel";

function Home() {
  return (
    <div className="flex justify-center">
      <section className="w-full h-[640px] overflow-hidden">
        <Carousel
          images={[
            "https://source.unsplash.com/random/1920x640?workers",
            "https://source.unsplash.com/random/1920x640?building",
            "https://source.unsplash.com/random/1920x640?tools",
            "https://source.unsplash.com/random/1920x640?dewalt",
          ]}
        />
      </section>
    </div>
  );
}

export default Home;
