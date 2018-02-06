<template>
  <div id="app">
    <NavBar bgcolor="#04BE02" color="#FFF" :title="headerTitle" height=".8rem" fixed ref="header"/>
    <div class="wrapper" ref="wrapper" :style="wrapHeight">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll"
import { NavBar } from 'vue-ydui/dist/lib.rem/navbar'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      headerTitle: 'This is header title.',
      wrapHeight: {
        height: '100%'
      },
      scroll
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      let headerHeight = this.$refs.header.$el.offsetHeight
      this.wrapHeight = {
        height: document.body.clientHeight - headerHeight + 'px',
        top: headerHeight + 'px'
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        bounceTime: 600
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  position fixed
  width 100%
</style>
