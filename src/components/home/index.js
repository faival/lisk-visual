import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
		    {peers}
		  </div>
		);
	}
}
  

const mapStateToProps = ({ counter, peers}) => ({
  nodes: peers.nodes,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  requestPeers,
  initSockets,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)