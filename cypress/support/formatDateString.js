const formatDateString = (date, stringFormat) => {
    const formats = stringFormat.split('/');
    const formated = [];

    const dayToDD = () => {
        return date.getDate().toString().padStart(2, '0');
    }
    const monthToMM = () => {
        return (date.getMonth()+1).toString().padStart(2, '0');
    }
    const yearToYYYY = () => {
        return date.getFullYear().toString();
    }

    formats.forEach((format) => {
        if (format === 'DD') {
            return formated.push(dayToDD());
        }
        if (format === 'MM') {
            return formated.push(monthToMM());
        }
        if (format === 'YYYY') {
            return formated.push(yearToYYYY());
        }
    })
    
    return formated.join('/');
}

export default formatDateString;