<template>
  <div class="wine-list-container">
    <div class="wine-box">
      <h4>전체와인</h4>
      <select class="cate-filter" v-model="selection" @change="integratedFilterCheck(state.orders)">
        <option value="최신등록순" selected>최신등록순</option>
        <option value="높은가격순">높은가격순</option>
        <option value="낮은가격순">낮은가격순</option>
        <option value="판매량순">판매량순</option>
      </select>
    </div>
    <div class ="loadingjung" v-if="isLoading"><h1> 로딩중입니다...</h1></div>
    <ul v-for="wine in integratedFilterCheck(state.orders)" :key="wine" class="wine-list">
      <li>
        <div class="wine-img" @click="clickList(wine)">
          <img :src="wine.imgPath" />
        </div>
        <div class="list-txt">
          <p>{{ wine.nation }}</p>
          <div class="wine-name" @click="clickList(wine)">
            <p>{{ wine.winenameko }}</p>
            <p>{{ wine.winenameen }}</p>
          </div>
          <div class="price">{{ wine.priceProxy }}원</div>
          <div class="wine-etc">
            
            <div>
              <div
                :class="{
                  red: wine.variety === '레드',
                  yellow: wine.variety === '스파클링',
                  blue: wine.variety === '화이트',
                  rose: wine.variety === '로제',
                }"
              >
                {{ wine.variety }}
              </div>
              <p>{{ wine.salesVolume }}개 판매 <span></span> </p>
            </div>
            <div>
              <!-- 조건문으로 장바구니에 추가된 항목만 스왑되어 나옴-->
              <div v-if="wine.inCart" class="cart cart-minus" @click.prevent="deleteCart(wine.number, wine.winenameko)"><span>장바구니 삭제</span></div><!--  v-else장바구니 삭제 -->
              <div v-else class="cart cart-add" @click.prevent="addCart(wine.number, wine.winenameko)"><span>장바구니 추가</span></div><!-- v-if="wine!=mypage" 장바구니 추가 -->
            </div>
          </div>

        </div>
      </li>
    </ul>

    <div class="clear"></div>
    <!-- <div>
      <button @click="nextPage" class="next-btn">
        더보기
        <p>{{ state.allwinelist - max }} / {{ state.allwinelist }}</p>
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { reactive,ref } from "vue";
import axios from "axios";
import store from "@/scripts/store";
import router from "@/scripts/router"

const state = reactive({
  testwines: [],
  orders: [],
  orders2: [],
  page: 0,
  allwinelist: 0, //전체 list 수
  wineCart: { wineId: 0, memberId: 0, flag: false }
});
let selection=ref("최신등록순")
const isLoading=ref(true)

// let max = ref(5) // 화면에 표시되는 list 수, 5는 초기값
// const nextPage = () => {
//   max.value = max.value + 5;
// }
const addCart =  (itemNumber, winenameko) => {
  console.log(itemNumber,winenameko)
  state.wineCart.wineId =  itemNumber;
  state.wineCart.memberId = store.getters.getAccount;
  if (!state.wineCart.memberId) window.alert("로그인하세요!")
  else {
    axios.post("/api/cart/winesincart", state.wineCart)
      .then(({ data }) => {
        window.alert(`${winenameko} 추가되었습니다! ${data}`);
        state.wineCart.flag = true
        state.orders=state.orders.map((a)=>{ //현재 state.orders에서 순회하며 메소드의 인자와 같은 id값이면 inCart=true로 바꾸는 메소드
          if(a.number==itemNumber){
            a.inCart=true
            return a
          }
          else return a
        })
      })
      .catch(error => { console.log(error) })
  }

}

const deleteCart =  (itemNumber, winenameko) => {
  state.wineCart.wineId =  itemNumber;
  state.wineCart.memberId = store.getters.getAccount;
  axios.post("/api/cart/winesincartdelete", state.wineCart)
    .then(({ data }) => {
      window.alert(`${winenameko} 삭제되었습니다! ${data}`);
      state.wineCart.flag = false
      state.orders=state.orders.map((a)=>{ //현재 state.orders에서 순회하며 메소드의 인자와 같은 id값이면 inCart=false로 바꾸는 메소드
          if(a.number==itemNumber){
            a.inCart=false
            return a
          }
          else return a
        })
    })
    .catch(error => { console.log(error) })
}
const clickList = (wine) => {
  router.push({
    path: `/wineview/${wine.number}`,
  });
}

axios//전체 리스트 정렬
  .get("/api/wineList", state.form)
  .then(({ data }) => {//wines 테이블 전체 데이터 가져오기
    state.allwinelist = data.length; //data row 수(list수)
    let inCartList=[]

    axios.get("/api/cart/winesincart").then(res=>{//현재 id에 매칭되는 카트리스트를 모두 get.
      for(let l of res.data){
        inCartList.push(l.wineId) 
      }
      inCartList=[...new Set(inCartList)]//inCartList[1,2,3,...] 카트에 담겨있는 와인의 Id만을 중복없이 넣는다.
      for (const item of data) {
        item.variety = item.variety.substring(0, item.variety.indexOf("(")); //variety (영문) 제거
        item.producer = item.producer.replace("(", " "); // '(' 공백으로 치환
        item.producer = item.producer.replace(")", ""); // ')' 제거
        item.winenameko = item.winename.substring(0, item.winename.indexOf("(")); // 와인한글이름만 추출
        item.winenameen = item.winename.substring(item.winename.indexOf("("), item.winename.indexOf(")")
        ); // 와인영문이름 추출
        item.winenameen = item.winenameen.replace("(", ""); //와인 영문이름 '(' 제거
        item.priceProxy = item.price.toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','); //뒷자리 3자리수 콤마(,) 사용

        //start:장바구니 추가.삭제버튼 로딩시 체크
        item.inCart = false//우선 모두 false
        if(store.getters.getAccount!=0){//현재 로그인이 되어있다면.
          if(inCartList.includes(item.number)) item.inCart=true;//카트에 담겨있는 와인 ID배열인 inCartList와 비교해 담겨있으면 true
          else item.inCart = false;//아니면 false
        }
        //end:장바구니 추가.삭제버튼 

        state.orders.push(item); //orders이름의 배열로 지정
      }
      isLoading.value=false
    
    })

  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => { });

// if (store.getters.getAccountId != 0) {
//   axios
//     .get("/api/cart/winesincart")
//     .then(({ data }) => {
//       for (let inCartWine of data) {
//         // 전체 와인 목록에서 카트에 담겨있는 와인을 찾아서
//         let findwine = state.orders.find(wine => { return wine.number == inCartWine.wineId });
//         // 찾아서!!
//         console.log(findwine.number)
//         if (findwine.number) {
//           findwine.inCart = true; // 카트에 담겨있음.
//         }
//       }
//     })
// }

    let integratedFilter=reactive({
        variety:[],winename:'',price:0,price1:0,price2:200000,sugar:0,acidity:0,texture:0,tannin:0,
        // nation:'',matching:'',scent:''
     })
    
     //start:expose to parents component
    // const initIntegratedFilter=()=>{
    //   store.commit('setPrice1',0)
    //   store.commit('setPrice2',200000)
    //   console.log(store.getters.getPrice1,store.getters.getPrice2)
    //   integratedFilterCheck(state.orders)
    //   console.log(1)
    // }
    // defineExpose({
    //   initIntegratedFilter,
    // })
    //end:expose to parents component

    const integratedFilterCheck= list => {//받아온 모든 필터의 적용메소드
      // 동기화 : 해당 페이지의 integratedFilter와 store의 필터를 동기화시키는 작업
      integratedFilter.winename = store.getters.getTestWinename
      integratedFilter.price1 = store.getters.getPrice1
      integratedFilter.price2 = store.getters.getPrice2
      integratedFilter.sugar = store.getters.getSugar
      integratedFilter.acidity = store.getters.getAcidity
      integratedFilter.texture = store.getters.getTexture
      integratedFilter.tannin = store.getters.getTannin
      for(let l of store.getters.getFilter){//매번 스토어에서 다시받는게 아니고 쌓는다. 다시받으려면 해당 object를 이용하고 init해야함
        if(l.isOn==true){//check박스에 체크되었는지 표시하는 isOn이 트루이면 해당 이름을 가져온다.(중복막기위해 2중if문)
          if(!integratedFilter.variety.includes(l.identifier)) integratedFilter.variety.push(l.identifier)}
      }
      // 동기화 : 페이지의 해당 integratedFilter와 store의 필터를 동기화시키는 작업

      //필터링 : if문을 이용한 필터. 동기된 integratedFilter를 list에 적용해 최종 결과목록을 리턴.
      let resultlist=list//result에 list를 복사.
      if(integratedFilter.winename!=''){//==와인이름== 입력칸이 ''이 아니라면 수행. 와인이름으로 필터링
       resultlist=list.filter(wine=>{
        return wine.winename.includes(integratedFilter.winename)})
      }
      if(integratedFilter.variety.length!=0){//==variety== 배열이 0이 아니라면 수행. variety로 필터링
        let departedresultlist=[[],[],[],[],[],[]]//임시배열선언
        let proxyresultlist=[]//임시배열을 concat 해 완성할 임시임시배열 선언
        for(let l of integratedFilter.variety){
          departedresultlist[l]=resultlist.filter(wine=>{
           return wine.variety.includes(l)})
           proxyresultlist=proxyresultlist.concat(departedresultlist[l])
        }
        integratedFilter.variety=[]//매번 전체필터가 실행될때마다 스토어에서 새로 추가받으므로 초기화(초기화 안하면 결과물이 쌓임)
        resultlist=proxyresultlist//resultlist에 임시임시배열 집어넣기.
      }
      if((integratedFilter.price2!=200000) || (integratedFilter.price1!=0)){//==price2==가 20만이 아니고,==price1==가 0이 아닐때 수행
        resultlist=resultlist.filter(wine=>{
           return  integratedFilter.price1<=wine.price&&integratedFilter.price2>=wine.price})
      }
      if(integratedFilter.sugar!=0){//==sugar==가 0이 아닐때 수행
        resultlist=resultlist.filter(wine=>{
          return integratedFilter.sugar==wine.sugar
        })
      }
      if(integratedFilter.tannin!=0){//==sugar==가 0이 아닐때 수행
        resultlist=resultlist.filter(wine=>{
          return integratedFilter.tannin==wine.tannin
        })
      }
      if(integratedFilter.acidity!=0){//==sugar==가 0이 아닐때 수행
        resultlist=resultlist.filter(wine=>{
          return integratedFilter.acidity==wine.acidity
        })
      }
      if(integratedFilter.texture!=0){//==sugar==가 0이 아닐때 수행
        resultlist=resultlist.filter(wine=>{
          return integratedFilter.texture==wine.texture
        })
      }
      //필터링 : if문을 이용한 필터. 동기된 integratedFilter를 list에 적용해 최종 결과목록을 리턴.
      selectOption(resultlist)
      return resultlist
    }
    const selectOption = (orders) => {
      if (selection.value == "최신등록순") {
        orders = orders.sort((a, b) => {return b.number - a.number })
      }
      if (selection.value == "높은가격순") {
        orders = orders.sort((a, b) => {return b.price - a.price })
      }
      if (selection.value == "낮은가격순") {
        orders = orders.sort((a, b) => {return a.price - b.price })
      }
      if (selection.value == "판매량순") {
        orders.sort((a, b) => {return b.salesVolume - a.salesVolume })
      }
    }

</script>

<style scoped>

@media screen and (min-width:1230px) {
/* 전체와인 컨테이너  */
.loadingjung{
  text-align: center;
  margin-top:200px;
  margin-bottom:200px;
}
.wine-list-container {
  width: 80%;
  margin: 0 auto;
}

.wine-box {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #262626;
}

/* 와인 정렬 */
.cate-filter {
  width: 110px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
}

/* 와인 리스트*/
.wine-list {
  margin-top: 30px;
  padding: 0;
}
.wine-list li {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}
/* 와인사진 */
.wine-img {
  width: 130px;
  height: 148px;
  text-align: center;
  line-height: 140px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.wine-img img {
  max-width: 100%;
  height: 128px;
}
/* 와인 내용 */
.list-txt {
  width: 80%;
  padding-left: 10px;
}
.list-txt > p {
  font-family: NotoSansRe;
  margin-bottom: 5px;
  padding-top: 5px;
}
/* 와인 이름 */
.wine-name {
  margin: 12px 0;
  cursor: pointer;
}
.wine-name > p {
  margin: 0;
}
.wine-name > p:first-child {
  font-size: 18px;
}
.wine-name > p:last-child {
  font-family: NotoSansRe;
}
.price {
    margin-left: 200px;
    height: 25px;
    line-height: 35px;
}
/* 와인 내용 기타(종류, 판매수량) */
.wine-etc {
  display: flex; justify-content: space-between;
  height: 30px;
  margin-top: -20px;
}
.wine-etc > div {display:flex;}
.wine-etc > p {
  height: 100%;
  line-height: 40px;
  font-size: 14px;
  margin-left: 3px;
}
.wine-etc div {
  margin-right: 5px;
  padding: 0 9px 1px;
  text-align: center;
  line-height: 26px;
  border-radius: 3px;
}

/* 장바구니  */
.cart {
  cursor:pointer;
  width: 130px;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #c70039;
  }

.cart-add {
  color: #fff;
  background-color: #c70039;
}
.cart-minus {
  color: #c70039;
  border:1px solid #c70039;
  background-color: #fff;
}

/* 더보기 버튼 */
.next-btn {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 50px;
  margin: 20px auto;
  font-size: 20px;
  letter-spacing: 8px;
  line-height: 45px;
  border: 1px #333 solid;
  border-radius: 10px;
}
.next-btn > p {
  letter-spacing: 0px;
  font-size: 15px;
  line-height: 50px;
  margin-left: 10px;
}
}
@media screen and (min-width:999px) and (max-width: 1230px) {
/* 전체와인 컨테이너  */
.loadingjung{
  text-align: center;
  margin-top:200px;
  margin-bottom:200px;
}
.wine-list-container {
  width: 90%;
  margin: 0 auto;
}

.wine-box {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #262626;
}

/* 와인 정렬 */
.cate-filter {
  width: 110px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
}

/* 와인 리스트*/
.wine-list {
  margin-top: 30px;
  padding: 0;
}
.wine-list li {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}
/* 와인사진 */
.wine-img {
  width: 130px;
  height: 148px;
  text-align: center;
  line-height: 140px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.wine-img img {
  max-width: 100%;
  height: 128px;
}
/* 와인 내용 */
.list-txt {
  width: 80%;
  padding-left: 10px;
}
.list-txt > p {
  font-family: NotoSansRe;
  margin-bottom: 5px;
  padding-top: 5px;
}
/* 와인 이름 */
.wine-name {
  margin: 12px 0;
  cursor: pointer;
}
.wine-name > p {
  margin: 0;
}
.wine-name > p:first-child {
  font-size: 18px;
}
.wine-name > p:last-child {
  font-family: NotoSansRe;
}
.price {
    margin-left: 200px;
    height: 25px;
    line-height: 35px;
}
/* 와인 내용 기타(종류, 판매수량) */
.wine-etc {
  display: flex; justify-content: space-between;
  height: 30px;
  margin-top: -20px;
}
.wine-etc > div {display:flex;}
.wine-etc > p {
  height: 100%;
  line-height: 40px;
  font-size: 14px;
  margin-left: 3px;
}
.wine-etc div {
  margin-right: 5px;
  padding: 0 9px 1px;
  text-align: center;
  line-height: 26px;
  border-radius: 3px;
}

/* 장바구니  */
.cart {
  cursor:pointer;
  width: 130px;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #c70039;
  }

.cart-add {
  color: #fff;
  background-color: #c70039;
}
.cart-minus {
  color: #c70039;
  border:1px solid #c70039;
  background-color: #fff;
}

/* 더보기 버튼 */
.next-btn {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 50px;
  margin: 20px auto;
  font-size: 20px;
  letter-spacing: 8px;
  line-height: 45px;
  border: 1px #333 solid;
  border-radius: 10px;
}
.next-btn > p {
  letter-spacing: 0px;
  font-size: 15px;
  line-height: 50px;
  margin-left: 10px;
}
}
@media screen and (min-width:600px) and (max-width:999px) {
/* 전체와인 컨테이너  */
.loadingjung{
  text-align: center;
  margin-top:200px;
  margin-bottom:200px;
}
.wine-list-container {
  width: 90%;
  margin: 0 auto;
}

.wine-box {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #262626;
}

/* 와인 정렬 */
.cate-filter {
  width: 110px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
}

/* 와인 리스트*/
.wine-list {
  margin-top: 30px;
  padding: 0;
}
.wine-list li {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}
/* 와인사진 */
.wine-img {
  width: 130px;
  height: 148px;
  text-align: center;
  line-height: 140px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.wine-img img {
  max-width: 100%;
  height: 128px;
}
/* 와인 내용 */
.list-txt {
  width: 80%;
  padding-left: 10px;
}
.list-txt > p {
  font-family: NotoSansRe;
  margin-bottom: 5px;
  padding-top: 5px;
}
/* 와인 이름 */
.wine-name {
  margin: 12px 0;
  cursor: pointer;
}
.wine-name > p {
  margin: 0;
}
.wine-name > p:first-child {
  font-size: 18px;
}
.wine-name > p:last-child {
  font-family: NotoSansRe;
}
/* .price {
    height: 25px;
    line-height: 35px;
} */
  /* 와인 내용 기타(종류, 판매수량) */
  .wine-etc {
    display: flex;
    justify-content: space-between;
    height: 30px;
    margin-top: 10px;
    margin-left: -5px;
  }
  .wine-etc > div {}
  .wine-etc > p {
    height: 100%;
    line-height: 40px;
    font-size: 14px;
    margin-left: 3px;
  }
  .wine-etc div {
    display:flex;
    margin-right: 5px;
    padding: 0 6px 0;
    font-size: 15px;
    text-align: center;
    line-height: 26px;
    border-radius: 3px;
  }
  .salesvolume {
    font-size: 13px;
  }
  /* 장바구니  */
  .cart {
    cursor:pointer;
    width: 130px;
    line-height: 60px;
    text-align: center;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #c70039;
    }

  .cart-add {
    color: #fff;
    background-color: #c70039;
  }
  .cart-minus {
    color: #c70039;
    border:1px solid #c70039;
    background-color: #fff;
  }
  .cart > span {
    margin: 0 auto;
  }
  /* 더보기 버튼 */
  .next-btn {
    display: none;
  }
  .next-btn > p {
    letter-spacing: 0px;
    font-size: 15px;
    line-height: 50px;
    margin-left: 10px;
  }
}
@media screen and (max-width:600px) {
  /* 전체와인 컨테이너  */
  .loadingjung{
  text-align: center;
  margin-top:100px;
  margin-bottom:100px;
}
  .wine-list-container {
    width: 90%;
    margin: 0 auto;
  }

  .wine-box {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    border-bottom: 1px solid #262626;
  }

  /* 와인 정렬 */
  .cate-filter {
    width: 110px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
  }

  /* 와인 리스트*/
  .wine-list {
    margin-top: 30px;
    padding: 0;
  }
  .wine-list li {
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #333;
  }
  /* 와인사진 */
  .wine-img {
    width: 130px;
    height: 148px;
    text-align: center;
    line-height: 140px;
    margin-right: 10px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .wine-img img {
    max-width: 100%;
    height: 128px;
  }
  /* 와인 내용 */
  .list-txt {
    width: 80%;
    padding-left: 10px;
  }
  .list-txt > p {
    font-family: NotoSansRe;
    margin-bottom: 5px;
    padding-top: 5px;
    font-size: 15px;
  }
  /* 와인 이름 */
  .wine-name {
    margin: 12px 0;
    cursor: pointer;
  }
  .wine-name > p {
    margin: 0;
  }
  .wine-name > p:first-child {
    font-size: 17px;
  }
  .wine-name > p:last-child {
    font-family: NotoSansRe;
    font-size: 16px;
  }
  /* 와인 내용 기타(종류, 판매수량) */
  .wine-etc {
    display: flex;
    justify-content: space-between;
    height: 30px;
    margin-top: 10px;
    margin-left: -5px;
  }
  .wine-etc > div {}
  .wine-etc > p {
    height: 100%;
    line-height: 40px;
    font-size: 14px;
    margin-left: 3px;
  }
  .wine-etc div {
    display:flex;
    margin-right: 5px;
    padding: 0 6px 0;
    font-size: 15px;
    text-align: center;
    line-height: 26px;
    border-radius: 3px;
  }
  .salesvolume {
    font-size: 13px;
  }
  /* 장바구니  */

  .cart {
    cursor:pointer;
    width: 30px;
    height: 30px;
    text-align: center;
    }
  .cart > span {display: none;}
  .cart-add {
    color: #fff;
    background: url(@/assets/ico-minuscart.png) no-repeat;
    background-size: cover;
  }
  .cart-minus {
    color: #fff;
    background: url(@/assets/ico-addcart.png) no-repeat;
    background-size: cover;
  }

  /* 더보기 버튼 */
  .next-btn {
    display: none;
  }
  .next-btn > p {
    letter-spacing: 0px;
    font-size: 15px;
    line-height: 50px;
    margin-left: 10px;
  }
}
</style>
