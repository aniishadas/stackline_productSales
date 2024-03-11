import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxStore/store';
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';
// @ts-ignore
import { ScaleUtils } from 'recharts/lib/utils/ScaleUtils';

interface GroupedData {
  [key: string]: {
    retailSales: number;
    wholesaleSales: number;
  };
}


const ProductChart: React.FC = () => {
  const { data, error } = useSelector((state: RootState) => state.data);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const groupedData = data.sales.reduce<GroupedData>((acc, sale) => {
    const month = new Date(sale.weekEnding).toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = {
        retailSales: 0,
        wholesaleSales: 0,
      };
    }
    acc[month].retailSales += sale.retailSales;
    acc[month].wholesaleSales += sale.wholesaleSales;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([month, sales]) => ({
    month,
    retailSales: sales.retailSales,
    wholesaleSales: sales.wholesaleSales,
  })).sort((a, b) => {
    const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
  });

  return (
      <div className="chartInnerDiv">
      <LineChart width={1000} height={400} data={chartData}>
        <XAxis dataKey="month" axisLine={{ stroke: '#a5afc5' }} tick={{ fill: '#a5afc5' }}/>
        <YAxis domain={[0, 'dataMax + 100']} axisLine={false} tick={false}/>
        <Legend />
        <Line type="monotone" dataKey="retailSales" stroke="#63b4f8" strokeWidth={3} dot={false}/>
        <Line type="monotone" dataKey="wholesaleSales" stroke="#a5afc5" strokeWidth={3} dot={false}/>
      </LineChart>
    </div>
    
  );
};

export default ProductChart;
