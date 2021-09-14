<template>
  <div>
    <label class="switch">
      <input type="checkbox">
      <span class="slider">
        <p class="off">OFF</p>
        <p class="on">ON</p>
      </span>
    </label>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>

.off {
  position:absolute;
  left:25px;
  top: 3px;
  z-index:-1;
  color: $white;
  @include noto-sans-tc-10-regular;
}

.on {
  color: $white;
  position:absolute;
  left:6px;
  top: 3px;
  @include noto-sans-tc-10-regular;
}

.switch {
  position: relative;
  display: inline-block;
  width: 51px;
  height: 23px;
  z-index:20;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  z-index:20;
}

.slider {
  z-index:20;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $input-gray;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
  font-size:13px;

  .on {
    display: none;
  }

  .off {
    display: block;
  }
}

.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  top: 2.5px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: $main-green;

  .on {
    display: block;
  }

  .off {
    display: none;
  }
}

input:checked + .slider::before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

</style>
