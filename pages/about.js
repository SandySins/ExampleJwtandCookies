import Head from 'next/head'
import Cookie from 'js-cookie'
const about = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <h1>About:{Cookie.get("_wsp")}</h1>
    </div>
  )
}

export default about
