// const redux = require('redux')
// const reduxLogger = require('redux-logger')

// const createStore = redux.legacy_createStore
// const combineReducers = redux.combineReducers
// const applyMiddleware = redux.applyMiddleware
// const logger = reduxLogger.createLogger()

// const BUY_CAKE = "BUY_CAKE"
// const BUY_IceCream = "BUY_IceCream"
// const BUY_CANDY = "BUY_CANDY"
// function buyCake(){
//     return {
//         type: BUY_CAKE,
//         info: 'first action'
//     }
// }

// function buyIceCream(){
//     return {
//         type: BUY_IceCream,
//         info: 'second action'
//     }
// }

// function buyCandy(){
//     return{
//         type: BUY_CANDY,
//         info: 'third action'
//     }
// }

// // (prevState, action) = newState


// const initialCakeState = {
//     numOfCakes: 10
// }
// const initialIceCreamState = {
//     numOfIceCream: 20
// }
// const initialCandyState = {
//     numofCandy: 5
// }

// const Cakereducer = (state = initialCakeState, action) =>{
//     switch(action.type){
//         case BUY_CAKE:
//             return { ...state, numOfCakes: state.numOfCakes-1}
//         default: return state
//     }
// }

// const IceCreamreducer = (state = initialIceCreamState, action) =>{
//     switch(action.type){
//         case BUY_IceCream:
//             return { ...state, numOfIceCream: state.numOfIceCream-1}
//         default: return state
//     }
// }

// const Candyreducer = ((state=initialCandyState, action) =>{
//     switch(action.type){
//         case BUY_CANDY:
//             return {
//                 ...state, numofCandy: state.numofCandy-1
//             }
//             default: return state
//     }
// })


// const rootReducer = combineReducers({
//     cake: Cakereducer,
//     icecream: IceCreamreducer,
//     candy: Candyreducer
// })
// const store = createStore(rootReducer, applyMiddleware(logger))
// console.log('InitialState', store.getState())
// //const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))
// const unsubscribe = store.subscribe(() => {})
// store.dispatch(buyCake())
// store.dispatch(buyCake())
// store.dispatch(buyCake())
// store.dispatch(buyIceCream())
// store.dispatch(buyCandy())
// store.dispatch(buyIceCream())
// store.dispatch(buyCandy())
// unsubscribe()


const redux = require('redux')
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.legacy_createStore
const axios = require('axios')

const InitialState = {
    loading: false,
    users: [],
    error: ''
}
// const for action name
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
// action function
const fetchUsersRequest = () =>{
    return{
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) =>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) =>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = ((state=InitialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state, 
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }

})
 

const fetchUsers = () =>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response =>{
            // response.data is the array of users
            const users = response.data.map((user) => { return user.id })
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            //error.message is the error description
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log("updated state: ", store.getState()))
store.dispatch(fetchUsers())
