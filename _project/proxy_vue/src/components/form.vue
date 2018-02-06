<template>
  <CellGroup class="form-group">
    <CellItem>
      <span slot="left">用户名：</span>
      <Input slot="right" required max="20" placeholder="请输入用户名"
        v-model="form.username"
        @focus.native.capture="scrollView" />
    </CellItem>
    <CellItem>
      <span slot="left">密&nbsp;&nbsp;&nbsp;码：</span>
      <Input slot="right" required type="password" placeholder="请输入密码"
        v-model="form.password"
        @focus.native.capture="scrollView" />
    </CellItem>
    <CellItem>
        <span slot="left">手机号：</span>
        <Input slot="right" required regex="mobile" placeholder="请输入手机号码"
          v-model="form.phone"
          @focus.native.capture="scrollView" />
    </CellItem>
    <CellItem>
        <span slot="left">验证码：</span>
        <Input slot="right" placeholder="请输入验证码"
          v-model="form.code"
          @focus.native.capture="scrollView" />
        <SendCode slot="right"
          init-str="发送验证码"
          run-str="{%s}秒重发"
          reset-str="重新发送"
          v-model="scStart"
          @click.native="sendCode"
          style="min-width: 1.4rem"
          type="primary"></SendCode>
    </CellItem>
    <CellItem>
      <span slot="left">邮&nbsp;&nbsp;&nbsp;箱：</span>
      <Input slot="right" regex="email" placeholder="请输入邮箱地址"
        v-model="form.email"
        @focus.native.capture="scrollView" />
    </CellItem>
    <CellItem arrow>
        <span slot="left">Time：</span>
        <DateTime type="time" slot="right"
          v-model="form.time" />
    </CellItem>
    <CellItem arrow>
        <span slot="left">Date：</span>
        <DateTime type="date" slot="right"
          v-model="form.date" />
    </CellItem>
    <CellItem arrow>
        <span slot="left">DateTime：</span>
        <DateTime type="datetime" slot="right"
          v-model="form.dateTime" />
    </CellItem>
    <div class="commit">
      <Button size="large" type="primary" shape="circle" class="cmt-btn"
        @click.native.capture="commit">Commit</Button>
    </div>
  </CellGroup>
</template>
<script>
import { CellGroup, CellItem } from 'vue-ydui/dist/lib.rem/cell'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'
import { Input } from 'vue-ydui/dist/lib.rem/input'
import { SendCode } from 'vue-ydui/dist/lib.rem/sendcode'
import { DateTime } from 'vue-ydui/dist/lib.rem/datetime'
import { Button} from 'vue-ydui/dist/lib.rem/button'

import { commitForm, getSteps } from "../api.js";

export default {
  components: {
    CellGroup,
    CellItem,
    Input,
    Confirm,
    Alert,
    Toast,
    Notify,
    Loading,
    SendCode,
    DateTime,
    Button
  },
  data () {
    return {
      scStart: false,
      form: {
        username: '',
        password: '',
        phone: '',
        code: '',
        email: '',
        time: '',
        date: '',
        dateTime: ''
      }
    }
  },
  methods: {
    scrollView (e) {
      setTimeout(() => {
        e.target.scrollIntoViewIfNeeded()
      }, 300);
    },
    commit () {
      commitForm(this.form, data => {
        console.log(JSON.stringify(data))
          Loading.open('提交中...')
          setTimeout(() => {

              this.scStart = true
              Loading.close();

              Toast({
                  mes: '已提交',
                  icon: 'success',
                  timeout: 1500
              });

              location.hash = '/step'

          }, 1000);
      })
    },
    sendCode () {
      Loading.open('发送中...');
      setTimeout(() => {

          this.scStart = true
          Loading.close()

          Toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1500
          });

      }, 1000);
    }
  }
}
</script>
<style lang="stylus" scoped>
.form-group
  margin-top .35rem
.commit
  box-sizing border-box
  padding 0 .5rem .5rem
.cmt-btn
  height .8rem
</style>
