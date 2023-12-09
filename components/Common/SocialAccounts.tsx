import React from "react";
import googleIcon from "../../public/assets/images/about/icon-1.png";
import twitterIcon from "../../public/assets/images/about/icon-2.png";
import facebookIcon from "../../public/assets/images/about/icon-3.png";

const SocialAccounts = ({ facebookUrl, twitterUrl, googleUrl }:any) => {
  return (
    <ul>
      {googleUrl && (
        <li>
          <a href={googleUrl}>
            <img src={googleIcon.src} alt="" />
          </a>
        </li>
      )}
      {twitterUrl && (
        <li>
          <a href={twitterUrl}>
            <img src={twitterIcon.src} alt="" />
          </a>
        </li>
      )}
      {facebookUrl && (
        <li>
          <a href={facebookUrl}>
            <img src={facebookIcon.src} alt="" />
          </a>
        </li>
      )}
    </ul>
  );
};

export default SocialAccounts;
