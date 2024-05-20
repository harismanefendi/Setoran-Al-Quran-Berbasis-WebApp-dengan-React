import { Skeleton } from "@nextui-org/react";

export default function MrRip() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Skeleton>Header 1</Skeleton>
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Skeleton>Header 2</Skeleton>
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Skeleton>Header 3</Skeleton>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <Skeleton className="rounded-lg">
                <div className="h-4 bg-default-300"></div>
              </Skeleton>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Skeleton className="rounded-lg">
                <div className="h-4 bg-default-300"></div>
              </Skeleton>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Skeleton className="rounded-lg">
                <div className="h-4 bg-default-300"></div>
              </Skeleton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
