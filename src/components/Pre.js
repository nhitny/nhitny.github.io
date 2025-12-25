import React from "react";

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      {props.load && (
        <div className="loader">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Pre;
