<template>
  <div>
    <el-row
      :gutter="0"
      class="m-header"
    >
      <el-col :span="5">
        <Geo/>
      </el-col>
      <el-col :span="5">
        <User/>
      </el-col>
      <el-col :span="14">
        <Nav/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Geo from './geo';
  import User from './user';
  import Nav from './nav';

  export default {
    components: {
      Geo,
      User,
      Nav
    }
  };
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import "@/assets/css/public/header/index.scss";
</style>
