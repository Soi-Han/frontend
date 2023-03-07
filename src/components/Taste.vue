<template>
  <div class="taste">
    <ul>
      <li>
        <span>당도</span>
        <div class="filter-grade" >
          <button :class="{on:colorChk('sugar', 1)}" @click="taste('sugar', 1)"></button>
          <button :class="{on:colorChk('sugar', 2)}" @click="taste('sugar', 2)"></button>
          <button :class="{on:colorChk('sugar', 3)}" @click="taste('sugar', 3)"></button>
          <button :class="{on:colorChk('sugar', 4)}" @click="taste('sugar', 4)"></button>
          <button :class="{on:colorChk('sugar', 5)}" @click="taste('sugar', 5)"></button>
        </div>
      </li>
      <li>
        <span>산도</span>
        <div class="filter-grade">
          <button :class="{on:colorChk('acidity', 1)}" @click="taste('acidity', 1)"></button>
          <button :class="{on:colorChk('acidity', 2)}" @click="taste('acidity', 2)"></button>
          <button :class="{on:colorChk('acidity', 3)}" @click="taste('acidity', 3)"></button>
          <button :class="{on:colorChk('acidity', 4)}" @click="taste('acidity', 4)"></button>
          <button :class="{on:colorChk('acidity', 5)}" @click="taste('acidity', 5)"></button>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <span>바디</span>
        <div class="filter-grade">
          <button :class="{on:colorChk('texture', 1)}" @click="taste('texture', 1)"></button>
          <button :class="{on:colorChk('texture', 2)}" @click="taste('texture', 2)"></button>
          <button :class="{on:colorChk('texture', 3)}" @click="taste('texture', 3)"></button>
          <button :class="{on:colorChk('texture', 4)}" @click="taste('texture', 4)"></button>
          <button :class="{on:colorChk('texture', 5)}" @click="taste('texture', 5)"></button>
        </div>
      </li>
      <li>
        <span>타닌</span>
        <div class="filter-grade">
          <button :class="{on:colorChk('tannin', 1)}" @click="taste('tannin', 1)"></button>
          <button :class="{on:colorChk('tannin', 2)}" @click="taste('tannin', 2)" ></button>
          <button :class="{on:colorChk('tannin', 3)}" @click="taste('tannin', 3)"></button>
          <button :class="{on:colorChk('tannin', 4)}" @click="taste('tannin', 4)"></button>
          <button :class="{on:colorChk('tannin', 5)}" @click="taste('tannin', 5)"></button>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import store from '@/scripts/store'
export default{
  data(){
    return{    
      level: {sugar: 0, texture: 0, acidity: 0, tannin:0},
    }
  },
  methods: {
    taste(filter, lv){
      this.level[filter] = lv
      if(filter=='sugar')store.commit('setSugar',lv)
      if(filter=='tannin')store.commit('setTannin',lv)
      if(filter=='texture')store.commit('setTexture',lv)
      if(filter=='acidity')store.commit('setAcidity',lv)
    },
    colorChk(filter, lv) {
      return lv <= this.level[filter]
    },
  }
}
</script>

<style scoped>
@media screen and (min-width: 1230px) {
/* 맛 선택  */
.taste ul {
    float:left;
    width:100%;
    padding:0;
  }
  .taste ul li {
    display:flex;
    justify-content:space-between;
    padding-left: 10px;
  }

  .filter-grade button {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: 5px;
    border: solid 1px #ccc;
    border-radius: 50%;
  }
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
}
@media screen and (min-width: 1000px) and (max-width: 1229px) {
/* 맛 선택  */
.taste ul {
    float:left;
    width:100%;
    padding:0;
  }
  .taste ul li {
    display:flex;
    justify-content:space-between;
    padding-left: 0;
  }
  .taste ul li:last-child{
    padding-left: 10px;
  }
  .filter-grade button {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: 5px;
    border: solid 1px #ccc;
    border-radius: 50%;
  }
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
}
@media screen and (min-width:601px) and (max-width: 999px) {
  .taste ul {
    float:left;
    width:100%;
    padding:0;
  }
  .taste ul li {
    display: flex;
    justify-content: space-between;
    padding-left: 5%;
  }
  .filter-grade {
    margin-left: 30px;
  }
  .filter-grade button {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: 5px;
    border: solid 1px #ccc;
    border-radius: 50%;
  }
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
}
@media screen and (max-width: 600px) {
  .taste ul {
    float:left;
    width:100%;
    padding:0;
  }
  .taste ul li {
    display: flex;
    justify-content: space-between;
    padding-left: 5%;
  }
  .filter-grade {
    margin-left: 20px;
  }
  .filter-grade button {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-left: 5px;
    border: solid 1px #ccc;
    border-radius: 50%;
  }
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
}
</style>