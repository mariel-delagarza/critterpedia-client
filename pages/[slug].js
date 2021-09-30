import { getCritterSlugs } from "./all-bugs";
import { getCritterData } from "./all-bugs";

export default function Critter({ critterData }) {
  return <div>{critterData}</div>;
}

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = getCritterSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the bug profile using params.id
  const critterData = getCritterData(params.slug);
  console.log(critterData);
  return {
    props: {
      critterData,
    },
  };
}
