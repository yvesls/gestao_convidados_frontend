<template>
  <v-app-bar flat :elevation="16" scroll-behavior="collapse">
    <v-app-bar-title>
      Guest Management
    </v-app-bar-title>
    <v-btn @click="toggleTheme" class="float-right">toggle theme</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>
