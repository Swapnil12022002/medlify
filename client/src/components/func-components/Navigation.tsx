import * as React from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import SignUp from "./Signup";
import SignUpFromLogin from "./SignUpFromLogin";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { selectTheme, toggleTheme } from "@/state/reducers/themeReducer";
import {
  selectUserValues,
  userLogOutAction,
} from "@/state/reducers/userReducer";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { BsLightbulb } from "react-icons/bs";
import { Outlet } from "react-router";

const darkNavigationMenuTrigger =
  "text-white group inline-flex h-9 w-max items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-accent-foreground hover:text-accent focus:bg-accent-foreground focus:text-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent-foreground/50 data-[state=open]:bg-accent-foreground/50";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Medicines",
    href: "/medicines",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useAppSelector(selectTheme);
  const userValues = useAppSelector(selectUserValues);
  const { user } = userValues;
  const dispatch = useAppDispatch();
  const [signUpFromLogin, setAuthSignUpFromLogin] =
    React.useState<boolean>(false);
  const handleSignUpFromLogin = () => {
    setAuthSignUpFromLogin(!signUpFromLogin);
  };
  React.useEffect(() => {
    if (user) {
      navigate("/map");
    } else {
      navigate(`${location.pathname}`);
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full h-[50px]">
        <div className="pl-0 sm:pl-2 md:pl-3 lg:pl-5">
          <h3
            className={`${
              theme ? "text-white" : ""
            } scroll-m-20 text-2xl font-semibold tracking-tight`}
          >
            MEDLIFY
          </h3>
        </div>
        <div className="min-[320px]:hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={
                    theme
                      ? "text-white bg-foreground hover:bg-accent-foreground hover:text-accent focus:bg-accent-foreground focus:text-accent data-[active]:bg-accent-foreground/50 data-[state=open]:bg-accent-foreground/50"
                      : ""
                  }
                >
                  Getting started
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={
                    theme
                      ? "text-white bg-foreground hover:bg-accent-foreground hover:text-accent focus:bg-accent-foreground focus:text-accent data-[active]:bg-accent-foreground/50 data-[state=open]:bg-accent-foreground/50"
                      : ""
                  }
                >
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/dashboard">
                  <NavigationMenuLink
                    className={
                      theme
                        ? darkNavigationMenuTrigger
                        : navigationMenuTriggerStyle()
                    }
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="cursor-pointer"
                  onClick={() => dispatch(toggleTheme())}
                >
                  {!theme ? (
                    <MdDarkMode size={20} />
                  ) : (
                    <BsLightbulb size={20} className="text-white" />
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {!user ? (
          <div className="flex flex-row md:gap-[0.5px] lg:gap-4 pr-0 sm:pr-2 md:pr-3 lg:pr-5 min-[320px]:hidden md:block">
            <Login onHandleSignUp={handleSignUpFromLogin}>Login</Login>
            <SignUpFromLogin
              onSignUp={signUpFromLogin}
              onHandleSignUp={handleSignUpFromLogin}
            >
              Sign up
            </SignUpFromLogin>
            <SignUp>Sign up</SignUp>
          </div>
        ) : (
          <div className="flex flex-row md:gap-[0.5px] lg:gap-4 pr-0 sm:pr-2 md:pr-3 lg:pr-5 min-[320px]:hidden md:block">
            <Button
              variant={theme ? "darkGhost" : "ghost"}
              className={theme ? "text-white" : ""}
              onClick={() => dispatch(userLogOutAction({}))}
            >
              Log Out
            </Button>
          </div>
        )}
        <div className="md:hidden pr-0 sm:pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <GiHamburgerMenu size={23} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Outlet />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
