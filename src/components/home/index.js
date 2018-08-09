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

        const { blocks } = this.props;
        // const peers = props.nodes.map(node => (<p key={node.nonce}>{node.ip}</p>));
        const renderedBlocks = blocks.map(block => (
            <div key={block.id}>
                <h1>{new Date(block.timestamp).toString()}</h1>
            </div>));
        return (
          <div>
                {/* {peers} */}
                {renderedBlocks}
          </div>
        );
    }
}
  

const mapStateToProps = ({ counter, peers}) => ({
  nodes: peers.nodes,
  blocks: peers.blocks,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  requestPeers,
  initSockets,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)