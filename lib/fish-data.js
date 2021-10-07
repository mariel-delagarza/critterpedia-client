import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getFishSlugs() {
  const { data } = await client.query({
    query: gql`
      query getFishSlugs {
        getAllFish {
          slug
        }
      }
    `,
  });

  let fishSlugs = data.getAllFish.map((fish) => fish.slug);

  return fishSlugs.map((fishSlug) => {
    return {
      params: {
        slug: fishSlug,
      },
    };
  });
}

export async function getFishData(slug) {
  const { data } = await client.query({
    query: gql`
      query getFishBySlug($slug: String!) {
        getFishBySlug(slug: $slug) {
          name
          monthsNorth
          monthsSouth
          location
          value
          timeRange
          hoursAM
          hoursPM
          fin
          shadowSize
        }
      }
    `,
    variables: { slug: slug },
  });

  return {
    slug,
    ...data.getFishBySlug,
  };
}
