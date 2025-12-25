import React from "react";

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      {props.load && (
        <div className="preloader-wrapper">
          {/* Panda Loader - Top */}
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

          {/* Loading Text Loader - Bottom */}
          <div className="text-loader">
            <span className="loader-text">loading</span>
            <span className="load" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Pre;
