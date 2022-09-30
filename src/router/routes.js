import MainLayout from "layouts/MainLayout.vue";
import IndexPage from "pages/IndexPage.vue";
// User
// Mangagement
import FormComponent from "pages/forms/FormComponent.vue";
import FormPivotTable from "pages/forms/FormPivotTable.vue";
import FormPlan from "pages/forms/FormPlan.vue";
import FormPlanCareer from "pages/forms/FormPlanCareer.vue";
import FormQualification from "pages/forms/FormQualification.vue";
import FormSelfAssessment from "pages/forms/FormSelfAssessment.vue";
import FormReport from "pages/forms/FormReport.vue";
import FormRegistration from "pages/forms/FormRegistration.vue";
// registration
import LoginPage from "src/pages/registration/LoginPage.vue";
import LogoutPage from "pages/registration/LogoutPage.vue";
import RegistrationPage from "pages/registration/RegistrationPage.vue";

// Admin
// Mangagement
import AdminFormComponent from "pages/admin_forms/FormComponent.vue";
import AdminFormPivotTable from "pages/admin_forms/FormPivotTable.vue";
import AdminFormPlan from "pages/admin_forms/FormPlan.vue";
import AdminFormPlanCareer from "pages/admin_forms/FormPlanCareer.vue";
import AdminFormQualification from "pages/admin_forms/FormQualification.vue";
import AdminFormSelfAssessment from "pages/admin_forms/FormSelfAssessment.vue";
import AdminFormReport from "pages/admin_forms/FormReport.vue";
import AdminFormRegistration from "pages/admin_forms/FormRegistration.vue";
// registration
import AdminLoginPage from "src/pages/admin_registration/LoginPage.vue";
import AdminLogoutPage from "pages/admin_registration/LogoutPage.vue";
import AdminRegistrationPage from "pages/admin_registration/RegistrationPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "IndexPage",
        component: IndexPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // User forms
  {
    path: "/FormRegistration",
    name: "FormRegistration",
    component: FormRegistration,
  },
  {
    path: "/FormComponent",
    name: "FormComponent",
    component: FormComponent,
  },
  {
    path: "/FormPivotTable",
    name: "FormPivotTable",
    component: FormPivotTable,
  },
  {
    path: "/FormReport",
    name: "FormReport",
    component: FormReport,
  },
  {
    path: "/FormPlan",
    name: "FormPlan",
    component: FormPlan,
  },
  {
    path: "/FormPlanCareer",
    name: "FormPlanCareer",
    component: FormPlanCareer,
  },
  {
    path: "/FormQualification",
    name: "FormQualification",
    component: FormQualification,
  },
  {
    path: "/FormSelfAssessment",
    name: "FormSelfAssessment",
    component: FormSelfAssessment,
  },
  {
    path: "/LoginPage",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/LogoutPage",
    name: "LogoutPage",
    component: LogoutPage,
  },
  {
    path: "/RegistrationPage",
    name: "RegistrationPage",
    component: RegistrationPage,
  },
  // Admin forms
  {
    path: "/AdminFormRegistration",
    name: "AdminFormRegistration",
    component: AdminFormRegistration,
  },
  {
    path: "/AdminFormComponent",
    name: "AdminFormComponent",
    component: AdminFormComponent,
  },
  {
    path: "/AdminFormPivotTable",
    name: "AdminFormPivotTable",
    component: AdminFormPivotTable,
  },
  {
    path: "/AdminFormReport",
    name: "AdminFormReport",
    component: AdminFormReport,
  },
  {
    path: "/AdminFormPlan",
    name: "AdminFormPlan",
    component: AdminFormPlan,
  },
  {
    path: "/AdminFormPlanCareer",
    name: "AdminFormPlanCareer",
    component: AdminFormPlanCareer,
  },
  {
    path: "/AdminFormQualification",
    name: "AdminFormQualification",
    component: AdminFormQualification,
  },
  {
    path: "/AdminFormSelfAssessment",
    name: "AdminFormSelfAssessment",
    component: AdminFormSelfAssessment,
  },
  {
    path: "/AdminLoginPage",
    name: "AdminLoginPage",
    component: AdminLoginPage,
  },
  {
    path: "/AdminLogoutPage",
    name: "AdminLogoutPage",
    component: AdminLogoutPage,
  },
  {
    path: "/AdminRegistrationPage",
    name: "AdminRegistrationPage",
    component: AdminRegistrationPage,
  },
];

export default routes;
