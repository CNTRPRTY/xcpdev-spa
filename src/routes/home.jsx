import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty } from '../api';
import { OneElements, ListElements } from './shared/elements';
import { Link } from "react-router-dom";
import { timeIsoFormat, timeSince, hashSlice } from '../utils';

import { decode_data } from '../decode_tx';
import { Buffer } from 'buffer';
import {
    Button,
    Text,
    Card,
    TextInput,
    Title,
    Table,
    TableHead,
    TableBody, TableFoot, TableFooterCell, Subtitle, TableRow
} from "@tremor/react";

import Search from './shared/search';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            ////
            blocks: null,
            ////
            mempool_empty: null,
            // mempool_full: [],
            mempool_full_new: [],
            get_running_info: null,
            //
            btc_transactions_latest: null,
        };
    }

    async fetchDataBlocks() {
        // TODO cache instead of repeating the call?
        const block_response = await getCntrprty('/blocks');
        this.setState({
            blocks: block_response.blocks,
        });
    }

    async fetchDataMempool() {
        const mempool_response = await getCntrprty('/mempool');

        const mempool_full_new = mempool_response.mempool;
        // const mempool_full = mempool_response.mempool;

        let mempool_empty = false;
        if (mempool_full_new.length === 0) {
            // if (mempool_full.length === 0) {
            mempool_empty = true;
        }

        this.setState({
            mempool_empty,
            // mempool_full,
            mempool_full_new, // still wip
            // get_running_info: mempool_response.get_running_info, // not used
        });
    }

    async fetchDataLatest() {
        const latest_response = await getCntrprty(`/transactions`);
        this.setState({
            btc_transactions_latest: latest_response.btc_transactions_latest,
        });
    }

    async componentDidMount() {
        // not awaiting it
        this.fetchDataBlocks();
        this.fetchDataMempool();
        this.fetchDataLatest();
    }

    render() {


        //////////
        let block_element_contents = (<p>loading...</p>);

        if (this.state.blocks && this.state.blocks.length) {
            block_element_contents = (
                <>
                    <table>
                        <tbody>
                            <tr style={{ padding: "0.25rem" }}>
                                {this.state.blocks.map((block_row, index) => {
                                    return (
                                        <td key={index} style={{ padding: "0 1rem 0 0" }}>
                                            <Card className={"flex flex-col items-start justify-start"}>
                                                <Link className={"text-yellow-600 "}
                                                      to={`/block/${block_row.block_index}`}>{block_row.block_index}</Link>

                                                {/* {timeIsoFormat(block_row.block_time)}
                                                {' '} */}
                                                <Subtitle
                                                    className={"text-sm"}>{timeSince(new Date(block_row.block_time * 1000))}</Subtitle>

                                                <div className={"flex flex-row my-3 justify-between items-center"}>
                                                    <Text className={"font-bold mr-1"}>{block_row.messages_count}</Text>
                                                    <Subtitle>{block_row.messages_count === 1 ? 'message' : 'messages'}</Subtitle>
                                                </div>
                                                {/* // https://github.com/CounterpartyXCP/counterparty-lib/blob/master/counterpartylib/lib/blocks.py#L1078 */}
                                                {/* // https://github.com/CounterpartyXCP/counterparty-lib/blob/master/counterpartylib/lib/blocks.py#L1448 */}
                                                <div className={"flex flex-row w-full justify-between items-center"}>
                                                    <Text className={"font-bold mr-1"}>L:</Text>
                                                    <Subtitle>{hashSlice(block_row.ledger_hash)}</Subtitle>
                                                </div>
                                                <div className={"flex flex-row w-full justify-between items-center"}>
                                                    <Text className={"font-bold mr-1"}>TX:</Text>
                                                    <Subtitle>{hashSlice(block_row.txlist_hash)}</Subtitle>
                                                </div>
                                                <div className={"flex flex-row w-full justify-between items-center"}>
                                                    <Text className={"font-bold mr-1"}>M:</Text>
                                                    <Subtitle>{hashSlice(block_row.messages_hash)}</Subtitle>
                                                </div>
                                                    {/* ledger_hash:{hashSlice(block_row.ledger_hash)}<br />
                                                txlist_hash:{hashSlice(block_row.txlist_hash)}<br />
                                                messages_hash:{hashSlice(block_row.messages_hash)}<br /> */}
                                            </Card>
                                        </td>
                                        // <td key={index} style={{ padding: "0 1rem 0 0" }}>{JSON.stringify(block_row)}</td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </>
            );
        }
        const block_element = (
            <div className={"mt-12"}>
                <Title className={"font-bold text-xl mb-3"}>Latest blocks</Title>
                <div className={"overflow-scroll p-0.5"}>
                    {block_element_contents}
                </div>
            </div>
        );
        //////////


        let mempool_element_contents = (<p>loading...</p>);
        if (this.state.mempool_empty) {
            mempool_element_contents = (
                <Card className={"flex w-full items-center"}>
                    <Text className={"flex w-full justify-center"}>Try refreshing the page in a couple of minutes...</Text>
                </Card>
                // <p>Try refreshing the page in a couple of minutes... (<a href={`https://github.com/CounterpartyXCP/counterparty-lib/issues/1227`} target="_blank">why?</a>)</p>
            );
        }
        else if (this.state.mempool_full_new.length) {
            mempool_element_contents = (
                <Card className={"flex flex-col"}>
                    <Title className={"font-bold text-xl"}>Unconfirmed transactions</Title>
                    <Table className="mt-5">
                        <TableHead>
                            {ListElements.getTableRowMempoolHomeHeader()}
                        </TableHead>
                        <TableBody>
                            {this.state.mempool_full_new.map((mempool_row, index) => {

                                // cntrprty transaction
                                let cntrprty_decoded = {};
                                const cntrprty_hex = Buffer.from(mempool_row.data, 'hex').toString('hex');
                                try {
                                    const current_version_past_block = 819000;
                                    cntrprty_decoded = decode_data(cntrprty_hex, current_version_past_block);
                                } catch (e) {
                                    console.error(`cntrprty_decoded error: ${e}`);
                                }

                                mempool_row.cntrprty_decoded = cntrprty_decoded;
                                return ListElements.getTableRowMempoolHome(mempool_row, index);
                            })}
                            {/*</tbody>*/}
                            {/*</table>*/}
                        </TableBody>
                    </Table>
                </Card>
            );
        }
        // else if (this.state.mempool_full.length) {
        //     mempool_element_contents = (
        //         <table>
        //             <tbody>
        //                 {ListElements.getTableRowMempoolHomeHeader()}
        //                 {this.state.mempool_full.map((mempool_row, index) => {
        //                     // {this.state.mempool_grouped.map((mempool_row, index) => {
        //                     return ListElements.getTableRowMempoolHome(mempool_row, index);
        //                     // return ListElements.getTableRowMempool(mempool_row, index);
        //                 })}
        //             </tbody>
        //         </table>
        //     );
        // }
        const mempool_element = (
            <>
                {/* <h2>Unconfirmed (mempool) transactions:</h2> */}
                {/*<h2 className={"font-bold"}>Unconfirmed transactions:</h2>*/}
                {/* <h2>Mempool transactions:</h2> */}
                {/* <h2>Mempool:</h2> */}
                {mempool_element_contents}
            </>
        );

        let transactions_element_contents = (<p>loading...</p>);
        if (this.state.btc_transactions_latest && this.state.btc_transactions_latest.length) {
            const is_home_page = true;

            const link_tx_index = this.state.btc_transactions_latest[0].tx_index - 99;
            // const link_tx_index = this.state.btc_transactions_latest[0].tx_index - 999;

            transactions_element_contents = (
                <>
                    {/* <h4>Latest:</h4> */}
                    {/*<h4>Latest (tx_index desc):</h4>*/}
                    {/* <h4>Latest (most recent top):</h4> */}
                    <Card className={"flex flex-col"}>
                        <Title className={"font-bold text-xl"}>Block transactions</Title>
                        {/*<Subtitle>Latest (tx_index desc)</Subtitle>*/}
                        <Table className="mt-5">
                            <TableHead>
                                {ListElements.getTableRowTransactionHeader(is_home_page)}
                            </TableHead>
                            <TableBody>
                                {this.state.btc_transactions_latest.map((transaction_row, index) => {
                                    return ListElements.getTableRowTransaction(transaction_row, index, is_home_page);
                                })}
                            </TableBody>
                            <TableFoot>
                                <TableRow>
                                    <TableFooterCell>
                                        <Link className={"font-bold hover:text-yellow-500"} to={`/transactions#${link_tx_index}`}>All transactions</Link>
                                    </TableFooterCell>
                                </TableRow>
                            </TableFoot>
                        </Table>
                    </Card>

                    {/*<h4><Link to={`/transactions#${link_tx_index}`}>All transactions</Link></h4>*/}
                    {/* <h4><Link to={`/transactions`}>All transactions</Link></h4> */}
                </>
            );
        }
        const transactions_element = (
            <>
                {/*<h2>Block transactions:</h2>*/}
                {/* <h2>Transactions:</h2> */}
                {transactions_element_contents}
            </>
        );

        const homenew_element = (
            <div className={"w-full max-w-[1300px]"}>
                <Search />
                {block_element}
                <div className={"flex w-full gap-4 flex-col lg:flex-row items-start justify-between mt-6"}>
                    <div className={"flex w-full min-h-[200px] lg:min-h-[500px] max-h-[500px] overflow-auto p-[1px] rounded-lg shadow-xl"}>
                        {mempool_element}
                    </div>
                    <div className={"flex w-full min-h-[200px] lg:min-h-[500px] max-h-[500px] overflow-auto p-[1px] rounded-lg shadow-xl"}>
                        {transactions_element}
                    </div>
                </div>
            </div>
        );

        return OneElements.getFullPageForRouteElement(homenew_element);
    }

}

export default withRouter(Home);
