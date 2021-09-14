export const monthDiff = (dateTo: Date, dateFrom: Date) => {
    return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}