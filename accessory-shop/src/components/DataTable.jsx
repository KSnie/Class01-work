// DataTable.jsx
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ImBin } from "react-icons/im";
import { useContext, useEffect } from 'react';
import { TotalPriceContext } from './context';

const DataTable = ({ data, onDelete }) => {
    const { setTotalPrice } = useContext(TotalPriceContext);

    useEffect(() => {
        const calculateTotalPrice = () => {
            return data.reduce((total, item) => total + item.price * item.quantity, 0);
        };
        setTotalPrice(calculateTotalPrice());
    }, [data, setTotalPrice]);

    if (!data || data.length === 0) {
        return <div className="text-center m-5">No data available</div>;
    }

    return (
        <div className='m-5'>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                            <td>
                                <Button variant="danger" onClick={() => onDelete(item.id)}><ImBin /> Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DataTable;
