import Link from 'next/link'
import React, { Fragment } from 'react'
import { Camera } from 'react-feather'
import { urls } from '../../../../data/custom-data/urls'
import ProjectImageSlider from '../ProjectImageSlider/ProjectImageSlider'
import { projectsData } from '../../data/projectsData'
import floorPlanIcon from '../../../../public/assets/custom-images/icons/floor-plan-size-icon.svg'
import unlistedIcon from '../../../../public/assets/images/svg/icon/unlisted.png'
import rulerIcon from '../../../../public/assets/images/svg/icon/square-ruler-tool.svg'
import { getSantisizedHTML } from '../../../../utils/text'

const ProjectCard = ({ project, status = 1 }: any) => {
    const images = [
        ...project.mainImagesProject.map((image: any) => image.image),
        ...project.ImagesProject.map((image: any) => image.name),
    ]
    const url: string =
        status == 1
            ? urls.common.pages.projects.edit(project.id)
            : urls.common.pages.drafts.projects.edit(project.id)
    return (
        <>
            <div className="property-box d-flex flex-column h-100">
                <div className="property-image">
                    <ProjectImageSlider images={images.slice(0, 7)} />
                    <div className="labels-left d-flex flex-column gap-2">
                        <span className="label text-center label-gradient">
                            {`${project.mainPaymentPlanFirstNumber ?? 0}/${
                                project.mainPaymentPlanSecondNumber ?? 0
                            } Payment Plan`}
                        </span>
                        {project.handOverYear ? (
                            <span
                                className="label text-center"
                                style={{ backgroundColor: '#1c2d3a' }}
                            >
                                Handover {project.handOverYear}/
                                {project.handOverYearQuarter}
                            </span>
                        ) : (
                            <span
                                className="label text-center"
                                style={{ backgroundColor: '#1c2d3a' }}
                            >
                                {projectsData.status.readyToUse}
                            </span>
                        )}
                    </div>
                    <div className="seen-data">
                        <Camera />
                        <span>{images.length}</span>
                    </div>
                    {/* <div className="overlay-property-box">
                        <Link href='https://sheltos-react.vercel.app/pages/user-panel/compare-property' className="effect-round" title="Compare">
                            <AddToCompareProducts id={property.id} />
                        </Link>
                        <div className="effect-round like" onClick={() => { NavigateFavourit() }} title="wishlist">
                            <Heart />
                        </div>
                    </div> */}
                </div>

                <div className="property-details d-flex flex-column flex-grow-1 py-3">
                    <span className="font-roboto custom-project-type-label">
                        {project.type}
                    </span>

                    <h3 className="custom-project-title">
                        <Link
                            href={urls.common.pages.projects.edit(project.id)}
                        >
                            {project.title}
                        </Link>
                    </h3>

                    <span className="font-roboto">
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        {project.address}
                    </span>
                    <hr className="separator mt-1" />
                    <h6 className="custom-project-price"> ${project.price}</h6>
                    <div className="font-roboto custom-description custom-line-clip-3">
                        {getSantisizedHTML(project.mainDescription)}
                    </div>
                    {/* <ul className="custom-list-of-items">
            {project.projectFloorPlans.length > 0 && (
              <li>
                <img src={floorPlanIcon.src} className="img-fluid" alt="" />
                Floor Plans :{" "}
                {project.projectFloorPlans.map((plan, ind) => (
                  <Fragment key={ind}>
                    {ind > 0 ? " - " : ""}
                    <span>{plan.floorPlan.abbr}</span>
                  </Fragment>
                ))}
              </li>
            )}
            {project.projectPaymentPlans.length > 0 && (
              <li>
                <img
                  src={unlistedIcon.src}
                  className="img-fluid ruler-tool"
                  alt=""
                />
                Payment Plans : {project.projectPaymentPlans.length}
              </li>
            )}
            <li>
              <img
                src={rulerIcon.src}
                className="img-fluid ruler-tool"
                alt=""
              />
              Sq Ft : {project.area}
            </li>
          </ul> */}
                    <p className="font-roboto custom-developer-label">
                        Developed by <span>{project.developer?.name}</span>
                    </p>
                    <div className="property-btn d-flex mt-auto">
                        <span>
                            {new Date(project.createdAt).toDateString()}
                        </span>
                        <Link href={url}>
                            <button
                                type="button"
                                className="btn btn-dashed btn-pill"
                            >
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectCard
