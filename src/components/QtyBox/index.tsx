import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

function QtyBox() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center border rounded w-[70px]">
      <input
        type="text"
        value={qty}
        readOnly
        className="w-full text-center outline-none py-2"
      />
      <div className="flex flex-col border-l">
        <button
          onClick={() => setQty(qty + 1)}
          className="px-2 border-b text-xs"
        >
          <FaAngleUp />
        </button>
        <button
          onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
          className="px-2 text-xs"
        >
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}

export default QtyBox;
