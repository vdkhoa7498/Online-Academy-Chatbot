import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import { Rate, Comment, Tooltip, Avatar, Divider, List, Pagination, Row, Col, Space, Image, Button } from 'antd'

import "video-react/dist/video-react.css"; 

import { httpClient } from '../../api'
import './styles.scss';


export default function Learning() {
  const [videos, setVideos] = useState([])

  const [video, setVideo] = useState({});

  const param = useParams()

  useEffect(() => {
    const fetchCourseDetail = async () => {
        const videos = await httpClient.course.getVideoOfCourse(param.id);
        setVideo(videos[0]);
        setVideos(videos);
    }

    fetchCourseDetail();
  },[param.id])

  const handleChangeVideo = (video) => {
      setVideo(video);
    
  }


  if (videos.length===0)
    return <div>Loading</div>

  console.log("video.url", video.url)

  return (
    <div>
      <Row className="video">
        <Col span={16}>
          <Player
          fluid={false}
          height={700}
          width={1070}
          playsInline
          poster="./logo_32.png"
          src={video.url}
        />
        </ Col>
        <Col span={8}>
          <div>  
            <List
              size="small"
              bordered
              dataSource={videos}
              renderItem={item => <List.Item onClick={() => handleChangeVideo(item)}>{item.title}</List.Item>}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}
