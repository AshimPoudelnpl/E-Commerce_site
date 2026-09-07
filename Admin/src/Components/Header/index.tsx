import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdNotificationsNone } from "react-icons/md";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { MyContext } from "../../App";
import { uploadData, getData, putData } from "../../utils/api";

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { avatar, setAvatar } = context;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleClose();
    try {
      await getData("/api/user/logout");
    } catch {
      console.log("Logout failed");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("adminAvatar");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setAvatar("");
    navigate("/login");
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setAvatar(base64);
      localStorage.setItem("adminAvatar", base64);
    };
    reader.readAsDataURL(file);
    // Upload to Cloudinary via API
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await uploadData("/api/user/upload-avatar", formData);
      const url = res?.avatar || res?.data?.avatar;
      if (url) {
        setAvatar(url);
        localStorage.setItem("adminAvatar", url);
        // Update user record with new avatar
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        await putData("/api/user/update-user", {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });
        localStorage.setItem("user", JSON.stringify({ ...user, avatar: url }));
      }
    } catch (err) {
      console.log("Avatar upload failed", err);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
        <MdMenu
          onClick={() => context.setIsSideBarOpen(!context.isSideBarOpen)}
          className="text-2xl"
        />
      </button>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <MdNotificationsNone className="text-2xl text-gray-600" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            4
          </span>
        </div>

        {/* Account Menu */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 36, height: 36 }} src={avatar || undefined}>
                {!avatar && "A"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            <Avatar src={avatar || undefined}>{!avatar && "A"}</Avatar> My
            account
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => fileRef.current?.click()}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Change Avatar
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChangeFile}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
