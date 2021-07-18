import React from 'react'
import { Divider,  Pagination } from 'antd'
import CourseItem from '../../components/courseItem/CourseItem'
import { httpClient } from "../../api";


import './styles.scss'

export default function CourseList({ titleList, courses,  isWatchList, onHandleRemoveFavoriteCourse  }) {

  const handleRemoveCourse = async (id) =>{
    try {
      await httpClient.user.removeFavoriteCourse(id);
    }
    catch(error) {
      console.log("error", error)
    };
  }

  return (
    <div>
      <div className="courseListCategory-container">
            <Divider/>
            <h1 className="title-page">{titleList}</h1>
            {
              (!courses) ? null :
                courses.map((item, index)=>{
                    return(
                       <CourseItem key={index} item={item} isWatchList={isWatchList} 
                       onRemoveCourse={ () => onHandleRemoveFavoriteCourse(item.id)} />       
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
