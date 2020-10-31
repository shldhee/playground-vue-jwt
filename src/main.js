import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem("user"); // 로컬스토리지에서 user 데이터를 가져온다.
    if (userString) {
      // user 데이터가 있는지 확인한다.
      const userData = JSON.parse(userString); // 로컬스트로지는 String형으로 저장되어있으므로 parse를 사용해 객체로 변환한다.
      this.$store.commit("SET_USER_DATA", userData); // Vuex suer state에 저장하기 위해 mutation을 사용한다.
    }
    axios.interceptors.response.use(
      response => response, // 정상이면 response를 반환
      error => {
        console.log(error);

        if (error.response.status === 401) {
          // 401 에러가 발생할 경우
          this.$store.dispatch("logout"); // 강제로 로그아웃
        }
        return Promise.reject(error); // 에러 이유를 리턴 시켜준다.
      }
    );
  },
  render: h => h(App)
}).$mount("#app");
