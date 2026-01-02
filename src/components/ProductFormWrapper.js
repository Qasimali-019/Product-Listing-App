import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

function ProductFormWrapper({ products, onSave, onCancel, ...rest }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find the product by id for editing, or null for add
  let product = null;
  if (id && products) {
    product = products.find(p => String(p.id) === id);
  }

  return (
    <ProductForm
      {...rest}
      product={product}
      onSave={(updatedProduct) => {
        onSave(updatedProduct);
        navigate("/");
      }}
      onCancel={() => navigate("/")}
    />
  );
}

export default ProductFormWrapper;