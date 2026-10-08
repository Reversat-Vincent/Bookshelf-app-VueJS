<script setup>
// 404
</script>

<template>
  <q-page id="home" class="fullscreen q-pa-md flex flex-center">
    <q-card flat bordered class="bg-white">
      <q-card-section>
        <app-error>
          <template v-slot:msg>404: Not found</template>
          <app-btn icon="arrow_back" @click="$router.back()"></app-btn>
          <app-btn icon="home" @click="$router.home()"></app-btn>
        </app-error>
      </q-card-section>
    </q-card>
  </q-page>
</template>
