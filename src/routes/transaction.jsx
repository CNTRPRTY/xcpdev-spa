/* global BigInt */

import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty, selectTransactionMessagesFromAll } from '../api';
import { OneElements, ListElements } from './shared/elements';
import { Link } from "react-router-dom";
import { decode_data } from '../decode_tx';
import { Buffer } from 'buffer';
import { timeIsoFormat, quantityWithDivisibility, formatDivision } from '../utils';
import { Card, Divider, List, ListItem, Subtitle, Table, TableBody, TableHead, Title, Text } from "@tremor/react";

function baseState(tx_hash) {
    return {
        tx_hash,
        transaction_not_found: null,
        transaction: null,

        messages: [],
        mempool: [],

        updateable_current_state_obj: null,

        olga_length: 0,
        olga_chars_cut: 0,
    };
}

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = baseState(props.router.params.txHash);
        this.handleRange = this.handleRange.bind(this);
    }

    handleRange(event) {
        // back to chars cut
        // event.target.value ={data_url_chain.length - this.state.olga_chars_cut}
        this.setState((prevState, props) => ({
            olga_chars_cut: this.state.olga_length - event.target.value
        }));
    }

    async fetchData(tx_hash) {

        let transaction_response = {};

        // handle txindex redirect
        if (Number.isInteger(Number(tx_hash))) {
            try {
                const txindex_response = await getCntrprty(`/txindex/${tx_hash}`);
                this.props.router.navigate(`/tx/${txindex_response.transaction_row.tx_hash}`, { replace: true });
            }
            catch (e) {
                this.setState({
                    transaction: null,
                    mempool: [],
                });
            }
        }
        else {

            this.setState(baseState(tx_hash));

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


                this.setState({
                    tx_hash,
                    transaction: transaction_response.transaction,

                    cntrprty_hex,
                    cntrprty_decoded,

                    messages: transaction_response.messages,

                    updateable_current_state_obj,

                    olga_length,
                });
            }
            else { // transaction_response.mempool.length
                this.setState({
                    tx_hash,
                    mempool: transaction_response.mempool
                });
            }

        }

    }

    async componentDidMount() {
        // not awaiting it
        this.fetchData(this.state.tx_hash);
        // await this.fetchData(this.state.tx_hash);
    }

    async componentDidUpdate(prevProps) {
        const updatedProp = this.props.router.params.txHash;
        if (updatedProp !== prevProps.router.params.txHash) {
            // not awaiting it
            this.fetchData(updatedProp);
        }
    }

    render() {

        let dispenser_element = null;
        let order_element = null;

        let btcpay_element = null;

        let broadcast_element = null;

        let transaction_element_contents = (<p>loading...</p>);
        if (this.state.transaction_not_found) {
            transaction_element_contents = (
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
                );
            }


            // is updateable: dispenser
            if (
                this.state.cntrprty_decoded.id === 12 &&
                this.state.updateable_current_state_obj
            ) {

                const tip_blocks_row = this.state.updateable_current_state_obj.tip_blocks_row;
                let tell_multiple = false;
                if (this.state.updateable_current_state_obj.issuances_row.length > 1) {
                    tell_multiple = true;
                }
                const asset_issuance = this.state.updateable_current_state_obj.issuances_row[0];
                let tell_reset = false;
                if (asset_issuance.resets) {
                    tell_reset = true;
                }
                const dispensers_row = this.state.updateable_current_state_obj.dispensers_row;

                // status (integer): The state of the dispenser. 0 for open, 1 for open using open_address, 10 for closed.
                let dispenser_status;
                if (dispensers_row.status === 0) {
                    dispenser_status = 'open';
                }
                else if (dispensers_row.status === 1) {
                    dispenser_status = 'open_address';
                }
                else if (dispensers_row.status === 10) {
                    dispenser_status = 'closed';
                }

                const dispenses_rows = this.state.updateable_current_state_obj.dispenses_rows;

                dispenser_element = (
                    <>
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
                            }
                        </li>

                        <li>
                            <Divider />
                            <Title>Messages:</Title>
                            <Table>
                                <TableHead>
                                    {ListElements.getTableRowMessageTxHeader()}
                                </TableHead>
                                <TableBody>
                                    {this.state.messages.map((message_row, index) => {
                                        return ListElements.getTableRowMessageTx(message_row, index);
                                    })}
                                </TableBody>
                            </Table>
                        </li>

                    </ul>

                </>
            );
        }

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
    }

}

export default withRouter(Transaction);
