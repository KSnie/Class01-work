import React, { useState, useEffect, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import carData from '../data/cars.json';
import './Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';
import { FaSort } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

const getBrandData = (cars, brands) => {
  const brandCounts = cars.reduce((acc, car) => {
    const brand = brands[car.MkID] || 'Unknown';
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(brandCounts),
    datasets: [{
      data: Object.values(brandCounts),
      backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    }]
  };
};

const getStackedBarData = (cars, brands) => {
  const modelCounts = cars.reduce((acc, car) => {
    const brand = brands[car.MkID] || 'Unknown';
    if (!acc[brand]) acc[brand] = {};
    acc[brand][car.Model] = (acc[brand][car.Model] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(modelCounts);
  const models = [...new Set(cars.map(car => car.Model))];
  const datasets = models.map((model, index) => ({
    label: model,
    data: labels.map(brand => modelCounts[brand]?.[model] || 0),
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][index % 3],
    stack: 'stack1'
  }));

  return {
    labels,
    datasets
  };
};

const sumPricesByBrandModel = (cars, brands) => {
  const priceSums = cars.reduce((acc, car) => {
    const brand = brands[car.MkID] || 'Unknown';
    const key = `${brand}-${car.Model}`;
    if (!acc[key]) {
      acc[key] = { Brand: brand, Model: car.Model, Amount: 0, TotalPrice: 0 };
    }
    acc[key].Amount += 1;
    const cleanedPrice = car.Prc.replace(/,/g, '');
    acc[key].TotalPrice += parseInt(cleanedPrice, 10);
    return acc;
  }, {});

  return Object.values(priceSums);
};

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState({});
  const [carCounts, setCarCounts] = useState({});
  const [sortConfigModels, setSortConfigModels] = useState({ key: 'Amount', direction: 'asc' });
  const [sortConfigCars, setSortConfigCars] = useState({ key: 'Prc', direction: 'asc' });

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
    return brandA.localeCompare(brandB);
  });

  // Data for Pie Chart
  const pieChartData = getBrandData(cars, brands);

  // Data for Stacked Bar Chart
  const stackedBarData = getStackedBarData(cars, brands);

  // Aggregated data for the ALL-Models table
  const aggregatedData = sumPricesByBrandModel(cars, brands);

  // Sorting function for ALL-Models
  const sortedAggregatedData = useMemo(() => {
    const sortedData = [...aggregatedData];
    sortedData.sort((a, b) => {
      if (a[sortConfigModels.key] < b[sortConfigModels.key]) {
        return sortConfigModels.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfigModels.key] > b[sortConfigModels.key]) {
        return sortConfigModels.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  }, [aggregatedData, sortConfigModels]);

  const requestSortModels = (key) => {
    let direction = 'asc';
    if (sortConfigModels.key === key && sortConfigModels.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfigModels({ key, direction });
  };

  // Sorting function for CAR-LIST
  const sortedCars = useMemo(() => {
    const sortedData = [...cars];
    sortedData.sort((a, b) => {
      if (sortConfigCars.key === 'Brand') {
        const brandA = brands[a.MkID] || '';
        const brandB = brands[b.MkID] || '';
        return sortConfigCars.direction === 'asc'
          ? brandA.localeCompare(brandB)
          : brandB.localeCompare(brandA);
      } else {
        const priceA = parseInt(a.Prc.replace(/,/g, ''), 10);
        const priceB = parseInt(b.Prc.replace(/,/g, ''), 10);
        if (priceA < priceB) {
          return sortConfigCars.direction === 'asc' ? -1 : 1;
        }
        if (priceA > priceB) {
          return sortConfigCars.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
    return sortedData;
  }, [cars, sortConfigCars, brands]);

  const requestSortCars = (key) => {
    let direction = 'asc';
    if (sortConfigCars.key === key && sortConfigCars.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfigCars({ key, direction });
  };

  return (
    <>
      <div className="table-container">
        <h1 className='table-Top-text'>Chart</h1>
        <div className="chart-container">
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.label || '';
                      const value = tooltipItem.raw || 0;
                      return `${label}: ${value}`;
                    }
                  }
                }
              }
            }}
          />
        </div>
        <div className="chart-container2">
          <Bar
            data={stackedBarData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.dataset.label || '';
                      const value = tooltipItem.raw || 0;
                      return `${label}: ${value}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: 'Brand'
                  }
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: 'Count'
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="table-container">
        <h1 className='table-Top-text'>ALL-Models</h1>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Brand
                  <button className="Sort-btn" onClick={() => requestSortModels('Brand')}>
                    <FaSort />
                  </button>
                </th>
                <th>Model</th>
                <th>
                  Amount
                  <button className="Sort-btn" onClick={() => requestSortModels('Amount')}>
                    <FaSort />
                  </button>
                </th>
                <th>
                  Total Price (Baht)
                  <button className="Sort-btn" onClick={() => requestSortModels('TotalPrice')}>
                    <FaSort />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAggregatedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Brand}</td>
                  <td>{data.Model}</td>
                  <td>{data.Amount}</td>
                  <td>{data.TotalPrice.toLocaleString()}</td>
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
                <th>
                  Brand
                  <button className="Sort-btn" onClick={() => requestSortCars('Brand')}>
                    <FaSort />
                  </button>
                </th>
                <th>Model</th>
                <th>Name</th>
                <th>
                  Price In Baht
                  <button className="Sort-btn" onClick={() => requestSortCars('Prc')}>
                    <FaSort />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCars.map(car => (
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
