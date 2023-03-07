<template>
  <div class="cart-container" >
      <h2>장바구니 목록</h2>
      <div class="cart-total">
        <div>총 {{ state.list }} 건</div>
        <router-link to="/order" v-if="state.items.length!=0" class="btn">구입하기</router-link>
      </div>
        <ul v-for="wine in state.items" :key="wine"  class="wine-list">
        <li>
          <div class="wine-img" @click="clickList(wine)" > 
              <img :src="wine.imgPath" >
          </div>
          <div class="list-txt">
            <p>{{ wine.nation }}</p>
            <div class="wine-name" @click="clickList(wine)">
              <p>{{ wine.winenameko }}</p>            
              <p>{{ wine.winenameen }}</p>            
            </div>
            <div class="wine-etc">
              <div class="cart-text">
                <div :class="{red: wine.variety ==='레드', yellow:wine.variety ==='스파클링', blue: wine.variety ==='화이트', rose: wine.variety === '로제'}">
                  {{ wine.variety }}
                </div>
                <p>{{ wine.price }}원(750ml)</p>
              </div>
              <div class="cart-delete" @click="deleteCart(wine.number,wine.winename)"><span>장바구니 삭제</span></div>
            </div>            
          </div>
        </li>        
      </ul>
  </div>

</template>

<script setup>
import { reactive,onBeforeUpdate} from 'vue';
import  axios  from 'axios'
import store from '@/scripts/store'
import router from '@/scripts/router';

onBeforeUpdate( ()=>{})

const state = reactive({
      items: [],
      cartItems:[],
      wineCart: [{ wineId: 0,memberId:0,flag:false}],
      wineIds:[],
      componentKey:0
})

const getWinesFromCart = async ()=>{
  await axios.get("/api/cart/winesincart")//현재 카트에 들어가잇는 모든목록 요청
      .then(({ data }) =>{
      state.wineCart=data
      const uniqueCart =  state.wineCart.filter((wine, idx, arr)=>{
        return arr.findIndex((item) => item.wineId === wine.wineId) === idx})//wineid가 중복되어 들어가있을 때 중복제거
      for(let l in uniqueCart){state.wineIds[l]=uniqueCart[l].wineId} //중복제거후 wineIds에 wineId만 넣음    
      })
      .catch(error=>{console.log(error)})

      await axios.post("/api/cart/wines",state.wineIds)//비동기처리된 axios로 다시 wineIds의 wine들 요청\
      .then(({data})=>{
        state.list = data.length //data row 수(list수)
        for(const item of data){
          item.variety = item.variety.substring(0,item.variety.indexOf('(')); //variety (영문) 제거
          item.producer = item.producer.replace('(', ' ') // '(' 공백으로 치환
          item.producer = item.producer.replace(')','') // ')' 제거
          item.winenameko = item.winename.substring(0,item.winename.indexOf('(')) // 와인한글이름만 추출
          item.winenameen = item.winename.substring(item.winename.indexOf('('),item.winename.indexOf(')')) // 와인영문이름 추출
          item.winenameen = item.winenameen.replace('(','') //와인 영문이름 '(' 제거
          item.price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")//금액(숫자) 3자리마다 , 넣기
        }
        state.items=data;
      })
}
getWinesFromCart();

const deleteCart = async (itemNumber, winenameko)=>{
    const proxyCart = {wineId:itemNumber,memberId:store.getters.getAccountId};
    await axios.post("/api/cart/winesincartdelete", proxyCart)
      .then(({ data }) =>{
      // window.alert(`${winenameko} 삭제되었습니다! ${data}`);
      console.log(data,winenameko)
      })
      .catch(error=>{console.log(error)})
      // console.log(itemNumber,winenameko)
      state.items =  state.items.filter((wine, idx, arr)=> arr.findIndex(wine => wine.number == itemNumber) !== idx)
      // console.log(state.items)
}

const clickList = (wine) => {
  router.push({ path: `/wineview/${wine.number}`})
  
}
 
</script>

<style scoped>
@media screen and (min-width: 600px) {
.cart-container{width:80%; margin:5% auto;}

.cart-total {
  display:flex; justify-content:space-between; align-items:center;
  width:100%; 
  margin-top:10px;
  padding-bottom:10px;
  border-bottom:1px solid #333;
}
.cart-total > div {
  height:40px;
  line-height:60px;
}

.btn{
  width:100px; height:90%;
  color:#fff;
  background:#c70039;
}

/* 와인 리스트*/
.wine-list {margin-top:16px ; padding:0;}
.wine-list li {
  display:flex; justify-content:space-between;
  width:50%;  
  padding:10px 0;
  margin-bottom: 50px;
  border-bottom:1px solid #333;
}
/* 와인사진 */
.wine-img {
  width:130px; 
  height:148px;
  text-align:center;
  line-height:140px;
  margin-right:10px;
  cursor:pointer;
  border: 1px solid rgba(0,0,0,0.1);
}
.wine-img img {
  max-width:100%;
  height:128px;
}
/* 와인 내용 */
.list-txt {
  width:80%;
  padding-left:10px;    
}
.list-txt > p {
  font-family:NotoSansRe;
  margin-bottom:5px; padding-top:5px;
}
/* 와인 이름 */
.wine-name {margin:12px 0; cursor:pointer;}
.wine-name > p {margin:0}
.wine-name > p:first-child {font-size:18px;}
.wine-name > p:last-child {font-family:NotoSansRe;}

/* 와인 내용 기타(종류, 판매수량) */
.wine-etc {
  display:flex;
  justify-content: space-between;
  height:30px;
  margin-top:10px;
}
.wine-etc > div {display:flex;}
.wine-etc > div > p {
  height: 100%;
  line-height: 40px;
  font-size: 14px;
  margin-left: 3px;
}
.cart-text > div {
  margin-right: 5px;
  padding: 0 9px 1px;
  text-align: center;
  line-height: 26px;
  border-radius: 3px;
}
/* 장바구니 */
.cart-delete {
  cursor: pointer;
  width: 120px;
  padding: 2px 0 0 15px;
  margin-right: 20px;
  text-align: center;
  font-size: 15px;
  border-radius: 4px;
  color: #c70039;
  border: 1px solid #c70039;
  background-color: #fff;
  }
}
@media screen and (max-width: 599px) {
  .cart-container{width:90%; margin:5% auto;}

  .cart-total {
    display:flex; justify-content:space-between; align-items:center;
    width:100%; 
    margin-top:10px;
    padding-bottom:10px;
    border-bottom:1px solid #333;
  }
  .cart-total > div {
    height:40px;
    line-height:60px;
  }

  .btn{
    width:100px; height:90%;
    color:#fff;
    background:#c70039;
  }

  /* 와인 리스트*/
  .wine-list {margin-top:16px ; padding:0;}
  .wine-list li {
    display:flex; justify-content:space-between;
    width: 100%;  
    padding:10px 0;
    margin-bottom: 50px;
    border-bottom:1px solid #333;
  }
  /* 와인사진 */
  .wine-img {
    width:130px; 
    height:148px;
    text-align:center;
    line-height:140px;
    margin-right:10px;
    cursor:pointer;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .wine-img img {
    max-width:100%;
    height:128px;
  }
  /* 와인 내용 */
  .list-txt {
    width:80%;
    padding-left:10px;    
  }
  .list-txt > p {
    margin-bottom:5px;
    padding-top:5px;
    font-family:NotoSansRe;
    font-size: 17px;
  }
  /* 와인 이름 */
  .wine-name {margin:12px 0; cursor:pointer;}
  .wine-name > p {margin:0}
  .wine-name > p:first-child {
    font-size: 16px;
  }
  .wine-name > p:last-child {
    font-family: NotoSansRe;
    font-size: 15px;
  }

  /* 와인 내용 기타(종류, 판매수량) */
  .wine-etc {
    display:flex;
    justify-content: space-between;
    height:30px;
    margin-top:10px;
  }
  .wine-etc > div {display:flex;}
  .wine-etc > div > p {
    height: 100%;
    line-height: 30px;
    font-size: 13.5px;
    margin-left: 3px;
  }
  .cart-text > div {
    margin-right: 5px;
    padding: 0 9px 1px;
    text-align: center;
    line-height: 26px;
    font-size: 14.5px;
    border-radius: 3px;
  }
  /* 장바구니 */
  .cart-delete {
    cursor:pointer;
    width: 30px;
    height: 30px;
    color: #fff;
    background: url(@/assets/ico-minuscart.png) no-repeat;
    background-size: cover;
  }
  .wine-etc > .cart-delete > span {
    display: none;
  }
}
</style>