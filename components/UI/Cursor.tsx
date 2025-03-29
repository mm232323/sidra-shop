import { Flex } from "@mantine/core";
import React from "react";

const Cursor: React.FC<{
  idx: number;
  onHandleSelect: (id: number) => void;
}> = ({ idx, onHandleSelect }) => {
  return (
    <Flex gap="sm">
      <div
        className={`w-[12px] h-[12px] rounded-[6px] border-white border-1 cursor-pointer ${
          idx == 0 ? "bg-amber-500" : ""
        }`}
        onClick={() => onHandleSelect(0)}
      />
      <div
        className={`w-[12px] h-[12px] rounded-[6px] border-white border-1 cursor-pointer ${
          idx == 1 ? "bg-amber-500" : ""
        }`}
        onClick={() => onHandleSelect(1)}
      />
      <div
        className={`w-[12px] h-[12px] rounded-[6px] border-white border-1 cursor-pointer ${
          idx == 2 ? "bg-amber-500" : ""
        }`}
        onClick={() => onHandleSelect(2)}
      />
    </Flex>
  );
};

export default Cursor;
