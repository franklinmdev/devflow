import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session);

  return (
    <>
      <h1 className="font-black text-violet-700 text-3xl">
        Welcome to Next.js 👋 redirect: true,
      </h1>
    </>
  );
};

export default Home;
