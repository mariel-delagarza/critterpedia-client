import Link from "next/link";
import { getFishSlugs } from "../../lib/fish-data";
import { getFishData } from "../../lib/fish-data";

export default function Fish({ fishData }) {
  return (
    <div>
      <ul>
        <li>
          <h3>Name:</h3> {fishData.name}
        </li>
        <li>
          <h3>Months Available (Northern Hemisphere):</h3>{" "}
          {fishData.monthsNorth}
        </li>
        <li>
          <h3>Months Available (Southern Hemisphere):</h3>{" "}
          {fishData.monthsSouth}
        </li>
        <li>
          <h3>Location:</h3> {fishData.location}
        </li>
        <li>
          <h3>Value:</h3> {fishData.value}
        </li>
        <li>
          <h3>Time of day available:</h3> {fishData.timeRange}
        </li>
        <li>
          <h3>AM Hours Available:</h3> {fishData.hoursAM}
        </li>
        <li>
          <h3>PM Hours Available:</h3> {fishData.hoursPM}
        </li>
        <li>
          <h3>Has a fin?</h3> {fishData.fin}
        </li>
        <li>
          <h3>Shadow size:</h3> {fishData.shadowSize}
        </li>
      </ul>
      <h2>
        <Link href="/fish">
          <a>Back to All Fish</a>
        </Link>
      </h2>
    </div>
  );
}

export async function getStaticPaths() {
  // Return a list of possible values for id
  const paths = await getFishSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the fish profile using params.id
  const fishData = await getFishData(params.slug);

  return {
    props: {
      fishData,
    },
  };
}
