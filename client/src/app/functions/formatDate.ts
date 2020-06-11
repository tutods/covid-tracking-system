export function formatDate(date: Date) {
    const shortDate = new Date(date);
    const year = shortDate.getFullYear();
    const month = ('0' + (shortDate.getMonth() + 1)).slice(-2);
    const day = ('0' + shortDate.getDate()).slice(-2);

    return [year, month, day].join('-');
}