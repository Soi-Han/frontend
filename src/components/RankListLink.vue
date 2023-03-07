<template>
  <div class="rankListLinkContainer">
    <div @click="clickList(takeProps.props)"><span>{{itemprops+1}} </span> &nbsp; &nbsp; {{MutatedProps}}</div>
  </div>
    <!-- <p>winename = {{props.winename}}  SalesVolume = {{ props.salesVolume }}</p> -->
</template>

<script setup>

import { defineProps,computed } from 'vue';
import router from "@/scripts/router"

const takeProps=defineProps(['props','itemprops'])

// const itemNum =["1"]
const MutatedProps = computed(() => {
  let prox = takeProps.props.winename.substring(0,takeProps.props.winename.indexOf('('))
  if(prox.lastIndexOf(' ')==-1) return prox
  else{
    if(prox.lastIndexOf(' ',prox.lastIndexOf(' ',prox.lastIndexOf(' ')-1)-1)) return prox
    else return prox
  }
})

// substring(startIndex,endIndex)와 indexof로 '('까지 찾아서 반환

const clickList = (wine) => {
  router.push({path: `/wineview/${wine.number}`,});}




</script>

<style scoped>
@media screen and (min-width:1230px) {
  .search-container > div > ul {padding-left:15px;}
  .tab_menu{position:relative;}
  .tab_menu .list{overflow:hidden;}
  .rankListLinkContainer > div{
    width: 160px;
    height: auto;
    padding: 10px 8px;
    font-size: 14px;
    color: #737373;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .rankListLinkContainer > div > span {
    display: inline-block;
    font-style: italic;
    font-weight: 500;
    color: #b3b3b3;
  }
}
@media screen and (min-width:999px) and (max-width:1230px) {
  .search-container > div > ul {padding-left:15px;}
  .tab_menu{position:relative;}
  .tab_menu .list{overflow:hidden;}
  .rankListLinkContainer > div{
    width: 140px;
    height: auto;
    padding: 10px 0px;
    font-size: 14px;
    color: #737373;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .rankListLinkContainer > div > span {
    display: inline-block;
    margin-left: 5px;
    font-style: italic;
    font-weight: 500;
    color: #b3b3b3;
  }
}

</style>