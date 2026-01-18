import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/Category/CategoryForm";
import CategoryCard from "@/components/Category/CategoryCard";

import { getCategories, type Category } from "@/services/CategoryService";
import { useAuth } from "@/auth/useAuth";


export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchCategories = async () => {
  try {
      const data = await getCategories();
      setCategories(data);
  } catch (e: any) {
      // If token is missing/expired, backend returns 401
      const status = e?.response?.status;

      if (status === 401) {
        await logout();
        navigate("/login", { replace: true });
        return;
      }

      console.error("Error fetching categories:", e);
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