<template>
  <div class="order">
  <div class="container">
    <main>
      <div class="py-5 text-center">
        <h2>주문하기</h2>
        <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group
          has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>
      <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3"><span class="text-primary">구입 목록</span></h4>
          <span class="badge bg-primary rounded-pill">{{ state.items.length }}</span>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(i,idx) in state.items" :key="idx">
              <div><h6 class="my-0">{{ i.itemId }}</h6></div>              
              <span class="text-muted">{{i.price}}</span>              
            </li>
          </ul>
          <h2 class="text-center total-price">{{ computedPrice }}{{ price2 }}</h2>
          
        </div>
        <div class="col-md-7 col-lg-8">

          <h4 class="mb-3">주문자 정보</h4>
          <div class="needs-validation" novalidate="">
            <div class="row g-3">
              <div class="col-12"><label for="username" class="form-label">이름</label>
                <div class="input-group has-validation"><input type="text"
                    class="form-control" id="username" placeholder="Username" v-model="state.form.name">
                  <div class="invalid-feedback"> Your username is required. </div>
                </div>
              </div>
              <div class="col-12"><label for="address" class="form-label">주소</label><input type="text"
                  class="form-control" id="address" placeholder="1234 Main St" v-model="state.form.address">
                <div class="invalid-feedback"> Please enter your shipping address. </div>
              </div>
            </div>
            <hr class="my-4">
            <h4 class="mb-3">결제수단</h4>
            <div class="my-3">
              <div class="form-check"><input id="bank" value="bank" name="paymentMethod" type="radio" class="form-check-input"
                   v-model="state.form.payment"><label class="form-check-label" for="bank">bank</label></div>
              <div class="form-check"><input id="card" value="card" name="paymentMethod" type="radio" class="form-check-input"
                v-model="state.form.payment"><label class="form-check-label" for="card">card</label></div>
              
            </div>
            <div class="row gy-3">
              <div class="col-md-6"><label for="cc-name" class="form-label">카드번호</label><input type="text"
                  class="form-control" id="cc-name" v-model="state.form.cardNumber" ><small class="text-muted">Full name as
                  displayed on card</small>
                <div class="invalid-feedback"> Name on card is required </div>
              </div>
              
            </div>
            <hr class="my-4"><button class="w-100 btn btn-primary btn-lg" @click="submit()">결제하기</button>
          </div>
        </div>
      </div>
    </main>
  </div>
  </div>
  
</template>

<script>
import { computed, reactive,watch,ref } from 'vue';
import  axios  from 'axios'
import lib from '@/scripts/lib'

// import store from '@/scripts/store'
import router from '@/scripts/router'

export default {
  setup() {
    const state = reactive({
      items: [],
      form:{
        name:"",
        address:"",
        payment:"",
        cardNumber:"",
        items:"",
      }
    })
    let price2=ref(null)


    const load = () => {
      axios.get("api/cart/items").then(({ data }) => {
        console.log(data)
        state.items = data;
        console.log(state.items)
      })
    }

    const submit= () =>{//submit 시 validation 체크는 프론트에서 해주는게 좋음
      const args = JSON.parse(JSON.stringify(state.form));//parse로 참조값 연결 삭제.
      args.items=JSON.stringify(state.items);// 이 두줄을 쓰지 않고 form을 보냈을경우 items가 없는상태로 보내짐.
      axios.post("api/orders",args).then(() => {
        alert('주문완료되었습니다.')
        router.push({path:"orders"})
        
      })
    }

    load();

    const computedPrice = computed(()=>{//computed는 인자를 받지 않는다. HTTP통신처럼 리소스많이 필요한 로직 안쓴다.
      let result=0;
      for(let i of state.items){
        // result += i.price - i.price * i.discountPer / 100 //discountPer를 불러오지않음.
        console.log(i.price)
        result=+i.price
      }
      return result;//결과값이 nan. state.items undefined가 이유.
    })
 
    watch(()=>state.items,(newVal,oldVal)=>{
      console.log('변화가 감지되었습니다', JSON.stringify(newVal),JSON.stringify(oldVal))
      price2=newVal.price
    })
    return { state, load,submit,computedPrice,price2,lib };
  }

}
</script>

<style scoped>
.order {margin: 5% auto;}
</style>