import { useSession, signIn, signOut } from "next-auth/react"

const GoogleLogin = () => {
  const { data: session } = useSession();
  if (session) {
    return (
    <>
       <span className="mr-1">session.user.email</span>
        <button onClick={() => signOut()}>登出</button>
      </>
    )
  }
  return (
      <button onClick={() => signIn()}>登录</button>
  )
}

export default GoogleLogin;