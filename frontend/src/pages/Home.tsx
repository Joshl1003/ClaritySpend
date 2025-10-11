// src/pages/Home.tsx
export default function Home() {
  return (
    
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Total Balance</h2>
          <p className="text-2xl font-semibold mt-2">$4,562.00</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Monthly Spending</h2>
          <p className="text-2xl font-semibold mt-2">$1,230.00</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm font-medium">Budget Used</h2>
          <p className="text-2xl font-semibold mt-2">68%</p>
        </div>
      </div>
    </div>
  );
}
