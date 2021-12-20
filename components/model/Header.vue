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
          <p
            id="myUserId"
            class="name"
          >
            {{ $store.state.userInfo.name }}_{{ $store.state.userInfo.id }}
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
          <!-- <p @click="loginStatus">
            登入狀態
          </p> -->
          <p @click="logoutAccount">
            登出
          </p>
        </div>
      </div>

      <div class="navbar">
        <nuxt-link
          :to="'/'"
          class="temp_bt"
        >
          <p class="title-two">
            首頁
          </p>
        </nuxt-link>

        <div class="menu-list">
          <div
            v-for="item of menuList"
            :key="item.name"
            class="submenu-group"
            @mouseover="mouseOver(item.name)"
            @mouseleave="mouseLeave(item.name)"
          >
            <a
              v-if="item.show === true"
              class="myLink"
              :href="item.path"
              :title="item.name"
              @click="postUsageAmount(item.name)"
            >
              <p
                class="title-two seticon"
              >
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
                  v-if="side.show === true"
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
                  v-if="side.show === true"
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
import { signOnStatus } from '~/api/login';
// import { mapState } from 'vuex';
import { headerLimit } from '~/publish/headerLimit';
import { getLogout } from '~/publish/getLogout';
export default {
  data () {
    return {
      menuList: [
        {
          name: '首頁',
          path: '',
          show: true
        },
        {
          name: '灌溉地管理',
          path: 'irrigatedLand/irrigateLandManagement',
          show: false
        },
        {
          name: '地理資訊圖台',
          path: 'map',
          show: false
        },
        {
          name: '作業基金土地管理',
          path: 'fundLand',
          show: false
        },
        {
          name: '系統管理',
          path: 'system/accountManagement',
          show: false
        }
      ],
      sideList1: [
        {
          name: '灌溉地籍查詢',
          path: 'irrigatedLand/irrigateLandManagement',
          show: false
        },
        {
          name: '停灌補償申報',
          path: 'irrigatedLand/compensate',
          show: false
        },
        {
          name: '停灌資料異動',
          path: 'irrigatedLand/dataChange',
          show: false
        },
        {
          name: '統計報表',
          path: 'irrigatedLand/report',
          show: false
        }
      ],
      sideList2: [
        {
          name: '帳號管理',
          path: 'system/accountManagement',
          show: false
        },
        {
          name: '群組權限管理',
          path: 'system/authority',
          show: false
        },
        {
          name: '首頁資料管理',
          path: 'system/editNews',
          show: false
        },
        {
          name: '系統使用量統計',
          path: 'system/statistics',
          show: false
        }
      ],
      listOne: false,
      listOnee: false,
      listTwo: false,
      showBox: false,
      userInfo: {},
      showTag: false,
      permitRows: []
    };
  },
  // middleware: 'routerAuth',
  // meta: {
  //   requiresAuth: true
  // },
  created () {
    // console.log(this.userInfo);
    // this.loginStatus();
  },
  mounted () {
    this.permitRows = sessionStorage.getItem('userAuthority');
    this.setNavAuthority();
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
      this.$store.commit('TOGGLE_POPUP_TYPE', {
        type: 'editAccount',
        title: '編輯帳號',
        editId: this.$store.state.userInfo.id
      });
      this.showBox = !this.showBox;
    },
    logoutAccount () {
      getLogout(this);
    },
    loginStatus () {
      signOnStatus().then((r) => {
        this.userInfo = r;
        // headerLimit(this.userInfo);
      }).catch((e) => {
        console.log(e);
      });
    },
    isLimit (item) {
      const r = this.userInfo;
      if (r.data) {
        // console.log(this.userInfo.data[0]);
        return headerLimit(r, item);
      };
    },
    // * 紀錄圖台系統使用量
    postUsageAmount (name) {
      let newObj = {};
      if (name === '地理資訊圖台') {
        newObj = {
          main_funtion: 3,
          funtion: 6
        };
      } else if (name === '作業基金土地管理') {
        newObj = {
          main_funtion: 4
        };
      } else {
        return;
      }
      fetch('/AERC/rest/UsageAmount', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newObj)
      }).then((response) => {
        return response;
      }).then((jsonData) => {
        // console.log(jsonData);
      }).catch((err) => {
        console.log(err);
      });
    },
    // * 設定navbar權限
    setNavAuthority () {
      // 灌溉地管理
      if (this.permitRows.includes('C')) {
        this.menuList[1].show = true;
      }
      // 地理資訊圖台
      if (this.permitRows.includes('B')) {
        this.menuList[2].show = true;
      }
      // 作業基金土地管理
      if (this.permitRows.includes('A')) {
        this.menuList[3].show = true;
      }
      // 系統管理
      if (this.permitRows.includes('D')) {
        this.menuList[4].show = true;
      }

      if (this.permitRows.includes('C_01')) {
        this.sideList1[0].show = true;
      }
      if (this.permitRows.includes('C_02')) {
        this.sideList1[1].show = true;
      }
      if (this.permitRows.includes('C_03')) {
        this.sideList1[2].show = true;
      }
      if (this.permitRows.includes('C_04')) {
        this.sideList1[3].show = true;
      }
      if (this.permitRows.includes('D_01')) {
        this.sideList2[0].show = true;
      }
      if (this.permitRows.includes('D_02')) {
        this.sideList2[1].show = true;
      }
      if (this.permitRows.includes('D_03')) {
        this.sideList2[2].show = true;
      }
      if (this.permitRows.includes('D_04')) {
        this.sideList2[3].show = true;
      }
    }

  },
  computed: {
    togglePopup () {
      return this.$store.state.popupState;
    }
  }
};
</script>

<style lang="scss" scoped>

.temp_bt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 33px;
  position: absolute;
  top: 0;
  &:hover {
    background-color: $dark-green;
    cursor: pointer;
  }
}

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
  padding: 10.6px 10px;
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
  // width: 294px;
  color: $header-black;
  text-align: center;
  letter-spacing: 1.5px;
  @include noto-sans-tc-24-medium;
}
.account {
  border-radius: 7px;
  padding: 2px 10px 2px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.name {
  min-width: 70px;
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
  position: relative;
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

.submenu-group:nth-child(1) {
  z-index: -1;
}

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
