import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FiSearch, FiX } from "react-icons/fi";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) => {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`!bg-white ${className}`}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <FiSearch className="text-[16px] text-gray-400" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onChange("")}
                title="Clear search"
              >
                <FiX className="text-[16px] text-gray-400" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};

export default SearchBar;
