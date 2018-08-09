import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../store/reducers/counter'

import {
	requestPeers,
	initSockets,
} from '../../store/reducers/peers'

class Home extends React.Component {

	componentDidMount() {
		this.props.initSockets();
		this.props.requestPeers();
	}
	render () {

		const props = this.props;
		const peers = props.nodes.map(node => (<p key={node.nonce}>{node.ip}</p>));

		return (
		  <div>
		    <h1>Home</h1>
		    <p>Count: {props.count}</p>

		    <p>
		      <button onClick={props.increment}>Increment</button>
		      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
		    </p>

		    <p>
		      <button onClick={props.decrement}>Decrementing</button>
		      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
		    </p>

		    <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>
		    {peers}
		  </div>
		);
	}
}
  

const mapStateToProps = ({ counter, peers}) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
  nodes: peers.nodes,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  requestPeers,
  initSockets,
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)