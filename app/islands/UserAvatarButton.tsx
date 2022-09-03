/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, FunctionComponent, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { tw } from "@twind";

import PropsWithUser from "@/schemas/PropsWithUser.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";

function getSocialProfile(user: UserWithSocialProfiles) {
  // TODO: set preffered social profile after login
  return user.social_profiles[0];
}

const UserAvatarButton: FunctionComponent<PropsWithUser> = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    const blurListener = () => {
      setShowDropdown(false);
    };
    const focusListener = () => {
      setShowDropdown(true);
    };
    if (buttonRef.current) {
      (buttonRef.current as HTMLDivElement).addEventListener('focusout', blurListener);
      (buttonRef.current as HTMLDivElement).addEventListener('focusin', focusListener);
    }
    () => {
      if (buttonRef.current) {
        (buttonRef.current as HTMLDivElement).removeEventListener('focusout', blurListener);
        (buttonRef.current as HTMLDivElement).removeEventListener('focusin', focusListener);
      }
    }
  }, []);

  if (!user) return null;
  const socialProfile = getSocialProfile(user);
  return (
    <div ref={buttonRef} tabIndex={1}>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        class={tw(
          "text-white focus:ring-[#202030] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center flex justify-center items-center gap-2",
        )}
        type="button"
      >
        <div>
          {user.display_name}
        </div>
        <div>
          <div
            class={tw(
              "inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600",
            )}
          >
            {socialProfile
              ? (
                <img
                  class={tw`w-10 h-10 p-1 rounded`}
                  src={socialProfile.avatar_url}
                  alt={socialProfile.username}
                />
              )
              : (
                <span
                  class={tw("font-medium text-gray-600 dark:text-gray-300")}
                >
                  {user.display_name[0].toUpperCase()}
                </span>
              )}
          </div>
        </div>
        <svg
          class={tw`ml-2 w-4 h-4 transition transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          >
          </path>
        </svg>
      </button>
      <div
        id="dropdown"
        class={tw(
          `${showDropdown ? '' : 'hidden'} absolute mt-2 right-4 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`,
        )}
      >
        <ul
          class={tw("py-1 text-sm text-gray-700 dark:text-gray-200")}
          aria-labelledby="dropdownDefault"
        >
          <li>
            <a
              href="/logout"
              class={tw(
                "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
              )}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserAvatarButton;
