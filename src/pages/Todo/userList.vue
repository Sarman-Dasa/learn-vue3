<script setup>
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import myMixin from "../../mixin";
const userListData = ref([]);
const totalCount = ref();
const userFilter = ref({
  page: 1,
  perPage: 10,
  sortBy: [""],
  sortDesc: [false],
});

const page = ref(1);
const perPage = ref(10);
const PerPageOption = ref([10, 25, 50, 75, 100]);
watch(page, (newvalue) => {
  console.log(newvalue);
  userList();
});

watch(perPage, (newvalue) => {
  page.value = 1;
  userList();
});

onMounted(() => {
  userList();
});

const { myTestMixinFunction, PostApi, GetApi } = myMixin();
myTestMixinFunction(123);

// get user List
async function userList() {
  // let token = CryptoJS.AES.decrypt(
  //   localStorage.getItem("accessToken"),
  //   import.meta.env.VITE_SECRET_KEY
  // );
  // token = token.toString(CryptoJS.enc.Utf8);

  let response = await PostApi(
    "list",
    {
      page: page.value,
      perPage:
        perPage.value && perPage.value != -1 ? perPage.value : totalCount.value,
    },
    false
  );

  if (response && response.status == 200) {
    const data = response.data;
    userListData.value = data.users;
    console.log("userListData.value: ", userListData.value);
    totalCount.value = data.count;
    console.log(" totalCount.value: ", totalCount.value);
  }
}

//Delete
async function deleteUser(id) {
  console.log("Delete Api");
  Swal.fire({
    title: "Are You sure To Delete User.",
    text: "Record can't retrive !",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "primary",
  }).then((response) => {
    if (response.isConfirmed) {
      console.log("Delete Success");
    }
  });
}

const headers = [
  {
    title: "ID",
    sortable: false,
    key: "id",
  },
  {
    title: "NAME",
    key: "full_name",
  },
  {
    title: "EMAIL",
    key: "email",
  },
  {
    title: "PHONE",
    key: "phone",
  },
  {
    title: "ROLE",
    key: "role.role",
  },
  {
    title: "ACTIVE",
    key: "is_active",
  },
  {
    title: "ACTION",
    key: "action",
  },
];
</script>

<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="userListData"
      v-model:items-per-page="perPage"
      fixed-footer="false"
    >
      <template #item.is_active="{ item }">
        <VChip
          :color="item.raw.is_active ? 'success' : 'error'"
          class="font-weight-medium"
          size="small"
        >
          {{ item.is_active ? "Active" : "Deactive" }}
        </VChip>
      </template>
      <template #item.action="{ item }">
        <IconBtn @click="deleteUser(item.raw.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
      <template #bottom>
        <div
          class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2"
        >
          <v-select
            label="PerPage"
            v-model="perPage"
            :items="PerPageOption"
            style="max-inline-size: 10px; min-inline-size: 5rem"
          ></v-select>

          <VPagination
            v-model="page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(totalCount / perPage)"
          />
        </div>
      </template>
    </VDataTable>
  </div>
</template>
