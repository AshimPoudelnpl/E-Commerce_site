import React from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  MdEdit,
  MdVisibility,
  MdDelete,
  MdFileDownload,
  MdAdd,
} from "react-icons/md";

const Subcategory = () => {
  const subCategories = [
    {
      id: 1,
      image: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png",
    },
    {
      id: 2,
      image: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png",
    },
    {
      id: 3,
      image: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png",
    },
    {
      id: 4,
      image: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      {/* Page Header */}
      <div className="mb-4 flex items-center bg-white p-5 rounded-lg justify-between">
        {/* Title */}
        <div>
          <Typography variant="h6" className="!font-bold !text-gray-800">
            Sub Category List
            <span className="ml-1 text-sm font-normal text-gray-500">
              (Material UI Table)
            </span>
          </Typography>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* Export */}
          <Button
            variant="contained"
            startIcon={<MdFileDownload />}
            className="!bg-green-600 !px-5 !py-2 !text-sm !font-semibold !shadow-none hover:!bg-green-700"
          >
            Export
          </Button>

          {/* Add New */}
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            className="!bg-blue-600 !px-5 !py-2 !text-sm !font-semibold !shadow-none hover:!bg-blue-700"
          >
            Add New Sub Category
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="!rounded-lg !shadow-sm ">
        <Table stickyHeader>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {/* Checkbox */}
              <TableCell className="!bg-white" padding="checkbox">
                <Checkbox size="small" />
              </TableCell>

              {/* Image */}
              <TableCell className="!bg-white !font-bold !text-gray-700">
                IMAGE
              </TableCell>

              {/* Action */}
              <TableCell
                align="center"
                className="!bg-white !font-bold !text-gray-700"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {subCategories.map((item) => (
              <TableRow key={item.id} hover className="hover:!bg-gray-50">
                {/* Checkbox */}
                <TableCell padding="checkbox">
                  <Checkbox size="small" />
                </TableCell>

                {/* Image */}
                <TableCell>
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt="Sub category"
                      className="h-[75px] w-[75px] rounded-full object-cover"
                    />
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit */}
                    <IconButton
                      size="small"
                      className="!text-gray-600 hover:!bg-gray-100"
                    >
                      <MdEdit className="text-[20px]" />
                    </IconButton>

                    {/* View */}
                    <IconButton
                      size="small"
                      className="!text-gray-600 hover:!bg-gray-100"
                    >
                      <MdVisibility className="text-[20px]" />
                    </IconButton>

                    {/* Delete */}
                    <IconButton
                      size="small"
                      className="!text-gray-600 hover:!bg-red-50 hover:!text-red-500"
                    >
                      <MdDelete className="text-[20px]" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Subcategory;
