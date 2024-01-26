import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty } from '../api';
import { OneElements, ListElements } from './shared/elements';
// import { ListElements, OnlyElements } from './shared/elements';
import { Link } from "react-router-dom";
import {Card, List, ListItem, Table, TableBody, TableHead, Title, Text} from "@tremor/react";
import {FcNext, FcPrevious} from "react-icons/fc";

function baseState(block) {
    return {
        block,
        // block: Number(props.router.params.block),
        block_not_found: null,
        block_row: null,
        messages: null,
    };
}

class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = baseState(props.router.params.block);
    }

    async fetchData(_block) {

        let block_response = {};

        // handle blockhash redirect
        if (!Number.isInteger(Number(_block))) {
            // assume is blockhash
            try {
                const blockindex_response = await getCntrprty(`/blockhash/${_block}`);
                this.props.router.navigate(`/block/${blockindex_response.block_row.block_index}`, { replace: true });
            }
            catch (e) {
                this.setState({
                    block_not_found: true,
                });
            }
        }
        else {

            const block = Number(_block);

            this.setState(baseState(block));

            try {
                block_response = await getCntrprty(`/block/${block}`);
            }
            catch (e) {
                block_response.messages = null;
            }
            // const block_response = await getCntrprty(`/block/${block}`);

            // console.log(`rrr1`);
            // console.log(JSON.stringify(block_response));
            // console.log(`rrr2`);

            if (!block_response.messages) {
                this.setState({
                    block,
                    block_not_found: true,
                    block_row: null,
                    messages: null,
                });
            }
            else if (!block_response.messages.length) {
                this.setState({
                    block,
                    block_not_found: null,
                    block_row: block_response.block_row,
                    messages: [],
                });
            }
            else { // block_response.messages.length
                this.setState({
                    block,
                    block_not_found: null,
                    block_row: block_response.block_row,
                    messages: block_response.messages,
                });
            }

        }

    }

    async componentDidMount() {
        // not awaiting it
        this.fetchData(this.state.block);
    }

    async componentDidUpdate(prevProps) {

        // console.log(`rrrrrrrrr1`);
        // console.log(JSON.stringify(this.props));
        // console.log(this.props.router.params.block);
        // console.log(`rrrrrrrrr2`);
        // console.log(JSON.stringify(prevProps));
        // console.log(prevProps.router.params.block);
        // console.log(`rrrrrrrrr3`);

        // props.router.params.block
        const updatedProp = Number(this.props.router.params.block);
        // const updatedProp = this.props.router.params.block;
        // const updatedProp = this.props.block;
        if (updatedProp !== Number(prevProps.router.params.block)) {
            // if (updatedProp !== prevProps.router.params.block) {
            // if (updatedProp !== prevProps.block) {
            await this.fetchData(updatedProp);
        }
    }

    render() {

        let block_element_contents = (<p>loading...</p>);
        if (this.state.block_not_found) {
            block_element_contents = (
                <Text>Block not found</Text>
            );
        }
        else if (this.state.messages && !this.state.messages.length) {
            block_element_contents = (
                <>
                    <Title>Messages</Title>
                    <Text>No messages in block</Text>
                </>
            );
        }
        else if (this.state.messages && this.state.messages.length) {
            block_element_contents = (
                <>
                    <Title>Messages ({this.state.messages.length})</Title>
                    <Table>
                        <TableHead>
                            {ListElements.getTableRowMessageBlockHeader()}
                        </TableHead>
                        <TableBody>
                            {this.state.messages.map((message_row, index) => {
                                return ListElements.getTableRowMessageBlock(message_row, index);
                                // const page = 'home'; // TODO?
                                // return ListElements.getTableRowMessage(message_row, index, page);
                            })}
                        </TableBody>
                    </Table>
                </>
            );
        }

        let change_pages_element = (<p>loading...</p>);
        if (this.state.block) {
            /////
            const previous_page_column = (
                <Link to={`/block/${this.state.block - 1}`}><FcPrevious className={"text-xl"}/></Link>
            );
            const next_page_column = (
                <Link to={`/block/${this.state.block + 1}`}><FcNext className={"text-xl"}/></Link>
            );

            change_pages_element = (
                <div className={"flex flex-row space-x-1"}>
                    {previous_page_column}
                    {next_page_column}
                </div>
            );
            /////
        }

        let block_metadata = null;
        // let block_metadata = (<p>loading...</p>);
        if (this.state.block_row) {
            block_metadata = (
                <>
                    <List>
                        <ListItem className={"space-x-6"}>
                            <span>Block Index </span>
                            <span className={"truncate max-w-xs"}>{this.state.block}</span>
                        </ListItem>
                        <ListItem className={"space-x-6"}>
                            <span>Block Time </span>
                            <span className={"truncate max-w-xs"}>{(new Date(this.state.block_row.block_time * 1000).toISOString()).replace('.000Z', 'Z')}</span>
                        </ListItem>
                        <ListItem className={"space-x-6"}>
                            <span>Block Hash</span>
                            <span className={"truncate max-w-xs"}>{this.state.block_row.block_hash}</span>
                        </ListItem>
                        <ListItem className={"space-x-6"}>
                            <span>Block Previous Hash</span>
                            <span className={"truncate max-w-xs"}>{this.state.block_row.previous_block_hash}</span>
                        </ListItem>
                        <ListItem className={"space-x-6"}>
                            <span>Ledger Hash (L):</span>
                            <span className={"truncate max-w-xs"}>{this.state.block_row.ledger_hash}</span>
                        </ListItem>
                        <ListItem className={"space-x-6"}>
                            <span>Txlist Hash (TX):</span>
                            <span className={"truncate max-w-xs"}>{this.state.block_row.txlist_hash}</span>
                        </ListItem>
                        <ListItem className={"space-x-6"}>
                            <span>Messages Hash (M):</span>
                            <span className={"truncate max-w-xs"}>{this.state.block_row.messages_hash}</span>
                        </ListItem>
                    </List>

                    {/*<ul>*/}
                    {/*    <li>block_index: {this.state.block}</li>*/}
                    {/*    /!* <li>block_time: {this.state.block_row.block_time}</li> *!/*/}
                    {/*    <li>block_time_iso: {(new Date(this.state.block_row.block_time * 1000).toISOString()).replace('.000Z', 'Z')}</li>*/}
                    {/*</ul>*/}
                    {/*<ul>*/}
                    {/*    <li>block_hash: {this.state.block_row.block_hash}</li>*/}
                    {/*    <li>previous_block_hash: {this.state.block_row.previous_block_hash}</li>*/}
                    {/*</ul>*/}
                    {/*<ul>*/}
                    {/*    <li>ledger_hash (L): {this.state.block_row.ledger_hash}</li>*/}
                    {/*    <li>txlist_hash (TX): {this.state.block_row.txlist_hash}</li>*/}
                    {/*    <li>messages_hash (M): {this.state.block_row.messages_hash}</li>*/}
                    {/*    /!* <li>ledger_hash: {this.state.block_row.ledger_hash}</li>*/}
                    {/*    <li>txlist_hash: {this.state.block_row.txlist_hash}</li>*/}
                    {/*    <li>messages_hash: {this.state.block_row.messages_hash}</li> *!/*/}
                    {/*</ul>*/}
                </>
            );
        }

        const block_element = (
            <div className={"flex flex-col w-full items-center"}>
                <div className={"flex flex-row w-full max-w-[1300px] items-center space-x-1 my-3"}>
                    <Title className={"font-bold text-xl"}>Block #{this.state.block}</Title> {change_pages_element}
                </div>
                <Card className={"flex flex-col overflow-scroll shadow-md my-3 max-w-[1300px]"}>
                    {block_metadata}
                </Card>
                <Card className={"flex flex-col overflow-scroll shadow-md my-3 max-w-[1300px]"}>
                    {block_element_contents}
                </Card>
            </div>
        );

        return OneElements.getFullPageForRouteElement(block_element);
        // return (
        //     <main style={{ padding: "1rem" }}>
        //         {block_element}
        //         <p>
        //             [xcp.dev v1.0]
        //             <br />
        //             [counterparty-lib v9.59] in [Bitcoin Core v0.21]
        //         </p>
        //     </main>
        // );
    }

}

export default withRouter(Block);
