import React, { useState } from "react";
import { Layout, theme } from "antd";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import SiderComponent from "./components/SiderComponent";
import HeaderComponent from "./components/HeaderComponent";
import ContentComponent from "./components/ContentComponent";


const { Sider} = Layout;

const App = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <BrowserRouter>
  
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor:'black'}}>
          <div className="demo-logo-vertical" />
          <SiderComponent  />
        </Sider>
        <Layout>
          <HeaderComponent
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
            colorBgContainer={colorBgContainer}
          />

          <ContentComponent
            colorBgContainer={colorBgContainer}
            borderRadiusLG={borderRadiusLG}
          />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
