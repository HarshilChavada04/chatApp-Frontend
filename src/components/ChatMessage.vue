<template>
    <div>
      <div :class="[intUserId == 0 ? 'items-end' : 'items-start', 'column']">
        <div :class="[intUserId == 0 ? 'chat-message-style-login-user bg-chat-message-sender' : 'chat-message-style-other-user bg-chat-message', strMessageSentTime ? '' : 'q-mb-xs']" class="chat-message-style q-py-sm q-px-lg">
          <span>{{ strMessage }}</span> 
        </div>
        <div v-if="strMessageSentTime" :class="[intUserId == 0 ? 'q-mr-xs' : 'q-ml-xs', 'q-mb-md']">
          <span class="text-subtitle-custom label-text">{{ strMessageSentTime }}</span>
        </div>
      </div>
    </div>
</template>
<script setup>

defineProps({
    // 0 - login user
    // 1 - other user
    intUserId: {
        type: Number,
        default: 0,
    },
    strMessage: {
      type: String,
      default: '',
    },
    strMessageSentTime: {
      type: String,
      default: '',
    }
})
</script>
<style>
.bg-chat-message{
    background-color: #F5F7FB;
    color: #585a5c;
    box-shadow: 0px 1px 5px 0px rgba(52,53,71,0.55);
}
.bg-chat-message-sender{
  background-color: #5966c8;
  color: rgb(233, 233, 233);
  box-shadow: 0px 1px 5px 0px rgba(52,53,71,0.55);
}
.body--dark .bg-chat-message{
    background-color: #343547;
    color: rgb(233, 233, 233);
}

.chat-message-style{
    max-width: 90%;
    border-radius: 12px;
}
.chat-message-style-other-user{
    border-top-right-radius: 35px;
    border-bottom-right-radius: 15px;
}
.chat-message-style-login-user{
  border-top-left-radius: 35px;
  border-bottom-left-radius: 15px;
}
</style>