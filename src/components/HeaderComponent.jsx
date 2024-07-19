import React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = ({ collapsed, toggleCollapsed, colorBgContainer }) => {
  return (
    <Header 
      style={{
        padding: 0,
        backgroundColor: colorBgContainer,
        width: '100%', // Ensure header spans the full width
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default HeaderComponent;
