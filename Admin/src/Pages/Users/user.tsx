import React, { useState } from "react";

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

// Change this to your actual user image
import userImage from "../../assets/shopillusration.avif";

type User = {
  id: number;
  image: string;
  name: string;
  email: string;
  phone: string;
};

const Users = () => {
  // =========================
  // State
  // =========================

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // =========================
  // Users Data
  // =========================

  const users: User[] = [
    {
      id: 1,
      image: userImage,
      name: "Vikas Kumar",
      email: "vikas@gmail.com",
      phone: "+91-9874854952",
    },
    {
      id: 2,
      image: userImage,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91-9876543210",
    },
    {
      id: 3,
      image: userImage,
      name: "Amit Singh",
      email: "amit@gmail.com",
      phone: "+91-9812345678",
    },
    {
      id: 4,
      image: userImage,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "+91-9845671234",
    },
    {
      id: 5,
      image: userImage,
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      phone: "+91-9876123456",
    },
    {
      id: 6,
      image: userImage,
      name: "Neha Singh",
      email: "neha@gmail.com",
      phone: "+91-9812345670",
    },
    {
      id: 7,
      image: userImage,
      name: "Suresh Yadav",
      email: "suresh@gmail.com",
      phone: "+91-9876543120",
    },
    {
      id: 8,
      image: userImage,
      name: "Anjali Verma",
      email: "anjali@gmail.com",
      phone: "+91-9845678912",
    },
    {
      id: 9,
      image: userImage,
      name: "Manish Gupta",
      email: "manish@gmail.com",
      phone: "+91-9812345678",
    },
    {
      id: 10,
      image: userImage,
      name: "Pooja Sharma",
      email: "pooja@gmail.com",
      phone: "+91-9876541230",
    },
  ];

  // =========================
  // Search
  // =========================

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.phone.toLowerCase().includes(searchValue)
    );
  });

  // =========================
  // Pagination
  // =========================

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // =========================
  // Render
  // =========================

  return (
    <div className="min-h-screen bg-white rounded-lg p-6">
      {/* ================= HEADER ================= */}

      <div className="mb-4 flex items-center justify-between">
        {/* Title */}

        <Typography className="!text-[18px] !font-bold !text-gray-800">
          Users List
          <span className="ml-1 !text-[13px] !font-normal !text-gray-500">
            (Material UI Table)
          </span>
        </Typography>

        {/* Search */}

        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          placeholder="Search here..."
          size="small"
          className="!w-[390px]"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch className="text-[21px] text-gray-600" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            },
          }}
        />
      </div>

      {/* ================= TABLE ================= */}

      <TableContainer
        component={Paper}
        className="
          !rounded-lg
          !shadow-[0_2px_8px_rgba(0,0,0,0.08)]
        "
      >
        <Table>
          {/* ================= TABLE HEAD ================= */}

          <TableHead>
            <TableRow>
              {/* Checkbox */}

              <TableCell padding="checkbox" className="!bg-[#f5f5f5]">
                <Checkbox size="small" />
              </TableCell>

              {/* User Image */}

              <TableCell
                className="
                  !bg-[#f5f5f5]
                  !text-[13px]
                  !font-semibold
                  !text-gray-700
                "
              >
                USER IMAGE
              </TableCell>

              {/* User Name */}

              <TableCell
                className="
                  !bg-[#f5f5f5]
                  !text-[13px]
                  !font-semibold
                  !text-gray-700
                "
              >
                USER NAME
              </TableCell>

              {/* User Email */}

              <TableCell
                className="
                  !bg-[#f5f5f5]
                  !text-[13px]
                  !font-semibold
                  !text-gray-700
                "
              >
                USER EMAIL
              </TableCell>

              {/* Phone */}

              <TableCell
                className="
                  !bg-[#f5f5f5]
                  !text-[13px]
                  !font-semibold
                  !text-gray-700
                "
              >
                USER PHONE NO
              </TableCell>
            </TableRow>
          </TableHead>

          {/* ================= TABLE BODY ================= */}

          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id} hover className="hover:!bg-gray-50">
                  {/* Checkbox */}

                  <TableCell
                    padding="checkbox"
                    className="!border-b !border-gray-200"
                  >
                    <Checkbox size="small" />
                  </TableCell>

                  {/* User Image */}

                  <TableCell className="!border-b !border-gray-200">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="
                        h-[60px]
                        w-[60px]
                        rounded-md
                        object-cover
                      "
                    />
                  </TableCell>

                  {/* User Name */}

                  <TableCell
                    className="
                      !border-b
                      !border-gray-200
                      !text-[14px]
                      !text-gray-700
                    "
                  >
                    {user.name}
                  </TableCell>

                  {/* User Email */}

                  <TableCell
                    className="
                      !border-b
                      !border-gray-200
                      !text-[14px]
                      !text-gray-700
                    "
                  >
                    {user.email}
                  </TableCell>

                  {/* Phone */}

                  <TableCell
                    className="
                      !border-b
                      !border-gray-200
                      !text-[14px]
                      !text-gray-700
                    "
                  >
                    {user.phone}
                  </TableCell>
                </TableRow>
              ))}

            {/* No Data */}

            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" className="!py-10">
                  <Typography className="!text-gray-500">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* ================= PAGINATION ================= */}

        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Rows per page:"
        />
      </TableContainer>
    </div>
  );
};

export default Users;
