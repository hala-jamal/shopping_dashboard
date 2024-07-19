import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal } from "antd";
import { SearchOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const AvailableStores = () => {
  const [savedStores, setSavedStores] = useState(() => {
    const savedItems = localStorage.getItem('savedStores');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = savedStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearAllSavedItems = () => {
    confirm({
      title: 'Are you sure you want to clear all saved items?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        localStorage.removeItem('savedStores');
        setSavedStores([]);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="" width="50" />,
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories) => (
        <div>
          {categories.map(category => (
            <div key={category.id}>
              <h4>{category.name}</h4>
              <img src={category.image} alt="" width="50" />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'categories',
      key: 'products',
      render: (categories) => (
        <div>
          {categories.flatMap(category => category.products).map(product => (
            <div key={product.id}>
              <h4>{product.name}</h4>
              <img src={product.image} alt="" width="50" />
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = (record) => {
    const updatedStores = savedStores.filter(store => store.id !== record.id);
    setSavedStores(updatedStores);
    localStorage.setItem('savedStores', JSON.stringify(updatedStores));
  };

  return (
    <div>
      <h1>Available Stores</h1>
      <Input
        placeholder="Search stores..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" danger onClick={clearAllSavedItems}>
        Clear All Saved Items
      </Button>
      <Table columns={columns} dataSource={filteredItems} rowKey="id" />
    </div>
  );
};

export default AvailableStores;
