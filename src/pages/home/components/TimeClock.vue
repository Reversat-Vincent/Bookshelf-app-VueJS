<script>
export default {
  name: 'TimeClock',
  data() {
    return {
      japan: false,
      now: this.getDateNow(),
      label: {
        month: {
          0: 'January',
          1: 'February',
          2: 'March',
          3: 'April',
          4: 'May',
          5: 'June',
          6: 'July',
          7: 'August',
          8: 'September',
          9: 'October',
          10: 'November',
          11: 'December',
        },
        day: {
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday',
          0: 'Sunday',
        },
      },
    }
  },
  mounted() {
    this.startCountdown()
  },
  methods: {
    startCountdown() {
      setInterval(() => {
        this.now = this.getDateNow()
      }, 1000)
    },
    getDateNow() {
      return new Date(
        new Date().toLocaleString('en-US', {
          hour12: false,
          timeZone: this.japan ? 'Asia/Tokyo' : 'Europe/Paris',
        }),
      )
    },
  },
  computed: {
    year() {
      return this.now.getFullYear()
    },
    month() {
      return this.label.month[this.now.getMonth()]
    },
    day() {
      return this.label.day[this.now.getDay()]
    },
    date() {
      return this.now.getDate() < 10 ? '0' + this.now.getDate() : this.now.getDate()
    },
    hour() {
      return this.now.getHours() < 10 ? '0' + this.now.getHours() : this.now.getHours()
    },
    minute() {
      return this.now.getMinutes() < 10 ? '0' + this.now.getMinutes() : this.now.getMinutes()
    },
    second() {
      return this.now.getSeconds() < 10 ? '0' + this.now.getSeconds() : this.now.getSeconds()
    },
  },
}
</script>

<template>
  <div id="clock">
    <div>{{ day }} {{ date }} {{ month }} {{ year }}</div>
    <div>{{ hour }}:{{ minute }}:{{ second }}</div>
    <section>
      <span>France</span>
      <label class="switch">
        <input type="checkbox" v-model="japan" />
        <span class="slider"></span>
      </label>
      <span>日本</span>
    </section>
  </div>
</template>

<style scoped>
#clock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #daf6ff;
  text-shadow:
    0 0 20px var(--q-primary),
    0 0 20px var(--q-primary);
  width: 100%;
}
#clock > div:first-of-type {
  letter-spacing: 0.1em;
  font-size: 1rem;
}
#clock > div:last-of-type {
  letter-spacing: 0.05em;
  font-size: 3rem;
  padding-top: 5px;
}
#clock > section {
  display: flex;
  align-items: center;
}
#clock > section > span:first-of-type {
  margin-right: 1rem;
}
#clock > section > span:last-of-type {
  margin-left: 1rem;
}
#clock .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 24px;
}
#clock .switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
#clock .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--q-primary);
  background: radial-gradient(ellipse at center, var(--q-primary) 0%, var(--q-black-1) 70%);
  box-shadow:
    0 0 3px rgba(10, 175, 230, 1),
    0 0 3px rgba(10, 175, 230, 0);
  border-radius: var(--br);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
#clock .slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background: #daf6ff;
  background: radial-gradient(ellipse at center, #daf6ff 0%, #daf6ff 40%, var(--q-primary) 100%);
  border-radius: var(--br-c);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
#clock .switch input:checked + .slider {
  background: var(--q-primary);
  background: radial-gradient(ellipse at center, var(--q-primary) 0%, var(--q-black-1) 70%);
}
#clock .switch input:checked + .slider:before {
  -webkit-transform: translateX(36px);
  -ms-transform: translateX(36px);
  transform: translateX(36px);
}
</style>
