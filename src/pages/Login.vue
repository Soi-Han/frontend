<template>
    <div class="login">
        <h2 class="wrap-tit">LOGIN</h2>
        <main class="form-login">
            <form>
                <div class="loginFrm">
                    <div class="input-box">
                        <div class="input-member">
                            <input type="radio" name="member" value="1" @keyup.enter="submit()" checked > <label>개인회원</label> &nbsp;&nbsp; 
                            <input type="radio" name="member" value="2" @keyup.enter="submit()"> <label>기업회원</label>
                        </div>
                        <div class="input-email">
                            <input type="email" class="form-email" placeholder="아이디 또는 이메일"  @keyup.enter="submit()" v-model="state.form.email">
                            <label for="floatingInput"></label>
                        </div>
                        <div class="input-password">
                            <input type="password" class="form-password" placeholder="비밀번호" @keyup.enter="submit()" v-model="state.form.password">
                            <label for="floatingPassword"></label>
                        </div>
                        <div class="input-checkbox">
                            <label>
                                <input type="checkbox"  @keyup.enter="submit()">&nbsp;&nbsp;로그인 상태 유지
                            </label>
                        </div>
                        <button class="btn-login" @click.prevent="this.submit()">로그인</button>
                        <div class="login-boxLink">
                            <router-link to="/Signup">회원가입</router-link>
                            <router-link to="/Signup">비밀번호 재설정</router-link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import { reactive } from 'vue';
import  axios  from 'axios'
import store from '@/scripts/store'
import router from '@/scripts/router'
export default {

    setup() {
        const state = reactive({
            form: {
                email: "",
                password: ""
            }
        })
        const submit = () => {
            
            axios.post("/api/account/login", state.form)
                .then(res => {
                    store.commit('setAccount',  res.data.id)
                    // console.log(res.data.id)
                    sessionStorage.setItem("id", res.data.id)
                    router.push({path:"/"})
                    // console.log(res.data.email)
                    window.alert(res.data.email + "님 환영합니다!")
                }).catch(error=>{
                    console.log(error)
                    window.alert("Email과 Password가 일치하지 않습니다.")
                })
        }
        return { state, submit }
    }
}
</script>

<style scoped>
@media screen and (min-width:1230px) {
/*배경박스*/
.login {
    padding-top: 38px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }
/*===== 타이틀 =====*/
.wrap-tit{
    position:absolute;
    width:100px;
    top:180px;
    left:50%;
    margin-left:-50px;
    font-size:34px;
    font-weight:600;
    color:#262626;
    }
/*===== 입력폼 회색 감싸는 흰색 박스 =====*/
.form-login {
    width: 540px;
    padding:50px 46px;
    margin: 115px auto;
    background:#FFF;
    border-radius:10px;
    box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
    }

/*===== 입력폼 =====*/
.loginFrm {
    width:100%;
    }
.input-member {
    float:left;
    }
/*=====email, password공통=====*/
.form-email, .form-password{
    margin-top:10px;
    float:left;
    width:448px;
    height:48px;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }
.input-checkbox {
    float:left;
    padding:15px 0;
    }

/*=====로그인 버튼=====*/
.btn-login{
    width:448px;
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
    border:none;
    border-radius: 4px;
    color: #fff;
    background: #c70039;
    }
label{
    cursor: pointer;
    text-decoration: line-through;
    }
.btn-join{
    float:left;
    }
.btn-repassword{
    float:right;
    }
.login-boxLink a {
    padding-top: 30px;
    text-decoration: none;
    color: #737373;
    font-weight: 600;
    }
/* 로그인 상태 유지 박스 취소선 */
.input-checkbox label {
    text-decoration: line-through;
    }
/*===== 로그인, 비밀번호 재설정=====*/
.login-boxLink a:first-child{
    float: left;
    width: 80px;
    height: 40px;
    padding-top: 0px;
    text-align: center;
    line-height: 40px;
    color: #FFF;
    border-radius: 4px;
    background: #c70039;
    }
.login-boxLink a:last-child{
    display: flex;
    justify-content: right;
    text-decoration: line-through;
    height: 40px;
    margin-top: 20px;
    text-align: center;
    line-height: 40px;
    padding-top: 0px;
    border-radius: 4px;
    }
}
@media screen and (min-width:999px) and (max-width:1230px) {
/*배경박스*/
.login {
    padding-top: 38px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }
/*===== 타이틀 =====*/
.wrap-tit{
    position:absolute;
    width:100px;
    top:180px;
    left:50%;
    margin-left:-50px;
    font-size:34px;
    font-weight:600;
    color:#262626;
    }
/*===== 입력폼 회색 감싸는 흰색 박스 =====*/
.form-login {
    width: 540px;
    padding:50px 46px;
    margin: 115px auto;
    background:#FFF;
    border-radius:10px;
    box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
    }
/*===== 입력폼 =====*/
.loginFrm {
    width:100%;
    }
.input-member {
    float:left;
    }
/*=====email, password공통=====*/
.form-email, .form-password{
    margin-top:10px;
    float:left;
    width:448px;
    height:48px;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }
.input-checkbox {
    float:left;
    padding:15px 0;
    }
/*=====로그인 버튼=====*/
.btn-login{
    width:448px;
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
    border:none;
    border-radius: 4px;
    color: #fff;
    background: #c70039;
    }
label{
    cursor: pointer;
    text-decoration: line-through;
    }
.btn-join{
    float:left;
    }
.btn-repassword{
    float:right;
    }
.login-boxLink a {
    padding-top: 30px;
    text-decoration: none;
    color: #737373;
    font-weight: 600;
    }
/* 로그인 상태 유지 박스 취소선 */
.input-checkbox label {
    text-decoration: line-through;
    }
/*===== 로그인, 비밀번호 재설정=====*/
.login-boxLink a:first-child{
    float: left;
    width: 80px;
    height: 40px;
    padding-top: 0px;
    text-align: center;
    line-height: 40px;
    color: #FFF;
    border-radius: 4px;
    background: #c70039;
    }
.login-boxLink a:last-child{
    display: flex;
    justify-content: right;
    text-decoration: line-through;
    height: 40px;
    margin-top: 20px;
    text-align: center;
    line-height: 40px;
    padding-top: 0px;
    border-radius: 4px;
    }
}
@media screen and (min-width:600px) and (max-width:999px) {
/*배경박스*/
.login {
    margin-top: -20px;
    padding-top: 38px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }
    /*===== 타이틀 =====*/
.wrap-tit{
    position:absolute;
    width:100px;
    left:50%;
    margin-left:-50px;
    font-size:30px;
    font-weight:600;
    color:#262626;
    }
/*===== 입력폼 회색 감싸는 흰색 박스 =====*/
.form-login {
    width: 540px;
    padding:50px 46px;
    margin: 115px auto;
    background:#FFF;
    border-radius:10px;
    box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
    }

/*===== 입력폼 =====*/
.loginFrm {
    width:100%;
    }
.input-member {
    float:left;
    }
/*=====email, password공통=====*/
.form-email, .form-password{
    margin-top:10px;
    float:left;
    width:448px;
    height:48px;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }
.input-checkbox {
    float:left;
    padding:15px 0;
    }

/*=====로그인 버튼=====*/
.btn-login{
    width:448px;
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
    border:none;
    border-radius: 4px;
    color: #fff;
    background: #c70039;
    }
label{
    cursor: pointer;
    text-decoration: line-through;
    }
.btn-join{
    float:left;
    }
.btn-repassword{
    float:right;
    }
.login-boxLink a {
    padding-top: 30px;
    text-decoration: none;
    color: #737373;
    font-weight: 600;
    }
/* 로그인 상태 유지 박스 취소선 */
.input-checkbox label {
    text-decoration: line-through;
    }
/*===== 로그인, 비밀번호 재설정=====*/
.login-boxLink a:first-child{
    float: left;
    width: 80px;
    height: 40px;
    padding-top: 0px;
    text-align: center;
    line-height: 40px;
    color: #FFF;
    border-radius: 4px;
    background: #c70039;
    }
.login-boxLink a:last-child{
    display: flex;
    justify-content: right;
    text-decoration: line-through;
    height: 40px;
    margin-top: 20px;
    text-align: center;
    line-height: 40px;
    padding-top: 0px;
    border-radius: 4px;
    }
}
@media screen and (max-width:600px) {
    .login {
    margin-top: -7px;
    padding-top: 38px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    }
    /*===== 타이틀 =====*/
    .wrap-tit{
        position: absolute;
        width: 100px;
        top: 35%;
        left: 50%;
        margin-left: -50px;
        font-size: 30px;
        font-weight: 600;
        color: #262626;
    }
    /*===== 입력폼 회색 감싸는 흰색 박스 =====*/
    .form-login {
        width: 350px;
        padding: 20px 16px;
        margin: 115px auto;
        background:#FFF;
        border-radius:10px;
        box-shadow: 2.4px 6.6px 10px 0 rgb(0 0 0 / 10%);
    }

    /*===== 입력폼 =====*/
    .loginFrm {
        width:100%;
    }
    .input-member {
        float:left;
    }
    /*=====email, password공통=====*/
    .form-email, .form-password{
        margin-top:10px;
        float:left;
        width: 100%;
        height:48px;
        padding: 0 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .input-checkbox {
        float:left;
        padding:15px 0;
    }

    /*=====로그인 버튼=====*/
    .btn-login{
        width: 100%;
        font-size: 18px;
        font-weight: 500;
        line-height: 60px;
        border:none;
        border-radius: 4px;
        color: #fff;
        background: #c70039;
    }

    label{
        cursor: pointer;
        text-decoration: line-through;
    }
    .btn-join{
        float:left;
    }
    .btn-repassword{
        float:right;
    }
    .login-boxLink a {
        padding-top:30px;
        text-decoration:none;
        color: #737373;
        font-weight:600;
    }
    /*===== 로그인, 비밀번호 재설정=====*/
    .login-boxLink a:first-child{
        float:left;
    }
    .login-boxLink a:last-child{
        display: flex;
        justify-content: right;
    }
}
</style>