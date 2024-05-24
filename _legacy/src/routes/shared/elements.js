/* global BigInt */

import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:src/routes/shared/elements.js
import {
    timeIsoFormat,
    hashSlice,
    quantityWithDivisibility,
    formatDivision
} from '../../utils';
import {
    BITCOIN_VERSION,
    COUNTERPARTY_VERSION,
    COUNTERPARTY_VERSION_ALT,
    COUNTERPARTY_VERSION_ALT_URL,
    COUNTERPARTY_VERSION_PREVIEW,
    getDispenserStatusText
} from '../../api';

import Search from './search';
=======
// import { timeIsoFormat, quantityWithDivisibility } from '../../utils';
import { timeIsoFormat, hashSlice, quantityWithDivisibility, formatDivision, txTypeBadgeColor } from '../../utils';
import { BITCOIN_VERSION, COUNTERPARTY_VERSION, COUNTERPARTY_VERSION_ALT, COUNTERPARTY_VERSION_ALT_URL } from '../../api';
import {
    Accordion, AccordionBody, AccordionHeader,
    Badge, Divider,
    List,
    ListItem, Subtitle,
    TableCell,
    TableHeaderCell,
    TableRow,
    Text
} from "@tremor/react";
import React from "react";
import Footer from "../../components/Footer/Footer";

import NavMenu from "../../components/NavMenu";
import Logo from "../../components/Logo";
import Search from "./search";
>>>>>>> develop:_legacy/src/routes/shared/elements.js

// function timeIsoFormat(block_time) {
//     // return `at: ${(new Date(block_time * 1000).toISOString()).replace('.000Z', 'Z')}`;
//     return (new Date(block_time * 1000).toISOString()).replace('.000Z', 'Z');
// }

<<<<<<< HEAD:src/routes/shared/elements.js
const TOOLONG_CHECK = 128; // 256;
const TOOLONG_TRIM = 100; // 200;

=======
/**
 * TODO - replace if with a switch
 */
>>>>>>> develop:_legacy/src/routes/shared/elements.js
function createLinkElementBindings(bindings_json_stringified) {
    const bindingsPRE = JSON.parse(bindings_json_stringified);
    const entries = Object.entries(bindingsPRE);
    const bindings = {}; // elements as values

    for (const obj of entries) {
        const key = obj[0];
        const value = obj[1];

        if (key === 'tx_hash') {
            bindings.tx_hash = (<Link to={`/tx/${value}`}>{value}</Link>);
        }
        else if (key === 'event') {
            bindings.event = (<Link to={`/tx/${value}`}>{value}</Link>);
        }
        else if (key === 'offer_hash') {
            bindings.offer_hash = (<Link to={`/tx/${value}`}>{value}</Link>);
        }
        else if (key === 'order_hash') {
            bindings.order_hash = (<Link to={`/tx/${value}`}>{value}</Link>);
        }
        else if (key === 'dispenser_tx_hash') {
            bindings.dispenser_tx_hash = (<Link to={`/tx/${value}`}>{value}</Link>);
        }
        else if (key === 'tx0_hash') {
            bindings.tx0_hash = (<Link to={`/tx/${value}`}>{value}</Link>);
        }
        else if (key === 'tx1_hash') {
            bindings.tx1_hash = (<Link to={`/tx/${value}`}>{value}</Link>);
        }

        else if (key === 'asset') {
            bindings.asset = (<Link to={`/asset/${value}`}>{value}</Link>);
        }
        else if (key === 'dividend_asset') {
            bindings.dividend_asset = (<Link to={`/asset/${value}`}>{value}</Link>);
        }
        else if (key === 'get_asset') {
            bindings.get_asset = (<Link to={`/asset/${value}`}>{value}</Link>);
        }
        else if (key === 'give_asset') {
            bindings.give_asset = (<Link to={`/asset/${value}`}>{value}</Link>);
        }
        else if (key === 'backward_asset') {
            bindings.backward_asset = (<Link to={`/asset/${value}`}>{value}</Link>);
        }
        else if (key === 'forward_asset') {
            bindings.forward_asset = (<Link to={`/asset/${value}`}>{value}</Link>);
        }

        else if (key === 'address') {
            bindings.address = (<Link to={`/address/${value}`}>{value}</Link>);
        }
        else if (key === 'issuer') {
            bindings.issuer = (<Link to={`/address/${value}`}>{value}</Link>);
        }
        else if (key === 'source') {
            bindings.source = (<Link to={`/address/${value}`}>{value}</Link>);
        }
        else if (key === 'destination') {
            bindings.destination = (<Link to={`/address/${value}`}>{value}</Link>);
        }
        else if (key === 'tx0_address') {
            bindings.tx0_address = (<Link to={`/address/${value}`}>{value}</Link>);
        }
        else if (key === 'tx1_address') {
            bindings.tx1_address = (<Link to={`/address/${value}`}>{value}</Link>);
        }
        else if (key === 'origin') {
            bindings.origin = (<Link to={`/address/${value}`}>{value}</Link>);
        }

        else if (key === 'block_index') {
            bindings.block_index = (<Link to={`/block/${value}`}>{value}</Link>);
        }
        else if (key === 'tx0_block_index') {
            bindings.tx0_block_index = (<Link to={`/block/${value}`}>{value}</Link>);
        }
        else if (key === 'tx1_block_index') {
            bindings.tx1_block_index = (<Link to={`/block/${value}`}>{value}</Link>);
        }

        // bold anything invalid
        else if (key === 'status') {
            bindings.status = ((typeof value === 'string') && value.startsWith('invalid')) ?
                (<strong>{value}</strong>) : (<>{`${value}`}</>);
        }

        else {
            bindings[key] = (<>{`${value}`}</>);
            // bindings[key] = (<>{value}</>);
        }
    }

    return bindings;
}

function createNonLinkElement(json_stringified) {
    const bindingsPRE = JSON.parse(json_stringified);
    const entries = Object.entries(bindingsPRE);
    const bindings = {}; // elements as values

    for (const obj of entries) {
        const key = obj[0];
        const value = obj[1];

        // bold anything invalid
        if (key === 'status') {
            bindings.status = ((typeof value === 'string') && value.startsWith('invalid')) ?
                (<strong>{value}</strong>) : (<>{`${value}`}</>);
        }
        else {
            bindings[key] = (<>{`${value}`}</>);
        }
    }

    return bindings;
}

function linksElementTd(link_element_bindings, index, whitespace_nowrap_bool = true) {
    const bindings_entries = Object.entries(link_element_bindings);
    return (
        // <table class="my-2 border border-slate-500">
        <table class="my-3">
            {/* <table> */}
            <tbody>
                {bindings_entries.map((obj, index2) => {
                    const key = obj[0];
                    const element_value = obj[1];
                    return (

                        <tr
                            key={index}
                            class={whitespace_nowrap_bool ? "whitespace-nowrap" : ""}
                        // style={{ padding: "0.25rem" }}
                        >
                            <td
                                key={index2}
                            // style={{ padding: "0 1rem 0 0" }}
                            >
                                {key}:{element_value}
                            </td>

                        </tr>

                    );
                })}
            </tbody>
        </table>
    );
}

function linksElement(link_element_bindings, index, whitespace_nowrap_bool = true) {
    // function linksElement(link_element_bindings, index) {
    const bindings_entries = Object.entries(link_element_bindings);
    return (
<<<<<<< HEAD:src/routes/shared/elements.js
        <table>
            <tbody>
                {/*
                for now doing this, but maybe in some places i would prefer wrapping... (which in case then this becomes an input param)
                */}
                <tr
                    key={index}
                    class={whitespace_nowrap_bool ? "whitespace-nowrap" : ""}
                    // class="whitespace-nowrap"
                    style={{ padding: "0.25rem" }}
                >
                    {/* <tr key={index} style={{ padding: "0.25rem" }}> */}
                    {bindings_entries.map((obj, index2) => {
=======
        <>
            <List>
                {bindings_entries.map((obj, index2) => {
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                        const key = obj[0];
                        const element_value = obj[1];
                        // return (<>[{key}:{element_value}]</>);
                        return (
                            <ListItem className={"space-x-6"}>
                                <span>{key}</span>
                                <span className={"truncate max-w-xs"}>{element_value}</span>
                            </ListItem>
                        );
                    }
                )}
            </List>

        {/*<Table>*/}
        {/*    <TableBody>*/}
        {/*        <TableRow key={index} style={{ padding: "0.25rem" }}>*/}
        {/*            {bindings_entries.map((obj, index2) => {*/}
        {/*                const key = obj[0];*/}
        {/*                const element_value = obj[1];*/}
        {/*                // return (<>[{key}:{element_value}]</>);*/}
        {/*                return (*/}
        {/*                    <TableCell key={index2} style={{ padding: "0 1rem 0 0" }}><span className={"text-red-600"}>{key}</span>:{element_value}</TableCell>*/}
        {/*                );*/}
        {/*            })}*/}
        {/*        </TableRow>*/}
        {/*    </TableBody>*/}
        {/*</Table>*/}
        </>
    );
}

class ListElements {

    static getTableRowMempoolHomeHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}>type</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>tx_hash</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>source</td>

                {/* wip, more can come from the backend */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>type</td> */}

                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>category</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>command</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>timestamp_iso</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            </tr>
=======
            <TableRow>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Tx Hash</TableHeaderCell>
                <TableHeaderCell>Source</TableHeaderCell>
            </TableRow>
            // <tr style={{ padding: "0.25rem" }}>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>type</td>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>tx_hash</td>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>source</td>
            //
            //     {/* wip, more can come from the backend */}
            //     {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>type</td> */}
            //
            //     {/* <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>category</td>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>command</td>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>timestamp_iso</td>
            //     <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            // </tr>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    static getTableRowMempoolHome(mempool_row_plus, index) { // wip, more can come from the backend
        // static getTableRowMempoolHome(mempool_row, index) {

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                <td style={{ padding: "0 1rem 0 0" }}><code>{mempool_row_plus.cntrprty_decoded.msg_type}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{mempool_row_plus.tx_hash}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${mempool_row_plus.source}`}>{mempool_row_plus.source}</Link></code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}>{mempool_row_plus.cntrprty_decoded.msg_type}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{mempool_row_plus.tx_hash}</td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${mempool_row_plus.source}`}>{mempool_row_plus.source}</Link></td>
                // <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(mempool_row_plus)}</td> */}
            </tr>
=======
            <TableRow key={index}>
                <TableCell>
                    <Badge size={"xs"} color={txTypeBadgeColor(mempool_row_plus.cntrprty_decoded.msg_type)}>
                        {mempool_row_plus.cntrprty_decoded.msg_type}
                    </Badge>
                </TableCell>
                <TableCell className={"truncate max-w-xs"}>
                    <Text>{mempool_row_plus.tx_hash}</Text>
                </TableCell>
                <TableCell className={"truncate max-w-xs"}>
                    <Link to={`/address/${mempool_row_plus.source}`}>{mempool_row_plus.source}</Link>
                </TableCell>
            </TableRow>

            // <tr key={index} style={{ padding: "0.25rem" }}>
            //     <td style={{ padding: "0 1rem 0 0" }}>{mempool_row_plus.cntrprty_decoded.msg_type}</td>
            //     <td style={{ padding: "0 1rem 0 0" }}>{mempool_row_plus.tx_hash}</td>
            //     <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${mempool_row_plus.source}`}>{mempool_row_plus.source}</Link></td>
            //     {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(mempool_row_plus)}</td> */}
            // </tr>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );

        // const category = mempool_row.category;
        // const command = mempool_row.command;
        // const timestamp_iso = timeIsoFormat(mempool_row.timestamp);
        // const bindings = JSON.parse(mempool_row.bindings);
        // const bindingsElements = createLinkElementBindings(mempool_row.bindings);
        // // surfacing the invalid here by having asset === null
        // const status_by_asset = bindings.asset;
        // let invalid_tx_notice = null;
        // if (status_by_asset === null) {
        //     invalid_tx_notice = (<>{' '}<strong>invalid</strong></>);
        // }
        // return (
        //     <tr key={index} style={{ padding: "0.25rem" }}>
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${mempool_row.tx_hash}`}>tx</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{category}{invalid_tx_notice}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{category}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{command}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{timestamp_iso}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{linksElement(bindingsElements, index)}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(mempool_row)}</td> */}
        //     </tr>
        // );

    }

    static getTableRowMempoolTxHeader() {
        return (
            <TableRow>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Command</TableHeaderCell>
                <TableHeaderCell>Timestamp</TableHeaderCell>
                <TableHeaderCell>Bindings</TableHeaderCell>
            </TableRow>
        );
    }
    static getTableRowMempoolTx(mempool_row, index) {
        const category = mempool_row.category;
        const command = mempool_row.command;
        const timestamp_iso = timeIsoFormat(mempool_row.timestamp);
        const bindings = JSON.parse(mempool_row.bindings);
        const bindingsElements = createLinkElementBindings(mempool_row.bindings);
        // surfacing the invalid here by having asset === null
        const status_by_asset = bindings.asset;
        let invalid_tx_notice = null;
        if (status_by_asset === null) {
            invalid_tx_notice = (<>{' '}<strong>invalid</strong></>);
        }
        return (
            <TableRow key={index}>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{link_to_tx_format(mempool_row.tx_hash)}</td> */}
                <TableCell>{category}{invalid_tx_notice}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{category}</td> */}
                <TableCell>{command}</TableCell>
                <TableCell>{timestamp_iso}</TableCell>
                <TableCell>{linksElement(bindingsElements, index)}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(mempool_row)}</td> */}
            </TableRow>
        );
    }

    static getTableRowMessageTxHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>category</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>command</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>message index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td>
            </tr>
=======
            <TableRow style={{ padding: "0.25rem" }}>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>category</TableHeaderCell>
                <TableHeaderCell>command</TableHeaderCell>
                <TableHeaderCell>message_index</TableHeaderCell>
                <TableHeaderCell>bindings</TableHeaderCell>
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    static getTableRowMessageTx(message_row, index) {
        // static getTableRowMessage(message_row, index) {
        // const page = 'tx';
        const category = message_row.category;
        const command = message_row.command;
        const message_index = message_row.message_index;
        // const block_time_iso = timeIsoFormat(message_row.timestamp);

        const bindings = JSON.parse(message_row.bindings);
        const bindingsElements = createLinkElementBindings(message_row.bindings);

        // surfacing the invalid (without details here)
        const status = bindings.status;
        let invalid_tx_notice = null;
        if (status && (typeof status === 'string') && status.startsWith('invalid')) {
            invalid_tx_notice = (<>{' '}<strong>invalid</strong></>);
        }

        const links_element_whitespace_nowrap_bool = false;

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                // class="dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.main_message ? 'main message' : ''}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{category}{invalid_tx_notice}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{command}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{message_index}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{linksElementTd(bindingsElements, index, links_element_whitespace_nowrap_bool)}</code></td>
            </tr>
=======
            <TableRow key={index} style={{ padding: "0.25rem" }}>
                <TableCell>{message_row.main_message ? <Badge size={"xs"}>main message</Badge> : ''}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{message_index}</td> */}
                <TableCell>{category}{invalid_tx_notice}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{category}</td> */}
                <TableCell>{command}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}
                <TableCell>{message_index}</TableCell>
                <TableCell className={"truncate max-w-xs"}>{linksElement(bindingsElements, index)}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(message_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );

        // return (
        //     <tr
        //         key={index}
        //         class="dark:text-slate-100"
        //         style={{ padding: "0.25rem" }}
        //     >
        //         {/* <tr key={index} style={{ padding: "0.25rem" }}> */}

        //         {/* special non-header case */}
        //         <td
        //             class="whitespace-nowrap"
        //             style={{ padding: "0 1rem 0 0" }}
        //         >{message_row.main_message ? 'main message' : ''}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{message_row.main_message ? 'main message' : ''}</td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{message_index}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{category}{invalid_tx_notice}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{category}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{command}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{message_index}</td>

        //         <td style={{ padding: "0 1rem 0 0" }}>{linksElement(bindingsElements, index, links_element_whitespace_nowrap_bool)}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{linksElement(bindingsElements, index)}</td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(message_row)}</td> */}
        //     </tr>
        // );
    }

    static getTableRowMessageBlockHeader(show_bindings, show_all_events) {
        // static getTableRowMessageBlockHeader(show_bindings) {
        // static getTableRowMessageBlockHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                // class="whitespace-nowrap text-gray-600"
                style={{ padding: "0.25rem" }}
            >
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>tx / state</td> */}

                {show_all_events ?
                    (
                        <>
                            <td style={{ padding: "0 1rem 0.25rem 0" }}>event index</td>
                            <td style={{ padding: "0 1rem 0.25rem 0" }}>event</td>
                        </>
                    )
                    : null
                }

                <td style={{ padding: "0 1rem 0.25rem 0" }}>message index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>category</td>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>command</td> */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>message index</td> */}

                <td style={{ padding: "0 1rem 0.25rem 0" }}>status / command</td>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>command / status</td> */}

                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>tx / state</td> */}

                {show_bindings ?
                    (<td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td>)
                    : null
                }
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}

            </tr>
=======
            <TableRow>
                <TableHeaderCell>Tx/state</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Command</TableHeaderCell>
                <TableHeaderCell>Message Index</TableHeaderCell>
                <TableHeaderCell>Bindings</TableHeaderCell>
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    static getTableRowMessageBlock(message_row, index, show_bindings, show_all_events) {
        // static getTableRowMessageBlock(message_row, index, show_bindings, message_event = true) {
        // static getTableRowMessageBlock(message_row, index, show_bindings) {
        // static getTableRowMessageBlock(message_row, index) {
        // static getTableRowMessage(message_row, index) {
        // const page = 'tx';
        const category = message_row.category;
        const command = message_row.command;
        // const block_time_iso = timeIsoFormat(message_row.timestamp); // repeated, better just use the block
        
        // const message_index = message_row.message_index;

        const bindings = JSON.parse(message_row.bindings);
        const bindingsElements = createLinkElementBindings(message_row.bindings);

        let txhash_or_event = false;
        if (bindings.tx_hash) {
            txhash_or_event = bindings.tx_hash;
        }
        else if (bindings.event) {
            txhash_or_event = bindings.event;
        }

        // special cases found
        if (
            category === 'order_matches' &&
            command === 'insert'
        ) {
            txhash_or_event = bindings.tx1_hash;
        }
        else if (
            category === 'credits' &&
            command === 'insert' &&
            (bindings.action && bindings.action === 'order match')
        ) {
            txhash_or_event = bindings.event.split('_')[1];
        }

        // surfacing the not-valid (different than surfacing invalid)
        const status = bindings.status;
        let notvalid_tx_notice = null;
        // let invalid_tx_notice = null;
        if (status && (typeof status === 'string') && status !== 'valid') {
            notvalid_tx_notice = status;
        }

        // non-string status
        if (category === 'dispensers') {
            notvalid_tx_notice = getDispenserStatusText(bindings.status);
            // // 0 (open) or 10 (closed) ...
            // notvalid_tx_notice = `${bindings.status}`; // discover if other
            // if (bindings.status === 0) notvalid_tx_notice = 'open';
            // if (bindings.status === 10) notvalid_tx_notice = 'closed';
        }

        ////////
        // the expected inserts don't need to be surfaced
        ////////
        if (
            category === 'orders' &&
            command === 'insert' &&
            (bindings.status && bindings.status === 'open')
        ) {
            notvalid_tx_notice = null;
        }
        if (
            category === 'order_matches' &&
            command === 'insert' &&
            (bindings.status && bindings.status === 'completed')
        ) {
            notvalid_tx_notice = null;
        }

        // for this case, not hiding because is HELPFUL to have 'open' specified somewhere!
        // if (
        //     category === 'dispensers' &&
        //     command === 'insert' &&
        //     (bindings.status === 0)
        // ) {
        //     notvalid_tx_notice = null;
        // }

        ////////
        ////////

        // surfacing non-inserts, the updates (or anything else?!!!)
        let nonsert_tx_notice = null;
        if (command !== 'insert') {
            nonsert_tx_notice = command;
        }

        // surfacing in column
        let incolumn = 'insert'; // valid implicit (non valids surfaced)
        // let incolumn = 'valid'; // insert implicit
        // let incolumn = 'valid insert';
        if (notvalid_tx_notice || nonsert_tx_notice) {

            // dont show invalid details here
            if (notvalid_tx_notice && notvalid_tx_notice.startsWith('invalid')) {
                notvalid_tx_notice = 'invalid';
            }

            const addvalid = notvalid_tx_notice ? notvalid_tx_notice : ''; // valid implicit (non valids surfaced)
            const addspace = (addvalid !== '') ? ' ' : '';
            const addinsert = nonsert_tx_notice ? nonsert_tx_notice : 'insert';

            incolumn = `${addvalid}${addspace}${addinsert}`;
        }

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}

                // at this point, is about which ones NOT to wrap
                class="whitespace-nowrap dark:text-slate-100"
                // class="dark:text-slate-100"

                style={{ padding: "0.25rem" }}
            >
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{
                    txhash_or_event ? (<Link to={`/tx/${txhash_or_event}`}>tx</Link>) : 'state'
                }</code></td> */}

                {show_all_events ?
                    (
                        <>
                            <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.event_index}</code></td>
                            <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.event}</code></td>
                        </>
                    )
                    : null
                }

                {/* event_index could become the new primary key, while keeping message_index in v9 order... */}
                <td style={{ padding: "0 1rem 0 0" }}><code>{(
                    message_row.message_index === 0 ||
                    message_row.message_index
                ) ? message_row.message_index : ''}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.message_index ? message_row.message_index : ''}</code></td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{message_event ? message_index : ''}</code></td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{message_index}</code></td> */}

                <td style={{ padding: "0 1rem 0 0" }}><code>{category}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{incolumn}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{
                    txhash_or_event ? (<Link to={`/tx/${txhash_or_event}`}>tx</Link>) : 'state'
                }</code></td> */}

                {show_bindings ?
                    (<td style={{ padding: "0 1rem 0 0" }}><code>{linksElementTd(bindingsElements, index)}</code></td>)
                    // (<td style={{ padding: "0 1rem 0 0" }}><code>{linksElement(bindingsElements, index)}</code></td>)
                    : null
                }
            </tr>
        );

        // return (
        //     <tr
        //         key={index}
        //         class="dark:text-slate-100"
        //         style={{ padding: "0.25rem" }}
        //     >
        //         {/* <tr key={index} style={{ padding: "0.25rem" }}> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{
        //             // txhash_or_event ? (<><Link to={`/tx/${txhash_or_event}`}>tx</Link>{invalid_tx_notice}</>) : 'state'
        //             txhash_or_event ? (<Link to={`/tx/${txhash_or_event}`}>tx</Link>) : 'state'
        //         }</td>
        //         {/* }{invalid_tx_notice}{nonsert_tx_notice}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{message_index}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{category}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{category}{invalid_tx_notice}</td> */}
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{command}</td> */}
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{message_index}</td> */}

        //         <td style={{ padding: "0 1rem 0 0" }}>{incolumn}</td>

        //         {show_bindings ?
        //             (<td style={{ padding: "0 1rem 0 0" }}>{linksElement(bindingsElements, index)}</td>)
        //             : null
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{linksElement(bindingsElements, index)}</td> */}

        //     </tr>
        // );
    }

    //////
    static getTableRowBlockTransactionsHeader() {
        // static getTableRowMessageBlockHeader() {
        return (
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                // class="whitespace-nowrap text-gray-600"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}>tx hash</td>    
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>tx</td>     */}
                <td style={{ padding: "0 1rem 0.25rem 0" }}>tx index</td>       
                <td style={{ padding: "0 1rem 0.25rem 0" }}>type</td>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>stringify</td> */}
            </tr>
=======
            <TableRow>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{message_index}</td> */}
                <TableCell>{
                    // txhash_or_event ? (<><Link to={`/tx/${txhash_or_event}`}>tx</Link>{invalid_tx_notice}</>) : 'state'
                    txhash_or_event ? (<Link to={`/tx/${txhash_or_event}`}>tx</Link>) : 'state'
                }</TableCell>
                <TableCell>{category}{invalid_tx_notice}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{category}</td> */}
                <TableCell>{command}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}
                <TableCell>{message_index}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(message_row)}</td> */}
                <TableCell className={"truncate max-w-xs"}>
                    {/*<Accordion className={"border-none m-0 overflow-visible"}>*/}
                    {/*    <AccordionHeader className={"border-none pl-0"}>*/}
                    {/*        <Subtitle>show details</Subtitle>*/}
                    {/*    </AccordionHeader>*/}
                    {/*    <AccordionBody className={"p-0"}>*/}
                            {linksElement(bindingsElements, index)}
                    {/*    </AccordionBody>*/}
                    {/*</Accordion>*/}

                </TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(message_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    static getTableRowBlockTransactions(transaction_row, index) {
        const tx_hash = transaction_row.tx_hash;
        const tx_index = transaction_row.tx_index;
        const surface_unsupported = !transaction_row.supported ? 'void ': '';
        return (
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code>{surface_unsupported}<Link to={`/tx/${tx_hash}`}>{tx_hash}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${tx_index}`}>{tx_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{transaction_row.cntrprty_decoded.msg_type}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{JSON.stringify(transaction_row)}</code></td> */}
            </tr>
        );
    }
    //////

    ///////////////
    // address balance
    static getTableRowBalanceAddressHeader(asset_page = false) {
        // static getTableRowBalanceAddressHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
=======
            <TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {asset_page ?
                    (<TableHeaderCell>Address</TableHeaderCell>)
                    : (<TableHeaderCell>Asset</TableHeaderCell>)
                }
                {/* <TableHeaderCell>asset</TableHeaderCell> */}

                {/* <TableHeaderCell>quantity (decimals are satoshi divisible)</TableHeaderCell> */}
                {/* <TableHeaderCell>quantity (decimals are divisible)</TableHeaderCell> */}
                <TableHeaderCell>Quantity</TableHeaderCell>
                <TableHeaderCell>Units</TableHeaderCell>
            </TableRow>
        );
    }
    static getTableRowBalanceAddress(balance_row, index, asset_page = false) {
        // static getTableRowBalanceAddress(balance_row, index) {
        const mainname = balance_row.asset_longname ? balance_row.asset_longname : balance_row.asset;
        const quantity_with_divisibility = quantityWithDivisibility(balance_row.divisible, BigInt(balance_row.quantity_text));
        // const quantity_with_divisibility = quantityWithDivisibility(balance_row.divisible, balance_row.quantity);
        // const quantity_with_divisibility = balance_row.divisible ? (Number(balance_row.quantity) / (10 ** 8)).toFixed(8) : Number(balance_row.quantity);

        // surface reset assets (only show units)
        const is_reset = balance_row.resets && true;

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                {asset_page ?
                    (<td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${balance_row.address}`}>{balance_row.address}</Link></code></td>)
                    // (<td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${balance_row.address}`}>{balance_row.address}</Link></td>)
                    :
                    (<td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${balance_row.asset}`}>{mainname}</Link></code></td>)
                    // (<td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${balance_row.asset}`}>{mainname}</Link></td>)
=======
            <TableRow key={index}>

                {asset_page ?
                    (<TableCell><Link to={`/address/${balance_row.address}`}>{balance_row.address}</Link></TableCell>)
                    : (<TableCell><Link to={`/asset/${balance_row.asset}`}>{mainname}</Link></TableCell>)
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                }
                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${balance_row.asset}`}>{mainname}</Link></td> */}

                {/* <td style={{ padding: "0 1rem 0 0" }}>{mainname}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{balance_row.asset}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{balance_row.quantity}</td> */}

                {is_reset ?
<<<<<<< HEAD:src/routes/shared/elements.js
                    (<td style={{ padding: "0 1rem 0 0" }}><code>RESET</code></td>)
                    // (<td style={{ padding: "0 1rem 0 0" }}>RESET</td>)
=======
                    (<TableCell>RESET</TableCell>)
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                    :
                    (<TableCell><code>{quantity_with_divisibility}</code></TableCell>)
                    // (<td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td>)
                }
                {/* <td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td> */}

                <TableCell><code>{`${BigInt(balance_row.quantity_text)}`}</code></TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{`${BigInt(balance_row.quantity_text)}`}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{BigInt(balance_row.quantity_text)}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{balance_row.quantity}</td> */}
            </TableRow>
        );
    }

    // address broadcasts
    static getTableRowBroadcastAddressHeader(show_additional_data) {
        // static getTableRowBroadcastAddressHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>text</td>
                {show_additional_data ?
                    (<td style={{ padding: "0 1rem 0.25rem 0" }}>additional data</td>)
                    : null
                }
            </tr>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>Block Index</TableHeaderCell>
                <TableHeaderCell>Block Time</TableHeaderCell>
                <TableHeaderCell>Text</TableHeaderCell>
                <TableHeaderCell>Timestamp</TableHeaderCell>
                <TableHeaderCell>Additional Data</TableHeaderCell>
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    static getTableRowBroadcastAddress(broadcast_row, index, show_additional_data) {
        // static getTableRowBroadcastAddress(broadcast_row, index) {
        const block_time_iso = timeIsoFormat(broadcast_row.block_time);
        const timestamp_iso = timeIsoFormat(broadcast_row.timestamp);

        const additional_data = {
            // TODO anything missing?

            status: broadcast_row.status,

            timestamp: timestamp_iso,

            value: broadcast_row.value,
            fee_fraction_int: broadcast_row.fee_fraction_int,
            locked: broadcast_row.locked,
        };
        const nonlinkElements = createNonLinkElement(JSON.stringify(additional_data));

        ////////
        const see_full = '... see full text';
        let broadcast_text_element;
        if (broadcast_row.text.length > TOOLONG_CHECK) {
            // different numbers on purpose (make it "worth it", avoiding only a couple of characters extra for moving to another page)
            broadcast_text_element = (
                <>
                    {/* <Link to={`/tx/${broadcast_row.tx_hash}`}>[full]</Link>
                    {' '} */}
                    {broadcast_row.text.slice(0, TOOLONG_CHECK - see_full.length)}
                    {/* {broadcast_row.text.slice(0, TOOLONG_TRIM)} */}
                    {' '}
                    <Link to={`/tx/${broadcast_row.tx_hash}`}>{see_full}</Link>
                    {/* <Link to={`/tx/${broadcast_row.tx_hash}`}>... see full text</Link> */}
                    {/* <Link to={`/tx/${broadcast_row.tx_hash}`}>... [see full text]</Link> */}
                </>
            );
            // broadcast_row_text = broadcast_row.text.slice(0, 200);
        }
        else {
            broadcast_text_element = broadcast_row.text;
        }
        ////////

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                // class="dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${broadcast_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${broadcast_row.block_index}`}>{broadcast_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                <td style={{ padding: "0 1rem 0 0" }}><code>{broadcast_text_element}</code></td>

                {show_additional_data ?
                    (<td style={{ padding: "0 1rem 0 0" }}><code>{linksElement(nonlinkElements, index)}</code></td>)
                    : null
                }

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${broadcast_row.tx_hash}`}>tx</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${broadcast_row.block_index}`}>{broadcast_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>

                <td style={{ padding: "0 1rem 0 0" }}>{broadcast_text_element}</td>
                // <td style={{ padding: "0 1rem 0 0" }}>{broadcast_row.text}</td>

                {show_additional_data ?
                    (<td style={{ padding: "0 1rem 0 0" }}>{linksElement(nonlinkElements, index)}</td>)
                    : null
                } */}

            </tr>
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${broadcast_row.tx_hash}`}>tx</Link>{invalid_tx_notice}</TableCell>
                <TableCell><Link to={`/block/${broadcast_row.block_index}`}>{broadcast_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>
                <TableCell className={"truncate max-w-xs"}>{broadcast_row.text}</TableCell>
                <TableCell>{timestamp_iso}</TableCell>
                <TableCell>{linksElement(nonlinkElements, index)}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(additional_data)}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(broadcast_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }

    // asset issuances/destructions
    /// address page only, for now
    static getTableRowIssuanceTransferHeader() {
        return (
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>asset</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>source</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
            </tr>
        );
    }
    static getTableRowIssuanceTransfer(issuance_event_row, index) {
        const mainname = issuance_event_row.asset_longname ? issuance_event_row.asset_longname : issuance_event_row.asset;
        const block_time_iso = timeIsoFormat(issuance_event_row.block_time);
        return (
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}
            </tr>
        );
    }
    ///
    static getTableRowIssuanceEventsAssetHeader(issuer_page = false) {
        // static getTableRowIssuanceEventsAssetHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js

            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                {/* <tr style={{ padding: "0.25rem" }}> */}

                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {issuer_page ?
                    (<TableHeaderCell>asset</TableHeaderCell>)
                    : (<TableHeaderCell>issuance / destroy</TableHeaderCell>)
                }

                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>type</td> */}
<<<<<<< HEAD:src/routes/shared/elements.js
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>quantity</td>
=======
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
                <TableHeaderCell>quantity</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {issuer_page ?
                    (<TableHeaderCell>description</TableHeaderCell>)
                    : (<TableHeaderCell>description / tag</TableHeaderCell>)
                }

                {issuer_page ?
                    null
                    : (<TableHeaderCell>issuer / source</TableHeaderCell>)
                }

                {/* <TableHeaderCell>issuer</td> */}
                {/* <TableHeaderCell>data</td> */}
            </TableRow>
        );
    }
    static getTableRowIssuanceEventsIssuanceAsset(issuance_event_row, index, divisible, issuer_page = false) {
        // static getTableRowIssuanceEventsIssuanceAsset(issuance_event_row, index, divisible) {
        const mainname = issuance_event_row.asset_longname ? issuance_event_row.asset_longname : issuance_event_row.asset;
        const quantity_with_divisibility = quantityWithDivisibility(divisible, BigInt(issuance_event_row.quantity_text));
        // const quantity_with_divisibility = quantityWithDivisibility(divisible, issuance_event_row.quantity);
        const block_time_iso = timeIsoFormat(issuance_event_row.block_time);

        // const issuer_transfer = (issuance_event_row.status === 'valid' && (issuance_event_row.source !== issuance_event_row.issuer))
        // const issuer = issuer_transfer ?
        //     (<>issuer transfer to: <Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>) :
        //     // (<>transfer to: <Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>) :
        //     (<><Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);

        // much simpler approach of only adding it to the first valid lock
        let addlocktag = false;
        if (index === issuance_event_row.validlock_first_issuance_index) {
            addlocktag = true;
        }
        // let description_orwith_lock_element;
        // if (issuance_event_row.locked) {
        //     if (issuance_event_row.display_lock_with_description) {
        //         description_orwith_lock_element = (
        //             <>
        //                 <strong>[LOCK]</strong>
        //                 {' '}
        //                 {issuance_event_row.description}
        //             </>
        //         );
        //     }
        //     else {
        //         description_orwith_lock_element = (<><strong>LOCK</strong></>);
        //     }
        // }
        // else {
        //     description_orwith_lock_element = (<>{issuance_event_row.description}</>);
        // }

        // const description_or_lock = issuance_event_row.locked ?
        //     (<><strong>LOCK</strong></>) :
        //     (issuance_event_row.description);

        // surfacing the not-valid issuances
        let invalid_tx_notice = null;
        if (issuance_event_row.status !== 'valid') {
            invalid_tx_notice = (<>{' '}<strong>{issuance_event_row.status}</strong></>);
            // invalid_tx_notice = (<>{' '}<strong>invalid</strong></>);
        }
        else { // status valid, but is a v9.60 reset
            if (issuance_event_row.reset === 1) {
                invalid_tx_notice = (<>{' '}<strong>RESET to {issuance_event_row.divisible ? 'satoshi' : 'wholeNumber'}</strong></>);
            }
        }

        // COMMENT: issuer + transfer is "convenient" (specially for service providers), but it breaks assumptions! SO, for now, will not show genesis transfer sources in the ISSUER page

        const issuer_transfer = (issuance_event_row.status === 'valid' && (issuance_event_row.source !== issuance_event_row.issuer))
        let issuer_element;
        if (issuer_transfer) {
            let from_element = null;
            if (issuance_event_row.display_source) {
                from_element = (<> from: <Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></>);
            }
            issuer_element = (<>issuer transfer{from_element} to: <Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);
            // issuer_element = (<>issuer transfer to: <Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);
        }
        else {
            issuer_element = (<><Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);
        }

        /////////
        // similar in getTableRowIssuanceEventsIssuanceAsset_addressPage
        const see_full = '... see full description';
        let description_element;

        const issuance_event_row_description = issuance_event_row.hide_repeated_description ? '' : issuance_event_row.description;

        if (issuance_event_row_description.length > TOOLONG_CHECK) {
            // if (issuance_event_row.description.length > TOOLONG_CHECK) {
            description_element = (
                <>
                    {addlocktag ?
                        (<><strong>[LOCK]</strong>{' '}</>)
                        : null
                    }
                    {issuance_event_row_description.slice(0, TOOLONG_TRIM - see_full.length)}
                    {/* {issuance_event_row.description.slice(0, TOOLONG_TRIM - see_full.length)} */}
                    {/* {issuance_event_row.description.slice(0, TOOLONG_TRIM)} */}
                    {' '}
                    <Link to={`/tx/${issuance_event_row.tx_hash}`}>{see_full}</Link>
                    {/* <Link to={`/tx/${issuance_event_row.tx_hash}`}>... see full description</Link> */}
                </>
            );
        }
        else {
            description_element = (
                <>
                    {addlocktag ?
                        (<><strong>[LOCK]</strong>{' '}</>)
                        : null
                    }
                    {issuance_event_row_description}
                    {/* {issuance_event_row.description} */}
                </>
            );
            // genesis_description_element = issuance_event_row.description;
        }
        /////////

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                // class="dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></code></td>

                {issuer_page ?
                    <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></code></td>
                    : (<td style={{ padding: "0 1rem 0 0" }}><code>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</code></td>)
                }

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantity_with_divisibility}</code></td>

                <td style={{ padding: "0 1rem 0 0" }}><code>{description_element}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{description_orwith_lock_element}</code></td> */}

                {issuer_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0 0" }}><code>{issuer_element}</code></td>)
                }
            </tr>
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></TableCell>

                {issuer_page ?
                    <TableCell><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></TableCell>
                    : (<TableCell>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</TableCell>)
                }

                <TableCell><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>
                <TableCell>{quantity_with_divisibility}</TableCell>
                <TableCell className={"truncate max-w-xs"}>{description_orwith_lock_element}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{description_or_lock}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.description}</td> */}

                {issuer_page ?
                    null
                    : (<TableCell>{issuer_element}</TableCell>)
                    // : (<td style={{ padding: "0 1rem 0 0" }}>{issuer}</td>)
                }
                {/* <td style={{ padding: "0 1rem 0 0" }}>{issuer}</td> */}

                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(issuance_event_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );

        // return (
        //     <tr
        //         key={index}
        //         /// general row nowrap NOT SURE IF fine here
        //         class="whitespace-nowrap dark:text-slate-100"
        //         // class="dark:text-slate-100"
        //         style={{ padding: "0.25rem" }}
        //     >
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></td>

        //         {issuer_page ?
        //             <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></td>
        //             : (<td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{description_orwith_lock_element}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{description_or_lock}</td> */}
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.description}</td> */}

        //         {issuer_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}>{issuer_element}</td>)
        //             // : (<td style={{ padding: "0 1rem 0 0" }}>{issuer}</td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{issuer}</td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(issuance_event_row)}</td> */}
        //     </tr>
        // );
    }
    static getTableRowIssuanceEventsDestroyAsset(issuance_event_row, index, divisible) {
        const quantity_with_divisibility = quantityWithDivisibility(divisible, BigInt(issuance_event_row.quantity_text));
        // const quantity_with_divisibility = quantityWithDivisibility(divisible, issuance_event_row.quantity);
        const block_time_iso = timeIsoFormat(issuance_event_row.block_time);

        let tag;
        if (
            issuance_event_row.tag &&
            (issuance_event_row.tag.type === 'Buffer') &&
            (issuance_event_row.tag.data.length === 0)
        ) {
            tag = '';
        }
        else if (
            issuance_event_row.tag &&
            (issuance_event_row.tag.type === 'Buffer') &&
            (issuance_event_row.tag.data.length > 0)
        ) {
            tag = (<><strong>[data]</strong></>);
        }
        else { // TODO discover the best approach...
            tag = issuance_event_row.tag;
            // tag = JSON.stringify(issuance_event_row.tag);
        }

        // surfacing the not-valid destroys
        let invalid_tx_notice = null;
        if (issuance_event_row.status !== 'valid') {
            invalid_tx_notice = (<>{' '}<strong>{issuance_event_row.status}</strong></>);
        }

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}</td> */}
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantity_with_divisibility}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{tag}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(issuance_event_row)}</td> */}
            </tr>
        );
        // return (
        //     <tr
        //         key={index}
        //         /// general row nowrap NOT SURE IF fine here
        //         class="whitespace-nowrap dark:text-slate-100"
        //         style={{ padding: "0.25rem" }}
        //     >
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{tag}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(issuance_event_row)}</td> */}
        //     </tr>
        // );
    }

    static getTableRowIssuanceEventsAssetHeader_addressPage() {
        return (
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>asset</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>quantity</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>description</td>
            </tr>
        );
    }
    static getTableRowIssuanceEventsIssuanceAsset_addressPage(issuance_event_row, index, divisible) {
        const mainname = issuance_event_row.asset_longname ? issuance_event_row.asset_longname : issuance_event_row.asset;
        const quantity_with_divisibility = quantityWithDivisibility(divisible, BigInt(issuance_event_row.quantity_text));
        const block_time_iso = timeIsoFormat(issuance_event_row.block_time);

        // lock in quantity in genesis issuance
        const quantity_with_divisibility_withlock_element = (
            <>
                {issuance_event_row.locked ?
                    (<><strong>[LOCK]</strong>{' '}</>)
                    : null
                }
                {quantity_with_divisibility}
            </>
        );

        /////////
        // similar in getTableRowIssuanceEventsIssuanceAsset
        const see_full = '... see full description';
        let genesis_description_element;
        if (issuance_event_row.description.length > TOOLONG_CHECK) {
            genesis_description_element = (
                <>
                    {issuance_event_row.description.slice(0, TOOLONG_TRIM - see_full.length)}
                    {/* {issuance_event_row.description.slice(0, TOOLONG_TRIM)} */}
                    {' '}
                    <Link to={`/tx/${issuance_event_row.tx_hash}`}>{see_full}</Link>
                    {/* <Link to={`/tx/${issuance_event_row.tx_hash}`}>... see full description</Link> */}
                </>
            );
        }
        else {
            genesis_description_element = issuance_event_row.description;
        }
        /////////

        // surfacing the the not-valid issuances (YES! invalid (and reset) genesis are interesting finds)
        let invalid_tx_notice = null;
        if (issuance_event_row.status !== 'valid') {
            invalid_tx_notice = (<>{' '}<strong>{issuance_event_row.status}</strong></>);
        }
        else { // status valid, but is a v9.60 reset
            if (issuance_event_row.reset === 1) {
                invalid_tx_notice = (<>{' '}<strong>RESET to {issuance_event_row.divisible ? 'satoshi' : 'wholeNumber'}</strong></>);
            }
        }

        // not doing this here...
        // // COMMENT: issuer + transfer is "convenient" (specially for service providers), but it breaks assumptions! SO, for now, will not show genesis transfer sources in the ISSUER page
        // const issuer_transfer = (issuance_event_row.status === 'valid' && (issuance_event_row.source !== issuance_event_row.issuer))
        // let issuer_element;
        // if (issuer_transfer) {
        //     let from_element = null;
        //     if (issuance_event_row.display_source) {
        //         from_element = (<> from: <Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></>);
        //     }
        //     issuer_element = (<>issuer transfer{from_element} to: <Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);
        //     // issuer_element = (<>issuer transfer to: <Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);
        // }
        // else {
        //     issuer_element = (<><Link to={`/address/${issuance_event_row.issuer}`}>{issuance_event_row.issuer}</Link></>);
        // }

        return (
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link>{invalid_tx_notice}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                <td style={{ padding: "0 1rem 0 0" }}><code>{quantity_with_divisibility_withlock_element}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{quantity_with_divisibility}</code></td> */}

                <td style={{ padding: "0 1rem 0 0" }}><code>{genesis_description_element}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link>{invalid_tx_notice}</td>

                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></td>
                // {issuer_page ?
                //     <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${issuance_event_row.asset}`}>{mainname}</Link></td>
                //     : (<td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</td>)
                // }

                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td>

                <td style={{ padding: "0 1rem 0 0" }}>{genesis_description_element}</td>
                // <td style={{ padding: "0 1rem 0 0" }}>{description_orwith_lock_element}</td> */}

            </tr>
=======
            <TableRow key={index} style={{ padding: "0.25rem" }}>
                <TableCell><Link to={`/tx/${issuance_event_row.tx_hash}`}>tx</Link></TableCell>
                <TableCell>{issuance_event_row.issuance_event_type}{invalid_tx_notice}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{issuance_event_row.issuance_event_type}</td> */}
                <TableCell><Link to={`/block/${issuance_event_row.block_index}`}>{issuance_event_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>
                <TableCell>{quantity_with_divisibility}</TableCell>
                <TableCell>{tag}</TableCell>
                <TableCell><Link to={`/address/${issuance_event_row.source}`}>{issuance_event_row.source}</Link></TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(issuance_event_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }

    // subassets
    static getTableRowSubassetsHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}>asset longname</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>asset name</td>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>longname</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>name</td> */}
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
            <TableRow>
                <TableHeaderCell>asset_longname</TableHeaderCell>
                <TableHeaderCell>asset_name</TableHeaderCell>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>longname</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>name</td> */}
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>stringify</td> */}
            </TableRow>
        );
    }
    static getTableRowSubassets(assets_row, index) {
        const block_time_iso = timeIsoFormat(assets_row.block_time);
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code>{assets_row.asset_longname}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${assets_row.asset_name}`}>{assets_row.asset_name}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${assets_row.block_index}`}>{assets_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}>{assets_row.asset_longname}</td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${assets_row.asset_name}`}>{assets_row.asset_name}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${assets_row.block_index}`}>{assets_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>
                //<td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(assets_row)}</td> */}
            </tr>
=======
            <TableRow key={index}>
                <TableCell>{assets_row.asset_longname}</TableCell>
                <TableCell><Link to={`/asset/${assets_row.asset_name}`}>{assets_row.asset_name}</Link></TableCell>
                <TableCell><Link to={`/block/${assets_row.block_index}`}>{assets_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(assets_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }


    // dispensers
    static getTableRowDispensersHeader(asset_metadata) {
        // static getTableRowDispensersHeader(divisible, asset_page = false) {
        // static getTableRowDispenseAssetHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {/* {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0.25rem 0" }}>status</td>)
                } */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>status</td> */}

                {/* {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0.25rem 0" }}>asset (get)</td>)
                } */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>asset (get)</td> */}

                <TableHeaderCell>sats / unit</TableHeaderCell>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>block_index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block_time_iso</td> */}

                <TableHeaderCell>{asset_metadata.asset} in escrow</TableHeaderCell>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>quantity (give_remaining)</td> */}

                <TableHeaderCell>address</TableHeaderCell>
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>source</td> */}
<<<<<<< HEAD:src/routes/shared/elements.js
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {/* {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td>)
                } */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            </TableRow>
        );
    }
    static getTableRowDispensers(dispensers_row, index, divisible, asset_page = false) {
        const quantity_with_divisibility = quantityWithDivisibility(divisible, BigInt(dispensers_row.give_remaining_text));
        // const quantity_with_divisibility = quantityWithDivisibility(divisible, dispensers_row.give_remaining);
        const block_time_iso = timeIsoFormat(dispensers_row.block_time);

        // surfacing the oracle
        const oracle_notice = dispensers_row.oracle_address ? (<>{' '}<strong>oracle</strong></>) : '';

        const status = getDispenserStatusText(dispensers_row.status);
        // const status = dispensers_row.status ? 'closed' : 'open'; // 10 = closed, 0 = open

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${dispensers_row.tx_hash}`}>tx</Link></code></td>

                {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0 0" }}><code>{`${status}${oracle_notice}`}</code></td>)
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${dispensers_row.tx_hash}`}>tx</Link></TableCell>

                {asset_page ?
                    null
                    : (<TableCell>{`${status}${oracle_notice}`}</TableCell>)
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                }

                {asset_page ?
                    null
<<<<<<< HEAD:src/routes/shared/elements.js
                    : (<td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></code></td>)
=======
                    : (<TableCell><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></TableCell>)
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                }

<<<<<<< HEAD:src/routes/shared/elements.js
                <td style={{ padding: "0 1rem 0 0" }}><code>{`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)}`}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantity_with_divisibility}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${dispensers_row.source}`}>{dispensers_row.source}</Link></code></td>
                
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${dispensers_row.tx_index_block}`}>{dispensers_row.tx_index_block}</Link></code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></code></td> */}
                
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0 0" }}><code>{JSON.stringify(dispensers_row)}</code></td>)
                }
            </tr>
=======
                <TableCell>{`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)}`}</TableCell>
                {/* <TableCell>{`${dispensers_row.satoshirate/dispensers_row.give_quantity}`}</TableCell> */}
                
                {/* <td style={{ padding: "0 1rem 0 0" }}>{dispensers_row.satoshirate/dispensers_row.give_quantity}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}
                <TableCell>{quantity_with_divisibility}</TableCell>
                <TableCell><Link to={`/address/${dispensers_row.source}`}>{dispensers_row.source}</Link></TableCell>
                <TableCell><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>

                {asset_page ?
                    null
                    : (<TableCell>{JSON.stringify(dispensers_row)}</TableCell>)
                }
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );

        // return (
        //     <tr
        //         key={index}
        //         class="whitespace-nowrap dark:text-slate-100"
        //         style={{ padding: "0.25rem" }}
        //     >
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${dispensers_row.tx_hash}`}>tx</Link></td>

        //         {asset_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}>{`${status}${oracle_notice}`}</td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{`${status}${oracle_notice}`}</td> */}

        //         {asset_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></td> */}

        //         <td style={{ padding: "0 1rem 0 0" }}>{`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)}`}</td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{`${dispensers_row.satoshirate / dispensers_row.give_quantity}`}</td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{dispensers_row.satoshirate/dispensers_row.give_quantity}</td> */}
        //         {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}
        //         <td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td>
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${dispensers_row.source}`}>{dispensers_row.source}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>

        //         {asset_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(dispensers_row)}</td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(dispensers_row)}</td> */}
        //     </tr>
        // );
    }

    static getTableRowDispensersHeader_addressPage() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>asset (get)</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>sats / unit</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
            <TableRow style={{ padding: "0.25rem" }}>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>asset (get)</TableHeaderCell>
                <TableHeaderCell>sats / unit</TableHeaderCell>
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            </TableRow>
        );
    }
    static getTableRowDispensers_addressPage(dispensers_row, index) {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${dispensers_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)}`}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{timeIsoFormat(dispensers_row.block_time)}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${dispensers_row.tx_hash}`}>tx</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></td>

                <td style={{ padding: "0 1rem 0 0" }}>{`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)}`}</td>
                // <td style={{ padding: "0 1rem 0 0" }}>{`${dispensers_row.satoshirate / dispensers_row.give_quantity}`}</td>

                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{timeIsoFormat(dispensers_row.block_time)}</td>
                // <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(dispensers_row)}</td> */}
            </tr>
=======
            <TableRow key={index} style={{ padding: "0.25rem" }}>
                <TableCell><Link to={`/tx/${dispensers_row.tx_hash}`}>tx</Link></TableCell>
                <TableCell><Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link></TableCell>
                
                <TableCell>{`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)}`}</TableCell>
                {/* <TableCell>{`${dispensers_row.satoshirate/dispensers_row.give_quantity}`}</TableCell> */}
                
                <TableCell><Link to={`/block/${dispensers_row.block_index}`}>{dispensers_row.block_index}</Link></TableCell>
                <TableCell>{timeIsoFormat(dispensers_row.block_time)}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(dispensers_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }

    // dispenses
    static getTableRowDispensesHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                {/* <tr style={{ padding: "0.25rem" }}> */}
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>quantity</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>destination</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>quantity</TableHeaderCell>
                <TableHeaderCell>destination</TableHeaderCell>
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            </TableRow>
        );
    }
    static getTableRowDispenses(dispenses_row, index, asset_metadata) {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                {/* <tr key={index} style={{ padding: "0.25rem" }}> */}
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${dispenses_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantityWithDivisibility(asset_metadata.divisible, BigInt(dispenses_row.dispense_quantity_text))}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${dispenses_row.destination}`}>{dispenses_row.destination}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${dispenses_row.block_index}`}>{dispenses_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{timeIsoFormat(dispenses_row.block_time)}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(dispenses_row)}</td> */}
            </tr>
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${dispenses_row.tx_hash}`}>tx</Link></TableCell>
                <TableCell>{quantityWithDivisibility(asset_metadata.divisible, BigInt(dispenses_row.dispense_quantity_text))}</TableCell>
                <TableCell><Link to={`/address/${dispenses_row.destination}`}>{dispenses_row.destination}</Link></TableCell>
                <TableCell><Link to={`/block/${dispenses_row.block_index}`}>{dispenses_row.block_index}</Link></TableCell>
                <TableCell>{timeIsoFormat(dispenses_row.block_time)}</TableCell>
                {/* <TableCell style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(dispenses_row)}</TableCell> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }

    // orders
    static getTableRowOrdersHeader(give_asset_metadata) {
        // static getTableRowOrdersHeader(divisible, asset_page = false) {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {/* {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0.25rem 0" }}>status</td>)
                } */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>status</td> */}

                {/* {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0.25rem 0" }}>give</td>)
                } */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>give</td> */}

                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>get</td> */}

                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>block_index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block_time_iso</td> */}

                {give_asset_metadata.asset === 'BTC' ?
                    (<TableHeaderCell>{give_asset_metadata.asset} promise</TableHeaderCell>)
                    :
                    (<TableHeaderCell>{give_asset_metadata.asset} in escrow</TableHeaderCell>)
                }
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>{give_asset_metadata.asset} in escrow</td> */}

                <TableHeaderCell>get remaining units (requested)</TableHeaderCell>

                <TableHeaderCell>source</TableHeaderCell>

<<<<<<< HEAD:src/routes/shared/elements.js
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {/* {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td>)
                } */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            </TableRow>
        );
    }
    static getTableRowOrders(orders_row, index, divisible, asset_page = false) {
        const quantity_with_divisibility = quantityWithDivisibility(divisible, BigInt(orders_row.give_remaining_text));
        // const quantity_with_divisibility = quantityWithDivisibility(divisible, orders_row.give_remaining);
        const block_time_iso = timeIsoFormat(orders_row.block_time);

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${orders_row.tx_hash}`}>tx</Link></code></td>

                {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0 0" }}><code>{orders_row.status}</code></td>)
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${orders_row.tx_hash}`}>tx</Link></TableCell>

                {asset_page ?
                    null
                    : (<TableCell>{orders_row.status}</TableCell>)
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                }

                {asset_page ?
                    null
<<<<<<< HEAD:src/routes/shared/elements.js
                    : (<td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${orders_row.give_asset}`}>{orders_row.give_asset}</Link></code></td>)
=======
                    : (<TableCell><Link to={`/asset/${orders_row.give_asset}`}>{orders_row.give_asset}</Link></TableCell>)
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                }

<<<<<<< HEAD:src/routes/shared/elements.js
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantity_with_divisibility}</code></td>

                <td style={{ padding: "0 1rem 0 0" }}>
                    <code>
                        <Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link>
                        {` ${BigInt(orders_row.get_remaining_text)}`}
                    </code>
                </td>

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${orders_row.source}`}>{orders_row.source}</Link></code></td>

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${orders_row.tx_index_block}`}>{orders_row.tx_index_block}</Link></code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></code></td> */}
                
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                {asset_page ?
                    null
                    : (<td style={{ padding: "0 1rem 0 0" }}><code>{JSON.stringify(orders_row)}</code></td>)
                }
            </tr>
=======
                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link></td> */}

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}

                <TableCell>{quantity_with_divisibility}</TableCell>

                <TableCell>
                    <>
                    <Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link>
                    {` ${BigInt(orders_row.get_remaining_text)}`}
                    </>
                </TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link></td> */}

                <TableCell><Link to={`/address/${orders_row.source}`}>{orders_row.source}</Link></TableCell>

                <TableCell><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>

                {asset_page ?
                    null
                    : (<TableCell>{JSON.stringify(orders_row)}</TableCell>)
                }
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(orders_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );

        // return (
        //     <tr
        //         key={index}
        //         class="whitespace-nowrap dark:text-slate-100"
        //         style={{ padding: "0.25rem" }}
        //     >
        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${orders_row.tx_hash}`}>tx</Link></td>

        //         {asset_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}>{orders_row.status}</td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{orders_row.status}</td> */}

        //         {asset_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${orders_row.give_asset}`}>{orders_row.give_asset}</Link></td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${orders_row.give_asset}`}>{orders_row.give_asset}</Link></td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link></td> */}

        //         {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td> */}

        //         <td style={{ padding: "0 1rem 0 0" }}>{quantity_with_divisibility}</td>

        //         <td style={{ padding: "0 1rem 0 0" }}>
        //             <>
        //                 <Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link>
        //                 {` ${BigInt(orders_row.get_remaining_text)}`}
        //             </>
        //         </td>
        //         {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/asset/${orders_row.get_asset}`}>{orders_row.get_asset}</Link></td> */}

        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${orders_row.source}`}>{orders_row.source}</Link></td>

        //         <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></td>
        //         <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>

        //         {asset_page ?
        //             null
        //             : (<td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(orders_row)}</td>)
        //         }
        //         {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(orders_row)}</td> */}
        //     </tr>
        // );
    }

    // orders exchanges / get asset (asset_page only for now)
    static getTableRowOrdersHeader_get(get_asset_metadata) {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>give remaining units (escrowed)</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>{get_asset_metadata.asset} requested</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>source</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>give remaining units (escrowed)</TableHeaderCell>
                <TableHeaderCell>{get_asset_metadata.asset} requested</TableHeaderCell>
                <TableHeaderCell>source</TableHeaderCell>
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td> */}
            </TableRow>
        );
    }
    static getTableRowOrders_get(orders_row, index, get_divisible) {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${orders_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}>
                    <code>
                        <Link to={`/asset/${orders_row.give_asset}`}>{orders_row.give_asset}</Link>
                        {` ${BigInt(orders_row.give_remaining_text)}`}
                    </code>
                </td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantityWithDivisibility(get_divisible, BigInt(orders_row.get_remaining_text))}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${orders_row.source}`}>{orders_row.source}</Link></code></td>

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${orders_row.tx_index_block}`}>{orders_row.tx_index_block}</Link></code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></code></td> */}
                
                <td style={{ padding: "0 1rem 0 0" }}><code>{timeIsoFormat(orders_row.block_time)}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${orders_row.tx_hash}`}>tx</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${orders_row.tx_hash}`}>tx</Link></TableCell>
                <TableCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                    <>
                        <Link to={`/asset/${orders_row.give_asset}`}>{orders_row.give_asset}</Link>
                        {` ${BigInt(orders_row.give_remaining_text)}`}
                    </>
<<<<<<< HEAD:src/routes/shared/elements.js
                </td>
                <td style={{ padding: "0 1rem 0 0" }}>{quantityWithDivisibility(get_divisible, BigInt(orders_row.get_remaining_text))}</td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/address/${orders_row.source}`}>{orders_row.source}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{timeIsoFormat(orders_row.block_time)}</td>
                // <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(orders_row)}</td> */}
            </tr>
=======
                </TableCell>
                <TableCell>{quantityWithDivisibility(get_divisible, BigInt(orders_row.get_remaining_text))}</TableCell>
                <TableCell><Link to={`/address/${orders_row.source}`}>{orders_row.source}</Link></TableCell>
                <TableCell><Link to={`/block/${orders_row.block_index}`}>{orders_row.block_index}</Link></TableCell>
                <TableCell>{timeIsoFormat(orders_row.block_time)}</TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(orders_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }

    // order matches
    static getTableRowOrderMatchesHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>status</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>forward</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>backward</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>status</TableHeaderCell>
                <TableHeaderCell>forward</TableHeaderCell>
                <TableHeaderCell>backward</TableHeaderCell>
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>JSON.stringify(order_matches_row)</td> */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>JSON.stringify(order_metadata)</td> */}
            </TableRow>
        );
    }
    static getTableRowOrderMatches(order_matches_row, index, order_metadata) {

        // simple approach
        const assets_divisibility = {};
        const issuances = [order_metadata.give_issuance, order_metadata.get_issuance];
        for (const issuance_obj of issuances) {
            assets_divisibility[issuance_obj.asset] = issuance_obj.divisible;
        }

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                {(order_metadata.tx_hash === order_matches_row.tx0_hash) ?
                    (<td style={{ padding: "0 1rem 0 0" }}><code>tx0</code></td>)
                    :
                    (<td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${order_matches_row.tx0_hash}`}>tx0</Link></code></td>)
                }
                {(order_metadata.tx_hash === order_matches_row.tx1_hash) ?
                    (<td style={{ padding: "0 1rem 0 0" }}><code>tx1</code></td>)
                    :
                    (<td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${order_matches_row.tx1_hash}`}>tx1</Link></code></td>)
                }
                <td style={{ padding: "0 1rem 0 0" }}><code>{order_matches_row.status}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}>
                    <code>
                        <Link to={`/asset/${order_matches_row.forward_asset}`}>{order_matches_row.forward_asset}</Link>
                        {` ${quantityWithDivisibility(assets_divisibility[order_matches_row.forward_asset], BigInt(order_matches_row.forward_quantity_text))}`}
                    </code>
                </td>
                <td style={{ padding: "0 1rem 0 0" }}>
                    <code>
                        <Link to={`/asset/${order_matches_row.backward_asset}`}>{order_matches_row.backward_asset}</Link>
                        {` ${quantityWithDivisibility(assets_divisibility[order_matches_row.backward_asset], BigInt(order_matches_row.backward_quantity_text))}`}
                    </code>
                </td>

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${order_matches_row.tx1_index_block}`}>{order_matches_row.tx1_index_block}</Link></code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${order_matches_row.block_index}`}>{order_matches_row.block_index}</Link></code></td> */}
                
                <td style={{ padding: "0 1rem 0 0" }}><code>{timeIsoFormat(order_matches_row.block_time)}</code></td>
                
=======
            <TableRow key={index}>
                {(order_metadata.tx_hash === order_matches_row.tx0_hash) ?
                    (<TableCell>tx0</TableCell>)
                    :
                    (<TableCell><Link to={`/tx/${order_matches_row.tx0_hash}`}>tx0</Link></TableCell>)
                }
                {(order_metadata.tx_hash === order_matches_row.tx1_hash) ?
                    (<TableCell>tx1</TableCell>)
                    :
                    (<TableCell><Link to={`/tx/${order_matches_row.tx1_hash}`}>tx1</Link></TableCell>)
                }
                <TableCell>{order_matches_row.status}</TableCell>
                <TableCell>
                    <>
                    <Link to={`/asset/${order_matches_row.forward_asset}`}>{order_matches_row.forward_asset}</Link>
                    {` ${quantityWithDivisibility(assets_divisibility[order_matches_row.forward_asset], BigInt(order_matches_row.forward_quantity_text))}`}
                    </>
                </TableCell>
                <TableCell>
                    <>
                    <Link to={`/asset/${order_matches_row.backward_asset}`}>{order_matches_row.backward_asset}</Link>
                    {` ${quantityWithDivisibility(assets_divisibility[order_matches_row.backward_asset], BigInt(order_matches_row.backward_quantity_text))}`}
                    </>
                </TableCell>
                <TableCell><Link to={`/block/${order_matches_row.block_index}`}>{order_matches_row.block_index}</Link></TableCell>
                <TableCell>{timeIsoFormat(order_matches_row.block_time)}</TableCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(order_matches_row)}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(order_metadata)}</td> */}
            </TableRow>
        );
    }

    // order matches btcpays
    static getTableRowOrderMatchesBtcpaysHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>status</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>BTC</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
=======
            <TableRow>
                <TableHeaderCell></TableHeaderCell>
                <TableHeaderCell>status</TableHeaderCell>
                <TableHeaderCell>BTC</TableHeaderCell>
                <TableHeaderCell>block_index</TableHeaderCell>
                <TableHeaderCell>block_time_iso</TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>JSON.stringify(btcpays_row)</td> */}
            </TableRow>
        );
    }
    static getTableRowOrderMatchesBtcpays(btcpays_row, index) {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${btcpays_row.tx_hash}`}>tx</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{btcpays_row.status}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{quantityWithDivisibility(true, BigInt(btcpays_row.btc_amount_text))}</code></td>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{quantityWithDivisibility(true, btcpays_row.btc_amount)}</td> */}
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${btcpays_row.block_index}`}>{btcpays_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{timeIsoFormat(btcpays_row.block_time)}</code></td>
=======
            <TableRow key={index}>
                <TableCell><Link to={`/tx/${btcpays_row.tx_hash}`}>tx</Link></TableCell>
                <TableCell>{btcpays_row.status}</TableCell>
                <TableCell>{quantityWithDivisibility(true, BigInt(btcpays_row.btc_amount_text))}</TableCell>
                {/* <TableCell>{quantityWithDivisibility(true, btcpays_row.btc_amount)}</TableCell> */}
                <TableCell><Link to={`/block/${btcpays_row.block_index}`}>{btcpays_row.block_index}</Link></TableCell>
                <TableCell>{timeIsoFormat(btcpays_row.block_time)}</TableCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(btcpays_row)}</td> */}
            </TableRow>
        );
    }

    // transactions
    static getTableRowTransactionHeader(is_home_page = false) {
        // static getTableRowTransactionHeader() {

        let firstTwo;
        if (is_home_page) {
            firstTwo = (
                <>
<<<<<<< HEAD:src/routes/shared/elements.js
                    <td style={{ padding: "0 1rem 0.25rem 0" }}>tx hash</td>
                    <td style={{ padding: "0 1rem 0.25rem 0" }}>tx index</td>
=======
                    <TableHeaderCell><Text>Tx Hash</Text></TableHeaderCell>
                    <TableHeaderCell><Text>Tx Index</Text></TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                </>
            );
        }
        else {
            firstTwo = (
                <>
<<<<<<< HEAD:src/routes/shared/elements.js
                    <td style={{ padding: "0 1rem 0.25rem 0" }}>tx index</td>
                    <td style={{ padding: "0 1rem 0.25rem 0" }}>tx hash</td>
=======
                <TableHeaderCell><Text>Tx Index</Text></TableHeaderCell>
                <TableHeaderCell><Text>Tx Hash</Text></TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                </>
            );
        }

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                {firstTwo}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>tx_hash</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>tx_index</td> */}

                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>fee (sats)</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>source</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>destination</td>
=======
            <TableRow>
                {firstTwo}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>tx_hash</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>tx_index</td> */}
                <TableHeaderCell><Text>Block Index</Text></TableHeaderCell>
                <TableHeaderCell><Text>Block Time</Text></TableHeaderCell>
                <TableHeaderCell><Text>Fee (sat)</Text></TableHeaderCell>
                <TableHeaderCell><Text>Source</Text></TableHeaderCell>
                <TableHeaderCell><Text>Destination</Text></TableHeaderCell>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>BTC burn</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>XCP mined</td> */}
                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>stringify</td> */}
            </TableRow>
        );
    }
    static getTableRowTransaction(transaction_row, index, is_home_page = false) {
        // static getTableRowTransaction(transaction_row, index, divisible = true) {
        const block_time_iso = timeIsoFormat(transaction_row.block_time);

        // surfacing the not supported transactions
        let notsupported_tx_notice = null;
        if (transaction_row.supported !== 1) {
            notsupported_tx_notice = (<>{' '}<strong>supported:{transaction_row.supported}</strong></>);
        }

        // const burned_quantity_with_divisibility = quantityWithDivisibility(divisible, burn_row.burned);
        // const earned_quantity_with_divisibility = quantityWithDivisibility(divisible, burn_row.earned);

<<<<<<< HEAD:src/routes/shared/elements.js
        return (
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100" // going into the rows, this one can be all tr because all values lengths are expected
                style={{ padding: "0.25rem" }}
            >
=======
        let firstTwo;
        if (is_home_page) {
            firstTwo = (
                <>
                    <TableCell className={"truncate max-w-xs"}><Link to={`/tx/${transaction_row.tx_hash}`}>{transaction_row.tx_hash}</Link></TableCell>
                    <TableCell>{transaction_row.tx_index}</TableCell>
                </>
            );
        } else {
            firstTwo = (
                <>
                    <TableCell>{transaction_row.tx_index}</TableCell>
                    <TableCell className={"truncate max-w-xs"}><Link to={`/tx/${transaction_row.tx_hash}`}>{transaction_row.tx_hash}</Link></TableCell>
                    {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${transaction_row.tx_hash}`}>{hashSlice(transaction_row.tx_hash)}</Link></td> */}
                </>
            );
        }

        return (
            <TableRow key={index}>
            {/*<tr key={index} style={{ padding: "0.25rem" }}>*/}
>>>>>>> develop:_legacy/src/routes/shared/elements.js

                {is_home_page ?
                    (
                        <>
                            <td style={{ padding: "0 1rem 0 0" }}><code>{notsupported_tx_notice}<Link to={`/tx/${transaction_row.tx_hash}`}>{transaction_row.tx_hash}</Link></code></td>
                            {/* <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${transaction_row.tx_hash}`}>{transaction_row.tx_hash}</Link></code></td> */}
                            <td style={{ padding: "0 1rem 0 0" }}><code>{transaction_row.tx_index}</code></td>
                        </>
                    )
                    :
                    (
                        <>
                            <td style={{ padding: "0 1rem 0 0" }}><code>{transaction_row.tx_index}{notsupported_tx_notice}</code></td>
                            {/* <td style={{ padding: "0 1rem 0 0" }}><code>{transaction_row.tx_index}</code></td> */}
                            <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/tx/${transaction_row.tx_hash}`}>{transaction_row.tx_hash}</Link></code></td>
                            {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/tx/${transaction_row.tx_hash}`}>{hashSlice(transaction_row.tx_hash)}</Link></td> */}
                        </>
                    )
                }

                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${transaction_row.block_index}`}>{transaction_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{transaction_row.fee}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${transaction_row.source}`}>{transaction_row.source}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/address/${transaction_row.destination}`}>{transaction_row.destination}</Link></code></td>

<<<<<<< HEAD:src/routes/shared/elements.js
            </tr>
=======
                <td style={{ padding: "0 1rem 0 0" }}>{transaction_row.tx_index}</td> */}

                <TableCell><Link to={`/block/${transaction_row.block_index}`}>{transaction_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>
                <TableCell>{transaction_row.fee}</TableCell>
                <TableCell className={"truncate max-w-xs"}><Link to={`/address/${transaction_row.source}`}>{transaction_row.source}</Link></TableCell>
                <TableCell className={"truncate max-w-xs"}><Link to={`/address/${transaction_row.destination}`}>{transaction_row.destination}</Link></TableCell>
                {/* <td style={{ padding: "0 1rem 0 0" }}>{burned_quantity_with_divisibility}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{earned_quantity_with_divisibility}</td> */}
                {/* <td style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(transaction_row)}</td> */}
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }

    // messages
    static getTableRowMessagesHeader() {
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}>message index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>category</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>command</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>bindings</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>timestamp</td>
            </tr>
=======
            <TableRow>
                <TableHeaderCell>Message Index</TableHeaderCell>
                <TableHeaderCell>Block Index</TableHeaderCell>
                <TableHeaderCell>Block Time</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Command</TableHeaderCell>
                <TableHeaderCell>Bindings</TableHeaderCell>
                <TableHeaderCell>Timestamp</TableHeaderCell>
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    static getTableRowMessages(message_row, index) {
        const block_time_iso = timeIsoFormat(message_row.block_time);
        const timestamp_iso = timeIsoFormat(message_row.timestamp);
        const bindingsElements = createLinkElementBindings(message_row.bindings);
        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >

                <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.message_index}</code></td>
                
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${message_row.block_index}`}>{message_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.category}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{message_row.command}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{linksElement(bindingsElements, index)}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{timestamp_iso}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}>{message_row.message_index}</td>
                <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${message_row.block_index}`}>{message_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{message_row.category}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{message_row.command}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{linksElement(bindingsElements, index)}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{timestamp_iso}</td> */}
            </tr>
        );
    }

    // blocks
    static getTableRowBlocksHeader() {
        return (
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block index</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>block time</td>

                <td style={{ padding: "0 1rem 0.25rem 0" }}>transactions</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>messages</td>

                {/* <td style={{ padding: "0 1rem 0.25rem 0" }}>block hash</td> */}

                <td style={{ padding: "0 1rem 0.25rem 0" }}>ledger hash</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>txlist hash</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>messages hash</td>
            </tr>
        );
    }
    static getTableRowBlocks(block_row, index) {
        const block_time_iso = timeIsoFormat(block_row.block_time);
        return (
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${block_row.block_index}`}>{block_row.block_index}</Link></code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_time_iso}</code></td>

                <td style={{ padding: "0 1rem 0 0" }}><code>{block_row.transactions_count}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_row.messages_count}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><code>{block_row.block_hash}</code></td> */}

                <td style={{ padding: "0 1rem 0 0" }}><code>{block_row.ledger_hash}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_row.txlist_hash}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code>{block_row.messages_hash}</code></td>

                {/* <td style={{ padding: "0 1rem 0 0" }}><Link to={`/block/${block_row.block_index}`}>{block_row.block_index}</Link></td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_time_iso}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_row.block_hash}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_row.ledger_hash}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_row.txlist_hash}</td>
                <td style={{ padding: "0 1rem 0 0" }}>{block_row.messages_hash}</td> */}
            </tr>
        );
    }

    // assets
    static getTableRowAssetsHeader() {
        return (
            <tr
                class="whitespace-nowrap text-gray-600 dark:text-gray-400"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0.25rem 0" }}>asset</td>
                <td style={{ padding: "0 1rem 0.25rem 0" }}>genesis block</td>
            </tr>
        );
    }
    static getTableRowAssets(asset_row, index) {
        const longname_if_applies = asset_row.asset_longname ? ` ${asset_row.asset_longname}` : '';
        return (
            <tr
                key={index}
                class="whitespace-nowrap dark:text-slate-100"
                style={{ padding: "0.25rem" }}
            >
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/asset/${asset_row.asset_name}`}>{asset_row.asset_name}</Link>{longname_if_applies}</code></td>
                <td style={{ padding: "0 1rem 0 0" }}><code><Link to={`/block/${asset_row.block_index}`}>{asset_row.block_index}</Link>{` (${timeIsoFormat(asset_row.block_time)})`}</code></td>
            </tr>
=======
            <TableRow key={index}>
                <TableCell>{message_row.message_index}</TableCell>
                <TableCell><Link to={`/block/${message_row.block_index}`}>{message_row.block_index}</Link></TableCell>
                <TableCell>{block_time_iso}</TableCell>
                <TableCell>{message_row.category}</TableCell>
                <TableCell>{message_row.command}</TableCell>
                <TableCell>{linksElement(bindingsElements, index)}</TableCell>
                <TableCell>{timestamp_iso}</TableCell>
            </TableRow>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
    ///////////////

}


const DEFAULT_THEME = "dark";
const DEFAULT_DEBUG_MODE = "false";

function getThemedElement() {

    // const elem = document.documentElement;
    const elem = document.getElementById("main-content");

    return elem;
}

function setTheme(element, theme) {
    element.classList.add(theme);
    localStorage.setItem("theme", theme);
}

function switchTheme(storedTheme) {
    const newColorTheme = storedTheme === "dark" ? "light" : "dark";
    const elem = getThemedElement();
    elem.classList.remove(storedTheme);
    setTheme(elem, newColorTheme);
    return newColorTheme;
}

class OneElements extends React.Component {

    constructor(props) {
        super(props);

        let _theme = localStorage.theme;
        if (typeof localStorage.theme === 'undefined') {
            localStorage.setItem("theme", DEFAULT_THEME);
            _theme = DEFAULT_THEME;
        }

        let _debug_mode = localStorage.debug_mode;
        if (typeof localStorage.debug_mode === 'undefined') {
            localStorage.setItem("debug_mode", DEFAULT_DEBUG_MODE);
            _theme = DEFAULT_DEBUG_MODE;
        }

        this.state = {
            theme: _theme,
            debug_mode: _debug_mode,
        };
        this.handleDarkModeToggle = this.handleDarkModeToggle.bind(this);
        this.handleDebugModeToggle = this.handleDebugModeToggle.bind(this);
    }

    handleDarkModeToggle() {
        // https://tailwindcss.com/docs/dark-mode
        // https://www.geeksforgeeks.org/how-to-add-dark-mode-in-reactjs-using-tailwind-css/
        const storedTheme = this.state.theme;
        const newColorTheme = switchTheme(storedTheme);
        this.setState({ theme: newColorTheme });
    }

    handleDebugModeToggle() {
        const storedDebugMode = this.state.debug_mode;
        let _debug_mode;
        if (storedDebugMode === "true") {
            _debug_mode = "false";
        }
        else {
            _debug_mode = "true";
        }
        localStorage.setItem("debug_mode", _debug_mode);

        window.location.reload();
        // this.setState({ debug_mode: _debug_mode });
    }

    componentDidMount() {
        const elem = getThemedElement();
        setTheme(elem, this.state.theme);
    }

    render() {

        // TODO?
        // https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
        // - move into own component, using 'document.documentElement', and it may improve
        // //////
        // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        //     document.documentElement.classList.add('dark')
        //   } else {
        //     document.documentElement.classList.remove('dark')
        //   }
        // //////

        return (
<<<<<<< HEAD:src/routes/shared/elements.js
            <span // appropriate for styling purposes: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
                id="main-content"
            >

                <div
                    // fixes 'tailwind background color full screen' https://stackoverflow.com/a/66028460
                    class="min-h-screen bg-slate-50 dark:bg-slate-800"
                    // class="bg-white dark:bg-black"
                    style={{ padding: "1rem" }}
                >

                    <div class="py-1 my-1">
                        <h1 class="text-3xl font-bold">
                            xcp.dev
                        </h1>
                        <h3>Counterparty Bitcoin Tools</h3>
                    </div>

                    <div class="py-1 my-1">
                        <nav
                            style={{
                                borderBottom: "solid 1px",
                                paddingBottom: "1rem",
                            }}
                        >
                            <Link to="/">Home</Link> |{" "}
                            <Link to="/assets">Assets</Link> |{" "}
                            <Link to="/messages">Messages</Link> |{" "}
                            <Link to="/wallet">Wallet</Link>

                            <div class="my-1">
                                <Search />
                            </div>
                        </nav>
                    </div>

                    <div class="py-1 my-1 ml-4">
                        {this.props.route_element}
                    </div>

                    <div class="py-1 my-1">

                        <div class="mb-1">
                            <label>
                                <input
                                    type="checkbox"
                                    onClick={this.handleDarkModeToggle}
                                    checked={this.state.theme === "dark"}
                                />
                                {' '}
                                <span class="text-gray-600 dark:text-gray-400">dark mode</span>
                            </label>
                            {' '}
                            <label>
                                <input
                                    type="checkbox"
                                    onClick={this.handleDebugModeToggle}
                                    checked={this.state.debug_mode === "true"}
                                />
                                {' '}
                                <span class="text-gray-600 dark:text-gray-400">debug mode</span>
                            </label>
                        </div>

                        {'[ '}
                        <a href={`https://github.com/CNTRPRTY/xcpdev-genesis`} target="_blank">xcp.dev v1.9</a>
                        {' '}|{' '}
                        <Link to="/api">API</Link>
                        {' ]'}

                        <br />
                        {'[ '}
                        <span class="dark:text-slate-100">
                            counterparty-lib v{COUNTERPARTY_VERSION}
                            {' '}
                            {COUNTERPARTY_VERSION_PREVIEW ? 'PREVIEW ' : ''}
                        </span>
                        {' ] '}
                        {/* [ <span class="dark:text-slate-100">counterparty-lib v{COUNTERPARTY_VERSION}</span> ] */}
                        [ <a href={COUNTERPARTY_VERSION_ALT_URL} target="_blank">v{COUNTERPARTY_VERSION_ALT}</a> ]
                        <br />
                        [ <span class="dark:text-slate-100">Bitcoin Core v{BITCOIN_VERSION}</span> ]

                    </div>

                </div>

            </span>
=======
            <main className={"p-4"}>

                {/* Header */}
                <div className={"flex flex-col mb-24 space-y-6"}>
                    <div className={"flex flex-row items-center justify-between"}>
                        {/* Logo section */}
                        <Logo/>
                        {/* Navigation menu section */}
                        <NavMenu/>
                    </div>
                    <Search/>
                </div>

                <div className={"flex flex-col w-full items-center justify-center"}>
                    {route_element}
                    <Footer />
                </div>

            </main>
>>>>>>> develop:_legacy/src/routes/shared/elements.js
        );
    }
}

export {
    ListElements,
    OneElements,
};
