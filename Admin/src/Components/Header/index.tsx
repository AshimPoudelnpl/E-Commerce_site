import React from "react";
import Button from "@mui/material/Button";
import {
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";

import { FaRegBell } from "react-icons/fa";
import {
  HiOutlineMenuAlt1,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="fixed top-0 left-[18%] z-50 flex h-[50px] w-[82%] items-center justify-between border-b border-gray-200 bg-white px-3">
      {/* Left Menu */}
      <div className="ml-[190px]">
        <Button className="!h-[40px] !w-[40px] !min-w-[40px] !rounded-full">
          <HiOutlineMenuAlt1 className="text-[20px] text-gray-600" />
        </Button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <IconButton>
          <Badge
            badgeContent={4}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px",
                minWidth: "16px",
                height: "16px",
              },
            }}
          >
            <FaRegBell className="text-[20px] text-gray-500" />
          </Badge>
        </IconButton>

        {/* Profile Avatar */}
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ padding: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src="/profile.jpg"
              sx={{
                width: 36,
                height: 36,
              }}
            >
              A
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                width: 185,
                borderRadius: "3px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.18)",
              },
            },
          }}
        >
          {/* User Information */}
          <div className="flex items-center gap-3 px-4 py-3">
            <Avatar
              src="/profile.jpg"
              sx={{
                width: 36,
                height: 36,
              }}
            >
              A
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-gray-700">
                Angelina Gotelli
              </p>

              <p className="truncate text-[11px] text-gray-500">
                admin-01@ecme.com
              </p>
            </div>
          </div>

          <Divider />

          {/* Profile */}
          <MenuItem
            onClick={handleClose}
            sx={{
              fontSize: "14px",
              minHeight: "40px",
            }}
          >
            <ListItemIcon>
              <HiOutlineUser className="text-[19px] text-gray-600" />
            </ListItemIcon>
            Profile
          </MenuItem>

          {/* Sign Out */}
          <MenuItem
            onClick={handleClose}
            sx={{
              fontSize: "14px",
              minHeight: "40px",
            }}
          >
            <ListItemIcon>
              <HiOutlineLogout className="text-[19px] text-gray-600" />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
