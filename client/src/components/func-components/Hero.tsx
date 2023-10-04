import HeroImg from "../../assets/heroImg.png";

const Hero = () => {
  return (
    <div className="px-5 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="sm:pt-32 lg:pt-52 pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[50px]">
            <div className="max-w-[720px] flex flex-col min-[320px]:items-center min-[320px]:gap-4 md:gap-5 md:items-start lg:gap-2">
              <div className="mb-6">
                <h1 className="font-bold text-4xl md:text-6xl">
                  Optimize Your Medical Needs
                  <br />
                  With{" "}
                  <span
                    className="inline-block bg-auto bg-[50%_100%] bg-no-repeat pb-5"
                    style={{
                      backgroundImage:
                        "url('https://assets.website-files.com/64e30fb523cefa79f1c3f08f/64e34703019f31054e880eb2_underline.svg')",
                    }}
                  >
                    Medlify
                  </span>
                </h1>
              </div>
              <div className="mb-6 sm:mb-10">
                <p className="text-xl font-semibold text-[#575757]">
                  Resonating HealthCare Solutions
                </p>
              </div>
              <div className="flex items-center justify-start gap-4 flex-wrap mb-6 sm:mb-10 ">
                <a
                  href="#"
                  className="inline-block cursor-pointer rounded-[60px] border border-solid border-[#5fbfc6] bg-[#07133b] px-6 text-center font-bold text-white transition hover:border-[#5fbfc6] hover:bg-[#5fbfc6] py-3"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="relative flex items-center self-center">
              <img
                src={HeroImg}
                alt=""
                className="mx-auto inline-block w-full max-w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
