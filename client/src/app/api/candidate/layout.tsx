import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Geeks',
  description: 'A Hiring App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className={inter.className}>
        <Header></Header>
        {children}
      </section>
    </>
  )
}
