import parse from 'html-react-parser'
import { sanitize } from 'isomorphic-dompurify'

export function getSantisizedHTML(htmlText: any) {
    return parse(sanitize(htmlText))
}

export function getPriceLabel(price: any) {
    return parseInt(price, 10) || 'Ask for Price'
}

export function getListingText(page: any, countPerPage: any, totalCount: any) {
    return (
        <>
            Showing{' '}
            <span>
                {Math.min(countPerPage * (page - 1) + 1, totalCount)}-
                {Math.min(totalCount, countPerPage * page)} of {totalCount}
            </span>{' '}
            Listings
        </>
    )
}
