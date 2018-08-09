import Lisk from 'lisk-elements'
import io from 'socket.io-client'

const liskApi = Lisk.APIClient.createTestnetAPIClient([]);

export const PEERS_REQUESTED = 'peers/INCREMENT_REQUESTED'
export const PEERS_RETRIEVED = 'peers/PEERS_RETRIEVED'

export const PEERS_NEWBLOCK = 'peers/PEERS_NEWBLOCK'

const initialState = {
  nodes: [],
  blocks: [],
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
    case PEERS_NEWBLOCK:
      return {
        ...state,
        blocks: [...state.blocks, action.data],
      }

    default:
      return state
  }
}

export const initSockets = () => {
	return dispatch => {
    const connection = io.connect('https://testnet.lisk.io');
    connection.on('blocks/change', (block) => {
      dispatch({
        data: block,
        type: PEERS_NEWBLOCK,
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
