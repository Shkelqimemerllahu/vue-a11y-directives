<template>
  <div class="directive-page">
    <h1 class="page-title">v-a11y-date-picker</h1>
    <p class="page-subtitle">
      Enhance date picker components with automatic keyboard navigation and focus management for improved accessibility.
    </p>

    <div class="section">
      <h2 class="section-title">Overview</h2>
      <p>
        The <code>v-a11y-date-picker</code> directive makes date picker dropdowns fully keyboard accessible.
        It automatically focuses the calendar when opened and enables proper arrow key navigation without auto-selecting dates.
        Users can navigate with arrow keys and select dates with Enter or Space, following standard accessibility patterns.
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">Basic Usage</h2>
      
      <CodeExample 
        title="Date Picker with Accessibility"
        :code="examples.basic"
      >
        <template #demo>
          <div class="demo-container">
            <label for="demo-date" class="demo-label">Select a date:</label>
            <div v-a11y-date-picker style="position: relative">
              <div class="demo-date-picker">
                <input 
                  id="demo-date"
                  type="text" 
                  readonly 
                  :value="selectedDate"
                  @click="showCalendar = !showCalendar"
                  placeholder="Click to select date"
                  class="demo-input"
                />
                <div v-if="showCalendar" class="demo-calendar">
                  <div class="calendar-header">
                    <button @click="prevMonth" class="calendar-nav">‹</button>
                    <span class="calendar-title">{{ currentMonth }} {{ currentYear }}</span>
                    <button @click="nextMonth" class="calendar-nav">›</button>
                  </div>
                  <div class="calendar-grid">
                    <div class="calendar-weekdays">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>
                    <div class="calendar-days">
                      <button 
                        v-for="day in calendarDays" 
                        :key="day.date"
                        :class="['calendar-day', { 
                          'other-month': !day.currentMonth,
                          'selected': day.date === selectedDate
                        }]"
                        @click="selectDate(day.date)"
                        :tabindex="day.currentMonth ? 0 : -1"
                      >
                        {{ day.day }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CodeExample>
    </div>

    <div class="section">
      <h2 class="section-title">Features</h2>
      <ul class="feature-list">
        <li>
          <strong>Auto-focus Calendar:</strong> Automatically focuses the calendar when the dropdown opens
        </li>
        <li>
          <strong>Arrow Key Navigation:</strong> Navigate between dates using arrow keys without auto-selecting
        </li>
        <li>
          <strong>Selection Control:</strong> Select dates only with Enter or Space keys
        </li>
        <li>
          <strong>Multi-instance Support:</strong> Works with multiple date pickers on the same page
        </li>
        <li>
          <strong>Framework Compatible:</strong> Works with Element Plus, Ant Design Vue, and other UI libraries
        </li>
      </ul>
    </div>

    <div class="section">
      <h2 class="section-title">Integration Examples</h2>
      
      <CodeExample 
        title="Element Plus Integration"
        :code="examples.elementPlus"
      />

      <CodeExample 
        title="Custom Date Picker"
        :code="examples.custom"
      />
    </div>

    <div class="section">
      <h2 class="section-title">Important Notes</h2>
      <div class="note-box">
        <p><strong>📝 Wrapper Element Required:</strong></p>
        <p>
          Apply the directive to a wrapper <code>div</code> around your date picker component, not directly on the component itself.
          This is due to Vue directive limitations with component elements.
        </p>
        <pre><code>&lt;!-- ✅ Correct --&gt;
&lt;div v-a11y-date-picker&gt;
  &lt;el-date-picker v-model="date" /&gt;
&lt;/div&gt;

&lt;!-- ❌ Wrong --&gt;
&lt;el-date-picker v-a11y-date-picker v-model="date" /&gt;</code></pre>
      </div>

      <div class="note-box">
        <p><strong>⚙️ Teleported Calendars:</strong></p>
        <p>
          For UI libraries that teleport dropdowns to <code>body</code>, disable teleportation for the directive to work:
        </p>
        <pre><code>&lt;div v-a11y-date-picker&gt;
  &lt;el-date-picker v-model="date" :teleported="false" /&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Keyboard Shortcuts</h2>
      <table class="shortcuts-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><kbd>↑</kbd></td>
            <td>Move focus up (previous week)</td>
          </tr>
          <tr>
            <td><kbd>↓</kbd></td>
            <td>Move focus down (next week)</td>
          </tr>
          <tr>
            <td><kbd>←</kbd></td>
            <td>Move focus left (previous day)</td>
          </tr>
          <tr>
            <td><kbd>→</kbd></td>
            <td>Move focus right (next day)</td>
          </tr>
          <tr>
            <td><kbd>Enter</kbd> or <kbd>Space</kbd></td>
            <td>Select the focused date</td>
          </tr>
          <tr>
            <td><kbd>Esc</kbd></td>
            <td>Close the calendar dropdown</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CodeExample from '../../components/CodeExample.vue';

const showCalendar = ref(false);
const selectedDate = ref('');
const currentDate = ref(new Date());

const currentMonth = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  
  const firstDayWeekday = firstDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDayDate = prevLastDay.getDate();
  
  const days = [];
  
  // Previous month days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    days.push({
      day: prevLastDayDate - i,
      date: `${year}-${String(month).padStart(2, '0')}-${String(prevLastDayDate - i).padStart(2, '0')}`,
      currentMonth: false
    });
  }
  
  // Current month days
  for (let i = 1; i <= lastDayDate; i++) {
    days.push({
      day: i,
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      currentMonth: true
    });
  }
  
  // Next month days
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      date: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      currentMonth: false
    });
  }
  
  return days;
});

const selectDate = (date) => {
  selectedDate.value = date;
  showCalendar.value = false;
};

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const examples = {
  basic: `<template>
  <div v-a11y-date-picker style="position: relative">
    <!-- Your date picker component -->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedDate = ref('');
<\/script>`,

  elementPlus: `<template>
  <div v-a11y-date-picker style="position: relative">
    <el-date-picker 
      v-model="date" 
      :teleported="false"
      placeholder="Select date"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const date = ref('');
<\/script>`,

  custom: `<template>
  <div v-a11y-date-picker style="position: relative">
    <div class="custom-date-picker">
      <input 
        type="text" 
        :value="formattedDate"
        @click="showCalendar = true"
        readonly
      />
      <div v-if="showCalendar" class="calendar-dropdown">
        <!-- Your custom calendar implementation -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const date = ref(new Date());
const showCalendar = ref(false);

const formattedDate = computed(() => {
  return date.value.toLocaleDateString();
});
<\/script>`
};
</script>

<style scoped>
.directive-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #606266;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
  border-bottom: 2px solid #409eff;
  padding-bottom: 0.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #e4e7ed;
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-list strong {
  color: #409eff;
}

.note-box {
  background: #f4f4f5;
  border-left: 4px solid #409eff;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.note-box p {
  margin: 0.5rem 0;
}

.note-box pre {
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin-top: 0.5rem;
}

.note-box code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}

.shortcuts-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.shortcuts-table th,
.shortcuts-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e4e7ed;
}

.shortcuts-table th {
  background: #f5f7fa;
  font-weight: 600;
  color: #2c3e50;
}

.shortcuts-table kbd {
  background: #f4f4f5;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 2px 8px;
  font-family: monospace;
  font-size: 0.9rem;
}

.demo-container {
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.demo-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.demo-date-picker {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 300px;
}

.demo-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: white;
}

.demo-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.demo-calendar {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  min-width: 280px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-nav {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  color: #409eff;
}

.calendar-nav:hover {
  background: #f5f7fa;
  border-radius: 4px;
}

.calendar-title {
  font-weight: 600;
  color: #2c3e50;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 0.5rem;
}

.calendar-weekdays span {
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #606266;
  padding: 0.25rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-day:hover {
  background: #f5f7fa;
}

.calendar-day:focus {
  outline: 2px solid #409eff;
  outline-offset: -2px;
}

.calendar-day.other-month {
  color: #c0c4cc;
}

.calendar-day.selected {
  background: #409eff;
  color: white;
}

.calendar-day.selected:hover {
  background: #66b1ff;
}
</style>
