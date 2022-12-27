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
import FormReference from "pages/forms/FormReference.vue";
import FormReport from "pages/forms/FormReport.vue";
import FormRegistration from "pages/forms/FormRegistration.vue";
import FormNotification from "pages/forms/FormNotification.vue";
// registration
import LoginPage from "src/pages/registration/LoginPage.vue";
import LogoutPage from "pages/registration/LogoutPage.vue";
import RegistrationPage from "pages/registration/RegistrationPage.vue";

// Admin
import AdminFormComponent from "pages/admin_forms/FormComponent.vue";
import AdminFormPivotTable from "pages/admin_forms/FormPivotTable.vue";
import AdminFormPlan from "pages/admin_forms/FormPlan.vue";
import AdminFormPlanCareer from "pages/admin_forms/FormPlanCareer.vue";
import AdminFormQualification from "pages/admin_forms/FormQualification.vue";
import AdminFormSelfAssessment from "pages/admin_forms/FormSelfAssessment.vue";
import AdminFormReport from "pages/admin_forms/FormReport.vue";
import AdminFormRegistration from "pages/admin_forms/FormRegistration.vue";
import AdminFormNotification from "pages/admin_forms/FormNotification.vue";
import ImportExcel from "pages/admin_forms/ImportExcel.vue";
// registration
import AdminLoginPage from "src/pages/admin_registration/LoginPage.vue";
import AdminLogoutPage from "pages/admin_registration/LogoutPage.vue";
import AdminRegistrationPage from "pages/admin_registration/RegistrationPage.vue";

// SUPER USER - SUSER
import SuserFormComponent from "pages/super_user_forms/FormComponent.vue";
import SuserFormPivotTable from "pages/super_user_forms/FormPivotTable.vue";
import SuserFormPlan from "pages/super_user_forms/FormPlan.vue";
import SuserFormPlanCareer from "pages/super_user_forms/FormPlanCareer.vue";
import SuserFormQualification from "pages/super_user_forms/FormQualification.vue";
import SuserFormSelfAssessment from "pages/super_user_forms/FormSelfAssessment.vue";
import SuserFormReport from "pages/super_user_forms/FormReport.vue";
import SuserFormRegistration from "pages/super_user_forms/FormRegistration.vue";
import SuserFormNotification from "pages/super_user_forms/FormNotification.vue";

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
  {
    path: "/FormReference",
    name: "FormReference",
    component: FormReference,
  },
  {
    path: "/FormNotification",
    name: "FormNotification",
    component: FormNotification,
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
    path: "/AdminFormNotification",
    name: "AdminFormNotification",
    component: AdminFormNotification,
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
  {
    path: "/ImportExcel",
    name: "ImportExcel",
    component: ImportExcel,
  },
  // Super user forms
  {
    path: "/SuserFormRegistration",
    name: "SuserFormRegistration",
    component: SuserFormRegistration,
  },
  {
    path: "/SuserFormComponent",
    name: "SuserFormComponent",
    component: SuserFormComponent,
  },
  {
    path: "/SuserFormPivotTable",
    name: "SuserFormPivotTable",
    component: SuserFormPivotTable,
  },
  {
    path: "/SuserFormReport",
    name: "SuserFormReport",
    component: SuserFormReport,
  },
  {
    path: "/SuserFormPlan",
    name: "SuserFormPlan",
    component: SuserFormPlan,
  },
  {
    path: "/SuserFormPlanCareer",
    name: "SuserFormPlanCareer",
    component: SuserFormPlanCareer,
  },
  {
    path: "/SuserFormQualification",
    name: "SuserFormQualification",
    component: SuserFormQualification,
  },
  {
    path: "/SuserFormSelfAssessment",
    name: "SuserFormSelfAssessment",
    component: SuserFormSelfAssessment,
  },
  {
    path: "/SuserFormNotification",
    name: "SuserFormNotification",
    component: SuserFormNotification,
  },
  // {
  //   path: "/SuserLoginPage",
  //   name: "SuserLoginPage",
  //   component: SuserLoginPage,
  // },
  // {
  //   path: "/SuserLogoutPage",
  //   name: "SuserLogoutPage",
  //   component: SuserLogoutPage,
  // },
  // {
  //   path: "/SuserRegistrationPage",
  //   name: "SuserRegistrationPage",
  //   component: SuserRegistrationPage,
  // },
];

export default routes;
