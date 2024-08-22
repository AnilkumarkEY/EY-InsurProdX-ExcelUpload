import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Modal } from 'antd';
import DynamicTable from './components/table/dynamicTable';
import axios from 'axios';
import { formatDate } from './assets/utility/common';
//import { MotifButton } from '@ey-xd/motif-react/components/button/index.js';
//import MotifButton from '@ey-xd/motif-react/Button';
import Footer from './components/motif-footer/footer';

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
          return {...item,timestamp: formatDate(item.timestamp, 'display-date-Time')}
        }).reverse();
        setFileArray(customizedData)
      }
    } catch (error) {
      console.log(error);
      setFileArray([]);
    }
  }

  return (
    <Card title="Excel Upload And Summary">
       <Row>
        <Col span={24}>
          <DynamicTable fileArray={fileArray} />
        </Col>
        <Col>
        </Col>
       </Row>
       <Footer />
    </Card>
  )
}

export default App
