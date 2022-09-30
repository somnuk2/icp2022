<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $store.getters.myStatus }}:
          <label for="member_id">{{ $store.getters.myMember_id }}</label>
          /
          <label for="myName">{{ $store.getters.myName }}</label>
        </q-toolbar-title>
        <div>
          <q-toolbar-title shrink class="text-weight-bold">
            <q-btn
              v-if="!$store.getters.myAuthenticate"
              flat
              round
              dense
              icon="login"
              to="/LoginPage"
              ><q-tooltip :target="true"> เข้าสู่ระบบ </q-tooltip>
            </q-btn>
            <q-btn
              v-if="$store.getters.myAuthenticate"
              flat
              round
              dense
              icon="logout"
              to="/LogoutPage"
            >
              <q-tooltip :target="true"> ออกจากระบบ </q-tooltip>
            </q-btn>
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>
    <!-- ผู้ใช้ทั่วไป -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="
        $store.getters.myAuthenticate == true &&
        $store.getters.myStatus == 'user'
      "
    >
      <q-list>
        <q-item-label header> Individual Career Planning (user)</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <!-- ผู้ดูแลระบบ -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="
        $store.getters.myAuthenticate == true &&
        $store.getters.myStatus == 'admin'
      "
    >
      <q-list>
        <q-item-label header> Individual Career Planning (admin)</q-item-label>
        <EssentialLink
          v-for="link in administrationLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  // ผู้ใช้ทั่วไป
  {
    title: "การลงทะเบียน",
    caption: "ข้อมูลการลงทะเบียน",
    icon: "perm_identity",
    link: "/FormRegistration",
  },
  {
    title: "กรอกข้อมูลส่วนตัว",
    caption: "การศึกษา ความพิการ",
    icon: "lock_outline",
    link: "/FormComponent",
  },
  {
    title: "กำหนดอาชีพเป้าหมาย",
    caption: "อาชีพในอนาคต",
    icon: "work_history",
    link: "/FormPlanCareer",
  },
  {
    title: "กำหนดคุณสมบัติ/ทักษะ",
    caption: "คุณสมบัติและทักษะ เป้าหมาย ระดับ",
    icon: "fact_check",
    link: "/FormQualification",
  },
  {
    title: "การพัฒนาตนเอง",
    caption: "ศึกษาเรียนรู้ ฝึกปฏิบัติ",
    icon: "post_add",
    link: "/FormPlan",
  },
  {
    title: "รายงานการพัฒนาตนเอง",
    caption: "การพัฒนาตนเอง",
    icon: "summarize",
    link: "/FormReport",
  },
  {
    title: "การประเมินตนเอง",
    caption: "เดือน ระดับ",
    icon: "checklist_rtl",
    link: "/FormSelfAssessment",
  },
  {
    title: "รายงานการประเมินตนเอง",
    caption: "การประเมินตนเอง",
    icon: "summarize",
    link: "/FormPivotTable",
  },
];
const adminList = [
  // ผู้ใช้ทั่วไป
  {
    title: "จัดการลงทะเบียน",
    caption: "ข้อมูลการลงทะเบียน",
    icon: "perm_identity",
    link: "/AdminFormRegistration",
  },
  {
    title: "จัดการข้อมูลส่วนตัว",
    caption: "การศึกษา ความพิการ",
    icon: "lock_outline",
    link: "/AdminFormComponent",
  },
  {
    title: "จัดการอาชีพเป้าหมาย",
    caption: "อาชีพในอนาคต",
    icon: "work_history",
    link: "/AdminFormPlanCareer",
  },
  {
    title: "จัดการคุณสมบัติ/ทักษะ",
    caption: "คุณสมบัติและทักษะ เป้าหมาย ระดับ",
    icon: "fact_check",
    link: "/AdminFormQualification",
  },
  {
    title: "จัดการพัฒนาตนเอง",
    caption: "ศึกษาเรียนรู้ ฝึกปฏิบัติ",
    icon: "post_add",
    link: "/AdminFormPlan",
  },
  {
    title: "รายงานการพัฒนาตนเอง",
    caption: "การพัฒนาตนเอง",
    icon: "summarize",
    link: "/AdminFormReport",
  },
  {
    title: "จัดการประเมินตนเอง",
    caption: "เดือน ระดับ",
    icon: "checklist_rtl",
    link: "/AdminFormSelfAssessment",
  },
  {
    title: "รายงานการประเมินตนเอง",
    caption: "การประเมินตนเอง",
    icon: "summarize",
    link: "/AdminFormPivotTable",
  },
];

export default defineComponent({
  name: "MainLayout",
  data() {
    return {};
  },
  components: {
    EssentialLink,
  },
  methods: {
    onLogin() {
      this.$router.replace({ name: "LoginPage" });
    },
    onLogout() {
      this.$router.replace({ name: "LogoutPage" });
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      administrationLinks: adminList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
