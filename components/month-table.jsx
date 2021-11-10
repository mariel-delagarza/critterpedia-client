import { CritterLink } from "./critter-link";

export const MonthTable = ({ sortedCritters }) => {
  return (
    <div className="flex flex-col my-8">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-visible border-b border-gray-200 sm:rounded-lg">
            <table className="table-auto max-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time of Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Months
                  </th>
                  {sortedCritters.filter(
                    (critter) => critter.__typename === "Fish"
                  ).length > 0 && (
                    <>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Shadow Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fin?
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedCritters.map((critter, critterIdx) => (
                  <tr
                    key={critter.name}
                    className={critterIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <CritterLink critter={critter} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {critter.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {critter.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {critter.timeRange}
                    </td>
                    <td className="px-6 py-4 break-words text-sm text-gray-500">
                      {critter.monthsNorth.join(", ")}
                    </td>
                    {sortedCritters.filter(
                      (critter) => critter.__typename === "Fish"
                    ).length > 0 && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {critter.shadowSize}
                        </td>
                        <td className="px-6 py-4 break-words text-sm text-gray-500">
                          {critter.fin == true && "Yes, yes!"}
                          {critter.fin == false && "No"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
