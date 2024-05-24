import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty, COUNTERPARTY_VERSION } from "../api";
// import { getCntrprty } from "../api";
import { Link } from "react-router-dom";
import { OneElements, ListElements } from './shared/elements';
import {Card, Title, Text, Subtitle, TableHead, TableBody, Table, Badge, Divider} from "@tremor/react";
import {FaArrowRight} from "react-icons/fa";

class Messagespage extends React.Component {
    // class Transactionspage extends React.Component {
    constructor(props) {
        super(props);

        let index_if_specified = undefined;
        if (props.router.location.hash.length) {
            const index_string = props.router.location.hash.replace('#', '');
            if (Number.isInteger(Number(index_string))) {
                index_if_specified = Number(index_string);
            }
        }

        if (!index_if_specified) {
            index_if_specified = 0;
        }

        this.state = {
            page_not_found: null,

            from_index: index_if_specified,
            to_index: null,
            rows: [],
        };
    }

    async fetchData(from_index) {
        const response = await getCntrprty(`/messages/${from_index}`);
        // const response = await getCntrprty(`/transactions/${from_index}`);

        if (!response) {
            this.setState({ page_not_found: true });
        }
        else {
            this.setState({
                from_index: response.from_index,
                to_index: response.to_index,
                rows: response.messages,
                // rows: response.transactions,
            });
        }

    }

    async componentDidMount() {
        await this.fetchData(this.state.from_index);
    }

    async componentDidUpdate(prevProps) {
        const updatedHash = this.props.router.location.hash;
        const prevHash = prevProps.router.location.hash;
        if (updatedHash !== prevHash) {
            const from_index = updatedHash.replace('#', '');
            await this.fetchData(Number(from_index));
        }

    }

    render() {

        let content_element = (<p>loading...</p>);
        if (this.state.page_not_found) {
            return (
                <main style={{ padding: "1rem" }}>
                    <Text>No results found</Text>
                </main>
            );
        }
        // Doing this manually helps in verification...
        let years;
        if (COUNTERPARTY_VERSION.startsWith('9.59')) {
            years = {
                y2014: 0,
                y2015: 505211,
                y2016: 1350000,
                y2017: 2582382,
                y2018: 4186987,
                y2019: 5228022,
                y2020: 5558510,
                y2021: 5855416,
                y2022: 7055629,
                y2023: 8460931,
            };
        }
        else { // 9.60
            years = {
                y2014: 0,
                y2015: 505211,
                y2016: 1350000,
                y2017: 2582382,
                y2018: 4186987,
                y2019: 5228022,
                y2020: 5558173, // update was in 2022...
                y2021: 5850483,
                y2022: 7070644,
                y2023: 8820356,
            };
        }
        const jump_year_element = (
            <div className={"flex flex-wrap mb-3"}>
                <Subtitle className={"mr-2"}>Jump to year</Subtitle>
                <p>
                    <Link to={`/messages#${years['y2014']}`}>2014</Link>{' | '}
                    <Link to={`/messages#${years['y2015']}`}>2015</Link>{' | '}
                    <Link to={`/messages#${years['y2016']}`}>2016</Link>{' | '}
                    <Link to={`/messages#${years['y2017']}`}>2017</Link>{' | '}
                    <Link to={`/messages#${years['y2018']}`}>2018</Link>{' | '}
                    <Link to={`/messages#${years['y2019']}`}>2019</Link>{' | '}
                    <Link to={`/messages#${years['y2020']}`}>2020</Link>{' | '}
                    <Link to={`/messages#${years['y2021']}`}>2021</Link>{' | '}
                    <Link to={`/messages#${years['y2022']}`}>2022</Link>{' | '}
                    <Link to={`/messages#${years['y2023']}`}>2023</Link>
                </p>
            </div>
        );

        const change_pages_element = (
            <Link to={`/messages#${this.state.to_index + 1}`}><Badge className={"hover:cursor-pointer"} icon={FaArrowRight}>Next 100</Badge></Link>
        );

        content_element = (
            <div>

                <div className={"flex flex-wrap justify-between"}>
                    <div className={"flex flex-row"}>
                        {jump_year_element}
                    </div>
                    <div>
                        <Link to={`/transactions`}>All transactions</Link>
                    </div>
                </div>

                <Divider/>

                <Title className={"flex flex-row my-3 items-center justify-between space-x-3"}>
                    <div>Messages from Message Index {this.state.from_index} to {this.state.to_index}</div>
                    <div>{change_pages_element}</div>
                </Title>

                <Table>
                    <TableHead>
                        {ListElements.getTableRowMessagesHeader()}
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((message_row, index) => {
                            return ListElements.getTableRowMessages(message_row, index);
                        })}
                    </TableBody>
                </Table>

                <div className={"flex flex-row items-center justify-end"}>
                    {change_pages_element}
                </div>

            </div>
        );

        const page_element = (
            <>
                <div className={"flex flex-col w-full items-center"}>
                    <div className={"flex flex-col w-full max-w-[1300px] items-start space-y-3 my-3"}>
                        <Title className={"font-bold text-xl"}>Messages</Title>
                        <Subtitle>All CNTRPRTY Bitcoin transactions and state messages</Subtitle>
                    </div>
                    <Card className={"flex flex-col overflow-scroll shadow-md my-3 max-w-[1300px]"}>
                        {content_element}
                    </Card>
                </div>
            </>
        );

        return OneElements.getFullPageForRouteElement(page_element);

    }
}

export default withRouter(Messagespage);
// export default withRouter(Transactionspage);
