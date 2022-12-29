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
                          v-model="plan_career.full_name"
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
                    <div class="row">
                      <!-- อาชีพเป้าหมาย -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          @filter="filterCareer"
                          color="blue-5"
                          v-model="plan_career.career_id"
                          use-input
                          input-debounce="0"
                          :options="career.options"
                          @new-value="createValue"
                          emit-value
                          map-options
                          label="อาชีพเป้าหมาย"
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                ค้นหาไม่พบ
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                      <!-- </div>
                    <div class="row"> -->
                      <!-- วันเริ่มแผน -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          filled
                          v-model="plan_career.start_date"
                          label="วันเริ่มแผน"
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
                                  v-model="plan_career.start_date"
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
                      <!-- วันสิ้นสุดแผน -->
                      <!-- <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          filled
                          v-model="plan_career.end_date"
                          label="วันสิ้นสุดแผน"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="plan_career.end_date"
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
                      </div> -->
                    </div>
                    <div class="row">
                      <!-- ปุ่มควบคุม -->
                      <div
                        class="col-md-12 col-xs-12 q-pa-xs row justify-center"
                      >
                        <!-- บันทึก -->
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
                        <!-- กลับฟอร์มกรอกข้อมูลส่วนตัว -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_previous"
                          label="กลับฟอร์มกรอกข้อมูลส่วนตัว"
                          to="/FormComponent"
                        >
                          <q-tooltip class="bg-accent"
                            >กลับฟอร์มกรอกข้อมูลส่วนตัว</q-tooltip
                          >
                        </q-btn>
                        <!-- ไปฟอร์มกำหนดคุณสมบัติ/ทักษะ -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_next"
                          label="ไปฟอร์มกำหนดคุณสมบัติ/ทักษะ"
                          to="/FormQualification"
                        >
                          <q-tooltip class="bg-accent"
                            >ไปฟอร์มกำหนดคุณสมบัติ/ทักษะ</q-tooltip
                          >
                        </q-btn>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-xs">
                        <div class="q-pa-xs">
                          <q-table
                            class="my-sticky-header-table"
                            title="ข้อมูลส่วนตัว"
                            :rows="plan_careers1"
                            :columns="columns"
                            row-key="Name_Plan_Career"
                            :filter="filter"
                            :loading="loading"
                          >
                            <template v-slot:top-right>
                              <q-input
                                borderless
                                dense
                                debounce="300"
                                v-model="filter"
                                placeholder="ค้นหาอาชีพเป้าหมาย"
                              >
                                <template v-slot:append>
                                  <q-icon name="search" />
                                </template>
                              </q-input>
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
                                  @click="editUser(props.row.plan_career_id)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  label="ลบ"
                                  @click="
                                    deleteUser(
                                      props.row.plan_career_id,
                                      props.row.career_name
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
  name: "FormPlanCareer",
  data() {
    return {
      url_api_career: "",
      url_api_plan_career: "",
      // ------------------------------------------------------------------------------
      message: "Form Plan Career",
      title: "อาชีพเป้าหมาย(ผู้ดูแลกลุ่ม)",
      plan_careers: Array,
      emp_id: Array,
      plan_careers_: Array,
      careers: Array,
      btnLabel: "เพิ่มข้อมูล",
      plan_career: {
        plan_career_id: "",
        member_id: this.$store.getters.myMember_id,
        career_id: "",
        start_date: "",
        full_name: "",
        // end_date: "",
      },
      status: "บันทึก",
      career_: {
        options: [],
      },
      career: {
        options: [],
      },
      columns: [
        { name: "actions", align: "center", label: "Action" },
        {
          name: "plan_career_id",
          label: "รหัสแผนอาชีพ",
          align: "center",
          field: (row) => row.plan_career_id,
          format: (val) => `${val}`,
        },
        {
          name: "member_id",
          label: "รหัสสมาชิค",
          align: "center",
          field: (row) => row.member_id,
          format: (val) => `${val}`,
        },
        {
          name: "full_name",
          label: "ชื่อ-สกุล",
          align: "left",
          field: (row) => row.full_name,
          format: (val) => `${val}`,
        },
        {
          name: "career_id",
          label: "รหัสอาชีพ",
          align: "center",
          field: (row) => row.career_id,
          format: (val) => `${val}`,
        },
        {
          name: "career_name",
          label: "อาชีพ",
          align: "left",
          field: (row) => row.career_name,
          format: (val) => `${val}`,
        },
        {
          name: "start_date",
          label: "วันเริ่มแผน",
          align: "center",
          field: (row) => row.start_date,
          format: (val) => `${val}`,
        },
        {
          name: "adv_id",
          label: "รหัสผู้ดูแล",
          align: "center",
          field: (row) => row.advisor_id,
          format: (val) => `${val}`,
        },
        {
          name: "adv_name",
          label: "ผู้ดูแล",
          align: "center",
          field: (row) => row.advisor_name,
          format: (val) => `${val}`,
        },
      ],
      plan_careers1: [],
      loading: true,
      filter: ref(""),
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
      this.isEdit = false;
      console.log("isEdit:", this.isEdit);
      this.btnLabel = "เพิ่มข้อมูล";
      console.log("ยกเลิก");
      this.plan_career.start_date = "";
      // this.plan_career.end_date = "";
      this.plan_career.career_id = "";
    },
    getCareer() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post(this.url_api_career, {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.careers = res.data;
          var ids = res.data.map((item) => item.career_id);
          var careers = res.data.map((item) => item.career_name);
          self.career.options.splice(0);
          for (var i = 0; i < ids.length; i++) {
            self.career.options.push({
              label: careers[i],
              value: ids[i],
            });
          }
          self.career_.options = self.career.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        // if (confirm("คุณต้องการบันทึกการเพิ่มข้อมูลหรือไม่?")) {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message: "คุณต้องการบันทึกการเพิ่มข้อมูลหรือไม่?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            console.log("บันทึกการเพิ่มข้อมูล", this.plan_career.member_id);
            const newplan_career = {
              member_id: this.plan_career.member_id,
              career_id: this.plan_career.career_id,
              start_date: this.plan_career.start_date,
            };
            this.$emit("saveData", newplan_career);
            axios
              .post(this.url_api_plan_career, {
                action: "insert",
                member_id: this.plan_career.member_id,
                career_id: this.plan_career.career_id,
                start_date: this.plan_career.start_date,
              })
              .then((res) => {
                console.log("ข้อมูลส่วนบุคคล:", res.data);
                this.getUpdate();
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      } else {
        // if (confirm("คุณต้องการบันทึกการแก้ไขข้อมูลหรือไม่?")) {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message:
              "คุณต้องการบันทึกการแก้ไขข้อมูลสมาชิค:" +
              this.plan_career.member_id +
              " หรือไม่?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            console.log("บันทึกการแก้ไขข้อมูล", this.plan_career.member_id);
            axios
              .post(this.url_api_plan_career, {
                action: "update",
                plan_career_id: this.plan_career.plan_career_id,
                member_id: this.plan_career.member_id,
                career_id: this.plan_career.career_id,
                start_date: this.plan_career.start_date,
              })
              .then((response) => {
                console.log("บันทึกการแก้ไข:", response.data);
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
    editUser(plan_career_id) {
      console.log("Edit data");
      this.btnLabel = "แก้ไขข้อมูล";
      this.isEdit = true;
      var self = this;
      axios
        .post(this.url_api_plan_career, {
          action: "edit",
          plan_career_id: plan_career_id,
        })
        .then(function (response) {
          console.log("แก้ไขข้อมูล:", response.data);
          self.plan_career.plan_career_id = response.data.plan_career_id;
          self.plan_career.member_id = response.data.member_id;
          self.plan_career.career_id = response.data.career_id;
          self.plan_career.start_date = response.data.start_date;
          self.plan_career.full_name = response.data.full_name;
          // self.plan_career.end_date = response.data.end_date;
          self.plan_careers_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(plan_career_id, career_name) {
      // if (confirm("คุณต้องการลบ [" + career_name + "] หรือไม่ ?")) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message: "คุณต้องการลบ [" + career_name + "] หรือไม่ ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          var self = this;
          axios
            .post(this.url_api_plan_career, {
              action: "delete",
              plan_career_id: plan_career_id,
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
    // getUpdate(member_id) {
    //   console.log(" อาชีพเป้าหมาย สมาชิค:", member_id);
    //   var self = this;
    //   axios
    //     .post(this.url_api_plan_career, {
    //       action: "getAll",
    //       member_id: member_id,
    //     })
    //     .then(function (res) {
    //       console.log("res", res);
    //       self.plan_careers1 = res.data;
    //       console.log("plan_careers1:", self.plan_careers1);
    //     })
    //     .finally(() => {
    //       self.loading = false;
    //     });
    // },
    getUpdate() {
      console.log(" อาชีพเป้าหมาย");
      var self = this;
      axios
        .post(this.url_api_plan_career, {
          member_id: this.plan_career.member_id,
          action: "getAll_",
        })
        .then(function (res) {
          console.log("plan_careers:", res.data);
          self.plan_careers1 = res.data;
          console.log("plan_careers1:", self.plan_careers1);
        })
        .finally(() => {
          self.loading = false;
        });
    },
    getMemberId() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      var memId = parseInt(this.$store.getters.myMember_id);
      axios
        .post(this.url_api_career, {
          action: "getMemberId",
          member_id: memId,
        })
        .then(function (res) {
          self.emp_id = res.data;
          console.log("Member Id:", memId);
          console.log("get member id:", self.emp_id["member_id"]);
          self.plan_career.member_id = self.emp_id["member_id"];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createValue(career_name, done) {
      done(career_name, "add-unique");
      console.log("create career_name:", career_name);
      // if (confirm("คุณต้องการเพิ่มอาชีพ [" + val + "] ใช่ใหม?")) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message: "คุณต้องการเพิ่มอาชีพ [" + career_name + "] ใช่ใหม?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          var self = this;
          axios
            .post(this.url_api_career, {
              action: "insert",
              career_name: career_name,
              member_id: this.plan_career.member_id,
            })
            .then(function (response) {
              console.log("ข้อมูลอาชีพ:", response.data);
              self.getCareer();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    },
    onNext() {
      this.$router.replace({ name: "FormQualification" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormComponent" });
    },
    filterCareer(val, update) {
      if (val === "") {
        update(() => {
          this.career.options = this.career_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.career.options = this.career_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    this.getUpdate(this.plan_career.member_id);
    this.getCareer();
  },
  created() {
    var www = this.$store.getters.myWWW;
    if (!www) {
      // ------------------------------------------------------------------------------
      this.url_api_career =
        "http://localhost:85/icp2022/icp_v1_suser/plan_career_form/api-career.php";
      this.url_api_plan_career =
        "http://localhost:85/icp2022/icp_v1_suser/plan_career_form/api-plan-career.php";
      // // ------------------------------------------------------------------------------
    } else {
      this.url_api_career =
        "https://icp2022.net/icp_v1_suser/plan_career_form/api-career.php";
      this.url_api_plan_career =
        "https://icp2022.net/icp_v1_suser/plan_career_form/api-plan-career.php";
      // ------------------------------------------------------------------------------
    }
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
