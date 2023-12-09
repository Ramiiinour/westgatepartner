import { toast } from 'react-toastify'
import { axiosClient } from '../services/axiosClient'
import axios from 'axios'
import { urls } from '../data/custom-data/urls'

export async function getData(url: any, token: any) {
    try {
        const response = await axiosClient.get(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            },
        })
        if (response.data.success) {
            return response.data.data
        } else toast.error(response.data.message)
    } catch (e) {
        toast.error('An error has occured.')
    }
}

export async function postData(url: any, body: any, token: any) {
    const response = await axiosClient.post(url, body, {
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    })
    if (response.data.success) {
        return response.data.data
    } else {
        toast.error(response.data.message)
    }
}

export async function putData(url: any, body: any, token: any) {
    try {
        const response = await axiosClient.put(url, body, {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            },
        })

        if (response.data.success) {
            return response.data.data
        } else toast.error(response.data.message)
    } catch (e) {
        toast.error('An error has occured.')
    }
}

export async function deleteData(url: any, token: any) {
    try {
        const response = await axiosClient.delete(url, {
            headers: {
                Authorization: token ? `Bearer ${token}` : null,
            },
        })
        if (response.data.success) {
            return response.data.data
        } else toast.error(response.data.message)
    } catch (e) {
        toast.error('An error has occured.')
    }
}
