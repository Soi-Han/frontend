<template>
  <div class="clear">
    
    <div class="wineview-banner">
      <div class="banner-img"></div>
    </div>
    <div class="wv-cantainer">
      <a class="btn-gray" @click.prevent="back">목 록</a>
      <div v-for="view in state.orders1" :key="view" class="wv-page" >
        <div class="wine-img">
          <img :src="view.imgPath">
        </div>

        <div class="wv-content">
          <div class="wine-etc">
            <div :class="{red: view.variety ==='레드', yellow:view.variety ==='스파클링', blue: view.variety ==='화이트', rose: view.variety === '로제'}">
              {{ view.variety }}
            </div>
            <div class="wine-nation">
              {{ view.nation }} 
            </div>
          </div>
          <div class="wine-nameko">
            {{ view.winenameko }}
          </div>
          <div class="wine-namemeen"> 
            {{ view.winenameen }}
          </div>
          <div class="price">
            {{ view.priceProxy }}원
            <span>(750ml)</span>
            <p class="comment">※ 수입사가 제공한 가격으로 판매처별로 가격이 다를 수 있습니다.</p>
          </div>
          <div class="filter-container1">
            <span>당도</span>
            <div class="filter-grade">
              <button v-for="i in 5" :key="i" :class="{on:i<=view.sugar}"></button>
            </div>
            <span>산도</span>
            <div class="filter-grade">
              <button v-for="i in 5" :key="i" :class="{on:i<=view.acidity}"></button>
            </div>
          </div>

          <div class="filter-container2">
            <span>바디</span>
            <div class="filter-grade">
              <button v-for="i in 5" :key="i" :class="{on:i<=view.texture}"></button>
            </div>
            <span>타닌</span>
            <div class="filter-grade">
              <button v-for="i in 5" :key="i" :class="{on:i<=view.tannin}"></button>
            </div>
          </div>
          <ul class="matching">
            <li>음식 매칭</li>
            <!-- 향기 -->
            <li :class="{pear: view.scent ==='배', flower:view.scent ==='꽃', vanilla:view.scent ==='바닐라', hazelnuts:view.scent ==='헤이즐넛', soil:view.scent ==='흙', pomegranate:view.scent ==='석류', prune:view.scent ==='자두', strawberry:view.scent ==='체리', apple:view.scent ==='사과', tar:view.scent ==='타르', oak:view.scent ==='오크', orange:view.scent ==='감귤', peach:view.scent ==='복숭아', berry:view.scent ==='딸기'}">
              <span>{{view.scent}}</span>
            </li>
            <!-- 음식 -->
            <li :class="{cow: view.matching ==='스테이크', beefjerky:view.matching ==='육포', cheese:view.matching ==='치즈', bulgogi:view.matching ==='불고기', salmon:view.matching ==='연어', korean:view.matching ==='한식', chinese:view.matching ==='탕수육', desert:view.matching ==='디저트', pyeonyuk:view.matching ==='편육', fish:view.matching ==='해산물', suyuk:view.matching ==='수육', lobster:view.matching ==='랍스터', champagne:view.matching ==='식전주', foiegras:view.matching ==='푸아그라', snak:view.matching ==='스낵', aperitif:view.matching ==='아페리티프', shrimp:view.matching ==='새우', turkey:view.matching ==='칠면조', bibimbap:view.matching ==='비빔밥', sausages:view.matching ==='소시지', bulgogi:view.matching ==='불고기', goiegras:view.matching ==='푸아그라'}">
              <span>{{view.matching}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="wine-wishContainer">
      <button v-if="state.wineCart.flag" type="button" class="btn-wishno" @click="deleteCart(state.orders1[0].number, state.orders1[0].winenameko)">장바구니 삭제</button>
      <button v-else type="button" class="btn-wish" @click="addCart(state.orders1[0].number, state.orders1[0].winenameko)">장바구니 담기</button>
    </div>
  </div>
</template>

<script setup>

// import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import axios from "axios"
import router from '@/scripts/router'
import store from '@/scripts/store'

const route = useRoute()
// onMounted(() => { //route params 값이 잘 넘어 오는지 확인
//   const id = route.params.number
//   console.log(id)
//   console.log(route.params)
// })
const state = reactive({
  orders: [],
  orders1: [],
  level: { sweet: 0, body: 0, acidity: 0, tannin: 0 },
  wineCart: { wineId: 0, memberId: 0, flag: false }
})

const deleteCart = (number, name) => {
  state.wineCart.wineId =  number;
  state.wineCart.memberId = store.getters.getAccount;
  axios.post("/api/cart/winesincartdelete", state.wineCart)
    .then(({ data }) => {
      window.alert(`${name} 삭제되었습니다! ${data}`);
      state.wineCart.flag = false
    })
    .catch(error => { console.log(error) })
}

const addCart = (number, name) => {
  state.wineCart.wineId = number;
  state.wineCart.memberId = store.getters.getAccount;
  if (!state.wineCart.memberId) window.alert("로그인하세요!")
  else {
    axios.post("/api/cart/winesincart", state.wineCart)
      .then(({ data }) => {
        window.alert(`${name} 추가되었습니다! ${data}`);
        state.wineCart.flag = true
      })
      .catch(error => { console.log(error) })
  }
}
      axios.get("/api/wineList", state.form)
      .then(({data}) => { //wines 테이블 전체 데이터 가져오기. 
        // console.log(data[route.params.number -1].winename)
        // console.log(data[route.params.number -1].winename)
        // state.orders.push(data[route.params.number -1]);
        for(const item of data){
          item.variety = item.variety.substring(0,item.variety.indexOf('(')); //variety (영문) 제거
          item.producer = item.producer.replace('(', ' ') // '(' 공백으로 치환
          item.producer = item.producer.replace(')','') // ')' 제거
          item.winenameko = item.winename.substring(0,item.winename.indexOf('(')) // 와인한글이름만 추출
          item.winenameen = item.winename.substring(item.winename.indexOf('('),item.winename.indexOf(')')) // 와인영문이름 추출
          item.winenameen = item.winenameen.replace('(','') //와인 영문이름 '(' 제거
          item.priceProxy = item.price.toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','); //뒷자리 3자리수 콤마(,) 사용
          
          state.orders.push(item); //orders이름의 배열로 지정
        }
        state.orders1.push(state.orders[route.params.number -1])    
        axios.get("/api/cart/winesincart").then((res)=>{
          if(res.data.filter(a=>{return a.wineId==state.orders1[0].number}).length!=0)state.wineCart.flag=true//winesincart를 받아와서 비교후 현재 winenumber가 없다면 true
        })   
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });//api를 만들어두지 않았기때문. route.params를 미리 주어 db에서 검색후 해당 row만 가져오도록 api필요:/api/wineList/{route.params.number}
        
      const back=()=>{
        router.push({path:"/searchpage"})
      }
      
    

</script>

<style scoped>
  /* 공통 */
  /* 맛 선택버튼 색 */
  .filter-grade .on{
    border-color: #fff;
    background-color: #c70039;
  }
  .filter-grade .on:nth-child(1) {opacity:0.25;}
  .filter-grade .on:nth-child(2) {opacity:0.4;}
  .filter-grade .on:nth-child(3) {opacity:0.55;}
  .filter-grade .on:nth-child(4) {opacity:0.75;}
  .filter-grade .on:nth-child(5) {opacity:1;}
@media screen and (min-width:1230px) {
  /* 배너 */
  .wineview-banner{
    display: flex; 
    justify-content: center;
    width: 100%;
    height: 250px;
    background: #f4f4f4;
  }

  .banner-img{
    width: 782px;
    height: 137px;
    margin-top: 70px;
    background: url('@/assets/W0000537.jpg') no-repeat center center;
    background-size: cover;
  }

  /* 상세페이지 본문 */
  .wv-page{
    display:flex;
  }

  /* 전체 컨테이너 */
  .wv-cantainer{
    width: 70%;
    margin: 50px auto;
  }

  /* 목록버튼 */
  .btn-gray{
    margin-bottom: 20px; 
    width: 88px; 
    height: 30px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #999;
    border-radius: 5px;
    background: #999;
    cursor: pointer;
  }
  /* 와인 사진 */
  .wine-img{
    margin-right: 10px;
    border: solid 1px rgba(0,0,0,0.1);
    border-radius: 15px;
    box-shadow: 1.7px 4.7px 10px 0 rgb(0 0 0 / 15%);
    background-color: #fff;
    }
  .wine-img img {
    max-width: 100%;
    height: 500px;
    }
  /* 콘텐츠 */
  .wv-content{
    margin-left: 10%;
  }
  /* 와인 종류 및 국가 */
  .wine-etc {
      display: flex;
      height: 30px;
      margin-top: 10px; 
    }
  /*버튼*/
  .red, .yellow, .blue, .rose{
    height: 30px;
    padding: 0 15px;
    line-height: 28px;
    }
  /* 국가 */
  .wine-nation {
    padding-left: 10px;
    line-height: 30px;
  }
  /* 와인 이름 */
  .wine-nameko{
    padding-top: 15px;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.13;
  }
  .wine-namemeen {
    font-size: 20px;
    color: #737373;
  }
  /* 가격 */
  .price {
    margin: 12px 0 0;
    font-size: 20px;
    color: #999;
  }
  .price span {
    font-size: 18px;
    color: #404040;
  }
  .comment {
    margin: 15px 0 3px;
      font-size: 13px;
      color: #999;  
  }

  /*버튼*/
  .filter-container1, .filter-container2 {display:flex; justify-content: space-between; margin-top: 20px;}
  .filter-container1 span, .filter-container2 span {
    width: 50px;
    margin-right:17px;
    font-size: 16px;
    color: #404040;
  }
  .filter-grade {
    width:200px;
  }
  .filter-grade button {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
      border: solid 1px #ccc;
      border-radius: 50%;
      cursor: default;
    } 
  .filter-grade .on, .filter-grade button{
    margin-left: 9px;
    }
  /* 매칭 */
  .matching{
    padding: 30px 0;
  }
  .matching li:nth-child(2){
    margin: 30px 0 0 -40px;
  }
  .matching li:nth-child(2) span{
    position: absolute;
    top: 80px;
    left: 25%;
    width: 70px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }
  .matching li:last-child{
    margin: 30px 0 0 40px;
  }
  .matching li:nth-child(3) span{
    position: absolute;
    top: 80px;
    left: 20%;
    width: 75px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }

  /* 장바구니 */
  .wine-wishContainer{
    position: relative;
  }
  .btn-wish {
    position: absolute;
    bottom: 100px;
    right:20%;
    width: 160px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #c70039;
  }
  .btn-wishno {
    position: absolute;
    bottom: 100px;
    right:20%;
    width: 160px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #c70039;
    border: #c70039 solid 1px;
    border-radius: 4px;
    background-color: #fff;
  }
}
@media screen and (min-width:1000px) and (max-width:1230px) {
  /* 배너 */
  .wineview-banner{
    display: flex; 
    justify-content: center;
    width: 100%;
    height: 250px;
    background: #f4f4f4;
  }

  .banner-img{
    width: 950px;
    height: 137px;
    margin-top: 70px;
    background: url('@/assets/W0000537.jpg') no-repeat center center;
    background-size: cover;
  }

  /* 상세페이지 본문 */
  .wv-page{
    display:flex;
  }

  /* 전체 컨테이너 */
  .wv-cantainer{
    width: 85%;
    margin: 50px auto;
  }

  /* 목록버튼 */
  .btn-gray{
    margin-bottom: 20px; 
    width: 88px; 
    height: 30px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #999;
    border-radius: 5px;
    background: #999;
    cursor: pointer;
  }
  /* 와인 사진 */
  .wine-img{
    margin-right: 10px;
    border: solid 1px rgba(0,0,0,0.1);
    border-radius: 15px;
    box-shadow: 1.7px 4.7px 10px 0 rgb(0 0 0 / 15%);
    background-color: #fff;
    }
  .wine-img img {
    max-width: 100%;
    height: 500px;
    }
  /* 콘텐츠 */
  .wv-content{
    margin-left: 5%;
  }
  /* 와인 종류 및 국가 */
  .wine-etc {
      display: flex;
      height: 30px;
      margin-top: 10px; 
    }
  /*버튼*/
  .red, .yellow, .blue, .rose{
    height: 30px;
    padding: 0 15px;
    line-height: 28px;
    }
  /* 국가 */
  .wine-nation {
    padding-left: 10px;
    line-height: 30px;
  }
  /* 와인 이름 */
  .wine-nameko{
    padding-top: 15px;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.13;
  }
  .wine-namemeen {
    font-size: 20px;
    color: #737373;
  }
  /* 가격 */
  .price {
    margin: 12px 0 0;
    font-size: 20px;
    color: #999;
  }
  .price span {
    font-size: 18px;
    color: #404040;
  }
  .comment {
    margin: 15px 0 3px;
      font-size: 13px;
      color: #999;  
  }

  /*버튼*/
  .filter-container1, .filter-container2 {display:flex; justify-content: space-between; margin-top: 20px; }
  .filter-container1 span, .filter-container2 span {
    margin-right:17px;
    font-size: 16px;
    color: #404040;
  }
  .filter-grade {
    width: 185px;
  }
  .filter-grade button {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
      border: solid 1px #ccc;
      border-radius: 50%;
      cursor: default;
    } 
  .filter-grade .on, .filter-grade button{
    margin-left: 9px;
    }
  /* 매칭 */
  .matching{
    padding: 30px 0;
  }
  .matching li:nth-child(2){
    margin: 30px 0 0 -40px;
  }
  .matching li:nth-child(2) span{
    position: absolute;
    top: 80px;
    left: 25%;
    width: 70px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }
  .matching li:last-child{
    margin: 30px 0 0 40px;
  }
  .matching li:nth-child(3) span{
    position: absolute;
    top: 80px;
    left: 20%;
    width: 75px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }

  /* 장바구니 */
  .wine-wishContainer{
    position: relative;
  }
  .btn-wish {
    position: absolute;
    bottom: 100px;
    right: 10%;
    width: 160px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #c70039;
  }
  .btn-wishno {
    position: absolute;
    bottom: 100px;
    right:20%;
    width: 160px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #c70039;
    border: #c70039 solid 1px;
    border-radius: 4px;
    background-color: #fff;
  }
}

@media screen and (min-width:600px) and (max-width:1000px) {
  /* 배너 */
  .wineview-banner{
    display: flex; 
    justify-content: center;
    width: 100%;
  }

  .banner-img{
    width: 100%;
    height: 70px;
    margin-top: 30px;
    background: url('@/assets/W0000537_sm.png') no-repeat center center;
    background-size: cover;
  }

  /* 전체 컨테이너 */
  .wv-cantainer{
    width: 100%;
    margin: 100px auto;
  }

  /* 목록버튼 */
  .btn-gray{
    display: inline-block;
    float:right;
    margin: -42px 60px 0 0;
    width: 88px; 
    height: 30px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #999;
    border-radius: 5px;
    background: #999;
    cursor: pointer;
  }
  /* 와인 사진 */
  .wine-img{
    width: 340px;
    height: 500px;
    margin: 0 auto;
    padding: 15px 10px 0;
    border: solid 1px rgba(0,0,0,0.1);
    border-radius: 10px;
    box-shadow: 1.7px 4.7px 10px 0 rgb(0 0 0 / 15%);
    background-color: #fff;
    }
  .wine-img img {
    max-width: 100%;
    height: 440px;
    }
  /* 콘텐츠 */
  .wv-content{
    padding: 0 5%;
  }
  /* 와인 종류 및 국가 */
  .wine-etc {
    display: flex;
    height: 30px;
    margin-top: 30px; 
  }
  /*버튼*/
  .red, .yellow, .blue, .rose{
    height: 30px;
    padding: 0 15px;
    line-height: 28px;
    }
  /* 국가 */
  .wine-nation {
    padding-left: 10px;
    font-size: 14px;
    line-height: 30px;
  }
  /* 와인 이름 */
  .wine-nameko{
    padding-top: 15px;
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
  }
  .wine-namemeen {
    padding-top: 6px;
    line-height: 1.3;
    font-size: 16px;
    color: #737373;
  }
  /* 가격 */
  .price {
    color: #c70039;
    margin: 15px 0 5px;
    font-size: 16px;
  }
  .price span {
    margin: 15px 0 5px;
    font-size: 16px;
    color: #404040;
  }
  .comment {
    width:350px;
    margin: 10px 0 0;
    font-size: 12.5px;
    color: #999;  
  }

  /*버튼*/
  .filter-container1, .filter-container2 {
    display:flex;
    margin-top: 20px; }
  .filter-container1 span, .filter-container2 span {
    display: inline-block;
    font-size: 16px;
    padding: 0;
    color: #404040;
  }
  .filter-grade {
    margin: 2px 15px 0 0;  
  }
  .filter-grade button {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
      border: solid 1px #ccc;
      border-radius: 50%;
      cursor: default;
    } 
  /* 매칭 */
  .matching{
    padding: 30px 0;
  }
  .matching li:nth-child(2){
    margin: 30px 0 0 -40px;
  }
  .matching li:nth-child(2) span{
    position: absolute;
    top: 80px;
    left: 25%;
    width: 70px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }
  .matching li:last-child{
    margin: 30px 0 0 40px;
  }
  .matching li:nth-child(3) span{
    position: absolute;
    top: 80px;
    left: 25%;
    width: 75px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }
  .btn-wish {
    width: 90%;
    height: 60px;
    transform: translateX(5%);
    margin: 50px 0;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #c70039;
  } 
}
@media screen and (max-width:600px) {
  /* 배너 */
  .wineview-banner{
    display: flex; 
    justify-content: center;
    width: 100%;
  }

  .banner-img{
    width: 100%;
    height: 70px;
    margin-top: 30px;
    background: url('@/assets/W0000537_sm.png') no-repeat center center;
    background-size: cover;
  }

  /* 전체 컨테이너 */
  .wv-cantainer{
    width: 100%;
    margin: 100px auto;
  }

  /* 목록버튼 */
  .btn-gray{
    display: inline-block;
    float:right;
    margin: -42px 60px 0 0;
    width: 88px; 
    height: 30px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #999;
    border-radius: 5px;
    background: #999;
    cursor: pointer;
  }
  /* 와인 사진 */
  .wine-img{
    width: 340px;
    height: 500px;
    margin: 0 auto;
    padding: 15px 10px 0;
    border: solid 1px rgba(0,0,0,0.1);
    border-radius: 10px;
    box-shadow: 1.7px 4.7px 10px 0 rgb(0 0 0 / 15%);
    background-color: #fff;
    }
  .wine-img img {
    max-width: 100%;
    height: 440px;
    }
  /* 콘텐츠 */
  .wv-content{
    padding: 0 5%;
  }
  /* 와인 종류 및 국가 */
  .wine-etc {
    display: flex;
    height: 30px;
    margin-top: 30px; 
  }
  /*버튼*/
  .red, .yellow, .blue, .rose{
    height: 30px;
    padding: 0 15px;
    line-height: 28px;
    }
  /* 국가 */
  .wine-nation {
    padding-left: 10px;
    font-size: 14px;
    line-height: 30px;
  }
  /* 와인 이름 */
  .wine-nameko{
    padding-top: 15px;
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
  }
  .wine-namemeen {
    padding-top: 6px;
    line-height: 1.3;
    font-size: 16px;
    color: #737373;
  }
  /* 가격 */
  .price {
    color: #c70039;
    margin: 15px 0 5px;
    font-size: 16px;
  }
  .price span {
    margin: 15px 0 5px;
    font-size: 16px;
    color: #404040;
  }
  .comment {
    width:350px;
    margin: 10px 0 0;
    font-size: 12.5px;
    color: #999;  
  }

  /*버튼*/
  .filter-container1, .filter-container2 {
    display:flex;
    margin-top: 20px; }
  .filter-container1 span, .filter-container2 span {
    display: inline-block;
    font-size: 16px;
    padding: 0;
    color: #404040;
  }
  .filter-grade {
    margin: 2px 15px 0 0;  
  }
  .filter-grade button {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 5px;
      border: solid 1px #ccc;
      border-radius: 50%;
      cursor: default;
    } 
  /* 매칭 */
  .matching{
    padding: 30px 0;
  }
  .matching li:nth-child(2){
    margin: 30px 0 0 -40px;
  }
  .matching li:nth-child(2) span{
    position: absolute;
    top: 80px;
    left: 25%;
    width: 70px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }
  .matching li:last-child{
    margin: 30px 0 0 40px;
  }
  .matching li:nth-child(3) span{
    position: absolute;
    top: 80px;
    left: 25%;
    width: 75px;
    margin-left: -15px;
    font-size: 14px;
    color: #737373;
    text-align: center;
  }
  .btn-wish {
    width: 90%;
    height: 60px;
    transform: translateX(5%);
    margin: 50px 0;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #c70039;
  } 
}
</style>