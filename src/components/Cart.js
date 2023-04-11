import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "@/actions";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  const total = cart.reduce((acc, item) => acc + item?.price, 0);

  return (
    <div className="bg-white shadow-lg">
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Cart</h2>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item) => (
          <CartItem key={item?.id} item={item} />
        ))}
        {cart.length > 0 && (
          <>
            <hr className="my-6" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">${total.toFixed(2)}</p>
            </div>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={handleClear}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
