import React from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Store from "../pages/Store";
import AvailableStores from "../pages/AvailableStores";


const { Content } = Layout;



const ContentComponent = (props) => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: props.colorBgContainer,
        borderRadius: props.borderRadiusLG,
        height: "100%",
      }}
    >
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/availablestores" element={<AvailableStores/>} />
      </Routes>
    </Content>
  );
};

export default ContentComponent;
