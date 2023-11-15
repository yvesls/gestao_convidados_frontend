<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex justify-center align-center align-self-center fill-height">
      <v-img height="300" class="rounded" src="@/assets/logo.png" />

      <v-card elevation="2" class="pa-5 w-50">
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="E-mail"
            required
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Senha"
            required
          ></v-text-field>
          <v-btn @click="logar" color="secondary" block>
            Login
          </v-btn>
          <v-btn @click="register" small class="mt-2 float-right">
            Registrar-se
          </v-btn>
        </v-form>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script>

</script>
