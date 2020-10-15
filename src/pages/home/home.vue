<template>
  <div>
    <div id="main" style="width: 90%; height: 80vh"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({ reqList: "cate/reqListAction",}),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          var myChart = echarts.init(document.getElementById("main"));
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["下级分类数量"],
            },
            xAxis: {
              data:this.list.map(item=>item.catename),

            },
            yAxis: {},
            series: [
              {
                name: "下级分类数量",
                type: "bar",
                data: this.list.map(item=>item.children.length),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
        },

      deep: true,
    },
  },
  mounted() {
    this.reqList()
  },
};
</script>
<style scoped></style>
