<template>
  <div
    id="SingleMessageSection"
    class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm"
  >
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
          <router-link to="/email">
            <IconComponent
              iconString="back"
              :iconSize="19"
              iconColor="#636363"
              text="Back to inbox"
              hoverColor="hover:bg-gray-100"
            />
          </router-link>

          <IconComponent
            @click="deleteEmail(email.id)"
            iconString="trash"
            :iconSize="19"
            iconColor="#636363"
            text="Delete"
            hoverColor="hover:bg-gray-100"
            class="ml-3"
          />
        </div>
        <div class="text-xs text-gray-500">1-50 of 153</div>
      </div>
    </div>

    <div class="w-full text-xl ml-20 font-light pt-5">
      {{ email.subject }}
    </div>

    <div class="w-full flex">
      <img
        class="rounded-full mt-8 mx-5 custom-img"
        src="https://via.placeholder.com/45"
      />
      <div class="w-full my-4 mx-0.5">
        <div class="font-semibold text-sm mt-4 mb-4">
          <div class="w-full flex justify-between items-center">
            <div>{{ email.fromEmail }}</div>
            <div class="mr-5 text-xs font-normal">{{ email.createdAt }}</div>
          </div>
          <span class="text-xs text-gray-500 font-normal">to me</span>
        </div>
        <div>{{ email.body }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useUserStore } from "@/store/user-store";
  import IconComponent from "@/components/IconComponent.vue";

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()

  let email = ref({})

  onMounted(async () => {
    const res = await userStore.getEmailById(route.params.id)

    await userStore.emailHasBeenViewed(res.id)

    email.value = {
      id: res.id,
      body: res.body,
      createdAt: res.createdAt,
      firstName: res.firstName,
      fromEmail: res.fromEmail,
      lastName: res.lastName,
      subject: res.subject,
      hasViewed: res.hasViewed,
      toEmail: res.toEmail
    }
  })

  const deleteEmail = async (id) => {
    let res = confirm("Are you sure you want to delete this?");
    if (res) { 
      await userStore.deleteEmail(id)
      setTimeout(() => { router.push('/email') }, 250)
    }

  }
</script>

<style lang="scss" setup>
#SingleMessageSection {
  .custom-img {
    width: 40px;
    height: 40px;
  }
}
</style>
