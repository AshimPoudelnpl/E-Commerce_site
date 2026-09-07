import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

function QtyBox() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center border rounded w-[80px] h-[44px]">
      <input
        type="text"
        value={qty}
        readOnly
        className="w-full text-center outline-none py-2 text-[14px] bg-transparent"
      />
      <div className="flex flex-col border-l h-full">
        <button
          onClick={() => setQty(qty + 1)}
          className="flex-1 px-2 border-b text-xs flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <FaAngleUp />
        </button>
        <button
          onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
          className="flex-1 px-2 text-xs flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}

export default QtyBox;
