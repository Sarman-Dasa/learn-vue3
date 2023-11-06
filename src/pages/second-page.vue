<script setup>
import { useRouter } from "vue-router";

let router = useRouter();
function redirectToPage() {
  router.push("/customepage/mypage");
}
</script>

<template>
  <div>
    <VCard title="Create Awesome 🙌">
      <VCardText>This is your second page.</VCardText>
      <VCardText>
        Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
        Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie wafer
        tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
        <!-- <VBtn @click="redirectToPage"> </VBtn> -->
        <v-btn
          density="default"
          icon="mdi-open-in-new"
          @click="redirectToPage"
        ></v-btn>
      </VCardText>
    </VCard>
  </div>
</template>
