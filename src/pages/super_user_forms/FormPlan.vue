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
                    <!-- ชื่อ-สกุล -->
                    <div class="row">
                      <!-- ชื่อ-สกุล -->
                      <div class="col-md-12 col-xs-12 q-pa-xs">
                        <q-input
                          standout
                          bottom-slots
                          label="ชื่อ-สกุล"
                          v-model="plan_career_full_name"
                          clearable
                          disable
                        >
                          <template v-slot:prepend>
                            <q-icon name="person_add" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <!-- อาชีพเป้าหมาย + คุณสมบัติ-->
                    <div class="row">
                      <!-- แผนอาชีพ -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          @filter="filterPlan_career"
                          use-input
                          color="green"
                          v-model="plan_career_id"
                          :options="plan_career.options"
                          label="อาชีพเป้าหมาย"
                          emit-value
                          map-options
                          @update:model-value="
                            (plan_career_id) =>
                              getQa_plan_career(plan_career_id)
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
                          @filter="filterQa_plan_career"
                          use-input
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
                    <!-- การพัฒนา ความสำคัญ ความถี่-->
                    <div class="row">
                      <!-- การพัฒนา -->
                      <div class="col-md-4 col-xs-12 q-pa-xs">
                        <q-select
                          @filter="filterDevelopment"
                          use-input
                          color="green"
                          v-model="development_id"
                          :options="development.options"
                          label="การพัฒนา"
                          emit-value
                          map-options
                        >
                          <template v-slot:prepend>
                            <q-icon name="post_add" />
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
                      <!-- เรื่อง -->
                      <div class="col-md-8 col-xs-12 q-pa-xs">
                        <q-input
                          standout
                          bottom-slots
                          v-model="plan.plan_title"
                          label="เรื่อง"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="list_alt" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <!-- ช่องทาง -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          standout
                          bottom-slots
                          v-model="plan.plan_channel"
                          label="ช่องทาง"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="play_lesson" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <!-- ความสำคัญ -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          @filter="filterImportance"
                          use-input
                          color="green"
                          v-model="importance_id"
                          :options="importance.options"
                          label="ความสำคัญ"
                          emit-value
                          map-options
                        >
                          <template v-slot:prepend>
                            <q-icon name="saved_search" />
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
                      <!-- ความถี่ -->
                      <!-- <div class="col-md-3 col-xs-12 q-pa-xs">
                        <q-select
                          @filter="filterFrequency"
                          use-input
                          color="green"
                          v-model="frequency_id"
                          :options="frequency.options"
                          label="ความถี่"
                          emit-value
                          map-options
                        >
                          <template v-slot:prepend>
                            <q-icon name="forward_to_inbox" />
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
                      </div> -->
                    </div>
                    <div class="row">
                      <!-- วันเริ่มพัฒนา -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          filled
                          v-model="plan.plan_start_date"
                          label="วันเริ่มพัฒนา"
                          mask="## / ## / ####"
                          fill-mask
                          hint="วัน/เดือน/ปี: DD/MM/YYYY"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="plan.plan_start_date"
                                  mask="DD/MM/YYYY"
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
                      <!-- วันสิ้นสุดพัฒนา -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          filled
                          v-model="plan.plan_end_date"
                          label="วันสิ้นสุดพัฒนา"
                          mask="## / ## / ####"
                          fill-mask
                          hint="วัน/เดือน/ปี: DD/MM/YYYY"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="plan.plan_end_date"
                                  mask="DD/MM/YYYY"
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
                    </div>
                    <!-- ปุ่มควบคุม -->
                    <div class="row">
                      <div
                        class="col-md-12 col-xs-12 q-pa-xs row justify-center"
                      >
                        <!-- ปุ่มบันทึก/แก้ไข -->
                        <q-btn
                          :label="btnLabel"
                          type="submit"
                          color="primary"
                          icon="save"
                        />
                        <!-- ปุ่มยกเลิก -->
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
                        <!-- กลับฟอร์มกำหนดคุณสมบัติ/ทักษะ -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_previous"
                          label="กลับฟอร์มกำหนดคุณสมบัติ/ทักษะ"
                          to="/FormQualification"
                        >
                          <q-tooltip class="bg-accent"
                            >กลับฟอร์มกำหนดคุณสมบัติ/ทักษะ</q-tooltip
                          >
                        </q-btn>
                        <!-- ไปฟอร์มรายงานการพัฒนาตนเอง -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_next"
                          label="ไปฟอร์มรายงานการพัฒนาตนเอง"
                          to="/FormReport"
                        >
                          <q-tooltip class="bg-accent"
                            >ไปฟอร์มรายงานการพัฒนาตนเอง</q-tooltip
                          >
                        </q-btn>
                      </div>
                    </div>
                    <!-- ตาราง -->
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-xs">
                        <div class="q-pa-xs">
                          <q-table
                            class="my-sticky-header-table"
                            title="ข้อมูลการพัฒนาตนเอง"
                            :rows="plans1"
                            :columns="columns"
                            row-key="id"
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
                                  placeholder="ค้นหาการพัฒนาตนเอง"
                                >
                                  <template v-slot:append>
                                    <q-icon name="search" />
                                  </template>
                                </q-input>
                              </div>
                              <!-- ส่งออก excel -->
                              <q-btn
                                flat
                                icon-right="archive"
                                label="ส่งออกไฟล์"
                                @click="exportTable()"
                              />
                            </template>
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props">
                                <q-btn
                                  icon="mode_edit"
                                  label="แก้ไข"
                                  @click="onEdit(props.row.plan_id)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  label="ลบ"
                                  @click="
                                    onDelete(
                                      props.row.plan_id,
                                      props.row.plan_title
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
import { exportFile } from "quasar";
// ส่งออกไฟล์ excel
function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

export default {
  name: "FormPlan",
  data() {
    return {
      // ------------------------------------------------------------------------------
      // url_api_plan:
      //   "http://localhost:85/icp2022/icp_v1_suser/plan_form/api-plan.php",
      // url_api_plan_career:
      //   "http://localhost:85/icp2022/icp_v1_suser/plan_form/api-plan-career.php",
      // url_api_qa_plan_career:
      //   "http://localhost:85/icp2022/icp_v1_suser/plan_form/api-qa-plan-career.php",
      // ------------------------------------------------------------------------------
      url_api_plan: "https://icp2022.net/icp_v1_suser/plan_form/api-plan.php",
      url_api_plan_career:
        "https://icp2022.net/icp_v1_suser/plan_form/api-plan-career.php",
      url_api_qa_plan_career:
        "https://icp2022.net/icp_v1_suser/plan_form/api-qa-plan-career.php",
      // ------------------------------------------------------------------------------
      message: "Form Plan Career",
      title: "การพัฒนาตนเอง(ผู้ดูแลกลุ่ม)",
      plan: {
        plan_id: "",
        plan_title: "",
        plan_channel: "",
        plan_start_date: "",
        plan_end_date: "",
      },
      isEdit: false,
      btnLabel: "เพิ่มข้อมูล",
      status: "บันทึก",
      level1: "",
      columns: [
        { name: "actions", align: "center", label: "Action" },
        {
          name: "plan_id",
          required: true,
          label: "รหัสแผนพัฒนาตนเอง",
          align: "center",
          field: (row) => row.plan_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "member_id",
          label: "รหัสสมาชิค",
          align: "center",
          field: (row) => row.member_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "full_name",
          label: "ชื่อ-สกุล",
          align: "left",
          field: (row) => row.full_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "qa_plan_career_id",
          label: "รหัสคุณสมบัติอาชีพ",
          align: "center",
          field: (row) => row.qa_plan_career_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "qualification_name",
          label: "คุณสมบัติ",
          align: "left",
          field: (row) => row.qualification_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "development_id",
          label: "รหัสการพัฒนา",
          align: "center",
          field: (row) => row.development_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "development_description",
          label: "ชนิดการพัฒนา",
          align: "left",
          field: (row) => row.development_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "plan_title",
          label: "เรื่อง",
          align: "left",
          field: (row) => row.plan_title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "plan_channel",
          label: "ช่องทาง",
          align: "left",
          field: (row) => row.plan_channel,
          format: (val) => `${val}`,
          sortable: true,
        },
        // {
        //   name: "frequency_id",
        //   label: "รหัสความถี่",
        //   align: "center",
        //   field: (row) => row.frequency_id,
        //   format: (val) => `${val}`,
        //   sortable: true,
        // },
        // {
        //   name: "frequency_name",
        //   label: "ความถี่",
        //   align: "center",
        //   field: (row) => row.frequency_name,
        //   format: (val) => `${val}`,
        //   sortable: true,
        // },
        {
          name: "importance_id",
          label: "รหัสความสำคัญ",
          align: "center",
          field: (row) => row.importance_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "importance_name",
          label: "ความสำคัญ",
          align: "center",
          field: (row) => row.importance_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "plan_start_date",
          label: "วันเริ่ม",
          align: "center",
          field: (row) => row.plan_start_date,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "plan_end_date",
          label: "วันสิ้นสุด",
          align: "center",
          field: (row) => row.plan_end_date,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "adv_id",
          label: "รหัสผู้ดูแล",
          align: "center",
          field: (row) => row.advisor_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "adv_name",
          label: "ผู้ดูแล",
          align: "center",
          field: (row) => row.advisor_name,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      filter: ref(""),
      loading: ref(false),
      plans1: [],
      qa_plan_career_id: "",
      qa_plan_career_: {
        options: [],
      },
      qa_plan_career: {
        options: [],
      },
      plan_career_id: "",
      plan_career_: {
        options: [],
      },
      plan_career: {
        options: [],
      },
      development_id: "",
      development_: {
        options: [],
      },
      development: {
        options: [],
      },
      importance_id: "",
      importance_: {
        options: [],
      },
      importance: {
        options: [],
      },
      frequency_id: "",
      frequency_: {
        options: [],
      },
      frequency: {
        options: [],
      },
      member_id: this.$store.getters.myMember_id,
      plan_career_full_name: "",
      $q: useQuasar(),
    };
  },
  methods: {
    // นำออกไฟล์ excel
    exportTable() {
      console.log("Export excel");
      var columns = this.columns;
      var rows = this.individuals1;
      // naive encoding to csv format
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          rows.map((row) =>
            columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("individual.csv", "\ufeff" + content, {
        encoding: "utf-8",
        mimeType: "text/csv;charset=utf-8;",
      });

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
    //---------------------------------------
    resetForm() {
      console.log("ยกเลิก");
      this.isEdit = false;
      console.log("isEdit:", this.isEdit);
      this.btnLabel = "เพิ่มข้อมูล";
      this.qa_plan_career_id = "";
      this.plan_career_id = "";
      this.development_id = "";
      this.importance_id = "";
      this.frequency_id = "";
      this.plan.plan_title = "";
      this.plan.plan_channel = "";
      this.plan.plan_start_date = "";
      this.plan.plan_end_date = "";
      this.plan_career_full_name = "";
    },
    submitForm() {
      if (!this.isEdit) {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message: "คุณต้องการบันทึกการเพิ่มข้อมูลหรือไม่?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            console.log("บันทึกการเพิ่มข้อมูล");
            const newPlan = {
              qa_plan_career_id: this.qa_plan_career_id,
              development_id: this.development_id,
              importance_id: this.importance_id,
              frequency_id: this.frequency_id,
              plan_title: this.plan.plan_title,
              plan_channel: this.plan.plan_channel,
              plan_start_date: this.plan.plan_start_date,
              plan_end_date: this.plan.plan_end_date,
            };
            this.$emit("saveData", newPlan);
            axios
              .post(this.url_api_plan, {
                action: "insert",
                qa_plan_career_id: this.qa_plan_career_id,
                development_id: this.development_id,
                importance_id: this.importance_id,
                frequency_id: this.frequency_id,
                plan_title: this.plan.plan_title,
                plan_channel: this.plan.plan_channel,
                plan_start_date: this.plan.plan_start_date,
                plan_end_date: this.plan.plan_end_date,
              })
              .then((res) => {
                console.log("insert", res.data);
                // this.resetForm();
                this.getUpdate();
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      } else {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message: "คุณต้องการบันทึกการแก้ไขข้อมูลหรือไม่?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            axios
              .post(this.url_api_plan, {
                action: "update",
                plan_id: this.plan.plan_id,
                qa_plan_career_id: this.qa_plan_career_id,
                development_id: this.development_id,
                importance_id: this.importance_id,
                frequency_id: this.frequency_id,
                plan_title: this.plan.plan_title,
                plan_channel: this.plan.plan_channel,
                plan_start_date: this.plan.plan_start_date,
                plan_end_date: this.plan.plan_end_date,
              })
              .then((response) => {
                console.log("Update", response.data);
                this.isEdit = false;
                console.log("isEdit:", this.isEdit);
                this.btnLabel = "เพิ่มข้อมูล";
                this.getUpdate();
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
    onEdit(plan_id) {
      console.log("Edit plan_id:", plan_id);
      this.btnLabel = "แก้ไขข้อมูล";
      this.isEdit = true;
      var self = this;
      axios
        .post(this.url_api_plan, {
          action: "edit",
          plan_id: plan_id,
        })
        .then(function (response) {
          console.log("การพัฒนาต้นเอง:", response.data);
          self.plan.plan_id = response.data.plan_id;
          // อาชีพเป้าหมาย
          self.plan_career_id = response.data.plan_career_id;
          //คุณสมบัติตามอาชีพเป้าหมาย
          self.getQa_plan_career(self.plan_career_id);
          self.qa_plan_career_id = response.data.qa_plan_career_id;
          // ชนิดการพัฒนา
          self.development_id = response.data.development_id;
          // ความสำคัญ
          self.importance_id = response.data.importance_id;
          // ความถี่
          self.frequency_id = response.data.frequency_id;
          // ชื่อเรื่องที่พัฒนา
          self.plan.plan_title = response.data.plan_title;
          // ช่องทางการพัฒนา
          self.plan.plan_channel = response.data.plan_channel;
          // วันเริ่มต้น
          self.plan.plan_start_date = response.data.plan_start_date;
          // วันสิ้นสุด
          self.plan.plan_end_date = response.data.plan_end_date;
          // ชื่อ-สกุล
          self.plan_career_full_name = response.data.full_name;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onDelete(plan_id, plan_name) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message: "คุณต้องการลบการพัฒนา [" + plan_name + "] หรือไม่ ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log("delete:", plan_id);
          var self = this;
          axios
            .post(this.url_api_plan, {
              action: "delete",
              plan_id: plan_id,
            })
            .then(function (response) {
              console.log(response);
              // self.resetForm();
              self.getUpdate();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    },
    onNext() {
      this.$router.replace({ name: "FormSelfAssessment" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormQualification" });
    },
    // checked
    // getUpdate(member_id) {
    //   console.log(" แสดงข้อมูลการพัฒนาตนเอง สมาชิค: ", member_id);
    //   var self = this;
    //   axios
    //     .post(this.url_api_plan, {
    //       action: "getall",
    //       member_id: member_id,
    //     })
    //     .then(function (res) {
    //       console.log("การพัฒนาตนเอง:", res.data);
    //       self.plans1 = res.data;
    //     })
    //     .finally(() => {
    //       self.loading = false;
    //     });
    // },
    getUpdate() {
      console.log("get update member: ", this.member_id);
      var self = this;
      axios
        .post(this.url_api_plan, {
          member_id: this.member_id,
          action: "getall_",
        })
        .then(function (res) {
          console.log("การพัฒนาตนเอง:", res.data);
          self.plans1 = res.data;
        })
        .finally(() => {
          self.loading = false;
        });
    },
    // checked
    getCareer(member_id) {
      console.log(" ข้อมูลอาชีพ สมาชิค:", member_id);
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
          self.plan_career_.options = self.plan_career.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // checked
    getQa_plan_career(plan_career_id) {
      console.log(" แสดงข้อมูลคุณสมบัติของอาชีพ ", plan_career_id);
      var self = this;
      axios
        .post(this.url_api_qa_plan_career, {
          action: "get_qa_plan_career_by_plan_career_id",
          plan_career_id: plan_career_id,
        })
        .then(function (res) {
          console.log("แสดงข้อมูลคุณสมบัติของอาชีพ1:", res.data);
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
          self.qa_plan_career_.options = self.qa_plan_career.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDevelopment() {
      console.log(" แสดงข้อมูลการพัฒนา ");
      var self = this;
      axios
        .post(this.url_api_plan, {
          action: "getDevelopment",
        })
        .then(function (res) {
          var development_id = res.data.map((item) => item.development_id);
          var development_name = res.data.map((item) => item.development_name);
          self.development.options.splice(0);
          for (var i = 0; i < development_id.length; i++) {
            self.development.options.push({
              label: development_name[i],
              value: development_id[i],
            });
          }
          self.development_.options = self.development.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getImportance() {
      console.log(" แสดงข้อมูลด้านความสำคัญ ");
      var self = this;
      axios
        .post(this.url_api_plan, {
          action: "getImportance",
        })
        .then(function (res) {
          var importance_id = res.data.map((item) => item.importance_id);
          var importance_name = res.data.map((item) => item.importance_name);
          self.importance.options.splice(0);
          for (var i = 0; i < importance_id.length; i++) {
            self.importance.options.push({
              label: importance_name[i],
              value: importance_id[i],
            });
          }
          self.importance_.options = self.importance.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getFrequency() {
      console.log(" แสดงข้อมูลด้านความถี่ ");
      var self = this;
      axios
        .post(this.url_api_plan, {
          action: "getFrequency",
        })
        .then(function (res) {
          var frequency_id = res.data.map((item) => item.frequency_id);
          var frequency_name = res.data.map((item) => item.frequency_name);
          self.frequency.options.splice(0);
          for (var i = 0; i < frequency_id.length; i++) {
            self.frequency.options.push({
              label: frequency_name[i],
              value: frequency_id[i],
            });
          }
          self.frequency_.options = self.frequency.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    filterPlan_career(val, update) {
      if (val === "") {
        update(() => {
          this.plan_career.options = this.plan_career_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.plan_career.options = this.plan_career_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterQa_plan_career(val, update) {
      if (val === "") {
        update(() => {
          this.qa_plan_career.options = this.qa_plan_career_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.qa_plan_career.options = this.qa_plan_career_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterDevelopment(val, update) {
      if (val === "") {
        update(() => {
          this.development.options = this.development_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.development.options = this.development_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterImportance(val, update) {
      if (val === "") {
        update(() => {
          this.importance.options = this.importance_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.importance.options = this.importance_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterFrequency(val, update) {
      if (val === "") {
        update(() => {
          this.frequency.options = this.frequency_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.frequency.options = this.frequency_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
  },
  created() {
    this.getUpdate();
    this.getCareer(this.member_id);
    this.getDevelopment();
    this.getImportance();
    this.getFrequency();
  },
};
</script>

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
