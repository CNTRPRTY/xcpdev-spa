import React from 'react';
import { withRouter } from './shared/classhooks';

import WalletCreate from './wallet_create';

//////
// TODO move to utils if reused
// https://stackoverflow.com/a/44233123
function checkFloat(value) {
    const parsed = Number.parseFloat(value);
    return (!Number.isNaN(parsed)) && (!Number.isInteger(parsed));
}
function isZeroOrFloat(value) {
    if (Number.parseFloat(value) === 0) return true;
    return checkFloat(value);
}

function nowEpochSeconds() {
    return Math.floor((new Date()).getTime() / 1000);
}
//////

class WalletCreateBroadcast extends WalletCreate {

    constructor(props) {
        super(props);
        this.state = {
            advanced_parameters_show: false, // ONLY PRESENTATION! whatever chosen stays
            ...WalletCreate.ADVANCED_PARAMETERS_DEFAULTS,

            selected_method: 'create_broadcast',
            source: props.address,

            fee_fraction: '0.0',
            text: '',
            timestamp: nowEpochSeconds(),
            value: '0.0',

            // fee: 0,
            open_dialog_obj: null, // closed when null
        };
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleFeeFractionChange = this.handleFeeFractionChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTimestampChange = this.handleTimestampChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (!isZeroOrFloat(this.state.fee_fraction)) {
            alert(`fee_fraction:${this.state.fee_fraction} is not a float`);
            return;
        };
        const float_fee_fraction = Number.parseFloat(this.state.fee_fraction);

        if (!isZeroOrFloat(this.state.value)) {
            alert(`value:${this.state.value} is not a float`);
            return;
        }
        const float_value = Number.parseFloat(this.state.value);

        const method = this.state.selected_method;
        let params = {
            // const params = {
            "source": this.state.source,

            "fee_fraction": float_fee_fraction,
            "text": this.state.text,
            "timestamp": this.state.timestamp,
            "value": float_value,

            // "fee": Number(this.state.fee),
            // "encoding": "opreturn",
            // "allow_unconfirmed_inputs": true,
            // "extended_tx_info": true
        };

        params = this.addAdvancedParams(params);

        if (params) await this.handleSubmitSetState(method, params);
        // await this.handleSubmitSetState(method, params);
    }


    handleFeeFractionChange(event) {
        this.setState({ fee_fraction: event.target.value });
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    handleTimestampChange(event) {
        this.setState({ timestamp: event.target.value });
    }

    handleValueChange(event) {
        this.setState({ value: event.target.value });
    }


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>

                    {this.renderAdvancedParameters()}

                    <p class="text-gray-600 dark:text-gray-400">
                        Params:
                    </p>
                    <div class="py-1 my-1 ml-4">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="pr-1 py-1">
                                        {/* <td> */}
                                        <span class="dark:text-slate-100">source:</span>
                                        {/* <span class="text-gray-600 dark:text-gray-400">source:</span> */}
                                    </td>
                                    <td class="py-1">
                                        <input
                                            class="border-solid border-2 border-gray-300"
                                            value={this.state.source}
                                            size={this.state.source.length}
                                            disabled
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td class="pr-1 py-1">
                                        <span class="dark:text-slate-100">fee fraction:</span>
                                    </td>
                                    <td class="py-1">
                                        <input
                                            class="border-solid border-2 border-gray-300"
                                            type="text"
                                            size="8"
                                            value={this.state.fee_fraction}
                                            onChange={this.handleFeeFractionChange}
                                        />
                                        {' '}
                                        <span class="text-gray-600 dark:text-gray-400">(optional)</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="pr-1 py-1">
                                        <span class="dark:text-slate-100">text:</span>
                                    </td>
                                    <td class="py-1">
                                        {/* TODO styling with css file */}
                                        <textarea
                                            class="border-solid border-2 border-gray-300"
                                            rows="2"
                                            cols="30"
                                            // cols="55"
                                            style={{
                                                // https://stackoverflow.com/a/658197
                                                'whiteSpace': "nowrap",
                                                'overflow': "scroll",
                                                'overflowY': "hidden",
                                                'overflowX': "scroll",
                                                'overflow': "-moz-scrollbars-horizontal",
                                                // https://stackoverflow.com/a/5271803
                                                'resize': 'horizontal',
                                            }} onChange={this.handleTextChange}></textarea>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="pr-1 py-1">
                                        <span class="dark:text-slate-100">timestamp:</span>
                                    </td>
                                    <td class="py-1">
                                        <input
                                            class="border-solid border-2 border-gray-300"
                                            type="text"
                                            size="8"
                                            value={this.state.timestamp}
                                            onChange={this.handleTimestampChange}
                                        />
                                        {' '}
                                        <button
                                            class="px-1 border-solid border-2 border-gray-400 dark:text-slate-100"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                this.setState({ timestamp: nowEpochSeconds() });
                                            }}
                                        >
                                            now
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="pr-1 py-1">
                                        <span class="dark:text-slate-100">value:</span>
                                    </td>
                                    <td class="py-1">
                                        <input
                                            class="border-solid border-2 border-gray-300"
                                            type="text"
                                            size="8"
                                            value={this.state.value}
                                            onChange={this.handleValueChange}
                                        />
                                        {' '}
                                        <span class="text-gray-600 dark:text-gray-400">(optional)</span>
                                    </td>
                                </tr>

                                {/* <tr>
                                    <td class="pr-1 py-1">
                                        <span class="dark:text-slate-100">fee:</span>
                                    </td>
                                    <td class="py-1">
                                        <input
                                            class="border-solid border-2 border-gray-300"
                                            type="text"
                                            size="8"
                                            value={this.state.fee}
                                            onChange={this.handleFeeChange}
                                        />
                                    </td>
                                </tr> */}

                            </tbody>
                        </table>
                    </div>

                    {this.state.open_dialog_obj ?
                        (this.renderDialogObj())
                        :
                        null
                    }

                    <div class="py-1 my-1 mt-3">
                        {/* <div class="py-1 my-1"> */}
                        <input
                            class="px-1 border-solid border-2 border-gray-400"
                            // class="px-1 border-solid border-2 border-gray-400 dark:text-slate-100"
                            type="submit"
                            value="submit"
                            disabled={this.state.open_dialog_obj !== null}
                        />
                    </div>
                </form>
            </>
        );
    }

}

export default withRouter(WalletCreateBroadcast);
