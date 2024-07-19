import React, { useState, useEffect } from "react";
import { Button, Input, Table, Modal, Upload, Drawer } from "antd";
import { UploadOutlined, SearchOutlined } from '@ant-design/icons';

const Store = () => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreImage, setNewStoreImage] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemImage, setEditItemImage] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImage, setEditCategoryImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState("");
  const [editProductImage, setEditProductImage] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewCategoryModalVisible, setViewCategoryModalVisible] = useState(false);
  const [viewCategoryProducts, setViewCategoryProducts] = useState([]);
  const [viewCategoryDrawerVisible, setViewCategoryDrawerVisible] = useState(false);
  const [viewCategoryDrawerItems, setViewCategoryDrawerItems] = useState([]);
  const [viewProductDrawerVisible, setViewProductDrawerVisible] = useState(false);
  const [viewProductDrawerItems, setViewProductDrawerItems] = useState([]);
  const [savedStores, setSavedStores] = useState(() => {
    const savedItems = localStorage.getItem('savedStores');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('savedStores', JSON.stringify(savedStores));
  }, [savedStores]);

  const handleAddStore = () => {
    if (newStoreName.trim() === "" || newStoreImage.trim() === "") return;

    const newStore = { id: items.length + 1, name: newStoreName, image: newStoreImage, categories: [] };
    setItems([...items, newStore]);
    setNewStoreName("");
    setNewStoreImage("");
  };

  const handleUpdateItem = () => {
    if (editItemName.trim() === "" || editItemImage.trim() === "") return;

    const updatedItems = items.map((item) =>
      item.id === editItemId ? { ...item, name: editItemName, image: editItemImage } : item
    );
    setItems(updatedItems);
    setEditItemId(null);
    setEditItemName("");
    setEditItemImage("");
  };

  const handleDeleteItem = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleAddCategory = (storeId) => {
    if (newCategoryName.trim() === "" || newCategoryImage.trim() === "") return;

    const updatedItems = items.map((item) => {
      if (item.id === storeId) {
        return {
          ...item,
          categories: [
            ...item.categories,
            {
              id: item.categories.length + 1,
              name: newCategoryName.trim(),
              image: newCategoryImage,
              products: [],
            },
          ],
        };
      }
      return item;
    });

    setItems(updatedItems);
    setNewCategoryName("");
    setNewCategoryImage("");
    setSelectedStore(null);
    setIsAddingCategory(false);
  };

  const handleUpdateCategory = () => {
    if (editCategoryName.trim() === "" || editCategoryImage.trim() === "") return;

    const updatedItems = items.map((item) => {
      if (item.id === selectedStore) {
        return {
          ...item,
          categories: item.categories.map((category) =>
            category.id === editCategoryId ? { ...category, name: editCategoryName, image: editCategoryImage } : category
          ),
        };
      }
      return item;
    });

    setItems(updatedItems);
    setEditCategoryId(null);
    setEditCategoryName("");
    setEditCategoryImage("");
  };

  const handleAddProduct = () => {
    if (newProductName.trim() === "" || newProductImage.trim() === "" || newProductPrice.trim() === "") return;

    const updatedItems = items.map((item) => {
      if (item.id === selectedStore) {
        return {
          ...item,
          categories: item.categories.map((category) => {
            if (category.name === selectedCategory) {
              return {
                ...category,
                products: [
                  ...category.products,
                  {
                    id: category.products.length + 1,
                    name: newProductName.trim(),
                    image: newProductImage,
                    price: newProductPrice,
                  },
                ],
              };
            }
            return category;
          }),
        };
      }
      return item;
    });

    setItems(updatedItems);
    setNewProductName("");
    setNewProductImage("");
    setNewProductPrice("");
    setSelectedStore(null);
    setSelectedCategory("");
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = () => {
    if (editProductName.trim() === "" || editProductImage.trim() === "" || editProductPrice.trim() === "") return;

    const updatedItems = items.map((item) => {
      if (item.id === selectedStore) {
        return {
          ...item,
          categories: item.categories.map((category) =>
            category.name === selectedCategory ? {
              ...category,
              products: category.products.map((product) =>
                product.id === editProductId ? {
                  ...product,
                  name: editProductName,
                  image: editProductImage,
                  price: editProductPrice,
                } : product
              ),
            } : category
          ),
        };
      }
      return item;
    });

    setItems(updatedItems);
    setEditProductId(null);
    setEditProductName("");
    setEditProductImage("");
    setEditProductPrice("");
    setIsEditingProduct(false);
  };

  const handleViewCategories = (categories) => {
    setViewCategoryDrawerItems(categories);
    setViewCategoryDrawerVisible(true);
  };

  const handleViewProducts = (products) => {
    setViewProductDrawerItems(products);
    setViewProductDrawerVisible(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSaveStores = () => {
    setSavedStores([...savedStores, ...items]);
  };

  const handleClearItems = () => {
    setItems([]);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      render: (_, record) => (
        <div>
          {record.categories.map(category => (
            <div key={category.id}>
              <h4>{category.name}</h4>
              <img src={category.image} alt="" width="50" />
              <Button onClick={() => {
                setSelectedStore(record.id);
                setIsEditingCategory(true);
                setEditCategoryId(category.id);
                setEditCategoryName(category.name);
                setEditCategoryImage(category.image);
              }}>
                Edit Category
              </Button>
            </div>
          ))}
          <Button onClick={() => handleViewCategories(record.categories)}>
            View Categories
          </Button>
          <Button onClick={() => {
            setSelectedStore(record.id);
            setIsAddingCategory(true);
          }}>
            Add Category
          </Button>
        </div>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'categories',
      key: 'products',
      render: (_, record) => (
        <div>
          {record.categories.map(category => (
            <div key={category.id}>
              {category.products.map(product => (
                <div key={product.id}>
                  <h4>{product.name}</h4>
                  <img src={product.image} alt="" width="50" />
                  <p>{product.price}</p>
                  <Button onClick={() => {
                    setSelectedStore(record.id);
                    setSelectedCategory(category.name);
                    setIsEditingProduct(true);
                    setEditProductId(product.id);
                    setEditProductName(product.name);
                    setEditProductImage(product.image);
                    setEditProductPrice(product.price);
                  }}>
                    Edit Product
                  </Button>
                </div>
              ))}
            </div>
          ))}
          <Button onClick={() => handleViewProducts(record.categories.flatMap(category => category.products))}>
            View Products
          </Button>
          <Button onClick={() => {
            setSelectedStore(record.id);
            setSelectedCategory(record.categories.length ? record.categories[0].name : "");
            setIsAddingProduct(true);
          }}>
            Add Product
          </Button>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button onClick={() => {
            setEditItemId(record.id);
            setEditItemName(record.name);
            setEditItemImage(record.image);
          }}>
            Edit
          </Button>
          <Button onClick={() => handleDeleteItem(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Store Management</h1>
      <Input
        placeholder="Search stores..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Input
        placeholder="New store name"
        value={newStoreName}
        onChange={(e) => setNewStoreName(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Upload
        listType="picture"
        beforeUpload={(file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => setNewStoreImage(reader.result);
          return false;
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload Store Image</Button>
      </Upload>
      <Button onClick={handleAddStore} style={{ marginBottom: 16 , backgroundColor:'black' ,color:'white'}}>Add Store</Button>
      <Button onClick={handleSaveStores} type="primary" style={{ marginBottom: 16, marginLeft: 8 ,backgroundColor:'black' ,color:'white'}}>
        Save Stores
      </Button>
      <Button onClick={handleClearItems} danger style={{ marginBottom: 16, marginLeft: 8 }}>
        Clear Stores
      </Button>
      <Table columns={columns} dataSource={filteredItems} rowKey="id" />

      <Modal
        visible={isAddingCategory}
        title="Add Category"
        onCancel={() => setIsAddingCategory(false)}
        onOk={() => handleAddCategory(selectedStore)}
      >
        <Input
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Upload
          listType="picture"
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setNewCategoryImage(reader.result);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Category Image</Button>
        </Upload>
      </Modal>

      <Modal
        visible={isEditingCategory}
        title="Edit Category"
        onCancel={() => setIsEditingCategory(false)}
        onOk={handleUpdateCategory}
      >
        <Input
          placeholder="Edit category name"
          value={editCategoryName}
          onChange={(e) => setEditCategoryName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Upload
          listType="picture"
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setEditCategoryImage(reader.result);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Category Image</Button>
        </Upload>
      </Modal>

      <Modal
        visible={isAddingProduct}
        title="Add Product"
        onCancel={() => setIsAddingProduct(false)}
        onOk={handleAddProduct}
      >
        <Input
          placeholder="New product name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="New product price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Upload
          listType="picture"
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setNewProductImage(reader.result);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Product Image</Button>
        </Upload>
      </Modal>

      <Modal
        visible={isEditingProduct}
        title="Edit Product"
        onCancel={() => setIsEditingProduct(false)}
        onOk={handleUpdateProduct}
      >
        <Input
          placeholder="Edit product name"
          value={editProductName}
          onChange={(e) => setEditProductName(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Input
          placeholder="Edit product price"
          value={editProductPrice}
          onChange={(e) => setEditProductPrice(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Upload
          listType="picture"
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setEditProductImage(reader.result);
            return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Product Image</Button>
        </Upload>
      </Modal>

      <Drawer
        title="View Categories"
        visible={viewCategoryDrawerVisible}
        onClose={() => setViewCategoryDrawerVisible(false)}
      >
        {viewCategoryDrawerItems.map(category => (
          <div key={category.id}>
            <h4>{category.name}</h4>
            <img src={category.image} alt="" width="50" />
          </div>
        ))}
      </Drawer>

      <Drawer
        title="View Products"
        visible={viewProductDrawerVisible}
        onClose={() => setViewProductDrawerVisible(false)}
      >
        {viewProductDrawerItems.map(product => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <img src={product.image} alt="" width="50" />
            <p>{product.price}</p>
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default Store;