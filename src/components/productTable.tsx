import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore/store';
import { SaleData } from '../dataType/data';

const ProductTable: React.FC = () => {
  const { data, error } = useSelector((state: RootState) => state.data);
  const [sortColumn, setSortColumn] = useState<keyof SaleData>('weekEnding');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`; 
  };

  const formatCurrency = (currency: number) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 }).format(currency);
  };

  const sortData = (column: keyof SaleData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortColumn(column);
      setSortDirection('ascending');
    }
  };

  const sortedData = [...data.sales].sort((a, b) => {
    if (sortColumn === 'weekEnding') {
      return sortDirection === 'ascending'
        ? new Date(a[sortColumn]).getTime() - new Date(b[sortColumn]).getTime()
        : new Date(b[sortColumn]).getTime() - new Date(a[sortColumn]).getTime();
    } else {
      return sortDirection === 'ascending'
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn];
    }
  });

  const renderSortIcon = (column: keyof SaleData) => {
    if (sortColumn === column) {
      return (
        <span onClick={() => setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending')}>
          {sortDirection === 'ascending' ? '↓': '↑'}
        </span>
      );
    } else {
      return <span>↕︎</span>;
    }
  };

  return (
    <table>
      <thead>
        <tr>
        <th onClick={() => sortData('weekEnding')} >
            WEEK ENDING 
             {renderSortIcon('weekEnding')}
          </th>
          <th onClick={() => sortData('retailSales')}>
            RETAIL SALES 
            {renderSortIcon('retailSales')}
          </th>
          <th onClick={() => sortData('wholesaleSales')}>
            WHOLESALE SALES 
            {renderSortIcon('wholesaleSales')}
          </th>
          <th onClick={() => sortData('unitsSold')}>
            UNITS SOLD 
            {renderSortIcon('unitsSold')}
          </th>
          <th onClick={() => sortData('retailerMargin')}>
            RETAILER MARGIN 
            {renderSortIcon('retailerMargin')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((sale, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{formatDate(sale.weekEnding)}</td>
            <td>{formatCurrency(sale.retailSales)}</td>
            <td>{formatCurrency(sale.wholesaleSales)}</td>
            <td>{sale.unitsSold}</td>
            <td>{formatCurrency(sale.retailerMargin)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
