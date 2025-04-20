<template>
    <div v-if="blnShowProfileCardDialog" class="header-class q-py-xs">
        <div class="row justify-between items-baseline q-px-sm">
            <span class="label-text">Profile</span>
            <q-btn class="label-text" flat dense no-caps @click="blnShowProfileCardDialog = false">Close</q-btn>
        </div>
        <div class="column justify-center items-center q-px-xl">
            <img :src="`https://cdn.quasar.dev/img/avatar2.jpg`" class="header-class profile-img-style">
            <span class="text-h6 text-weight-bold q-mt-sm">Prins Kamariya</span>
            <span class="label-text">@prins</span>
        </div>
        <div class="q-pl-lg q-mt-md q-gutter-y-md overflow-auto med-smooth-scroll" style="height: calc(100vh - 365px);">
            <div class="column">
                <span class="label-text">Display name</span>
                <span>Prins K</span>
            </div>
            <div class="column">
                <span class="label-text">Email Address</span>
                <span>prinsk@meditab.com</span>
            </div>
            <div class="column">
                <span class="label-text">Address</span>
                <span>Kalasagar Mall</span>
            </div>
            <div class="column">
                <span class="label-text">Local Time</span>
                <span>11:40 AM</span>
            </div>
            <div class="column">
                <span>Phone number</span>
                <span>+916355732539</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    const blnShowProfileCardDialog = defineModel('dialog');
</script>

<style>
.profile-img-style{
    width: 60%;
    border-radius: 50% !important;
}
.profile-card-height{
    height: calc(100vh - 367px);
    overflow: auto;
}
</style>

