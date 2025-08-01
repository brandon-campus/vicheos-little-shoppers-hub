import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  description: "",
  price: "0", // Cambiado a "0" como valor por defecto
  image: "",
  category: "",
  isOffer: false,
  discountPercentage: 0,
  stock: 1,
  gallery: "",
  features: "",
  isNew: false,
  rating: 0,
  reviews: 0,
  tallyFormUrl: ""
};

// Función mejorada para subir imágenes
async function uploadImageToSupabase(file) {
  try {
    console.log("=== SUBIENDO IMAGEN ===");
    console.log("Archivo:", file);
    console.log("Nombre del archivo:", file.name);
    console.log("Tipo del archivo:", file.type);
    console.log("Tamaño del archivo:", file.size);
    
    // Verificar que el archivo existe
    if (!file) {
      throw new Error("No se proporcionó ningún archivo");
    }
    
    // Verificar el tipo de archivo
    if (!file.type.startsWith('image/')) {
      throw new Error("El archivo debe ser una imagen");
    }
    
    // Limpiar el nombre del archivo
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Reemplazar caracteres especiales con guiones bajos
      .replace(/_+/g, '_') // Reemplazar múltiples guiones bajos con uno solo
      .replace(/^_|_$/g, ''); // Eliminar guiones bajos al inicio y final
    
    // Crear ruta del archivo con nombre limpio
    const filePath = `imagenes/${Date.now()}_${cleanFileName}`;
    
    console.log("Nombre limpio:", cleanFileName);
    console.log("Ruta del archivo:", filePath);
    
    // Subir el archivo
    const { data, error } = await supabase.storage
      .from('productos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error("Error al subir archivo:", error);
      throw new Error(`Error al subir archivo: ${error.message}`);
    }
    
    console.log("Archivo subido exitosamente:", data);
    
    // Obtener la URL pública
    const { data: publicUrlData } = supabase.storage
      .from('productos')
      .getPublicUrl(data.path);
    
    console.log("URL pública:", publicUrlData.publicUrl);
    
    return publicUrlData.publicUrl;
    
  } catch (error) {
    console.error("Error en uploadImageToSupabase:", error);
    throw error;
  }
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("productos").select("*");
    if (error) {
      toast.error("Error al obtener productos");
      setProducts([]);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar producto");
    } else {
      toast.success("Producto eliminado");
      fetchProducts();
    }
  };

  const handleOpenForm = (product = null) => {
    if (product) {
      setForm({
        ...product,
        price: product.price.toString(),
        gallery: Array.isArray(product.gallery) ? product.gallery.join("|") : product.gallery || "",
        features: Array.isArray(product.features) ? product.features.join("|") : product.features || ""
      });
      setEditId(product.id);
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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file as File));
    } else {
      setImagePreview("");
    }
  };

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    if (files.length > 0) {
      setGalleryPreviews(files.map(file => URL.createObjectURL(file as File)));
    } else {
      setGalleryPreviews([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("=== INICIO DE SUBIDA DE PRODUCTO ===");
    console.log("Form data:", form);
    console.log("Image file:", imageFile);
    console.log("Gallery files:", galleryFiles);
    
    // Solo el nombre es obligatorio
    if (!form.name.trim()) {
      toast.error("El nombre del producto es obligatorio");
      return;
    }

    let imageUrl = form.image;
    let galleryUrls = typeof form.gallery === "string" ? form.gallery.split("|").map((url) => url.trim()).filter(Boolean) : [];
    
    try {
      // Subir imagen principal si hay archivo nuevo
      if (imageFile) {
        console.log("Subiendo imagen principal...");
        imageUrl = await uploadImageToSupabase(imageFile);
        console.log("Imagen principal subida:", imageUrl);
      } else {
        console.log("No hay archivo de imagen para subir, usando URL existente:", imageUrl);
      }
      
      // Subir galería si hay archivos nuevos
      if (galleryFiles.length > 0) {
        console.log("Subiendo galería...");
        const uploads = await Promise.all(galleryFiles.map(file => uploadImageToSupabase(file)));
        galleryUrls = uploads;
        console.log("Galería subida:", galleryUrls);
      } else {
        console.log("No hay archivos de galería para subir, usando URLs existentes:", galleryUrls);
      }
    } catch (err) {
      console.error("Error al subir imágenes:", err);
      toast.error("Error al subir imágenes: " + err.message);
      return;
    }

    const productData = {
      ...form,
      name: form.name.trim(),
      price: parseFloat(form.price) || 0,
      category: form.category || "Sin categoría",
      stock: Number(form.stock) || 1,
      discountPercentage: Number(form.discountPercentage) || 0,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      image: imageUrl || "",
      gallery: galleryUrls,
      features: typeof form.features === "string" ? form.features.split("|").map((f) => f.trim()).filter(Boolean) : [],
    };

    console.log("Datos finales del producto a guardar:", productData);

    let result;
    if (editId) {
      result = await supabase.from("productos").update(productData).eq("id", editId);
    } else {
      result = await supabase.from("productos").insert([productData]);
    }
    
    if (result.error) {
      console.error("Error al guardar producto:", result.error);
      toast.error("Error al guardar producto: " + result.error.message);
    } else {
      console.log("Producto guardado exitosamente:", result.data);
      toast.success(editId ? "Producto actualizado" : "Producto creado exitosamente");
      fetchProducts();
      handleCloseForm();
      setImageFile(null);
      setGalleryFiles([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB] py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <Button variant="outline" className="border-[#D3E4FD] text-gray-800 transition-all duration-200 hover:shadow-lg hover:bg-[#2563eb]/10 hover:scale-105" onClick={() => navigate('/admin')}>
            ← Volver
          </Button>
        </div>
        <div className="flex justify-between mb-6">
          <Button className="bg-[#D3E4FD] hover:bg-[#2563eb] text-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105" onClick={fetchProducts} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar lista"}
          </Button>
          <Button className="bg-[#FEC6A1] hover:bg-[#ff9800] text-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105" onClick={() => handleOpenForm()}>
            Crear producto
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>S/ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td className="space-x-2">
                    <Button size="sm" onClick={() => handleOpenForm(product)}>
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal/Formulario para crear/editar producto */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg space-y-4 relative max-h-[90vh] overflow-y-auto">
              <button type="button" onClick={handleCloseForm} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl">×</button>
              <h2 className="text-xl font-bold mb-2">{editId ? "Editar producto" : "Crear producto"}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">
                    Nombre del producto <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Ej: Mochila para bebé"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">Descripción</label>
                  <Textarea 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange} 
                    placeholder="Descripción del producto (opcional)"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Precio</label>
                  <Input 
                    name="price" 
                    type="number" 
                    value={form.price} 
                    onChange={handleChange} 
                    min={0} 
                    step={0.01}
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Categoría</label>
                  <Input 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    placeholder="Ej: Mochilas"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Stock</label>
                  <Input 
                    name="stock" 
                    type="number" 
                    value={form.stock} 
                    onChange={handleChange} 
                    min={0} 
                    placeholder="1"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">¿Es nuevo?</label>
                  <input 
                    name="isNew" 
                    type="checkbox" 
                    checked={form.isNew} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">¿Está en oferta?</label>
                  <input 
                    name="isOffer" 
                    type="checkbox" 
                    checked={form.isOffer} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">% Descuento</label>
                  <Input 
                    name="discountPercentage" 
                    type="number" 
                    value={form.discountPercentage} 
                    onChange={handleChange} 
                    min={0} 
                    max={100} 
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Rating</label>
                  <Input 
                    name="rating" 
                    type="number" 
                    value={form.rating} 
                    onChange={handleChange} 
                    min={0} 
                    max={5} 
                    step={0.1} 
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Reseñas</label>
                  <Input 
                    name="reviews" 
                    type="number" 
                    value={form.reviews} 
                    onChange={handleChange} 
                    min={0} 
                    placeholder="0"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">Imagen principal</label>
                  <Input 
                    name="image" 
                    value={form.image} 
                    onChange={handleChange} 
                    placeholder="URL de imagen (opcional)"
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageFileChange} 
                    className="mt-2" 
                  />
                  {/* Preview de imagen principal */}
                  {(imagePreview || form.image) && (
                    <div className="mt-2">
                      <img
                        src={imagePreview || form.image}
                        alt="Preview imagen principal"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">Galería de imágenes</label>
                  <Textarea 
                    name="gallery" 
                    value={form.gallery} 
                    onChange={handleChange} 
                    placeholder="URLs separadas por | (opcional)"
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleGalleryFilesChange} 
                    className="mt-2" 
                  />
                  {/* Previews de galería */}
                  {galleryPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {galleryPreviews.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`Preview galería ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                  {/* Si no hay previews pero sí URLs en form.gallery, mostrar esas imágenes */}
                  {galleryPreviews.length === 0 && form.gallery && typeof form.gallery === "string" && form.gallery.split("|").filter(Boolean).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.gallery.split("|").filter(Boolean).map((url, idx) => (
                        <img
                          key={idx}
                          src={url.trim()}
                          alt={`Preview galería url ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">Características</label>
                  <Textarea 
                    name="features" 
                    value={form.features} 
                    onChange={handleChange} 
                    placeholder="Características separadas por | (opcional)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">URL de formulario de compra (Tally)</label>
                  <Input 
                    name="tallyFormUrl" 
                    value={form.tallyFormUrl} 
                    onChange={handleChange} 
                    placeholder="https://tally.so/..."
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit" className="bg-[#D3E4FD] hover:bg-[#c1d8f8] text-gray-800">
                    {editId ? "Guardar cambios" : "Crear producto"}
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

export default AdminProductsPage; 