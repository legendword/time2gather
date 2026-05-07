const leadingZeros = (val: any, digits = 2) => {
    return '0'.repeat(digits - val.toString().length) + val;
}
export default leadingZeros;