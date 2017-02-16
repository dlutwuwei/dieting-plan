<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
  .card {
    .card-header {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #47a304;
      background-color: #fff;
    }
  }
</style>