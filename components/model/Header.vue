<template>
  <header>
    <div class="banner-group">
      <div class="logo-group">
        <img
          alt=""
          class="logo"
          :src="require('~/assets/img/logo.svg')"
        >
        <p class="logo-text">
          農田水利灌溉管理整合雲系統
        </p>
      </div>
      <div class="account">
        <p class="name">
          王大明
        </p>
        <div class="account-icon">
          <img
            alt=""
            class="vector"
            :src="require('~/assets/img/account-icon.svg')"
          >
        </div>
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
          <nuxt-link
            :to="item.path"
            :title="item.name"
          >
            <p class="title-two seticon">
              {{ item.name }}
            </p>
          </nuxt-link>

          <ul
            v-if="listOne === true && item.name === '灌溉地管理'"
            class="list-one"
          >
            <li
              v-for="side of sideList1"
              :key="side.name"
            >
              <nuxt-link
                :to="side.path"
                :title="side.name"
              >
                <p class="title-two">
                  {{ side.name }}
                </p>
              </nuxt-link>
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
              <nuxt-link
                :to="side.path"
                :title="side.name"
              >
                <p class="title-two">
                  {{ side.name }}
                </p>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <ul
      v-if="listOne"
      class="list-one"
    >
      <li
        v-for="side of sideList1"
        :key="side.name"
      >
        <nuxt-link
          :to="side.path"
          :title="side.name"
        >
          <p class="title-two">
            {{ side.name }}
          </p>
        </nuxt-link>
      </li>
    </ul> -->

    <!-- <ul
      v-if="listTwo"
      @mouseover="listTwo = true"
      @mouseleave="listTwo = false"
    >
      <li
        v-for="side of sideList2"
        :key="side.name"
      >
        <nuxt-link
          :to="side.path"
          :title="side.name"
        >
          <p class="title-two">
            {{ side.name }}
          </p>
        </nuxt-link>
      </li>
    </ul> -->
  </header>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {

          name: '首頁',
          path: '/'
        },
        {
          name: '作業基金土地管理',
          path: '/'
        },
        {
          name: 'GIS地圖',
          path: '/map'
        },
        {
          name: '灌溉地管理',
          path: '/'
        },
        {
          name: '系統管理',
          path: '/'
        }
      ],
      sideList1: [
        {
          name: '灌溉地籍查詢',
          path: '/'
        },
        {
          name: '停灌補償申報',
          path: '/'
        },
        {
          name: '停灌資料異動',
          path: '/'
        },
        {
          name: '統計報表',
          path: '/'
        }
      ],
      sideList2: [
        {
          name: '帳號管理',
          path: '/'
        },
        {
          name: '群組權限管理',
          path: '/'
        },
        {
          name: '首頁資料管理',
          path: '/'
        },
        {
          name: '系統使用量統計',
          path: '/'
        }
      ],
      listOne: false,
      listOnee: false,
      listTwo: false
    };
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
    }
  }
};
</script>

<style lang="scss" scoped>

.list-one {
  background-color: $main-green;
  width: 170px;
  position: absolute;
  top:33px;
  left: 0;
  border-radius: 0 0 5px 5px;
  overflow: hidden;
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
}
.vector {
  // width: 11.3px;
  // height: 6.64px;
}

// ****** navbar

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
  width: 170px;
  height: 33px;
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

.submenu-group:nth-child(4) {
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
