import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import carData from '../data/cars.json';
import './Dashboard.css';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const getBrandData = (cars, brands) => {
  const brandCounts = cars.reduce((acc, car) => {
    const brand = brands[car.MkID] || 'Unknown';
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(brandCounts).map(brand => ({
    name: brand,
    value: brandCounts[brand],
  }));
};

const getStackedBarData = (cars, brands) => {
  const modelCounts = cars.reduce((acc, car) => {
    const brand = brands[car.MkID] || 'Unknown';
    if (!acc[brand]) acc[brand] = {};
    acc[brand][car.Model] = (acc[brand][car.Model] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(modelCounts).map(brand => ({
    name: brand,
    ...modelCounts[brand],
  }));
};

const sumPricesByBrandModel = (cars, brands) => {
  const priceSums = cars.reduce((acc, car) => {
    const brand = brands[car.MkID] || 'Unknown';
    const key = `${brand}-${car.Model}`;
    if (!acc[key]) {
      acc[key] = { Brand: brand, Model: car.Model, Amount: 0, TotalPrice: 0 };
    }
    acc[key].Amount += 1;
    
    // Remove commas and convert to number
    const cleanedPrice = car.Prc.replace(/,/g, '');
    acc[key].TotalPrice += parseInt(cleanedPrice, 10); // Use parseInt for integer conversion

    return acc;
  }, {});

  return Object.values(priceSums).sort((a, b) => a.Brand.localeCompare(b.Brand) || a.Model.localeCompare(b.Model));
};

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState({});
  const [carCounts, setCarCounts] = useState({});

  useEffect(() => {
    setCars(carData.Cars);

    const brandLookup = carData.MMList.reduce((acc, brand) => {
      acc[brand.mkID] = brand.Name;
      return acc;
    }, {});
    setBrands(brandLookup);

    const counts = carData.Cars.reduce((acc, car) => {
      const key = `${car.MkID}-${car.Model}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
    setCarCounts(counts);
  }, []);

  const carCountArray = Object.keys(carCounts).map(key => {
    const [mkID, model] = key.split(/-(.+)/);
    return {
      MkID: mkID,
      Model: model,
      Amount: carCounts[key],
    };
  });

  const sortedCarCounts = carCountArray.sort((a, b) => {
    const brandA = brands[a.MkID] || '';
    const brandB = brands[b.MkID] || '';
    if (brandA === brandB) {
      return a.Model.localeCompare(b.Model);
    }
    return brandA.localeCompare(b.Brand);
  });

  // Data for Pie Chart
  const pieChartData = getBrandData(cars, brands);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Data for Stacked Bar Chart
  const stackedBarData = getStackedBarData(cars, brands);
  const uniqueModels = [...new Set(cars.map(car => car.Model))];

  // Aggregated data for the table
  const aggregatedData = sumPricesByBrandModel(cars, brands);

  return (
    <>
      <div className="table-container">
        <h1 className='table-Top-text'>Chart</h1>
        <div className="chart-container">
          <div style={{ width: '100%', height: '500px' }}>
            <PieChart width={800} height={500}>
              <Pie
                data={pieChartData}
                cx="55%"
                cy="50%"
                labelLine={true}
                label={({ name }) => name}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div style={{ width: '100%', height: '500px' }}>
            <BarChart
              width={800}
              height={500}
              data={stackedBarData}
              margin={{
                top: 50,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {uniqueModels.map((model, index) => (
                <Bar key={model} dataKey={model} stackId="a" fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h1 className='table-Top-text'>ALL-Models</h1>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Amount</th>
                <th>Total Price (Baht)</th>
              </tr>
            </thead>
            <tbody>
              {aggregatedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Brand}</td>
                  <td>{data.Model}</td>
                  <td>{data.Amount}</td>
                  <td>{data.TotalPrice.toLocaleString()}</td> {/* Format with commas */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="table-container">
        <h1 className='table-Top-text'>CAR-LIST</h1>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Name</th>
                <th>Price In Baht</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.Cid}>
                  <td>{car.Cid}</td>
                  <td>{brands[car.MkID] || 'Unknown'}</td>
                  <td>{car.Model}</td>
                  <td>{car.NameMMT}</td>
                  <td>{car.Prc}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
