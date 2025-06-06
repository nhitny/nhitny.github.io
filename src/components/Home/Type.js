import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "AI Researcher",
          "Python | Large Language Models",
          "Deep Learning",
          "Machine Learning",
          "Natural Language Processing",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
