"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import React from "react";

const ThemeProvider = ({
  children,
  ...props
}: React.PropsWithChildren<ThemeProviderProps>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
