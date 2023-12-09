export function getSpecificaitonsAsObject(specificationsArray: any) {
    const temp: any = {}
    specificationsArray.forEach((spec: any) => {
        temp[spec['specification']['key']] = spec['answer']
    })
    return temp
}

export function getStatusLabel(property: any) {
    if (property.isrent) {
        return 'For Rent'
    } else if (property.isbuy) {
        return 'For Sale'
    }
    return null
}

export function extractPropertiesByType(properties: any) {
    const temp: any = {}
    properties.forEach((property: any) => {
        if (!(property.propertyType in temp)) {
            temp[property.propertyType] = []
        }
        temp[property.propertyType].push(property)
    })
    return temp
}
