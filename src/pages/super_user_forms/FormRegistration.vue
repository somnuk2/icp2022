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
                    @submit="submitForm"
                    @reset="resetForm"
                    method="post"
                    class="q-gutter-md"
                  >
                    <!-- ชื่อ -->
                    <div class="row">
                      <!-- ชื่อ-สกุล -->
                      <div class="col-md-12 col-xs-12 q-pa-xs">
                        <q-input
                          color="white"
                          bg-color="blue-5"
                          standout
                          bottom-slots
                          v-model="member.full_name"
                          label="ชื่อ-สกุล"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <!-- บทบาทของผู้ใช้ระบบ -->
                    <div class="row">
                      <!-- บทบาทของผู้ใช้ระบบ +อีเมล -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-select
                          color="blue-3"
                          v-model="member_role"
                          :options="member_roles.options"
                          label="บทบาท"
                          stack-label
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                          <template v-slot:selected>
                            บทบาท:
                            <q-chip
                              v-if="member_role"
                              dense
                              square
                              color="white"
                              text-color="primary"
                              class="q-pa-xs"
                            >
                              {{ member_role.label }}
                            </q-chip>
                            <q-badge v-else>*none*</q-badge>
                          </template>
                          <template v-if="member_role" v-slot:append>
                            <q-icon
                              name="cancel"
                              @click.stop.prevent="institute = null"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-select>
                      </div>
                      <!-- อีเมล -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          color="white"
                          bg-color="blue-5"
                          standout
                          bottom-slots
                          v-model="member.email"
                          label="อีเมล"
                          clearable
                          type="email"
                          lazy-rules
                          :rules="[this.required, this.isEmail, this.short]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <!-- รหัสผ่าน -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          ref="password"
                          v-if="register"
                          square
                          clearable
                          v-model="member.password"
                          :type="passwordFieldType"
                          lazy-rules
                          :rules="[this.required, this.short]"
                          label="รหัสผ่าน"
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="visibilityIcon"
                              @click="switchVisibility"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                      <!-- ยืนยันรหัสผ่าน -->
                      <div class="col-md-6 col-xs-12 q-pa-xs">
                        <q-input
                          ref="repassword"
                          v-if="register"
                          square
                          clearable
                          v-model="member.repassword"
                          :type="passwordFieldType"
                          lazy-rules
                          :rules="[
                            this.required,
                            this.short,
                            this.diffPassword,
                          ]"
                          label="ยืนยันรหัสผ่าน"
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="visibilityIcon"
                              @click="switchVisibility"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <!-- ปุ่มควบคุม -->
                    <div class="row">
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
                        <!-- ไปฟอร์มกรอกข้อมูลส่วนตัว -->
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_next"
                          label="ไปฟอร์มกรอกข้อมูลส่วนตัว"
                          class="q-pa-xs"
                          to="/FormComponent"
                        >
                          <q-tooltip class="bg-accent"
                            >ไปฟอร์มกรอกข้อมูลส่วนตัว</q-tooltip
                          >
                        </q-btn>
                      </div>
                    </div>
                    <!-- ตารางข้อมูล -->
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-ma-xs">
                        <div class="q-pa-xs">
                          <!-- ผู้ดูแลระบบ + ที่ปรึกษา + ผู้ใช้ระบบ -->
                          <div class="row items-center q-gutter-sm q-mb-md">
                            <!-- ผู้ดูแลระบบ -->
                            <q-toggle
                              color="blue"
                              label="ผู้ดูแลระบบ"
                              v-model="admin"
                              val="admin"
                              @update:model-value="getUpdate()"
                            />
                            <!-- ที่ปรึกษา -->
                            <q-toggle
                              color="green"
                              label="ผู้แลกลุ่ม"
                              v-model="suser"
                              val="suser"
                              @update:model-value="getUpdate()"
                            />
                            <!-- ผู้ใช้ระบบ -->
                            <q-toggle
                              color="red"
                              label="ผู้ใช้ระบบ"
                              v-model="user"
                              val="user"
                              @update:model-value="getUpdate()"
                            />
                          </div>
                          <q-table
                            class="my-sticky-header-table"
                            title="ข้อมูลสมาชิค"
                            :rows="members1"
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
                                placeholder="ค้นหาสมาชิค"
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
                                  @click="editUser(props.row.member_id)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  label="ลบ"
                                  @click="
                                    deleteUser(
                                      props.row.member_id,
                                      props.row.full_name
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

  <div class="vue-tempalte"></div>
  <div class="py-2"></div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";
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
  data() {
    return {
      // ------------------------------------------------------------------------------
      // url_api_member:
      //   "http://localhost:85/icp2022/icp_v1_suser/registration_form/api-member.php",
      // ------------------------------------------------------------------------------
      url_api_member:
        "https://icp2022.net/icp_v1_suser/registration_form/api-member.php",
      // ------------------------------------------------------------------------------

      title: "การลงทะเบียน(ผู้ดูแลกลุ่ม)",
      members: Array,
      register: true,
      filter: ref(""),
      loading: ref(false),
      member: {
        member_id: this.$store.getters.myMember_id,
        full_name: "",
        email: "",
        password: "",
        repassword: "",
        status: "",
      },
      columns: [
        { name: "actions", align: "center", label: "Action" },
        {
          name: "mem_id",
          required: true,
          label: "mem_id",
          align: "center",
          field: (row) => row.member_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "full_name",
          align: "center",
          label: "ชื่อ-สกุล",
          field: (row) => row.full_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "e-mail",
          align: "center",
          label: "อีเมลย์",
          field: (row) => row.email,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "password",
          align: "center",
          label: "รหัสผ่าน",
          field: (row) => row.password,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          align: "center",
          label: "บทบาท",
          field: (row) => row.status,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "verified",
          align: "center",
          label: "ยืนยัน",
          field: (row) => row.is_verified,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "adv_id",
          align: "center",
          label: "รหัสผู้ดูแล",
          field: (row) => row.advisor_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "adv_name",
          align: "center",
          label: "ผู้ดูแล",
          field: (row) => row.advisor_name,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      members1: [],
      $q: useQuasar(),
      passwordFieldType: "password",
      visibility: false,
      visibilityIcon: "visibility",
      checkUser: ref(false),
      // กำหนดทางเลือกตาราง
      admin: ref(true),
      suser: ref(true),
      user: ref(true),
      member_roles_: {
        options: [],
      },
      member_roles: {
        options: [
          {
            label: "ผู้ดูแลระบบ",
            value: "admin",
          },
          {
            label: "ที่ปรึกษา",
            value: "suser",
          },
          {
            label: "ผู้ใช้ระบบ",
            value: "user",
          },
        ],
      },
      member_role: ref({
        label: "",
        value: "",
      }),
      btnLabel: "เพิ่มข้อมูล",
    };
  },
  methods: {
    // นำออกไฟล์ excel
    exportTable() {
      console.log("Export excel");
      var columns = this.columns;
      var rows = this.members1;
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

      const status = exportFile("members.csv", "\ufeff" + content, {
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
            this.checkNewMemeber(this.member.email);
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
              .post(this.url_api_member, {
                action: "update",
                member_id: this.member.member_id,
                full_name: this.member.full_name,
                email: this.member.email,
                password: this.member.password,
                status: this.member_role.value,
              })
              .then((response) => {
                console.log("update:", response.data);
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
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post(this.url_api_member, {
          action: "getall",
        })
        .then(function (res) {
          console.log("Registration:", res.data);
          self.members = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addNewMember() {
      const newMember = {
        full_name: this.member.full_name,
        email: this.member.email,
        password: this.member.password,
        status: this.member_role.value,
      };
      this.$emit("saveData", newMember);
      console.log("บันทึกข้อมูล", newMember);
      axios
        .post(this.url_api_member, {
          action: "insert",
          full_name: this.member.full_name,
          email: this.member.email,
          password: this.member.password,
          status: this.member_role.value,
        })
        .then((res) => {
          console.log(res);
          this.getUpdate();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    checkNewMemeber(email) {
      console.log(" ตรวจสอบผู้ใช้ ", email);
      var self = this;
      axios
        .post(this.url_api_member, {
          action: "checkUser",
          email: email,
        })
        .then(function (res) {
          var isMember = res.data.length > 0;
          if (isMember) {
            console.log("Is member:", isMember);
            self.$q
              .dialog({
                title: "แจ้งเพื่อทราบ",
                message: "อีเมล:" + email + " เป็นสมาชิคแล้ว",
                persistent: true,
              })
              .onOk(() => {});
          } else {
            console.log("New Member");
            self.addNewMember();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUpdate1() {
      console.log(
        "แสดงข้อมูลสมาชิค:",
        (this.admin ? "admin" : "") +
          "-" +
          (this.suser ? "suser" : "") +
          "-" +
          (this.user ? "user" : "")
      );
      var self = this;
      axios
        .post(this.url_api_member, {
          advisor_id: this.member_id,
          action: "getall_",
        })
        .then(function (res) {
          console.log("Registration:+", res.data);
          self.members1 = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // getUpdate() {
    //   console.log(
    //     "แสดงข้อมูลสมาชิค:",
    //     (this.admin ? "admin" : "") +
    //       "-" +
    //       (this.suser ? "suser" : "") +
    //       "-" +
    //       (this.user ? "user" : "")
    //   );
    //   console.log("this.member:+");
    //   var self = this;
    //   axios
    //     .post(this.url_api_member, {
    //       member_id: this.member,
    //       action: "getall_",
    //     })
    //     .then(function (res) {
    //       console.log("Registration:", res.data);
    //       self.members1 = res.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    getUpdate() {
      console.log("member:", this.member.member_id);
      var self = this;
      axios
        .post(this.url_api_member, {
          member_id: this.member.member_id,
          action: "getall_",
        })
        .then(function (res) {
          console.log("Registration:", res.data);
          self.members1 = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editUser(id) {
      console.log("Edit data");
      this.btnLabel = "แก้ไขข้อมูล";
      this.isEdit = true;
      var self = this;
      axios
        .post(this.url_api_member, {
          action: "edit",
          id: id,
        })
        .then(function (response) {
          console.log("Edit:", response.data);
          self.member.member_id = response.data.member_id;
          self.member.full_name = response.data.full_name;
          self.member.email = response.data.email;
          self.member.password = response.data.password;
          self.member.status = response.data.status;
          self.member_role.value = response.data.status;
          if (self.member_role.value == "admin") {
            self.member_role.label = "ผู้ดูแลระบบ";
          } else if (self.member_role.value == "suser") {
            self.member_role.label = "ที่ปรึกษา";
          } else if (self.member_role.value == "user") {
            self.member_role.label = "ผู้ใช้ระบบ";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    resetForm() {
      console.log("ยกเลิกการบันทึกข้อมูล");
      this.member.member_id = 0;
      this.member.full_name = "";
      this.member.email = "";
      this.member.password = "";
      this.member.repassword = "";
      this.member_role.value = "";
      this.member_role.label = "";
    },
    deleteUser(id, name) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message: "คุณต้องการลบ [" + name + "] หรือไม่ ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          var self = this;
          axios
            .post(this.url_api_member, {
              action: "delete",
              id: id,
            })
            .then(function (response) {
              console.log(response);
              // self.resetForm();
              // self.getAllUser();
              self.getUpdate();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    },
    required(val) {
      return (val && val.length > 0) || "ช่องที่ต้องกรอก";
    },
    diffPassword(val) {
      const val2 = this.member.password;
      return (val && val === val2) || "รหัสผ่านไม่ตรงกัน!";
    },
    short(val) {
      return (val && val.length > 3) || "ค่าสั้นเกินไป";
    },
    isEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "กรุณาใส่อีเมลที่ถูกต้อง";
    },
    switchTypeForm() {
      this.register = !this.register;
      this.title = this.register ? "ผู้ใช้ใหม่" : "การอนุญาต";
      this.btnLabel = this.register ? "การลงทะเบียน" : "ทางเข้า";
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
    OnCancel() {
      this.$router.replace({ name: "home" });
    },
    filterMember_role(val, update) {
      if (val === "") {
        update(() => {
          this.member_roles.options = this.member_roles_.options;
          console.log("member_roles_.options:", this.member_roles_.options);
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.member_roles.options = this.member_roles_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
        console.log("member_roles_.options:", this.member_roles_.options);
      });
    },
  },
  created() {
    var www = this.$store.getters.myWWW;
    if (!www) {
      // ------------------------------------------------------------------------------
      url_api_member =
        "http://localhost:85/icp2022/icp_v1_suser/registration_form/api-member.php";
      // ------------------------------------------------------------------------------
    } else {
      url_api_member =
        "https://icp2022.net/icp_v1_suser/registration_form/api-member.php";
      // ------------------------------------------------------------------------------
    }
  },
  mounted() {
    this.getUpdate();
  },
};
</script>
<style scoped></style>
