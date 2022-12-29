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
                      <div class="row">
                        <!-- ชื่อ-สกุล -->
                        <div class="col-md-12 col-xs-12 q-pa-xs">
                          <q-input
                            standout
                            bottom-slots
                            filled
                            v-model="individual.birthday"
                            label="ชื่อ-สกุล"
                            clearable
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:append>
                              <q-icon name="favorite" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                      <!-- วัน-เดือน-ปี เกิด+หมายเลขโทรศัพท์ -->
                      <div class="row">
                        <!-- วัน-เดือน-ปี เกิด -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-input
                            standout
                            bottom-slots
                            filled
                            v-model="individual.birthday"
                            label="ปีเกิด"
                            clearable
                            mask="####"
                            fill-mask
                            hint="ปีเกิด: ####"
                            v-on:keyup.up="onTelephone()"
                            v-on:keyup.left="onTelephone()"
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:append>
                              <q-icon name="favorite" />
                            </template>
                          </q-input>
                        </div>
                        <!-- หมายเลขโทรศัพท์ -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-input
                            standout
                            bottom-slots
                            v-model="individual.telephone"
                            label="หมายเลขโทรศัพท์"
                            mask="( ## ) ## - ### - ###"
                            fill-mask
                            hint="โทรศัพท์: (##)##-###-###"
                            clearable
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
                      <!-- สถาบันการศึกษา + ระดับการศึกษา -->
                      <div class="row">
                        <!-- สถาบันการศึกษา -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterInstitute"
                            color="blue-3"
                            v-model="institute"
                            :options="institutes.options"
                            label="สถาบันการศึกษา"
                            stack-label
                            @update:model-value="
                              (val) => onInstituteValueChange(val)
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:selected>
                              สถาบัน:
                              <q-chip
                                v-if="institute"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ institute.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="institute" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="institute = null"
                                class="cursor-pointer"
                              />
                            </template>
                          </q-select>
                        </div>
                        <!-- คณะ -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterFaculty"
                            color="blue-3"
                            v-model="faculty"
                            :options="facultys.options"
                            label="คณะ"
                            stack-label
                            @update:model-value="
                              (val) => onFacultyValueChange(val)
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:selected>
                              คณะ:
                              <q-chip
                                v-if="faculty"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ faculty.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="faculty" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="faculty = null"
                                class="cursor-pointer"
                              />
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <!-- สาขาวิชา -->
                      <div class="row">
                        <!-- ระดับการศึกษา -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterDegree"
                            color="blue-3"
                            v-model="degree"
                            :options="degrees.options"
                            label="ระดับการศึกษา"
                            stack-label
                            @update:model-value="
                              (val) => onDegreeValueChange(val)
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:selected>
                              ระดับการศึกษา:
                              <q-chip
                                v-if="degree"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ degree.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="degree" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="degree = null"
                                class="cursor-pointer"
                              />
                            </template>
                          </q-select>
                        </div>
                        <!-- สาขาวิชา -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterDepartment"
                            color="blue-3"
                            v-model="department"
                            :options="departments.options"
                            label="สาขาวิชา"
                            stack-label
                            @update:model-value="
                              (val) => onDepartmentValueChange(val)
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:selected>
                              สาขาวิชา:
                              <q-chip
                                v-if="department"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ department.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="department" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="department = null"
                                class="cursor-pointer"
                              />
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <!-- จบการศึกษา + ปีที่สำเร็จการศึกษา + ชั้นปีที่กำลังศึกษา -->
                      <div class="row">
                        <!-- จบการศึกษา -->
                        <div class="col-md-4 col-xs-4 q-pa-xs">
                          <q-checkbox
                            v-model="individual.is_graduate"
                            val="is_graduate"
                            label="จบการศึกษา"
                            color="teal"
                            true-value="1"
                            false-value="0"
                          />
                        </div>
                        <!-- ปีที่สำเร็จการศึกษา -->
                        <div class="col-md-4 col-xs-8 q-pa-xs">
                          <q-input
                            standout
                            bottom-slots
                            filled
                            v-model="individual.date"
                            label="ปีที่จบ"
                            clearable
                            mask="####"
                            fill-mask
                            hint="ปี: ####"
                            :disable="
                              individual.is_graduate == '1' ? false : true
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:append>
                              <q-icon name="favorite" />
                            </template>
                          </q-input>
                        </div>
                        <!-- ชั้นปีที่กำลังศึกษา -->
                        <div class="col-md-4 col-xs-12 q-pa-xs">
                          <q-input
                            standout
                            bottom-slots
                            filled
                            v-model="individual.year"
                            label="ชั้นปี"
                            clearable
                            mask="#"
                            fill-mask
                            hint="ชั้นปี: #"
                            :disable="
                              individual.is_graduate == '0' ? false : true
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="school" />
                            </template>
                            <template v-slot:append>
                              <q-icon name="favorite" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                      <!-- ภาวะความพิการ + ชนิดความพิการ + รายละเอียดความพิการ -->
                      <div class="row">
                        <!-- ภาวะความพิการ -->
                        <div class="col-md-4 col-xs-12 q-pa-xs">
                          <q-checkbox
                            v-model="individual.is_disability"
                            val="is_disability"
                            label="มีภาวะความพิการ"
                            color="teal"
                            true-value="1"
                            false-value="0"
                          />
                        </div>
                        <!-- ชนิดความพิการ -->
                        <div class="col-md-8 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterDisability"
                            color="blue-3"
                            v-model="disability"
                            :options="disabilitys.options"
                            label="เลือกประเภทความพิการ"
                            stack-label
                            @update:model-value="
                              (val) => onDisabilityValueChange(val)
                            "
                            :disable="
                              individual.is_disability == '1' ? false : true
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="assist_walker" />
                            </template>
                            <template v-slot:selected>
                              ความพิการ:
                              <q-chip
                                v-if="disability"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ disability.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="disability" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="disability = null"
                                class="cursor-pointer"
                              />
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <div class="row">
                        <!-- รายละเอียดความพิการ -->
                        <div class="col-md-12 col-xs-12 q-pa-xs">
                          <q-input
                            standout
                            bottom-slots
                            filled
                            v-model="individual.dis_description"
                            label="รายละเอียด"
                            clearable
                            :disable="
                              individual.is_disability == '1' ? false : true
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="assist_walker" />
                            </template>
                            <template v-slot:append>
                              <q-icon name="favorite" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                      <div class="row">
                        <!-- โครงการ -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterProject"
                            color="blue-3"
                            v-model="project"
                            :options="projects.options"
                            label="โครงการ"
                            stack-label
                            @update:model-value="
                              (val) => onProjectValueChange(val)
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="assignment_turned_in" />
                            </template>
                            <template v-slot:selected>
                              โครงการ:
                              <q-chip
                                v-if="project"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ project.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="project" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="project = null"
                                class="cursor-pointer"
                              />
                            </template>
                            <!-- @filter="(val, update) => filterProject(val, update)" -->
                            <!-- <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template> -->
                          </q-select>
                        </div>
                        <!-- อาจารย์ที่ปรึกษา -->
                        <div class="col-md-6 col-xs-12 q-pa-xs">
                          <q-select
                            use-input
                            @filter="filterAdvisor"
                            color="blue-3"
                            v-model="advisor"
                            :options="advisors.options"
                            label="อาจารย์ที่ปรึกษา"
                            stack-label
                            @update:model-value="
                              (val) => onProjectValueChange(val)
                            "
                          >
                            <template v-slot:prepend>
                              <q-icon name="assignment_turned_in" />
                            </template>
                            <template v-slot:selected>
                              อาจารย์ที่ปรึกษา:
                              <q-chip
                                v-if="advisor"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-pa-xs"
                              >
                                {{ advisor.label }}
                              </q-chip>
                              <q-badge v-else>*none*</q-badge>
                            </template>
                            <template v-if="advisor" v-slot:append>
                              <q-icon
                                name="cancel"
                                @click.stop.prevent="advisor = null"
                                class="cursor-pointer"
                              />
                            </template>
                          </q-select>
                        </div>
                      </div>
                      <!-- ข้าพเจ้ายินยอม -->
                      <div class="row">
                        <div
                          class="col-md-12 col-xs-12 q-pa-xs row justify-center"
                        >
                          <q-checkbox
                            left-label
                            v-model="pdpa"
                            label="ข้าพเจ้ายินยอมให้ใช้ข้อมูลส่วนบุคคล เพื่อเป็นประโยชน์ต่อตัวข้าพเจ้าและแผนงานกลไกจ้างงานคนพิการเข้มแข็งและเตรียมความพร้อมพนักงานสู่การเกษียณแบบบูรณาการ สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)"
                            checked-icon="task_alt"
                            unchecked-icon="highlight_off"
                          />
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
                            :disable="!pdpa"
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
                        :rows="individuals1"
                        :columns="columns"
                        row-key="name"
                        :filter="filter"
                        :loading="loading"
                      >
                        <!-- ปุ่มค้นหา + ส่งออก excel -->
                        <template v-slot:top-right>
                          <!-- ปุ่มค้นหา -->
                          <q-input
                            borderless
                            dense
                            debounce="300"
                            v-model="filter"
                            placeholder="ค้นหาข้อมูลส่วนตัว"
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
                        <!-- ปุ่มควบคุม -->
                        <template v-slot:body-cell-actions="props">
                          <q-td :props="props">
                            <q-btn
                              icon="mode_edit"
                              label="แก้ไข"
                              @click="editUser(props.row.individual_id)"
                            ></q-btn>
                            <q-btn
                              icon="delete"
                              label="ลบ"
                              @click="
                                deleteUser(
                                  props.row.individual_id,
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
      url_api_individual: "",
      url_api_institute: "",
      url_api_disability: "",
      url_api_project: "",
      url_api_advisor: "",
      url_api_member: "",
      // ------------------------------------------------------------------------------
      title: "ข้อมูลส่วนตัว",
      email: "",
      username: "",
      password: "",
      repassword: "",
      register: false,
      passwordFieldType: "password",
      btnLabel: "เพิ่มข้อมูล",
      visibility: false,
      visibilityIcon: "visibility",
      input: {
        username: "",
        password: "",
      },
      member: {
        member_id: 0,
        full_name: "",
        status: "",
      },
      individuals: Array,
      individuals_: Array,
      individual: {
        individual_id: "",
        // ข้อมูลส่วนตัว
        member_id: this.$store.getters.myMember_id,
        name: this.$store.getters.myName,
        birthday: "",
        // card_id: "",
        telephone: "",
        // ข้อมูลการศึกษา
        institute_id: 1,
        university: "",
        faculty_id: "",
        study_faculty: "",
        degree_id: "",
        degree: "",
        department_id: "",
        department: "",
        is_graduate: "0",
        year: "",
        date: "",
        // ข้อมูลความพิการ
        is_disability: "0",
        disability_id: "",
        disability_type: "",
        dis_description: "",
        // เข้าร่วมจากโครงการ
        project_id: "",
      },
      isEdit: false,
      status: "บันทึก",
      columns: [
        // ข้อมูลส่วนตัว
        { name: "actions", align: "center", label: "Action" },
        {
          name: "individual_id",
          required: true,
          label: "ind_id",
          align: "center",
          field: (row) => row.individual_id,
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
          sortable: true,
        },
        {
          name: "birthday",
          align: "center",
          label: "วันเกิด",
          field: (row) => row.birthday,
          format: (val) => `${val}`,
        },
        // {
        //   name: "card_id",
        //   align: "center",
        //   label: "บัตรประชาชน",
        //   field: (row) => row.card_id,
        //   format: (val) => `${val}`,
        // },
        {
          name: "telephone",
          align: "center",
          label: "โทรศัพท์",
          field: (row) => row.telephone,
          format: (val) => `${val}`,
        },
        // ข้อมูลการศึกษา
        {
          name: "institute_id",
          align: "center",
          label: "รหัสสถาบัน",
          field: (row) => row.institute_id,
          format: (val) => `${val}`,
        },
        {
          name: "institute_name",
          align: "left",
          label: "สถาบัน",
          field: (row) => row.institute_name,
          format: (val) => `${val}`,
        },
        {
          name: "faculty_name",
          align: "center",
          label: "คณะ",
          field: (row) => row.faculty_name,
          format: (val) => `${val}`,
        },
        {
          name: "degree_name",
          align: "center",
          label: "ระดับ",
          field: (row) => row.degree_name,
          format: (val) => `${val}`,
        },
        {
          name: "department_id",
          align: "center",
          label: "รหัสสาขา",
          field: (row) => row.department_id,
          format: (val) => `${val}`,
        },
        {
          name: "department_name",
          align: "center",
          label: "สาขา",
          field: (row) => row.department_name,
          format: (val) => `${val}`,
        },
        {
          name: "is_graduate",
          align: "center",
          label: "จบการศึกษา",
          field: (row) => row.is_graduate,
          format: (val) => `${val}`,
        },
        {
          name: "date",
          align: "center",
          label: "ปีที่สำเร็จการศึกษา",
          field: (row) => row.date,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "year",
          align: "center",
          label: "ปีที่กำลังศึกษา",
          field: (row) => row.year,
          format: (val) => `${val}`,
          sortable: true,
        },
        // ข้อมูลความพิการ
        {
          name: "is_disability",
          align: "center",
          label: "ภาวะความพิการ",
          field: (row) => row.is_disability,
          format: (val) => `${val}`,
        },
        {
          name: "disability_id",
          align: "center",
          label: "รหัสความพิการ",
          field: (row) => row.disability_id,
          format: (val) => `${val}`,
        },
        {
          name: "disability_name",
          align: "left",
          label: "ความพิการ",
          field: (row) => row.disability_name,
          format: (val) => `${val}`,
        },
        {
          name: "dis_describtion",
          align: "left",
          label: "รายละเอียดความพิการ",
          field: (row) => row.dis_description,
          format: (val) => `${val}`,
        },
        // เข้าร่วมจากโครงการ
        {
          name: "project_id",
          align: "center",
          label: "รหัสโครงการ",
          field: (row) => row.project_id,
          format: (val) => `${val}`,
        },
        {
          name: "project_name",
          align: "left",
          label: "โครงการ",
          field: (row) => row.project_name,
          format: (val) => `${val}`,
        },
        {
          name: "advisor_id",
          align: "center",
          label: "รหัสผู้ดูแลกลุ่ม",
          field: (row) => row.advisor_id,
          format: (val) => `${val}`,
        },
        {
          name: "advisor_name",
          align: "left",
          label: "ผู้ดูแลกลุ่ม",
          field: (row) => row.advisor_name,
          format: (val) => `${val}`,
        },
      ],
      filter: ref(""),
      loading: ref(false),
      individuals1: [],
      institutes_: {
        options: [],
      },
      institutes: {
        options: [],
      },
      institute: ref({
        label: "",
        value: "",
      }),
      facultys: {
        options: [],
      },
      facultys_: {
        options: [],
      },
      faculty: ref({
        label: "",
        value: "",
      }),
      degrees_: {
        options: [],
      },
      degrees: {
        options: [],
      },
      degree: ref({
        label: "",
        value: "",
      }),
      departments_: {
        options: [],
      },
      departments: {
        options: [],
      },
      department: ref({
        label: "",
        value: "",
      }),
      disabilitys_: {
        options: [],
      },
      disabilitys: {
        options: [],
      },
      disability: ref({
        label: "",
        value: "",
      }),
      projects_: {
        options: [],
      },
      projects: {
        options: [],
      },
      project: ref({
        label: "",
        value: "",
      }),
      advisors_: {
        options: [],
      },
      advisors: {
        options: [],
      },
      advisor: ref({
        label: "",
        value: "",
      }),
      // myFormat: {
      //   stringify: (date) => {
      //     return date
      //       ? moment(date).add(543, "y").format("[Thai year] YYYY-MM-DD")
      //       : null;
      //   },
      //   parse: (value) => {
      //     return value
      //       ? moment(value, "[Thai year] YYYY-MM-DD")
      //           .subtract(543, "y")
      //           .toDate()
      //       : null;
      //   },
      // },
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
    onTelephone() {
      console.log("next-telephone");
    },
    resetForm() {
      this.isEdit = false;
      console.log("isEdit:", this.isEdit);
      this.btnLabel = "เพิ่มข้อมูล";
      console.log("ยกเลิกการบันทึกข้อมูล");
      // ข้อมูลส่วนตัว
      this.individual.birthday = "";
      // this.individual.card_id = "";
      this.individual.telephone = "";
      // ข้อมูลการศึกษา
      this.is_graduate = "0";
      this.individual.year = "";
      this.individual.date = "";
      this.degree.value = "";
      this.degree.label = "";
      this.faculty.value = "";
      this.faculty.label = "";
      this.department.value = "";
      this.department.label = "";
      this.institute.value = "";
      this.institute.label = "";
      // ข้อมูลความพิการ
      this.individual.is_disability = "0";
      this.disability.value = "";
      this.disability.label = "";
      this.individual.dis_description = "";
      // ข้อมูลโครงการ
      this.project.label = "";
      this.project.value = "";
      // ข้อมูลผู้ดูแลกลุ่ม
      this.advisor.label = "";
      this.advisor.value = "";
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
            console.log("บันทึกข้อมูล:", this.individual);
            const newindividual = {
              individual_id: this.individual.individual_id,
              // ข้อมูลส่วนตัว
              member_id: this.individual.member_id,
              birthday: this.individual.birthday,
              // card_id: this.individual.card_id,
              telephone: this.individual.telephone,
              // ข้อมูลการศึกษา
              department_id: this.department.value,
              is_graduate: this.is_graduate,
              year: this.individual.year,
              date: this.individual.date,
              // ข้อมูลความพิการ
              is_disability: this.individual.is_disability,
              disability_id: this.disability.value,
              dis_description: this.individual.dis_description,
              // ข้อมูลโครงการ
              project_id: this.project.value,
              // ข้อมูลอาจารย์ที่ปรึกษา
              advisor_id: this.advisor.value,
            };
            this.$emit("saveData", newindividual);

            axios
              .post(this.url_api_individual, {
                action: "insert",
                individual_id: this.individual.individual_id,
                // ข้อมูลส่วนตัว
                member_id: this.individual.member_id,
                birthday: this.individual.birthday,
                // card_id: this.individual.card_id,
                telephone: this.individual.telephone,
                // ข้อมูลการศึกษา
                department_id: this.department.value,
                is_graduate: this.individual.is_graduate,
                year: this.individual.year,
                date: this.individual.date,
                // ข้อมูลความพิการ
                is_disability: this.individual.is_disability,
                disability_id: this.disability.value,
                dis_description: this.individual.dis_description,
                // ข้อมูลโครงการ
                project_id: this.project.value,
                // ข้อมูลอาจารย์ที่ปรึกษา
                advisor_id: this.advisor.value,
              })
              .then((res) => {
                console.log("บันทึกข้อมูล:", res.data);
                // this.resetForm();
                this.getUpdate(this.individual.member_id);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      } else {
        this.$q
          .dialog({
            title: "ยืนยัน",
            message: "คุณต้องการบันทึกการเแก้ไขข้อมูลหรือไม่?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            console.log("บันทึกการแก้ไข project:", this.project.value);
            axios
              .post(this.url_api_individual, {
                action: "update",
                individual_id: this.individual.individual_id,
                // ข้อมูลส่วนตัว
                member_id: this.individual.member_id,
                birthday: this.individual.birthday,
                // card_id: this.individual.card_id,
                telephone: this.individual.telephone,
                // ข้อมูลการศึกษา
                department_id: this.department.value,
                is_graduate: this.individual.is_graduate,
                year: this.individual.year,
                date: this.individual.date,
                // ข้อมูลความพิการ
                is_disability: this.individual.is_disability,
                disability_id: this.disability.value,
                dis_description: this.individual.dis_description,
                // ข้อมูลโครงการ
                project_id: this.project.value,
                // ข้อมูลอาจารย์ที่ปรึกษา
                advisor_id: this.advisor.value,
              })
              .then((response) => {
                console.log("บันทึกการแก้ไข:", response.data);
                this.isEdit = false;
                console.log("isEdit:", this.isEdit);
                this.btnLabel = "เพิ่มข้อมูล";
                this.getUpdate(this.individual.member_id);
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
    editUser(individual_id) {
      console.log("Edit individual_id:", individual_id);
      this.btnLabel = "แก้ไขข้อมูล";
      this.isEdit = true;
      var self = this;
      axios
        .post(this.url_api_individual, {
          action: "edit",
          individual_id: individual_id,
        })
        .then(function (response) {
          console.log("Edit data:", response.data);
          self.individual.individual_id = response.data.individual_id;
          // ข้อมูลส่วนตัว
          self.individual.member_id = response.data.member_id;
          self.individual.birthday = response.data.birthday;
          // self.individual.card_id = response.data.card_id;
          self.individual.telephone = response.data.telephone;
          // ข้อมูลการศึกษา
          self.institute.value = response.data.institute_id;
          self.institute.label = response.data.institute_name;
          self.faculty.value = response.data.faculty_id;
          self.faculty.label = response.data.faculty_name;
          self.degree.value = response.data.degree_id;
          self.degree.label = response.data.degree_name;
          self.department.value = response.data.department_id;
          self.department.label = response.data.department_name;

          self.individual.is_graduate = String(response.data.is_graduate);
          self.individual.date = response.data.date;
          self.individual.year = response.data.year;
          // ข้อมูลความพิการ
          self.individual.is_disability = String(response.data.is_disability);
          self.disability.value = response.data.disability_id;
          self.disability.label = response.data.disability_name;
          self.individual.dis_description = response.data.dis_description;
          // ข้อมูลโครงการ
          self.project.value = response.data.project_id;
          self.project.label = response.data.project_name;
          // ข้อมูลอาจารย์ที่ปรึกษา
          self.advisor.value = response.data.advisor_id;
          self.advisor.label = response.data.advisor_name;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(individual_id, full_name) {
      this.$q
        .dialog({
          title: "ยืนยัน",
          message:
            "คุณต้องการลบ [ " +
            individual_id +
            "-" +
            full_name +
            " ] หรือไม่ ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          var self = this;
          axios
            .post(this.url_api_individual, {
              action: "delete",
              individual_id: individual_id,
            })
            .then(function (response) {
              console.log("delete:", response.data);
              self.getUpdate(self.individual.member_id);
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
        .post(this.url_api_individual, {
          action: "getall",
          member_id: member_id,
        })
        .then(function (res) {
          console.log("q-table:", res);
          self.individuals1 = res.data;
          console.log("individuals1:", self.individuals1);
        })
        .finally(() => {
          self.loading = false;
        });
    },
    onNext() {
      this.$router.replace({ name: "FormPlanCareer" });
    },
    onPrevious() {},
    getInstitutes() {
      console.log(" แสดงข้อมูลสถาบัน ");
      var self = this;
      axios
        .post(this.url_api_institute, {
          action: "getInstitutes",
        })
        .then(function (res) {
          console.log("ข้อมูลสถาบัน:", res.data);
          var institute_id = res.data.map((item) => item.institute_id);
          var institute_name = res.data.map((item) => item.institute_name);
          self.institutes.options.splice(0);
          for (var i = 0; i < institute_id.length; i++) {
            self.institutes.options.push({
              label: institute_name[i],
              value: institute_id[i],
            });
          }
          self.institutes_.options = self.institutes.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getFacultys() {
      console.log(" แสดงข้อมูลคณะ: ", this.institute.value);
      var self = this;
      axios
        .post(this.url_api_institute, {
          action: "getFacultys",
          institute_id: this.institute.value,
        })
        .then(function (res) {
          console.log("ข้อมูลคณะ:", res.data);
          var faculty_id = res.data.map((item) => item.faculty_id);
          var faculty_name = res.data.map((item) => item.faculty_name);
          self.facultys.options.splice(0);
          for (var i = 0; i < faculty_id.length; i++) {
            self.facultys.options.push({
              label: faculty_name[i],
              value: faculty_id[i],
            });
          }
          self.facultys_.options = self.facultys.options;
          console.log("ข้อมูล ชื่อคณะ:", self.facultys.options[0].label);
          console.log("ข้อมูล รหัสคณะ:", self.facultys.options[0].value);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDegrees() {
      console.log(" แสดงข้อมูลระดับการศึกษา ");
      var self = this;
      axios
        .post(this.url_api_institute, {
          action: "getDegrees",
          institute_id: this.institute.value,
          faculty_id: this.faculty.value,
        })
        .then(function (res) {
          console.log("ข้อมูลระดับการศึกษา:", res.data);
          var degree_id = res.data.map((item) => item.degree_id);
          var degree_name = res.data.map((item) => item.degree_name);
          self.degrees.options.splice(0);
          for (var i = 0; i < degree_id.length; i++) {
            self.degrees.options.push({
              label: degree_name[i],
              value: degree_id[i],
            });
          }
          self.degrees_.options = self.degrees.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDepartments() {
      console.log(" แสดงข้อมูลสาขาวิชา ");
      var self = this;
      axios
        .post(this.url_api_institute, {
          action: "getDepartments",
          degree_id: this.degree.value,
          institute_id: this.institute.value,
          faculty_id: this.faculty.value,
        })
        .then(function (res) {
          console.log("ข้อมูลสาขาวิชา:", res.data);
          var department_id = res.data.map((item) => item.department_id);
          var department_name = res.data.map((item) => item.department_name);
          self.departments.options.splice(0);
          for (var i = 0; i < department_id.length; i++) {
            self.departments.options.push({
              label: department_name[i],
              value: department_id[i],
            });
          }
          self.departments_.options = self.departments.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDisabilitys() {
      console.log(" แสดงข้อมูลสาขาวิชา ");
      var self = this;
      axios
        .post(this.url_api_disability, {
          action: "getDisabilitys",
        })
        .then(function (res) {
          console.log("ข้อมูลชนิดความพิการ:", res.data);
          var disability_id = res.data.map((item) => item.disability_id);
          var disability_name = res.data.map((item) => item.disability_name);
          self.disabilitys.options.splice(0);
          for (var i = 0; i < disability_id.length; i++) {
            self.disabilitys.options.push({
              label: disability_name[i],
              value: disability_id[i],
            });
          }
          self.disabilitys_.options = self.disabilitys.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getProjects() {
      console.log(" แสดงข้อมูลโครงการ ");
      var self = this;
      axios
        .post(this.url_api_project, {
          action: "getProjects",
        })
        .then(function (res) {
          console.log("ข้อมูลโครงการ:", res.data);
          var project_id = res.data.map((item) => item.project_id);
          var project_name = res.data.map((item) => item.project_name);
          self.projects.options.splice(0);
          for (var i = 0; i < project_id.length; i++) {
            self.projects.options.push({
              label: project_name[i],
              value: project_id[i],
            });
          }
          self.projects_.options = self.projects.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAdvisors_() {
      console.log(" แสดงข้อมูลอาจารย์ที่ปรึกษา ");
      var self = this;
      axios
        .post(this.url_api_advisor, {
          action: "getAdvisors",
        })
        .then(function (res) {
          console.log("ข้อมูลอาจารย์ที่ปรึกษา:", res.data);
          var advisor_id = res.data.map((item) => item.advisor_id);
          var advisor_name = res.data.map((item) => item.advisor_name);
          self.advisors.options.splice(0);
          for (var i = 0; i < advisor_id.length; i++) {
            self.advisors.options.push({
              label: advisor_name[i],
              value: advisor_id[i],
            });
          }
          self.advisors_.options = self.advisors.options;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getAdvisors() {
      console.log(" แสดงข้อมูลอาจารย์ที่ปรึกษา ");
      var self = this;
      axios
        .post(this.url_api_advisor, {
          action: "getAdvisors",
        })
        .then(function (res) {
          console.log("ข้อมูลอาจารย์ที่ปรึกษา:", res.data);
          var advisor_id = res.data.map((item) => item.member_id);
          var advisor_name = res.data.map((item) => item.full_name);
          self.advisors.options.splice(0);
          for (var i = 0; i < advisor_id.length; i++) {
            self.advisors.options.push({
              label: advisor_name[i],
              value: advisor_id[i],
            });
          }
          self.advisors_.options = self.advisors.options;
          console.log("ข้อมูลอาจารย์ที่ปรึกษา1:", self.advisors_.options);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onBirthday(val) {
      console.log("Thai Date:", val);
    },
    onInstituteValueChange(val) {
      console.log("เลือกสถาบัน:", val.label);
      console.log("รหัสสถาบัน:", val.value);
      this.getFacultys();
    },
    onFacultyValueChange(val) {
      console.log("เลือกคณะ:", val.label);
      console.log("รหัสคณะ:", val.value);
      this.getDegrees();
    },
    onDegreeValueChange(val) {
      console.log("เลือกระดับการศึกษา:", val.label);
      console.log("รหัสระดับการศึกษา:", val.value);
      this.getDepartments();
    },
    onDepartmentValueChange(val) {
      console.log("เลือกสาขาวิชา:", val.label);
      console.log("รหัสสาขาวิชา:", val.value);
    },
    onProjectValueChange(val) {
      console.log("เลือกโครงการ:", val.label);
      console.log("รหัสโครงการ:", val.value);
    },
    onDisabilityValueChange(val) {
      console.log("เลือกความพิการ:", val.label);
      console.log("รหัสความพิการ:", val.value);
    },
    filterInstitute(val, update) {
      if (val === "") {
        update(() => {
          this.institutes.options = this.institutes_.options;
          console.log("institutes_.options:", this.institutes_.options);
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.institutes.options = this.institutes_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
        console.log("institutes_.options:", this.institutes_.options);
      });
    },
    filterFaculty(val, update) {
      if (val === "") {
        update(() => {
          this.facultys.options = this.facultys_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.facultys.options = this.facultys_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterDegree(val, update) {
      if (val === "") {
        update(() => {
          this.degrees.options = this.degrees_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.degrees.options = this.degrees_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterDepartment(val, update) {
      if (val === "") {
        update(() => {
          this.departments.options = this.departments_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.departments.options = this.departments_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterDisability(val, update) {
      if (val === "") {
        update(() => {
          this.disabilitys.options = this.disabilitys_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.disabilitys.options = this.disabilitys_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterProject(val, update) {
      if (val === "") {
        update(() => {
          this.projects.options = this.projects_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.projects.options = this.projects_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
    filterAdvisor(val, update) {
      if (val === "") {
        update(() => {
          this.advisors.options = this.advisors_.options;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        console.log("needle:", needle);
        this.advisors.options = this.advisors_.options.filter(
          (v) => v.label.indexOf(needle) > -1
        );
      });
    },
  },
  mounted() {
    this.getUpdate(this.individual.member_id);
    this.getInstitutes();
    this.getFacultys();
    this.getDegrees();
    this.getDepartments();
    this.getDisabilitys();
    this.getProjects();
    this.getAdvisors();
  },
  creted() {
    var www = this.$store.getters.myWWW;
    if (!www) {
      // ------------------------------------------------------------------------------
      this.url_api_individual =
        "http://localhost:85/icp2022/icp_v1_suser/individual_form/api-individual.php";
      this.url_api_institute =
        "http://localhost:85/icp2022/icp_v1_suser/individual_form/api-institute.php";
      this.url_api_disability =
        "http://localhost:85/icp2022/icp_v1_suser/individual_form/api-disability.php";
      this.url_api_project =
        "http://localhost:85/icp2022/icp_v1_suser/individual_form/api-project.php";
      this.url_api_advisor =
        "http://localhost:85/icp2022/icp_v1_suser/individual_form/api-advisor.php";
      this.url_api_member =
        "http://localhost:85/icp2022/icp_v1_suser/individual_form/api-member.php";
      // ------------------------------------------------------------------------------
    } else {
      this.url_api_individual =
        "https://icp2022.net/icp_v1/individual_form/api-individual.php";
      this.url_api_institute =
        "https://icp2022.net/icp_v1/individual_form/api-institute.php";
      this.url_api_disability =
        "https://icp2022.net/icp_v1/individual_form/api-disability.php";
      this.url_api_project =
        "https://icp2022.net/icp_v1/individual_form/api-project.php";
      this.url_api_advisor =
        "https://icp2022.net/icp_v1/individual_form/api-advisor.php";
      this.url_api_member =
        "https://icp2022.net/icp_v1/individual_form/api-member.php";
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
