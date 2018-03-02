import React, { Component } from 'react';
import './tabl.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import axios from 'axios'
import env from '../../../config/env';

const tableData = [
  {
    exchange: 'CoinBase',
    price: '100',
    pair: 'BTC',
  },
  {
    exchange: 'Bitterex',
    price: '200',
    pair: 'ETH',
  },
  {
    exchange: 'Bitfenix',
    price: '300',
    pair: 'ETH',
  },
  {
    exchange: 'Gemini',
    price: '400',
    pair: 'ETH',
  },
  {
    exchange: 'Bianace',
    price: '500',
    pair: 'BTC',
  },
  {
    exchange: 'CoinBase',
    price: '600',
    pair: 'ETH',
  },
  {
    exchange: 'BitGrail',
    price: '700',
    pair: 'ETH',
  },
];

var exchangeData = [];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {

  constructor(props) {
  super(props);
  this.state = {
      render: false //Set render state to false
    }
  }

  componentWillMount() {
    console.log('I was triggered during getCoinPrice')
    axios.get(env.API_URL + 'api/price')
    .then( (res) => {
      //use res from back-end server and check status code
      //forwarded from external API server
      console.log(res.data);

      for (var key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            if (!(res.data[key].XRPBTC === undefined)) {
              // console.log(key + " XRPBTC -> " + JSON.stringify(res.data[key].XRPBTC.APIStatusCode));
              if (res.data[key].XRPBTC.APIStatusCode === 200) {
                // console.log(key + res.data[key]);
                exchangeData.push({
                  exchange: key,
                  price: JSON.stringify(res.data[key].XRPBTC.prices.last),
                  pair: 'XRPBTC'
                });
              }
            }
            if (!(res.data[key].XRPUSD === undefined)) {
              // console.log(key + " XRPUSD -> " + JSON.stringify(res.data[key].XRPUSD.APIStatusCode));
              if (res.data[key].XRPUSD.APIStatusCode === 200) {
                // console.log(key + res.data[key]);
                exchangeData.push({
                  exchange: key,
                  price: JSON.stringify(res.data[key].XRPUSD.prices.last),
                  pair: 'XRPUSD'
                });
              }
            }
            if (!(res.data[key].XRPETH === undefined)) {
              // console.log(key + " XRPETH -> " + JSON.stringify(res.data[key].XRPETH.APIStatusCode));
              if (res.data[key].XRPETH.APIStatusCode === 200) {
                // console.log(key + res.data[key]);
                exchangeData.push({
                  exchange: key,
                  price: JSON.stringify(res.data[key].XRPETH.prices.last),
                  pair: 'XRPETH'
                });
              }
            }

          }
      }
      console.log(exchangeData);
      console.log(tableData);
    })
    }

    componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({render: true}) //After 1 second, set render to true
    }.bind(this), 1000)
  }


  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '500px',
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    let renderContainer = false
    if(this.state.render){
    console.log("I AM RENDERING NOW");
    return (
      <div id="container">
      <div style={{width: '100%', backgroundColor: "#FFF"}}>
        <Table style={{width: '75%',textAlign: 'center', backgroundColor: "#15202e", margin: 'auto'}}
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          adjustForCheckbox={this.state.showCheckboxes}
        >
          <TableHeader style={{textAlign: 'center', backgroundColor: "#607D8B"}}
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow style={{textAlign: 'center', backgroundColor: "#E0E0E0"}}>
              <TableHeaderColumn tooltip="The ID">Exchange</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Price</TableHeaderColumn>
              <TableHeaderColumn tooltip="Currency Pair">Btc/Eth</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={{textAlign: 'center', backgroundColor: "#fff"}}
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
            adjustForCheckbox={this.state.showCheckboxes}
          >
            {exchangeData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.exchange}</TableRowColumn>
                <TableRowColumn>{row.price}</TableRowColumn>
                <TableRowColumn>{row.pair}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      </div>
    );
  }
  return (
  renderContainer //Render the dom elements, or, when this.state == false, nothing.
)

}

}