<template>
    <v-btn @click="toggleTheme" class="float-right">toggle theme</v-btn>
    <router-view></router-view>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>