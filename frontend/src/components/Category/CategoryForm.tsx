import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/services/CategoryService";

interface CategoryFormProps {
  onSuccess: () => void; // called after successful create
}

export default function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [name, setName] = useState("");
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
          await createCategory(payload);
          setName("");
          onSuccess();
        } catch (err: any) {
          const detail =
            err?.response?.data?.detail ||
            err?.message ||
            "Failed to create category";
          console.error("Create category failed:", err);
          setError(String(detail));
        } finally {
          setLoading(false);
        }
      };
    

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg mt-4 flex gap-2 flex-col max-w-lg">
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
          {loading ? "Creating..." : "Create Category"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}
