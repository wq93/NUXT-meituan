<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="handleMouseLeave">
      <dt>全部分类</dt>
      <!--<dd-->
      <!--v-for="(item, index) in $store.state.home.menu"-->
      <!--:key="index"-->
      <!--@mouseenter="handleMouseEnter">-->
      <!--<i :class="item.type"/>{{ item.name }}<span class="arrow"/>-->
      <!--</dd>-->
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="handleFloatLayerMouseEnter"
      @mouseleave="handleFloatLayerMouseLeave">
      <!--<template-->
      <!--v-for="(item, index) in currentDetail.child">-->
      <!--<div :key="index">-->
      <!--<h4>{{ item.title }}</h4>-->
      <!--<span-->
      <!--v-for="(v, idx) in item.child"-->
      <!--:key="idx">{{ v }}</span>-->
      <!--</div>-->
      <!--</template>-->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        kind: '',
        menu: []
      };
    },
    computed: {
      currentDetail() {
        return this.$store.state.home.menu.filter(item => item.type === this.kind)[0];
      }
    },
    methods: {
      handleMouseLeave() {
        let self = this
        this._timer = setTimeout(() => {
          self.kind = '';
        }, 150);
      },
      handleMouseEnter(e) {
        this.kind = e.target.querySelector('i').className;
      },
      handleFloatLayerMouseEnter() {
        clearTimeout(this._timer);
      },
      handleFloatLayerMouseLeave() {
        this.kind = '';
      }
    }
  };
</script>

