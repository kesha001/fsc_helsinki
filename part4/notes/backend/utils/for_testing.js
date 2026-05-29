const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('');
};

const average = (array) => {
    const reducer = (sum, val) => sum + val;
    const sum = array.reduce(reducer, 0);
    return array.length > 0 ? sum / array.length : 0;
};

module.exports = {
    reverse,
    average,
};

