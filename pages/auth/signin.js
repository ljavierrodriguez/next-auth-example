import { csrfToken, getCsrfToken, getProviders, getSession, providers, signIn } from 'next-auth/client'

export default function SignIn({ providers, csrfToken }) {

  return (
    <>
      <form method='post' action='/api/auth/callback/credentials'>
        <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
        <label>
          Username
          <input name='email' type='email' placeholder="email" />
        </label>
        <label>
          Password
          <input name='password' type='password' placeholder="********" />
        </label>
        <button type='submit'>Sign in</button>
      </form>
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    }
  }
}

