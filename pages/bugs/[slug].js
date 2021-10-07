import Link from "next/link";
import { getBugSlugs } from "../../lib/bug-data";
import { getBugData } from "../../lib/bug-data";

export default function Bug({ bugData }) {
  return (
    <div>
      <ul>
        <li>
          <h3>Name:</h3> {bugData.name}
        </li>
        <li>
          <h3>Months Available (Northern Hemisphere):</h3> {bugData.monthsNorth}
        </li>
        <li>
          <h3>Months Available (Southern Hemisphere):</h3> {bugData.monthsSouth}
        </li>
        <li>
          <h3>Location:</h3> {bugData.location}
        </li>
        <li>
          <h3>Value:</h3> {bugData.value}
        </li>
        <li>
          <h3>Time of day available:</h3> {bugData.timeRange}
        </li>
        <li>
          <h3>AM Hours Available:</h3> {bugData.hoursAM}
        </li>
        <li>
          <h3>PM Hours Available:</h3> {bugData.hoursPM}
        </li>
      </ul>
      <h2>
        <Link href="/bugs">
          <a>Back to All Bugs</a>
        </Link>
      </h2>
    </div>
  );
}

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = await getBugSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the bug profile using params.id
  const bugData = await getBugData(params.slug);

  return {
    props: {
      bugData,
    },
  };
}
