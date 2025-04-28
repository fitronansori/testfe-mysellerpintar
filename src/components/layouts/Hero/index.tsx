import Image from "next/image";
import Header from "../Header";
import ArticleSearch from "./ArticleSearch";

const Hero = () => {
  return (
    <section className="relative h-[624px] md:h-[500px]">
      <Image
        src={"/images/hero.jpg"}
        alt="hero"
        width={1920}
        height={1277}
        className="absolute inset-0 overflow-hidden -z-20 size-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-primary opacity-85 -z-10"></div>
      <Header />
      <div className="size-full text-white flex items-center justify-center">
        <div className="max-w-[730px] px-5 sm:px-0 flex flex-col items-center justify-center gap-10 text-center">
          <div className="space-y-3">
            <h2 className="text-sm md:text-base font-bold leading-6">
              Blog genzet
            </h2>
            <h3 className="text-4xl md:text-5xl leading-12 font-medium">
              The Journal : Design Resources, Interviews, and Industry News
            </h3>
            <p className="text-xl md:text-2xl leading-8">
              Your Daily dose of design insight!
            </p>
          </div>

          <ArticleSearch />
        </div>
      </div>
    </section>
  );
};
export default Hero;
