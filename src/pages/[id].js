import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cart from "@/components/Cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "@/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image from "next/image";

export default function ProductDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <Navbar />

      <div class="grid grid-cols-6">
        <div className="col-start-1 col-end-6 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Slider
                prevArrow={<div className="slick-prev">prev</div>}
                nextArrow={<div className="slick-next">next</div>}
              >
                {product.images.map((image) => (
                  <Image
                    src={image}
                    alt={product.name}
                    width={450}
                    height={325}
                  />
                ))}
              </Slider>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">
                  ${product.price}
                </span>
                <span className="text-gray-600">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  AiOutlineShoppingCart
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 px-3">
          <Cart />
        </div>
      </div>

      <Footer />
    </>
  );
}
