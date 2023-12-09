import Dropzone from 'react-dropzone-uploader'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MAX_UPLOADED_FILE_SIZE } from '../data/custom-data/constants'
import { urls } from '../data/custom-data/urls'

export function useFilesDropzone(uploadUrl: any, maxFiles: any) {
    const [uploadedFiles, setUploadedFiles] = useState(null)

    const [imagesUrls, setImagesUrls] = useState<any>([])

    // useEffect(() => {
    //   if(imagesUrls.length == 0){
    //     setUploadedFiles(null)
    //   }
    // }, [imagesUrls])

    function getUploadParams({ file }: any) {
        const formData = new FormData()
        formData.append('image', file)
        return {
            url: `${urls.baseUrl}${uploadUrl}`,
            body: formData,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6eyJpZCI6MSwidGVhbU5hbWUiOm51bGwsImVtYWlsIjoic2FsZXNAaG9tZXNhbmRiZXlvbmQuY29tLnRyIiwicGFzc3dvcmQiOiIkMmIkMTAkdURoL0RvSGVpUUFLQ0FkR1ZDSjZNLnJ5SjNzazFVY3U2V2tlSVNUOFVDbnA0TzZES0J4RnkiLCJwaG9uZU51bWJlciI6bnVsbCwiY2VsbE51bWJlciI6bnVsbCwic3RhdHVzIjoxLCJ0b2tlbiI6IiIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMTdUMDY6MDU6MTcuMjUzWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDQtMTlUMDg6MzQ6MzMuODA5WiJ9LCJpYXQiOjE2ODE4OTU4ODd9.2WNpKAbFUAz30i73hcduzw986qb-APIX_e5S1Wvv1rE`,
            },
        }
    }

    function onChangeDropzoneStatus(
        { xhr, remove }: any,
        status: any,
        files: any
    ) {
        setUploadedFiles(files)
        if (status === 'rejected_max_files') {
            toast.error('Max allowed files reached.')
        } else if (status === 'error_file_size' || status === 'error_upload') {
            remove()
            toast.error('File size is too large please upload a file < 5MB.')
        } else if (status === 'removed') {
            if (xhr && xhr.status !== 500) {
                let response = JSON.parse(xhr.response)
                setImagesUrls((prevImagesUrls: any) =>
                    prevImagesUrls.filter(
                        (url: any) => url !== response.data.urls[0]
                    )
                )
            }
        } else if (status === 'done') {
            let response = JSON.parse(xhr.response)
            setImagesUrls((prevImagesUrls: any) => [
                ...prevImagesUrls,
                response.data.urls[0],
            ])
        }
    }

    const dropZoneType: any = {
        getUploadParams: { getUploadParams },
        maxFiles: { maxFiles },
        multiple: maxFiles > 1,
        canCancel: true,
        canRestart: true,
        inputContent: "Drag 'n' drop some files here, or click to select files",
        accept: 'image/*,.pdf',
        styles: {
            dropzone: { overflow: 'hidden' },
            dropzoneActive: {
                borderColor: 'green',
            },
        },
        SubmitButtonComponent: null,
        onChangeStatus: { onChangeDropzoneStatus },
    }

    return {
        imagesUrls,
        uploadedFiles,
        filesdropzoneComponent: (
            <div className="dropzone-admin form-inputs">
                <div className="dropzone" id="multiFileUpload">
                    <div className="dz-message needsclick">
                        <i className="fas fa-cloud-upload-alt" />
                        <Dropzone
                            getUploadParams={getUploadParams}
                            maxFiles={maxFiles}
                            multiple={maxFiles > 1}
                            canCancel={true}
                            canRestart={true}
                            inputContent="Drag 'n' drop some files here, or click to select files"
                            accept="image/*,.pdf"
                            maxSizeBytes={MAX_UPLOADED_FILE_SIZE}
                            styles={{
                                dropzone: { overflow: 'hidden' },
                                dropzoneActive: {
                                    borderColor: 'green',
                                },
                            }}
                            onChangeStatus={onChangeDropzoneStatus}
                        />
                    </div>
                </div>
            </div>
        ),
        setImagesUrls,
        setUploadedFiles,
    }
}
