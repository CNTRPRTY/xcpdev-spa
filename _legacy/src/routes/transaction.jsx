import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty, selectTransactionMessagesFromAll } from '../api';
import { OneElements, ListElements } from './shared/elements';
import { Link } from "react-router-dom";
import { decode_data } from '../decode_tx';
import { Buffer } from 'buffer';
<<<<<<< HEAD:src/routes/transaction.jsx
import { timeIsoFormat } from '../utils';
import TransactionStatic from './transaction_header/header_static';
import TransactionUpdateable from './transaction_header/header_updateable';
=======
import { timeIsoFormat, quantityWithDivisibility, formatDivision } from '../utils';
import { Card, Divider, List, ListItem, Subtitle, Table, TableBody, TableHead, Title, Text } from "@tremor/react";
>>>>>>> develop:_legacy/src/routes/transaction.jsx

function baseState(tx_hash) {
    return {
        tx_hash,
<<<<<<< HEAD:src/routes/transaction.jsx

        // TODO make it non-cntrprty compatible

        // transaction_not_found: null,
        transaction_loading: true,
        transaction_loading_error: null,
        transaction: null,

        cntrprty_error: null,
        cntrprty_hex: null,
        cntrprty_decoded: null,

        messages_loading: true,
        messages_loading_error: null,
        messages: [],

        // TODO eventually
        mempool: [],
=======
        transaction_not_found: null,
        transaction: null,

        messages: [],
        mempool: [],

        updateable_current_state_obj: null,

        olga_length: 0,
        olga_chars_cut: 0,
>>>>>>> develop:_legacy/src/routes/transaction.jsx
    };
}

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = baseState(props.router.params.txHash);
<<<<<<< HEAD:src/routes/transaction.jsx
=======
        this.handleRange = this.handleRange.bind(this);
    }

    handleRange(event) {
        // back to chars cut
        // event.target.value ={data_url_chain.length - this.state.olga_chars_cut}
        this.setState((prevState, props) => ({
            olga_chars_cut: this.state.olga_length - event.target.value
        }));
>>>>>>> develop:_legacy/src/routes/transaction.jsx
    }

    async fetchData(tx_hash) {

        // handle txindex redirect
        if (Number.isInteger(Number(tx_hash))) {
            try {
                const txindex_response = await getCntrprty(`/txindex/${tx_hash}`);
                this.props.router.navigate(`/tx/${txindex_response.transaction_row.tx_hash}`, { replace: true });
            }
            catch (err) {
                this.setState({
                    transaction_loading_error: err,
                });
            }
        }
        else {

            this.setState(baseState(tx_hash));

<<<<<<< HEAD:src/routes/transaction.jsx
            let transaction = null;
            try {
                const transaction_response = await getCntrprty(`/tx/${tx_hash}`);
                transaction = transaction_response.transaction;
=======
            try {
                transaction_response = await getCntrprty(`/tx/${tx_hash}`);
            }
            catch (e) {
                transaction_response = {
                    transaction: null,
                    mempool: [],
                };
            }

            if (
                !transaction_response.transaction &&
                !transaction_response.mempool.length
            ) {
                this.setState({ transaction_not_found: true });
            }
            else if (transaction_response.transaction) {

                // cntrprty transaction
                let cntrprty_decoded = null;
                const cntrprty_hex = Buffer.from(transaction_response.transaction.data, 'hex').toString('hex');
                try {
                    cntrprty_decoded = decode_data(cntrprty_hex, transaction_response.transaction.block_index);
                }
                catch (e) {
                    console.error(`cntrprty_decoded error: ${e}`);
                }

                // get block messages data
                let messages_all = [];
                try {
                    messages_all = (await getCntrprty(`/block/${transaction_response.transaction.block_index}/messages`)).messages;
                    // messages_all = (await getBlockMessages(transaction_response.transaction.block_index)).messages;
                }
                catch (e) {
                    console.error(`messages_all error: ${e}`);
                }

                // TODO quick hack
                transaction_response.messages = selectTransactionMessagesFromAll(tx_hash, messages_all);

                ////////////////////
                // repeated code, but keeps it simple
                // is olga?
                let olga_length = 0;
                const olga_broadcast_tx = "627ae48d6b4cffb2ea734be1016dedef4cee3f8ffefaea5602dd58c696de6b74";
                if (tx_hash === olga_broadcast_tx) {
                    const only_message_in_block = transaction_response.messages[0];
                    const bindings = JSON.parse(only_message_in_block.bindings);
                    const broadcast_text_raw = bindings.text;
                    const data_url_chain = `${'data:image'}${broadcast_text_raw.split('data:image')[1]}`;

                    olga_length = data_url_chain.length;
                }
                ////////////////////


                // updateable tx types
                const updateable = [
                    12, // dispenser
                    10, // order
                ];

                let updateable_current_state_obj = null;
                if (
                    cntrprty_decoded &&
                    updateable.includes(cntrprty_decoded.id)
                ) {

                    // store current dispenser info
                    if (cntrprty_decoded.id === 12) {
                        try {
                            // for now, just store response directly
                            updateable_current_state_obj = await getCntrprty(`/transactions/dispensers/${tx_hash}`);
                        }
                        catch (e) {
                            console.error(`transactions/dispensers error: ${e}`);
                        }
                    }

                    // store current order info
                    if (cntrprty_decoded.id === 10) {
                        try {
                            // for now, just store response directly
                            updateable_current_state_obj = await getCntrprty(`/transactions/orders/${tx_hash}`);
                        }
                        catch (e) {
                            console.error(`transactions/orders error: ${e}`);
                        }
                    }

                }


>>>>>>> develop:_legacy/src/routes/transaction.jsx
                this.setState({
                    transaction_loading: false,
                    transaction,
                });
            }
            catch (err) {
                this.setState({
                    transaction_loading_error: err,
                });
            }

            // TODO mempool...

            // cntrprty transaction
            if (transaction.data) {
                try {
                    const cntrprty_hex = Buffer.from(transaction.data, 'hex').toString('hex');
                    const cntrprty_decoded = decode_data(transaction.destination, transaction.block_index, cntrprty_hex);
                    this.setState({
                        cntrprty_hex,
                        cntrprty_decoded,
                    });
                }
                catch (err) {
                    this.setState({
                        cntrprty_error: err,
                    });
                }
            }

            try {
                const messages_response = await getCntrprty(`/block/${transaction.block_index}/messages`);
                const messages = selectTransactionMessagesFromAll(tx_hash, messages_response.messages);
                this.setState({
                    messages_loading: false,
                    messages,
                });
            }
            catch (err) {
                this.setState({
                    messages_loading_error: err,
                });
            }

        }

    }

    async componentDidMount() {
        await this.fetchData(this.state.tx_hash);
    }

    async componentDidUpdate(prevProps) {
        const updatedProp = this.props.router.params.txHash;
        if (updatedProp !== prevProps.router.params.txHash) {
            await this.fetchData(updatedProp);
        }
    }

    render() {
        let header_transaction_element = null;

        let transaction_element_contents = (
            <p class="text-gray-600 dark:text-gray-400">
                loading...
            </p>
        );
        if (this.state.transaction_loading_error) {
            transaction_element_contents = (
<<<<<<< HEAD:src/routes/transaction.jsx
                <p class="text-gray-600 dark:text-gray-400">
                    {`${this.state.transaction_loading_error}`}
                </p>
            );
        }
        else if (!this.state.transaction_loading) {

            let cntrprty_element_list = null;
            let cntrprty_element = null;
            if (this.state.cntrprty_error) {
                cntrprty_element_list = (
                    <>
                        <p class="text-gray-600 dark:text-gray-400">
                            unable to decode this transaction:
                            <br />
                            {`${this.state.cntrprty_error}`}
                        </p>
                    </>
=======
                // ideally, this should return basic transaction info for non counterparty transactions
                <Text>No CNTRPRTY block transaction found for tx_hash <a href={`https://mempool.space/tx/${this.state.tx_hash}`} target="_blank">{this.state.tx_hash}</a></Text>
                // <p>no CNTRPRTY transaction found for tx_hash <a href={`https://mempool.space/tx/${this.state.tx_hash}`} target="_blank">{this.state.tx_hash}</a></p>
            );
        }
        else if (this.state.mempool.length) {
            transaction_element_contents = (
                <>
                    <Title>In mempool...</Title>

                    {/* // when it is in the mempool, it can be multiple rows just like the homepage */}

                    <Table>
                        <TableHead>
                            {ListElements.getTableRowMempoolTxHeader()}
                        </TableHead>
                        <TableBody>
                            {this.state.mempool.map((mempool_row, index) => {
                                return ListElements.getTableRowMempoolTx(mempool_row, index);
                            })}
                        </TableBody>
                    </Table>

                </>
            );
        }

        else if (this.state.transaction) {

            // is olga
            let olga_element = null;
            if (this.state.olga_length) {
                const only_message_in_block = this.state.messages[0];
                const bindings = JSON.parse(only_message_in_block.bindings);
                const broadcast_text_raw = bindings.text;
                const data_url_chain = `${'data:image'}${broadcast_text_raw.split('data:image')[1]}`;

                let data_url_cut; // making copies of both

                if (this.state.olga_chars_cut) {
                    data_url_cut = data_url_chain.slice(0, -this.state.olga_chars_cut);
                }
                else {
                    data_url_cut = data_url_chain.slice();
                }

                // https://github.com/CNTRPRTY/xcpdev/commit/c7e1abd5bfc2a595bc70f86e14f7abdd91d787a6#r98715058
                const source_fix = "XzkBVJ+7LLFsvw/8VIX1OE5OPsAAAAASUVORK5CYII=";
                const data_url_chain_fixed = `${data_url_chain}${source_fix}`;

                const notreverse = [...data_url_cut]; // making both arrays for consistency
                const reverse = [...data_url_cut].reverse(); // https://stackoverflow.com/a/57569141

                olga_element = (
                    <li>
                        <Text>Honoring <Link to={`/asset/OLGA`}>OLGA</Link></Text>
                        <img src={data_url_chain_fixed} alt={"OLGA"}/>
                        <Text>Image *written* in Bitcoin since 2015</Text>

                        <input
                            type="range"
                            min="0" max={data_url_chain.length}
                            value={data_url_chain.length - this.state.olga_chars_cut}
                            onChange={this.handleRange}
                            step="1"
                        />

                        <br />
                        *<a href={`https://github.com/CNTRPRTY/xcpdev/commit/c7e1abd5bfc2a595bc70f86e14f7abdd91d787a6#r98710211`} target="_blank">on chain only</a>* image *can* be seen below, use slider (works on desktop)

                        <br />
                        <br />
                        <img src={`${data_url_cut}=`} style={{ width: "200px" }} alt={"OLGA"}/>
                        <br />
                        reverse:{' '}
                        [{reverse.join('')}]
                        <br />
                        esrever:{' '}
                        [{notreverse.join('')}]
                    </li>
>>>>>>> develop:_legacy/src/routes/transaction.jsx
                );
            }
            else if (this.state.cntrprty_decoded) {
                cntrprty_element_list = (
                    <>
<<<<<<< HEAD:src/routes/transaction.jsx
                        <ul>
                        {/* <ul class="list-disc list-inside"> */}

                            <li>
                                <span class="text-gray-600 dark:text-gray-400">hex:</span>
                                {' '}
                                <span class="dark:text-slate-100">{this.state.cntrprty_hex}</span>
                            </li>
                            <li>
                                <span class="text-gray-600 dark:text-gray-400">type:</span>
                                {' '}
                                <span class="dark:text-slate-100">{this.state.cntrprty_decoded.msg_type} (id: {this.state.cntrprty_decoded.id})</span>
                            </li>

                            {/* <li>hex: {this.state.cntrprty_hex}</li>
                            <li>type: {this.state.cntrprty_decoded.msg_type} (id: {this.state.cntrprty_decoded.id})</li> */}

                            {Object.keys(this.state.cntrprty_decoded.msg_decoded).length ?
                                (

                                    <li>
                                        {/* adding some space */}
                                        <div class="pt-1 my-1">

                                        <span class="text-gray-600 dark:text-gray-400">decoded:</span>
                                        {/* <div class="pt-1 mt-1 ml-4 whitespace-nowrap overflow-auto"> */}
                                        <div class="pt-1 mt-1 ml-4">
                                            {/* <div class="py-1 my-1 ml-4"> */}
                                            <ul>
                                            {/* <ul class="list-disc list-inside"> */}
                                                {Object.keys(this.state.cntrprty_decoded.msg_decoded).map((msg_decoded_key, list_index) => {
                                                    const msg_decoded_value = this.state.cntrprty_decoded.msg_decoded[msg_decoded_key];
                                                    return (
                                                        <li key={list_index}>
                                                            <span class="text-gray-600 dark:text-gray-400">{msg_decoded_key}:</span>
                                                            {' '}
                                                            <span class="dark:text-slate-100">{msg_decoded_value}</span>
                                                        </li>
                                                        // <li key={list_index}>{msg_decoded_key}: {msg_decoded_value}</li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        </div>
                                    </li>

                                    // <li>decoded:
                                    //     <div class="pt-1 mt-1 ml-4">
                                    //         // <div class="py-1 my-1 ml-4">
                                    //         <ul class="list-disc list-inside">
                                    //             {Object.keys(this.state.cntrprty_decoded.msg_decoded).map((msg_decoded_key, list_index) => {
                                    //                 const msg_decoded_value = this.state.cntrprty_decoded.msg_decoded[msg_decoded_key];
                                    //                 return (
                                    //                     <li key={list_index}>{msg_decoded_key}: {msg_decoded_value}</li>
                                    //                 );
                                    //             })}
                                    //         </ul>
                                    //     </div>
                                    // </li>
                                )
                                : null
=======
                        <Title>Dispenser:</Title>
                        <Text>State as of block {tip_blocks_row.block_index} ({timeIsoFormat(tip_blocks_row.block_time)})</Text>
                        <ul>
                            <li>Status: {dispenser_status}</li>
                        </ul>
                        <ul>
                            <li>Asset:{tell_multiple ? ':' : ''} <Link to={`/asset/${dispensers_row.asset}`}>{dispensers_row.asset}</Link>{asset_issuance.asset_longname ? ` (${asset_issuance.asset_longname})` : ''}</li>
                            <li>Address: <Link to={`/address/${dispensers_row.source}`}>{dispensers_row.source}</Link></li>
                        </ul>

                        {!tell_reset ?
                            (
                                <>
                                    <ul>
                                        <li>{`${BigInt(dispensers_row.satoshirate_text)}`} sats for {quantityWithDivisibility(asset_issuance.divisible, BigInt(dispensers_row.give_quantity_text))}</li>
                                        <li>{quantityWithDivisibility(asset_issuance.divisible, BigInt(dispensers_row.give_remaining_text))} of {quantityWithDivisibility(asset_issuance.divisible, BigInt(dispensers_row.escrow_quantity_text))} remaining</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            {`${formatDivision(dispensers_row.satoshirate, dispensers_row.give_quantity)} sats / unit`}
                                            {/* {`${(dispensers_row.satoshirate / dispensers_row.give_quantity).toFixed(10)}`} sats / unit */}
                                            {/* {`${dispensers_row.satoshirate / dispensers_row.give_quantity}`} sats / unit */}
                                            {/* {`${BigInt(dispensers_row.satoshirate_text)/BigInt(dispensers_row.give_quantity_text)}`} sats / unit */}
                                        </li>
                                    </ul>
                                </>
                            )
                            :
                            (
                                <ul>
                                    <li>v9.60 RESET ASSET</li>
                                </ul>
                            )
                        }

                        {dispenses_rows.length ?
                            (
                                <>
                                    <Divider />
                                    <Title>Dispenses:</Title>
                                    <Table>
                                        <TableHead>
                                            {ListElements.getTableRowDispensesHeader()}
                                        </TableHead>
                                        <TableBody>
                                            {dispenses_rows.map((dispenses_row, index) => {
                                                return ListElements.getTableRowDispenses(dispenses_row, index, asset_issuance);
                                            })}
                                        </TableBody>
                                    </Table>
                                </>
                            )
                            : null
                        }

                    </>
                );

            }


            // is updateable: order
            if (
                this.state.cntrprty_decoded.id === 10 &&
                this.state.updateable_current_state_obj
            ) {

                const tip_blocks_row = this.state.updateable_current_state_obj.tip_blocks_row;

                // // only doing this kind of check for dispensers
                // let tell_multiple = false;

                const give_issuance = this.state.updateable_current_state_obj.give_issuances_row[0];
                let give_tell_reset = false;
                if (give_issuance.resets) {
                    give_tell_reset = true;
                }

                const get_issuance = this.state.updateable_current_state_obj.get_issuances_row[0];
                let get_tell_reset = false;
                if (get_issuance.resets) {
                    get_tell_reset = true;
                }

                const orders_row = this.state.updateable_current_state_obj.orders_row;

                const expire_block_message = (orders_row.expire_index > tip_blocks_row.block_index) ?
                    `expire block: ${orders_row.expire_index} (in ${orders_row.expire_index - tip_blocks_row.block_index} blocks)`
                    :
                    `expired in block: ${orders_row.expire_index}`;

                const order_matches_rows = this.state.updateable_current_state_obj.order_matches_rows;
                const order_matches_btcpays_rows = this.state.updateable_current_state_obj.btcpays_rows;

                order_element = (
                    <>
                        <Title>Order:</Title>
                        <Text>State as of block {tip_blocks_row.block_index} ({timeIsoFormat(tip_blocks_row.block_time)})</Text>
                        <ul>
                            <li>status: {orders_row.status}</li>
                        </ul>

                        <ul>
                            <li>give (asset escrowed):
                                <ul>
                                    <li>asset: <Link to={`/asset/${give_issuance.asset}`}>{give_issuance.asset}</Link>{give_issuance.asset_longname ? ` (${give_issuance.asset_longname})` : ''}</li>
                                    {!give_tell_reset ?
                                        (
                                            <li>{quantityWithDivisibility(give_issuance.divisible, BigInt(orders_row.give_remaining_text))} of {quantityWithDivisibility(give_issuance.divisible, BigInt(orders_row.give_quantity_text))} remaining</li>
                                        )
                                        :
                                        (
                                            <ul>
                                                <li>v9.60 RESET ASSET</li>
                                            </ul>
                                        )
                                    }
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>get (asset requested in exchange):
                                <ul>
                                    <li>asset: <Link to={`/asset/${get_issuance.asset}`}>{get_issuance.asset}</Link>{get_issuance.asset_longname ? ` (${get_issuance.asset_longname})` : ''}</li>
                                    {!get_tell_reset ?
                                        (
                                            <li>{quantityWithDivisibility(get_issuance.divisible, BigInt(orders_row.get_remaining_text))} (of {quantityWithDivisibility(get_issuance.divisible, BigInt(orders_row.get_quantity_text))} total requested)</li>
                                        )
                                        :
                                        (
                                            <ul>
                                                <li>v9.60 RESET ASSET</li>
                                            </ul>
                                        )
                                    }
                                </ul>
                            </li>
                        </ul>

                        <ul>
                            <li>{expire_block_message}</li>
                            {orders_row.fee_required ?
                                (
                                    <li>fee_required_remaining: {orders_row.fee_required_remaining} (of {orders_row.fee_required})</li>
                                )
                                : null
                            }
                        </ul>

                        {order_matches_rows.length ?
                            (
                                <>
                                    <Title>Order matches:</Title>
                                    <Table>
                                        <TableHead>
                                            {ListElements.getTableRowOrderMatchesHeader()}
                                        </TableHead>
                                        <TableBody>
                                            {order_matches_rows.map((order_matches_row, index) => {
                                                const order_metadata = {
                                                    tx_hash: orders_row.tx_hash,
                                                    give_issuance: give_issuance,
                                                    get_issuance: get_issuance,
                                                }
                                                return ListElements.getTableRowOrderMatches(order_matches_row, index, order_metadata);
                                            })}
                                        </TableBody>
                                    </Table>
                                    {/* !nested terniary! */}
                                    {order_matches_btcpays_rows.length ?
                                        (
                                            <>
                                                <Title>BTC pays:</Title>
                                                <Table>
                                                    <TableHead>
                                                        {ListElements.getTableRowOrderMatchesBtcpaysHeader()}
                                                    </TableHead>
                                                    <TableBody>
                                                        {order_matches_btcpays_rows.map((btcpays_row, index) => {
                                                            return ListElements.getTableRowOrderMatchesBtcpays(btcpays_row, index);
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </>
                                        )
                                        : null
                                    }
                                </>
                            )
                            : null
                        }

                    </>
                );

            }


            // is btcpay (trying handling based only on cntrprty_decoded)
            if (this.state.cntrprty_decoded.id === 11) {
                const order_0 = this.state.cntrprty_decoded.msg_decoded.order_0;
                const order_1 = this.state.cntrprty_decoded.msg_decoded.order_1;
                btcpay_element = (
                    <>
                        <Title>BTC pay:</Title>
                        <ul>
                            <li>tx0: <Link to={`/tx/${order_0}`}>{order_0}</Link></li>
                            <li>tx1: <Link to={`/tx/${order_1}`}>{order_1}</Link></li>
                        </ul>
                    </>
                );
            }


            // is broadcast
            if (this.state.cntrprty_decoded.id === 30) {
                const text = this.state.cntrprty_decoded.msg_decoded.text;
                broadcast_element = (
                    <>
                        <Title>Broadcast:</Title>
                        <textarea rows="2" cols="55" style={{
                            // https://stackoverflow.com/a/658197
                            'whiteSpace': "nowrap",
                            'overflow': "scroll",
                            'overflowY': "hidden",
                            'overflowX': "scroll",
                            'overflow': "-moz-scrollbars-horizontal",
                            // https://stackoverflow.com/a/5271803
                            'resize': 'horizontal',
                        }} readOnly>{text}</textarea>
                    </>
                );
            }


            transaction_element_contents = (
                <>

                    <ul>

                        {/* non protocol / manual connection to the tx (but SHOULD still be on-chain based) */}
                        {olga_element}

                        <li>

                            <Title>CNTRPRTY transaction:</Title>

                            <ul>

                                <li><Subtitle>Tx Index: {this.state.transaction.tx_index}{this.state.transaction.supported ? '' : ' (supported:0)'}</Subtitle></li>

                                <li><Subtitle className={"truncate"}>Tx Hash: {this.state.transaction.tx_hash} <a href={`https://mempool.space/tx/${this.state.transaction.tx_hash}`} target="_blank">{String.fromCharCode(10697)}</a></Subtitle></li>
                                {/* https://www.quora.com/Is-the-symbol-for-external-link-available-in-Unicode-If-so-how-do-I-get-in-on-my-Mac */}
                                <li><Subtitle>Block Index: <Link to={`/block/${this.state.transaction.block_index}`}>{this.state.transaction.block_index}</Link></Subtitle></li>
                                <li><Subtitle>Block time: {timeIsoFormat(this.state.transaction.block_time)}</Subtitle></li>
                                <li><Subtitle>Source: <Link to={`/address/${this.state.transaction.source}`}>{this.state.transaction.source}</Link></Subtitle></li>
                                {this.state.transaction.destination ? (
                                    <li><Subtitle>Destination: <Link to={`/address/${this.state.transaction.destination}`}>{this.state.transaction.destination}</Link></Subtitle></li>
                                ) : null}
                            </ul>

                        </li>

                        <li>
                            {/* TODO? remove the whole section for Bitcoin only transactions (like dispense)...??? */}
                            <Divider />
                            <Title>Data:</Title>
                            {(this.state.cntrprty_decoded && this.state.cntrprty_decoded.msg_decoded) ?
                                (
                                    <List>
                                        <ListItem><span>hex</span> <span>{this.state.cntrprty_hex}</span></ListItem>
                                        <ListItem><span>type</span> <span>{this.state.cntrprty_decoded.msg_type} (id: {this.state.cntrprty_decoded.id})</span></ListItem>

                                        <ListItem>
                                            <Subtitle>decoded</Subtitle>
                                            <Card className={"max-w-2xl m-3"}>
                                                <List>
                                                    {Object.keys(this.state.cntrprty_decoded.msg_decoded).map((msg_decoded_key, list_index) => {
                                                        const msg_decoded_value = this.state.cntrprty_decoded.msg_decoded[msg_decoded_key];
                                                        return (
                                                            <ListItem key={list_index}><span>{msg_decoded_key}</span> <span>{msg_decoded_value}</span></ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Card>
                                        </ListItem>

                                    </List>
                                ) :
                                (<Subtitle>(unable to decode this transaction)</Subtitle>)
>>>>>>> develop:_legacy/src/routes/transaction.jsx
                            }

<<<<<<< HEAD:src/routes/transaction.jsx
                        </ul>
                    </>
                );
            }
            if (cntrprty_element_list) {
                cntrprty_element = (
                    <>
                        <ul class="list-disc list-inside">
                            <li>
                                <span class="font-bold dark:text-slate-100">
                                    Data:
                                </span>
                                {/* <strong>Data:</strong> */}
                                {/* <h4>Data:</h4> */}
                                <div class="pt-1 mt-1 ml-4 whitespace-nowrap overflow-auto">
                                {/* <div class="pt-1 mt-1 ml-4"> */}
                                    {/* <div class="py-1 my-1 ml-4"> */}
                                    {cntrprty_element_list}
                                </div>
                            </li>
                        </ul>
                    </>
                );
            }


            let messages_element_content = (
                <p class="text-gray-600 dark:text-gray-400">
                    loading...
                </p>
            );
            if (this.state.messages_loading_error) {
                messages_element_content = (
                    <p class="text-gray-600 dark:text-gray-400">
                        {`${this.state.messages_loading_error}`}
                    </p>
                );
            }
            else if (!this.state.messages_loading) {
                messages_element_content = this.state.messages.length ?
                    (
                        <>
                            <table>
                                <tbody>
=======
                        <li>
                            <Divider />
                            <Title>Messages:</Title>
                            <Table>
                                <TableHead>
>>>>>>> develop:_legacy/src/routes/transaction.jsx
                                    {ListElements.getTableRowMessageTxHeader()}
                                </TableHead>
                                <TableBody>
                                    {this.state.messages.map((message_row, index) => {
                                        return ListElements.getTableRowMessageTx(message_row, index);
                                    })}
<<<<<<< HEAD:src/routes/transaction.jsx
                                </tbody>
                            </table>
                        </>
                    )
                    : (
                    <p class="text-gray-600 dark:text-gray-400">
                        no messages?
                    </p>
                    );
            }
            const messages_element = (
                <>
                    <div class="py-1 my-1">
                        <h4 class="font-bold">
                            Messages:
                        </h4>
                    </div>
                    <div class="pt-1 mt-1 ml-4 overflow-auto">
                    {/* <div class="pt-1 mt-1"> */}
                        {messages_element_content}
                    </div>
                </>
            );


            if (this.state.cntrprty_decoded) {
                // is header transaction component?
                const updateable = TransactionUpdateable.tx_type_ids;
                const therest = TransactionStatic.tx_type_ids;

                if (updateable.includes(this.state.cntrprty_decoded.id)) {
                    header_transaction_element = (
                        <div class="pb-1 mb-4">
                            {/* <div class="py-1 my-1"> */}
                            <TransactionUpdateable tx_hash={this.state.transaction.tx_hash} decoded_obj={this.state.cntrprty_decoded} />
                        </div>
                    );
                }

                if (therest.includes(this.state.cntrprty_decoded.id)) {
                    header_transaction_element = (
                        <div class="pb-1 mb-4">
                            {/* <div class="py-1 my-1"> */}
                            <TransactionStatic tx_hash={this.state.transaction.tx_hash} decoded_obj={this.state.cntrprty_decoded} />
                        </div>
                    );
                }
            }
            // else it should already be in cntrprty_error


            let transaction_cntrprty_element = null;
            if (this.state.cntrprty_decoded || this.state.messages.length) {
                transaction_cntrprty_element = (
                    <div class="pt-1 mt-1">
                        <div class="pt-1 mt-1">
                            <ul class="list-disc list-inside">
                                <li>
                                    {/* <div class="py-1 my-1"> */}
                                    <span class="font-bold dark:text-slate-100">
                                        CNTRPRTY:
                                    </span>
                                    {/* <strong>CNTRPRTY:</strong> */}
                                    {/* <h3 class="font-bold">
                                        CNTRPRTY:
                                    </h3> */}
                                    <div class="py-1 my-1 ml-4 whitespace-nowrap overflow-auto">
                                    {/* <div class="py-1 my-1 ml-4"> */}
                                        <ul>
                                        {/* <ul class="list-disc list-inside"> */}

                                            <li>
                                                <span class="text-gray-600 dark:text-gray-400">tx index:</span>
                                                {' '}
                                                <span class="dark:text-slate-100">{this.state.transaction.tx_index}{this.state.transaction.supported ? '' : ' (supported:0)'}</span>
                                            </li>
                                            <li>
                                                <span class="text-gray-600 dark:text-gray-400">source:</span>
                                                {' '}
                                                <span class="dark:text-slate-100"><Link to={`/address/${this.state.transaction.source}`}>{this.state.transaction.source}</Link></span>
                                            </li>
                                            {this.state.transaction.destination ? (
                                                <li>
                                                    <span class="text-gray-600 dark:text-gray-400">destination:</span>
                                                    {' '}
                                                    <span class="dark:text-slate-100"><Link to={`/address/${this.state.transaction.destination}`}>{this.state.transaction.destination}</Link></span>
                                                </li>
                                            ) : null}

                                            {/* <li>tx index: {this.state.transaction.tx_index}{this.state.transaction.supported ? '' : ' (supported:0)'}</li>
                                            <li>source: <Link to={`/address/${this.state.transaction.source}`}>{this.state.transaction.source}</Link></li>
                                            {this.state.transaction.destination ? (
                                                <li>destination: <Link to={`/address/${this.state.transaction.destination}`}>{this.state.transaction.destination}</Link></li>
                                            ) : null} */}
                                        </ul>
                                    </div>
                                    <div class="py-1 my-1 ml-4">
                                        {cntrprty_element}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="pt-1 mt-1">
                            {/* <div class="py-1 my-1"> */}
                            {messages_element}
                        </div>
                    </div>
                );
            }

            transaction_element_contents = (
                <>
                    <div class="whitespace-nowrap overflow-auto">
                    <ul>
                    {/* <ul class="list-disc list-inside"> */}

                        <li>
                            {/* TODO correct icon */}
                            <span class="text-gray-600 dark:text-gray-400">tx hash:</span>
                            {' '}
                            <span class="dark:text-slate-100">{this.state.transaction.tx_hash}</span>
                        </li>
                        <li>
                            <span class="text-gray-600 dark:text-gray-400">block index:</span>
                            {' '}
                            <span class="dark:text-slate-100"><Link to={`/block/${this.state.transaction.block_index}`}>{this.state.transaction.block_index}</Link></span>
                        </li>
                        <li>
                            <span class="text-gray-600 dark:text-gray-400">block time:</span>
                            {' '}
                            <span class="dark:text-slate-100">{timeIsoFormat(this.state.transaction.block_time)}</span>
                        </li>

                        {/* <li>tx hash: {this.state.transaction.tx_hash} <a href={`https://mempool.space/tx/${this.state.transaction.tx_hash}`} target="_blank">{String.fromCharCode(10697)}</a></li>
                        // https://www.quora.com/Is-the-symbol-for-external-link-available-in-Unicode-If-so-how-do-I-get-in-on-my-Mac
                        <li>block index: <Link to={`/block/${this.state.transaction.block_index}`}>{this.state.transaction.block_index}</Link></li>
                        <li>block time: {timeIsoFormat(this.state.transaction.block_time)}</li> */}
                    </ul>
                    </div>
                    {transaction_cntrprty_element}
=======
                                </TableBody>
                            </Table>
                        </li>

                    </ul>

>>>>>>> develop:_legacy/src/routes/transaction.jsx
                </>
            );
        }

<<<<<<< HEAD:src/routes/transaction.jsx
        const route_element = (
            <div class="py-2 my-2">

                {header_transaction_element}

                <h2 class="font-bold text-xl mb-1 overflow-auto">
                    Transaction:
                    {' '}
                    <span class="whitespace-nowrap">
                        {this.state.tx_hash}
                    </span>
                </h2>
                {/* <h2 class="font-bold text-xl mb-1">
                    Transaction: {this.state.tx_hash}
                </h2> */}
                <div class="pt-1 mt-1 ml-4">
                {/* <div class="pt-1 mt-1"> */}
                    {/* <div class="py-1 my-1"> */}
                    {transaction_element_contents}
                </div>

            </div>
        );

        return <OneElements route_element={route_element} />;
        // return OneElements.getFullPageForRouteElement(route_element);
=======
        const transaction_element = (
            <div className={"flex flex-col w-full items-center"}>
                <div className={"flex flex-row w-full max-w-[1300px] items-center space-x-1 my-3"}>
                    <Title className={"flex flex-row w-full font-bold truncate text-xl"}>Tx {this.state.tx_hash}</Title>
                </div>
                <Card className={"flex flex-col overflow-scroll shadow-md my-3 max-w-[1300px]"}>
                    {dispenser_element}
                    {order_element}
                    {btcpay_element}
                    {broadcast_element}
                    <Title className={"overflow-hidden truncate"}>Bitcoin transaction: {this.state.tx_hash}</Title>
                    {transaction_element_contents}
                </Card>
            </div>
        );

        return OneElements.getFullPageForRouteElement(transaction_element);
>>>>>>> develop:_legacy/src/routes/transaction.jsx
    }

}

export default withRouter(Transaction);
