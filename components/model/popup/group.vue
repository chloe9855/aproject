<template>
  <div class="inputBox">
    <InputVertical
      title="群組名稱"
      :default-data="group.groupname"
      @inputValue="group.groupname = $event"
    />
    <DropdownVertical2
      title="管處"
      :options="iaOptions"
    />

    <div class="nonTreeCheckbox">
      <TreeSelectCheckbox
        v-for="[text, value] in nonTreeCheckboxGroup"
        :key="value"
        :value="value"
        :group.sync="group.permit"
      >
        {{ text }}
      </TreeSelectCheckbox>
    </div>

    <div
      v-for="{ groupName, items, key } in checkboxGroup.concat(iaCheckboxGroup)"
      :key="key"
    >
      <TreeSelectGroup
        :group-name="groupName"
        :ids="items.map(([_, value]) => value)"
        :all-selected.sync="group.permit"
      >
        <TreeSelectCheckbox
          v-for="[text, value] in items"
          :key="value"
          :group.sync="group.permit"
          :value="value"
        >
          {{ text }}
        </TreeSelectCheckbox>
      </TreeSelectGroup>
    </div>

    <PopupSubmit @submit="submit" />

    <div
      v-if="showSuccess"
      class="alert-wrapper"
    >
      <AlertBox
        class="popup-alert-box"
        box-icon="success"
        :title="group.groupsno ? '更新成功' : '新增成功'"
        text=""
        @close="successConfirm"
        @confirm="successConfirm"
      />
    </div>

    <div v-if="showError">
      <AlertBox
        :title="group.groupsno ? '新增失敗' : '修改失敗'"
        :cancel-button="false"
        box-icon="error"
        :text="errorMessage"
        @close="showError = false"
        @confirm="showError = false"
      />
    </div>
  </div>
</template>

<script>
// @ts-check
import { getAccount } from '~/api/account';
import { addGroup, editGroup, getGroup } from '~/api/group';
import AlertBox from '~/components/tools/AlertBox.vue';
import DropdownVertical2 from '~/components/tools/DropdownVertical2.vue';
import InputVertical from '~/components/tools/InputVertical.vue';
import TreeSelectCheckbox from '~/components/tools/TreeSelectCheckbox.vue';
import TreeSelectGroup from '~/components/tools/TreeSelectGroup.vue';
import { getIas } from '~/publish/Irrigation1';
import { SET_RE_FETCH_DATA, TOGGLE_POPUP_STATUS } from '~/store';
import PopupSubmit from './PopupSubmit.vue';

/**
 * @typedef {[text: string, value: string]} ValueTuple
 * @typedef {{groupName: string, key: string, items: ValueTuple[] }} CheckboxGroup
 */

export default {
  components: {
    InputVertical,
    DropdownVertical2,
    PopupSubmit,
    TreeSelectCheckbox,
    TreeSelectGroup,
    AlertBox
  },
  data: () => {
    return {
      group: /** @type {import('types/Group').Group} */ ({
        permit: []
      }),
      /** @type {import('types/Ia').Ia[]} */
      ia: [],

      /** @type {ValueTuple[]} */
      nonTreeCheckboxGroup: [
        ['作業基金土地管理', 'A'],
        ['地理資訊圖台', 'B']
      ],
      /** @type {Array<>} */
      checkboxGroup: [
        {
          groupName: '灌溉地管理',
          key: 'C',
          items: [
            ['灌溉地籍查詢', 'C_01'],
            ['停灌補償申報', 'C_02'],
            ['停灌資料異動', 'C_03'],
            ['統計報表(左)', 'C_04'],
            ['統計報表(右)', 'C_05']
          ]
        },
        {
          groupName: '系統管理',
          key: 'D',
          items: [
            ['帳號管理', 'D_01'],
            ['群組權限管理', 'D_02'],
            ['首頁資料管理', 'D_03'],
            ['系統使用量統計', 'D_04']
          ]
        }
      ],
      showSuccess: false,
      showError: false,
      errorMessage: ''
    };
  },
  mounted () {
    this.fetchGroup();
  },
  methods: {
    async fetchGroup () {
      const id = this.getEditId();
      if (!id) {
        const {
          data: [account]
        } = await getAccount(this.$store.state.userInfo.account);

        this.group = /** @type {import('types/Group').Group} */ ({
          ia: account.ia,
          permit: []
        });
        this.getAuthOptions();
        return;
      }

      const {
        data: [group]
      } = await getGroup(id);
      this.group = group;

      this.getAuthOptions();
    },
    getEditId () {
      return this.$store.state.popupType.editId;
    },
    async getAuthOptions () {
      const { data: ias } = await getIas({ ia: this.group.ia });
      this.ia = ias;
    },
    async submit () {
      this.errorMessage = '';
      /** @type {import('axios').AxiosResponse} */
      let res;
      if (this.group.groupsno) {
        res = await editGroup({
          name: this.group.groupname,
          permit: this.group.permit,
          groupsno: this.group.groupsno
        }, {
          validateStatus: status => status < 500
        });
      } else {
        res = await addGroup({
          name: this.group.groupname,
          permit: this.group.permit,
          ia: this.group.ia
        }, {
          validateStatus: status => status < 500
        });
      }

      this.showSuccess = res.status < 300;
      this.showError = !this.showSuccess;
      this.errorMessage = res.data;
    },
    successConfirm () {
      this.showSuccess = false;
      this.$store.commit(TOGGLE_POPUP_STATUS);
      this.$store.commit(SET_RE_FETCH_DATA);
    }
  },
  computed: {
    /** @returns {CheckboxGroup} */
    iaCheckboxGroup () {
      return {
        groupName: '單位權限',
        key: 'U',
        items: this.ia.map((ia) => [ia.Ia_cns, ia.Ia])
      };
    },
    /** @returns {import('types/DropdownVerticalOption').DropdownVerticalOption<string>[]} */
    iaOptions () {
      return this.ia.map((ia) => ({ value: ia.Ia, title: ia.Ia_cns }));
    }
  }
};
</script>

<style lang="scss" scoped>
.inputBox {
  padding: 1em;
}
.buttonBox {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
.nonTreeCheckbox {
  padding-left: 21px;
}
.alert-wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: -50%;
  left: 0;
  z-index: 600;

  .popup-alert-box {
    position: relative;
  }
}
</style>
