import Image from "next/image";
import Link from "next/link";
import React from "react";

import { DEFAULT_EMPTY, DEFAULT_ERROR } from "@/constants/states";

import { Button } from "./ui/button";

interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data?: T[] | null | undefined;
  empty?: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: { light: string; dark: string; alt: string };
  title: string;
  message: string;
  button?: { text: string; href: string };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => {
  return (
    <div className="flex flex-col justify-center items-center mt-16 sm:mt-36 w-full">
      <>
        <Image
          src={image.dark}
          alt={image.alt}
          width={270}
          height={200}
          className="hidden dark:block object-contain"
        />
        <Image
          src={image.light}
          alt={image.alt}
          width={270}
          height={200}
          className="dark:hidden block object-contain"
        />
      </>
      <h2 className="mt-8 text-dark200_light900 h2-bold">{title}</h2>
      <p className="my-3.5 max-w-md text-dark500_light700 text-center body-regular">
        {message}
      </p>
      {button && (
        <Link href={button.href}>
          <Button className="bg-primary-500 hover:bg-primary-500/90 mt-5 px-4 py-3 rounded-lg min-h-[46px] text-light-900 cursor-pointer paragraph-medium">
            {button.text}
          </Button>
        </Link>
      )}
    </div>
  );
};

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: Props<T>) => {
  if (!success)
    return (
      <StateSkeleton
        image={{
          light: "/images/light-error.png",
          dark: "/images/dark-error.png",
          alt: "error-state-illustration",
        }}
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details
            ? JSON.stringify(error.details, null, 2)
            : DEFAULT_ERROR.message
        }
        button={empty.button}
      />
    );

  if (!data || data.length === 0)
    return (
      <StateSkeleton
        image={{
          light: "/images/light-illustration.png",
          dark: "/images/dark-illustration.png",
          alt: "empty-state-illustration",
        }}
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );
  return <React.Fragment>{render(data)}</React.Fragment>;
};

export default DataRenderer;
