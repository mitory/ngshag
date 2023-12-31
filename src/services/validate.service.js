export const validateService = {
    checkNamesInput, checkIsEmail, checkIsOnlyRussianLetter, checkIsEmptyStr, checkAgeBetween, checkPhoneNumber
};

function checkNamesInput(field) {
    return !checkIsEmptyStr(field) &&
        checkIsOnlyRussianLetter(field)

}

function checkPhoneNumber(field) {
    return /^\+7\d{10}$/.test(field)
}

function checkIsEmail(str) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

function checkIsOnlyRussianLetter(str) {
    return /^[а-яА-Я]+(?:-[а-яА-Я]+)*$/.test(str);
}

function checkIsEmptyStr(str) {
    return str === '' || str === null || str === undefined;
}

function checkAgeBetween(field, start, end) {
    const birthDate = new Date(field);
    const otherDate = new Date(Date.now());
    let years = (otherDate.getFullYear() - birthDate.getFullYear());
    if (otherDate.getMonth() < birthDate.getMonth() ||
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }
    console.log('Лет: ' + years)
    return years >= start && years <= end
}