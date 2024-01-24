/* global BigInt */
// https://github.com/eslint/eslint/issues/11524#issuecomment-473790677

import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty } from '../api';
import { OneElements, ListElements } from './shared/elements';
import { Link } from 'react-router-dom';
import { timeIsoFormat, quantityWithDivisibility } from '../utils';
import {Title, Text, Subtitle, TableHead, TableBody, Table, Card, Bold, List, ListItem, Divider} from "@tremor/react";

class Asset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asset_name: props.router.params.assetName,
            asset_btc_xcp: false,
            asset_not_found: null,
            asset_row: null,

            tip_blocks_row: null,

            issuances: [],
            destructions: [],

            subassets: [],

            balances: [], // "holders"
            // vs. escrows
            orders: [],
            dispensers: [],

            orders_get: [], // orders this asset can be exchanged for

            // tables: null,
        };
    }

    async fetchData(asset_name) {

        let asset_response = {};

        // handle subasset redirect
        if (asset_name.includes('.')) {
            try {
                const subasset_response = await getCntrprty(`/subasset/${asset_name}`);
                this.props.router.navigate(`/asset/${subasset_response.asset_row.asset_name}`, { replace: true });
            }
            catch (e) {
                this.setState({
                    asset_not_found: true,
                });
            }
        }
        else {

            try {
                asset_response = await getCntrprty(`/asset/${asset_name}`);
            }
            catch (e) {
                asset_response.asset_row = null;
            }

            if (!asset_response.asset_row) {
                this.setState({
                    asset_not_found: true,
                });
            }
            else if (['BTC', 'XCP'].includes(asset_name)) {

                // for now...
                this.setState({
                    // asset_name,
                    asset_btc_xcp: true,
                    // asset_not_found: null,
                    asset_row: asset_response.asset_row,
                    // issuances: asset_response.tables.issuances,
                    // destructions: asset_response.tables.destructions,
                    // dispenses: asset_response.tables.dispenses,
                });
                    
                // vs escrows (orders and dispensers)
                const escrows_response = await getCntrprty(`/asset/${asset_name}/escrows`);
                this.setState({
                    orders: escrows_response.tables.orders,
                    dispensers: escrows_response.tables.dispensers,
                });

                // order exchanges (other side of escrow)
                const exchanges_response = await getCntrprty(`/asset/${asset_name}/exchanges`);
                this.setState({
                    orders_get: exchanges_response.tables.orders_get,
                });

            }
            else {

                // first add duplicate data handling flags
                let last_description = asset_response.tables.issuances[0].description;
                for (let i = 0; i < asset_response.tables.issuances.length; i++) {
                    const issuance = asset_response.tables.issuances[i];

                    issuance.display_source = false; // only display for the first (is a genesis transfer)                    
                    if (i === 0) { // TODO should be FIRST VALID...
                        if (issuance.source !== issuance.issuer) issuance.display_source = true;
                    }

                    issuance.display_lock_with_description = true; // (ONLY USE IF LOCKED) only display if is first or different
                    if (i) {
                        if (issuance.description === last_description) issuance.display_lock_with_description = false;
                    }

                    last_description = issuance.description;
                }

                this.setState({
                    asset_name,
                    asset_btc_xcp: false,
                    asset_not_found: null,
                    asset_row: asset_response.asset_row,
                    tip_blocks_row: asset_response.tip_blocks_row,
                    issuances: asset_response.tables.issuances,
                    destructions: asset_response.tables.destructions,
                });

                // check subassets
                const subassets_response = await getCntrprty(`/asset/${asset_name}/subassets`);

                this.setState({
                    subassets: subassets_response.assets,
                });

                // get holders (could be 0)
                const balances_response = await getCntrprty(`/asset/${asset_name}/balances`);
                this.setState({
                    balances: balances_response.balances,
                });

                // vs escrows (orders and dispensers)
                const escrows_response = await getCntrprty(`/asset/${asset_name}/escrows`);
                this.setState({
                    orders: escrows_response.tables.orders,
                    dispensers: escrows_response.tables.dispensers,
                });

                // order exchanges (other side of escrow)
                const exchanges_response = await getCntrprty(`/asset/${asset_name}/exchanges`);
                this.setState({
                    orders_get: exchanges_response.tables.orders_get,
                });

            }

        }

    }

    async componentDidMount() {
        // not awaiting it
        this.fetchData(this.state.asset_name);
    }

    async componentDidUpdate(prevProps) {
        const updatedProp = this.props.router.params.assetName;
        if (updatedProp !== prevProps.router.params.assetName) {
            // not awaiting it
            this.fetchData(updatedProp);
        }
    }

    render() {

        // let asset_metadata = null;
        let asset_metadata = (<p>loading...</p>);
        if (this.state.asset_not_found) {
            // if (!this.state.asset_row) {
            asset_metadata = (
                <Text>Asset not found... or it is misspelled (is case sensitive)... or genesis issuance is still in the mempool...</Text>
                // <p>asset not found (or genesis issuance is still in the mempool...)</p>
                // <p>asset not found (or is still in the mempool...)</p>
                // <p>asset not found (maybe is still in the mempool...)</p>
                // <p>asset not found</p>
            );
        }
        else if (this.state.asset_btc_xcp) {

            let markets_element = null;

            let protocol_base = '';

            if (this.state.asset_name === 'BTC') {
                protocol_base = 'Base protocol';

                const asset_page = true;

                const asset_metadata = {
                    asset: 'BTC',
                    divisible: true,
                };

                markets_element = (
                    <>
                        <Title>Market:</Title>
    
                        {/* <h4>Open dispensers:</h4>
                        {ListElements.getTableRowDispensersHeader(asset_metadata)}
                        {this.state.dispensers.map((dispensers_row, index) => {
                            return ListElements.getTableRowDispensers(dispensers_row, index, asset_metadata.divisible, asset_page);
                        })} */}
    
                        <Title>Open exchange orders:</Title>
    
                        <Title>Asset in escrow:</Title>
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowOrdersHeader(asset_metadata)}
                            </TableHead>
                            <TableBody>
                            {this.state.orders.map((orders_row, index) => {
                                return ListElements.getTableRowOrders(orders_row, index, asset_metadata.divisible, asset_page);
                            })}
                            </TableBody>
                        </Table>

                        <Title>Asset requested:</Title>
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowOrdersHeader_get(asset_metadata)}
                            </TableHead>
                            <TableBody>
                                {this.state.orders_get.map((orders_row, index) => {
                                    return ListElements.getTableRowOrders_get(orders_row, index, asset_metadata.divisible);
                                })}
                            </TableBody>
                        </Table>
                    </>
                );

            }
            else if (this.state.asset_name === 'XCP') {
                protocol_base = 'Protocol';

                const asset_page = true;

                const asset_metadata = {
                    asset: 'XCP',
                    divisible: true,
                };

                markets_element = (
                    <>
                        <Title>Market:</Title>
    
                        <Text>Open dispensers:</Text>
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowDispensersHeader(asset_metadata)}
                            </TableHead>
                            <TableBody>
                                {this.state.dispensers.map((dispensers_row, index) => {
                                    return ListElements.getTableRowDispensers(dispensers_row, index, asset_metadata.divisible, asset_page);
                                })}
                            </TableBody>
                        </Table>
    
                        <Title>Open exchange orders:</Title>
    
                        <Title>Asset in escrow:</Title>
                        {ListElements.getTableRowOrdersHeader(asset_metadata)}
                        {this.state.orders.map((orders_row, index) => {
                            return ListElements.getTableRowOrders(orders_row, index, asset_metadata.divisible, asset_page);
                        })}
    
                        <Title>Asset requested:</Title>
                        {ListElements.getTableRowOrdersHeader_get(asset_metadata)}
                        {this.state.orders_get.map((orders_row, index) => {
                            return ListElements.getTableRowOrders_get(orders_row, index, asset_metadata.divisible);
                        })}
                    </>
                );

            }

            asset_metadata = (
                <>
                    <h3>{protocol_base} asset: {this.state.asset_name}</h3>
                    {/* <h3>Protocol asset: {this.state.asset_name}</h3> */}
                    <ul>
                        <li>Asset Id: {this.state.asset_row.asset_id}</li>
                        <li>divisible: true (satoshi)</li>
                    </ul>
                    {markets_element}
                </>
            );
        }
        else if (this.state.asset_row) {
            // else {

            const all_issuance_events = [
                ...this.state.issuances.map((obj) => {
                    obj.issuance_event_type = 'issuance';
                    // obj.issuance_event_type = 'issuances';
                    return obj;
                }),
                ...this.state.destructions.map((obj) => {
                    obj.issuance_event_type = 'destroy';
                    // obj.issuance_event_type = 'destructions';
                    return obj;
                })
            ];
            all_issuance_events.sort((a, b) => a.block_index - b.block_index);

            const genesis_issuance = all_issuance_events.find((obj) => obj.status === 'valid');
            const lock_issuance = all_issuance_events.find((obj) => (obj.status === 'valid' && obj.locked));

            // // TODO may be rethought... because at the moment it makes an array copy just for this
            // const last_description = [...all_issuance_events].reverse().find((obj) => (obj.status === 'valid' && obj.description !== ''));

            // console.log(`wwww1`);
            // console.log(genesis_issuance);
            // console.log(`wwww2`);
            // console.log(genesis_issuance.divisible);
            // console.log(`wwww3`);

            let total_integer = BigInt(0);
            // let total_integer = 0;
            for (const issuance_event of all_issuance_events) {
                if (issuance_event.status === 'valid') {
                    if (issuance_event.issuance_event_type === 'issuance') {
                        total_integer += BigInt(issuance_event.quantity_text);
                        // total_integer += BigInt(issuance_event.quantity);
                        // total_integer += issuance_event.quantity;
                    }
                    else { // issuance_event.issuance_event_type === 'destroy'
                        total_integer -= BigInt(issuance_event.quantity_text);
                        // total_integer -= BigInt(issuance_event.quantity);
                        // total_integer -= issuance_event.quantity;
                    }
                }
            }

            const quantity_with_divisibility = quantityWithDivisibility(genesis_issuance.divisible, total_integer);
            // const quantity_with_divisibility = genesis_issuance.divisible ? (total_integer / (10 ** 8)).toFixed(8) : total_integer;

            const issuance_events_message = this.state.destructions.length ?
                `All issuance (and destroy) transactions:` :
                `All issuance transactions:`;
                // `All issuance (and destroy) events:` :
                // `All issuance events:`;


            // CIP3 dumb!
            const reset_issuance = this.state.issuances.find((obj) => (obj.status === 'valid' && obj.reset === 1));



            // detect superasset if is asset_longname
            let superasset = null;
            if (this.state.asset_row.asset_longname) {
                const split = this.state.asset_row.asset_longname.split('.');
                superasset = split[0];
            }


            // show subassets if applies
            let subassets_element = null;
            if (this.state.subassets.length) {
                subassets_element = (
                    <>
                        <Title>Subassets:</Title>
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowSubassetsHeader()}
                            </TableHead>
                            <TableBody>
                                {this.state.subassets.map((assets_row, index) => {
                                    return ListElements.getTableRowSubassets(assets_row, index);
                                })}
                            </TableBody>
                        </Table>
                        <Divider />
                    </>
                );
            }


            ///////////
            // balances + escrows(orders, dispensers) = total_integer(issuances - destructions)
            let verify_total_integer = BigInt(0);
            // let verify_total_integer = 0;

            let verify_total_integer_balances = BigInt(0);
            // let verify_total_integer_balances = 0;
            for (const balances_row of this.state.balances) {
                verify_total_integer_balances += BigInt(balances_row.quantity_text);
                // verify_total_integer_balances += BigInt(balances_row.quantity);
                // verify_total_integer_balances += balances_row.quantity;
            }

            let verify_total_integer_orders = BigInt(0);
            // let verify_total_integer_orders = 0;
            for (const orders_row of this.state.orders) {
                verify_total_integer_orders += BigInt(orders_row.give_remaining_text);
                // verify_total_integer_orders += BigInt(orders_row.give_remaining);
                // verify_total_integer_orders += orders_row.give_remaining;
            }

            let verify_total_integer_dispensers = BigInt(0);
            // let verify_total_integer_dispensers = 0;
            for (const dispensers_row of this.state.dispensers) {
                verify_total_integer_dispensers += BigInt(dispensers_row.give_remaining_text);
                // verify_total_integer_dispensers += BigInt(dispensers_row.give_remaining);
                // verify_total_integer_dispensers += dispensers_row.give_remaining;
            }

            verify_total_integer = verify_total_integer_balances + verify_total_integer_orders + verify_total_integer_dispensers;

            const verify_quantity_with_divisibility = quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer);
            ///////////

            let issuances_summary_element = (
                <>
                    {/* <ul>
                        <li>
                            For [m]edia visit bitSTART:{' '}
                            <a href={`https://bitst.art/${this.state.asset_row.asset_name}`} target="_blank">/{this.state.asset_row.asset_name}</a>
                        </li>
                    </ul> */}

                    {/* <p>As of block {this.state.tip_blocks_row.block_index} ({timeIsoFormat(this.state.tip_blocks_row.block_time)})</p> */}

                    <ul>
                        <li><Subtitle>Issuance events: {this.state.issuances.length} issuances, {this.state.destructions.length} destructions</Subtitle></li>
                    </ul>

                    <ul>
                        <li><Subtitle>Locked supply: {lock_issuance ? 'true' : 'false'}</Subtitle></li>
                        {/* <li>events ({this.state.issuances.length} issuances + {this.state.destructions.length} destructions): {all_issuance_events.length}</li> */}
                        {/* <li>events: {all_issuance_events.length}</li> */}
                        {/* <li>locked supply: {lock_issuance ? 'true' : 'false'}</li> */}
                        
                        {reset_issuance ?
                            (<>{<li>v9.60 RESET ASSET</li>}</>)
                            :
                            (
                                <>
                                    <li><Subtitle>Current supply: <Bold>{quantity_with_divisibility}</Bold></Subtitle></li>
                                    <List className={"max-w-xs"}>
                                        <ListItem>
                                            <span>In Balances</span>
                                            <span>{quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_balances)}</span>
                                        </ListItem>
                                        <ListItem>
                                            <span>In Open orders</span>
                                            <span>{quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_orders)}</span>
                                        </ListItem>
                                        <ListItem>
                                            <span>In Open dispensers</span>
                                            <span>{quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_dispensers)}</span>
                                        </ListItem>
                                        <ListItem>
                                            <span>Total</span>
                                            <span>{verify_quantity_with_divisibility}</span>
                                        </ListItem>
                                    </List>
                                </>
                            )
                        }

                        {/* <li>current supply: <strong>{quantity_with_divisibility}</strong></li>
                        <li>
                            verify (
                            {quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_balances)} in balances +
                            {' '}
                            {quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_orders)} in open orders +
                            {' '}
                            {quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_dispensers)} in open dispensers):
                            {' '}
                            {verify_quantity_with_divisibility}
                        </li> */}
                        {/* <li>
                            balances ({quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_balances)}) +
                            open orders ({quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_orders)}) +
                            open dispensers ({quantityWithDivisibility(genesis_issuance.divisible, verify_total_integer_dispensers)}):
                            {' '}
                            {verify_quantity_with_divisibility}
                        </li> */}
                        {/* <li>current supply: {quantity_with_divisibility}</li> */}
                    </ul>
                    {/* <ul>
                        <li>balances + open orders + open dispensers (must match the current supply): <strong>{verify_quantity_with_divisibility}</strong></li>
                        // <li>verify (balances + open orders + open dispensers): <strong>{verify_quantity_with_divisibility}</strong></li>
                    </ul> */}
                </>
            );
            // if (reset_issuance) {
            //     issuances_summary_element = (
            //         <ul>
            //             <li>v9.60 RESET ASSET</li>
            //         </ul>
            //     );
            // }


            // show balances (holders) if applies (could be 0!)
            // let balances_element = null;
            // if (this.state.balances.length) {
            //     function balancesSortAddress(a, b) {
            //         if (b.quantity === a.quantity) {
            //             if (a.address < b.address) {
            //                 return -1;
            //             }
            //             if (a.address > b.address) {
            //                 return 1;
            //             }
            //             return 0;
            //         }
            //         else {
            //             return b.quantity - a.quantity;
            //         }
            //     }
            //     const asset_page = true;
            //     balances_element = (
            //         <>
            //             <h3>Balances (asset holders):</h3>
            //             <ul>
            //                 <li>verify current supply: {verify_quantity_with_divisibility}</li>
            //             </ul>
            //             {ListElements.getTableRowBalanceAddressHeader(asset_page)}
            //             {this.state.balances.sort(balancesSortAddress).map((balances_row, index) => {
            //                 return ListElements.getTableRowBalanceAddress(balances_row, index, asset_page);
            //             })}
            //         </>
            //     );
            // }


            let balances_element = null;
            let markets_element = null;
            // let balances_escrows_element = null;

            if (this.state.balances.length && !reset_issuance) { // not dealing with reset assets (at least for now...)
                // if (this.state.balances.length) {
                function balancesSortAddress(a, b) {
                    if (BigInt(b.quantity_text) === BigInt(a.quantity_text)) {
                        // if (b.quantity === a.quantity) {
                        if (a.address < b.address) {
                            return -1;
                        }
                        if (a.address > b.address) {
                            return 1;
                        }
                        return 0;
                    }
                    else {
                        // keeping quantity here as it needs to return a Number and is not critical (is only about sorting)
                        // return BigInt(b.quantity_text) - BigInt(a.quantity_text);
                        return b.quantity - a.quantity;
                    }
                }
                const asset_page = true;

                balances_element = (
                    <>
                        {/* <h3>Balances and escrows (must match the current supply):</h3> */}
                        {/* <h3>Escrows:</h3> */}

                        {/* <ul>
                            <li>verify (balances + open orders + open dispensers): <strong>{verify_quantity_with_divisibility}</strong></li>
                            // <li>verify (balances + open orders + open dispensers): {verify_quantity_with_divisibility}</li>
                            // <li>verify (current_supply = balances + orders + dispensers): {verify_quantity_with_divisibility}</li>
                            // <li>verify current supply: {verify_quantity_with_divisibility}</li>
                        </ul> */}

                        <Title>Balances (asset holders):</Title>
                        {/* <h4>Balances (asset holders):</h4> */}
                        {/* show balances (holders) if applies (could be 0! */}
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowBalanceAddressHeader(asset_page)}
                            </TableHead>
                            <TableBody>
                                {this.state.balances.sort(balancesSortAddress).map((balances_row, index) => {
                                    return ListElements.getTableRowBalanceAddress(balances_row, index, asset_page);
                                })}
                            </TableBody>
                        </Table>
                    </>
                );

                markets_element = (
                    <>
                        <Title className={"text-2xl mb-6 text-yellow-600 dark:text-yellow-600"}>Market</Title>

                        <Title>Open dispensers:</Title>
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowDispensersHeader(genesis_issuance)}
                            </TableHead>
                            {/* {ListElements.getTableRowDispensersHeader(genesis_issuance.divisible, asset_page)} */}
                            <TableBody>
                                {this.state.dispensers.map((dispensers_row, index) => {
                                    return ListElements.getTableRowDispensers(dispensers_row, index, genesis_issuance.divisible, asset_page);
                                })}
                            </TableBody>
                        </Table>

                        <Divider />

                        <Title>Open exchange orders:</Title>

                        <Title>Asset in escrow:</Title>
                        {/* <h4>Open orders:</h4> */}
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowOrdersHeader(genesis_issuance)}
                                {/* {ListElements.getTableRowOrdersHeader(genesis_issuance.divisible, asset_page)} */}
                            </TableHead>
                            <TableBody>
                                {this.state.orders.map((orders_row, index) => {
                                    return ListElements.getTableRowOrders(orders_row, index, genesis_issuance.divisible, asset_page);
                                })}
                            </TableBody>
                        </Table>

                        <Title>Asset requested:</Title>
                        {ListElements.getTableRowOrdersHeader_get(genesis_issuance)}
                        {this.state.orders_get.map((orders_row, index) => {
                            return ListElements.getTableRowOrders_get(orders_row, index, genesis_issuance.divisible);
                        })}
                    </>
                );
            }


            asset_metadata = (
                <>
                    <Card>
                        <ul>
                            <li><Title className={"mb-3"}>Genesis:</Title>

                                {/* <h3>Genesis:</h3> */}
                                {/* <h3>Genesis issuance:</h3> */}

                                {this.state.asset_row.asset_longname ?
                                    (
                                        <ul>
                                            <li><Subtitle>superasset: <Link to={`/asset/${superasset}`}>{superasset}</Link></Subtitle>
                                            </li>
                                        </ul>
                                    )
                                    : (null)
                                }

                                <ul>
                                    {this.state.asset_row.asset_longname ?
                                        (<li><Subtitle>asset longname: {this.state.asset_row.asset_longname}</Subtitle>
                                        </li>)
                                        : (null)
                                    }
                                    <li><Subtitle>Asset name: {this.state.asset_row.asset_name}</Subtitle></li>
                                    <li><Subtitle>Asset Id: {this.state.asset_row.asset_id}</Subtitle></li>
                                </ul>
                                <ul>
                                    {/* <li>block_index: <Link to={`/block/${this.state.asset_row.block_index}`}>{this.state.asset_row.block_index}</Link></li> */}
                                    <li><Subtitle>Block: <Link
                                        to={`/block/${this.state.asset_row.block_index}`}>{this.state.asset_row.block_index}</Link></Subtitle>
                                    </li>
                                    <li><Subtitle>Block time: {timeIsoFormat(genesis_issuance.block_time)}</Subtitle></li>
                                </ul>
                                <ul>
                                    {/* <li>satoshi divisibility: {genesis_issuance.divisible ? 'true' : 'false'}</li> */}
                                    <li>
                                        <Subtitle>Divisible: {genesis_issuance.divisible ? 'true (satoshi)' : 'false'}</Subtitle>
                                    </li>
                                    {/* <li>divisible: {genesis_issuance.divisible ? 'true' : 'false'}</li> */}
                                </ul>

                            </li>
                        </ul>

                        <ul>
                            <li>
                                <Title>For <strong>[m]</strong>edia visit <Bold>bitSTART</Bold>
                                    <a href={`https://bitst.art/${this.state.asset_row.asset_name}`}
                                       target="_blank">/{this.state.asset_row.asset_name}</a>
                                </Title>
                            </li>
                        </ul>
                    </Card>

                    <Card>
                        <ul>
                            <li><Title>Issuances state:</Title><Subtitle>As of
                                Block {this.state.tip_blocks_row.block_index} ({timeIsoFormat(this.state.tip_blocks_row.block_time)})</Subtitle>
                                {/* <li><strong>Issuances state:</strong> */}
                                {/* <li><strong>Issuances status:</strong> */}
                                {/* <br /> */}
                                {issuances_summary_element}
                            </li>
                        </ul>
                    </Card>

                    {/* <h3>Issuance status:</h3>
                    {issuances_summary_element} */}

                    {subassets_element}

                    {/* <h3>{issuance_events_message}</h3> */}
                    {/* <h3>All issuance (and destroy) events:</h3> */}
                    {/* <h3>All issuance / destroy events:</h3> */}

                    {/* {issuances_summary_element} */}

                    {/* <ul>
                        <li>locked supply: {lock_issuance ? 'true' : 'false'}</li>
                        <li>current supply: {quantity_with_divisibility}</li>
                        // <li>most recent description: {last_description.description}</li>
                        // <li>current supply: {quantity_with_divisibility}{lock_issuance ? '' : ' (unlocked)'}</li>
                        // <li>supply: {quantity_with_divisibility}{lock_issuance ? '' : ' (unlocked)'}</li>
                    </ul> */}

                    <Card>
                        {markets_element}
                    </Card>

                    <Card>
                        <Title>{issuance_events_message}</Title>
                        {/* <h3>Issuance events</h3> */}
                        <Table>
                            <TableHead>
                                {ListElements.getTableRowIssuanceEventsAssetHeader()}
                            </TableHead>
                            <TableBody>
                                {all_issuance_events.map((issuance_event_row, index) => {

                                    // console.log(`bbb1`);
                                    // console.log(JSON.stringify(issuance_event_row));
                                    // console.log(`bbb2`);

                                    if (issuance_event_row.issuance_event_type === 'issuance') {
                                        return ListElements.getTableRowIssuanceEventsIssuanceAsset(issuance_event_row, index, genesis_issuance.divisible);
                                    } else { // issuance_event_row.issuance_event_type === 'destroy'
                                        return ListElements.getTableRowIssuanceEventsDestroyAsset(issuance_event_row, index, genesis_issuance.divisible);
                                    }

                                    // return ListElements.getTableRowIssuanceEventsAsset(issuance_event_row, index, genesis_issuance.divisible);
                                    // // return ListElements.getTableRowIssuanceEventsAsset(issuance_event_row, index);
                                    // // const page = 'home'; // TODO?
                                    // // return ListElements.getTableRowMessage(message_row, index, page);
                                })}
                            </TableBody>
                        </Table>
                    </Card>

                    <Card>
                        {balances_element}
                    </Card>
                    {/* {balances_escrows_element} */}

                </>
            );

        }

        const asset_element = (
            <div className={"flex flex-col w-full items-center"}>
                <div className={"flex flex-col w-full max-w-[1300px] my-3 space-y-3"}>
                    <Title>Asset: {this.state.asset_name}</Title>
                </div>
                <div className={"flex flex-col w-full max-w-[1300px] space-y-3"}>
                    {asset_metadata}
                </div>
            </div>
        );

        return OneElements.getFullPageForRouteElement(asset_element);

    }

}

export default withRouter(Asset);
