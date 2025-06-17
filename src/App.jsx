import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProductsPage from './pages/ProductsPage'; // Updated import
import ProductDetail from './pages/ProductDetail';
import CartSummary from './components/CartSummary';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} /> {/* Use the new page here */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartSummary />} />
      </Routes>
    </Router>
  );
}
