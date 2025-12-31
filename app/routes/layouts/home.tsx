import { Outlet } from 'react-router'
import Hero from '~/components/Hero'

export default function HomeLayout() {
  return (
    <>
      <Hero name="Nathan" />
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
      </section>
    </>
  )
}
