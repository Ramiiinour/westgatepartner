import React, { Fragment } from "react";

const PropertyLabel = ({ labels }:any) => {
    return (
        <>
            {Array.isArray(labels) &&
                labels?.map((values, i) => {
                    return (
                        <Fragment key={i}>
                            {values === "For Sale" && (
                                <div>
                                    <span className='label label-success'>For Sale</span>
                                </div>
                            )}
                            {values === "no fees" || values === "For Rent" && (
                                <div>
                                    <span className='label label-dark'>{values}</span>
                                </div>
                            )}
                            {values === "open house" || values === "Featured" && (
                                <div>
                                    <span className='label label-success'>{values}</span>
                                </div>
                            )}
                            {values === "sold" && (
                                <div>
                                    <span className='label label-shadow'>Sold</span>
                                </div>
                            )}
                        </Fragment>
                    )
                })}
        </>
    );
};

export default PropertyLabel;
