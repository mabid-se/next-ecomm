import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/actions";
import Image from "next/image";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <div
        key={product.id}
        className="block max-w-sm rounded-xl bg-white shadow-xl dark:bg-neutral-700"
      >
        <Link href={`/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={325}
            height={250}
            className="w-full h-48 object-cover"
          />
        </Link>

        <div className="p-5">
          <div className="grid grid-flow-col ">
            <div>
              <Link href={`/${product.id}`}>
                <h4 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {product.title}
                </h4>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <h4>${product.price}</h4>
            </div>
          </div>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {product.description}
          </p>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
