<template>
  <div
    class="table_block theme_scrollbar"
    :class="sizing"
  >
    <table>
      <tbody>
        <tr>
          <td>年度</td>
          <td>{{ item.Year }}</td>
        </tr>
        <tr>
          <td>月份</td>
          <td>{{ item.Month }}</td>
        </tr>
        <tr>
          <td>所有權人姓名</td>
          <td>{{ item.Owner }}</td>
        </tr>
        <tr>
          <td>地建別 </td>
          <td>{{ item.BuildingType }}</td>
        </tr>
        <tr>
          <td> 地建號 </td>
          <td>{{ item.LandNo }}</td>
        </tr>
        <tr>
          <td> 建物門牌 </td>
          <td>{{ item.Address }}</td>
        </tr>
        <tr>
          <td> 權利範圍類別 </td>
          <td>{{ item.OwnScro }}</td>
        </tr>
        <tr>
          <td> 權利分母 </td>
          <td>{{ item.Percent2 }}</td>
        </tr>
        <tr>
          <td> 權利分子 </td>
          <td>{{ item.Percent1 }}</td>
        </tr>
        <tr>
          <td> 權屬面積 </td>
          <td>{{ item.BuildingArea }}</td>
        </tr>
        <tr>
          <td> 使用分區 </td>
          <td>{{ item.LandUse }}</td>
        </tr>
        <tr>
          <td> 土地編定使用地 </td>
          <td>{{ item.LandZoning }}</td>
        </tr>
        <tr>
          <td> 公告土地現值</td>
          <td>{{ item.Curr_price }}</td>
        </tr>
        <tr>
          <td> 申報地價</td>
          <td>{{ item.Declared_price }}</td>
        </tr>
        <tr>
          <td> 管理者姓名 </td>
          <td>{{ item.AdminName }}</td>
        </tr>
        <tr>
          <td> 有無他項設定 </td>
          <td>{{ item.OtherRights }}</td>
        </tr>
        <tr>
          <td> 有無限制登記 </td>
          <td>{{ item.RestrictRegistration }}</td>
        </tr>
        <tr>
          <td> 有無禁止移轉註記 </td>
          <td>{{ item.TransferNote }}</td>
        </tr>
        <tr>
          <td> 備註 </td>
          <td>{{ item.Remark }}</td>
        </tr>
        <tr>
          <td> 是否公開 </td>
          <td>{{ item.Public }}</td>
        </tr>
        <tr>
          <td> 是否為黑名單 </td>
          <td>{{ item.Blacklist }}</td>
        </tr>
        <tr>
          <td> 所有權人異常 </td>
          <td>{{ item.OwnerAbnormal }}</td>
        </tr>
        <tr>
          <td> 標示部登記原因異常 </td>
          <td>{{ item.DescriptionAbnormal }}</td>
        </tr>
        <tr>
          <td> 所有權部登記原因異常</td>
          <td>{{ item.OwnershipAbnormal }}</td>
        </tr>
        <tr>
          <td> 最早1代註記</td>
          <td>{{ item.Note1 }}</td>
        </tr>
        <tr>
          <td> 最末1代註記 </td>
          <td>{{ item.Note2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    sizing: {
      type: String,
      default: 'h-480'
    },
    shorten: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>

  .set {
    width: 21%;
  }

  .table_block {
    // width: 512px;
    height: 480px;
    max-height: calc( 100vh - 200px );
    overflow-y: auto;
    overflow-x: hidden;
    color: #494949;
    background: white;
    @include noto-sans-tc-16-regular;

    table {
      text-align: left;
      margin: 0 auto;
      width: 100%;

      td {
        padding: 10px;
      }

      tr:nth-child(odd) {
        background-color: #F5F5F5;
      }
    }
  }

  .h-432{
    height: 432px !important;
  }

</style>
