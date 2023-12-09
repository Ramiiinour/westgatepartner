// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useEffect, useRef, useState } from "react";
// import { Camera, Heart } from "react-feather";
// import ImageSlider from "../../../../components/myproperties/ImageSlider";
// import ImageSlider from "../myproperties/ImageSlider";
// import PropertyLabel from "../Common/Propertybox/PropertyLabel";
// import { editProjectPageUrl } from "../../../../components/data/urls/urls";
// import { PROJECT_IN_PROGRESS } from "../../data/projects/projects";

// const project = {
//   type: "Aparmantes",
//   title: "Hello work",
//   images: [
//     "https://remarkestate.s3.me-south-1.amazonaws.com/property/1688889242638-pexels-binyamin-mellish-186077.jpg",
//   ],
//   price: 1234,
//   country: "Algeria",
//   city: "Agiers",
//   mainDescription:
//     "adsklj adklkljadskljasd ljkasljks dlkjasdljkas lkasdljkdjklsadljk dasljk asdlkjasdjlkasdladsjkladskljlkadjkladslkjadslkjadsjlkadsljadsjlkaljksdasdljk ljkads jklasdjlka sdkljasdjlkasdljka dslajklsdjakls jakl slkaj sljkas jlk",
//   floorPlans: [
//     { id: 1, name: "1-bedroom", abbr: "1BR" },
//     { id: 2, name: "studio", abr: "St" },
//   ],
//   area: "100",
//   status: { id: 1, name: "In progress" },
//   handoverYear: "1992",
//   handoverYearQuarter: "Q2",
//   developer: "Mr matknshi",
//   mainPaymentPlanFirstNumber: 20,
// };

const ProjectBox = ({}) => {
    // if (project === "undefined" || project === null) {
    //   return null;
    // }

    return (
        <>
            {/* <div className="property-box h-100">
        <div className="property-image">
          <ImageSlider images={project.images} />
          <div className="labels-left">
            <div>
              <span className="label label-shadow">{project.type}</span>
            </div>
          </div>
          <div className="seen-data">
            <Camera />
            <span>{project.images.length}</span>
          </div>
        </div>
        <div className="property-details">
          <span className="font-roboto">{project.country} </span>
          {editProjectPageUrl && (
            <Link href={editProjectPageUrl}>
              <h3>{project.title}</h3>
            </Link>
          )}
          <h6 className="text-secondary">{project.price.toFixed(2)}</h6>
          <p className="font-roboto">{project.mainDescription}</p>
          <ul>
            {project.floorPlans.map((plan) => (
              <li>
                <img
                  src="/assets/images/svg/icon/double-bed.svg"
                  className="img-fluid"
                  alt=""
                />
                {plan.abbr}
              </li>
            ))}
            <li>
              <img
                src="/assets/images/svg/icon/square-ruler-tool.svg"
                className="img-fluid ruler-tool"
                alt=""
              />
              Sq Ft : {project.area}
            </li>
          </ul>
          <div className="property-btn d-flex">
            {project.status.name === PROJECT_IN_PROGRESS && (
              <span>
                {project.handoverYear} {project.handoverYearQuarter}
              </span>
            )}
            {project.status.name === PROJECT_IN_PROGRESS && (
              <span>
                {project.handoverYear} {project.handoverYearQuarter}
              </span>
            )}

            <Link href={editProjectPageUrl}>
              <button type="button" className="btn btn-dashed btn-pill">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div> */}
        </>
    )
}

export default ProjectBox
