
function timeIsoFormat(block_time) {
    // return `at: ${(new Date(block_time * 1000).toISOString()).replace('.000Z', 'Z')}`;
    return (new Date(block_time * 1000).toISOString()).replace('.000Z', 'Z');
}

// https://stackoverflow.com/a/47006398
///////////////////////////////////////
const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
];

function timeSince(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}
///////////////////////////////////////

function hashSlice(hash) {
    return `${hash.slice(0, 5)}...${hash.slice(-5)}`
}

function quantityWithDivisibility(divisible, quantity_bigint) {
    // return divisible ? (quantity_integer / (10 ** 8)).toFixed(8) : quantity_integer;

    if (typeof quantity_bigint !== 'bigint') {
        throw Error('quantityWithDivisibility param must be a bigint'); // kind of confusing to be opposite of formatDivision
    }

    // now done based on string
    // TODO locale formatting

    let quantity_integer;
    let is_negative;
    if (quantity_bigint < 0) {
        // normalize to positive, then add negative back at last step
        quantity_integer = -quantity_bigint;
        is_negative = true;
    }
    else {
        quantity_integer = quantity_bigint;
        is_negative = false;
    }

    let to_return;
    if (divisible) {
        const quantity_integer_string_length = `${quantity_integer}`.length;
        // let to_return;
        if (quantity_integer_string_length < 8) {
            to_return = `${quantity_integer}`;
            while (to_return.length < 8) {
                to_return = '0' + to_return;
            }
            // is 8, add initial '0.'
            to_return = '0.' + to_return;
        }
        else { // quantity_integer_string_length >= 8
            const decimals = `${quantity_integer}`.slice(-8);
            const first_chars_left = `${quantity_integer}`.slice(0, quantity_integer_string_length - 8);
            to_return = `${first_chars_left ? first_chars_left : '0'}.${decimals}`;
        }
        // return to_return;
    }
    else {
        to_return = `${quantity_integer}`;
        // return `${quantity_integer}`;
    }

    return `${is_negative ? '-' : ''}${to_return}`;
}

function formatDivision(numerator_int, denominator_int) {
    // TODO locale formatting

    if (
        (typeof numerator_int === 'bigint') ||
        (typeof denominator_int === 'bigint')
    ) {
        throw Error('formatDivision params cannot be bigint'); // kind of confusing to be opposite of quantityWithDivisibility
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#operators
        // The / operator also works as expected with whole numbers - but operations with a fractional result will be truncated when used with a BigInt value - they won't return any fractional digits.
    }

    let formatted;
    
    const division_exp = (numerator_int / denominator_int).toExponential();

    if (division_exp.includes('e-')) {
        const [num, exp] = division_exp.split('e-');
        let to_fixed_value = parseInt(exp);
        if (num.includes('.')) {
            const afterdot = num.split('.')[1];
            to_fixed_value = to_fixed_value + afterdot.length;
        }
        // truncate if too long
        if (to_fixed_value > 10) { // haven't seen more than 7 but to be safe and not miss numbers
            to_fixed_value = 10;
        }
        formatted = `${Number(division_exp).toFixed(to_fixed_value)}`;
        // formatted = `(${division_exp}) ${Number(division_exp).toFixed(to_fixed_value)}`;
    }
    else {
        formatted = `${Number(division_exp)}`;
    }

    return formatted;
}

function txTypeBadgeColor(type) {
    switch (type) {
        case 'order':
            return 'green';
        case 'broadcast':
            return 'green';
        case 'dispenser':
            return 'slate';
        case 'destroy':
            return 'red';
        case 'send':
            return 'green';
        default:
            return 'slate';
    }
}

export {
    timeIsoFormat,
    timeSince,
    hashSlice,
    quantityWithDivisibility,
    formatDivision,
    txTypeBadgeColor,
};
