<script>
export default {
  name: 'NavBar',
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    this.$router.getRoutes().forEach((route) => {
      if (route.meta && route.meta.navBarOrder && route.meta.icon && route.meta.title) {
        this.items.push({
          navBarOrder: route.meta.navBarOrder,
          name: route.name,
          icon: route.meta.icon,
          title: route.meta.title,
        })
      }
    })
    this.items.sort((a, b) => a.navBarOrder - b.navBarOrder)
  },
}
</script>

<template>
  <q-drawer show-if-above :breakpoint="0" persistent :width="$fontSize * 3">
    <q-scroll-area id="navbar">
      <RouterLink :to="{ name: item.name }" v-for="item in items" :key="item">
        <q-icon :name="item.icon" />
        <app-tooltip :anchor="'center right'" :self="'center left'">
          {{ item.title }}
        </app-tooltip>
      </RouterLink>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped>
#navbar {
  height: 100%;
  background-color: var(--q-black-1);
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(3px * var(--fs));
    width: calc(3px * var(--fs));
    border-radius: var(--br);
    &:hover {
      background-color: var(--q-black-3);
    }
    & > i {
      color: var(--q-white);
      font-size: calc(2px * var(--fs));
    }
  }
}
</style>
