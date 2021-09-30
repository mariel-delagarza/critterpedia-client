import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function AllBugs({ bugs }) {
  return (
    <>
      <Head>
        <title>All Bugs</title>
      </Head>
      <h1>All Bugs Go Here</h1>
      <p>All the bugs</p>
      <ul>
        {bugs.map((bug) => (
          <li key={bug}>{bug}</li>
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
      query getAllBugs {
        getAllBugs {
          name
        }
      }
    `,
  });

  //let names = data.getAllBugs.map((bug) => bug.name);
  //console.log(names);

  return {
    props: {
      bugs: data.getAllBugs.map((bug) => bug.name),
    },
  };
}

export async function getCritterSlugs() {
  const { data } = await client.query({
    query: gql`
      query getAllSlugs {
        getAllBugs {
          slug
        }
        getAllFish {
          slug
        }
      }
    `,
  });

  let bugSlugs = data.getAllBugs.map((bug) => bug.slug);
  let fishSlugs = data.getAllFish.map((fish) => fish.slug);
  let critterSlugs = bugSlugs.concat(fishSlugs);

  /*console.log(
    critterSlugs.map((critterSlug) => {
      return {
        params: {
          slug: critterSlug,
        },
      };
    })
  );*/

  return critterSlugs.map((critterSlug) => {
    return {
      params: {
        slug: critterSlug,
      },
    };
  });
}

const CRITTER_DATA_QUERY = gql`
  query getAllBySlug($slug: Slug) {
    getBugBySlug(slug: $slug) {
      name
      monthsNorth
      monthsSouth
      location
      value
      time_range
      hoursAM
      hoursPM
    }
    getFishBySlug(slug: $slug) {
      name
      monthsNorth
      monthsSouth
      location
      value
      time_range
      hoursAM
      hoursPM
      fin
      shadowSize
    }
  }
`;

export async function getCritterData(slug) {
  const { data } = await client.query({
    query: CRITTER_DATA_QUERY,
    variables: { slug: slug },
  });

  return { data };
}
