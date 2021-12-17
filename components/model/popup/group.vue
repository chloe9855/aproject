<template>
  <div class="inputBox">
    <InputVertical
      title="群組名稱"
      :default-data="group.groupname"
    />
    <DropdownVertical2
      title="管處"
      :options="iaOptions"
    />
    <TreeSelect :all-options="allOptions" />
  </div>
</template>

<script>
import { getAccount } from '~/api/account';
// @ts-check
import { addGroup, editGroup, getGroup } from '~/api/group';
import DropdownVertical2 from '~/components/tools/DropdownVertical2.vue';
import InputVertical from '~/components/tools/InputVertical.vue';
import TreeSelect from '~/components/tools/TreeSelect.vue';
import { getGrps, getIas, getStns } from '~/publish/Irrigation';

export default {
  components: {
    InputVertical,
    TreeSelect,
    DropdownVertical2
  },
  data: () => {
    return {
      group: /** @type {import('types/Group').Group} */ ({}),
      /** @type {import('types/Ia').Ia[]} */
      ia: [],
      /** @type {import('types/Stn').Stn[]} */
      stns: [],
      /** @type {import('types/Grp').Grp[]} */
      grps: []
    };
  },
  mounted () {
    this.fetchGroup();
  },
  methods: {
    async fetchGroup () {
      const id = this.getEditId();
      if (!id) {
        const { data: [account] } = await getAccount(this.$store.state.userInfo.account);

        this.group = /** @type {import('types/Group').Group} */({
          ia: account.ia
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
      const [{ data: ias }, { data: stns }, { data: grps }] = await Promise.all(
        [getIas({ ia: this.group.ia }), getStns(this.group.ia), getGrps(this.group.ia)]
      );
      this.ia = ias;
      this.stns = stns;
      this.grps = grps;
    },
    async submit () {
      if (this.group.groupsno) {
        editGroup(this.group.groupsno);
      } else {
        addGroup(this.group);
      }
    }
  },
  computed: {
    /** @returns {{ id: number, ia: string, stn: Array<{ title: string, no: number, grp: {name: string, no:number}[]}> }[]} */
    allOptions () {
      return this.ia.map(ia => ({
        id: ia.FID,
        ia: ia.Ia_cns,
        stn: this.stns.filter(s => s.ia === ia.ia).map(s => ({
          title: s.Stn_cns,
          no: s.FID,
          grp: this.grps.filter(g => g.Stn === s.Stn).map(s => ({
            name: s.Grp_cns,
            no: s.FID
          }))
        }))
      }));
    },
    /** @returns {import('types/DropdownVerticalOption').DropdownVerticalOption<string>[]} */
    iaOptions () {
      return this.ia.map(ia => ({ value: ia.ia, title: ia.Ia_cns }));
    }
  },
  watch: {
    isSubmit (value) {
      if (value) {
        this.submit();
      }
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
</style>
