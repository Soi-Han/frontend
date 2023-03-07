<template>
  <article>
    <div class="invbox"></div>
    <div class="wine-container">
      <!-- 배너 -->
      <div class="benner">
        <div class="benner-img"></div>
        <div class="search-filter">
          <input
            type="text"
            v-model="state.searchWineByName"
            @keyup="commitAll()"
            placeholder="와인검색"
            autofocus
          />
          <!--필터 클릭시 새로운 트랜잭션-->
          <button @click="visible = !visible">
          </button>
          <transition>
           <div v-if="visible">
            <!--필터 클릭시 들어갈 내용-->
            <!-- 검색 필터 -->
            <div class="filterContainer">
              <div class="filter clear">
                <div @click="router.go()">전체초기화</div>
                <button @click="visible = !visible">
                  닫기
                </button>
              </div>
              <div class="filter-box"></div>

              <!-- 금액 슬라이더 -->
              <div>
                <Slider></Slider>
              </div>

              <!-- 와인 종류 -->
              <div class="wine-type clear">
                <h3>종류</h3>
                <ul class="filterList">
                  <div class="fliterListContainer">
                    <li><CheckBox :itemprops="state.filterData[0]"> </CheckBox></li>
                    <li><CheckBox :itemprops="state.filterData[1]"> </CheckBox></li>
                    <li><CheckBox :itemprops="state.filterData[2]"> </CheckBox></li>
                    <li><CheckBox :itemprops="state.filterData[3]"> </CheckBox></li>
                    <li><CheckBox :itemprops="state.filterData[4]"> </CheckBox></li>
                    <li><CheckBox :itemprops="state.filterData[5]"> </CheckBox></li>
                  </div>
                </ul>
              </div>

              <!-- 맛 선택 -->
              <div class="clear">
                <h3>맛</h3>
                <Taste></Taste>
              </div>
            </div>
          </div><!--트랜잭션 끝-->
          </transition>
        </div>
      </div>

      <!-- 와인 종류(좌측영역) -->
      <div class="allwine">
        <WineList></WineList>
      </div>

      <!-- 와인 검색(우측영역) -->
      <div class="search">
        <div class="search-container">
          <!-- 랭킹 -->
          <div class="ranking-container">
            <!-- <h3>인기순위</h3> -->
            <div class="tab_menu">
              <ul class="list">
                <li class="is_on">
                  <a
                    href="#tab1"
                    class="btn"
                    :class="{ on: topList == 1 }"
                    @click="select1"
                    >TOP 10</a
                  >
                </li>
                <li>
                  <a
                    href="#tab2"
                    class="btn"
                    :class="{ on: topList == 2 }"
                    @click="select2"
                    >TOP 20</a
                  >
                </li>
                <li>
                  <a
                    href="#tab3"
                    class="btn"
                    :class="{ on: topList == 3 }"
                    @click="select3"
                    >TOP 30</a
                  >
                </li>
              </ul>
              <!-- 1~10 -->
              <div v-if="topList == 1">
                <ul class="rank-box">
                  <li v-for="(l, idx) in statee.itemsCopy1" :key="l">
                    <RankListLink :props="l" :itemprops="idx"></RankListLink>
                  </li>

                  <li v-for="(l, idx) in statee.itemsCopy2" :key="l">
                    <RankListLink :props="l" :itemprops="idx + 5"></RankListLink>
                  </li>
                </ul>
              </div>
              <!-- 10~20 -->
              <div v-if="topList == 2">
                <ul class="rank-box">
                  <li v-for="(l, idx) in statee.itemsCopy3" :key="l">
                    <RankListLink :props="l" :itemprops="idx + 10"></RankListLink>
                  </li>

                  <li v-for="(l, idx) in statee.itemsCopy4" :key="l">
                    <RankListLink :props="l" :itemprops="idx + 15"></RankListLink>
                  </li>
                </ul>
              </div>
              <!-- 20~30 -->
              <div v-if="topList == 3">
                <ul class="rank-box">
                  <li v-for="(l, idx) in statee.itemsCopy5" :key="l">
                    <RankListLink :props="l" :itemprops="idx + 20"></RankListLink>
                  </li>

                  <li v-for="(l, idx) in statee.itemsCopy6" :key="l">
                    <RankListLink :props="l" :itemprops="idx + 25"></RankListLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 검색 필터 -->
          <div class="filter clear">
            <span>
              <div class="filter-img"></div>
              <p>필터</p>
            </span>
            <div @click="router.go()">전체초기화</div>
          </div>
          <div class="filter-box"></div>

          <!-- 금액 슬라이더 -->
          <div>
            <Slider></Slider>
          </div>

          <!-- 와인 종류 -->
          <div class="wine-type clear">
            <h3>종류</h3>
            <ul class="filterList">
              <div class="fliterListContainer">
                <li><CheckBox :itemprops="state.filterData[0]"> </CheckBox></li>
                <li><CheckBox :itemprops="state.filterData[1]"> </CheckBox></li>
                <li><CheckBox :itemprops="state.filterData[2]"> </CheckBox></li>
                <li><CheckBox :itemprops="state.filterData[3]"> </CheckBox></li>
                <li><CheckBox :itemprops="state.filterData[4]"> </CheckBox></li>
                <li><CheckBox :itemprops="state.filterData[5]"> </CheckBox></li>
              </div>
            </ul>
            <!-- <button class= "imtest" @click="testStoreGetters">Store 테스트예요</button> -->
          </div>

          <!-- 맛 선택 -->
          <div class="clear">
            <h3>맛</h3>
            <Taste></Taste>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import CheckBox from "@/components/CheckBox.vue";
import Slider from "@/components/TwoHandSlider.vue";
import RankListLink from "@/components/RankListLink.vue";
import WineList from "@/components/WineList.vue";
import Taste from "@/components/Taste.vue";
import store from "@/scripts/store";
import router from "@/scripts/router";

let topList = ref(1);

// const thisValue = ref(50);
const select1 = () => {
  topList.value = 1;
};
const select2 = () => {
  topList.value = 2;
};
const select3 = () => {
  topList.value = 3;
};
const state = reactive({
  searchWineByName: "",
  filterData: [
    { id: 1, identifier: "레드", isOn: false },
    { id: 2, identifier: "화이트", isOn: false },
    { id: 3, identifier: "스파클링", isOn: false },
    { id: 4, identifier: "로제", isOn: false },
    { id: 5, identifier: "주정강화", isOn: false },
    { id: 6, identifier: "기타와인", isOn: false },
  ],
});

const statee = reactive({
  items: [],
  itemsCopy1: [],
  itemsCopy2: [],
  itemsCopy3: [],
  itemsCopy4: [],
  itemsCopy5: [],
  itemsCopy6: [],
});
axios.get("/api/wineList").then(({ data }) => {
  statee.items = data;
  statee.items.sort((x, y) => y.salesVolume - x.salesVolume);
  statee.itemsCopy1 = statee.items.splice(0, 5);
  statee.itemsCopy2 = statee.items.splice(0, 5);
  statee.itemsCopy3 = statee.items.splice(0, 5);
  statee.itemsCopy4 = statee.items.splice(0, 5);
  statee.itemsCopy5 = statee.items.splice(0, 5);
  statee.itemsCopy6 = statee.items.splice(0, 5);
  // console.log(JSON.stringify(statee.itemsCopy1))
});

const commitAll = () => {
  //입력받을때마다 @change로 실행하여 store에 커밋.
  store.commit("setWinename", state.searchWineByName);
};

// const testStoreGetters = () => console.log(store.getters.getFilter);

// const goUrl = () => {
//   //this.$router.push("/menu01/exam01view");
//   router.push({ path: "/WineList.vue" });
//   //this.$router.push({name: "menu01_exam01view"});

//   //현재 경로와 동일한 경로로 화면 이동 시 발생하는 예외 처리 코드
//   router.push({ path: "/WineList.vue" }).catch(() => {});
// };

// 내보낸 자식 컴포넌트 함수를 호출한다. 내보낼때 ref 같이 내보내줘야하므로 child 선언해서 component 사용시에 내보냈다.
// const child = ref("");
// function initIntegratedFilter1() {
//   child.value.initIntegratedFilter();
// }
const visible= ref(false);

</script>

<style scoped>
@media screen and (min-width:1230px) {
  .filterContainer {display: none;}
  /* 그리드 위 박스 */
  .invbox {
    width: 100%;
    height: 70px;
  }

  /* 그리드 시작 */
  .wine-container {
    margin: 0 auto;
    padding: 0 10px;
    max-width: 1300px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 200px auto 100px;
  }

  /* 그리드 아이템 속성 지정 */
  .benner {
    grid-row: 1 / 2;
  }
  .allwine {
    grid-row: 2 / 3;
    margin-top: 50px;
  }
  .search {
    grid-row: 1 / 3;
  }

  /* 배너 및 검색버튼 */
  .benner-img {
    width: 80%;
    height: 60%;
    margin: 15px auto;
    background: url("@/assets/wine.gif") no-repeat center center;
    background-size: cover;
  }
  .benner input {
    display: block;
    width: 80%;
    height: 30px;
    margin: 25px auto;
    padding-left: 15px;
    color: #000;
    border: none;
    border-radius: 3px;
    background: gainsboro;
  }
  .benner input:focus {
    outline: 1px solid #d50000;
  }
  .search-filter > button {
    display: none;
  }

  /* 랭킹 */

  .rank-box {
    width: 100%;
    height: 250px;
  }  
  .ranking-container ul {
    padding-left: 0;
  }
  /* .is_on {float:left;list-style:none;} */

  /* 탭버튼 */
  .tab_menu .list li {
    float: left;
    width: 33%;
    margin-bottom: 10px;
    color: #595959;
    text-align: center;
    border: solid 1px #e5e5e5;
    background-color: #f5f5f5;
  }
  .tab_menu .list li:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .tab_menu .list li:nth-child(2) {
    border-radius: 0;
  }
  .tab_menu .list li:last-child {
    border-top-left-radius: 0x;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-end-end-radius: 5px;
  }
  .tab_menu .list .btn {
    width: 100%;
    font-size: 13px;
  }

  /* 탭버튼 클릭시 변경 */
  .on {
    background: #c70039;
    color: #fff;
  }

  /* 검색필터 */
  .search-container {
    height: 100%;
    padding: 0 40px 40px;
    border-left: 1px solid #333;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    height: 45px;
    margin-bottom: 15px;
    padding: 0 0 15px;
    border-bottom: 2px solid #e6e6e6;
  }
  
  .filter > div {
    width: 90px;
    height: 28px;
    color: #FFF;
    text-align: center;
    background:#c70039;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter span {
    display: flex;
  }
  .filter-img {
    width: 16px;
    height: 17px;
    margin: 5px;
    background: url("@/assets/ico-filter.png");
  }
  .filter p {
    margin: 0 auto;
  }

  /* 검색 박스 */
  .filter-box {
    padding-bottom: 40px;
    border-bottom: 1px solid #ebebeb;
  }

  .search-container h3 {
    padding: 40px 0 15px;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  /* 와인 종류 */
  .filterList {
    padding: 0;
  }
}
@media screen and (min-width:999px) and (max-width: 1230px) {
  .filterContainer {display: none;}
  /* 그리드 위 박스 */
  .invbox {
    width: 100%;
    height: 70px;
  }

  /* 그리드 시작 */
  .wine-container {
    margin: 0 auto;
    padding: 0 10px;
    max-width: 1229px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 200px auto 100px;
  }

  /* 그리드 아이템 속성 지정 */
  .benner {
    grid-row: 1 / 2;
  }
  .allwine {
    grid-row: 2 / 3;
    margin-top: 50px;
  }
  .search {
    grid-row: 1 / 3;
  }

  /* 배너 및 검색버튼 */
  .benner-img {
    width: 90%;
    height: 60%;
    margin: 15px auto;
    background: url("@/assets/wine.gif") no-repeat center center;
    background-size: cover;
  }
  .benner input {
    display: block;
    width: 90%;
    height: 30px;
    margin: 25px auto;
    padding-left: 15px;
    color: #000;
    border: none;
    border-radius: 3px;
    background: gainsboro;
  }
  .benner input:focus {
    outline: 1px solid #d50000;
  }
  .search-filter > button {
    display: none;
  }

  /* 랭킹 */

  .rank-box {
    width: 100%;
    height: 250px;
  }  
  .ranking-container ul {
    padding-left: 0;
  }
  /* .is_on {float:left;list-style:none;} */

  /* 탭버튼 */
  .tab_menu .list li {
    float: left;
    width: 33%;
    margin-bottom: 10px;
    color: #595959;
    text-align: center;
    border: solid 1px #e5e5e5;
    background-color: #f5f5f5;
  }
  .tab_menu .list li:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .tab_menu .list li:nth-child(2) {
    border-radius: 0;
  }
  .tab_menu .list li:last-child {
    border-top-left-radius: 0x;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-end-end-radius: 5px;
  }
  .tab_menu .list .btn {
    width: 100%;
    font-size: 13px;
  }

  /* 탭버튼 클릭시 변경 */
  .on {
    background: #c70039;
    color: #fff;
  }

  /* 검색필터 */
  .search-container {
    height: 100%;
    padding: 0 20px 40px;
    border-left: 1px solid #333;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    height: 45px;
    margin-bottom: 15px;
    padding: 0 0 15px;
    border-bottom: 2px solid #e6e6e6;
  }
  
  .filter > div {
    width: 90px;
    height: 28px;
    color: #FFF;
    text-align: center;
    background:#c70039;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter span {
    display: flex;
  }
  .filter-img {
    width: 16px;
    height: 17px;
    margin: 5px;
    background: url("@/assets/ico-filter.png");
  }
  .filter p {
    margin: 0 auto;
  }

  /* 검색 박스 */
  .filter-box {
    padding-bottom: 40px;
    border-bottom: 1px solid #ebebeb;
  }

  .search-container h3 {
    padding: 40px 0 15px;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  /* 와인 종류 */
  .filterList {
    padding: 0;
  }
}
@media screen and (min-width:600px) and (max-width: 999px) {
  /* 그리드 위 박스 */
  .invbox {
    width: 100%;
    height: 60px;
  }

  /* 그리드 시작 */
  .wine-container {
    margin: 10px auto 70px;
    padding: 0 10px;
    max-width: 1300px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 200px auto;
  }

  /* 그리드 아이템 속성 지정 */
  .benner {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
  .allwine {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    margin-top: 30px;
  }
  .search {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    margin-top: 35px;
  }

  /* 배너 및 검색버튼 */
  .benner-img {
    width: 90%;
    height: 60%;
    margin: 10px auto;
    background: url("@/assets/wine.gif") no-repeat center center;
    background-size: cover;
  }
  .search-filter {
    display: flex;
    width: 90%;
    height: 30px;
    margin: 20px auto;
  }
  .search-filter input {
    display: block;
    width: 90%;
    height: 30px;
    margin: 0;
    padding-left: 15px;
    color: darkgrey;
    border: none;
    border-radius: 3px;
    background: gainsboro;
  }
  .search-filter input:focus {
    outline: 1px solid #d50000;
  }
  .search-filter > button {
    width: 25px;
    height: 25px;
    margin: auto;
    border: 0;
    background: url("@/assets/ico-filter.png") no-repeat center center;
    background-size: cover;
  }

  /* 검색필터 */
  .search {
    display: none;
  }
  /* #test{display:none;} */
  .search {
    width: 100%;
    height: 100vh;
    background: #fff;
    z-index: 1;
  }
  .search-container {
    height: 100%;
    padding: 40px 40px 40px;
    border-left: 1px solid #333;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    height: 45px;
    margin-bottom: 15px;
    padding: 0 0 15px;
    border-bottom: 2px solid #e6e6e6;
  }
  .filter span {
    display: flex;
  }
  .filter-img {
    width: 16px;
    height: 17px;
    background: url("@/assets/ico-filter.png") no-repeat center center;
  }
  .filter p {
    margin: 0 auto;
  }

  /* 검색 박스 */
  .filter-box {
    padding-bottom: 40px;
    border-bottom: 1px solid #ebebeb;
  }

  .search-container h3 {
    padding: 40px 0 15px;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  /* 와인 종류 */
  .filterList {
    padding: 0;
  }

  /* 필터 클릭시 생성 */
  .enter-from, .leave-to {
    opacity: 0;
  }
  .enter-active, .leave-active {
    transition: opacity 2s ease;
  }
  /* 핕터 클릭시 생성 창*/
  .filterContainer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 480px;
    background:#FFF;
    z-index:9;
  }
  .filterContainer h3 {
    margin-left: 5%;
  }
  .filter {padding:10px 30px;}
  .filter > div {
    width: 90px;
    height: 28px;
    color: #FFF;
    text-align: center;
    background:#c70039;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter > button {
    height: 28px;
    line-height: 28px;
    border: 0;
    background: #FFF;
  }
  .fliterListContainer {
    width: 600px;
    margin: 5px;
    padding: 0 20px;
  }
}
@media screen and (max-width:600px) {
  /* 그리드 위 박스 */
  .invbox {
    width: 100%;
    height: 60px;
  }

  /* 그리드 시작 */
  .wine-container {
    margin: 10px auto 70px;
    padding: 0 10px;
    max-width: 1300px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 200px auto;
  }

  /* 그리드 아이템 속성 지정 */
  .benner {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
  .allwine {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    margin-top: 30px;
  }
  .search {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    margin-top: 35px;
  }

  /* 배너 및 검색버튼 */
  .benner-img {
    width: 90%;
    height: 60%;
    margin: 10px auto;
    background: url("@/assets/wine.gif") no-repeat center center;
    background-size: cover;
  }
  .search-filter {
    display: flex;
    width: 90%;
    height: 30px;
    margin: 20px auto;
  }
  .search-filter input {
    display: block;
    width: 90%;
    height: 30px;
    margin: 0;
    padding-left: 15px;
    color: darkgrey;
    border: none;
    border-radius: 3px;
    background: gainsboro;
  }
  .search-filter input:focus {
    outline: 1px solid #d50000;
  }
  .search-filter > button {
    width: 25px;
    height: 25px;
    margin: auto;
    border: 0;
    background: url("@/assets/ico-filter.png") no-repeat center center;
    background-size: cover;
  }

  /* 검색필터 */
  .search {
    display: none;
  }
  /* #test{display:none;} */
  .search {
    width: 100%;
    height: 100vh;
    background: #fff;
    z-index: 1;
  }
  .search-container {
    height: 100%;
    padding: 40px 40px 40px;
    border-left: 1px solid #333;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    height: 45px;
    margin-bottom: 15px;
    padding: 0 0 15px;
    border-bottom: 2px solid #e6e6e6;
  }
  .filter span {
    display: flex;
  }
  .filter-img {
    width: 16px;
    height: 17px;
    background: url("@/assets/ico-filter.png") no-repeat center center;
  }
  .filter p {
    margin: 0 auto;
  }

  /* 검색 박스 */
  .filter-box {
    padding-bottom: 40px;
    border-bottom: 1px solid #ebebeb;
  }

  .search-container h3 {
    padding: 40px 0 15px;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  /* 와인 종류 */
  .filterList {
    padding: 0;
  }

  /* 필터 클릭시 생성 */
  .enter-from, .leave-to {
    opacity: 0;
  }
  .enter-active, .leave-active {
    transition: opacity 2s ease;
  }
  /* 핕러 클릭시 생성 창*/
  .filterContainer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 480px;
    background:#FFF;
    z-index:9;
  }
  .filterContainer h3 {
    margin-left: 5%;
  }
  .filter {padding:10px 30px;}
  .filter > div {
    width: 90px;
    height: 28px;
    color: #FFF;
    text-align: center;
    background:#c70039;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter > button {
    height: 28px;
    line-height: 28px;
    border: 0;
    background: #FFF;
  }
  .fliterListContainer {
    padding: 0 20px;
  }
}

</style>
