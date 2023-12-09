import { alluserData } from '../../public/API-Data/alluser'

export default function handler(req: any, res: any) {
    try {
        res.status(200).json(alluserData)
    } catch (err) {
        alert('Data is not fetch!!! Please check console!!!')
    }
}
