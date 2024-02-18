import { auth } from '../../auth'

async function Home() {
  const session = await auth()

  console.table(session)

  return <article>top page</article>
}

export default Home
