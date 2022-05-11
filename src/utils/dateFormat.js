

export function dateFormat(value){
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date(value);
    return `${month[date.getMonth()]} ${date.getDate()}`
}