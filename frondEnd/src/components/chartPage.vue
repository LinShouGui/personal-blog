<template>
  <div class="wrapChartPage">
    <chart-page
        :data="tableData"
        :col-configs="colConfigs">
        <el-table-column slot="opt" label="操作">
            <el-button size="mini" slot-scope="{row}">查看</el-button>
        </el-table-column>
    </chart-page>
  </div>
</template>
<script>
import chartPage from "./chartPageFragment.vue";
const PrefixPlusText = {
  props: ['colConfig'],
  template: `
  	<el-table-column :label="colConfig.label">
    	<span slot-scope="{ row }">
      	{{ parseInt(row[colConfig.prop]) > 0 ? '+' + row[colConfig.prop] : row[colConfig.prop] }}
      </span>
    </el-table-column>
  `
}
export default {
   data() {
      	this.colConfigs = [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
          { prop: 'change', label: '变化', component: PrefixPlusText },
          { prop: 'trend', label: '趋势', component: PrefixPlusText },
          // 模版中的元素需要对应的有 slot="opt" 属性
          { slot: 'opt' }
        ]
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            change: '10%',
            trend: '12%',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            change: '10%',
            trend: '12%',
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            change: '-10%',
            trend: '-12%',
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            change: '-10%',
            trend: '-12%',
          }]
        }
      },
  components: {
    chartPage
  }
};
</script>
<style>
.wrapChartPage {
  margin: 200px 200px;
}
</style>
