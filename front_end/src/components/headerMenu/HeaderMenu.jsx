import React, {useState} from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import Item from 'antd/lib/list/Item';

const { SubMenu } = Menu;

const menu = [
    {
        id: 0,
        categoryName: "Kinh Tế ",
        parentId: -1
    },
    {
        id: 1,
        categoryName: "Âm nhạc",
        parentId: -1
    },
    {
        id: 2,
        categoryName: "Toán học",
        parentId: -1
    },
    {
        id: 3,
        categoryName: "Vật lý",
        parentId: -1
    },
    {
        id: 4,
        categoryName: "IT",
        parentId: -1
    },
    {
        id: 5,
        categoryName: "Đàn guitar",
        parentId: 1
    },
    {
        id: 6,
        categoryName: "Thể dục",
        parentId: -1
    },
    {
        id: 7,
        categoryName: "Lập trình web",
        parentId: 4
    },
    {
        id: 8,
        categoryName: "Lập trình di động",
        parentId: 4
    }
]
const RenderSubMenu = ({parentId}) =>{
    return (
        <Menu theme='light' defaultSelectedKeys={['0']}>
            {
                menu.map((item, index)=>{
                    if (parentId === item.parentId){
                        return(
                            <Menu.Item key={index}>{item.categoryName}</Menu.Item>
                        )
                    }
                })
            }
        </Menu>
    )
}
const HeaderMenu = () =>{
    return(
        <div className="header-menu">
            <div className="logo" />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['-1']}>
                <Menu.Item key="-1"><HomeOutlined />Home</Menu.Item>
                {
                    menu.map((item, index)=>{
                        if (item.parentId < 0){
                            return(
                                <Menu.Item key = {index}>
                                    <Dropdown
                                        overlay={<RenderSubMenu parentId={item.id}/>} placement="bottomLeft"
                                    >
                                        <Button type="text">
                                            {item.categoryName}
                                        </Button>
                                    </Dropdown>
                                </Menu.Item>
                                
                            )
                        } else {
                            return null
                        }
                    })
                }
            </Menu>
        </div>
    )
    
}

export default HeaderMenu