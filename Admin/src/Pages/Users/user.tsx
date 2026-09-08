import { useEffect, useState } from "react";
import {
  Checkbox,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { MdSearch } from "react-icons/md";
import userImage from "../../assets/shopillusration.avif";
import { getData } from "../../utils/api";

type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  status?: string;
};

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getData("/api/user/users")
      .then((res) => {
        if (!res?.success || !Array.isArray(res.data)) {
          setError(res?.message || "Unable to load users");
          return;
        }
        setUsers(
          res.data.map((user: any) => ({
            id: user._id,
            image: user.avatar || userImage,
            name: user.name,
            email: user.email,
            phone: user.mobile || "-",
            status: user.status,
          })),
        );
      })
      .catch(() => setError("Unable to load users"))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-white rounded-lg p-6">
      <div className="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <Typography className="!text-[18px] !font-bold !text-gray-800">
          Users List
        </Typography>
        <TextField
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(0);
          }}
          placeholder="Search here..."
          size="small"
          className="!w-full sm:!w-[390px]"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch className="text-[21px] text-gray-600" />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      <TableContainer
        component={Paper}
        className="!rounded-lg !shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "",
                "USER IMAGE",
                "USER NAME",
                "USER EMAIL",
                "USER PHONE NO",
                "STATUS",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  className="!bg-[#f5f5f5] !text-[13px] !font-semibold !text-gray-700"
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading users...
                </TableCell>
              </TableRow>
            )}
            {!loading && error && (
              <TableRow>
                <TableCell colSpan={6} align="center" className="!text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-[60px] w-[60px] rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.status || "-"}</TableCell>
                  </TableRow>
                ))}
            {!loading && !error && filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(_event, value) => setPage(value)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>
    </div>
  );
};

export default Users;
