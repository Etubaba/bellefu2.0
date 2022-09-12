import ProductItem from "./ProductItem";
import ShopComponent2 from "../shopComponents/ShopComponent2";

const Products = ({ shops }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {shops.map((item, index) => (
        <div key={index}>
          {/* <ProductItem item={item} /> */}
          <ShopComponent2 key={index} product={item} />
        </div>
      ))}
    </div>
  );
};

export default Products;
