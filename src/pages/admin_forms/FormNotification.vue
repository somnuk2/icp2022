<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <div @keyup="nextItem">
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
                <div class="row full-width">
                  <div class="col-md-12 col-xs-12 q-pa-xs">
                    <q-form
                      @submit.prevent="submitForm()"
                      @reset="resetForm()"
                      method="post"
                      class="q-gutter-md"
                    >
                      <!-- จบการศึกษา + ปีที่สำเร็จการศึกษา + ชั้นปีที่กำลังศึกษา -->
                      <div class="row">
                        <!-- สถานะการแจ้งเตือน วันที่เริ่มแจ้งเตือน ประเภทการแจ้งเตือน -->
                        <div class="col-md-4 col-xs-12 q-pa-xs">
                          <q-checkbox
                            v-model="is_notification"
                            val="is_notification"
                            label="ฉันต้องการให้มีการแจ้งเตือน"
                            color="teal"
                            true-value="1"
                            false-value="0"
                          />
                        </div>
                        <!-- วันที่เริ่มแจ้งเตือน -->
                        <div class="col-md-4 col-xs-12 q-pa-xs">
                          <q-input
                            filled
                            v-model="notification_date"
                            label="วันเริ่มแจ้งเตือน"
                            :disable="is_notification == '1' ? false : true"
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
                                    v-model="notification_date"
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
                        <!-- ประเภทการแจ้งเตือน -->
                        <div class="col-md-4 col-xs-12 q-pa-xs">
                          <q-select
                            @filter="filterFrequency"
                            use-input
                            color="green"
                            v-model="frequency.options.value"
                            :options="frequency.options"
                            label="การแจ้งเตือน"
                            emit-value
                            map-options
                            :disable="is_notification == '1' ? false : true"
                          >
                            <template v-slot:prepend>
                              <q-icon name="notifications_active" />
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
                      <!-- ปุ่มตวบคุม -->
                      <div class="row">
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
                          <!-- กลับฟอร์มการลงทะเบียน -->
                          <q-btn
                            color="primary"
                            label="กลับฟอร์มการลงทะเบียน"
                            no-caps
                            flat
                            icon="skip_previous"
                            to="/RegistrationPage"
                          >
                            <q-tooltip class="bg-accent"
                              >กลับฟอร์มการลงทะเบียน</q-tooltip
                            >
                          </q-btn>
                          <!-- ไปฟอร์มกำหนดอาชีพเป้าหมาย -->
                          <q-btn
                            color="primary"
                            label="ไปฟอร์มกำหนดอาชีพเป้าหมาย"
                            no-caps
                            flat
                            icon="skip_next"
                            to="/FormPlanCareer"
                          >
                            <q-tooltip class="bg-accent"
                              >ไปฟอร์มกำหนดอาชีพเป้าหมาย</q-tooltip
                            >
                          </q-btn>
                        </div>
                      </div>
                    </q-form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-xs-12 q-pa-xs">
                    <div class="q-pa-xs">
                      <q-table
                        class="my-sticky-header-table"
                        title="ข้อมูลส่วนตัว"
                        :rows="notification1"
                        :columns="columns"
                        row-key="name"
                        :filter="filter"
                        :loading="loading"
                      >
                        <template v-slot:top-right>
                          <q-input
                            borderless
                            dense
                            debounce="300"
                            v-model="filter"
                            placeholder="ค้นหาข้อมูลการแจ้งเตือน"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
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
                              @click="editUser(props.row.notification_id)"
                            ></q-btn>
                            <q-btn
                              icon="delete"
                              label="ลบ"
                              @click="
                                deleteUser(
                                  props.row.notification_id,
                                  props.row.notification_date
                                )
                              "
                            ></q-btn>
                          </q-td>
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { exportFile } from "quasar";
import { date } from "quasar";

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
  name: "FormComponent",
  components: {},
  data() {
    return {
      pdpa: ref(false),
      picked: new Date(),
      // ------------------------------------------------------------------------------
      // url_api_plan:
      //   "http://localhost:85/icp2022/icp_v1_admin/plan_form/api-plan.php",
      // url_api_individual:
      //   "http://localhost:85/icp2022/icp_v1_admin/individual_form/api-individual.php",
      // url_api_notification:
      //   "http://localhost:85/icp2022/icp_v1_admin/notification_form/api-notification.php",
      // ------------------------------------------------------------------------------
      url_api_plan: "https://icp2022.net/icp_v1_admin/plan_form/api-plan.php",
      url_api_individual:
        "https://icp2022.net/icp_v1_admin/individual_form/api-individual.php",
      url_api_notification:
        "https://icp2022.net/icp_v1_admin/notification_form/api-notification.php",
      // ------------------------------------------------------------------------------

      title: "การแจ้งเตือน",
      // email: "",
      // username: "",
      // password: "",
      // repassword: "",
      // register: false,
      // passwordFieldType: "password",
      // visibility: false,
      // visibilityIcon: "visibility",
      // input: {
      //   username: "",
      //   password: "",
      // },
      // member: {
      //   member_id: 0,
      //   full_name: "",
      //   status: "",
      // },
      // individuals: Array,
      // individuals_: Array,
      // individual: {
      //   individual_id: "",
      //   // ข้อมูลส่วนตัว
      //   member_id: this.$store.getters.myMember_id,
      //   name: this.$store.getters.myName,
      //   birthday: "",
      //   // card_id: "",
      //   telephone: "",
      //   // ข้อมูลการศึกษา
      //   institute_id: 1,
      //   university: "",
      //   faculty_id: "",
      //   study_faculty: "",
      //   degree_id: "",
      //   degree: "",
      //   department_id: "",
      //   department: "",
      //   is_graduate: "0",
      //   year: "",
      //   date: "",
      //   // ข้อมูลความพิการ
      //   is_disability: "0",
      //   disability_id: "",
      //   disability_type: "",
      //   dis_description: "",
      //   // เข้าร่วมจากโครงการ
      //   project_id: "",
      // },
      isEdit: false,
      btnLabel: "เพิ่มข้อมูล",
      status: "บันทึก",
      columns: [
        // ข้อมูลส่วนตัว
        { name: "actions", align: "center", label: "Action" },
        {
          name: "notification_id",
          required: true,
          label: "not_id",
          align: "center",
          field: (row) => row.notification_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "member_id",
          required: true,
          label: "mem_id",
          align: "center",
          field: (row) => row.member_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "full_name",
          align: "left",
          label: "ชื่อ-สกุล",
          field: (row) => row.full_name,
          format: (val) => `${val}`,
        },
        {
          name: "is_notification",
          align: "center",
          label: "is_not",
          field: (row) => row.is_notification,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "notification_date",
          align: "center",
          label: "วันเริ่มแจ้งเตือน",
          field: (row) => row.notification_date,
          format: (val) => `${val}`,
        },
        {
          name: "frequency_id",
          align: "center",
          label: "รหัสความถี่",
          field: (row) => row.frequency_id,
          format: (val) => `${val}`,
        },
        {
          name: "frequency_name",
          align: "center",
          label: "ชื่อความถี่",
          field: (row) => row.frequency_name,
          format: (val) => `${val}`,
        },
      ],
      filter: ref(""),
      loading: ref(false),
      $q: useQuasar(),
      member_id: this.$store.getters.myMember_id,
      name: this.$store.getters.myName,
      notification_id: "",
      is_notification: "0",
      frequency_id: "",
      frequency_: {
        options: [],
      },
      frequency: {
        options: [],
      },
      notification_date: "",
      notification1: [],
    };
  },

  methods: {
    // นำออกไฟล์ excel
    exportTable() {
      console.log("Export excel");
      var columns = this.columns;
      var rows = this.notification1;
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

      const status = exportFile("notification.csv", "\ufeff" + content, {
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
    resetForm() {
      this.isEdit = false;
      console.log("isEdit:", this.isEdit);
      this.btnLabel = "เพิ่มข้อมูล";
      console.log("ยกเลิกการบันทึกข้อมูล");
      this.is_notification = "0";
      this.notation_date = "";
      this.frequency.options.label = "";
      this.frequency.options.value = "";
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
            console.log("บันทึกข้อมูล mem_id:", this.member_id);
            console.log("บันทึกข้อมูล not_date:", this.notification_date);
            console.log("บันทึกข้อมูล not_type:", this.frequency.options.value);
            console.log("บันทึกข้อมูล is_not:", this.is_notification);

            const newNotification = {
              is_notification: this.is_notification,
              member_id: this.member_id,
              notification_date: this.notification_date,
              notification_type: this.frequency.options.value,
            };
            this.$emit("saveData", newNotification);

            axios
              .post(this.url_api_notification, {
                action: "insert",
                notification_id: this.notification_id,
                member_id: this.member_id,
                notification_date: this.notification_date,
                notification_type: this.frequency.options.value,
                is_notification: this.is_notification,
              })
              .then((res) => {
                console.log("บันทึกข้อมูล:", res.data);
                // this.resetForm();
                this.getUpdate(this.member_id);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      } else {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message:
              "คุณต้องการบันทึกการเแก้ไขข้อมูล : " + this.notification_date,
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            console.log("บันทึกการแก้ไข project:", this.notification_date);
            axios
              .post(this.url_api_notification, {
                action: "update",
                notification_id: this.notification_id,
                member_id: this.member_id,
                notification_date: this.notification_date,
                notification_type: this.frequency.options.value,
                is_notification: this.is_notification,
              })
              .then((response) => {
                console.log("บันทึกการแก้ไข:", response.data);
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
    editUser(notification_id) {
      console.log("Edit data");
      this.btnLabel = "แก้ไขข้อมูล";
      this.isEdit = true;
      var self = this;
      axios
        .post(this.url_api_notification, {
          action: "edit",
          notification_id: notification_id,
        })
        .then(function (response) {
          console.log("Edit data:", response.data);
          self.notification_id = response.data.notification_id;
          self.is_notification = String(response.data.is_notification);
          self.notification_date = response.data.notification_date;
          self.member_id = response.data.member_id;
          self.frequency.options.label = response.data.frequency_name;
          self.frequency.options.value = response.data.frequency_id;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(notification_id, notification_date) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message:
            "คุณต้องการลบ [ " +
            notification_id +
            "-" +
            notification_date +
            " ] หรือไม่ ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          var self = this;
          axios
            .post(this.url_api_notification, {
              action: "delete",
              notification_id: notification_id,
            })
            .then(function (response) {
              console.log("delete:", response.data);
              self.getUpdate(self.member_id);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    },
    getUpdate(member_id) {
      console.log("get update-member_id:", member_id);
      var self = this;
      axios
        .post(this.url_api_notification, {
          action: "getall",
          member_id: member_id,
        })
        .then(function (res) {
          console.log("notification:", res);
          self.notification1 = res.data;
          console.log("notification1:", self.notification1);
        })
        .finally(() => {
          self.loading = false;
        });
    },
    onNext() {
      this.$router.replace({ name: "FormPlanCareer" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormPlanCareer" });
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
    getUpdateNotify(member_id) {
      console.log("get update-member_id:", member_id);
      var self = this;
      axios
        .post(this.url_api_notification, {
          action: "getallNotify",
          member_id: member_id,
        })
        .then(function (res) {
          console.log("notification:", res);
          var notification_date = res.data.notification_date;
          var frequency_name = res.data.frequency_name;
          console.log("notification_date:", notification_date);
          console.log("frequency_name:", frequency_name);
          // ตรวจสอบวันและทำการแจ้งเตือน
          self.currentDate(notification_date, frequency_name);
        })
        .finally(() => {
          self.loading = false;
        });
    },
    currentDate(specific_, frequency) {
      console.log("specific-:", specific_);
      var current = new Date();
      const specific = date.extractDate(specific_, "DD/MM/YYYY");
      const unit = "days";

      console.log("specific:", specific_);
      console.log("current.getTime():", current.getTime());
      console.log("specific.getTime():", specific.getTime());

      const diff_days = date.getDateDiff(current, specific, unit);
      console.log(current + "-" + specific + "=" + diff_days);

      var freq = 0;
      if (frequency == "วัน") freq = 1;
      else if (frequency == "สัปดาห์") freq = 7;
      else if (frequency == "เดือน") freq = 30;

      if (diff_days % freq == 0) {
        console.log(
          " แจ้งเตือนราย " + frequency + "(" + freq + "):" + diff_days
        );
        this.$q.notify({
          message: "ครบกำหนดเวลาการประเมินตนเองแจ้งเตือนราย" + frequency,
          color: "primary",
          actions: [
            {
              label: "Reply",
              color: "yellow",
              handler: () => {},
            },
            {
              label: "Dismiss",
              color: "white",
              handler: () => {},
            },
          ],
        });
      }
    },
  },
  mounted() {
    this.getFrequency();
    var member_id = this.member_id;
    this.getUpdate(member_id);
    this.getUpdateNotify(member_id);
  },
  created() {
    var www = this.$store.getters.myWWW;
    if (!www) {
      // ------------------------------------------------------------------------------
      this.url_api_plan =
        "http://localhost:85/icp2022/icp_v1_admin/plan_form/api-plan.php";
      this.url_api_individual =
        "http://localhost:85/icp2022/icp_v1_admin/individual_form/api-individual.php";
      this.url_api_notification =
        "http://localhost:85/icp2022/icp_v1_admin/notification_form/api-notification.php";
      // ------------------------------------------------------------------------------
    } else {
      this.url_api_plan =
        "https://icp2022.net/icp_v1_admin/plan_form/api-plan.php";
      this.url_api_individual =
        "https://icp2022.net/icp_v1_admin/individual_form/api-individual.php";
      this.url_api_notification =
        "https://icp2022.net/icp_v1_admin/notification_form/api-notification.php";
    }
    // ------------------------------------------------------------------------------
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
