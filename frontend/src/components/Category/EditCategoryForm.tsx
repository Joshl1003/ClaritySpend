import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateCategory } from "@/services/CategoryService";

interface Category {
    id: number;
    name: string;
    user_id: number;
}

interface EditCategoryFormProps {
    category: Category;
  onSuccess: () => void; 
}

export default function EditCategoryForm({ category, onSuccess }: EditCategoryFormProps) {
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      name,           
    };

    try {
          await updateCategory(payload); 
          onSuccess();
        } catch (err: any) {
          const detail =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to update category";
          console.error("Error updating category:", err);
          setError(String(detail));
        } finally {
          setLoading(false);
        }
      };

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-4 border rounded-lg mt-4 flex gap-2 flex-col max-w-lg"
    >
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
      </div>

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}