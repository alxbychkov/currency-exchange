export function rootReducer(state, action) {
    let prevState
    switch (action.type) {
        case 'ADD_FAV':
            prevState = state.favorites || []
            prevState.push(action.value)
            return {...state, favorites: prevState}
        case 'REMOVE_FAV':
            prevState = state.favorites.filter(f => f != action.value)
            return {...state, favorites: prevState}
        case 'ADD_INTERVAL':
            prevState = state.interval || []
            prevState = action.value
            return {...state, interval: prevState}
        default: return state
    }
}