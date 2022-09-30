<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page
        padding
        class="row items-center justify-center"
        style="background: linear-gradient(#74c588, #0ad13c)"
      >
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pa-xs">
            <q-card flat class="bg-white text-black">
              <q-card-section class="bg-blue-14">
                <h4 class="text-h5 text-white q-my-xs text-center">
                  {{ title }}
                </h4>
              </q-card-section>
              <div class="row">
                <div class="col-md-12 col-xs-12 q-pa-xs">
                  <q-form
                    @submit.prevent="submitForm"
                    @reset="resetForm"
                    method="post"
                    class="q-gutter-md"
                  >
                    <!-- อาชีพเป้าหมาย + คุณสมบัติ-->
                    <div class="row">
                      <!-- แผนอาชีพ -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          color="green"
                          v-model="plan_career_id"
                          :options="plan_career.options"
                          label="อาชีพเป้าหมาย"
                          emit-value
                          map-options
                          @update:model-value="
                            (plan_career_id) => getQualification(plan_career_id)
                          "
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                          <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                              <q-item-section avatar>
                                <q-icon :name="scope.opt.icon" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{
                                  scope.opt.label
                                }}</q-item-label>
                                <q-item-label caption>{{
                                  scope.opt.description
                                }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                      <!-- คุณสมบัติ -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          color="green"
                          v-model="qa_plan_career_id"
                          :options="qa_plan_career.options"
                          label="คุณสมบัติที่ต้องการ"
                          emit-value
                          map-options
                        >
                          <template v-slot:prepend>
                            <q-icon name="fact_check" />
                          </template>
                          <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                              <q-item-section avatar>
                                <q-icon :name="scope.opt.icon" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{
                                  scope.opt.label
                                }}</q-item-label>
                                <q-item-label caption>{{
                                  scope.opt.description
                                }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <!-- เดือนประเมิน -->
                    <div class="row">
                      <!-- วันประเมินตนเอง -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          filled
                          v-model="self_assessment_date"
                          label="วันประเมินตนเอง"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="self_assessment_date"
                                  mask="DD-MM-YYYY"
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                      <!-- ประเมินตนเอง -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          color="green"
                          v-model="perform_id"
                          :options="perform.options"
                          label="ผลการพัฒนาตนเอง"
                          emit-value
                          map-options
                        >
                          <template v-slot:prepend>
                            <q-icon name="flag_circle" />
                          </template>
                          <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                              <q-item-section avatar>
                                <q-icon :name="scope.opt.icon" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{
                                  scope.opt.label
                                }}</q-item-label>
                                <q-item-label caption>{{
                                  scope.opt.description
                                }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <!-- ปุ่มควบคุม -->
                      <div
                        class="col-md-12 col-xs-12 q-pa-xs row justify-center"
                      >
                        <!-- บันทึก/แก้ไข -->
                        <q-btn
                          :label="btnLabel"
                          type="submit"
                          color="primary"
                          icon="save"
                        />
                        <!-- ยกเลิก -->
                        <q-btn
                          label="ยกเลิก"
                          type="reset"
                          color="primary"
                          flat
                          class="q-pa-xs"
                          icon="clear"
                        />
                        <!-- ออก -->
                        <q-btn
                          icon="logout"
                          label="ออก"
                          color="primary"
                          flat
                          class="q-pa-xs"
                          to="/"
                        />
                        <!-- ย้อนกลับ -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_previous"
                          to="/FormReport"
                        >
                          <q-tooltip class="bg-accent"
                            >กลับฟอร์มรายงานการพัฒนาตนเอง</q-tooltip
                          >
                        </q-btn>
                        <!-- ไปรายงานการประเมินตนเอง -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_next"
                          to="/FormPivotTable"
                        >
                          <q-tooltip class="bg-accent"
                            >ไปฟอร์มรายงานการประเมินตนเอง</q-tooltip
                          >
                        </q-btn>
                      </div>
                    </div>
                    <div class="row">
                      <!-- การประเมินตนเอง -->
                      <div class="col-md-12 col-xs-12 q-pa-xs">
                        <div class="q-pa-xs">
                          <q-table
                            class="my-sticky-header-table"
                            title="การประเมินตนเอง"
                            :rows="selfAssessments1"
                            :columns="columns"
                            row-key=""
                            :filter="filter"
                            :loading="loading"
                          >
                            <template v-slot:top-right>
                              <div class="col-9">
                                <q-input
                                  borderless
                                  dense
                                  debounce="300"
                                  v-model="filter"
                                  placeholder="Search"
                                >
                                  <template v-slot:append>
                                    <q-icon name="search" />
                                  </template>
                                </q-input>
                              </div>
                            </template>
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props">
                                <q-btn
                                  icon="mode_edit"
                                  @click="OnEdit(props.row.self_assessment_id)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  @click="
                                    onDelete(
                                      props.row.self_assessment_id,
                                      props.row.self_assessment_date
                                    )
                                  "
                                ></q-btn>
                              </q-td>
                            </template>
                          </q-table>
                        </div>
                      </div>
                    </div>
                  </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  name: "FormSelfAssessment",
  data() {
    return {
      // url: "http://localhost:85/icp2022/api-member.php",
      // url_api_career_qualification:
      //   "http://localhost:85/icp2022/api-qa-plan-career.php",
      // url_api_self_assessment:
      //   "http://localhost:85/icp2022/api-self-assessment.php",
      // url_api_plan: "http://localhost:85/icp2022/api-plan.php",
      // url_api_plan_career: "http://localhost:85/icp2022/api-plan-career.php",
      // url_api_qa_plan_career:
      //   "http://localhost:85/icp2022/api-qa-plan-career.php",

      url: "https://icp2022.net/icp_v1/self_assessment_form/api-member.php",
      url_api_career_qualification:
        "https://icp2022.net/icp_v1/self_assessment_form/api-qa-plan-career.php",
      url_api_self_assessment:
        "https://icp2022.net/icp_v1/self_assessment_form/api-self-assessment.php",
      url_api_plan:
        "https://icp2022.net/icp_v1/self_assessment_form/api-plan.php",
      url_api_plan_career:
        "https://icp2022.net/icp_v1/self_assessment_form/api-plan-career.php",
      url_api_qa_plan_career:
        "https://icp2022.net/icp_v1/self_assessment_form/api-qa-plan-career.php",

      message: "Form Self Acessment",
      title: "จัดการประเมินตนเอง",
      currentYear: new Date().getFullYear(),
      selfAssessments: Array,
      selfAssessments_: Array,
      careers: Array,
      career_qualifications: Array,
      member_id: this.$store.getters.myMember_id,
      planCareerId: "",
      selfAssessment: {
        selfAssessmentId: "",
        qualificationId: "",
        month: "",
        assessment: "",
        isVisible: false,
      },
      isEdit: false,
      status: "บันทึก",
      qualification: {
        options: [],
      },
      btnLabel: "เพิ่มข้อมูล",
      columns: [
        { name: "actions", align: "center", label: "Action" },
        {
          name: "self_assessment_id",
          align: "center",
          label: "รหัสการประเมิน",
          field: (row) => row.self_assessment_id,
          format: (val) => `${val}`,
        },
        {
          name: "self_assessment_date",
          align: "center",
          label: "วันประเมิน",
          field: (row) => row.self_assessment_date,
          format: (val) => `${val}`,
        },
        {
          name: "career_id",
          align: "center",
          label: "รหัสอาชีพ",
          field: (row) => row.career_id,
          format: (val) => `${val}`,
        },
        {
          name: "career_name",
          align: "left",
          label: "อาชีพ",
          field: (row) => row.career_name,
          format: (val) => `${val}`,
        },
        {
          name: "qa_plan_career_id",
          align: "center",
          label: "รหัสคุณสมบัติ",
          field: (row) => row.qa_plan_career_id,
          format: (val) => `${val}`,
        },
        {
          name: "qualification_name",
          align: "left",
          label: "คุณสมบัติ",
          field: (row) => row.qualification_name,
          format: (val) => `${val}`,
        },
        {
          name: "target_id",
          align: "center",
          label: "รหัสเป้าหมาย",
          field: (row) => row.target_id,
          format: (val) => `${val}`,
        },
        {
          name: "target_name",
          align: "left",
          label: "เป้าหมาย",
          field: (row) => row.target_name,
          format: (val) => `${val}`,
        },
        {
          name: "perform_id",
          align: "center",
          label: "รหัสการประเมิน",
          field: (row) => row.perform_id,
          format: (val) => `${val}`,
        },
        {
          name: "perform_name",
          align: "left",
          label: "การประเมิน",
          field: (row) => row.perform_name,
          format: (val) => `${val}`,
        },
      ],
      selfAssessments1: [],
      qa_plan_career_id: "",
      qa_plan_career: {
        options: [],
      },
      plan_career_id: "",
      plan_career: {
        options: [],
      },
      filter: ref(""),
      loading: ref(false),
      self_assessment_date: "",
      self_assessment_id: "",
      perform_id: "",
      perform: {
        options: [],
      },
      $q: useQuasar(),
    };
  },
  methods: {
    resetForm() {
      this.isEdit = false;
      console.log("isEdit:", this.isEdit);
      this.btnLabel = "เพิ่มข้อมูล";

      console.log("ยกเลิกการบันทึกข้อมูล");
      this.plan_career_id = "";
      this.qa_plan_career_id = "";
      this.self_assessment_date = "";
      this.perform_id = "";
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post(this.url_api_self_assessment, {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.selfAssessments = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        // if (this.confirm("คุณต้องการเพิ่มข้อมูลการประเมินตนเองหรือไม่ ?")) {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message: "คุณต้องการเพิ่มข้อมูลการประเมินตนเองหรือไม่ ?",
            persistent: true,
            cancel: true,
          })
          .onOk(() => {
            console.log("บันทึกข้อมูล");
            console.log("qualification:", this.selfAssessment);
            const newSelfAssessment = {
              self_assessment_date: this.self_assessment_date,
              qa_plan_career_id: this.qa_plan_career_id,
              perform_id: this.perform_id,
            };
            this.$emit("saveData", newSelfAssessment);
            axios
              .post(this.url_api_self_assessment, {
                action: "insert",
                self_assessment_date: this.self_assessment_date,
                qa_plan_career_id: this.qa_plan_career_id,
                perform_id: this.perform_id,
              })
              .then((res) => {
                console.log("Insert:", res.data);
                this.getUpdate(this.member_id);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      } else {
        // if (this.confirm("คุณต้องการแก้ไขข้อมูลการประเมินตนเองหรือไม่ ?")) {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message: "คุณต้องการแก้ไขข้อมูลการประเมินตนเองหรือไม่ ?",
            persistent: true,
            cancel: true,
          })
          .onOk(() => {
            console.log("Update ข้อมูลการประเมินตนเอง");
            axios
              .post(this.url_api_self_assessment, {
                action: "update",
                self_assessment_id: this.self_assessment_id,
                qa_plan_career_id: this.qa_plan_career_id,
                perform_id: this.perform_id,
                self_assessment_date: this.self_assessment_date,
              })
              .then((response) => {
                console.log("Update:", response.data);
                this.isEdit = false;
                console.log("isEdit:", this.isEdit);
                this.btnLabel = "เพิ่มข้อมูล";

                this.getUpdate(this.member_id);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .onCancel(() => {
            this.isEdit = false;
            console.log("isEdit:", this.isEdit);
            this.btnLabel = "เพิ่มข้อมูล";
          });
      }
    },
    OnEdit(self_assessment_id) {
      console.log("Edit data");
      this.btnLabel = "แก้ไขข้อมูล";
      this.isEdit = true;
      var self = this;
      console.log("Edit", this.self_assessment_id);
      axios
        .post(this.url_api_self_assessment, {
          action: "edit",
          self_assessment_id: self_assessment_id,
        })
        .then(function (response) {
          console.log("Edit:", response.data);
          self.self_assessment_id = response.data.self_assessment_id;
          // อาชีพเป้าหมาย
          self.plan_career_id = response.data.plan_career_id;
          self.getQualification(self.plan_career_id);
          // คุณสมบัติตามอาชีพเป้าหมาย
          self.qa_plan_career_id = response.data.qa_plan_career_id;
          // ประเมินผลตนเอง
          self.perform_id = response.data.perform_id;
          // วันที่ประเมินผล
          self.self_assessment_date = response.data.self_assessment_date;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    onDelete(self_assessment_id, self_assessment_date) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message:
            "คุณต้องการลบผลการประเมินวัน " +
            self_assessment_date +
            " หรือไม่ ?",
          persistent: true,
          cancel: true,
        })
        .onOk(() => {
          var self = this;
          axios
            .post(this.url_api_self_assessment, {
              action: "delete",
              self_assessment_id: self_assessment_id,
            })
            .then(function (response) {
              console.log(response);
              self.getUpdate(self.member_id);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    },
    onNext() {
      this.$router.replace({ name: "FormPivotTable" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormPlan" });
    },
    // checked
    getUpdate(member_id) {
      console.log(" แสดงข้อมูล การประเมินตนเอง ", member_id);
      var self = this;
      axios
        .post(this.url_api_self_assessment, {
          action: "getAll",
          member_id: member_id,
        })
        .then(function (res) {
          console.log("self_assessment:", res.data);
          self.selfAssessments1 = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // checked
    getCareer(member_id) {
      console.log(" ข้อมูลอาชีพ สมาชิค", member_id);
      var self = this;
      axios
        .post(this.url_api_plan_career, {
          action: "get_plan_career_by_member_id",
          member_id: member_id,
        })
        .then(function (res) {
          var plan_career_id = res.data.map((item) => item.plan_career_id);
          var career_name = res.data.map((item) => item.career_name);
          self.plan_career.options.splice(0);
          for (var i = 0; i < plan_career_id.length; i++) {
            self.plan_career.options.push({
              label: career_name[i],
              value: plan_career_id[i],
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // checked
    getQualification(plan_career_id) {
      console.log(" แสดงข้อมูลคุณสมบัติ รหัสแผนอาชีพ: ", plan_career_id);
      var self = this;
      axios
        .post(this.url_api_qa_plan_career, {
          action: "get_qa_plan_career_by_plan_career_id",
          plan_career_id: plan_career_id,
        })
        .then(function (res) {
          console.log("qa_plan_career:", res.data);
          var qa_plan_career_id = res.data.map(
            (item) => item.qa_plan_career_id
          );
          var qualification_name = res.data.map(
            (item) => item.qualification_name
          );
          var level_name = res.data.map((item) => item.level_description);
          var target_name = res.data.map((item) => item.target_name);
          self.qa_plan_career.options.splice(0);
          for (var i = 0; i < qa_plan_career_id.length; i++) {
            self.qa_plan_career.options.push({
              label: qualification_name[i],
              value: qa_plan_career_id[i],
              description: level_name[i] + " " + target_name[i],
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getPerform() {
      console.log(" ข้อมูลค่าเป้าหมาย ");
      var self = this;
      axios
        .post(this.url_api_self_assessment, {
          action: "getPerform",
        })
        .then(function (res) {
          var perform_id = res.data.map((item) => item.perform_id);
          var perform_name = res.data.map((item) => item.perform_name);
          self.perform.options.splice(0);
          for (var i = 0; i < perform_id.length; i++) {
            self.perform.options.push({
              label: perform_name[i],
              value: perform_id[i],
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getUpdate(this.member_id);
    this.getCareer(this.member_id);
    this.getPerform();
  },
  created() {},
};
</script>

<style scoped></style>
<style lang="sass">
.my-sticky-header-table
  height: 310px
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #c1f4cd
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
</style>
