import Link from "next/link";
import React from "react";
import { Col, Row } from "reactstrap";
import { urls } from "../../data/custom-data/urls";
import { useSitePages } from "../../hooks/useSitePages";

const Breadcrumb = ({ title, parent, titleText }:any) => {
  const { homePageUrl } = useSitePages();

  return (
    <div className="container-fluid">
      <div className="page-header">
        <Row>
          <Col sm="6">
            <div className="page-header-left">
              <h3>
                {title}
                <small>{titleText}</small>
              </h3>
            </div>
          </Col>
          <Col sm="6">
            <ol className="breadcrumb pull-right">
              <li className="breadcrumb-item">
                <Link href={homePageUrl}>
                  <i className="fa fa-home" />
                </Link>
              </li>
              <li className="breadcrumb-item active">{parent}</li>
            </ol>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Breadcrumb;
