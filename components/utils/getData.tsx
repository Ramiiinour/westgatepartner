import axios from 'axios'

export async function getData(url: any) {
    try {
        return await axios.get(url)
    } catch (error) {
        console.error('Error', error)
    }
}
