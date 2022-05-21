import { useSession, signOut, signIn } from "next-auth/react";
import { FC } from "react";

const Admin: FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {JSON.stringify(session)} <br />
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <div>
      not signed in <br />
      <button onClick={() => signIn()}>sign in</button>
    </div>
  );
};
export default Admin;
