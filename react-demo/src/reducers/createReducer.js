export default function createReducer(initState,handles){
    return (state = initState,action={})=>{
        let handle = handles[action.type];
        return (typeof handle === 'function' ? handle(state,action):state)
    }
}