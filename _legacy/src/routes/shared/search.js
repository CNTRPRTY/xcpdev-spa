import React from 'react';
import { withRouter } from './classhooks';
import {
  Button,
  TextInput,
} from "@tremor/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// move to util if reused
function isAssetName(possible) {
  // if subasset only validate the superasset part
  const maybe_subasset = possible.split('.');
  if (maybe_subasset.length > 1) {
    possible = maybe_subasset[0];
  }
  // https://stackoverflow.com/a/8653681
  if (possible.match(/^[a-zA-Z]+$/)) {
    // only letters
    return true;
  }
  else if (
    (
      possible.startsWith('A') ||
      possible.startsWith('a')
    ) &&
    Number.isInteger(Number(possible.substring(1))) // Number.isInteger(99999999999999999999999); // true (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#using_isinteger)
  ) {
    // is numeric asset
    return true;
  }
  else {
    return false;
  }
}

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSearchSubmit(event) {
    event.preventDefault();

    let to_navigate = this.state.search.replace(/\s/g, ''); // remove all whitespace (https://stackoverflow.com/a/6623263)
    this.setState({ search: '' });

    let path_type = null;

    // simple for now:
    if (to_navigate.length === 64) {

      // simplest to allow both block_hash and tx_hash
      const min_diff = '00000000'; // TODO double check
      if (to_navigate.startsWith(min_diff)) {
        path_type = 'block';
      }
      else {
        path_type = 'tx';
      }
      // path_type = 'tx';
    }
    else if (Number.isInteger(Number(to_navigate))) {
      // simplest to allow both block_height and tx_index
      const num = Number(to_navigate);
      if (num >= 900000) {
        path_type = 'tx';
      }
      else {
        path_type = 'block';
      }
      // path_type = 'block';
    }
    else if (isAssetName(to_navigate)) {
      const to_uppercase = to_navigate.split('.');
      to_uppercase[0] = to_uppercase[0].toUpperCase();
      to_navigate = to_uppercase.join('.');
      path_type = 'asset';
    }
    // TODO more strict validation, but for now treating everything else as an address
    else {
      path_type = 'address';
    }

    if (path_type) {
      this.props.router.navigate(`/${path_type}/${to_navigate}`);
      // this.props.router.navigate(`${path_type}/${to_navigate}`);
    }
    else {
      alert(`no data type match found for: ${to_navigate}`);
    }

  }

  render() {

    const placeholder = " block / tx / address / asset";
    // const placeholder = " block / tx_index / tx_hash / address / asset";

    // const placeholder_size = placeholder.length - 10;
    // const placeholder_size = placeholder.length - 12;

    return (
      <>

        {/* <span> */}
        {/* <div style={{ padding: "1.1rem 0 0.5rem 0" }}> */}

        <form onSubmit={this.handleSearchSubmit}>
          <div className={"flex flex-row w-full items-center justify-center space-x-1"}>
            <div className="flex flex-row w-full max-w-3xl  items-center bg-slate-100 dark:bg-slate-800 p-1 space-x-2 rounded-xl">
              <TextInput icon={MagnifyingGlassIcon} placeholder={placeholder} className={"w-full border-none dark:border-none focus:ring-none ring-transparent dark:ring-transparent"} value={this.state.search} onChange={this.handleSearchChange} />
              <Button type="submit" size={"xs"} variant={"primary"} value={"Go"} className={"bg-yellow-600 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-800 ring-transparent border-none"}>Go</Button>
            </div>
          </div>
        </form>

        {/* </div> */}
        {/* </span> */}

      </>

    );

  }

}

export default withRouter(Search);
