import React from "react";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.product
      ? { ...props.product, step: 1, imageFile: null }
      : {
          step: 1,
          category: "",
          name: "",
          type: "",
          side: "",
          subtitle: "",
          year: "",
          state: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
          imageFile: null,
          id: undefined,
        };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.product &&
      (!prevProps.product || prevProps.product.id !== this.props.product.id)
    ) {
      this.setState({
        ...this.props.product,
        step: 1,
        imageFile: null,
      });
    }
  }

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      this.setState({ imageFile: files[0] });
    } else {
      this.setState({ [name]: value });
    }
  };

  nextStep = () => {
    this.setState((prev) => ({ step: prev.step + 1 }));
  };

  prevStep = () => {
    this.setState((prev) => ({ step: prev.step - 1 }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.step < 4) {
      this.nextStep();
    } else {
      let imageUrl = this.state.image;
      if (this.state.imageFile) {
        const formData = new FormData();
        formData.append('image', this.state.imageFile);
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.imageUrl;
      }
      const productData = { ...this.state, image: imageUrl };
      delete productData.imageFile;
      if (this.props.onAddCategory) {
        this.props.onAddCategory(productData.category);
      }
      if (this.props.onSave) this.props.onSave(productData);
    }
  };

  renderSteps() {
    const {
      step, category, name, type, side, subtitle, year, state, description, price, quantity, image, imageFile
    } = this.state;
    const categories = this.props.categories || [];

    // Stepper UI
    const stepper = (
      <div className="flex mb-8">
        {["Category", "Product description", "Pricing and images", "Preview"].map((label, idx) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
              ${step === idx + 1 ? "bg-blue-500 text-white" : step > idx + 1 ? "bg-blue-400 text-white" : "bg-blue-100 text-blue-500"}`}>
              {idx + 1}
            </div>
            <span className={`text-xs mt-2 font-semibold ${step === idx + 1 ? "text-blue-500" : "text-blue-400"}`}>{label}</span>
          </div>
        ))}
      </div>
    );

    // Step 1: Category (dynamic)
    if (step === 1) {
      return (
        <>
          {stepper}
          <div className="mb-8">
            <label className="block text-gray-600 mb-2 font-semibold">Category</label>
            <input
              name="category"
              value={category}
              onChange={this.handleChange}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
              placeholder="Type or select a category"
              list="category-list"
              required
            />
            <datalist id="category-list">
              {categories.filter(cat => cat !== "All").map(cat => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={this.nextStep}
              disabled={!category}
            >
              Next step
            </button>
          </div>
        </>
      );
    }

    // Step 2: Product Description
    if (step === 2) {
      return (
        <>
          {stepper}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Product name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Product name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Type</label>
              <input
                type="text"
                name="type"
                value={type}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Type"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Side</label>
              <input
                type="text"
                name="side"
                value={side}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Side"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Product sub-title</label>
              <input
                type="text"
                name="subtitle"
                value={subtitle}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Product sub-title"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Year</label>
              <input
                type="text"
                name="year"
                value={year}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Year"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="State"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1 font-semibold">Product description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
              placeholder="A small description of the product."
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              onClick={this.prevStep}
            >
              Previous step
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={this.nextStep}
              disabled={!name}
            >
              Next step
            </button>
          </div>
        </>
      );
    }

    // Step 3: Pricing and Images
    if (step === 3) {
      return (
        <>
          {stepper}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Price"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
                placeholder="Quantity"
                min="1"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1 font-semibold">Product Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={this.handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-800"
              />
              {(imageFile || image) && (
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : image && image.startsWith('/uploads/')
                        ? `http://localhost:5000${image}`
                        : image
                  }
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-contain rounded border"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              onClick={this.prevStep}
            >
              Previous step
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={this.nextStep}
              disabled={!price || !quantity}
            >
              Next step
            </button>
          </div>
        </>
      );
    }

    // Step 4: Preview
    if (step === 4) {
      return (
        <>
          {stepper}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-500">Preview</h2>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="font-semibold text-lg mb-2">{name}</div>
              <div className="mb-2">{subtitle}</div>
              <div className="mb-2">{description}</div>
              <div className="mb-2">Type: {type}</div>
              <div className="mb-2">Side: {side}</div>
              <div className="mb-2">Year: {year}</div>
              <div className="mb-2">State: {state}</div>
              <div className="mb-2">Category: {category}</div>
              <div className="mb-2">Price: {price}</div>
              <div className="mb-2">Quantity: {quantity}</div>
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-contain rounded border"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              onClick={this.prevStep}
            >
              Previous step
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </>
      );
    }
  }

  render() {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
        <form
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl"
          onSubmit={this.handleSubmit}
        >
          {this.renderSteps()}
        </form>
      </div>
    );
  }
}

export default ProductForm;