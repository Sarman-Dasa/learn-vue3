<script setup>
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2RegisterIllustrationBorderedDark from "@images/pages/auth-v2-register-illustration-bordered-dark.png";
import authV2RegisterIllustrationBorderedLight from "@images/pages/auth-v2-register-illustration-bordered-light.png";
import authV2RegisterIllustrationDark from "@images/pages/auth-v2-register-illustration-dark.png";
import authV2RegisterIllustrationLight from "@images/pages/auth-v2-register-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import {
  alphaDashValidator,
  emailValidator,
  integerValidator,
  lengthValidator,
  requiredValidator,
} from "@validators";
import axios from "axios";
import { reactive } from "vue";
import { VForm } from "vuetify/components/VForm";

const refVForm = ref();
const username = ref("johnDoe");
const email = ref("john@example.com");
const password = ref("john@VUEXY#123");

const userDetail = reactive({
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  password: null,
  password_confirmation: null,
});
const privacyPolicies = ref(true);

// Router
const route = useRoute();
const router = useRouter();


async function register() {
  let res = await axios.post("register", userDetail);
  

  if (res && res.status == 200) {
    router.push("/login");
  }
}

// Form Errors
const errors = ref({
  email: undefined,
  password: undefined,
});

const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) register();
  });
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="441"
            :src="imageVariant"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </div>
    </VCol>

    <VCol cols="12" lg="4" class="d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-2 text-center"
          />
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- firstName -->
              <VCol cols="12">
                <AppTextField
                  v-model="userDetail.first_name"
                  autofocus
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="First Name"
                />
              </VCol>

              <!-- lastName -->

              <VCol cols="12">
                <AppTextField
                  v-model="userDetail.last_name"
                  autofocus
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="Last Name"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="userDetail.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                />
              </VCol>

              <!-- phone -->
              <VCol cols="12">
                <AppTextField
                  v-model="userDetail.phone"
                  :rules="[
                    requiredValidator,
                    integerValidator,
                    lengthValidator(userDetail.phone, 10),
                  ]"
                  label="Phone"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="userDetail.password"
                  :rules="[requiredValidator]"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>
              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="userDetail.password_confirmation"
                  :rules="[requiredValidator]"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        I agree to
                        <a href="javascript:void(0)" class="text-primary"
                          >privacy policy & terms</a
                        >
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn block type="submit"> Sign up </VBtn>
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center text-base">
                <span>Already have an account?</span>
                <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                  Sign in instead
                </RouterLink>
              </VCol>

              <!-- <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol> -->

              <!-- auth providers -->
              <!-- <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol> -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
