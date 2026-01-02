import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import ProductFormWrapper from "./components/ProductFormWrapper";
import Layout from "./components/layout";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminLogin from "./components/AdminLogin";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAdminLoggedIn: false,

      products: [],
      categories: ["All"],
      search: "",
      cart: [],
      selectedCategory: "All",
      role: "USER",
      editProduct: null,
      delivery: null, // Will be set after first shipment form
    };
  }

  componentDidMount() {
    // Load products
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));

    // Load categories
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(categories => this.setState({ categories: ["All", ...categories] }));
  }

  handleCategory = (cat) => this.setState({ selectedCategory: cat });
  handleSearch = (search) => this.setState({ search });
handleRoleChange = (role) => {
  if (role === "ADMIN" && !this.state.isAdminLoggedIn) {
    // Navigate to admin login page
    window.location.href = "/admin-login";
  } else {
    this.setState({ role });
  }
};

  handleAddProduct = (product) => {
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then(res => res.json())
      .then(newProduct => {
        this.setState(prev => ({
          products: [...prev.products, newProduct],
        }));
      });
  };

  handleEditProduct = (product) => {
    this.setState({ editProduct: product });
  };

  handleUpdateProduct = (updatedProduct) => {
    fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
      .then(res => res.json())
      .then(savedProduct => {
        this.setState(prev => ({
          products: prev.products.map(p =>
            p.id === savedProduct.id ? savedProduct : p
          ),
          editProduct: null,
        }));
      });
  };

  handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        this.setState(prev => ({
          products: prev.products.filter(p => p.id !== id),
        }));
      });
  };

  handleBuyProduct = (product) => {
    const updatedProduct = { ...product, quantity: product.quantity - 1 };
    fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
      .then(res => res.json())
      .then(savedProduct => {
        this.setState(prev => ({
          products: prev.products.map(p =>
            p.id === savedProduct.id ? savedProduct : p
          ),
        }));
      });
  };

  handleAddCategory = (newCategory) => {
    fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory }),
    })
      .then(res => res.json())
      .then(category => {
        this.setState(prev => ({
          categories: prev.categories.includes(category.name)
            ? prev.categories
            : [...prev.categories, category.name],
        }));
      });
  };

  handleAddToCart = (product) => {
    this.setState(prev => ({
      cart: [...prev.cart, product]
    }));
  };

  handleRemoveFromCart = (id) => {
    this.setState(prev => ({
      cart: prev.cart.filter(item => item.id !== id)
    }));
  };

  handleCheckout = () => {
    alert("Thank you for your purchase!");
    this.setState({ cart: [] });
  };

  handleSaveUserDetails = (details) => {
    this.setState({ delivery: details });
  };

  get filteredProducts() {
    const { products, search, selectedCategory } = this.state;
    return products.filter(
      p =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        (
          (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
        )
    );
  }

  render() {
    return (
      <Router>
        <Routes>
          {/* Main Product Grid */}
          <Route
            path="/"
            element={
              <Layout
                categories={this.state.categories}
                search={this.state.search}
                onSearch={this.handleSearch}
                selectedCategory={this.state.selectedCategory}
                onCategory={this.handleCategory}
                role={this.state.role}
                onRoleChange={this.handleRoleChange}
              >
                <ProductGrid
                  products={this.filteredProducts}
                  role={this.state.role}
                  onEdit={this.handleEditProduct}
                  onDelete={this.handleDeleteProduct}
                  onBuy={this.handleBuyProduct}
                />
              </Layout>
            }
          />

          {/* Product Detail */}
          <Route
            path="/product/:id"
            element={
              <Layout
                categories={this.state.categories}
                search={this.state.search}
                onSearch={this.handleSearch}
                selectedCategory={this.state.selectedCategory}
                onCategory={this.handleCategory}
                role={this.state.role}
                onRoleChange={this.handleRoleChange}
              >
                <ProductDetail
                  products={this.state.products}
                  userDetails={this.state.delivery}
                  onSaveUserDetails={this.handleSaveUserDetails}
                  onAddToCart={this.handleAddToCart}
                />
              </Layout>
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Layout
                categories={this.state.categories}
                search={this.state.search}
                onSearch={this.handleSearch}
                selectedCategory={this.state.selectedCategory}
                onCategory={this.handleCategory}
                role={this.state.role}
                onRoleChange={this.handleRoleChange}
              >
                <Cart
                  cart={this.state.cart}
                  onRemoveFromCart={this.handleRemoveFromCart}
                  onCheckout={this.handleCheckout}
                />
              </Layout>
            }
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <Layout
                categories={this.state.categories}
                search={this.state.search}
                onSearch={this.handleSearch}
                selectedCategory={this.state.selectedCategory}
                onCategory={this.handleCategory}
                role={this.state.role}
                onRoleChange={this.handleRoleChange}
              >
                <Checkout
                  cart={this.state.cart}
                  delivery={this.state.delivery}
                  onConfirm={this.handleCheckout}
                />
              </Layout>
            }
          />

          {/* Add Product (ADMIN only) */}
          <Route
            path="/add-product"
            element={
              <Layout
                categories={this.state.categories}
                search={this.state.search}
                onSearch={this.handleSearch}
                selectedCategory={this.state.selectedCategory}
                onCategory={this.handleCategory}
                role={this.state.role}
                onRoleChange={this.handleRoleChange}
              >
                {this.state.role === "ADMIN" && this.state.isAdminLoggedIn ? (
                  <ProductFormWrapper
                    categories={this.state.categories}
                    onAddCategory={this.handleAddCategory}
                    onSave={this.handleAddProduct}
                    onCancel={() => window.history.back()}
                  />
                ) : (
                 <div className="text-center text-red-500 font-bold py-16">
    Only admins can add products.
    <button
      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
      onClick={() => window.location.href = "/admin-login"}
    >
      Admin Login
    </button>
  </div>
)}
              </Layout>
            }
          />

          <Route
  path="/admin-login"
  element={
    <AdminLogin
      onLogin={() => this.setState({ isAdminLoggedIn: true, role: "ADMIN" })}
   
      />

  
  }
/>


          {/* Edit Product (ADMIN only) */}
          <Route
            path="/edit-product/:id"
            element={
              <Layout
                categories={this.state.categories}
                search={this.state.search}
                onSearch={this.handleSearch}
                selectedCategory={this.state.selectedCategory}
                onCategory={this.handleCategory}
                role={this.state.role}
                onRoleChange={this.handleRoleChange}
              >

                
                {this.state.role === "ADMIN" && this.state.isAdminLoggedIn ? (
                  <ProductFormWrapper
                    categories={this.state.categories}
                    onAddCategory={this.handleAddCategory}
                    products={this.state.products}
                    onSave={this.handleUpdateProduct}
                    onCancel={() => window.history.back()}
                  />
                ) : (
                  <div className="text-center text-red-500 font-bold py-16">
    Only admins can add products.
    <button
      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
      onClick={() => window.location.href = "/admin-login"}
    >
      Admin Login
    </button>
  </div>
)}
              </Layout>
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;