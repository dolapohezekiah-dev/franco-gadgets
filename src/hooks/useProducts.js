import { useAdmin } from "../context/AdminContext";
import { products as staticProducts } from "../data/products";

export function useProducts() {
  const { adminProducts } = useAdmin();
  return adminProducts !== null ? adminProducts : staticProducts;
}
