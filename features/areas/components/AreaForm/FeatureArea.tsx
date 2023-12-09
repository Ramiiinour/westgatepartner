import { useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import HTMLReactParser from 'html-react-parser'

const FeatureArea = ({ areaFeatures, setAreaFeatures }: any) => {
    useEffect(() => {}, [areaFeatures])

    const removeElement = (id: any) => {
        const updatedObjects = areaFeatures.filter((el: any) => el?.id !== id)
        setAreaFeatures(updatedObjects)
    }
    return (
        <>
            {areaFeatures.length > 0 &&
                areaFeatures.map((feature: any) => {
                    return (
                        <Row>
                            <Col sm="9">
                                {HTMLReactParser(feature?.description)}
                            </Col>
                            <Col sm="9">
                                <Row className="d-flex flex-wrap">
                                    {feature?.featureImage &&
                                    feature?.featureImage[0]?.image
                                        ? feature?.featureImage.map(
                                              (item: any) => {
                                                  return (
                                                      <Col
                                                          sm="3"
                                                          className="my-2 rounded"
                                                      >
                                                          <img
                                                              className="w-100"
                                                              style={{
                                                                  height: '200px',
                                                                  objectFit:
                                                                      'cover',
                                                              }}
                                                              src={item?.image}
                                                              alt=""
                                                          />
                                                      </Col>
                                                  )
                                              }
                                          )
                                        : feature?.featureImage?.length > 0 &&
                                          feature?.featureImage.map(
                                              (image: any) => {
                                                  return (
                                                      <Col
                                                          sm="3"
                                                          className="my-2 rounded"
                                                      >
                                                          <img
                                                              className="w-100"
                                                              style={{
                                                                  height: '200px',
                                                                  objectFit:
                                                                      'cover',
                                                              }}
                                                              src={image}
                                                              alt=""
                                                          />
                                                      </Col>
                                                  )
                                              }
                                          )}
                                </Row>
                            </Col>
                            <Col sm="3">
                                <div
                                    className="btn btn-danger"
                                    onClick={() => removeElement(feature?.id)}
                                >
                                    Delete
                                </div>
                            </Col>
                        </Row>
                    )
                })}
        </>
    )
}

export default FeatureArea
