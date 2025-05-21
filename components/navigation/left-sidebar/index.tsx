import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

import NavLinks from "../navbar/nav-links";
const LeftSidebar = async () => {
  const session = await auth();
  return (
    <aside
      className="hidden sm:block bottom-0 left-0 fixed shadow-light100_darknone px-6 pt-10 pb-6 border light-border w-fit h-full background-light900_dark200"
      aria-label="Sidebar"
      role="complementary"
    >
      <div className="flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
        <section className="flex flex-col gap-6 pt-16 h-full">
          <NavLinks />
        </section>
        {!session?.user && (
          <div className="flex flex-col gap-3">
            <Link href={ROUTES.SIGN_IN}>
              <Button className="shadow-none px-4 py-3 rounded-lg w-full min-h-[41px] small-medium btn-secondary">
                <Image
                  src="/icons/account.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="min-lg:hidden invert-colors"
                />
                <span className="hidden min-lg:block primary-text-gradient">
                  Log In
                </span>
              </Button>
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="shadow-none px-4 py-3 border light-border-2 rounded-lg w-full min-h-[41px] text-dark400_light900 small-medium btn-tertiary">
                <Image
                  src="/icons/sign-up.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="min-lg:hidden invert-colors"
                />
                <span className="hidden min-lg:block">Sign Up</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
