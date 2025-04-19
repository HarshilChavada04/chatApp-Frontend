<template>
  <q-layout view="lHh Lpr lFf" class="overflow-hidden">
    <div class="flex text-theme justify-between bg-transparent" style="margin: 20px;">
      <span class="text-h6">ChatTiko</span>
      <div>
        <q-btn label="Log out" no-caps icon-right="logout" flat></q-btn>
      </div>
    </div>
    <q-page-container style="margin: 20px;"> 
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
body{

}
</style>