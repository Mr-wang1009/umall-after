<template>
  <div>
    <el-button @click="del" type="danger">
      删除
    </el-button>
  </div>
</template>
<script>
export default {
  methods: {
    del(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button el-button--danger",
        type: "warning"
      })
        .then(() => {
          this.$emit("confirm");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped></style>
