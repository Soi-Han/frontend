<template>
  <div class="col">
    <div class="card shadow-sm">
      <!-- public = / 뷰는 퍼블릭을 / 로 리졸브. @ = src 뷰는 @를 src로 리졸브 -->
      <span class="img" :style="{ backgroundImage: `url(${itemprops.imgPath})` }"></span>
      <div class="card-body">
        <p class="card-text">{{ itemprops.name }} <span class="discount badge bg-danger ">{{ itemprops.discountPer }}% </span></p> 
        
        <div class="d-flex justify-content-between align-items-center">
          <button type="button" @click.prevent="addToCart(itemprops.id)" class="btn btn-sm btn-outline-secondary"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
          <span class="price text-muted">{{ lib.getNumberFormatted(itemprops.price) }} 원</span>
          
          <span class="real text-primary">{{ lib.getNumberFormatted(Math.round(itemprops.price*0.01*(100-itemprops.discountPer))) }} 원</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lib from "@/scripts/lib" //3수마다 점찍어주는 js코드파일.
import axios from "axios"
import {ref} from 'vue';

export default {
  name: 'Card',
  props:{//props는 절대 child comp에서 수정불가능
    itemprops:Object
  },
  setup(){
    const checkMe=ref(false)
    const addToCart = itemId =>{
      axios.post(`/api/cart/items/${itemId}`).then(({data})=>{console.log('success',data)})
    }

    // () => { if(this.itemprops.isNull()) checkMe.value=true;}
    
    
    return {lib,checkMe, addToCart}
  }
}
</script>

<style scoped>
.card .img{
  display:block;
  width:100%;
  height:250px;
  background-size: cover;
  background-position:center;
  
}
.card .card-body .price{
  text-decoration:line-through;
}


</style>



