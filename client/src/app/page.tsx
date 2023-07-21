import Header from './components/Header'
import Jobs from './components/Jobs'
import Main from './components/Main'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Tech Geeks',
  description: 'A Hiring App',
}
export default function Home() {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <Jobs></Jobs>
    </>
  )
}
