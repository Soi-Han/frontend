<template>
    <div class="filterBox">
            <!-- <input type="checkbox" > label-->
            <label class="filterlable" @click="redBorderToggle" >{{ itemprops.identifier }}</label>
    </div>
    <div ref="root"></div>
</template>

<script setup>
import {ref,defineProps,reactive,defineEmits} from 'vue';
import store from '@/scripts/store'


const takeProps=defineProps(['itemprops'])
const propsName=ref(takeProps.itemprops.identifier)
const emit = defineEmits(['forwatch'])



    const root = ref(null)
    let integratedFilter=reactive({
        variety:'',winename:'',price:[],sugar:0,acidity:0,texture:0,tannin:0
        // ,scent:'',salesVolume:0,matching:[],nation:[]
    })
        
    
    const redBorderToggle = (e) => {
      if (e.target.style.border.includes('1px solid rgb(199, 0, 57)')) {//만약 빨간색이면
        e.target.style.border = '1px solid #ccc'//회색으로 바꾸고
        e.target.style.color = '#000'//검정 글씨로 바꾸고
        store.commit('setFilterFalse', e.target.innerHTML)//스토어의 Category에 null을 input

        integratedFilter.variety='(delete)'+propsName.value
        // store.commit('setIntegratedFilter',integratedFilter)//스토어에 현재 props의 variety에 delete를 붙여 보내고 스토어에서 체크해 삭제
      }
      else {//회색이면
        e.target.style.border = '1px solid #c70039'//빨간색으로 바꾸고
        e.target.style.color = '#c70039'//빨간 글씨로 바꾸고
        store.commit('setFilterTrue', e.target.innerHTML)//스토어의 Category에 {{ itemprops }} 를 input. innerHTML로 이름만 
   
        integratedFilter.variety=propsName.value
        // store.commit('setIntegratedFilter',integratedFilter)//현재 props의 variety를 스토어에 저장한다.
      }
      emit('forwatch');//forwatch를 emit하고있다. 버튼 클릭할 때 위의 과정들이 수행되고 상위 컴포넌트에서 forwatch에 해당하는 isChangedIntegratedFilter가 실행되고있다.

    }
    
</script>

<style scoped>
@media screen and (min-width:1230px){
  /* input{
    display:none;
  } */
  .filterlable{
    width: 150px;
    height: 26px;
    margin: 5px;
    border-radius: 26px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    cursor: pointer;
  }
}
@media screen and (min-width:999px) and (max-width:1230px){
  /* input{
    display:none;
  } */
  .filterlable{
    width: 130px;
    height: 26px;
    margin: 5px;
    border-radius: 26px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    cursor: pointer;
  }
}
@media screen and (min-width:600px) and (max-width:999px) {
  .filterlable{
    width: 175px;
    height: 26px;
    margin: 5px;
    border-radius: 26px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    cursor: pointer;
  }
}
@media screen and (max-width: 600px) {
  /* input{
    display:none;
  } */
  .filterlable{
    width: 150px;
    height: 26px;
    margin: 5px;
    border-radius: 26px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>



