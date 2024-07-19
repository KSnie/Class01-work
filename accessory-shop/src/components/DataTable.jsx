import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

const DataTable = ({ data }) => {
    return (

        <div className='m-5'>
            <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>

    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
};

export default DataTable;