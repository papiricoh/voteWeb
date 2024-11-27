<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
    indicatorPosition() {
      return `${((this.selectedValue + 100) / 2000)}%`;
    },
    cssIndicatorPosition() {
      if(this.selectedValue < 0) {
        return 'translateX(' + -this.selectedValue * 0.5 + '%)';
      }else if (this.selectedValue > 0) {
        return 'translateX(-' + this.selectedValue * 0.5 + '%)';
      }
      return 'translateX(0px)';
    },
    ideologyToString() {
      if (this.selectedValue == 0) return 'Centrista';
      if (this.selectedValue > 0 && this.selectedValue <= 20) return 'Demo-Cristiano';
      if (this.selectedValue > 20 && this.selectedValue <= 40) return 'Libertario';
      if (this.selectedValue > 40 && this.selectedValue <= 60) return 'Conservador';
      if (this.selectedValue > 60 && this.selectedValue <= 80) return 'Nacionalista';
      if (this.selectedValue > 80 && this.selectedValue <= 100) return 'Ultra-Nacionalista';
      if (this.selectedValue < 0 && this.selectedValue >= -20) return 'Social-liberal';
      if (this.selectedValue < -20 && this.selectedValue >= -40) return 'Social-demócrata';
      if (this.selectedValue < -40 && this.selectedValue >= -60) return 'Socialista';
      if (this.selectedValue < -60 && this.selectedValue >= -80) return 'Comunista';
      if (this.selectedValue < -80 && this.selectedValue >= -100) return 'Anarco-Comunista';

      return 'Centrista';
    },
  },
};
</script>

<template>
  <div class="ideology_container">
    
    <input :disabled="isDisabled"
      type="range"
      min="-100"
      max="100"
      step="1"
      v-model="selectedValue"
      class="slider"
    />
    
    <div
      class="value-indicator"
      :style="{ left: indicatorPosition, transform: cssIndicatorPosition }"
    >
      {{ ideologyToString }}
    </div>
  </div>
</template>

<style scoped>
.ideology_container {
  position: relative;
  width: 100%;
  height: 1.6rem;
  background: linear-gradient(
    90deg,
    rgba(121, 0, 0, 1) 0%,
    rgba(254, 0, 0, 1) 30%,
    rgba(255, 255, 255, 1) 50%,
    rgba(0, 65, 255, 1) 70%,
    rgba(0, 32, 126, 1) 100%
  );
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.6rem;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  pointer-events: all;
  margin: 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  background-color: var(--white);
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.value-indicator {
  position: relative;
  top: 2rem;
  background-color: #fff;
  color: #000;
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
  border: 1px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  pointer-events: none;
  display: none;
}

.ideology_container:hover .value-indicator {
  display: block;
}
</style>
