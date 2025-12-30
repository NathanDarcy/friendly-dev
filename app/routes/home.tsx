import Hero from '~/components/Hero'

export default function Home() {
  // const now = new Date().toISOString()

  // if (typeof window === 'undefined') {
  //   // on server, window only exists in client
  //   console.log('server render at', now)
  // } else {
  //   console.log('client hydration at', now)
  // }

  return (
    <section>
      <Hero name="Nathan" />
    </section>
  )
}
