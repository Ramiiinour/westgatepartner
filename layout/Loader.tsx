import React from "react";
import loaderIcon from "../public/assets/images/loader/loader-2.gif"

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="row loader-img">
        <div className="col-12">
          <img src={loaderIcon.src} className="img-fluid" alt='' />
        </div>
      </div>
    </div>
  );
};

export default Loader;
