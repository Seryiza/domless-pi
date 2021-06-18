'use strict';

/**
 * Количество итераций для формулы BBP.
 */
const FORMULA_ITERATIONS = 1000000;

/**
 * Количество шестнадцатеричных цифр в числе из формулы BBP.
 * Зависит от точности числе в JS, число выбрано как половина в эталонной реализации :)
 */
const HEX_NUMBERS_IN_BBP = 8;

/**
 * Шестнадцатеричные значения для отображения блока числа Пи.
 */
const HEX_NUMBERS = '0123456789ABCDEF';

/**
 * Вычислить цифры числа Пи, спросив позицию у пользователя.
 */
function calcUserEnteredPiDigit() {
    // TODO: Добавить проверку корректности числа.
    const position = Number(prompt('Введите позицию числа Пи, с которой нужно вычислить', '0'));
    const bbp = calcBBP(position);
    const hex = convertFractionToHex(bbp);

    alert(`Пи с позиции ${position}: ${hex}`);
}

/**
 * Вычислить цифру числа Пи по формуле Bailey–Borwein–Plouffe.
 * Возвращает число для шестнадцатеричной интерпретации.
 * @param {Number} digitPosition Позиция числа, с которой требуется вычислить Пи.
 * @param {Number} upperBound Количество итераций для коэффициента k.
 */
function calcBBP(digitPosition) {
    const pi = (
        4 * calcSeries(digitPosition, 1)
        - 2 * calcSeries(digitPosition, 4)
        - calcSeries(digitPosition, 5)
        - calcSeries(digitPosition, 6)
    );
    return pi;
}

/**
 * Вычислить член ряда в формуле BBP.
 * @param {Number} k Коэффициент K
 * @param {Number} denomComponent Слогаемое в знаменателе
 */
function calcSeries(digitPosition, denomComponent) {
    let series = 0;
    for (let k = 0; k < FORMULA_ITERATIONS; k++) {
        // TODO: Разобраться с накоплением погрешности на больших позициях.
        series += (
            (16 ** (digitPosition - k))
            / (8 * k + denomComponent)
        );

        series = series - Math.trunc(series);
    }
    return series;
}

/**
 * Преобразовать дробь числа в шестнадцатеричное представление.
 * @param {Number} fraction Дробное число
 */
function convertFractionToHex(fraction) {
    let hexNumbers = '';
    for (let i = 0; i < HEX_NUMBERS_IN_BBP; i++) {
        fraction = 16 * (fraction - Math.floor(fraction));
        hexNumbers += HEX_NUMBERS[Math.trunc(fraction)];
    }
    return hexNumbers;
}
