import Link from "next/link";
import { auth } from "@clerk/nextjs";


export default async function Home() {
  const {userId} = await auth ();

  let href = userId ? "/journal" : "/new-user";

  return (
    <div 
      className="w-screen h-screen bg-no-repeat flex justify-center items-center text-white" 
      style={{
        backgroundImage: 'url("/clouds.jpeg")',
        backgroundSize: "cover",
        height: "100vh",
    }}> 
      <div className="bg-white/60 py-10 shadow-xl rounded-xl">
        <div className="px-10 w-full max-w-[600px] mx-auto">
          <h1 className="text-6xl text-black mb-4">Dream Journal</h1>
          <p className="text-xl text-black mb-4">Explore your dreams!</p>
          <div>
            <Link href={href}>
              <button className="bg-pink-400 shadow-lg text-black px-4 py-2 rounded-2xl text-xl border-solid border-2 border-black transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white">
                get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
 