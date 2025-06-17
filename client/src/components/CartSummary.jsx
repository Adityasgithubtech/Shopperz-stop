import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

export default function CartSummary() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalAmount,
  } = useCart();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-hunter_green-700 dark:text-mindaro-400">
        Cart Summary
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4"
            >
              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dark_green-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ${item.price} × {item.quantity}
                </p>
                <p className="font-medium text-hunter_green-700 dark:text-mindaro-300">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="p-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300"
                >
                  <FaMinus />
                </button>

                <span className="text-lg font-medium">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="p-2 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300"
                >
                  <FaPlus />
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-3 p-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="text-right text-xl font-bold text-hunter_green-800 dark:text-mindaro-400 mt-6">
            Total Amount: ${getTotalAmount().toFixed(2)}
          </div>
          
        </div>
      )}
    </div>
  );
}
