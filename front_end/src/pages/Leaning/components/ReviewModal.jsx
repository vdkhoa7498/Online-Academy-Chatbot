
import React, { useState} from 'react'
import { Modal, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import RateStar from './RateStar';
import { httpClient } from '../../../api'


export default function ReviewModal({ visible, courseId, setVisible, confirmLoading, onCancel}) {
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");

  const handleChangeRate = value  => {
    setRate(value);
  }

  const handleChangeComment = e => {
    setComment(e.target.value);
  }

  const handleOk = async () => {
    const content = {
      content: comment,
      rate
    }
    const result = await httpClient.rate.createRate(courseId, content);
    console.log("result",result);
    if (result)
      toast("Đánh giá thành công");
    else 
      toast("Bạn đã đánh giá khoá học này")
    setVisible(false);
  };

  return (
    <div>
      <ToastContainer />
        <Modal
        title="Đánh giá khoá học"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <RateStar rate={rate} onChangeRate={handleChangeRate}/>
        <Input placeholder="Đánh giá" value={comment} onChange={handleChangeComment}/>
        
      </Modal>
    </div>
  )
}
