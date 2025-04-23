<template>
    <q-page class="q-pa-md">
      <div v-for="msg in messages" :key="msg.createdAt">
        <q-chat-message
          :text="[msg.content]"
          :sent="msg.senderId === myId"
          :stamp="new Date(msg.createdAt).toLocaleTimeString()"
        />
      </div>
  
      <q-input
        filled
        v-model="newMessage"
        label="Type message"
        @keyup.enter="sendMessage"
      />
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
  
  const { proxy } = getCurrentInstance();
  
  const myId = 2;         // Changed for second user
  const receiverId = 1;   // Changed to simulate chat with User 1
  const receiverRoom = `${receiverId}_${myId}`;
  
  const newMessage = ref('');
  const messages = ref([]);
  
  onMounted(() => {
    proxy.$socket.emit('joinRoom', receiverRoom);
  
    proxy.$socket.on('receiveMessage', (data) => {
        console.log(data);
      messages.value.push(data);
    });
  });
  
  onBeforeUnmount(() => {
    proxy.$socket.off('receiveMessage');
  });
  
  function sendMessage() {
    const msg = {
      senderId: myId,
      receiverId,
      receiverRoom,
      content: newMessage.value,
      createdAt: new Date(),
    };
  
    proxy.$socket.emit('sendMessage', msg);
    messages.value.push(msg);
    newMessage.value = '';
  }
  </script>
  