import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "AI Engineer | NLP & RAG Specialist",
          "Master's Student at UIT - VNUHCM",
          "Python | Large Language Models (LLMs)",
          "Arduino | Scratch | Creative Coding",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
