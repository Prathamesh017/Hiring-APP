'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { ApolloProvider } from '@apollo/client'
import client from './apollo-client'

const inter = Inter({ subsets: ['latin'] })

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ApolloClientProvider>
        <body className={inter.className}>{children}</body>
      </ApolloClientProvider>
    </html>
  )
}
