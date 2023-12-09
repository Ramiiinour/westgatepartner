export function convertArrayToMap(array: any, mapKey: any) {
    const map: any = {}
    array.forEach((plan: any) => {
        map[plan[mapKey]] = plan
    })
    return map
}
