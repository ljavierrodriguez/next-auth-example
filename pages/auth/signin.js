import { getCsrfToken, getProviders, signIn } from 'next-auth/client'
import { useEffect } from 'react';

export default function SignIn({ providers, csrfToken }) {

  return (
    <>
    <form method='post' action='https://3000-yellow-vole-8b5qljo7.ws-us09.gitpod.io//api/auth/callback/credentials'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
      <label>
        Username
        <input name='email' type='email' placeholder="email"/>
      </label>
      <label>
        Password
        <input name='password' type='password' placeholder="********"/>
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
export async function getServerSideProps(context){
  const providers = await getProviders()
  return {
    props: { 
        providers, 
        csrfToken: await getCsrfToken(context),
    }
  }
}