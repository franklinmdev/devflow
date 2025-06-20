import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          style={{ width: "36px", height: "auto" }}
          alt="Menu"
          className="sm:hidden invert-colors cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-4 border-none background-light900_dark200"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            style={{ width: "23px", height: "auto" }}
            alt="Logo"
          />

          <p className="font-space-grotesk text-dark-100 dark:text-light-900 h2-bold">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <SheetClose asChild>
            <section className="flex flex-col gap-6 pt-16 h-full">
              <NavLinks isMobileNav userId={userId} />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    type="submit"
                    className="!bg-transparent px-4 py-3 w-fit cursor-pointer base-medium"
                  >
                    <LogOutIcon className="size-5 text-black dark:text-white" />
                    <span className="text-dark300_light700">Logout</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="shadow-none px-4 py-3 rounded-lg w-full min-h-[41px] small-medium btn-secondary">
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button className="shadow-none px-4 py-3 border light-border-2 rounded-lg w-full min-h-[41px] text-dark400_light900 small-medium btn-tertiary">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
