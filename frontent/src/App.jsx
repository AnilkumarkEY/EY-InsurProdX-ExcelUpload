import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Modal } from 'antd';
import DynamicTable from './components/table/dynamicTable';
import axios from 'axios';

const App = () => {
  const [fileArray, setFileArray] = useState([]);

  useEffect(() => {
    getGridData();
  },[])

  const getGridData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/excelupload/get_grid_record');
      console.log(response);
      if (response.data && response.data.data.length) {
        const customizedData = response.data.data.map((item)=> {
          const date = new Date(item.timestamp);
          const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          console.log(formattedDate); // e.g., "9-8-2024"
          return {...item,timestamp: formattedDate}
        })
        setFileArray(customizedData)
      }
    } catch (error) {
      console.log(error);
      setFileArray([]);
    }
  }

  return (
    <Card title="Excel upload and summary">
       <Row>
        <Col span={24}>
          <DynamicTable fileArray={fileArray} />
        </Col>
       </Row>
    </Card>
  )
}

export default App
