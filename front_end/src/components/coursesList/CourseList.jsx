import React from 'react'
import { Divider,  Pagination, Empty } from 'antd'
import CourseItem from '../../components/courseItem/CourseItem'
import { httpClient } from "../../api";


import './styles.scss'

export default function CourseList({ titleList, courses,  isWatchList, onHandleRemove  }) {

  return (
    <div>
      <div className="courseListCategory-container">
            <Divider/>
            <h1 className="title-page">{titleList}</h1>
            {
              (!courses) ? <Empty/> :
                courses.map((item, index)=>{
                    return(
                       <CourseItem key={index} item={item} isWatchList={isWatchList} 
                       onRemoveCourse={ () => onHandleRemove(item.id)} />       
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
