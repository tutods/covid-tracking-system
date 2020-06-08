export function ageToDate(age: number) {
    const today = new Date();
    const newYear = today.getFullYear() - age;
    const date = newYear + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    return date;
}