export default class DataUtils {
    static calculatePriceVolume(price, quantity) {
        return parseFloat(price.replace("$", "") * quantity);
    }

    static calculateSum(values) {
        return values.map((value) => parseFloat(value.replace("$", ""))).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}