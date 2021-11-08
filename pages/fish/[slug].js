import Link from "next/link";
import { getFishSlugs } from "../../lib/fish-data";
import { getFishData } from "../../lib/fish-data";

export default function Fish({ fishData }) {
  return (
    <div>
      <h1 className="text-4xl leading-6 font-medium text-gray-900 my-8">
        {fishData.name}
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mx-12 mb-8">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {fishData.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Months Available (Northern Hemisphere)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {fishData.monthsNorth.join(", ")}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Months Available (Southern Hemisphere)
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {fishData.monthsSouth.join(", ")}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {fishData.location}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Value</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {fishData.value} bells
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Time of Day Available
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {fishData.timeRange}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <h2>
        <Link href="/fish">
          <a className="text-4xl text-blue-700 underline">Back to All Fish</a>
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
