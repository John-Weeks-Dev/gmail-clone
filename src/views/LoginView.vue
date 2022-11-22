<template>
    <div id="LoginView" class="grid h-screen place-items-center">
        <div>
            <img width="279" src="img/GmailLogin.png" alt="">
            <div class="flex justify-center">
                <GoogleLogin :callback="callback"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/store/user-store'
    import { onMounted } from '@vue/runtime-core'
    import { useRouter } from 'vue-router';

    const userStore = useUserStore()
    const router = useRouter()

    onMounted(() => {
        router.push('/email')
    })

    const callback = async (response) => {
        await userStore.getUserDetailsFromGoogle(response)
        location.href = '/email'
    }
</script>
