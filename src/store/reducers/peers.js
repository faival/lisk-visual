import Lisk from 'lisk-elements'
import socketCluster from 'socketcluster-client'

const liskApi = Lisk.APIClient.createTestnetAPIClient([]);

export const PEERS_REQUESTED = 'peers/INCREMENT_REQUESTED'
export const PEERS_RETRIEVED = 'peers/PEERS_RETRIEVED'

export const PEERS_NEWBLOCK = 'peers/PEERS_NEWBLOCK'

const initialState = {
  nodes: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PEERS_REQUESTED:
      return {
        ...state,
      }
  	case PEERS_RETRIEVED:
      return {
        ...state,
        nodes: action.data,
      }

    default:
      return state
  }
}

export const initSockets = () => {
	return dispatch => {
		const socket = socketCluster.create({
			path: '/socketcluster/',
			hostname: 'testnet.lisk.io',
		 	secure: true,
			port: 443,
		});
		socket.on('blocks/change', (block) => {
			dispatch({
				type: PEERS_NEWBLOCK,
				data: { block },
			});
		});
	}
}

export const requestPeers = () => {
  return dispatch => {
    dispatch({
      type: PEERS_REQUESTED
    })

    liskApi.peers.get({}).then(({ data }) => {
    	console.log(data);

    	dispatch({
	    	data,
	      	type: PEERS_RETRIEVED,
	    });
    })
  }
}
