import { useDispatch } from "react-redux";
// import { removeFromCart } from "../redux/actions";
import { removeFromCart } from "@/actions";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <p className="text-lg font-bold">{item?.name}</p>
        <p className="text-gray-500">
          ${item?.price ? item.price.toFixed(2) : "NA"}
        </p>
      </div>
      <button
        className="text-red-500 hover:text-red-700 font-bold"
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  );
}
