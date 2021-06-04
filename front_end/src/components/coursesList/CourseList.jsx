import React from 'react'
import { Divider,  Pagination } from 'antd'
import CourseItem from '../../components/courseItem/CourseItem'

import './styles.scss'

export default function CourseList({ titleList, courses,  isWatchList }) {
  return (
    <div>
      <div className="courseListCategory-container">
            <Divider/>
            <h1 className="title-page">{titleList}</h1>
            {
                courses.map((item, index)=>{
                    return(
                       <CourseItem key={index} item={item} isWatchList={isWatchList} />       
                    )
                })
            }
            <br/>
            <Pagination defaultCurrent={1} total={50} />
            <Divider/>
        </div>
    </div>
  )
}
