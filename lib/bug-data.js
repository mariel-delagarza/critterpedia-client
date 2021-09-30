import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getBugSlugs() {
  const { data } = await client.query({
    query: gql`
      query getBugSlugs {
        getAllBugs {
          slug
        }
      }
    `,
  });

  let bugSlugs = data.getAllBugs.map((bug) => bug.slug);

  return bugSlugs.map((bugSlug) => {
    return {
      params: {
        slug: bugSlug,
      },
    };
  });
}

export async function getBugData(slug) {
  const { data } = await client.query({
    query: gql`
      query getBugBySlug($slug: String!) {
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
      }
    `,
    variables: { slug: slug },
  });

  return {
    slug,
    ...data.getBugBySlug,
  };
}
