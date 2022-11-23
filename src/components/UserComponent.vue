<template>
  <div id="UserComponent">
    <img
      @click="openMenu = !openMenu"
      data-tooltip-target="tooltip-no-arrow-user"
      data-tooltip-placement="bottom"
      class="rounded-full w-8 cursor-pointer"
      :src="img"
    />
    <div
      v-show="!openMenu"
      id="tooltip-no-arrow-user"
      role="tooltip"
      class="
        inline-block
        absolute
        invisible
        text-xs
        z-10
        py-1
        px-2
        font-medium
        text-white
        rounded-sm
        shadow-sm
        opacity-0
        tooltip
        dark:bg-gray-600
        delay-150
      "
    >
      <div>Google Accout</div>
      <div class="text-gray-300">
        {{ userStore.firstName }} {{ userStore.lastName }}
      </div>
      <div class="text-gray-300">{{ userStore.email }}</div>
    </div>
    <div v-show="openMenu" class="absolute z-10 w-80 right-2 bg-white top-14 rounded-lg custom-shadow">
        <div class="w-full flex justify-center">
            <img
                class="rounded-full w-20 mt-4"
                :src="img"
            />
        </div>
        <div class="text-gray-700 w-full flex justify-center mt-2 text-lg">
            {{ userStore.firstName }} {{ userStore.lastName }}
        </div>
        <div class="text-gray-700 w-full flex justify-center text-sm pb-4 border-b">
            {{ userStore.email }} 
        </div>
        <div class="flex justify-center my-5">
            <button @click="logout" class="bg-transparent text-xs hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-300 rounded">
                Sign out of Gmail
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';

import { useUserStore } from "@/store/user-store";
const userStore = useUserStore();
const router = useRouter()

let openMenu = ref(false);
let img = ref('')

onMounted(() => {
  img.value = userStore.picture
})

const logout = () => {
  userStore.clearUser()
  setTimeout(() => { router.push('/') }, 250)
}
</script>

<style lang="scss">
#UserComponent {
    .custom-shadow {
        box-shadow: -1px 1px 6px -2px rgba(36,36,36,0.58);
        -webkit-box-shadow: -1px 1px 6px -2px rgba(36,36,36,0.58);
        -moz-box-shadow: -1px 1px 6px -2px rgba(36,36,36,0.58);
    }
}
</style>
