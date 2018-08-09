import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HeatMap from 'react-heatmap-grid';
import moment from 'moment';

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
			const charBlocksDate = this.props.blocks.map(block => moment(new Date(block.timestamp)).format('MMMM Do YYYY, h:mm:ss a'))
			const xLabels = charBlocksDate.map(date => `${date}`);
			const yLabels = ['Blocks'];
			const data = new Array(yLabels.length)
				.fill(0)
				.map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
 
        const { blocks } = this.props;
        // const peers = props.nodes.map(node => (<p key={node.nonce}>{node.ip}</p>));
        const renderedBlocks = blocks.map(block => (
            <div key={block.id}>
                <h1>{moment(new Date(block.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}</h1>
            </div>));
        return (
          <div>
						<HeatMap
							xLabels={xLabels}
							yLabels={yLabels}
							data={data}
						/>
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