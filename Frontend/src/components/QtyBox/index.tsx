import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface QtyBoxProps {
  value?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
}

function QtyBox({ value, onChange, min = 1, max = 99 }: QtyBoxProps) {
  const [internalQty, setInternalQty] = useState(value ?? 1);

  useEffect(() => {
    if (value !== undefined) {
      setInternalQty(value);
    }
  }, [value]);

  const update = (newVal: number) => {
    const clamped = Math.max(min, Math.min(max, newVal));
    setInternalQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded w-[84px] h-[42px] bg-white">
      <input
        type="text"
        value={internalQty}
        readOnly
        className="w-full text-center outline-none py-2 text-[14px] font-semibold text-gray-800 bg-transparent"
      />
      <div className="flex flex-col border-l border-gray-300 h-full">
        <button
          type="button"
          onClick={() => update(internalQty + 1)}
          className="flex-1 px-2 border-b border-gray-300 text-xs flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
        >
          <FaAngleUp />
        </button>
        <button
          type="button"
          onClick={() => update(internalQty - 1)}
          className="flex-1 px-2 text-xs flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
        >
          <FaAngleDown />
        </button>
      </div>
    </div>
  );
}

export default QtyBox;
