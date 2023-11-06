<script setup>
import { requiredValidator } from "@validators";
import axios from "axios";
import { reactive, ref } from "vue";
import { toast } from "vue3-toastify";

const refTodoForm = ref();

const todoDetail = reactive({
  title: null,
  due_date: null,
  description: null,
  status: null,
  priority: null,
  user_id: null,
  user_id: 3,
});

const priorityOptions = ref([
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]);

const statusOptions = ref([
  { label: "Done", value: 1 },
  { label: "Pending", value: 0 },
]);

// check from validation
function checkValidation() {
  console.log("call");
  refTodoForm.value?.validate().then(({ valid: isValid }) => {
    console.log("isValid: ", isValid);

    if (isValid) {
      addTodo();
    }
  });
}

//store todo list
async function addTodo() {
  const date = new Date(todoDetail.due_date);
  todoDetail.due_date = date.toISOString().split("T")[0];

  let response = await axios.post("todo/create", todoDetail);
  toast(response.data.message, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    type: "info",
    closeButton: false,
    hideProgressBar: true,
  });
  console.log("call", response);
}
</script>
<template>
  <v-form @submit.prevent="checkValidation" ref="refTodoForm">
    <VRow>
      <!-- Title -->
      <VCol cols="6">
        <v-text-field
          label="Title"
          v-model="todoDetail.title"
          :rules="[requiredValidator]"
        />
      </VCol>

      <!-- Due Date -->
      <VCol cols="6">
        <VueDatePicker
          v-model="todoDetail.due_date"
          placeholder="due date"
          :rules="[requiredValidator]"
          auto-apply
          emit-timezone="UTC"
          format="yyyy/MM/dd"
        ></VueDatePicker>
      </VCol>

      <!-- Description -->
      <VCol cols="6">
        <v-textarea
          label="Description"
          v-model="todoDetail.description"
          auto-grow
          variant="outlined"
          rows="4"
          row-height="25"
          shaped
          :rules="[requiredValidator]"
        ></v-textarea>
      </VCol>

      <!-- Status & Priority -->
      <VCol cols="6">
        <v-select
          label="Status"
          v-model="todoDetail.status"
          :items="statusOptions"
          item-title="label"
          item-value="value"
          :clearable="true"
          :rules="[requiredValidator]"
        ></v-select>

        <v-select
          label="Priority"
          v-model="todoDetail.priority"
          :items="priorityOptions"
          item-title="label"
          item-value="value"
          :clearable="true"
          style="margin-top: 22px"
          :rules="[requiredValidator]"
        ></v-select>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" class="text-center">
        <VBtn type="submit">SAVE </VBtn>
      </VCol>
    </VRow>
  </v-form>
</template>
