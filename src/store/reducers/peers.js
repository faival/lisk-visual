import Lisk from 'lisk-elements'
import io from 'socket.io-client'

const liskApi = Lisk.APIClient.createTestnetAPIClient([]);

export const PEERS_REQUESTED = 'peers/INCREMENT_REQUESTED'
export const PEERS_RETRIEVED = 'peers/PEERS_RETRIEVED'

export const PEERS_NEWBLOCK = 'peers/PEERS_NEWBLOCK'

const initialState = {
  nodes: [],
  blocks: [
    {
        version: 1,
        reward: 400000000,
        payloadHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        timestamp: 69719130,
        previousBlock: '4684057940275875196',
        generatorPublicKey: '017830718e0cc23a53c1833bd7405ddd1bb8d4f2cbdece8b4981983d19db2713',
        blockSignature: 'f4e6b08b4e18111385378716f94ff3f2435ab40a9ecb9e829794b47aac4fe28ebeb7a3095c79ec0446082200ebec8fea1a9a9c19bfb31ffd68eca9a25c0e9f0f',
        height: 5932814,
        id: '5298222047941305720',
        relays: 2
    },
  ],
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
