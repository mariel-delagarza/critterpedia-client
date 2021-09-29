import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function AllFish({ fishes }) {
  return (
    <>
      <Head>
        <title>All Fish</title>
      </Head>
      <h1>All Fish Go Here</h1>
      <p>All the fish</p>
      <ul>
        {fishes.map((fish) => (
          <li key={fish}>{fish}</li>
        ))}
      </ul>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getAllFish {
        getAllFish {
          name
        }
      }
    `,
  });

  let names = data.getAllFish.map((fish) => fish.name);
  console.log(names);

  return {
    props: {
      fishes: data.getAllFish.map((fish) => fish.name),
    },
  };
}
