<template>
  <div class="main-dk clear">
        <div class='main-item'>
        <p><span>STACK</span></p>
            <ul class='main-view'>
                <li>
                    <div class="icoContainer">
                        <div class="ico-3s"></div>
                        <div class="ico-node"></div>
                        <div class="ico-vue"></div>
                        <div class="ico-java"></div>
                        <div class="ico-springboot"></div>
                        <div class="ico-jpa"></div>
                        <div class="ico-sql"></div>
                        <div class="ico-aws"></div>
                        <div class="ico-ec2"></div>      
                    </div>
                </li>
            </ul>
        </div>
        <div class='main-item'>
            <p><span>주요 기능</span></p>
            <ul class='main-view'>
                <li>
                    <div class="function">
                        <div><span>선택 검색</span> 기능</div>
                        <div><span>정렬</span> 기능</div>
                        <div><span>Member</span> 기능</div>
                        <div><span>장바구니</span> 기능</div>
                        <div><span>APP-API</span> 기능</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class='main-item'>
            <p><span>기획 의도</span></p>
            <ul class='main-view'>
                <li>
                    <div class="plan">
                      <div>다양한 사용자의 <span>니즈</span>에 따른 <span>선택적 기능 검색</span>을 구현.</div>
                      <div> winesellar 사이트인 <a href="https://www.wine21.com/"> Wine21</a>의 "검색 페이지"를 <span>Vue3</span> 사용하여 빌드.(디자인만 참조)</div>
                      <div><span>Media Query</span> : 스마트폰 사용자 환경을 제공.</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class='main-item'>
            <p><span>TEAM</span></p>
            <ul class='main-view'>
                <li class="main-team">
                  <div class="name">
                    <div>NAME</div>
                    <div>이지훈</div>
                    <div>유양선</div>
                    <div>한소이</div>
                    <div>이국제</div>
                  </div>
                  <div class="border"></div>
                  <div class="border-wd"></div>
                  <div class="position">
                    <div>POSITION</div>
                    <div>PM</div>
                    <div>FRONT-END</div>
                    <div>FRONT-END</div>
                    <div>BACK-END</div>
                  </div>
                </li>
            </ul>
        </div>
        <div class="main-item-collect"></div>
    </div>
    <div class="main-sm clear">
    <swiper class="mySwiper"
    :autoplay="false">
    <swiper-slide>STACK
      <div class="swiperSkill">
        <div class="icoContainer">
          <div class="ico-3s"></div>
          <div class="ico-node"></div>
          <div class="ico-vue"></div>
          <div class="ico-java"></div>
          <div class="ico-vue"></div>
          <div class="ico-springboot"></div>
          <div class="ico-jpa"></div>
          <div class="ico-sql"></div>
          <div class="ico-aws"></div>
          <div class="ico-ec2"></div>      
        </div>        
      </div>
    </swiper-slide>
    <swiper-slide>주요 기능
      <div class="swiperSkill">
        <div class="function">
          <div><span>선택 검색</span> 기능</div>
          <div><span>정렬</span> 기능</div>
          <div><span>Member</span> 기능</div>
          <div><span>장바구니</span> 기능</div>
          <div><span>APP-API</span> 기능</div>
        </div>    
      </div>
    </swiper-slide>
    <swiper-slide>기획 의도
      <div class="swiperSkill">
        <div class="plan">
          <div>다양한 사용자의 <span>니즈</span>에 따른 <span>선택적 기능 검색</span>을 구현.</div>
          <div> winesellar 사이트인 <a href="https://www.wine21.com/"> Wine21</a>의 "검색 페이지"를 <span>Vue3</span> 사용하여 빌드.(디자인만 참조)</div>
          <div><span>Media Query</span> : 스마트폰 사용자 환경을 제공.</div>
        </div>         
      </div>
    </swiper-slide>
    <swiper-slide>TEAM
      <div class="swiperSkill">
        <div class="name">
          <div>NAME</div>
          <div>이지훈</div>
          <div>유양선</div>
          <div>한소이</div>
          <div>이국제</div>
        </div>
        <div class="border"></div>
        <div class="border-wd"></div>
        <div class="position">
          <div>POSITION</div>
          <div>FRONT-END</div>
          <div>FRONT-END</div>
          <div>FRONT-END</div>
          <div>BACK-END</div>
        </div>        
      </div>
    </swiper-slide>
  </swiper>
</div>
  </template>
  <script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";



export default {
  name: 'App',
  components: {
    Swiper,
    SwiperSlide,
  },
}
  </script>
  <style scoped> 
a{color:rgba(0, 0, 255, 0.753)}
@media screen and (min-width: 1230px) {
  .main-sm{
    display: none;
  }
  .main-dk {
  position: relative;
  width: 90%;
  margin: 100px auto 50px;
  height: 570px;
  border-radius: 10px;
  box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
  }
  .main-dk.active {
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    }
    .main-item {
    float: left;
    width: 25%;
    height: 570px;
    text-align: center;
    font-size: 14px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .main-item:first-child {
    border-radius: 10px 0 0 10px;
  }
  .main-item:nth-child(2), .main-item:nth-child(3) {
    border-radius: 10px 0 0 0;
  }
  .main-item:nth-child(4) {
    border-radius: 0 0 10px 0;
  }
  .main-item > p {
    position: relative;
    height: 80px;
 
    color: #FFF;
    background-color: #c70039
  }
  .main-item > p > span{
    display: block;
    height: 80px;
    margin: 0 auto;
    font-size: 24PX;
    line-height: 80px;
    color: #FFF;
    background-repeat: no-repeat;
  }
  .main-item:nth-child(1) > p {border-radius:10px 0 0 0;}
  .main-item:nth-child(4) > p {border-radius:0 10px 0 0;}

  .main-item ul {
    position: relative;
    top: 0;
    background: #fff;
    z-index: 99;
  }
  /* 스택 */
  .icoContainer {
    position: absolute;
    top: 0;
    left: 50%;
    width:180px;
    margin-left: -90px;
  }
  .ico-3s {
    top: 20px; width:180px; height:80px; background:url('@/assets/ico-3s.png') no-repeat center center; background-size: cover;
  }
  .ico-node {
    position:absolute;
    top: 90px; width:180px; height:80px; background:url('@/assets/ico-node.png') no-repeat center center; background-size: cover;
  }
  .ico-vue{
    position:absolute; right:0;
    top: 180px; width:90px; height:80px; background:url('@/assets/ico-vue.png') no-repeat center center; background-size: cover;
  }
  .ico-java {
    position:absolute;
    top: 180px; width:90px; height:80px; background:url('@/assets/ico-java.png') no-repeat center center; background-size: cover;
  }
  .ico-springboot {
    position:absolute;
    top: 270px; width:180px; height:80px; background:url('@/assets/ico-springboot.png') no-repeat center center; background-size: contain;
  }


  .ico-aws {
    position:absolute;
    top: 355px; width:90px; height:80px; background:url('@/assets/ico-aws.png') no-repeat center center; background-size: contain;
  }
  .ico-ec2{
    position:absolute; right: 0;
    top: 355px; width:90px; height:80px; background:url('@/assets/ico-ec2.png') no-repeat center center; background-size: contain;
  }
/* 기능 */
  .function {
    position: absolute;
    top: 0;
    left: 50%;
    width: 165px;
    margin-left: -82.5px;
    font-size: 24px;
  }
  .function div:nth-child(2){
    padding: 20px 0;
  }
  .function div:nth-child(4){
    padding: 20px 0;
  }
  .function span {
    font-size: 25px;
    color: #c70039;
  }
  /* 플랜 */
  .plan {
    position: absolute;
    top: 0;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    font-size: 24px;
  }
  .plan div:nth-child(2) {
  padding: 20px 0;
  }
  .plan div:first-child span {
    font-size: 25px;
    color: #c70039;
  }
  .plan div:nth-child(2) span {
    font-size: 20px;
  }
  .plan div:nth-child(2) span:nth-child(2) {
    font-size: 25px;
    color: #c70039;
  }
  .plan div:nth-child(3) span {
    font-size: 25px;
    color: #c70039;
  }
  /*멤버*/
  .name {
    position: absolute;
    top: 0;
    left: 7%;
    font-size: 22px;
  }
  .position {
    position: absolute;
    top: 0;
    left: 47%;
    font-size: 22px;
  }
  .border {
    position: absolute;
    top: 230px;
    left: -140px;
    width: 490px;
    transform: rotate(90deg);
  }
  .border-wd {
    position: absolute;
    top:-15px;
    left:0;
    width: 100%;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left: none;
    border-right: none;
  }
  .name div:nth-child(2), .position div:nth-child(2) {
    padding-top: 30px;
  }
  .name div:nth-child(3),.name div:nth-child(4), .name div:last-child {
    padding-top:20px;
  }
  .position div:nth-child(3),.position div:nth-child(4), .position div:last-child {
    padding-top: 20px;
  }
}
@media screen and (min-width:999px) and (max-width:1230px) {
  .main-dk {display: none;}
  /* swiper-slide */
  .swiper-slide{
    width: 350px; 
    height: 525px;
    margin-top: 25px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }
  .mySwiper {
    margin: 100px auto 50px;
    width: 350px;
    height: 550px;
    background: #c70039;
    border-radius: 20px;
  }
  .swiperSkill {
    width: 100%;
    height: 464px;
    margin-top: 25px;
    padding: 20px;
    border: 1px solid #c70039;
    background: #FFF;
    border-radius: 0 0 20px 20px;
  }
  /* STACK */
  .icoContainer {
    width:350px;
  }
  .ico-3s {
    position:absolute; width:150px; height:80px; background:url('@/assets/ico-3s.png') no-repeat center center; background-size: contain;
  }
  .ico-node {
    position:absolute; right: 20px;
    width:150px; height:80px; background:url('@/assets/ico-node.png') no-repeat center center; background-size: cover;
  }
  .ico-java {
    position: absolute;
    top: 195px;
    width: 90px;
    height: 80px;
    background: url('@/assets/ico-java.png') no-repeat center center;
    background-size: cover;
  }
  .ico-vue { 
    position:absolute; right: 20px;
    top: 195px; width:90px; height:80px; background:url('@/assets/ico-vue.png') no-repeat center center; background-size: contain;
  }
  
  .ico-sql {
    position:absolute; left:130px;
    top: 195px; width:90px; height:80px; background:url('@/assets/ico-sql.png') no-repeat center center; background-size: contain;
  }
  .ico-springboot {
    position:absolute; right:20px;
    top: 300px; width:150px; height:80px; background:url('@/assets/ico-springboot.png') no-repeat center center; background-size: contain;
  }
  .ico-jpa {
    position:absolute; 
    top: 300px; width:150px; height:80px; background:url('@/assets/ico-jpa.png') no-repeat center center; background-size: cover;
  }
  
  .ico-aws {
    position:absolute; 
    top: 390px; width:150px; height:80px; background:url('@/assets/ico-aws.png') no-repeat center center; background-size: cover;
  } 
  .ico-ec2{
    position:absolute; right: 20px;
    top: 390px; width:150px; height:80px; background:url('@/assets/ico-ec2.png') no-repeat center center; background-size: contain;
  }
  /* 기능 */
  .function {
    font-size: 18px;
  }
  .function div:nth-child(2){
    padding: 20px 0;
  }
  .function div:nth-child(4){
    padding: 20px 0;
  }
  .function span {
    font-size: 25px;
    color: #c70039;
  }
  /* 플랜 */
  .plan {
    font-size: 18px;
    text-align: center;
  }

  .plan div:first-child span {
    font-size: 20px;
    color: #c70039;
  }
  .plan div:nth-child(2) {
    padding: 20px 0;
  }
  .plan div:nth-child(2) span {
    font-size: 16px;
  }
  .plan div:nth-child(2) span:nth-child(2) {
    font-size: 20px;
    color: #c70039;
  }
  .plan div:nth-child(3) span {
    font-size: 20px;
    color: #c70039;
  }
  /* 멤버 */
.name {
    position: absolute;
    top: 75px;
    left: 7%;
    font-size: 22px;
  }
  .position {
    position: absolute;
    top: 75px;
    right: 18%;
    font-size: 22px;
  }
  .border {
    position: absolute;
    bottom: 162px;
    left: -190px;
    width: 600px;
    transform: rotate(90deg);
  }
  .border-wd {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left: none;
    border-right: none;
  }
  .name div:nth-child(2), .position div:nth-child(2) {
    padding-top: 30px;
  }
  .name div:nth-child(3),.name div:nth-child(4), .name div:last-child {
    padding-top:20px;
  }
  .position div:nth-child(3),.position div:nth-child(4), .position div:last-child {
    padding-top: 20px;
  }
}
@media screen and (min-width:600px) and (max-width:999px) {
  .main-dk {display: none;}
  /* swiper-slide */
  .swiper-slide{
    width: 350px; 
    height: 525px;
    margin-top: 25px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }
  .mySwiper {
    margin: 50px auto;
    width: 350px;
    height: 550px;
    background: #c70039;
    border-radius: 20px;
  }
  .swiperSkill {
    width: 100%;
    height: 464px;
    margin-top: 25px;
    padding: 20px;
    border: 1px solid #c70039;
    background: #FFF;
    border-radius: 0 0 20px 20px;
  }
  /* STACK */
  .icoContainer {
    width:350px;
  }
  .ico-3s {
    position:absolute; width:150px; height:80px; background:url('@/assets/ico-3s.png') no-repeat center center; background-size: contain;
  }
  .ico-node {
    position:absolute; right: 20px;
    width:150px; height:80px; background:url('@/assets/ico-node.png') no-repeat center center; background-size: cover;
  }
  .ico-java {
    position: absolute;
    top: 195px;
    width: 90px;
    height: 80px;
    background: url('@/assets/ico-java.png') no-repeat center center;
    background-size: cover;
  }
  .ico-vue { 
    position:absolute; right: 20px;
    top: 195px; width:90px; height:80px; background:url('@/assets/ico-vue.png') no-repeat center center; background-size: contain;
  }
  
  .ico-sql {
    position:absolute; left:130px;
    top: 195px; width:90px; height:80px; background:url('@/assets/ico-sql.png') no-repeat center center; background-size: contain;
  }
  .ico-springboot {
    position:absolute; right:20px;
    top: 300px; width:150px; height:80px; background:url('@/assets/ico-springboot.png') no-repeat center center; background-size: contain;
  }
  .ico-jpa {
    position:absolute; 
    top: 300px; width:150px; height:80px; background:url('@/assets/ico-jpa.png') no-repeat center center; background-size: cover;
  }
  
  .ico-aws {
    position:absolute; 
    top: 390px; width:150px; height:80px; background:url('@/assets/ico-aws.png') no-repeat center center; background-size: cover;
  } 
  .ico-ec2{
    position:absolute; right: 20px;
    top: 390px; width:150px; height:80px; background:url('@/assets/ico-ec2.png') no-repeat center center; background-size: contain;
  }
  /* 기능 */
  .function {
    font-size: 18px;
  }
  .function div:nth-child(2){
    padding: 20px 0;
  }
  .function div:nth-child(4){
    padding: 20px 0;
  }
  .function span {
    font-size: 25px;
    color: #c70039;
  }
  /* 플랜 */
  .plan {
    font-size: 18px;
    text-align: center;
  }

  .plan div:first-child span {
    font-size: 20px;
    color: #c70039;
  }
  .plan div:nth-child(2) {
    padding: 20px 0;
  }
  .plan div:nth-child(2) span {
    font-size: 16px;
  }
  .plan div:nth-child(2) span:nth-child(2) {
    font-size: 20px;
    color: #c70039;
  }
  .plan div:nth-child(3) span {
    font-size: 20px;
    color: #c70039;
  }
  /* 멤버 */
.name {
    position: absolute;
    top: 75px;
    left: 7%;
    font-size: 22px;
  }
  .position {
    position: absolute;
    top: 75px;
    right: 18%;
    font-size: 22px;
  }
  .border {
    position: absolute;
    bottom: 162px;
    left: -190px;
    width: 600px;
    transform: rotate(90deg);
  }
  .border-wd {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left: none;
    border-right: none;
  }
  .name div:nth-child(2), .position div:nth-child(2) {
    padding-top: 30px;
  }
  .name div:nth-child(3),.name div:nth-child(4), .name div:last-child {
    padding-top:20px;
  }
  .position div:nth-child(3),.position div:nth-child(4), .position div:last-child {
    padding-top: 20px;
  }
}
@media screen and (max-width: 600px) {
  .main-dk {display: none;}
  /* swiper-slide */
  .swiper-slide{
    width: 350px; 
    height: 525px;
    margin-top: 25px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }
  .mySwiper {
    margin: 100px auto 50px;
    width: 350px;
    height: 550px;
    background: #c70039;
    border-radius: 20px;
  }
  .swiperSkill {
    width: 100%;
    height: 464px;
    margin-top: 25px;
    padding: 20px;
    border: 1px solid #c70039;
    background: #FFF;
    border-radius: 0 0 20px 20px;
  }
  /* STACK */
  .icoContainer {
    width:350px;
  }
  .ico-3s {
    position:absolute; width:150px; height:80px; background:url('@/assets/ico-3s.png') no-repeat center center; background-size: contain;
  }
  .ico-node {
    position:absolute; right: 20px;
    width:150px; height:80px; background:url('@/assets/ico-node.png') no-repeat center center; background-size: cover;
  }
  .ico-java {
    position: absolute;
    top: 195px;
    width: 90px;
    height: 80px;
    background: url('@/assets/ico-java.png') no-repeat center center;
    background-size: cover;
  }
  .ico-vue { 
    position:absolute; right: 20px;
    top: 195px; width:90px; height:80px; background:url('@/assets/ico-vue.png') no-repeat center center; background-size: contain;
  }
  
  .ico-sql {
    position:absolute; left:130px;
    top: 195px; width:90px; height:80px; background:url('@/assets/ico-sql.png') no-repeat center center; background-size: contain;
  }
  .ico-springboot {
    position:absolute; right:20px;
    top: 300px; width:150px; height:80px; background:url('@/assets/ico-springboot.png') no-repeat center center; background-size: contain;
  }
  .ico-jpa {
    position:absolute; 
    top: 300px; width:150px; height:80px; background:url('@/assets/ico-jpa.png') no-repeat center center; background-size: cover;
  }
  
  .ico-aws {
    position:absolute; 
    top: 390px; width:150px; height:80px; background:url('@/assets/ico-aws.png') no-repeat center center; background-size: cover;
  } 
  .ico-ec2{
    position:absolute; right: 20px;
    top: 390px; width:150px; height:80px; background:url('@/assets/ico-ec2.png') no-repeat center center; background-size: contain;
  }
  /* 기능 */
  .function {
    font-size: 18px;
  }
  .function div:nth-child(2){
    padding: 20px 0;
  }
  .function div:nth-child(4){
    padding: 20px 0;
  }
  .function span {
    font-size: 25px;
    color: #c70039;
  }
  /* 플랜 */
  .plan {
    font-size: 18px;
    text-align: center;
  }

  .plan div:first-child span {
    font-size: 20px;
    color: #c70039;
  }
  .plan div:nth-child(2) {
    padding: 20px 0;
  }
  .plan div:nth-child(2) span {
    font-size: 16px;
  }
  .plan div:nth-child(2) span:nth-child(2) {
    font-size: 20px;
    color: #c70039;
  }
  .plan div:nth-child(3) span {
    font-size: 20px;
    color: #c70039;
  }
  /* 멤버 */
.name {
    position: absolute;
    top: 75px;
    left: 7%;
    font-size: 22px;
  }
  .position {
    position: absolute;
    top: 75px;
    right: 18%;
    font-size: 22px;
  }
  .border {
    position: absolute;
    bottom: 162px;
    left: -190px;
    width: 600px;
    transform: rotate(90deg);
  }
  .border-wd {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left: none;
    border-right: none;
  }
  .name div:nth-child(2), .position div:nth-child(2) {
    padding-top: 30px;
  }
  .name div:nth-child(3),.name div:nth-child(4), .name div:last-child {
    padding-top:20px;
  }
  .position div:nth-child(3),.position div:nth-child(4), .position div:last-child {
    padding-top: 20px;
  }
}
  </style>