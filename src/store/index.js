import { createStore } from "vuex";

export default createStore({
  state: {
    authenticate: false,
    member_id: "",
    employee_id: "",
    name: "",
    status: "",
  },
  mutations: {
    setMyAuthenticate(state, authenticate) {
      state.authenticate = authenticate;
    },
    setMyMember_id(state, member_id) {
      state.member_id = member_id;
    },
    setMyEmployee_id(state, employee_id) {
      state.employee_id = employee_id;
    },
    setMyName(state, name) {
      state.name = name;
    },
    setMyStatus(state, status) {
      state.status = status;
    },
  },
  getters: {
    myAuthenticate: (state) => state.authenticate,
    myMember_id: (state) => state.member_id,
    myEmployee_id: (state) => state.employee_id,
    myName: (state) => state.name,
    myStatus: (state) => state.status,
  },
  actions: {},
  modules: {},
});
