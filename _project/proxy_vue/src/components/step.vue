<template>
  <Step theme="2" current="3" current-color="#04BE02">
    <StepItem>
      <span slot="top">A</span>
      <span slot="bottom">1</span>
    </StepItem>
    <StepItem>
      <span slot="top">B</span>
    </StepItem>
    <StepItem>
      <span slot="top">C</span>
    </StepItem>
    <StepItem>
      <span slot="top">D</span>
      <span slot="bottom">2</span>
    </StepItem>
  </Step>
</template>
<script>
import { Step, StepItem } from 'vue-ydui/dist/lib.rem/step'

export default {
  components: {
    Step,
    StepItem
  }
}
</script>
