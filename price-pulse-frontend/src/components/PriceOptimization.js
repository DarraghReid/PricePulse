import React from 'react';
import Plot from 'react-plotly.js';
import { useTable } from 'react-table';

const PriceOptimization = ({ optimizedPrices }) => {
  // Prepare the data for the chart (comparison of original vs optimized prices)
  const originalPrices = optimizedPrices.map(item => item.price);  // Extract original prices
  const optimizedPrice = optimizedPrices.map(item => item.newPrice);  // Extract optimized prices
  const products = optimizedPrices.map(item => item.product);  // Extract product names

  const data = [
    {
      type: 'bar',
      x: products,
      y: optimizedPrice,
      name: 'Optimized Price',
      marker: {
        color: '#36d7b7',  // Optimized price color
      },
    },
    {
      type: 'bar',
      x: products,
      y: originalPrices,
      name: 'Original Price',
      marker: {
        color: '#ff6347',  // Original price color
      },
    },
  ];

  const layout = {
    title: 'Product Price Comparison',
    barmode: 'group',  // Group bars side by side
    xaxis: { title: 'Product' },
    yaxis: { title: 'Price ($)' },
  };

  // Define the columns for the table (including original and optimized price)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Product',  // Header name for the first column
        accessor: 'product',  // Key that will match the data from the optimizedPrices array
      },
      {
        Header: 'Original Price',  // Header for original price column
        accessor: 'price',  // Key for the original price
      },
      {
        Header: 'Optimized Price',  // Header for optimized price column
        accessor: 'newPrice',  // Key for the optimized price
      },
    ],
    []
  );

  // Use the useTable hook to generate table props and rows
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,  // Pass the columns to useTable hook
    data: optimizedPrices,  // Pass the optimizedPrices data to useTable hook
  });

  return (
    <div>
      <h2>Optimized Prices</h2>
      {/* Render Plotly chart */}
      <Plot data={data} layout={layout} />
      <h3>Price Comparison Table</h3>
      {/* Render the table layout */}
      <table {...getTableProps()} style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ padding: '10px', border: '1px solid black' }}>
                  {column.render('Header')}  {/* Render the header for each column */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);  // Prepare each row for rendering
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid black' }}>
                    {cell.render('Cell')}  {/* Render the cell data */}
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

export default PriceOptimization;
