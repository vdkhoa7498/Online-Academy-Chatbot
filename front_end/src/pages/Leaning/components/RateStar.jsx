import React, {useState} from 'react'
import { Rate } from 'antd';


const desc = ['Quá tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

export default function RateStar({ rate, onChangeRate}) {
  return (
    <div>
      <span>
        <Rate tooltips={desc} onChange={onChangeRate} value={rate} />
        {rate ? <span className="ant-rate-text">{desc[rate - 1]}</span> : ''}
      </span>
    </div>
  )
}
