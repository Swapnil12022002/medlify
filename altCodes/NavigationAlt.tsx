import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

const navStyles =
  "px-5 py-2 text-white transition hover:text-[#c9fd02] max-[991px]:block md:px-10 lg:px-4";

const Navigation = () => {
  return (
    <div className="sticky top-0 z-[1000] block bg-black py-3 lg:block">
      <div className="px-5 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl auto-cols-auto grid-cols-[auto_max-content] items-center justify-stretch gap-[0px] lg:grid-cols-[176px_auto]">
          <a
            href="https://www.flowspark.co/"
            target="_blank"
            className="relative float-left text-[#333333] max-[991px]:mr-auto max-[767px]:pl-0"
          >
            <img
              src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26c_%5BA%5D--Navbar%20Brand.png"
              alt=""
              className="inline-block max-h-6 max-w-full"
            />
          </a>
          <nav className="relative float-right flex place-content-between max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:hidden max-[991px]:bg-black max-[991px]:py-1 max-[991px]:text-left">
            <div className="mx-auto flex items-start max-[991px]:flex-col min-[991px]:items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="https://neo-saas.webflow.io/about">
                      <NavigationMenuLink className={navStyles}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="https://neo-saas.webflow.io/pricing">
                      <NavigationMenuLink className={navStyles}>
                        Pricing
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="https://neo-saas.webflow.io/blog">
                      <NavigationMenuLink className={navStyles}>
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="https://build.flowspark.co/">
                      <NavigationMenuLink className={navStyles}>
                        More Templates
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex w-auto flex-none justify-start max-[991px]:mb-4 max-[991px]:ml-10 max-[991px]:mt-3 max-[767px]:ml-5 lg:w-44 lg:justify-end">
              <a
                href="https://build.flowspark.co/template"
                target="_blank"
                className="inline-block cursor-pointer rounded-full border border-solid border-[#c9fd02] bg-white px-5 py-3 text-center font-bold text-black transition hover:border-black hover:bg-[#c9fd02]"
              >
                Get Started
              </a>
            </div>
          </nav>
          <div className="relative float-right hidden cursor-pointer select-none p-3 text-2xl max-[991px]:z-[9999] max-[991px]:-mr-3 max-[991px]:block max-[991px]:text-white lg:p-[18px]">
            <div>
              <svg
                width="1.25rem"
                height="1rem"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H19C19.5523 9 20 8.55228 20 8C20 7.44772 19.5523 7 19 7Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19 0H7C6.44772 0 6 0.447715 6 1C6 1.55228 6.44772 2 7 2H19C19.5523 2 20 1.55228 20 1C20 0.447715 19.5523 0 19 0Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19 14H11C10.4477 14 10 14.4477 10 15C10 15.5523 10.4477 16 11 16H19C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
