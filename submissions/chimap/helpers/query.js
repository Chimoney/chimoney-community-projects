// filters data by country param
export function filterByCountry(param, data) {
    let filter = data?.filter((i) => i.countries ? (i.countries.length == 0 || i.countries.includes(param)) : i.country.name == param);
    return filter
}




// parses all the supported types
export function parseAssetType(data) {
    let supportedType = []
    data?.map(i => {
        // if type is not in supportedType array, add it
        if (!supportedType.includes(i.type)) {
            supportedType.push(i.type)
        }
    })
    return supportedType

}
// filters or group data by type passed as param
export function filterByType(param, data) {
    let filter = data?.filter((i) => i.type == param);
    return filter
}

