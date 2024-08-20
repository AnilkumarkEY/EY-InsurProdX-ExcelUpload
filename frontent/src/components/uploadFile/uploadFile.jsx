import { ChangeEvent, useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFile = ({updateCriteria}) => {  
    const props = {
        name: 'file',
        action: 'http://localhost:5000/excelupload/upload_rate_excel',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
            console.log(info, 'information');
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
              const criteria_fields = info.fileList[0].response.msg[0].criteria_fields.filter(el => !["rate_id", "effective_from", "effective_to"].includes(el))
              console.log(criteria_fields);
              //criteria_field_Array = criteria_fields;
              updateCriteria(criteria_fields);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
        }
    }


    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    )
}

export default UploadFile