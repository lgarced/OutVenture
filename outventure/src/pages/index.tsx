import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from OutVenture" });

  return (
    <>
    
      <Head>
        <title>OutVenture</title>
        <meta name="description" content="OutVenture Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a16207] to-[#15162c]">
        <div className="container flex flex-col items-left justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Out<span className="text-[#3a7544]">Ven</span>ture
          </h1>
          <p className="text-2xl text-center text-[#3a7544] font-bold rounded-xl bg-slate-50"> Follow your inner outventurer </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-14 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://www.nps.gov/index.htm"
            >
              <h3 className="text-2xl font-bold ">Answer to your call →</h3>
              <div className="text-lg">
                The outdoors is calling. Let your inner adventurer out. Explore new places and create new memories.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-6 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://www.tripadvisor.com/Tourism-g28923-Alaska-Vacations.html"
            >
              <h3 className="text-2xl font-bold">Where are we going next? →</h3>
              <div className="text-lg">
                Plan your next trip. Choose from one of our curated trips lists or create your own.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
