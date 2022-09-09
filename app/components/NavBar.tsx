import { FunctionalComponent } from "preact";
import PropsWithUser from "@/schemas/PropsWithUser.ts";
import UserAvatarButton from "../islands/UserAvatarButton.tsx";

const NavBar: FunctionalComponent<PropsWithUser> = ({ user }) => {
  {/* TODO: setup tailwind config with theme colors */}
  return (
    <nav
      class="relative bg-[#56BC58] border-gray-200 px-2 sm:px-4 py-2.5 flex justify-between"
    >
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <a href="/" class="flex items-center">
          <svg
            class="mr-3 h-6 sm:h-9"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 41.53"
          >
            <g id="icon">
              <path
                fill="#000000"
                id="marker"
                d="M30.73,15.36c0,8.49-15.37,26.17-15.37,26.17S0,23.85,0,15.36a15.37,15.37,0,0,1,30.73,0Z"
              />
              <g id="lines">
                <rect
                  fill="#FFFFFF"
                  x="7.78"
                  y="8.41"
                  width="15.16"
                  height="3.69"
                  rx="1.84"
                />
                <rect
                  fill="#FFFFFF"
                  x="7.78"
                  y="15.02"
                  width="8.89"
                  height="3.69"
                  rx="1.84"
                />
                <rect
                  fill="#FFFFFF"
                  x="7.78"
                  y="21.62"
                  width="3.69"
                  height="3.69"
                  rx="1.84"
                />
              </g>
            </g>
          </svg>
          <span
            class="self-center text-xl font-semibold whitespace-nowrap"
          >
            FRESH SPOTS
          </span>
        </a>
      </div>
      {user && <UserAvatarButton user={user} />}
    </nav>
  );
};

export default NavBar;
