import { FunctionalComponent } from "preact";
import PropsWithUser from "@/schemas/PropsWithUser.ts";
import UserAvatarButton from "../islands/UserAvatarButton.tsx";

const NavBar: FunctionalComponent<PropsWithUser> = ({ user }) => {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style={{ background: "var(--bs-green)" }}
    >
      <div class="container-fluid">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a class="navbar-brand flex items-center" href="/">
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
            <h4 class="mb-0 self-center text-xl whitespace-nowrap">
              FRESH SPOTS
            </h4>
          </a>
          {user && <UserAvatarButton user={user} />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
