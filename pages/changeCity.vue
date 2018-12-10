<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import iSelect from '@/components/changeCity/iselect';
  import hot from '@/components/changeCity/hot';
  import category from '@/components/changeCity/category';
  export default {
    components: {
      iSelect,
      hot,
      category
    }
  };
</script>
