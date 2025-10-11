import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">ClaritySpend</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/budgets">Budgets</Link>
        <Link to="/categories">Categories</Link>
      </div>
    </nav>
  );
}
