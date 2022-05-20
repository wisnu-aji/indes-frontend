import { useSession, signOut, signIn } from "next-auth/react";
export default function component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {JSON.stringify(session)} <br />
        <button onClick={() => signOut()}>sign out</button>
      </>
    );
  }
  return (
    <>
      not signed in <br />
      <button onClick={() => signIn()}>sign in</button>
    </>
  );
}
