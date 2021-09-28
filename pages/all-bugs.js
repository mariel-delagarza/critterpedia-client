import Head from "next/head";
import Link from "next/link";

export default function AllBugs() {
  return (
    <>
      <Head>
        <title>All Bugs</title>
      </Head>
      <h1>All Bugs Go Here</h1>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
    </>
  );
}
