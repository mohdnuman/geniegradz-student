import {UPDATE_CREATED_DOUBT, UPDATE_RESOLVED_DOUBT} from '../actions/actionTypes';

// const initialDoubtState={
// }

export default function doubts(state={},action){
    switch(action.type){
        case UPDATE_CREATED_DOUBT:
            return action.doubt;
        case UPDATE_RESOLVED_DOUBT:
            return {};    
        default:
            return state    
    }
}