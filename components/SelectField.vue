<template>
  <div class="select-wrapper">
    <select
      v-model="model"
      class="select"
      name="filter"
    >
      <option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      class="select-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6551 0.103514C12.7208 0.0372643 12.8103 -5.20037e-08 12.9036 -4.7925e-08C12.9969 -4.38464e-08 13.0864 0.0372643 13.1521 0.103514L13.894 0.845401C13.9616 0.908905 14 0.997568 14 1.09036C14 1.18316 13.9616 1.27182 13.894 1.33533L7.46193 7.76735C7.36358 7.86582 7.23016 7.9212 7.09099 7.92133L6.90901 7.92133C6.76984 7.9212 6.63642 7.86582 6.53807 7.76735L0.106047 1.33533C0.0383834 1.27182 9.01957e-07 1.18316 9.06013e-07 1.09036C9.10069e-07 0.997567 0.0383834 0.908904 0.106047 0.8454L0.847934 0.103513C0.913642 0.0372638 1.00309 -5.68113e-07 1.0964 -5.64034e-07C1.18971 -5.59956e-07 1.27915 0.0372638 1.34486 0.103513L7 5.75865L12.6551 0.103514Z"
        fill="black"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<string>();

const {options} = defineProps<{
  options: {label: string; value: string}[]
}>();
</script>

<style lang="scss" scoped>

.select {
  appearance: none;
  background-color: transparent;
  border: 1px solid var(--color-gray);
  padding: 15px 30px 15px 12px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  line-height: 22px;

  &-wrapper {
  position: relative;
}

&-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  z-index: 0;
}
}
</style>