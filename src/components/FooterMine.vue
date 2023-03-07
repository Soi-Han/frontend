<template>
  <footer>
  <aside class='main-bottom-links inner rel'>
    <div class='footer-side'>
      <ul class='sns-link'>
        <li class='sns-blog'><a href='https://blog.naver.com/wine21com' target='_blank'></a></li>
        <li class='sns-instagram'><a href='https://www.instagram.com/wine21_korea/' target='_blank'></a></li>
        <li class='sns-facebook'><a href='https://www.facebook.com/Wine21/' target='_blank'></a></li>
        <li class='sns-youtube'><a href='https://www.youtube.com/channel/UCiiHbM5xmLO6Vxr-KwDkKpQ' target='_blank'></a></li>
      </ul>
      <div class='info-tel'>
        <p class='txt'>와인 관련 정보문의/행사문의</p>
        <p class='tel'><a href='tel:031-0000-0001'>031.000.0001</a></p>
      </div>
    </div>

    <ul class='footer-link'>
      <li><a href='/17_company/company_introduction.html'>회사소개</a></li>
      <li><a href='/17_company/company_service.html'>회원사서비스안내</a></li>
      <li><a href='/17_company/company_service.html'>광고제휴안내</a></li>
      <li><a href='/17_company/company_terms.html'>이용약관</a></li>
      <li><a href='/17_company/company_privacy.html'>개인정보처리방침</a></li>
    </ul>
    <div class='footer-info'>
      <p><span>㈜와인22닷컴</span><span>대표이사 : 한소이</span><span>사업자등록번호 : 010-08-590801</span><span>와인22미디어 인터넷신문등록번호 : 서울특별시 아99999</span><span>등록연월일 : 2023.02.28</span></p>
      <p><span>주소 : 경기도 용인시 기흥구 신구로12번길 32 씨케이솔루션빌딩 3층</span><span>개인정보 관리책임자 : 한소이</span><span>청소년보호책임자 : 한소이</span><span>발행.편집인 : 한소이</span></p>
    </div>
    <p class='copyright'>Copyright &copy; WINE22.COM. All rights reserved since 2023</p>
  </aside>
  <!-- end .main-bottom-links -->
  </footer>
</template>

<script>
export default {
  name: 'Footer-Han',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (min-width:1230px){
  footer{
    position:relative; 
    padding:40px 0;
    color:#fff;
    font-size:16px;
    line-height:1.6;
    background:#262626;
  }
  footer p {
    padding-left:30px;
    font-size: 13px;}
  .main-bottom-links {
    padding-right:10px;
  }
  /* 푸터 링크 */
  .footer-link{
    overflow:hidden;
    margin-bottom:20px;
    }

  .footer-link li{
    display:inline-block;
  }
  .footer-link li + li:before{
    content:''; display:inline-block; width:1px; height:16px; margin:0 15px;
    background:#4d4d4d; vertical-align:middle;
  }
  .footer-link li a{
    display: inline-block;
    color: #fff; 
    text-decoration: none; 
    outline: 0;
  }
    /* 푸터 인포*/
  .footer-info{
    padding-right: 400px;
    color: #999;
    font-weight: 100;
    line-height: 15px;
  }
  .footer-info span{
    display:inline-block; 
    margin-left: 10px;
  }
  /* 푸터 오른쪽 영역 */
  .footer-side{
    position:absolute;
    right:0; top:0;
  }
  /* sns */
  .sns-link{
    overflow:hidden;
    margin:60px 0 0 -30px;
  }
  .sns-link li{
    float: left;
    border-radius: 4px;
    overflow: hidden;
  }
  .sns-link li + li{
    margin-left:10px;
  }
  /* sns 이미지 */
  .sns-link li a{
    display: block;
    width: 34px;
    height: 34px;
    border-radius: 4px;
  }
  /* sns */
  .sns-instagram{
    background:url('@/assets/instagram-bg.png') 50% no-repeat;
    background-size:cover
  }
  .sns-instagram a{
    background:url('@/assets/ico-instagram.png') 50% no-repeat;
  }
  .sns-blog a{
    background:#2db400 url('@/assets/ico-naver-blog.png') 50% no-repeat
  }
  .sns-facebook a{
    background:#355189 url('@/assets/ico-facebook.png') 50% no-repeat
  }
  .sns-youtube a{
    background:#d32f2a url('@/assets/ico-youtube.png') 50% no-repeat
  }
  /* 연락처 */
  .info-tel{
    position: relative;
    padding: 0px 30px 0 0px;
    color: #fff;
  }
  .info-tel:before{
    position: absolute; 
    content: '';
    left: 0; 
    top: 30px; 
    width: 52px; 
    height: 52px;
    border-radius: 50%;
  }
  .info-tel .txt{
    position: relative;
    top: 30px;
    left: 35px;
    font-size: 11px;
    line-height: normal;
  }
  .info-tel .tel{
    padding: 20px 0 0 60px;
    font-size:30px; font-weight:bold;line-height:normal; font-family: 'Times New Roman', Times, serif;
    background:url('@/assets/ico-tel.png') no-repeat;
  }
  .info-tel .tel a {
    color: #fff;
  }
  /* 카피라이터 */
  .copyright{
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #999;
  }
}
@media screen and (min-width:999px) and (max-width:1230px){
  footer{
    position:relative; 
    padding:40px 0;
    color:#fff;
    font-size:16px;
    line-height:1.6;
    background:#262626;
  }
  footer p {
    padding-left:30px;
    font-size: 13px;}
  .main-bottom-links {
    padding-right:10px;
  }
  /* 푸터 링크 */
  .footer-link{
    overflow:hidden;
    margin-bottom:20px;
    }

  .footer-link li{
    display:inline-block;
  }
  .footer-link li + li:before{
    content:''; display:inline-block; width:1px; height:16px; margin:0 15px;
    background:#4d4d4d; vertical-align:middle;
  }
  .footer-link li a{
    display: inline-block;
    color: #fff; 
    text-decoration: none; 
    outline: 0;
  }
    /* 푸터 인포*/
  .footer-info{
    padding-right: 400px;
    color: #999;
    font-weight: 100;
    line-height: 15px;
  }
  .footer-info span{
    display:inline-block; 
    margin-left: 10px;
  }
  /* 푸터 오른쪽 영역 */
  .footer-side{
    position:absolute;
    right:0; top:0;
  }
  /* sns */
  .sns-link{
    overflow:hidden;
    margin:60px 0 0 -30px;
  }
  .sns-link li{
    float: left;
    border-radius: 4px;
    overflow: hidden;
  }
  .sns-link li + li{
    margin-left:10px;
  }
  /* sns 이미지 */
  .sns-link li a{
    display: block;
    width: 34px;
    height: 34px;
    border-radius: 4px;
  }
  /* sns */
  .sns-instagram{
    background:url('@/assets/instagram-bg.png') 50% no-repeat;
    background-size:cover
  }
  .sns-instagram a{
    background:url('@/assets/ico-instagram.png') 50% no-repeat;
  }
  .sns-blog a{
    background:#2db400 url('@/assets/ico-naver-blog.png') 50% no-repeat
  }
  .sns-facebook a{
    background:#355189 url('@/assets/ico-facebook.png') 50% no-repeat
  }
  .sns-youtube a{
    background:#d32f2a url('@/assets/ico-youtube.png') 50% no-repeat
  }
  /* 연락처 */
  .info-tel{
    position: relative;
    padding: 0px 30px 0 0px;
    color: #fff;
  }
  .info-tel:before{
    position: absolute; 
    content: '';
    left: 0; 
    top: 30px; 
    width: 52px; 
    height: 52px;
    border-radius: 50%;
  }
  .info-tel .txt{
    position: relative;
    top: 30px;
    left: 35px;
    font-size: 11px;
    line-height: normal;
  }
  .info-tel .tel{
    padding: 20px 0 0 60px;
    font-size:30px; font-weight:bold;line-height:normal; font-family: 'Times New Roman', Times, serif;
    background:url('@/assets/ico-tel.png') no-repeat;
  }
  .info-tel .tel a {
    color: #fff;
  }
  /* 카피라이터 */
  .copyright{
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #999;
  }
}
@media screen and (min-width:600px) and (max-width:999px){
  footer{
    position: relative; 
    padding: 40px 20px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background: #262626;
  }
  footer ul{
    padding: 0;
  }
  .footer-side {
    position: relative;
    right: 0;
  }
  /* sns */
  .sns-link{
    display: inline-block;
    overflow: hidden;
    padding: 0;
  }
  .sns-link li{
    float: left;
    border-radius: 4px;
    overflow: hidden;
  }
  .sns-link li + li{
    margin-left:10px;
  }
  /* sns 이미지 */
  .sns-link li a{
    display: block;
    width: 34px;
    height: 34px;
    border-radius: 4px;
  }
  /* sns */
  .sns-instagram{
    background:url('@/assets/instagram-bg.png') 50% no-repeat;
    background-size:cover
  }
  .sns-instagram a{
    background:url('@/assets/ico-instagram.png') 50% no-repeat;
  }
  .sns-blog a{
    background:#2db400 url('@/assets/ico-naver-blog.png') 50% no-repeat
  }
  .sns-facebook a{
    background:#355189 url('@/assets/ico-facebook.png') 50% no-repeat
  }
  .sns-youtube a{
    background:#d32f2a url('@/assets/ico-youtube.png') 50% no-repeat
  }
  /* 푸터 정보 */
  .footer-info {
    padding: 0 20px;
    margin : 0;
    font-size: 13px;
  }
  .footer-info * {
    color: #999;
  }
  .footer-info span {
    padding-right: 10px;
  }
  /* 푸터 링크 */
  .footer-link {
    overflow: hidden;
    width: 515px;
    margin: 20px auto;
  }
  .footer-link li{
    display: inline-block;
    font-size: 14px;
  }
  .footer-link li + li:before{
  content:''; display:inline-block; width:1px;height:14px; margin:0 15px;
  background:#4d4d4d; vertical-align:middle;
  }
  .footer-link li a{
    display: inline-block;
    color: #fff;
    text-decoration: none; 
    outline:0;
  }
  /* 푸터 연락처 */
  .info-tel .txt{
    margin: 0;
    font-size: 15px;
  }
  .info-tel:before { display: none; }
  .info-tel .tel { 
    height: auto;
    margin-top: -30px;
    padding-left: 24px;
    font-size: 26px;
  }
  .info-tel .tel:before { 
    display: inline-block;
    position: relative;
    top: 44px;
    right: 100px;
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 50%; 
    background:url('@/assets/ico-tel.png') no-repeat; 
    background-size: 100%;}
  .info-tel .tel * { color: #fff; }
  /* 카피라이터 */
  .copyright {
    font-size:13px; color:#999
  }
}
@media screen and (max-width:600px){
  footer{
    position: relative; 
    padding: 40px 20px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background: #262626;
  }
  .footer-side {
    position: relative;
    right: 0;
  }
  /* sns */
  .sns-link{
    display: inline-block;
    overflow: hidden;
    padding: 0;
  }
  .sns-link li{
    float: left;
    border-radius: 4px;
    overflow: hidden;
  }
  .sns-link li + li{
    margin-left:10px;
  }
  /* sns 이미지 */
  .sns-link li a{
    display: block;
    width: 34px;
    height: 34px;
    border-radius: 4px;
  }
  /* sns */
  .sns-instagram{
    background:url('@/assets/instagram-bg.png') 50% no-repeat;
    background-size:cover
  }
  .sns-instagram a{
    background:url('@/assets/ico-instagram.png') 50% no-repeat;
  }
  .sns-blog a{
    background:#2db400 url('@/assets/ico-naver-blog.png') 50% no-repeat
  }
  .sns-facebook a{
    background:#355189 url('@/assets/ico-facebook.png') 50% no-repeat
  }
  .sns-youtube a{
    background:#d32f2a url('@/assets/ico-youtube.png') 50% no-repeat
  }
  /* 푸터 정보 */
  .footer-info {
    padding: 0 20px;
    margin : 0;
    font-size: 12px;
  }
  .footer-info * {
    color: #999;
  }
  .footer-info span {
    padding-right: 10px;
  }
  /* 푸터 링크 */
  .footer-link {
    overflow: hidden;
    padding: 0 45px;
    margin: 20px 0;
  }
  .footer-link li{
  display:inline-block;
  font-size: 12px;
  }
  .footer-link li + li:before{
  content:''; display:inline-block; width:1px;height:14px; margin:0 15px;
  background:#4d4d4d; vertical-align:middle;
  }
  .footer-link li a{
    display: inline-block;
    color: #fff;
    text-decoration: none; 
    outline:0;
  }
  /* 푸터 연락처 */
  .info-tel .txt{
    margin: 0;
    font-size: 13px;
  }
  .info-tel:before { display: none; }
  .info-tel .tel { 
    height: auto;
    margin-top: -30px;
    padding-left: 24px;
    font-size: 24px;
  }
  .info-tel .tel:before { 
    display: inline-block;
    position: relative;
    top: 40px;
    right: 90px;
    content: '';
    width: 24px;
    height: 24px;
    border-radius: 50%; 
    background:url('@/assets/ico-tel.png') no-repeat; 
    background-size: 100%;}
  .info-tel .tel * { color: #fff; }
  /* 카피라이터 */
  .copyright {
    font-size:13px; color:#999
  }
}
</style>
