"use client";
import React from "react";
import intros from "../../introsData.json";
import IntroContainer from "./IntroContainer";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
const IntroManager: React.FC = () => {
  const [selectedId, setSelectedId] = useState(0);
  const handleSelect = (id: number) => {
    setSelectedId(id);
  };
  return (
    <div className="relative top-[-149px] w-full h-[747px]">
      <AnimatePresence>
        {intros.map((intro, id) => (
          <AnimatePresence key={id}>
            {id == selectedId && (
            <IntroContainer
              title={intro.title}
              key={id}
              id={id}
              imgUrl={intro.imgUrl}
              backgroundUrl={intro.backgroundImg}
              HandleSelect={handleSelect}
            >
              {intro.desc}
            </IntroContainer>
            )}
          </AnimatePresence>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default IntroManager;
