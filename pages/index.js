import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import hero from "../public/img/hero.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>3D Model</title>
        <meta name="description" content="3D Model" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-16">
        <div className="min-h flex">
          <div className="bg-black/80 flex-1 relative">
            <Image fill src={hero} alt="hero" className="object-cover" />
            <div className="bg-black/75 inset-0 absolute"></div>
          </div>
          <div className="bg-[#191919] flex flex-col justify-center items-center flex-1 gap-2">
            <h1 className="text-white text-5xl font-bold">3D Lab</h1>
            <Link
              href="/register"
              className="px-3 py-1.5 text-lg border text-white rounded-lg hover:bg-white hover:text-black hover:box"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
