import type { Route } from './+types/home'

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev' },
    { name: 'description', content: 'React Tutorial' },
  ]
}

export default function Home() {
  return <>My App</>
}
