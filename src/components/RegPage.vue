<template>
    <div class="container">
        <div class="row" style="height: 100vh">
            <div class="col-sm-8 m-auto ">
                <form @change="formUpdated" @submit.prevent="registration" novalidate>
                    <transition name="slide-fade">
                        <div v-show="step === 1" class="step">
                            <div class="d-flex typewriter mb-3">
                                <p class="">Привет! Давай знакомиться:</p>
                            </div>
                            <div class="d-flex justify-content-between mb-5">
                                <div class="d-flex flex-column me-4">
                                    <div class="mb-3 col-ms-2">
                                        <label for="last_name" class="form-label">Фамилия</label>
                                        <input v-model="userData.last_name" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !isCorrect.last_name }" id="last_name">
                                        <div v-if="!isCorrect.last_name" id="last_name" class="form-text text-danger">
                                            Пожалуйста, введите вашу фамилию (Кириллица)
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="first_name" class="form-label">Имя</label>
                                        <input v-model="userData.first_name" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !isCorrect.first_name }" id="first_name">
                                        <div v-if="!isCorrect.first_name" id="first_name" class="form-text text-danger">
                                            Пожалуйста, введите ваше имя (Кириллица)
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="middle_name" class="form-label">Отчество</label>
                                        <input v-model="userData.middle_name" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !isCorrect.middle_name }" id="middle_name">
                                        <div v-if="!isCorrect.middle_name" id="middle_name" class="form-text text-danger">
                                            Пожалуйста, введите ваше отчество (Кириллица)
                                        </div>
                                    </div>
                                </div>
                                <div class="me-4">
                                    <p>Дата рождения:</p>
                                    <p v-bind:class="{ 'text-w text-danger': !isCorrect.birth_date }"
                                        v-if="!isCorrect.birth_date">Вам должно быть не меньше 14 <br> и не больше 100
                                        лет
                                    </p>


                                    <VueDatePicker v-model="userData.birth_date" locale="ru" inline auto-apply
                                        :enable-time-picker="false" :max-date="new Date()" model-type="yyyy-MM-dd">

                                    </VueDatePicker>
                                </div>
                                <div class="d-flex flex-column">
                                    <div class="mb-3">
                                        <label for="phone_number" class="form-label">Телефон</label>
                                        <input v-model="userData.phone_number" maxlength="12" type="text"
                                            class="form-control" v-bind:class="{ 'border-danger': !isCorrect.phone_number }"
                                            id="phone_number" placeholder="+7XXXXXXXXXX">
                                        <div v-if="!isCorrect.phone_number" id="phone_number" class="form-text text-danger">
                                            Пожалуйста, введите ваш телефон в формате +7XXXXXXXXXX
                                        </div>
                                    </div>

                                    <div class="">
                                        <p>Пол</p>
                                        <div class="form-check">
                                            <input v-model="userData.sex" class="form-check-input" type="radio" name="sex"
                                                id="M" value="M" checked>
                                            <label class="form-check-label" for="M">
                                                Мужской
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input v-model="userData.sex" class="form-check-input" type="radio" name="sex"
                                                id="F" value="F">
                                            <label class="form-check-label" for="F">
                                                Женский
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="d-flex justify-content-center">
                                <router-link class="btn" to="/login">
                                    Уже есть аккаунт?
                                </router-link>
                                <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
                            </div>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 2" class="step col-sm-8 mx-auto">
                            <div class="d-flex typewriter mb-3">
                                <p class="">Где ты учишься?</p>
                            </div>
                            <div>
                                <select @change="getFacults()" class="form-select mb-3" v-model="userData.current_univers"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.current_univers }">
                                    <option value="-1" selected>Выберете ВУЗ</option>
                                    <option v-for="uviver in univers" :value="uviver.id" :key="uviver.id">
                                        {{ uviver.institution_name }}
                                    </option>
                                </select>

                                <select @change="getSpecialty()" class="form-select mb-3" v-model="userData.current_facult"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.current_facult }">
                                    <option value="-1" selected>Выберете Факультет</option>
                                    <option v-for="facult in facults" :value="facult.id" :key="facult.id">
                                        {{ facult.faculty_name }}
                                    </option>
                                </select>

                                <select class="form-select mb-3" v-model="userData.current_specialty"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.current_specialty }">
                                    <option value="-1" selected>Выберете Специальность</option>
                                    <option v-for="specialty in specialties" :value="specialty.id" :key="specialty.id">
                                        {{ specialty.specialty_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button @click="backStep" type="button" class="me-2 btn btn-light">Назад</button>
                                <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
                            </div>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 3" class="step col-sm-8 mx-auto">
                            <div class="d-flex typewriter mb-3">
                                <p class="">Осталось еще немого...</p>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="userData.email" type="email" class="form-control" id="email"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.email }">
                                <div v-if="!isCorrect.email" id="email" class="form-text text-danger">
                                    Пожалуйста, введите корректный email. Например test@mail.ru
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input v-model="userData.password" type="password" class="form-control" id="password"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.password }">
                                <div v-if="!isCorrect.password" id="password" class="form-text text-danger">
                                    Убедитесь, что вы правильно повторили пароль
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="passwordConfirm" class="form-label">Повторите пароль</label>
                                <input v-model="passwordConfirm" type="password" class="form-control" id="passwordConfirm"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.password }">
                            </div>

                            <div class="form-check mb-3">
                                <input v-model="this.confirm_personal_data"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.confirm_personal_data }"
                                    class="form-check-input" type="checkbox" id="confirm_person_data">
                                <label class="form-check-label" for="confirm_person_data">
                                    Согласен на обработку своих персональных данных в соответствии
                                    с Федеральным законом Российской Федерации от 27 июля 2006 года
                                    № 152-ФЗ "О персональных данных", а также информирование с названными
                                    целями для участия в цифровых студенческих мероприятиях с использованием
                                    платформы "Новый шаг".
                                </label>
                            </div>

                            <div class="d-flex justify-content-center">
                                <button @click="backStep" type="button" class="me-2 btn btn-light">Назад</button>
                                <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                            </div>
                        </div>
                    </transition>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { userService } from '../services/user.service'
import { validateService } from '../services/validate.service'

export default {
    name: 'RegPage',
    data() {
        return {
            step: 1,
            userData: {
                last_name: '',
                first_name: '',
                middle_name: '',
                phone_number: '',
                birth_date: '2000-01-01',
                sex: 'M',
                current_univers: '-1',
                current_facult: '-1',
                current_specialty: '-1',
                email: '',
                password: ''
            },
            confirm_personal_data: false,
            isCorrect: {
                last_name: true,
                first_name: true,
                middle_name: true,
                phone_number: true,
                birth_date: true,
                current_univers: true,
                current_facult: true,
                current_specialty: true,
                email: true,
                password: true,
                confirm_personal_data: true
            },

            univers: {},
            facults: {},
            specialties: {},
            passwordConfirm: '',
            regStatus: '',
            unlock: true
        }
    },
    components: { VueDatePicker },
    created() {
        this.$store.dispatch('auth/logout');
        this.$store.commit('routes/toRegPage')
        userService.getUnivers().then(response => {
            this.univers = response;
        })
        userService.getSkills().then(response => {

            console.log(response)
        })
    },
    methods: {
        nextStep() {
            if (this.step === 1 && !this.checkFirstStep()) {
                return false;
            }
            if (this.step === 2 && !this.checkSecondStep()) {
                return false
            }
            this.step++
        },
        backStep() {
            this.step--
        },
        registration() {

            const user = this.userData;

            if (!this.checkThirdStep()) {
                return false;
            }

            this.$store.dispatch('auth/register', user).then(response => {
                if (response.status) {
                    //alert(response.message)
                    const { email, password } = user;
                    this.$store.dispatch("auth/login", { email, password }).then(
                        () => {
                            this.$router.push("/set-user-skills");
                        })
                    //this.$router.push("/login");
                } else {
                    //this.$router.push("/set-user-skills");
                    console.log(response)
                    alert(response.message)
                }
            })
        },

        checkFirstStep() {

            this.isCorrect.last_name = validateService.checkNamesInput(this.userData.last_name)
            this.isCorrect.first_name = validateService.checkNamesInput(this.userData.first_name)
            this.isCorrect.middle_name = validateService.checkNamesInput(this.userData.middle_name)
            this.isCorrect.phone_number = validateService.checkPhoneNumber(this.userData.phone_number)
            this.isCorrect.birth_date = validateService.checkAgeBetween(this.userData.birth_date, 14, 100)

            return (this.isCorrect.last_name &&
                this.isCorrect.first_name &&
                this.isCorrect.middle_name &&
                this.isCorrect.birth_date &&
                this.isCorrect.phone_number) || this.unlock
        },

        checkSecondStep() {
            this.isCorrect.current_univers = this.userData.current_univers != -1
            this.isCorrect.current_facult = this.userData.current_facult != -1
            this.isCorrect.current_specialty = this.userData.current_specialty != -1

            return (this.isCorrect.current_univers &&
                this.isCorrect.current_facult &&
                this.isCorrect.current_specialty) || this.unlock
        },

        checkThirdStep() {
            this.isCorrect.email = validateService.checkIsEmail(this.userData.email)
            this.isCorrect.password = this.userData.password === this.passwordConfirm
                && !validateService.checkIsEmptyStr(this.userData.password)
            this.isCorrect.confirm_personal_data = this.confirm_personal_data

            return this.isCorrect.email && this.isCorrect.password && this.isCorrect.confirm_personal_data
        },

        getFacults: function () {
            if (this.userData.current_univers != -1) {
                userService.getFacults(this.userData.current_univers).then(response => {
                    this.facults = response;
                })
            } else {
                this.facults = {};
            }
            this.userData.current_facult = -1

        },
        getSpecialty: function () {
            if (this.userData.current_facult != -1) {
                userService.getSpecialty(this.userData.current_univers, this.userData.current_facult).then(response => {
                    this.specialties = response;
                })
            } else {
                this.specialties = {};
            }
            this.userData.current_specialty = -1
        },

        formUpdated() {
            if (this.step === 1) {
                this.checkFirstStep()
            }
            if (this.step === 2) {
                this.checkSecondStep()
            }
            if (this.step === 3) {
                this.checkThirdStep()
            }
        }
    }
}

</script>

<style scoped></style>