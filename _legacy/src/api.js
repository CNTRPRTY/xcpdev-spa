
// in this case, alt becomes the current
const COUNTERPARTY_VERSION_PREVIEW = true;

const COUNTERPARTY_VERSION_ALT = "9.61.3";
const COUNTERPARTY_VERSION_ALT_URL = "https://xcp.dev";

const BITCOIN_VERSION = "0.21.1";
const COUNTERPARTY_VERSION = "10.1.1.CNTRPRTY";
const API_HOST = "/api";
// const API_HOST = "https://api.xcp.dev/v9_61";
const API_HOST_IS_PROD = false;


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCntrprty(path) {

<<<<<<< HEAD:src/api.js
    const url = `${API_HOST}${path}`;
    const options = {
        method: "GET",
    };

    // exponential backoff
    let thetry = 1;
    const tries_max = 5;
    while (thetry <= tries_max) {
        const response = await fetch(url, options);
        if (response.status !== 202) {
            if (!response.ok) {
                const errorTextPre = await response.text(); // can come empty
                const errorText = errorTextPre.trim().length === 0 ? '' : ` ${errorTextPre}`; // add space if not empty
                throw Error(`[${response.status}:${response.statusText}]${errorText}`);
            }
            else {
                const data = await response.json();

                if (API_HOST_IS_PROD){
                    return data.data;
                }
                else {
                    return data;
                }

            }
        }
        else { // is 202

            // first tries faster
            if (thetry <= Math.ceil(tries_max / 2)) {
                await sleep(thetry * 200);
                // await sleep(thetry * 500);
            }
            else {
                await sleep(thetry * 1000);
            }

            // await sleep(thetry * 1000);
            thetry++;
        }
    }
    // max tries reached
    throw Error(`[202:Accepted] Limit reached, try again.`);
=======
    const url = `${api_host}${path}`;
    const options = {
        method: "GET",
    };

    // exponential backoff
    let thetry = 1;
    const tries_max = 5;
    while (thetry < tries_max) {
        const res = await fetch(url, options);
        if (res.status !== 202) {
            if (!res.ok) {
                throw Error(`[${res.status}:${res.statusText}]`);
            }
            else {
                const data = await res.json();
                return data.data;
            }
        }
        else { // is 202
            await sleep(thetry * 1000);
            thetry++;
        }
    }
    // max tries reached
    throw Error(`[202:Accepted (limit reached, try again)]`);
>>>>>>> develop:_legacy/src/api.js
}
// async function getCntrprty(path) {
//     // export async function getCntrprty(path) {
//     // export async function getCP(path) {
//     const options = {
//         method: "GET",
//     };
//     let res = {}; // TODO?
//     const res1 = await fetch(`${api_host}${path}`, options);
//     // const res = await fetch(`${api_host}${path}`, options);
//     // const res = await fetch(`${api_host}/mainnet/cp/${path}`, options);
//     if (!res1.ok) {

//         if (res1.status === 504) { // 504 Gateway Timeout

//             // try one more time
//             ////////////////////
//             // sleep a bit
//             await sleep(1000);
//             const res2 = await fetch(`${api_host}${path}`, options);
//             if (!res2.ok) throw Error(`2ndtry[${res2.status}:${res2.statusText}]`);
//             else res = res2;
//             ////////////////////

//         }

//         throw Error(`[${res1.status}:${res1.statusText}]`);
//     }
//     else {
//         res = res1;
//     }
//     const data = await res.json();
//     return data.data;
// }

async function postLibApiProxyFetch(method, params) {

    const path = API_HOST_IS_PROD ? "/proxy" : "/lib_api_proxy";

    const options = {
        method: "POST",
        body: JSON.stringify({
            method,
            params,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return fetch(`${API_HOST}${path}`, options);
}

<<<<<<< HEAD:src/api.js
=======
// async function getBlockMessages(block_height) {
//     // TODO cache by block_hash to avoid reorg logic
//     return getCntrprty(`/block/${block_height}`);
// }
>>>>>>> develop:_legacy/src/api.js

// could cache messages by txid (and block) TODO? "block_messages" instead of messages_all?
function selectTransactionMessagesFromAll(tx_hash, messages_all) {
    let messages = [];
    for (const message of messages_all) {

        const bindings = JSON.parse(message.bindings);
        // TODO dispensers:update instead of 'dispenser_tx_hash' like dispenses:insert is just 'tx_hash' thus missing it here with this check
        // TODO orders:update similar, it has 'offer_hash' in cancels:insert but 'tx_hash' here thus also being missed here
        if (
            (bindings.tx_hash && bindings.tx_hash === tx_hash) ||
            (bindings.tx0_hash && bindings.tx0_hash === tx_hash) || // unlikely?
            (bindings.tx1_hash && bindings.tx1_hash === tx_hash) ||
            (bindings.event && bindings.event === tx_hash)
        ) {

            if (
                (
                    message.category === 'issuances' &&
                    message.command === 'insert'
                ) ||
                (
                    message.category === 'destructions' &&
                    message.command === 'insert'
                ) ||
                (
                    message.category === 'sends' &&
                    message.command === 'insert'
                ) ||
                (
                    message.category === 'dispensers' &&
                    message.command === 'insert'
                ) ||
                (
                    message.category === 'dispenses' &&
                    message.command === 'insert'
                ) ||
                (
                    message.category === 'orders' &&
                    message.command === 'insert'
                ) ||
                (
                    message.category === 'btcpays' &&
                    message.command === 'insert'
                ) ||
                ( // TODO why cancels is an insert, and closing a dispenser is just a credits+update (no "cancel" like insert?)
                    message.category === 'cancels' &&
                    message.command === 'insert'
                ) ||
                ( // TODO this one is done differently and i'm not sure is the best design (or the others are not?) (inconsistency...)
                    message.category === 'credits' &&
                    message.command === 'insert' &&
                    bindings.action === 'close dispenser'
                ) ||
                (
                    message.category === 'sweeps' &&
                    message.command === 'insert'
                )
            ) {
                message.main_message = true;
                messages.push(message);
            }
            else {
                messages.push(message);
            }

        }

    }
    return messages;
}


// dispensers have number status, different from the rest
function getDispenserStatusText(status_number) {
    // STATUS_OPEN = 0
    // STATUS_OPEN_EMPTY_ADDRESS = 1
    // STATUS_CLOSED = 10
    // STATUS_CLOSING = 11
    let text = `${status_number}`; // discover if other
    if (status_number === 0) text = 'open';
    else if (status_number === 1) text = 'open*'; // surface it subtly as is not super relevant to the user
    // if (bindings.status === 1) notvalid_tx_notice = 'open (empty address)';
    else if (status_number === 10) text = 'closed';
    else if (status_number === 11) text = 'closing';
    return text;
}


// v10
function eventsFilter(message_row, show_all_events = false) {
    if (show_all_events) return true;
    else {
        const non_message_events = [
            'transactions',
            'transaction_outputs',
            'assets',
            'blocks',
        ];
        return !non_message_events.includes(message_row.category);
    }
}


export {
    COUNTERPARTY_VERSION_PREVIEW,
    COUNTERPARTY_VERSION_ALT,
    COUNTERPARTY_VERSION_ALT_URL,
    BITCOIN_VERSION,
    COUNTERPARTY_VERSION,
    API_HOST,
    API_HOST_IS_PROD,
    getCntrprty,
    postLibApiProxyFetch,
<<<<<<< HEAD:src/api.js
=======
    // postLibApiProxy,
    // getBlockMessages,
>>>>>>> develop:_legacy/src/api.js
    selectTransactionMessagesFromAll,
    getDispenserStatusText,
    eventsFilter, // v10
};
