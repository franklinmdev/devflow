import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { auth } from "@/auth";
import GlobalSearch from "@/components/search/GlobalSearch";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/UserAvatar";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="z-50 fixed flex justify-between items-center gap-3 sm:gap-5 shadow-light-300 dark:shadow-none p-4 sm:p-6 sm:px-12 w-full background-light900_dark200">
      <Link href="/" className="flex flex-shrink-0 items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          alt="DevOverflow Logo"
          width={23}
          height={23}
          style={{ width: "23px", height: "auto" }}
        />
        <p className="max-sm:hidden font-space-grotesk text-dark-100 dark:text-light-900 h2-bold">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <div className="flex-1 mx-2 sm:mx-4 min-w-0 max-w-[600px]">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-3 md:px-4 rounded-[8px] sm:rounded-[10px] min-h-[40px] sm:min-h-[48px] md:min-h-[56px] background-light800_darkgradient">
              <Skeleton className="flex-shrink-0 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
              <Skeleton className="flex-1 h-2 sm:h-3 md:h-4" />
            </div>
          }
        >
          <GlobalSearch />
        </Suspense>
      </div>

      <div className="flex flex-shrink-0 items-center gap-3 sm:gap-5">
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
