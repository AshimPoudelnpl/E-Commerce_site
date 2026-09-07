import DashBoardBoxes from "../../Components/DashboardBoxes";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { FaRegEye, FaTrash } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import tShirtImage from "../../assets/4284_plain_t-shirt_2048x2048_85d.webp";
import { getData } from "../../utils/api";
import { Link } from "react-router-dom";

type DashProduct = {
  _id: string;
  title: string;
  image: string;
  category: string;
  subCategory: string;
  thirdCatName: string;
  brand: string;
  rams: string;
  size: string;
  weight: string;
  newPrice: number;
  oldPrice: number;
  countInStock: number;
  rating: number;
  isFeatured: boolean;
};

const Dashboard = () => {
  const [products, setProducts] = useState<DashProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        const arr: DashProduct[] = (res?.products || []).slice(0, 8).map((p: any) => ({
          _id: p._id,
          title: p.name,
          image: p.images?.[0] || "",
          category: p.catName || "—",
          subCategory: p.subCatName || "—",
          thirdCatName: p.thirdCatName || "—",
          brand: p.brand || "—",
          rams: p.rams || "—",
          size: p.size || "—",
          weight: p.weight || "—",
          newPrice: p.price || 0,
          oldPrice: p.oldPrice || 0,
          countInStock: p.countInStock || 0,
          rating: p.rating || 0,
          isFeatured: p.isFeatured || false,
        }));
        setProducts(arr);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <DashBoardBoxes />

      {/* Recent Products Table */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Recent Products</h2>
          <Link to="/products" className="text-sm text-blue-600 hover:underline font-medium">
            View All
          </Link>
        </div>

        <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid rgba(0,0,0,0.08)" }}>
          <Table size="small" aria-label="recent products">
            <TableHead>
              <TableRow>
                {["Product", "Category", "Sub Category", "3rd Level", "Brand", "RAMS", "Size", "Weight", "Stock", "Price", "Rating", "Featured", "Action"].map((h) => (
                  <TableCell key={h} className="!bg-gray-50 !font-bold !text-gray-700 !text-xs !uppercase !tracking-wide">
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 13 }).map((__, j) => (
                      <TableCell key={j}><Skeleton variant="text" height={20} /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    <span className="text-gray-400 py-6 block text-sm">No products yet.</span>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow hover key={p._id}>
                    {/* Product */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={p.image || tShirtImage} alt={p.title}
                          className="w-9 h-9 rounded object-cover border flex-shrink-0" />
                        <span className="text-[12px] font-medium text-gray-800 max-w-[180px] line-clamp-2 leading-snug">
                          {p.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs">{p.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs">{p.subCategory}</span>
                    </TableCell>
                    <TableCell><span className="text-xs text-gray-600">{p.thirdCatName}</span></TableCell>
                    <TableCell><span className="text-xs text-gray-700">{p.brand}</span></TableCell>
                    <TableCell>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{p.rams}</span>
                    </TableCell>
                    <TableCell>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{p.size}</span>
                    </TableCell>
                    <TableCell><span className="text-xs text-gray-600">{p.weight}</span></TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${p.countInStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {p.countInStock > 0 ? p.countInStock : "Out"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {p.oldPrice > p.newPrice && (
                          <span className="text-gray-400 line-through text-[11px]">${p.oldPrice.toFixed(2)}</span>
                        )}
                        <span className="text-[#3872fa] font-semibold text-[12px]">${p.newPrice.toFixed(2)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-amber-600">★ {p.rating.toFixed(1)}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${p.isFeatured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.isFeatured ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        <IconButton size="small" className="!text-gray-500 hover:!text-[#3872fa]"><FiEdit2 size={13} /></IconButton>
                        <IconButton size="small" className="!text-gray-500 hover:!text-[#3872fa]"><FaRegEye size={13} /></IconButton>
                        <IconButton size="small" className="!text-gray-500 hover:!text-red-600"><FaTrash size={13} /></IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Dashboard;
