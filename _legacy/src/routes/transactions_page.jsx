import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty, COUNTERPARTY_VERSION } from "../api";
// import { getCntrprty } from "../api";
import { Link } from "react-router-dom";
import { OneElements, ListElements } from './shared/elements';
import {Badge, Card, Divider, Subtitle, Table, TableBody, TableHead, Title} from "@tremor/react";
import {FaArrowRight} from "react-icons/fa";

class Transactionspage extends React.Component {
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
        const response = await getCntrprty(`/transactions/${from_index}`);
        if (!response) {
            this.setState({ page_not_found: true });
        }
        else {
            this.setState({
                from_index: response.from_index,
                to_index: response.to_index,
                rows: response.transactions,
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
                    <h2>No results found</h2>
                </main>
            );
        }

        // TODO? easier to do manual at least for now...
        let years;
        if (COUNTERPARTY_VERSION.startsWith('9.59')) {
            years = {
                y2014: 0,
                y2015: 134093,
                y2016: 399428,
                y2017: 751271,
                y2018: 1152661,
                y2019: 1405841,
                y2020: 1482018,
                y2021: 1540493,
                y2022: 1833799,
                y2023: 2199002,
            };
        }
        else { // 9.60
            years = {
                y2014: 0,
                y2015: 134093,
                y2016: 399428,
                y2017: 751271,
                y2018: 1152661,
                y2019: 1405841,
                y2020: 1482018,
                y2021: 1540493,
                y2022: 1835266,
                y2023: 2209456,
            };
        }
        // keeping this around as I'm not sure why is not matching with either (it should have with 9.60 I think...)
        // const years = {
        //     y2014: 0,
        //     y2015: 134093,
        //     y2016: 399428,
        //     y2017: 751271,
        //     y2018: 1152661,
        //     y2019: 1405841,
        //     y2020: 1482022,
        //     y2021: 1540497,
        //     y2022: 1835273,
        //     y2023: 2209463,
        // }
        const jump_year_element = (
            <div className={"flex flex-wrap mb-3"}>
                <Subtitle className={"mr-2"}>Jump to year</Subtitle>
                <p>
                    <Link to={`/transactions#${years['y2014']}`}>2014</Link>{' | '}
                    <Link to={`/transactions#${years['y2015']}`}>2015</Link>{' | '}
                    <Link to={`/transactions#${years['y2016']}`}>2016</Link>{' | '}
                    <Link to={`/transactions#${years['y2017']}`}>2017</Link>{' | '}
                    <Link to={`/transactions#${years['y2018']}`}>2018</Link>{' | '}
                    <Link to={`/transactions#${years['y2019']}`}>2019</Link>{' | '}
                    <Link to={`/transactions#${years['y2020']}`}>2020</Link>{' | '}
                    <Link to={`/transactions#${years['y2021']}`}>2021</Link>{' | '}
                    <Link to={`/transactions#${years['y2022']}`}>2022</Link>{' | '}
                    <Link to={`/transactions#${years['y2023']}`}>2023</Link>
                </p>
            </div>
        );

        const change_pages_element = (
            <Link to={`/transactions#${this.state.to_index + 1}`}><Badge className={"hover:cursor-pointer"} icon={FaArrowRight}>Next 100</Badge></Link>
        );

        content_element = (
            <div>

                <div className={"flex flex-wrap justify-between"}>
                    <div className={"flex flex-row"}>
                        {jump_year_element}
                    </div>
                    <div>
                        <Link to={`/messages`}>All transactions and state messages</Link>
                    </div>
                </div>

                <Divider/>

                <Title className={"flex flex-row my-3 items-center justify-between space-x-3"}>
                    <div>Transactions from Tx Index {this.state.from_index} to {this.state.to_index}</div>
                    <div>{change_pages_element}</div>
                </Title>

                <Table>
                    <TableHead>
                        {ListElements.getTableRowTransactionHeader()}
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((transaction_row, index) => {
                            return ListElements.getTableRowTransaction(transaction_row, index);
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
                        <Title className={"font-bold text-xl"}>Transactions</Title>
                        <Subtitle>All CNTRPRTY Bitcoin transactions</Subtitle>
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

export default withRouter(Transactionspage);
