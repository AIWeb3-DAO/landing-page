"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { client } from "@/graphql/client"
import { ApolloProvider } from "@apollo/client"
import { UserContextProvider } from "./UserContext"
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ApolloProvider client={client}>
  <NextThemesProvider {...props}>
    <UserContextProvider>
    {children}
    </UserContextProvider>
    </NextThemesProvider>
    </ApolloProvider>
  )
}
