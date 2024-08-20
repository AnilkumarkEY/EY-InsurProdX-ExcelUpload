import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Button, Modal, Dropdown, Menu, Form, DatePicker } from 'antd';
import UploadFile from '../uploadFile/uploadFile';
import axios from 'axios';
import { formatDate } from '../../assets/utility/common';

const { Search } = Input;
const styleAction1 = {
  "font-weight": "700",
  "font-size": "19px",
  "position": "relative",
  "bottom": "-10px"
};
const styleAction2 = {
  "transform": "rotate(270deg)"
}


const DynamicTable = ({ fileArray }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [criteria_field_Array, setCriteria_field_Array] = useState([]);

  useEffect(() => {
    const data = fileArray
    setFilteredData(data);
  }, [fileArray]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filtered = fileArray.filter((item) =>
        item.summeryDataId.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredData(filtered);
    } else {
      const data = fileArray
      setFilteredData(data);
    }
  };

  const handleDownload = async(e, record) => {
    try {
      const res = await axios.get(`http://localhost:5000/excelupload/get_all_transform_record?uploadId=${record.summeryDataId}`)
      if (res.data.status && res.data.status == 'success') {
        const jsonString = JSON.stringify(res.data.data);
        const blob = new Blob([jsonString], { type: "application/json" });
        const dLink = document.createElement('a');
        dLink.download = `${record.summeryDataId}.json`;
        dLink.href = URL.createObjectURL(blob);
        dLink.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCriteria = (value) => {
    console.log(value);
    setCriteria_field_Array(value);
  }

  const openRateForm = (record, type, criteria_field_Array, updateCriteria) => {
    console.log(record);
    if (type == 'viewRate') {
      setModalTitle('View Premium Rate')
      setModalContent(<CalculatePremiumForm resetForm={true} uploadId={record.summeryDataId} criteria_field_Array={criteria_field_Array}/>);
    } else {
      setModalTitle('Upload Excel File Here')
      setModalContent(<UploadFile updateCriteria={updateCriteria}/>);
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
   window.location.reload();
  };

  const columns = [
    {
      title: 'Upload ID',
      dataIndex: 'summeryDataId',
      key: 'summeryDataId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Total Sheet Count',
      dataIndex: 'sheetCount',
      key: 'sheetCount',
    },
    {
      title: 'Criteria Count',
      dataIndex: 'criteria_row_count',
      key: 'criteria_row_count',
    },
    {
      title: 'Total Record Count',
      dataIndex: 'totalRateUploaded',
      key: 'totalRateUploaded',
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="json" onClick={(e) => handleDownload(e, record)}>
                  <a id={record.name}>Rate JSON</a>
                </Menu.Item>
                <Menu.Item key="text">
                  <a onClick={() => openRateForm(record, 'viewRate', criteria_field_Array, "" )}>Premium Rate</a>
                </Menu.Item>
              </Menu>
            }
          >
            <div style={styleAction2}>
              <a style={styleAction1}>...</a>
            </div>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className='search-upload'>
        <Search
          placeholder='Search by Upload ID'
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16, width: 250 }}
        />
        <Button
          type='primary'
          onClick={() => openRateForm(true, 'upload', "", updateCriteria)}
          style={{ position: 'absolute', right: 0 }}
        >
          Upload
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} />
      <DynamicModal 
        title={modalTitle}
        component={modalContent}
        showModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel} />
    </>
  );
};

const CalculatePremiumForm = ({resetForm, uploadId, criteria_field_Array}) => {
  console.log(resetForm, criteria_field_Array);
  const criteria_field_Arrayu = [
        "product_code",
        "gender",
        "tobacco",
        "product_term",
        "variant_code",
        "x-axis",
        "y-axis"
  ]
  const formFieldLabel = (value) => value == "x-axis" ? "Age" : value == "y-axis" ? "PPT" : value.split('_').map(i => i.charAt(0).toUpperCase()+i.slice(1)).join(" ");
  
  const formField = {
    gender : "",
    tobacco : "",
    productTerm : "",
    age : "",
    ppt : "",
    fromDate : "",
    varientCode : ""
  }
  const [premiumPrc, setPremiumPrc] = useState(0);
  //const [formField, setFormField] = useState(formFieldInitValues);
  

  useEffect(() => {
    console.log(formField);
    if (resetForm) return;
  },[]);

  const onFinish = async (values) => {
    console.log('Success:', values, "----", formField);
    try {
      const { gender,tobacco,productTerm, age, ppt, fromDate, varientCode } = values;
      const fDate = formatDate(fromDate, 'form-date');
      const response = await axios.get(`http://localhost:5000/excelupload/single_premium_record?uploadId=${uploadId}&age=${age}&ppt=${ppt}&from=${fDate}&gender=${gender}&variant_code=${varientCode}&product_term=${productTerm}&tobacco=${tobacco}`)
      console.log(JSON.parse(JSON.stringify(response)));
      if (response.data.status == "success" && response.data.data) {
        if (response.data.data.premium) setPremiumPrc(response.data.data.premium);
      }
      else setPremiumPrc("N/A");
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formFields = (criteria_field_Array) => {
    return criteria_field_Array.map(el => {
      return (
        <>
          <Form.Item
            label={formFieldLabel(el)}
            name={el}
            rules={[
              {
                required: true,
                message: 'This field is required!',
              },
            ]}
          >
            <Input value={formField[el]}/>
          </Form.Item>
        </>
      )
    })
      
    
  }

  return (
    <>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      { formFields(criteria_field_Array) }

      <Form.Item label="DatePicker" name="fromDate"
        rules={[
          {
            required : true,
            message : 'This field is required!'
          }
        ]}
      >
          <DatePicker value={formField.fromDate}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Get Premium Price
        </Button>
      </Form.Item>
      </Form>
      <h3 style={{"text-align" : "center", "color" : "#0080ff", "display" : `${premiumPrc ? "block" : "none"}`}}> {premiumPrc ? `Premium Price is` : ""} {premiumPrc ? `${premiumPrc}` : ""}</h3>
    </>
  )
}

const DynamicModal = ({ component, showModal, handleOk, handleCancel, title }) => {
  return (
    <Modal
      title={title}
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {component}
    </Modal>
  )
}

export default DynamicTable;
