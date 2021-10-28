import Head from "next/head";
import Link from "next/link";
import { MonthLink } from "../components/month-link";

export default function Home() {
  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  return (
    <div>
      <Head>
        <title>LOCALHOST</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h2 className="my-8 text-4xl">
            <Link href="/bugs">
              <a>All Bugs</a>
            </Link>
          </h2>
          <h2 className="my-8 text-4xl">
            <Link href="/fish">
              <a>All Fish</a>
            </Link>
          </h2>
          <h2>
            {months.map((month) => (
              <>
                <MonthLink month={month.name} />
                <br />
              </>
            ))}
          </h2>
        </div>
      </main>
    </div>
  );
}
