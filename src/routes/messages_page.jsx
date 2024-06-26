import React from 'react';
import { withRouter } from './shared/classhooks';
import { getCntrprty, COUNTERPARTY_VERSION } from "../api";
import { Link } from "react-router-dom";
import { OneElements, ListElements } from './shared/elements';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// https://github.com/CounterpartyXCP/counterparty-core/blob/6378d81dcef9dc3646111e815ed427268b09e9a5/counterparty-core/counterpartycore/lib/blocks.py#L61
const TABLES = [
    // "balances", // not included in messages... :P
    "credits",
    "debits",
    // "messages",
    "order_match_expirations",
    "order_matches",
    "order_expirations",
    "orders",
    "bet_match_expirations",
    "bet_matches",
    "bet_match_resolutions",
    "bet_expirations",
    "bets",
    "broadcasts",
    "btcpays",
    "burns",
    "cancels",
    "dividends",
    "issuances",
    "sends",
    "rps_match_expirations",
    "rps_expirations",
    "rpsresolves",
    "rps_matches",
    "rps",
    "destructions",
    // "assets",
    // "addresses",
    "sweeps",
    "dispensers",
    "dispenses",
    "dispenser_refills",
];

class Messagespage extends React.Component {
    constructor(props) {
        super(props);

        let table_if_specified = '';
        if (props.router.params.table) {
            table_if_specified = props.router.params.table;
        }

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

            from_index: index_if_specified,
            to_index: null,

            rows_loading: true,
            rows_loading_error: null,
            rows: null,

            years: [],

            table: table_if_specified,
        };

        this.handleSelectTable = this.handleSelectTable.bind(this);
    }

    async handleSelectTable(event) {

        if (event.target.value !== this.state.table) {
            this.setState({ table: event.target.value });
            await sleep(1);
            this.props.router.navigate(`/messages/${event.target.value}`);
            await this.fetchData(0);
            // await this.fetchData(this.state.from_index);
        }

    }

    async fetchData(from_index) {
        try {

            let url;
            if (this.state.table !== '') {
                url = `/messages/${from_index}/category/${this.state.table}`;
                // url = `/messages/${from_index}/table/${this.state.table}`;
            }
            else {
                url = `/messages/${from_index}`;
            }

            const response = await getCntrprty(url);
            // const response = await getCntrprty(`/messages/${from_index}`);

            this.setState({
                from_index: response.from_index,
                to_index: response.to_index,

                rows_loading: false,
                rows: response.messages,

                years: response.years,
            });
        }
        catch (err) {
            this.setState({
                rows_loading_error: err,
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

        const add_table_if_applies = (this.state.table !== '') ? `/${this.state.table}` : '';

        // Doing this manually helps in verification...
        let years;

        if (!this.state.years.length) {
            if (COUNTERPARTY_VERSION.startsWith('9.59')) {
                years = [
                    ['2014', 0],
                    ['2015', 505211],
                    ['2016', 1350000],
                    ['2017', 2582382],
                    ['2018', 4186987],
                    ['2019', 5228022],
                    ['2020', 5558510],
                    ['2021', 5855416],
                    ['2022', 7055629],
                    ['2023', 8460931],
                ];
            }
            else if (COUNTERPARTY_VERSION.startsWith('9.60')) {
                years = [
                    ['2014', 0],
                    ['2015', 505211],
                    ['2016', 1350000],
                    ['2017', 2582382],
                    ['2018', 4186987],
                    ['2019', 5228022],
                    ['2020', 5558173], // update was in 2022...
                    ['2021', 5850483],
                    ['2022', 7070644],
                    ['2023', 8820356],
                    ['2024', 10307726],
                ];
            }
            else { // 9.61
                years = [
                    ['2014', 0],
                    ['2015', 505211],
                    ['2016', 1350000],
                    ['2017', 2582382],
                    ['2018', 4186987],
                    ['2019', 5228022],
                    ['2020', 5558173],
                    ['2021', 5850490], // update was in 2023...
                    ['2022', 7070697],
                    ['2023', 8820491],
                    ['2024', 10315836], // ??? 10315837 2023 block time?
                ];
            }
        }
        else {
            years = this.state.years;
        }

        const jump_year_element = (
            <>
                <h3>
                    Jump to year:
                </h3>
                <p>
                    {years.map((value, index) => {
                        let include_separator = ' | ';
                        if (index === (years.length - 1)) {
                            include_separator = '';
                        }
                        const [year, message_index] = value;
                        return (
                            <>
                                <Link to={`/messages${add_table_if_applies}#${message_index}`}>{year}</Link>{include_separator}
                            </>
                        );
                    })}
                </p>
            </>
        );

        const table_select_element = (
            <div class="py-1 my-1">
                <table>
                    <tbody>
                        <tr>
                            <td class="pr-1 py-1">
                                <span class="dark:text-slate-100">Category:</span>
                            </td>
                            <td class="py-1">
                                <select
                                    class="border-solid border-2 border-gray-300"
                                    value={this.state.table}
                                    onChange={this.handleSelectTable}
                                >
                                    <option value="">( all )</option>
                                    {TABLES.map((value, index) => {
                                        return (<option value={value}>{value}</option>);
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

        let content_element = (
            <p class="text-gray-600 dark:text-gray-400">
                loading...
            </p>
        );
        if (this.state.rows_loading_error) {
            content_element = (
                <p class="text-gray-600 dark:text-gray-400">
                    {`${this.state.rows_loading_error}`}
                </p>
            );
        }
        else if (!this.state.rows_loading) {

            const change_pages_element = (
                <p><Link to={`/messages${add_table_if_applies}#${this.state.to_index + 1}`}>next 100 {'>'}</Link></p>
                // <p><Link to={`/messages#${this.state.to_index + 1}`}>next 100 {'>'}</Link></p>
            );

            content_element =
                this.state.rows.length ?
                    (
                        <>
                            <div class="py-1 my-1">
                                <p class="dark:text-slate-100">
                                    Messages from message index {this.state.from_index} to {this.state.to_index}:
                                </p>
                            </div>

                            <div class="py-1 my-1">
                                {change_pages_element}
                            </div>

                            <div class="py-1 my-1">
                                <table>
                                    <tbody>
                                        {ListElements.getTableRowMessagesHeader()}
                                        {this.state.rows.map((row, index) => {
                                            return ListElements.getTableRowMessages(row, index);
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div class="pt-1 mt-1">
                                {/* <div class="py-1 my-1"> */}
                                {change_pages_element}
                            </div>
                        </>
                    )
                    : (
                        <p class="text-gray-600 dark:text-gray-400">
                            no rows found...
                        </p>
                    );
        }

        const route_element = (
            <div class="py-2 my-2">
                <h2 class="font-bold text-xl mb-1">
                    Messages:
                </h2>
                <div class="py-1 my-1">
                    <p class="dark:text-slate-100">
                        All transaction and state messages in ascending order.
                        {/* All CNTRPRTY Bitcoin transaction and state messages in ascending order. */}
                    </p>
                    <p><Link to={`/transactions`}>All transactions</Link></p>
                    <p><Link to={`/blocks`}>All blocks</Link></p>
                </div>
                {/* <div class="pt-1 mt-1"> */}
                <div class="py-1 my-1">
                    {table_select_element}
                </div>
                <div class="py-1 my-1">
                    {jump_year_element}
                </div>
                <div class="pt-1 mt-1 ml-4 overflow-auto">
                    {/* <div class="pt-1 mt-1"> */}
                    {/* <div class="py-1 my-1"> */}
                    {content_element}
                </div>
            </div>
        );

        return <OneElements route_element={route_element} />;
        // return OneElements.getFullPageForRouteElement(page_element);

    }
}

export default withRouter(Messagespage);
