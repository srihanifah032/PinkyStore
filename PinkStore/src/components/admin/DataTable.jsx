import React from 'react';

function DataTable({ data = [], columns = [], renderActions }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
      <table className="min-w-full text-sm text-left">
        {/* TABLE HEAD */}
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4 font-bold">
                {col.header}
              </th>
            ))}

            {renderActions && (
              <th className="px-6 py-4 font-bold text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="px-6 py-10 text-center text-gray-500"
              >
                Data tidak tersedia
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                className="hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-gray-700">
                    {col.render
                      ? col.render(row)
                      : row[col.field]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-6 py-4 text-center">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
