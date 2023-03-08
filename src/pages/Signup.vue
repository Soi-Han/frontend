<template>
  <div class="signup">
      <h2 class="wrap-tit">회원가입</h2>
      <main class="form-sign">
        <form novalidate>
          <div class="signFrm">
            <div class="input-box">
              <div class="flex-id">
                <input type="text" name="id" placeholder="계정(email)" class="input-id" v-model="state.form.email" autofocus>
                <button type="button" onClick="idCheck(this.form.id.value)" class="bt-id">중복확인</button>
              </div>
              <div class="flex-nick">
                <input type="text" id="nick_name" placeholder="닉네임(2~10자)" class="input-id" v-model="state.form.name" required>
                <button type="button" onClick="idCheck(this.form.id.value)" class="bt-id">중복확인</button>
              </div>
              <div>
                <input type="password" name="pwd" placeholder="비밀번호 입력" v-model="state.form.password" class="input-pwd" required>
                <input type="password" name="repwd" placeholder="비밀번호 확인" v-model="state.form.passwordRe" class="input-repwd" required>
              </div>
              <div class="input-checkbox">
              <label>
                  <input type="checkbox"  @keyup.enter="submit()">&nbsp;&nbsp;와인21 뉴스레터 수신동의(선택)
                  <button class="btn-sign" @click.prevent="submit()">가입하기</button>
              </label>
            </div>
          </div>


          </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios'
import router from '@/scripts/router'

  const state = reactive({
    form: {
      email: "",
      password: "",
      passwordRe: "",
      name: "",
    }
  })
  const submit = () => {
    axios.post("/api/account/signup", state.form)
      .then(({ data }) => {
        if (data.name) {
          router.push({ path: "/" })
          alert(data.name + "님, 가입되었습니다. 다시 로그인해주세요!")
        }
        else {
          alert("중복된 아이디입니다.")
        }
      }).catch(error => {
        console.log(error)
        alert("중복된 아이디입니다.")
      })
  }

</script>

<style scoped>
@media screen and (min-width:1230px) {
  /*배경박스*/
  .signup {
  padding-top: 38px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  }
  /*===== 입력폼 회색 감싸는 흰색 박스 =====*/
  .form-sign {
  width:540px;
  height: 455px;
  padding:50px 40px;
  margin:125px auto;
  background:#FFF;
  border-radius:10px;
  box-shadow:2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
  }
  /*===== 타이틀 =====*/
  .wrap-tit{
  position:absolute;
  width:140px;
  top:180px;
  left:50%;
  margin-left:-70px;
  font-size:34px;
  font-weight:600;
  color:#262626;
  }
  /*===== 입력폼 =====*/
  .signFrm {
  width:100%;
  }
  /* 취소선 */
  label{
  cursor: pointer;
  text-decoration: line-through;
  }
  /*====닉네임=====*/
  .flex-nick{
  margin-top:15px;
  }
  .input-id{
  width:348px;
  height: 48px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .bt-id{
  float: right;
  width: 96px;
  height: 48px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 600;
  color: #595959;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: #f5f5f5;
  text-decoration: line-through; /* 취소선 */
  }
  /*===== pwd, repwd공통 =====*/
  .input-pwd, .input-repwd{
  width: 100%;
  height: 48px;
  margin-top:15px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .input-checkbox {
  float:left;
  width:460px;
  margin-top:15px;
  }
  
  /*=====회원가입 버튼=====*/
  .btn-sign{
  float:left;
  width:460px;
  margin-top:20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
  border:none;
  border-radius: 4px;
  color: #fff;
  background: #c70039;
  }
}
@media screen and (min-width:1000px) and (max-width:1230px) {
  /*배경박스*/
  .signup {
  padding-top: 38px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  }
  /*===== 입력폼 회색 감싸는 흰색 박스 =====*/
  .form-sign {
  width:540px;
  height: 455px;
  padding:50px 40px;
  margin:125px auto;
  background:#FFF;
  border-radius:10px;
  box-shadow:2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
  }
  /*===== 타이틀 =====*/
  .wrap-tit{
  position:absolute;
  width:140px;
  top:180px;
  left:50%;
  margin-left:-70px;
  font-size:34px;
  font-weight:600;
  color:#262626;
  }
  /*===== 입력폼 =====*/
  .signFrm {
  width:100%;
  }
  /* 취소선 */
  label{
  cursor: pointer;
  text-decoration: line-through;
  }
  /*====닉네임=====*/
  .flex-nick{
  margin-top:15px;
  }
  .input-id{
  width:348px;
  height: 48px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .bt-id{
  float: right;
  width: 96px;
  height: 48px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 600;
  color: #595959;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: #f5f5f5;
  text-decoration: line-through; /* 취소선 */
  }
  /*===== pwd, repwd공통 =====*/
  .input-pwd, .input-repwd{
  width: 100%;
  height: 48px;
  margin-top:15px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .input-checkbox {
  float:left;
  width:460px;
  margin-top:15px;
  }
  
  /*=====회원가입 버튼=====*/
  .btn-sign{
  float:left;
  width:460px;
  margin-top:20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
  border:none;
  border-radius: 4px;
  color: #fff;
  background: #c70039;
  }
}
@media screen and (min-width:600px) and (max-width:1000px) {
  /*배경박스*/
  .signup {
  margin-top: -20px;
  padding-top: 38px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  }
  /*===== 입력폼 회색 감싸는 흰색 박스 =====*/
  .form-sign {
  width:540px;
  height: 455px;
  padding:50px 40px;
  margin:125px auto;
  background:#FFF;
  border-radius:10px;
  box-shadow:2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
  }
  /*===== 타이틀 =====*/
  .wrap-tit{
  position:absolute;
  width:140px;
  
  left:50%;
  margin-left:-70px;
  font-size:34px;
  font-weight:600;
  color:#262626;
  }
  /*===== 입력폼 =====*/
  .signFrm {
  width:100%;
  }
  /* 취소선 */
  label{
  cursor: pointer;
  text-decoration: line-through;
  }
  /*====닉네임=====*/
  .flex-nick{
  margin-top:15px;
  }
  .input-id{
  width:348px;
  height: 48px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .bt-id{
  float: right;
  width: 96px;
  height: 48px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 600;
  color: #595959;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: #f5f5f5;
  text-decoration: line-through; /* 취소선 */
  }
  /*===== pwd, repwd공통 =====*/
  .input-pwd, .input-repwd{
  width: 100%;
  height: 48px;
  margin-top:15px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .input-checkbox {
  float:left;
  width:460px;
  margin-top:15px;
  }
  
  /*=====회원가입 버튼=====*/
  .btn-sign{
  float:left;
  width:460px;
  margin-top:20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
  border:none;
  border-radius: 4px;
  color: #fff;
  background: #c70039;
  }
}
@media screen and (max-width:600px) {
  /*배경박스*/
  .signup {
  display: flex;
  align-items: center;
  padding-top: 38px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  }
  /*===== 입력폼 회색 감싸는 흰색 박스 =====*/
  .form-sign {
  width: 350px;
  padding: 20px 16px;
  margin: 125px auto;
  background :#FFF;
  border-radius: 10px;
  box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
  }
  /*===== 타이틀 =====*/
  .wrap-tit{
  position: absolute;
  width: 140px;
  top: 35%;
  left: 50%;
  margin-left: -70px;
  font-size: 32px;
  font-weight: 600;
  color: #262626;
  }
  /*===== 입력폼 =====*/
  .signFrm {
  width:100%;
  }
  /* 취소선 */
  label{
  cursor: pointer;
  text-decoration: line-through;
  }
  /*====닉네임=====*/
  .flex-nick{
  margin-top:15px;
  }
  .input-id{
  width: 70%;
  height: 48px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .bt-id{
  float: right;
  width: 28%;
  height: 48px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 500;
  color: #595959;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: #f5f5f5;
  text-decoration: line-through; /* 취소선 */
  }
  /*===== pwd, repwd공통 =====*/
  .input-pwd, .input-repwd{
  width: 100%;
  height: 48px;
  margin-top:15px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
  .input-checkbox {
  float:left;
  width:460px;
  margin-top:15px;
  }
  /*=====회원가입 버튼=====*/
  .btn-sign{
  float:left;
  width: 100%;
  margin-top:20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
  border:none;
  border-radius: 4px;
  color: #fff;
  background: #c70039;
  }
}
</style>