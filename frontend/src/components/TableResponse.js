import React from "react";

export default function TableResponse({ data }) {
  if (!data || data.length === 0) return null;
  const keys = Object.keys(data[0] || {});
  return (
    <div className="mt-3 overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {keys.map((k) => (
              <th
                key={k}
                className="px-3 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-200 border"
              >
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              {keys.map((k) => (
                <td
                  key={k}
                  className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 border"
                >
                  {String(row[k] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
