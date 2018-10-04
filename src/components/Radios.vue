<template>
    <div class="radios clearfix">
      <label class="radios-lable fl" v-for="(item ,index) in options" :key="index">
        <div class="radios-title-wrap">
          <span class="radios-title">{{item.name}}</span>
        </div>
        <input type="radio" class="radio-item" v-model="currentValue" :value="item._id">
      </label>
    </div>
</template>

<script>
    export default {
        props : {
          options : {
            type : Array
          },
          value : String
        },
      data() {
          return {
            currentValue : this.value
          }
      },
      watch : {
          value(val) {
            this.currentValue = val
          },
        currentValue(val) {
            this.$emit('input',val);
            this.$emit('change',val)
        }
      }
    }
</script>

<style lang="scss">
  .radio-item{
    display: none;
  }
  .radios-title-wrap{
    padding: 10px 15px;
    font-size: 14px;
    color: #444;
    font-weight: 400;
    border: 1px solid #f1f1f1;
    border-radius: 6px;
    margin-right: 20px;
    cursor: pointer;
  }
  .radio-item:checked + .radios-title-wrap{
    color: #fff;
    background: #409eff;
  }
</style>
