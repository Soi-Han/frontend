
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      account:{
        id:0
      },
      filter:[
        {id:1,identifier:'레드',isOn:false},
        {id:2,identifier:'화이트',isOn:false},
        {id:3,identifier:'스파클링',isOn:false},
        {id:4,identifier:'로제',isOn:false},
        {id:5,identifier:'기타와인',isOn:false},
        {id:6,identifier:'기타와인',isOn:false},
        //...filter에 음식 등등이 들어갈수 있음.
      ],
      integratedFilter:{
        winename:'',
        price1:0,
        price2:200000,
        sugar:0,
        acidity:0,
        texture:0,
        tannin:0,
      }
      

    }
  },
  mutations: {
    setSugar(state,payload){
      state.integratedFilter.sugar=payload
    },
    setAcidity(state,payload){
      state.integratedFilter.acidity=payload
    },
    setTexture(state,payload){
      state.integratedFilter.texture=payload
    },
    setTannin(state,payload){
      state.integratedFilter.tannin=payload
    },
    setPrice1(state,payload){
      state.integratedFilter.price1=payload
    },
    setPrice2(state,payload){
      state.integratedFilter.price2=payload
    },
    setWinename(state,payload){//통합필터에 입력된 와인이름
      state.integratedFilter.winename=payload
    },
    setAccount(state, payload) {//payload가 오면 state.account.id에 세팅한다.
      state.account.id = payload
    },
    setFilterTrue(state, payload) {
      for (var k of state.filter) {//for문 돌려서 CheckBox.vue 에서 payload로 입력받은 identifier를 비교하여 같으면 true를 주어 저장한다. 확인은 home.vue의 testStoreGetters()
        if (k.identifier == payload) {
          state.filter[k.id - 1].isOn = true;
        }
      }
    },
    setFilterFalse(state, payload) {
      for (var k of state.filter) {
        if (k.identifier == payload) {
          state.filter[k.id - 1].isOn = false;
        }
      }
    },
    // setIntegratedFilter(state,payload){
    //   if(payload.variety){
    //     if(payload.variety.indexOf('(delete)')>=0){//delete를 포함해 전달된다면 목록에서 빼고 아니면 목록에 넣는다.
    //       state.integratedFilterVariety=state.integratedFilterVariety.filter(elm=>elm!=payload.variety.substring(payload.variety.indexOf(')')+1))
    //     }
    //     else {state.integratedFilterVariety.push(payload.variety)}
    //   }
    //   //todo... 다른 integratedFilter 구성요소들 모두 써야함.
    // },

  },
  getters: {
    getSugar(state){
      return state.integratedFilter.sugar
    },
    getTannin(state){
      return state.integratedFilter.tannin
    },
    getAcidity(state){
      return state.integratedFilter.acidity
    },
    getTexture(state){
      return state.integratedFilter.texture
    },
    getPrice1(state){
      return state.integratedFilter.price1
    },
    getPrice2(state){
      return state.integratedFilter.price2
    },
    getTestWinename(state){
      // console.log(state.integratedFilter.winename)
      return state.integratedFilter.winename
    },
    getFilter (state) {
      return state.filter
    },
    // getIntegratedFilterVariety(state){
    //   return state.integratedFilterVariety
    // },
    getAccount(state){
      return state.account.id
    }
      
  }
})
export default store;