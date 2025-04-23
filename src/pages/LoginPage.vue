<template> 
    <div class="row items-center justify-center" style="height: 100vh">
        <div class="row main-card q-pa-lg" style="width: 60vw;">
            <div class="column justify-around col q-px-xl q-py-lg" style="background-color: #F2F4F8; border-radius: 6px;">
                <div class="logo-style row justify-center items-center">
                    <div class="logo-style-circle">
                    </div>
                </div>
                <div class="column q-gutter-y-md">
                    <span class="text-h5 text-weight-medium">Let us help you run your freelance business.</span>
                    <span class="label-text text-subtitle-size">Our registration process is quick and easy, taking no more than 10 minutes to complete.</span>
                </div>
                <div class="review-card q-px-md q-py-lg" :class="isLoginForm ? 'q-mt-xl' : ''" style="position: relative;">
                    <img src="../assets/arrow.png" alt="" width="50px" style="position: absolute; top: -12px; left: 12px;"/>
                    <q-carousel
                        v-model="slide"
                        infinite
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        :autoplay="autoplay"
                        swipeable
                        animated
                        control-color="amber"
                        @mouseenter="autoplay = false"
                        @mouseleave="autoplay = true"
                    >
                        <q-carousel-slide v-for="(data, index) in feedbackData" :key="index" :name="index+1" class="q-pa-none q-pt-md">
                            <div>
                                <span>
                                    {{ data.text }}
                                </span>
                                <div class="row q-mt-md">
                                    <img :src="`https://cdn.quasar.dev/img/${data.avatar}`" width="40px" height="40px" style="border-radius: 50%">
                                    <div class="column q-ml-md justify-center">
                                        <span class="text-white text-bold">{{ data.name }}</span>
                                        <span class="label-text">{{ data.designation }}</span>
                                    </div>
                                </div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </div>
            <div class="col column q-px-xl q-py-lg" style="border-radius: 6px;">
                <span class="text-h5 text-weight-medium">{{ isLoginForm ? 'Welcome back' : 'Get started' }}</span>
                <span class="label-text text-subtitle2 q-mt-sm">{{ isLoginForm ? 'Login to your account' : 'Create your account now' }}</span>
                <q-form @submit="handleAuthentication">
                    <div v-if="!isLoginForm" class="q-gutter-y-md q-my-lg">
                        <div>
                            <span class="text-subtitle-size label-text">Full name</span>
                            <q-input
                                outlined
                                dense
                                v-model="strFullName"
                            >
                            </q-input>
                        </div>
                        <div>
                            <span class="text-subtitle-size label-text">Email</span>
                            <q-input
                                outlined
                                dense
                                v-model="strEmail"
                            >
                            </q-input>
                        </div>
                        <div>
                            <span class="text-subtitle-size label-text">Password</span>
                            <q-input
                                outlined
                                dense
                                v-model="strPassword"
                            >
                            </q-input>
                        </div>
                        <div>
                            <span class="text-subtitle-size label-text">Display name</span>
                            <q-input
                                outlined
                                dense
                                v-model="strDisplayName"
                            >
                            </q-input>
                        </div>
                        <div>
                            <span class="text-subtitle-size label-text">Phone</span>
                            <q-input
                                outlined
                                dense
                                v-model="strPhone"
                            >
                            </q-input>
                        </div>
                        <div>
                            <span class="text-subtitle-size label-text">Address</span>
                            <q-input
                                outlined
                                dense
                                autogrow
                                v-model="strAddress"
                            >
                            </q-input>
                        </div>
                    </div>
                    <div v-else class="q-gutter-y-md q-my-lg">
                        <div>
                            <span class="text-subtitle-size label-text">Email</span>
                            <q-input
                                outlined
                                dense
                                v-model="strEmail"
                                hide-bottom-space
                                :rules="[val => !!val && val.trim().length > 0 || 'Please enter email' ]"
                            >
                            </q-input>
                        </div>
                        <div>
                            <span class="text-subtitle-size label-text">Password</span>
                            <q-input
                                outlined
                                dense
                                v-model="strPassword"
                                hide-bottom-space
                                :rules="[val => !!val && val.trim().length > 0 || 'Please enter password' ]"
                            >
                            </q-input>
                        </div>
                    </div>
                    <q-btn 
                        type="submit"
                        :label="isLoginForm ? 'Login' : 'Sign Up'" 
                        no-caps
                        class="full-width text-white text-weight-medium q-py-sm"
                        dense
                        flat
                        style="background-color: #3C37FF; border-radius: 8px;"
                    >
                    </q-btn>
                </q-form>
                <span class="text-center label-text q-mt-md">{{ isLoginForm ? "Don't have an account?" : 'Have an account?' }}<q-btn style="color: #3C37FF;" class="text-weight-medium q-px-sm" @click="isLoginForm = !isLoginForm" :label="isLoginForm ? 'Sign up' : 'Login'" no-caps flat dense></q-btn> </span>
            </div>
        </div>
    </div>
</template>
<!-- https://dribbble.com/shots/23563745-Feedback-Interaction (UI for feedback) -->
<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const strFullName = ref('');
const strEmail = ref('');
const strPassword = ref('');
const strPhone = ref('');
const strAddress = ref('');
const strDisplayName = ref('');
const slide = ref(1);
const autoplay = ref(true);
const router = useRouter();
const feedbackData = [ 
    {
        id: 1,
        name: 'Prins Kamariya',
        text: "This chat app has completely changed the way my team communicates. It's fast, intuitive, and keeps everything organized in one place!",
        avatar: 'avatar2.jpg',
        designation: 'Programmer Analyst'
    }, 
    {
        id: 2,
        name: 'Harsh Patel',
        text: "I love how seamless and real-time the messaging is. The group chat and file sharing features make collaboration so easy!",
        avatar: 'avatar6.jpg',
        designation: 'Business Analyst'
    },
    {
        id: 3,
        name: 'Chandani Chavada',
        text: "The UI is clean and user-friendly. I was able to get started within minutes. Highly recommend it for anyone managing remote teams.",
        avatar: 'avatar6.jpg',
        designation: 'Team Lead'
    } 
];
const isLoginForm = ref(false);
const auth = useAuthStore();

function handleAuthentication(){
    let objData = {
        email: strEmail.value,
        password: strPassword.value,
    }
    api.post('/api/login', objData).then((response) => {
        auth.setThemes(false);
        router.push('/chat-screen');
        auth.setToken(response.data.token);
    })
};

</script>

<style>
body{
    background-color: #BEC3CF;
}
.main-card{
    border-radius: 12px;
    background-color: white;
}
.first-child{
    border-radius: 12px;
}
.text-subtitle-size{
    font-size: 14px;
}
.review-card{
    border-radius: 10px;
    background-color: #2D3346;
    color: whitesmoke;
    overflow: auto;
}
.q-carousel{
    background-color: transparent;
    height: fit-content;
}
.logo-style{
    width: 22px;
    height: 22px;
    border-radius: 5px;
    background-color: #3C37FF;
}
.logo-style-circle{
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: white;
}
</style>