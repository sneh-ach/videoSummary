"use client";

import React from "react";
import Question from "./Question";
import Answer from "./Answer";

const QnA = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-2">
      <div className="w-full" onClick={() => setOpen(!open)}>
        <Question question={item?.question} isOpen={open} />
      </div>
      {open && (
        <div className="w-full">
          <Answer answer={item?.answer} />
        </div>
      )}
    </div>
  );
};

export default QnA;
