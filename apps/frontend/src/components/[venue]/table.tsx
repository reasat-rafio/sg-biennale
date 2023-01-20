interface TableProps {
  cells: string[];
  _key: string;
  _type: string;
}

export const Table: React.FC<{ rows: TableProps[] }> = ({ rows }) => {
  const tableHeader = rows[0];
  const tableBody = rows.slice(1, rows.length);

  return (
    <div className="overflow-x-auto mt-5 relative">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {tableHeader.cells.map((cell) => (
              <th key={cell} scope="col" className="py-3 px-6">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map(({ cells, _key }) => {
            const childTableHeader = cells[0];
            const childTableBody = cells.slice(1, rows.length);
            return (
              <tr key={_key} className="bg-white border-b">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                >
                  {childTableHeader}
                </th>
                {childTableBody.map((tbd) => (
                  <td key={tbd} className="py-4 px-6">
                    {tbd}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
