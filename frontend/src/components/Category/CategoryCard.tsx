import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditCategoryForm from "@/components/Category/EditCategoryForm";
import { deleteCategory } from "@/services/CategoryService";

interface Category {
  name: string
  id: number;
  user_id: number;
}

interface Props {
  category: Category;
  onDeleted?: () => void
  onUpdated?: () => void
}

export default function CategoryCard({ category, onDeleted, onUpdated}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);


  // DELETE function
  const handleDelete = async () => {
    setError(null);
    setLoading(true);

    try {
          await deleteCategory(category.id); 
          onDeleted?.();
        } catch (err: any) {
          const detail =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to delete category";
          console.error("Error deleting category:", err);
          setError(String(detail));
        } finally {
          setLoading(false);
        }
      };

  
  return (
    <div className="border rounded p-4 shadow flex flex-col gap-2">
      <div>
        <h3 className="font-semibold text-lg">{category.name}</h3>
      </div>

      <div className="flex gap-2 items-center">
        <Button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          variant="destructive"
        >
          {loading ? "Deleting..." : "Delete"}
        
        </Button>

         {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <div className="flex gap-2 items-center">
        <Button type="button" onClick={() => setEditing(true)}>
          Edit
        </Button>

        {editing && (
          <EditCategoryForm
            category={category}
            onSuccess={() => {
              setEditing(false);
              onUpdated && onUpdated();
            }}
          />
        )}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </div>
  );
}