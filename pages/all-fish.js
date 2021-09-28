import Head from "next/head";
import Link from "next/link";

export default function AllFish() {
  return (
    <>
      <Head>
        <title>All Fish</title>
      </Head>
      <h1>All Fish Go Here</h1>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
    </>
  );
}
