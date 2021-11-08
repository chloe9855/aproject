<template>
  <header>
    <div class="header">
      <div class="banner-group">
        <div class="logo-group">
          <img
            alt=""
            class="logo"
            :src="require('~/assets/img/logo.svg')"
          >

          <nuxt-link
            :to="'/'"
          >
            <p class="logo-text">
              農田水利灌溉管理整合雲系統
            </p>
          </nuxt-link>
        </div>
        <div class="account">
          <p class="name">
            {{ $store.state.userInfo.name }}
          </p>
          <div
            class="account-icon"
            @click="showBox = !showBox"
          >
            <img
              alt=""
              class="vector"
              :src="require('~/assets/img/account-icon.svg')"
            >
          </div>
        </div>

        <div
          v-if="showBox"
          class="login-box"
        >
          <p @click="openSettingAccount">
            帳號設定
          </p>
          <p @click="loginStatus">
            登入狀態
          </p>
          <p @click="logoutAccount">
            登出
          </p>
        </div>
      </div>

      <div class="navbar">
        <div class="menu-list">
          <div
            v-for="item of menuList"
            :key="item.name"
            class="submenu-group"
            @mouseover="mouseOver(item.name)"
            @mouseleave="mouseLeave(item.name)"
          >
            <a
              class="myLink"
              :href="item.path"
              :title="item.name"
            >
              <p class="title-two seticon">
                {{ item.name }}
              </p>
            </a>
            <!-- <nuxt-link
              class="myLink"
              :to="item.path"
              :title="item.name"
            >
              <p class="title-two seticon">
                {{ item.name }}
              </p>
            </nuxt-link> -->

            <ul
              v-if="listOne === true && item.name === '灌溉地管理'"
              class="list-one"
            >
              <li
                v-for="side of sideList1"
                :key="side.name"
              >
                <a
                  :href="side.path"
                  :title="side.name"
                >
                  <p class="title-two">
                    {{ side.name }}
                  </p>
                </a>
                <!-- <nuxt-link
                  :to="side.path"
                  :title="side.name"
                >
                  <p class="title-two">
                    {{ side.name }}
                  </p>
                </nuxt-link> -->
              </li>
            </ul>

            <ul
              v-if="listTwo === true && item.name === '系統管理'"
              class="list-one"
            >
              <li
                v-for="side of sideList2"
                :key="side.name"
              >
                <a
                  :href="side.path"
                  :title="side.name"
                >
                  <p class="title-two">
                    {{ side.name }}
                  </p>
                </a>
                <!-- <nuxt-link
                  :to="side.path"
                  :title="side.name"
                >
                  <p class="title-two">
                    {{ side.name }}
                  </p>
                </nuxt-link> -->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { signOnStatus, logout } from '~/api/login';
import { mapState } from 'vuex';
export default {
  data () {
    return {
      menuList: [
        {
          name: '首頁',
          path: ''
        },
        {
          name: '灌溉地管理',
          path: 'irrigatedLand/irrigateLandManagement'
        },
        {
          name: '地理資訊圖台',
          path: 'map'
        },
        {
          name: '作業基金土地管理',
          path: 'fundLand'
        },
        {
          name: '系統管理',
          path: 'system/accountManagement'
        }
      ],
      sideList1: [
        {
          name: '灌溉地籍查詢',
          path: 'irrigatedLand/irrigateLandManagement'
        },
        {
          name: '停灌補償申報',
          path: 'irrigatedLand/compensate'
        },
        {
          name: '停灌資料異動',
          path: 'irrigatedLand/dataChange'
        },
        {
          name: '統計報表',
          path: 'irrigatedLand/report'
        }
      ],
      sideList2: [
        {
          name: '帳號管理',
          path: 'system/accountManagement'
        },
        {
          name: '群組權限管理',
          path: 'system/authority'
        },
        {
          name: '首頁資料管理',
          path: 'system/editNews'
        },
        {
          name: '系統使用量統計',
          path: 'system/statistics'
        }
      ],
      listOne: false,
      listOnee: false,
      listTwo: false,
      showBox: false

    };
  },
  // middleware: 'routerAuth',
  // meta: {
  //   requiresAuth: true
  // },
  mounted () {
    // console.log(this.userInfo);
  },
  methods: {
    mouseOver (payload) {
      if (payload === '灌溉地管理') {
        this.listOne = true;
      }
      if (payload === '系統管理') {
        this.listTwo = true;
      }
    },
    mouseLeave (payload) {
      if (payload === '灌溉地管理') {
        this.listOne = false;
      }
      if (payload === '系統管理') {
        this.listTwo = false;
      }
    },
    openSettingAccount () {
      this.$store.commit('TOGGLE_POPUP_STATUS');
      this.$store.commit('TOGGLE_POPUP_TYPE', { type: 'editAccount', title: '新增帳號' });
      this.showBox = !this.showBox;
    },
    logoutAccount () {
      logout().then((r) => {
        this.$store.commit('SET_USER_INFO', { userInfo: {} });
        sessionStorage.setItem('loginStatus', 0);
        this.$cookies.set('ASP.NET_SessionId', '');
        this.$router.push('/login');
      }).catch((e) => {
        console.log(e);
      });
    },
    loginStatus () {
      signOnStatus().then((r) => {
        console.log(r);
      }).catch((e) => {
        console.log(e);
      });
    },
    ...mapState([
      'userInfo'
    ])
  },
  computed: {
    togglePopup () {
      return this.$store.state.popupState;
    }
  }
};
</script>

<style lang="scss" scoped>

.header {
  z-index: 7000;
}

.login-box {
  position: absolute;
  top: 32px;
  right: 16px;
  background: white;
  box-shadow: 0 0 14px 0 #a8a7a7;
  border-radius: 5px;
  color: #494949;
  width: 217px;
  padding: 0 10px;
  z-index: 70000;
  @include noto-sans-tc-16-regular;

  p {
    cursor: pointer;
    padding: 10px 0;
  }
}

.list-one {
  background-color: $main-green;
  width: 170px;
  position: absolute;
  top:33px;
  left: 0;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
  z-index: 70000;
}

.list-one li {
  padding: 7px 0;

  &:hover {
    background-color: $dark-green;
    cursor: pointer;
  }
}

.banner-group {
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: url('~/assets/img/banner.png') no-repeat right/contain;
}
.logo-group {
  display: flex;
  align-items: center;
}
.logo {
  width: 103.65px;
  height: 26.68px;
  margin-right: 10px;
}
.logo-text {
  width: 294px;
  color: $header-black;
  text-align: center;
  letter-spacing: 1.5px;
  @include noto-sans-tc-20-medium;
}
.account {
  border-radius: 7px;
  padding: 2px 10px 2px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.name {
  width: 73px;
  color: $white;
  text-align: center;
  margin-right: 10px;
  @include noto-sans-tc-17-medium;
}
.account-icon {
  background-color: $dark-green;
  border-radius: 50%;
  // padding: 8.82px 5.81px 7.54px 5.89px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

// ****** navbar

.myLink {
  width: 170px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  background-color: $main-green;
  padding: 0 545px 0 0;
  display: flex;
  align-items: flex-start;
}
.menu-list {
  background-color: $main-green;
  padding: 0 5px 0 0;
  display: flex;
  align-items: center;
}
.submenu-group-active {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 33px;
}
.submenu {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
}
.title {
  color: $white;
  text-align: center;
  @include noto-sans-tc-17-medium;
}
.submenu-group {
  background-color: $transparent-white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // width: 170px;
  // height: 33px;
  position: relative;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &:hover {
    background-color: $dark-green;
    cursor: pointer;
  }
}
.title-two {
  color: $white;
  text-align: center;
  @include noto-sans-tc-18-medium;
}
.submenu-group-two {
  background-color: $dark-green;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 33px;
}
.title-three {
  color: $white;
  text-align: center;
  margin-right: 1px;
  @include noto-sans-tc-17-medium;
}
.arrow-icon {
  padding: 5.7px 2.85px;
  display: flex;
  align-items: center;
  width: 13.3px;
  height: 7.6px;
}
// .vector {
//   width: 100%;
//   height: 100%;
// }

.submenu-group:nth-child(2) {
  .seticon::after {
    content: '';
    background: url('~/assets/img/arrow-icon.svg') no-repeat center/contain;
    width: 20px;
    height: 19px;
    display: block;
    position: absolute;
    right: 17px;
    top:9px;
  }
}

.submenu-group:nth-child(5) {
   .seticon::after {
    content: '';
    background: url('~/assets/img/arrow-icon.svg') no-repeat center/contain;
    width: 20px;
    height: 19px;
    display: block;
    position: absolute;
    right: 27px;
    top:9px;
  }
}

</style>
