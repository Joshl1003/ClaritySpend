import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/Category/CategoryForm";
import CategoryCard from "@/components/Category/CategoryCard";

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
  try {
    const res = await fetch("http://localhost:8000/categories/");
    if (!res.ok) {
      console.error("Failed to fetch categories", res.status);
      return;
    }
    const data = await res.json();
    setCategories(data);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <Button onClick={() => setShowForm((prev) => !prev)}> 
        {showForm ? "Close" : "Add Category"}
      </Button>

      {showForm && (
        <CategoryForm
          onSuccess={async () => {
            await fetchCategories();
            setShowForm(false);   // closes the form after successful create
          }}
        />
      )}

      <div className="mt-4 grid gap-4">
        {categories.map((c) => (
          <CategoryCard
            key={c.id}
            category={c}
            onDeleted={fetchCategories}  // refresh after delete
            onUpdated={fetchCategories} // refresh after update
          />
        ))}
      </div> 
    </div>
    
  );
}