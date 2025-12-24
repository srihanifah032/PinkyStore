import { Trash2 } from 'lucide-react';

function DataTable({ data, columns, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-pink-100 border-b-2 border-pink-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-left text-sm font-bold text-gray-800">
                  {col.header}
                </th>
              ))}
              {onDelete && <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-pink-50 transition">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 text-sm">
                    {col.render ? col.render(row) : row[col.field]}
                  </td>
                ))}
                {onDelete && (
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDelete(row.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition inline-flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;