<template>
  <div class="form-bottom">
    <nuxt-link :to="linkSrc">{{ linkText }}</nuxt-link>
    <b-button type="submit" variant="primary">{{ buttonText }}</b-button>
  </div>
</template>

<script>
export default {
  props: {
    linkText: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    linkSrc: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.form-bottom {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  color: black;
}
</style>
