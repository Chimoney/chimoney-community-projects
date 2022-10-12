// filters data by country param
export function filterByCountry(param,data) {
    let filter = data?.filter((i) => i.countries ? (i.countries.includes(param) || i.countries.length == 0) : i.country.name == param);
    
    return filter
}




// parses all the supported types
export function parseAssetType(data) {
    let supportedType = []
    data?.map(i => {
        if (!supportedType.includes(i.type)) {
            supportedType.push(i.type)
        }
    })
return supportedType

}
// filters/group data by type passed as param
export function filterByType(param,data) {
    let filter = data?.filter((i) => i.type == param);
    return filter
}

