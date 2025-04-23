<template>
  <div>
    <div class="header-class row justify-between items-center q-px-md">
      <div>
        <label class="label-text">Your status:</label>
        <span class="q-ml-md">Hey team, How are you?</span>
      </div>
      <div>
        <label class="label-text">Local Time: </label>
        <span class="q-ml-md">{{ currentTime }}</span>
      </div>
      <div class="row items-center">
        <label class="label-text">Theme: </label>
        <q-toggle
          v-model="isDark"
          color="primary"
          left-label
        />
      </div>
    </div>
    <div class="col-12 row q-my-lg" >
      <div class="col-3">
        <div>
          <q-input 
            class="header-class"
            placeholder="Search..."
            outlined
            dense
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="q-mt-lg header-class q-py-md">
          <q-list class="overflow-auto med-smooth-scroll" style="height: calc(100vh - 260px);">
            <div v-for="(data) in contactData" :key="data.id">
              <q-item clickable v-ripple class="q-mx-md q-my-sm custom-item" @click="intClickedIndex = data.id" :active="intClickedIndex == data.id" active-class="active-item-class">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="`https://cdn.quasar.dev/img/${data.avatar}`">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1" class="text-bold">{{ data.name }}</q-item-label>
                  <q-item-label caption lines="1">
                    <span class="label-text">
                      {{ data.text }}
                    </span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <span class="text-subtitle-custom label-text">
                    {{ formatTime(data.time) }}
                  </span>
                </q-item-section>
              </q-item>
              <q-separator class="q-mx-md"/>
            </div>
          </q-list>
        </div>
      </div>
      <div class="col q-ml-lg">
        <div class="header-class bg-img-chat">
          <q-bar dense class="bar-bg-color q-pa-md" style="height: fit-content;">
            <img :src="`https://cdn.quasar.dev/img/avatar2.jpg`" width="35px" height="35px" style="border-radius: 50%;">
            <div class="ellipsis">
              <span class="text-h6 text-bold q-ml-sm">Prins Kamariya</span>
            </div>
            <q-space />
            <div class="q-gutter-md">
              <q-btn
                label="Clear all"
                size="13px"
                no-caps
                flat
                dense
                class="border-radius-6 q-px-md q-py-xs label-text"
              >
              </q-btn>
              <q-btn
                label="Profile"
                dense
                size="13px"
                no-caps
                @click="blnShowProfileCard = true"
                class="profile-btn border-radius-6 q-px-md q-py-xs label-text"
              />
            </div>
          </q-bar>
          <div class="q-pt-md q-px-md overflow-auto med-smooth-scroll chat-height">
            <div v-for="(data, index) in arrMessTempData" :key="index">
              <chat-message :intUserId="data.senderId == tempLoginUserId  ? 0 : 1" :strMessage="data.content" :strMessageSentTime="getDisplayTime(index)"></chat-message>
            </div>
          </div>
        </div>
        <div class="row q-gutter-x-sm q-mt-sm">
          <q-input
            v-model="strMessageToSent"
            placeholder="Write a message..."
            outlined
            dense
            class="header-class col"
          >
          </q-input>
          <q-btn 
            icon-right="send"
            outlined
            class="send-message-btn q-pa-sm"
            dense
          >
          </q-btn>
        </div>
      </div>
      <div v-if="blnShowProfileCard" class="q-ml-lg">
        <profile-card v-model:dialog="blnShowProfileCard" />
      </div>
    </div>
  </div>
</template>


<script setup>
  import { ref, watch, onMounted } from 'vue';
  import chatMessage from '../components/ChatMessage.vue/';
  import ProfileCard from 'src/components/ProfileCard.vue';
  import { useQuasar } from 'quasar';

  const $q = useQuasar();
  const isDark = ref($q.dark.isActive);
  const arrMessTempData = ref(
    [
      {
        "id": 1,
        "senderId": 1,
        "receiverId": 2,
        "content": "Hello chandani",
        "createdAt": "2025-04-19T17:18:55.000Z",
        "updatedAt": "2025-04-19T17:18:55.000Z"
      },
      {
        "id": 2,
        "senderId": 1,
        "receiverId": 2,
        "content": "Hello!! Are you there??",
        "createdAt": "2025-04-19T17:18:55.000Z",
        "updatedAt": "2025-04-19T17:18:55.000Z"
      },
      {
        "id": 2,
        "senderId": 2,
        "receiverId": 1,
        "content": "Hi harshil! How are you bro?",
        "createdAt": "2025-04-19T17:20:40.000Z",
        "updatedAt": "2025-04-19T17:21:40.000Z"
      },
      {
        "id": 2,
        "senderId": 2,
        "receiverId": 1,
        "content": "Hi harshil! How are you bro?",
        "createdAt": "2025-04-19T17:21:40.000Z",
        "updatedAt": "2025-04-19T17:21:40.000Z"
      },
      {
        "id": 2,
        "senderId": 2,
        "receiverId": 1,
        "content": "Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro? Hi harshil! How are you bro?",
        "createdAt": "2025-04-19T17:21:40.000Z",
        "updatedAt": "2025-04-19T17:22:40.000Z"
      }
    ]
  );
  const contactData = [ 
    {
      id: 1,
      name: 'Prins Kamariya',
      text: 'Hello harry! Pickle ball ramva aavu k?',
      avatar: 'avatar2.jpg',
      time: '2025-04-19T17:21:40.000Z',
    }, 
    {
      id: 2,
      name: 'Harsh Patel',
      text: 'Agar tumhare paas 10 aam hain, aur tumhare dost ne 3 maang liye, toh tumhare paas kitne aam bache?',
      avatar: 'avatar6.jpg',
      time: '2025-04-19T17:21:40.000Z',
    },
    {
      id: 3,
      name: 'Chandani Chavada',
      text: 'Hi harshil! How are you bro?',
      avatar: 'avatar6.jpg',
      time: '2025-04-19T17:21:40.000Z',
    } 
  ];
  const currentTime = ref('');
  const tempLoginUserId = ref(1);
  const intClickedIndex = ref(null);
  const blnShowProfileCard = ref(false);

  function updateTime(){
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  function getDisplayTime(index) {
    const current = arrMessTempData.value[index];
    const currentTime = formatTime(current.createdAt);

    // Always show time if it's the last message
    if (index === arrMessTempData.value.length - 1) {
      return currentTime;
    }

    const next = arrMessTempData.value[index + 1];
    const nextTime = next ? formatTime(next.createdAt) : null;

    return currentTime !== nextTime ? currentTime : '';
  }

  onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);
  });

  watch(isDark, (val) => {
    $q.dark.set(val);
  }, {immediate: true, deep: true});
</script>
<style>
.custom-item:hover{
  border-radius: 8px;
}
.body--dark .custom-item:hover{
  background-color: #343547 !important;
}
.profile-btn{
  background-color: white;
  box-shadow: none;
}
.body--dark .profile-btn{
  background-color: #232523;
}
.active-item-class{
  background-color: #F6FAFD;
  color: black;
  border-radius: 8px;
  box-shadow: 0px 1px 5px 0px rgba(119, 120, 137, 0.55);
}
.body--dark .active-item-class{
  background-color: #303040;
  color: white;
  box-shadow: 0px 1px 5px 0px rgba(52,53,71,0.55);
}
.send-message-btn{
  border-radius: 8px;
  background-color: #5b66cb;
  color: white;
  font-size: 12px;
}
.bg-img-chat{
  background-image: url('../assets/bg-img-chat.png');
  background-color: transparent;
}
.chat-height{
  height: calc(100vh - 280px);
}
.q-field--dark .q-field__control:before {
    border-color: none;
}
.q-field--outlined .q-field__control:before {
    border: none; 
}
</style>

<!-- <template>
  <div>
    <div v-for="msg in messages" :key="msg.createdAt">
      <p><strong>{{ msg.senderId === myId ? 'You' : 'Them' }}:</strong> {{ msg.content }}</p>
    </div>

    <q-input filled v-model="newMessage" @keyup.enter="sendMessage" label="Type a message" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance(); // to use this.$socket

const myId = 1; // Normally from login info or token
const receiverId = 2;
const receiverRoom = `${myId}_${receiverId}`;

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
</script> -->
