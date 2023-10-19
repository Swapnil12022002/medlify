const Header = () => {
  return (
    <header className="block ">
      <div className="px-5 py-16 md:px-7 md:py-10 lg:py-[50px]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
          <div className="mb-3 max-w-[720px] md:mb-4 lg:mb-5 lg:max-w-[800px]">
            <h1 className="mb-10 text-4xl font-bold md:text-6xl">
              Search For Hospitals Nearby
            </h1>
            <div className="mx-auto max-w-[630px]">
              <p className="text-[#7c8aaa]">
                Lorem ipsum dolor sit amet consectetur adipiscing
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
