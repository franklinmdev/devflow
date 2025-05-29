import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="z-50 fixed flex-between gap-5 shadow-light-300 dark:shadow-none p-6 sm:px-12 w-full background-light900_dark200">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          alt="DevOverflow Logo"
          width={23}
          height={23}
        />
        <p className="max-sm:hidden font-space-grotesk text-dark-100 dark:text-light-900 h2-bold">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <Theme />
        {session?.user ? (
          <UserAvatar
            id={session.user.id!}
            name={session.user.name!}
            imageUrl={session.user?.image || undefined}
          />
        ) : null}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
