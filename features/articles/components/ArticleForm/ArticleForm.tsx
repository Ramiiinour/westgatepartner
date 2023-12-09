import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Col, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import { useFilesDropzone } from '../../../../hooks/useFileDropzone'
import { urls } from '../../../../data/custom-data/urls'
import TextField from '../../../../components/custom-components/forms/TextField'
import FormLabel from '../../../../components/custom-components/forms/FormLabel'
import { useTextAreaEditor } from '../../../../hooks/useTextAreaEditor'

export default function ArticleForm({
    article,
    onSubmitHandler,
    onDeleteHandler,
}: any) {
    const [articleCategoryId, setArticleCategoryId] = useState(
        article?.articleCategory?.id || ''
    )
    const [createdon, setCreatedon] = useState<any>()

    const { imagesUrls, filesdropzoneComponent } = useFilesDropzone(
        urls.common.routes.properties.uploadPhoto,
        1
    )
    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        register,
    } = useForm({
        defaultValues: {
            title: article ? article.title : '',
            videoUrl: article ? article.videoUrl : '',
        },
    })
    const { editorText, editorComponent }: any = useTextAreaEditor(
        article?.description,
        false
    )

    async function onDeleteButtonClick() {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete the article?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dd4b39',
            cancelButtonColor: 'var(--theme-default)',
            confirmButtonText: 'Delete Article',
            reverseButtons: true,
        })
        if (result.isConfirmed) {
            onDeleteHandler()
        }
    }

    async function onFormSubmit(values: any) {
        let image = article?.image
        if (!image && imagesUrls.length === 0) {
            toast.error('You must upload the article image.')
            return
        }
        if (imagesUrls.length === 1) {
            image = imagesUrls[0]
        }
        if (!articleCategoryId) {
            toast.error('You must select category.')
            return
        }
        const formData = {
            ...values,
            description: editorText,
            image,
            articleCategoryId,
            createdon,
        }

        await onSubmitHandler(formData)
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="gx-3">
                <Row className="align-items-center">
                    <Col sm="12" className="form-group">
                        <TextField
                            name="title"
                            label="Title"
                            placeholder=""
                            register={register}
                            errors={errors}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm="4" className="form-group">
                        <label>Select Category</label>
                        <select
                            style={{ color: '#586167' }}
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue={article?.articleCategory?.id || null}
                            onChange={(e) => {
                                setArticleCategoryId(parseInt(e.target.value))
                            }}
                        >
                            <option>Select Category</option>
                            <option value="1">News</option>
                            <option value="2">Citizenship By Investment</option>
                            <option value="3">Investment</option>
                            <option value="4">Real Estate</option>
                            <option value="5">Tourism in Turkey</option>
                            <option value="6">Uncategorized</option>
                            <option value="7">H&B Channel</option>
                        </select>
                    </Col>
                    <Col
                        sm="4"
                        className="form-group"
                        style={{ color: '#586167' }}
                    >
                        <label>
                            Select Date{' '}
                            <span style={{ fontSize: '12px' }}>(optional)</span>
                        </label>
                        <input
                            className="form-select"
                            type="date"
                            // value={article?.createdon}
                            onChange={(e) => {
                                // const inputDateTime = e.target.value.toString();
                                // const dateObject = new Date(inputDateTime);
                                // const formattedDate = dateObject.toISOString();
                                // console.log(e.target.value)
                                setCreatedon(`${e.target.value}T00:00:00.000Z`)
                            }}
                        />
                    </Col>
                    <Col
                        sm="4"
                        className="form-group"
                        style={{ color: '#586167' }}
                    >
                        <TextField
                            name="videoUrl"
                            label="Video URL"
                            placeholder=""
                            register={register}
                            errors={errors}
                            required={false}
                        />
                    </Col>
                </Row>
                <Col sm="12" className="form-group">
                    <FormLabel>Content</FormLabel>
                    {editorComponent}
                </Col>

                <Col sm="12" className="form-group">
                    {article && (
                        <>
                            <FormLabel>Old Image Preview</FormLabel>
                            <div className="form-group my-2 d-flex justify-content-center">
                                <div
                                    className="image-wrapper w-100"
                                    style={{
                                        maxHeight: '300px',
                                    }}
                                >
                                    <img
                                        src={article.image}
                                        className="w-100 h-100 border rounded"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {!article && <FormLabel>Main Image</FormLabel>}
                    {filesdropzoneComponent}
                </Col>
            </Row>

            <div className="form-group custom-agent-form-options">
                <Button
                    type="submit"
                    className="btn btn-gradient btn-pill"
                    style={{ gridColumnStart: 2 }}
                >
                    Submit
                </Button>

                {article && (
                    <div className="d-flex justify-content-end">
                        <Button
                            type="button"
                            className="btn btn-danger btn-pill"
                            onClick={onDeleteButtonClick}
                            disabled={isSubmitting}
                        >
                            Delete Article
                        </Button>
                    </div>
                )}
            </div>
        </form>
    )
}
