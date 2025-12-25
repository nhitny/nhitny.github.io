import React, { useState, useEffect } from "react";

function Pre(props) {
  const [loaderType, setLoaderType] = useState(0);

  useEffect(() => {
    // Random chọn 1 trong 2 loader khi component mount
    setLoaderType(Math.floor(Math.random() * 2));
  }, []);

  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      {props.load && (
        <>
          {loaderType === 0 ? (
            // Panda Loader
            <div className="panda-container">
              <div className="ear ear-left" />
              <div className="ear ear-right" />
              <div className="panda-head">
                <div className="eye-patch eye-patch-left" />
                <div className="eye-patch eye-patch-right" />
                <div className="eye eye-left" />
                <div className="eye eye-right" />
                <div className="pupil pupil-left" />
                <div className="pupil pupil-right" />
                <div className="nose" />
                <div className="mouth" />
              </div>
            </div>
          ) : (
            // Loading Text Loader
            <div className="text-loader">
              <span className="loader-text">loading</span>
              <span className="load" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pre;
