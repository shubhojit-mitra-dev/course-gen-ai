import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";
import Spline from "@splinetool/react-spline";
import RotatingText from "@/components/ui/RotatingText";
import allAssets from "@/assets/all-assets";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const session = await getAuthSession();
  const assets = allAssets();

  return (
    <div className="">
      <nav className="flex justify-between bg-background items-center py-4 px-5 md:px-10 lg:px-20 border-b">
        <div>
          <h1 className="font-bold text-2xl text-primary">CourseGenAI</h1>
        </div>
        <div className="flex space-x-4">
          <ThemeToggle />
          {session?.user ? (
            <Button>
              <Link href="/gallery">Go to Gallery</Link>
            </Button>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
      <main className='flex flex-col items-center justify-center'>
        <div className="flex flex-col lg:flex-row w-full p-5 md:p-10 lg:p-20 h-screen md:h-[500px] justify-center sm:justify-evenly items-center">
          <div className="flex flex-col justify-center items-center text-center lg:text-start lg:items-start h-1/2 sm:h-full md:w-7/12">
            <h1 className='text-5xl lg:text-7xl font-bold'>Welcome to Our Platfrom</h1>
            <div className="flex items-center  gap-2 mt-10 mb-4">
              <h2 className="text-2xl lg:text-4xl font-bold">Let&apos;s</h2>
                <RotatingText
                  texts={['Learn', 'Understand', 'Innovate']}
                  mainClassName="px-2 ease-in-out md:px-3 bg-cyan-300 text-black text-xl lg:text-2xl overflow-hidden py-1 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
            </div>
            <div className="flex gap-1">
              <p>Powered by Gemini</p>
              <Image src={assets.gemini} alt="gemini" />
            </div>
          </div>
          <div className="flex md:w-5/12 h-1/2 sm:h-full">
            <Spline
              scene="https://prod.spline.design/LR8QwQw0OGGY3Mg0/scene.splinecode"
            />
          </div>
        </div>

      </main>
    </div>
  );
}
