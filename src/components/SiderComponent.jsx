import React from 'react';
import { Menu } from 'antd';
import {ShoppingOutlined,AppstoreOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SiderComponent = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{backgroundColor:'black'}}>
      <Menu.Item key="1" icon={<ShoppingOutlined />}>
        <Link to="/">Store</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<AppstoreOutlined />}>
        <Link to="/availablestores">AvailableStores</Link>
      </Menu.Item>
    </Menu>
   
  );
};

export default SiderComponent;
