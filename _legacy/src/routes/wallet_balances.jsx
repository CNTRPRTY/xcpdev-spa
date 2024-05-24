import React from 'react';
import { withRouter } from './shared/classhooks';
import { ListElements } from './shared/elements';
<<<<<<< HEAD:src/routes/wallet_balances.jsx
=======
import {Card, Subtitle, Table, TableBody, TableHead, Title} from "@tremor/react";
// import { Outlet, Link } from "react-router-dom";
>>>>>>> develop:_legacy/src/routes/wallet_balances.jsx

class WalletBalances extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            balances: props.balances,
        };
    }

    render() {

        let wallet_element_contents = null;

        if (this.state.balances && !this.state.balances.length) {
            wallet_element_contents = (
<<<<<<< HEAD:src/routes/wallet_balances.jsx
                <p class="text-gray-600 dark:text-gray-400">
                    no balances for address
                </p>
=======
                <>
                    <Subtitle>No balances for address</Subtitle>
                    {/* <p>no balances for address: <Link to={`/address/${this.state.address}`}>{this.state.address}</Link></p> */}
                </>
>>>>>>> develop:_legacy/src/routes/wallet_balances.jsx
            );
        }

        // BUT not having results can be moved here!...
        // which should always be the case now
        else if (this.state.balances && this.state.balances.length) {
            function balancesSort(a, b) {
                if (b.quantity === a.quantity) {
                    const mainname_a = a.asset_longname ? a.asset_longname : a.asset;
                    const mainname_b = b.asset_longname ? b.asset_longname : b.asset;
                    if (mainname_a < mainname_b) {
                        return -1;
                    }
                    if (mainname_a > mainname_b) {
                        return 1;
                    }
                    return 0;
                }
                else {
                    return b.quantity - a.quantity;
                }
            };

            const address_balances_element = (
                <>
                    <Table>
                        <TableHead>
                            {ListElements.getTableRowBalanceAddressHeader()}
                        </TableHead>
                        <TableBody>
                            {this.state.balances.sort(balancesSort).map((balances_row, index) => {
                                return ListElements.getTableRowBalanceAddress(balances_row, index);
                            })}
                        </TableBody>
                    </Table>
                </>
            );

            wallet_element_contents = (
                <>
<<<<<<< HEAD:src/routes/wallet_balances.jsx
                    <div class="whitespace-nowrap overflow-auto">
                        <h3>
                            Assets balance (sorted by most units on top, then alphabetically):
                        </h3>
                        <div class="py-1 my-1">
                            {address_balances_element}
                        </div>
                    </div>
=======
                    {/* <p>Address: <Link to={`/address/${this.state.address}`}>{this.state.address}</Link></p> */}


                    {/* <nav
                        style={{
                            // borderBottom: "solid 1px",
                            paddingBottom: "1rem",
                        }}
                    >
                        <Link to="/wallet">Balances</Link> |{" "}
                        // <Link to="/wallet/balances">Balances</Link> |{" "}

                        <Link to="/wallet/generate">New</Link>
                        // <Link to="/wallet/generate">Generate</Link>
                        // <Link to="/wallet/code">Code</Link>

                    </nav> */}
                    {/* <Outlet /> */}


                    <Card>
                        <Title>Assets balance (sorted by most units on top, then alphabetically)</Title>
                        {/* <h3>Balances (sorted by most units on top, then alphabetically):</h3> */}

                        {/* <p>
                            For [m]edia visit bitSTART:{' '}
                            <a href={`https://bitst.art/_collector/${this.state.address}`} target="_blank">/_collector/{this.state.address}</a>
                            // <a href={`https://bitst.art/_/${this.state.address}`} target="_blank">/_/{this.state.address}</a>
                        </p> */}

                        {address_balances_element}
                    </Card>
>>>>>>> develop:_legacy/src/routes/wallet_balances.jsx
                </>
            );

        }

        return (
            <>
                {wallet_element_contents}
            </>
        );

    }

}

export default withRouter(WalletBalances);
