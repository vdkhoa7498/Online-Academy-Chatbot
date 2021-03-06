import React, { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

const HeaderMenu = (props) => {
  const menu = props.menu;

  const RenderSubMenu = ({ parentId }) => {
    return (
      <Menu theme="light" defaultSelectedKeys={["0"]}>
        {menu.map((item, index) => {
          if (parentId === item.parentId) {
            return (
              <Menu.Item key={index}>
                <Link to={`/courses/category/${item._id}`}>{item.name}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  };

  return (
    <div className="header-menu">
      <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["-2"]}>
        <Menu.Item key="-2">
          <Link to="/">
            <HomeOutlined />
            {` Home`}
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="-1">
          <Link>
            <AppstoreOutlined />
            {` Tất cả`}
          </Link>
        </Menu.Item> */}
        {menu.map((item, index) => {
          if (!item.parentId) {
            return (
              <Menu.Item key={index}>
                <Dropdown
                  overlay={<RenderSubMenu parentId={item._id} />}
                  placement="bottomLeft"
                >
                  <Button type="text">
                    <Link to={`/courses/category/${item._id}`}>
                      {item.name}
                    </Link>
                  </Button>
                </Dropdown>
              </Menu.Item>
            );
          } else {
            return null;
          }
        })}
      </Menu>
    </div>
  );
};
const mapState = (state) => ({
  menu: state.category.categories,
});
const mapDispatch = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapState, mapDispatch)(HeaderMenu);
