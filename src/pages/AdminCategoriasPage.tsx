import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  image: "",
  productCount: 0
};

const AdminCategoriasPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      toast.error("Error al obtener categorías");
      setCategories([]);
    } else {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar categoría");
    } else {
      toast.success("Categoría eliminada");
      fetchCategories();
    }
  };

  const handleOpenForm = (category = null) => {
    if (category) {
      setForm({ ...category });
      setEditId(category.id);
    } else {
      setForm(initialForm);
      setEditId(null);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setForm(initialForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("El nombre es obligatorio");
      return;
    }
    let result;
    if (editId) {
      result = await supabase.from("categories").update(form).eq("id", editId);
    } else {
      result = await supabase.from("categories").insert([form]);
    }
    if (result.error) {
      toast.error("Error al guardar categoría");
    } else {
      toast.success(editId ? "Categoría actualizada" : "Categoría creada");
      fetchCategories();
      handleCloseForm();
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
          <Button variant="outline" className="border-[#D3E4FD] text-gray-800 transition-all duration-200 hover:shadow-lg hover:bg-[#2563eb]/10 hover:scale-105" onClick={() => navigate('/admin')}>
            ← Volver
          </Button>
        </div>
        <div className="flex justify-between mb-6">
          <Button className="bg-[#D3E4FD] hover:bg-[#2563eb] text-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105" onClick={fetchCategories} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar lista"}
          </Button>
          <Button className="bg-[#FEC6A1] hover:bg-[#ff9800] text-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105" onClick={() => handleOpenForm()}>
            Crear categoría
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Productos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: any) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td><img src={cat.image} alt={cat.name} className="w-16 h-10 object-cover rounded" /></td>
                  <td>{cat.productCount}</td>
                  <td className="space-x-2">
                    <Button size="sm" onClick={() => handleOpenForm(cat)}>
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal/Formulario para crear/editar categoría */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4 relative">
              <button type="button" onClick={handleCloseForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">×</button>
              <h2 className="text-xl font-bold mb-2">{editId ? "Editar categoría" : "Crear categoría"}</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 mb-1">Nombre</label>
                  <Input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Imagen (URL)</label>
                  <Input name="image" value={form.image} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Cantidad de productos</label>
                  <Input name="productCount" type="number" value={form.productCount} onChange={handleChange} min={0} />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800">
                    {editId ? "Guardar cambios" : "Crear categoría"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoriasPage; 