export function checkIfAbsoluteUrl(url: any) {
    return /^[a-z][a-z0-9+.-]*:/.test(url)
}

export function checkIfFacebookUrl(url: any) {
    return /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/.test(
        url
    )
}
