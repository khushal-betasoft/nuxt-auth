export const state = () => ({
    isLogin: false
})
export const getters = {
    getCounter(state) {
        return state.counter
    }
}
export const mutations = {
    changeState(state, payload) {
        state.isLogin = payload.value;
    }
}
