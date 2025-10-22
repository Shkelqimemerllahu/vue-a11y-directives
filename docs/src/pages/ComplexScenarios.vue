<template>
  <div>
    <h1 class="page-title">Complex Scenarios</h1>
    <p class="page-subtitle">Advanced patterns with loops, nested structures, and conditional rendering</p>
    
    <div class="documentation-banner">
      <div class="banner-content">
        <div class="banner-icon">📋</div>
        <div class="banner-text">
          <h3>Want Copy-able Code?</h3>
          <p>View complete template, script, and CSS code for all scenarios with keyboard shortcuts and implementation notes.</p>
        </div>
        <router-link to="/scenarios-documentation" class="banner-button">
          View Documentation →
        </router-link>
      </div>
    </div>

    <!-- Scenario 1: Multi-Level Navigation Menu -->
    <section class="scenario">
      <h2>1. Multi-Level Navigation Menu</h2>
      <p>Nested navigation with keyboard support and dynamic states</p>
      
      <div 
        v-a11y-announce="menuAnnouncement"
        aria-live="polite"
        class="sr-only"
      ></div>
      
      <nav role="navigation" aria-label="Main navigation">
        <ul 
          role="menubar" 
          class="nav-menu"
          v-a11y-keyboard="navKeyboardHandlers"
          tabindex="0"
        >
          <li 
            v-for="(item, index) in menuItems" 
            :key="item.id"
            role="none"
          >
            <button
              role="menuitem"
              v-a11y-aria="{
                expanded: item.children ? expandedMenus.includes(item.id) : undefined,
                haspopup: item.children ? 'true' : undefined,
                disabled: item.disabled
              }"
              :class="{ active: activeMenuItem === index, disabled: item.disabled }"
              :disabled="item.disabled"
              @click="toggleMenu(item.id)"
              @focus="setActiveMenuItem(index)"
            >
              {{ item.label }}
              <span v-if="item.badge" class="badge">{{ item.badge }}</span>
            </button>
            
            <ul v-if="item.children && expandedMenus.includes(item.id)" role="menu" class="submenu">
              <li v-for="child in item.children" :key="child.id" role="none">
                <button
                  role="menuitem"
                  :aria-expanded="child.children ? expandedMenus.includes(child.id) : undefined"
                  :class="{ disabled: child.disabled }"
                  :disabled="child.disabled"
                  @click="toggleMenu(child.id)"
                >
                  {{ child.label }}
                </button>
                
                <ul v-if="child.children && expandedMenus.includes(child.id)" role="menu" class="submenu-level-2">
                  <li v-for="grandchild in child.children" :key="grandchild.id" role="none">
                    <button
                      role="menuitem"
                      :class="{ disabled: grandchild.disabled }"
                      :disabled="grandchild.disabled"
                      @click="selectMenuItem(grandchild)"
                    >
                      {{ grandchild.label }}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>

    <!-- Scenario 2: Data Table with Dynamic Content -->
    <section class="scenario">
      <h2>2. Data Table with Sorting, Filtering & Pagination</h2>
      
      <div 
        v-a11y-announce="tableAnnouncement"
        aria-live="polite"
        class="sr-only"
      ></div>
      
      <div class="table-controls">
        <input
          v-model="tableFilter"
          type="text"
          placeholder="Filter employees..."
          @input="filterEmployees"
          v-a11y-aria="{ label: 'Filter employees by name or department' }"
        />
        <button @click="toggleSelectAll">
          {{ allSelected ? 'Deselect All' : 'Select All' }}
        </button>
      </div>

      <table 
        role="grid" 
        v-a11y-aria="{ label: 'Employee data table with ' + filteredEmployees.length + ' employees' }"
        v-a11y-keyboard="tableKeyboardHandlers"
        tabindex="0"
        class="data-table"
      >
        <thead>
          <tr>
            <th><input type="checkbox" :checked="allSelected" @change="toggleSelectAll" /></th>
            <th v-for="column in columns" :key="column.key">
              <button 
                @click="sortTable(column.key)" 
                v-a11y-aria="{ sort: getSortDirection(column.key) }"
              >
                {{ column.label }}
                <span v-if="sortColumn === column.key">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(employee, index) in paginatedEmployees" 
            :key="employee.id"
            :class="{ 
              selected: selectedEmployees.includes(employee.id),
              highlighted: highlightedRow === index
            }"
          >
            <td>
              <input 
                type="checkbox" 
                :checked="selectedEmployees.includes(employee.id)"
                @change="toggleEmployeeSelection(employee.id)"
              />
            </td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.status }}</td>
            <td>{{ employee.salary }}</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="goToPage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
      </div>
    </section>

    <!-- Scenario 3: Multi-Step Form -->
    <section class="scenario">
      <h2>3. Multi-Step Form Wizard</h2>
      
      <div 
        v-a11y-announce="formAnnouncement"
        aria-live="polite"
        class="sr-only"
      ></div>
      
      <div 
        class="progress-bar" 
        role="progressbar"
        v-a11y-aria="{
          valuenow: progressPercentage,
          valuemin: 0,
          valuemax: 100,
          label: 'Form completion: ' + progressPercentage + '%'
        }"
      >
        <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <div class="steps" role="tablist">
        <button 
          v-for="(step, index) in formSteps" 
          :key="step.id"
          role="tab"
          :class="{ active: currentStep === index, completed: index < currentStep }"
          v-a11y-aria="{
            selected: currentStep === index,
            controls: 'step-panel-' + index
          }"
          @click="goToStep(index)"
        >
          {{ step.label }}
        </button>
      </div>

      <div class="form-content">
        <div v-if="currentStep === 0">
          <h3>Personal Information</h3>
          <input v-model="formData.firstName" placeholder="First Name" />
          <input v-model="formData.lastName" placeholder="Last Name" />
          <select v-model="formData.userType">
            <option value="">Select Type</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div v-if="currentStep === 1">
          <h3>Contact Information</h3>
          <input v-model="formData.email" type="email" placeholder="Email" />
          <input v-model="formData.phone" type="tel" placeholder="Phone" />
        </div>

        <div v-if="currentStep === 2">
          <h3>Review</h3>
          <p>Name: {{ formData.firstName }} {{ formData.lastName }}</p>
          <p>Email: {{ formData.email }}</p>
          <p>Phone: {{ formData.phone }}</p>
        </div>
      </div>

      <div class="form-actions">
        <button @click="previousStep" :disabled="currentStep === 0">Previous</button>
        <button v-if="currentStep < formSteps.length - 1" @click="nextStep">Next</button>
        <button v-else @click="submitForm">Submit</button>
      </div>
    </section>

    <!-- Scenario 4: Nested Accordion with Lazy Loading -->
    <section class="scenario">
      <h2>4. Nested Accordion System</h2>
      <p>Multi-level accordion with filtering and dynamic content</p>

      <input 
        v-model="accordionFilter" 
        type="text" 
        placeholder="Filter accordion items..." 
        class="filter-input"
      />

      <div class="accordion">
        <div v-for="section in filteredAccordionSections" :key="section.id" class="accordion-section">
          <button
            class="accordion-header"
            :aria-expanded="expandedSections.includes(section.id)"
            @click="toggleSection(section.id)"
          >
            <span>{{ section.title }}</span>
            <span class="badge">{{ section.items.length }}</span>
            <span class="icon">{{ expandedSections.includes(section.id) ? '−' : '+' }}</span>
          </button>

          <div v-if="expandedSections.includes(section.id)" class="accordion-content">
            <div v-for="item in section.items" :key="item.id" class="accordion-item">
              <button
                class="accordion-subheader"
                :aria-expanded="expandedItems.includes(item.id)"
                :disabled="item.disabled"
                @click="toggleItem(item.id)"
              >
                {{ item.title }}
                <span v-if="item.status" :class="'status-' + item.status">{{ item.status }}</span>
              </button>

              <div v-if="expandedItems.includes(item.id)" class="accordion-subcontent">
                <p>{{ item.description }}</p>
                <div v-if="item.hasSubtasks" class="subtasks">
                  <div v-for="subtask in item.subtasks" :key="subtask.id" class="subtask">
                    <input 
                      type="checkbox" 
                      :id="'subtask-' + subtask.id"
                      :checked="subtask.completed"
                      @change="toggleSubtask(item.id, subtask.id)"
                    />
                    <label :for="'subtask-' + subtask.id">{{ subtask.text }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scenario 5: Interactive Dashboard with Draggable Widgets -->
    <section class="scenario">
      <h2>5. Interactive Dashboard</h2>
      <p>Widget-based dashboard with real-time updates and task management</p>

      <div class="dashboard-controls">
        <button @click="toggleEditMode">{{ editMode ? 'Done' : 'Edit Layout' }}</button>
        <button @click="refreshDashboard">Refresh Data</button>
      </div>

      <div class="dashboard-grid">
        <div 
          v-for="widget in dashboardWidgets" 
          :key="widget.id"
          :class="['widget', 'widget-' + widget.size, { editing: editMode }]"
        >
          <div class="widget-header">
            <h3>{{ widget.title }}</h3>
            <button v-if="editMode" @click="removeWidget(widget.id)" class="btn-remove">×</button>
          </div>
          <div class="widget-content">
            <!-- Stats Widget -->
            <div v-if="widget.type === 'stats'" class="stats-grid">
              <div v-for="stat in widget.data" :key="stat.label" class="stat-card">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
                <div :class="'stat-change ' + stat.trend">{{ stat.change }}</div>
              </div>
            </div>

            <!-- Activity Feed Widget -->
            <div v-if="widget.type === 'activity'" class="activity-feed">
              <div v-for="activity in widget.data" :key="activity.id" class="activity-item">
                <span :class="'activity-icon ' + activity.type">{{ activity.icon }}</span>
                <div class="activity-details">
                  <strong>{{ activity.user }}</strong> {{ activity.action }}
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>

            <!-- Task List Widget -->
            <div v-if="widget.type === 'tasks'" class="task-list">
              <div v-for="task in widget.data" :key="task.id" class="task-item">
                <input 
                  type="checkbox" 
                  :id="'task-' + task.id"
                  :checked="task.completed"
                  @change="toggleTask(task.id)"
                />
                <label :for="'task-' + task.id" :class="{ completed: task.completed }">
                  {{ task.text }}
                  <span :class="'priority-' + task.priority">{{ task.priority }}</span>
                </label>
              </div>
              <input 
                v-model="newTask" 
                type="text" 
                placeholder="Add new task..." 
                @keyup.enter="addTask"
                class="task-input"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scenario 6: Hierarchical Tree View with Selection -->
    <section class="scenario">
      <h2>6. Hierarchical Tree View</h2>
      <p>File system tree with multi-select and context menus</p>

      <div class="tree-controls">
        <button @click="expandAllNodes">Expand All</button>
        <button @click="collapseAllNodes">Collapse All</button>
        <button @click="toggleSelectionMode">
          {{ selectionMode ? 'Exit Selection' : 'Multi-Select' }}
        </button>
      </div>

      <div role="tree" class="tree-view">
        <TreeNode
          v-for="node in treeData"
          :key="node.id"
          :node="node"
          :expandedNodes="expandedTreeNodes"
          :selectedNodes="selectedTreeNodes"
          :selectionMode="selectionMode"
          @toggle="toggleTreeNode"
          @select="selectTreeNode"
        />
      </div>

      <div v-if="selectedTreeNodes.length > 0" class="tree-selection-info">
        Selected: {{ selectedTreeNodes.length }} items
        <button @click="clearTreeSelection">Clear</button>
      </div>
    </section>

    <!-- Scenario 7: Virtual Scrolling List -->
    <section class="scenario">
      <h2>7. Virtual Scrolling List (1000+ Items)</h2>
      <p>High-performance rendering with keyboard navigation</p>

      <div class="virtual-controls">
        <input 
          v-model="virtualFilter" 
          type="text" 
          placeholder="Filter items..."
          @input="filterVirtualList"
        />
        <span>Showing {{ filteredVirtualItems.length }} items</span>
      </div>

      <div 
        class="virtual-list-container" 
        @scroll="handleVirtualScroll"
        tabindex="0"
        role="listbox"
        v-a11y-keyboard="virtualListKeyboardHandlers"
        :aria-label="'Virtual list with ' + filteredVirtualItems.length + ' items'"
      >
        <div :style="{ height: totalVirtualHeight + 'px' }" class="virtual-spacer">
          <div 
            :style="{ transform: 'translateY(' + offsetY + 'px)' }" 
            class="virtual-content"
          >
            <div
              v-for="(item, index) in visibleVirtualItems"
              :key="item.id"
              :class="['virtual-item', { 
                selected: selectedVirtualItems.includes(item.id),
                focused: focusedVirtualIndex === item.id
              }]"
              role="option"
              :aria-selected="selectedVirtualItems.includes(item.id)"
              @click="toggleVirtualItemSelection(item.id)"
            >
              <div class="item-avatar" :style="{ background: item.color }">
                {{ item.initials }}
              </div>
              <div class="item-content">
                <strong>{{ item.name }}</strong>
                <p>{{ item.description }}</p>
                <span class="item-meta">{{ item.category }} • {{ item.date }}</span>
              </div>
              <span v-if="item.count" class="item-badge">{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scenario 8: Calendar with Multiple Views -->
    <section class="scenario">
      <h2>8. Interactive Calendar</h2>
      <p>Month/Week/Day views with event management</p>

      <div class="calendar-header">
        <button @click="previousPeriod">‹</button>
        <h3>{{ currentPeriodLabel }}</h3>
        <button @click="nextPeriod">›</button>
        <div class="view-switcher">
          <button 
            v-for="view in calendarViews" 
            :key="view"
            :class="{ active: currentView === view }"
            @click="setCalendarView(view)"
          >
            {{ view }}
          </button>
        </div>
      </div>

      <div 
        v-if="currentView === 'month'" 
        class="calendar-month"
        tabindex="0"
        role="grid"
        v-a11y-keyboard="calendarKeyboardHandlers"
        aria-label="Calendar grid"
      >
        <div class="calendar-weekdays">
          <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
        </div>
        <div class="calendar-days">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="day.date"
            :class="['calendar-day', { 
              'other-month': !day.currentMonth,
              'today': day.isToday,
              'selected': selectedCalendarDay && selectedCalendarDay.date.toDateString() === day.date.toDateString(),
              'focused': focusedCalendarIndex === index,
              'has-events': day.events.length > 0
            }]"
            @click="selectDay(day)"
            role="gridcell"
          >
            <div class="day-number">{{ day.day }}</div>
            <div class="day-events">
              <div 
                v-for="event in day.events.slice(0, 3)" 
                :key="event.id"
                :class="'event event-' + event.type"
                :title="event.title"
              >
                {{ event.title }}
              </div>
              <div v-if="day.events.length > 3" class="more-events">
                +{{ day.events.length - 3 }} more
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentView === 'week'" class="calendar-week">
        <div class="week-timeline">
          <div v-for="hour in 24" :key="hour" class="time-slot">
            {{ hour }}:00
          </div>
        </div>
      </div>

      <div v-if="selectedCalendarDay" class="event-details">
        <h4>Events for {{ selectedCalendarDay.date }}</h4>
        <div v-for="event in selectedCalendarDay.events" :key="event.id" class="event-detail">
          <strong>{{ event.title }}</strong>
          <p>{{ event.time }} - {{ event.duration }}</p>
          <span :class="'event-type-' + event.type">{{ event.type }}</span>
        </div>
      </div>
    </section>

    <!-- Scenario 9: Real-time Chat Interface -->
    <section class="scenario">
      <h2>9. Real-time Chat with Threading</h2>
      <p>Message threads, reactions, and file attachments</p>

      <div 
        v-a11y-announce="chatAnnouncement"
        aria-live="polite"
        class="sr-only"
      ></div>

      <div class="chat-container">
        <div class="chat-sidebar">
          <input 
            v-model="chatSearch" 
            type="text" 
            placeholder="Search conversations..."
            class="chat-search"
            v-a11y-aria="{ label: 'Search conversations' }"
          />
          <div 
            class="chat-list"
            role="listbox"
            tabindex="0"
            v-a11y-keyboard="chatListKeyboardHandlers"
            v-a11y-aria="{ label: filteredChats.length + ' conversations' }"
          >
            <div 
              v-for="(chat, index) in filteredChats" 
              :key="chat.id"
              :class="['chat-item', { 
                active: activeChat?.id === chat.id, 
                unread: chat.unread,
                focused: focusedChatIndex === index
              }]"
              role="option"
              v-a11y-aria="{ selected: activeChat?.id === chat.id }"
              @click="selectChat(chat)"
            >
              <div class="chat-avatar">{{ chat.initials }}</div>
              <div class="chat-info">
                <strong>{{ chat.name }}</strong>
                <p>{{ chat.lastMessage }}</p>
              </div>
              <div class="chat-meta">
                <span class="chat-time">{{ chat.time }}</span>
                <span v-if="chat.unread" class="unread-badge">{{ chat.unread }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeChat" class="chat-main">
          <div class="chat-header">
            <h3>{{ activeChat.name }}</h3>
            <span class="chat-status">{{ activeChat.status }}</span>
          </div>

          <div 
            class="chat-messages" 
            ref="messageContainer"
            role="log"
            v-a11y-aria="{ 
              label: 'Message history with ' + activeChat.name,
              live: 'polite'
            }"
            tabindex="0"
            v-a11y-keyboard="messageKeyboardHandlers"
          >
            <div 
              v-for="(message, index) in activeChat.messages" 
              :key="message.id"
              :class="['message', { 
                'message-own': message.sender === 'You',
                'focused': focusedMessageIndex === index
              }]"
              role="article"
              v-a11y-aria="{ label: message.sender + ' said: ' + message.text }"
            >
              <div class="message-avatar">{{ message.senderInitials }}</div>
              <div class="message-content">
                <div class="message-header">
                  <strong>{{ message.sender }}</strong>
                  <span class="message-time">{{ message.time }}</span>
                </div>
                <div class="message-text">{{ message.text }}</div>
                <div v-if="message.attachments" class="message-attachments">
                  <button
                    v-for="file in message.attachments" 
                    :key="file.name"
                    class="attachment"
                    @click="downloadAttachment(file)"
                    v-a11y-aria="{ label: 'Download attachment ' + file.name }"
                  >
                    📎 {{ file.name }}
                  </button>
                </div>
                <div 
                  class="message-reactions"
                  role="toolbar"
                  v-a11y-aria="{ label: 'Message reactions' }"
                >
                  <button 
                    v-for="reaction in message.reactions" 
                    :key="reaction.emoji"
                    class="reaction"
                    @click="toggleReaction(message.id, reaction.emoji)"
                    v-a11y-aria="{ 
                      label: reaction.emoji + ' reaction, ' + reaction.count + ' people',
                      pressed: reaction.count > 0
                    }"
                  >
                    {{ reaction.emoji }} {{ reaction.count }}
                  </button>
                  <button 
                    class="add-reaction"
                    @click="showReactionPicker(message.id)"
                    v-a11y-aria="{ label: 'Add reaction' }"
                  >
                    +
                  </button>
                </div>
                <div v-if="message.thread" class="message-thread">
                  <button 
                    @click="openThread(message)"
                    v-a11y-aria="{ label: 'View ' + message.thread.count + ' replies in thread' }"
                  >
                    💬 {{ message.thread.count }} replies
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input-area">
            <textarea 
              v-model="chatMessage" 
              placeholder="Type a message..."
              v-a11y-keyboard="chatInputKeyboardHandlers"
              v-a11y-aria="{ label: 'Type your message. Press Ctrl+Enter to send' }"
              rows="3"
              ref="chatInput"
            ></textarea>
            <div class="chat-actions">
              <button 
                @click="showEmojiPicker"
                v-a11y-aria="{ label: 'Add emoji' }"
              >
                😊 Emoji
              </button>
              <button 
                @click="attachFile"
                v-a11y-aria="{ label: 'Attach file' }"
              >
                📎 Attach
              </button>
              <button 
                @click="sendChatMessage" 
                :disabled="!chatMessage.trim()"
                v-a11y-aria="{ label: 'Send message' }"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scenario 10: Complex Dynamic Form -->
    <section class="scenario">
      <h2>10. Complex Dynamic Form Builder</h2>
      <p>Form with conditional fields, validation, and file uploads</p>

      <div class="form-builder">
        <div class="form-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: dynamicFormProgress + '%' }"></div>
          </div>
          <span>{{ dynamicFormProgress }}% Complete</span>
        </div>

        <div v-for="section in visibleFormSections" :key="section.id" class="form-section">
          <h3>{{ section.title }}</h3>
          <p v-if="section.description" class="section-description">{{ section.description }}</p>

          <div v-for="field in section.fields" :key="field.id" class="form-field">
            <label :for="field.id">
              {{ field.label }}
              <span v-if="field.required" class="required">*</span>
            </label>

            <!-- Text/Email/Tel inputs -->
            <input
              v-if="['text', 'email', 'tel', 'number'].includes(field.type)"
              :id="field.id"
              :type="field.type"
              :placeholder="field.placeholder"
              :required="field.required"
              :disabled="field.disabled"
              v-model="dynamicFormData[field.id]"
              @input="validateField(field)"
            />

            <!-- Textarea -->
            <textarea
              v-if="field.type === 'textarea'"
              :id="field.id"
              :placeholder="field.placeholder"
              :required="field.required"
              v-model="dynamicFormData[field.id]"
              rows="4"
            ></textarea>

            <!-- Select dropdown -->
            <select
              v-if="field.type === 'select'"
              :id="field.id"
              :required="field.required"
              v-model="dynamicFormData[field.id]"
              @change="handleFieldChange(field)"
            >
              <option value="">Select...</option>
              <option 
                v-for="option in field.options" 
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
              >
                {{ option.label }}
              </option>
            </select>

            <!-- Checkbox group -->
            <div v-if="field.type === 'checkbox-group'" class="checkbox-group">
              <div v-for="option in field.options" :key="option.value">
                <input
                  :id="field.id + '-' + option.value"
                  type="checkbox"
                  :value="option.value"
                  v-model="dynamicFormData[field.id]"
                />
                <label :for="field.id + '-' + option.value">{{ option.label }}</label>
              </div>
            </div>

            <!-- Radio group -->
            <div v-if="field.type === 'radio-group'" class="radio-group">
              <div v-for="option in field.options" :key="option.value">
                <input
                  :id="field.id + '-' + option.value"
                  type="radio"
                  :name="field.id"
                  :value="option.value"
                  v-model="dynamicFormData[field.id]"
                />
                <label :for="field.id + '-' + option.value">{{ option.label }}</label>
              </div>
            </div>

            <!-- File upload -->
            <div v-if="field.type === 'file'" class="file-upload">
              <input
                :id="field.id"
                type="file"
                :multiple="field.multiple"
                :accept="field.accept"
                @change="handleFileUpload(field, $event)"
              />
              <div v-if="uploadedFiles[field.id]" class="uploaded-files">
                <div v-for="(file, index) in uploadedFiles[field.id]" :key="index" class="file-item">
                  📄 {{ file.name }} ({{ formatFileSize(file.size) }})
                  <button @click="removeFile(field.id, index)">×</button>
                </div>
              </div>
            </div>

            <!-- Date picker -->
            <input
              v-if="field.type === 'date'"
              :id="field.id"
              type="date"
              :required="field.required"
              v-model="dynamicFormData[field.id]"
            />

            <!-- Error message -->
            <span v-if="formErrors[field.id]" class="field-error">
              {{ formErrors[field.id] }}
            </span>
          </div>
        </div>

        <div class="form-actions">
          <button @click="saveDraft" class="btn-secondary">Save Draft</button>
          <button @click="submitDynamicForm" :disabled="!isDynamicFormValid" class="btn-primary">
            Submit Form
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ComplexScenarios',
  
  data() {
    return {
      // Scenario 1: Navigation
      menuItems: [
        {
          id: 'home',
          label: 'Home',
          disabled: false
        },
        {
          id: 'products',
          label: 'Products',
          badge: 'New',
          children: [
            { id: 'electronics', label: 'Electronics', disabled: false },
            { id: 'clothing', label: 'Clothing', disabled: true }
          ]
        }
      ],
      expandedMenus: [],
      activeMenuItem: null,
      menuAnnouncement: '',

      // Scenario 2: Table
      employees: [],
      filteredEmployees: [],
      selectedEmployees: [],
      sortColumn: null,
      sortDirection: 'asc',
      tableFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      highlightedRow: 0,
      tableAnnouncement: '',
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'department', label: 'Department' },
        { key: 'status', label: 'Status' },
        { key: 'salary', label: 'Salary' }
      ],

      // Scenario 3: Form
      currentStep: 0,
      formSteps: [
        { id: 'personal', label: 'Personal' },
        { id: 'contact', label: 'Contact' },
        { id: 'review', label: 'Review' }
      ],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: ''
      },
      formAnnouncement: '',

      // Scenario 4: Accordion
      accordionFilter: '',
      expandedSections: [],
      expandedItems: [],
      accordionSections: [],

      // Scenario 5: Dashboard
      editMode: false,
      dashboardWidgets: [],
      newTask: '',

      // Scenario 6: Tree View
      treeData: [],
      expandedTreeNodes: [],
      selectedTreeNodes: [],
      selectionMode: false,

      // Scenario 7: Virtual Scrolling
      virtualFilter: '',
      allVirtualItems: [],
      filteredVirtualItems: [],
      visibleVirtualItems: [],
      selectedVirtualItems: [],
      focusedVirtualIndex: null,
      itemHeight: 80,
      containerHeight: 400,
      scrollTop: 0,

      // Scenario 8: Calendar
      currentView: 'month',
      currentDate: new Date(),
      selectedCalendarDay: null,
      focusedCalendarIndex: null,
      calendarViews: ['month', 'week', 'day'],
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      calendarEvents: [],

      // Scenario 9: Chat
      chats: [],
      filteredChats: [],
      activeChat: null,
      chatSearch: '',
      chatMessage: '',
      focusedChatIndex: null,
      focusedMessageIndex: null,
      chatAnnouncement: '',

      // Scenario 10: Dynamic Form
      dynamicFormData: {},
      formErrors: {},
      uploadedFiles: {},
      formSections: []
    }
  },

  computed: {
    // Navigation Menu computed
    navKeyboardHandlers() {
      return {
        arrowDown: () => {
          this.navigateMenu('down')
        },
        arrowUp: () => {
          this.navigateMenu('up')
        },
        arrowRight: () => {
          this.expandCurrentMenu()
        },
        arrowLeft: () => {
          this.collapseCurrentMenu()
        },
        enter: () => {
          this.activateMenuItem()
        },
        escape: () => {
          this.closeAllMenus()
        }
      }
    },

    // Table computed properties
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredEmployees.slice(start, end)
    },

    allSelected() {
      return this.filteredEmployees.length > 0 && 
             this.selectedEmployees.length === this.filteredEmployees.length
    },

    tableKeyboardHandlers() {
      return {
        arrowDown: () => {
          this.highlightedRow = Math.min(this.paginatedEmployees.length - 1, this.highlightedRow + 1)
          this.tableAnnouncement = `Row ${this.highlightedRow + 1} of ${this.paginatedEmployees.length}`
        },
        arrowUp: () => {
          this.highlightedRow = Math.max(0, this.highlightedRow - 1)
          this.tableAnnouncement = `Row ${this.highlightedRow + 1} of ${this.paginatedEmployees.length}`
        },
        enter: () => {
          if (this.paginatedEmployees[this.highlightedRow]) {
            this.selectEmployee(this.paginatedEmployees[this.highlightedRow].id)
          }
        },
        space: (e) => {
          e.preventDefault()
          if (this.paginatedEmployees[this.highlightedRow]) {
            this.toggleEmployeeSelection(this.paginatedEmployees[this.highlightedRow].id)
          }
        }
      }
    },

    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    },

    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    },

    // Form computed properties
    progressPercentage() {
      return ((this.currentStep + 1) / this.formSteps.length) * 100
    },

    // Accordion computed properties
    filteredAccordionSections() {
      if (!this.accordionFilter) return this.accordionSections
      return this.accordionSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.title.toLowerCase().includes(this.accordionFilter.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    },

    // Virtual Scrolling computed properties
    totalVirtualHeight() {
      return this.filteredVirtualItems.length * this.itemHeight
    },

    offsetY() {
      return Math.floor(this.scrollTop / this.itemHeight) * this.itemHeight
    },

    virtualListKeyboardHandlers() {
      return {
        arrowDown: () => {
          this.navigateVirtualList('down')
        },
        arrowUp: () => {
          this.navigateVirtualList('up')
        },
        enter: () => {
          if (this.focusedVirtualIndex !== null) {
            this.toggleVirtualItemSelection(this.focusedVirtualIndex)
          }
        },
        space: (e) => {
          e.preventDefault()
          if (this.focusedVirtualIndex !== null) {
            this.toggleVirtualItemSelection(this.focusedVirtualIndex)
          }
        }
      }
    },

    // Calendar computed properties
    currentPeriodLabel() {
      if (this.currentView === 'month') {
        return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      }
      return this.currentDate.toLocaleDateString()
    },

    calendarDays() {
      const days = []
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startDay = firstDay.getDay()
      
      // Previous month days
      const prevMonthLastDay = new Date(year, month, 0).getDate()
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          day: prevMonthLastDay - i,
          date: new Date(year, month - 1, prevMonthLastDay - i),
          currentMonth: false,
          isToday: false,
          selected: false,
          events: []
        })
      }
      
      // Current month days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i)
        const today = new Date()
        const isToday = date.toDateString() === today.toDateString()
        
        days.push({
          day: i,
          date: date,
          currentMonth: true,
          isToday: isToday,
          selected: false,
          events: this.calendarEvents.filter(e => {
            const eventDate = new Date(e.date)
            return eventDate.toDateString() === date.toDateString()
          })
        })
      }
      
      // Next month days
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          day: i,
          date: new Date(year, month + 1, i),
          currentMonth: false,
          isToday: false,
          selected: false,
          events: []
        })
      }
      
      return days
    },

    calendarKeyboardHandlers() {
      return {
        arrowRight: () => {
          this.navigateCalendar('right')
        },
        arrowLeft: () => {
          this.navigateCalendar('left')
        },
        arrowDown: () => {
          this.navigateCalendar('down')
        },
        arrowUp: () => {
          this.navigateCalendar('up')
        },
        enter: () => {
          if (this.focusedCalendarIndex !== null && this.calendarDays[this.focusedCalendarIndex]) {
            this.selectDay(this.calendarDays[this.focusedCalendarIndex])
          }
        },
        home: () => {
          this.focusedCalendarIndex = 0
        },
        end: () => {
          this.focusedCalendarIndex = this.calendarDays.length - 1
        }
      }
    },

    // Chat computed properties
    filteredChats() {
      if (!this.chatSearch) return this.chats
      return this.chats.filter(chat =>
        chat.name.toLowerCase().includes(this.chatSearch.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(this.chatSearch.toLowerCase())
      )
    },

    chatListKeyboardHandlers() {
      return {
        arrowDown: () => {
          this.navigateChatList('down')
        },
        arrowUp: () => {
          this.navigateChatList('up')
        },
        enter: () => {
          if (this.focusedChatIndex !== null && this.filteredChats[this.focusedChatIndex]) {
            this.selectChat(this.filteredChats[this.focusedChatIndex])
          }
        },
        home: () => {
          this.focusedChatIndex = 0
          this.chatAnnouncement = `First conversation: ${this.filteredChats[0]?.name}`
        },
        end: () => {
          this.focusedChatIndex = this.filteredChats.length - 1
          this.chatAnnouncement = `Last conversation: ${this.filteredChats[this.filteredChats.length - 1]?.name}`
        }
      }
    },

    messageKeyboardHandlers() {
      return {
        arrowDown: () => {
          this.navigateMessages('down')
        },
        arrowUp: () => {
          this.navigateMessages('up')
        },
        enter: () => {
          if (this.focusedMessageIndex !== null) {
            const message = this.activeChat.messages[this.focusedMessageIndex]
            if (message.thread) {
              this.openThread(message)
            }
          }
        }
      }
    },

    chatInputKeyboardHandlers() {
      return {
        'ctrl+enter': () => {
          this.sendChatMessage()
        },
        'shift+/': () => {
          this.showKeyboardShortcuts()
        }
      }
    },

    // Dynamic Form computed properties
    visibleFormSections() {
      return this.formSections.filter(section => {
        if (!section.condition) return true
        return section.condition(this.dynamicFormData)
      })
    },

    dynamicFormProgress() {
      const totalFields = this.visibleFormSections.reduce((sum, section) =>
        sum + section.fields.length, 0)
      const filledFields = this.visibleFormSections.reduce((sum, section) =>
        sum + section.fields.filter(f => this.dynamicFormData[f.id]).length, 0)
      return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
    },

    isDynamicFormValid() {
      return Object.keys(this.formErrors).length === 0 && this.dynamicFormProgress >= 50
    }
  },

  mounted() {
    this.generateEmployees()
    this.generateAccordionData()
    this.generateDashboardWidgets()
    this.generateTreeData()
    this.generateVirtualItems()
    this.generateCalendarEvents()
    this.generateChats()
    this.generateFormSections()
  },

  methods: {
    // Navigation methods
    toggleMenu(id) {
      const index = this.expandedMenus.indexOf(id)
      if (index > -1) {
        this.expandedMenus.splice(index, 1)
      } else {
        this.expandedMenus.push(id)
      }
    },

    setActiveMenuItem(index) {
      this.activeMenuItem = index
    },

    selectMenuItem(item) {
      this.menuAnnouncement = `Selected ${item.label}`
      console.log('Selected:', item.label)
    },

    navigateMenu(direction) {
      const flatItems = this.getFlatMenuItems()
      if (flatItems.length === 0) return

      if (this.activeMenuItem === null) {
        this.activeMenuItem = 0
        this.menuAnnouncement = `Focused on ${flatItems[0].label}`
        return
      }

      let newIndex = this.activeMenuItem
      if (direction === 'down' && newIndex < flatItems.length - 1) {
        newIndex++
      } else if (direction === 'up' && newIndex > 0) {
        newIndex--
      }

      if (newIndex !== this.activeMenuItem) {
        this.activeMenuItem = newIndex
        this.menuAnnouncement = `Focused on ${flatItems[newIndex].label}`
      }
    },

    expandCurrentMenu() {
      const flatItems = this.getFlatMenuItems()
      if (this.activeMenuItem !== null && flatItems[this.activeMenuItem]) {
        const item = flatItems[this.activeMenuItem]
        if (item.children && !this.expandedMenus.includes(item.id)) {
          this.expandedMenus.push(item.id)
          this.menuAnnouncement = `Expanded ${item.label}`
        }
      }
    },

    collapseCurrentMenu() {
      const flatItems = this.getFlatMenuItems()
      if (this.activeMenuItem !== null && flatItems[this.activeMenuItem]) {
        const item = flatItems[this.activeMenuItem]
        if (item.children && this.expandedMenus.includes(item.id)) {
          const index = this.expandedMenus.indexOf(item.id)
          this.expandedMenus.splice(index, 1)
          this.menuAnnouncement = `Collapsed ${item.label}`
        }
      }
    },

    activateMenuItem() {
      const flatItems = this.getFlatMenuItems()
      if (this.activeMenuItem !== null && flatItems[this.activeMenuItem]) {
        this.selectMenuItem(flatItems[this.activeMenuItem])
      }
    },

    closeAllMenus() {
      this.expandedMenus = []
      this.menuAnnouncement = 'All menus closed'
    },

    getFlatMenuItems() {
      const items = []
      const addItems = (menuItems) => {
        menuItems.forEach(item => {
          items.push(item)
          if (item.children && this.expandedMenus.includes(item.id)) {
            addItems(item.children)
          }
        })
      }
      addItems(this.menuItems)
      return items
    },

    // Table methods
    generateEmployees() {
      this.employees = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        department: ['IT', 'HR', 'Sales', 'Marketing'][i % 4],
        status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'On Leave' : 'Active',
        salary: `$${50000 + (i * 1000)}`
      }))
      this.filteredEmployees = [...this.employees]
    },

    filterEmployees() {
      const query = this.tableFilter.toLowerCase()
      this.filteredEmployees = this.employees.filter(emp =>
        emp.name.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
      )
      this.currentPage = 1
    },

    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortDirection = 'asc'
      }

      this.filteredEmployees.sort((a, b) => {
        const aVal = a[column]
        const bVal = b[column]
        const modifier = this.sortDirection === 'asc' ? 1 : -1
        return aVal > bVal ? modifier : -modifier
      })
    },

    getSortDirection(column) {
      if (this.sortColumn !== column) return 'none'
      return this.sortDirection === 'asc' ? 'ascending' : 'descending'
    },

    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedEmployees = []
        this.tableAnnouncement = 'All employees deselected'
      } else {
        this.selectedEmployees = this.filteredEmployees.map(e => e.id)
        this.tableAnnouncement = `All ${this.filteredEmployees.length} employees selected`
      }
    },

    selectEmployee(id) {
      const employee = this.filteredEmployees.find(e => e.id === id)
      if (employee) {
        this.tableAnnouncement = `Viewing details for ${employee.name}`
        console.log('View employee:', employee)
      }
    },

    toggleEmployeeSelection(id) {
      const index = this.selectedEmployees.indexOf(id)
      const employee = this.filteredEmployees.find(e => e.id === id)
      
      if (index > -1) {
        this.selectedEmployees.splice(index, 1)
        this.tableAnnouncement = `${employee?.name || 'Employee'} deselected. ${this.selectedEmployees.length} selected`
      } else {
        this.selectedEmployees.push(id)
        this.tableAnnouncement = `${employee?.name || 'Employee'} selected. ${this.selectedEmployees.length} selected`
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.highlightedRow = 0
        this.tableAnnouncement = `Page ${page} of ${this.totalPages}. Showing employees ${this.startIndex + 1} to ${Math.min(this.endIndex, this.filteredEmployees.length)}`
      }
    },

    // Form methods
    nextStep() {
      if (this.currentStep < this.formSteps.length - 1) {
        this.currentStep++
        this.formAnnouncement = `Step ${this.currentStep + 1} of ${this.formSteps.length}: ${this.formSteps[this.currentStep].label}`
      }
    },

    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--
        this.formAnnouncement = `Step ${this.currentStep + 1} of ${this.formSteps.length}: ${this.formSteps[this.currentStep].label}`
      }
    },

    goToStep(index) {
      this.currentStep = index
      this.formAnnouncement = `Step ${index + 1} of ${this.formSteps.length}: ${this.formSteps[index].label}`
    },

    submitForm() {
      this.formAnnouncement = 'Form submitted successfully!'
      alert('Form submitted!')
      console.log('Form data:', this.formData)
    },

    // Accordion methods
    generateAccordionData() {
      this.accordionSections = [
        {
          id: 'section1',
          title: 'Active Projects',
          items: Array.from({ length: 8 }, (_, i) => ({
            id: `proj-${i}`,
            title: `Project ${i + 1}`,
            description: `Description for project ${i + 1}`,
            status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'pending' : 'completed',
            disabled: i % 5 === 0,
            hasSubtasks: i % 2 === 0,
            subtasks: i % 2 === 0 ? [
              { id: `sub-${i}-1`, text: 'Subtask 1', completed: false },
              { id: `sub-${i}-2`, text: 'Subtask 2', completed: true }
            ] : []
          }))
        },
        {
          id: 'section2',
          title: 'Archived Items',
          items: Array.from({ length: 5 }, (_, i) => ({
            id: `arch-${i}`,
            title: `Archive ${i + 1}`,
            description: `Archived item ${i + 1}`,
            status: 'archived',
            disabled: false,
            hasSubtasks: false,
            subtasks: []
          }))
        }
      ]
    },

    toggleSection(id) {
      const index = this.expandedSections.indexOf(id)
      if (index > -1) {
        this.expandedSections.splice(index, 1)
      } else {
        this.expandedSections.push(id)
      }
    },

    toggleItem(id) {
      const index = this.expandedItems.indexOf(id)
      if (index > -1) {
        this.expandedItems.splice(index, 1)
      } else {
        this.expandedItems.push(id)
      }
    },

    toggleSubtask(itemId, subtaskId) {
      const section = this.accordionSections.find(s =>
        s.items.some(i => i.id === itemId)
      )
      if (section) {
        const item = section.items.find(i => i.id === itemId)
        if (item) {
          const subtask = item.subtasks.find(s => s.id === subtaskId)
          if (subtask) {
            subtask.completed = !subtask.completed
          }
        }
      }
    },

    // Dashboard methods
    generateDashboardWidgets() {
      this.dashboardWidgets = [
        {
          id: 'stats',
          title: 'Statistics',
          type: 'stats',
          size: 'large',
          data: [
            { label: 'Total Sales', value: '$12,450', change: '+12%', trend: 'up' },
            { label: 'Active Users', value: '1,284', change: '+8%', trend: 'up' },
            { label: 'Revenue', value: '$45,230', change: '-3%', trend: 'down' },
            { label: 'Conversion', value: '3.2%', change: '+0.5%', trend: 'up' }
          ]
        },
        {
          id: 'activity',
          title: 'Recent Activity',
          type: 'activity',
          size: 'medium',
          data: Array.from({ length: 10 }, (_, i) => ({
            id: i,
            user: `User ${i + 1}`,
            action: ['updated a project', 'commented', 'uploaded a file'][i % 3],
            icon: ['📝', '💬', '📎'][i % 3],
            type: ['update', 'comment', 'upload'][i % 3],
            time: `${i + 1}m ago`
          }))
        },
        {
          id: 'tasks',
          title: 'My Tasks',
          type: 'tasks',
          size: 'medium',
          data: Array.from({ length: 6 }, (_, i) => ({
            id: i,
            text: `Task ${i + 1}`,
            completed: i % 3 === 0,
            priority: ['high', 'medium', 'low'][i % 3]
          }))
        }
      ]
    },

    toggleEditMode() {
      this.editMode = !this.editMode
    },

    refreshDashboard() {
      this.generateDashboardWidgets()
    },

    removeWidget(id) {
      const index = this.dashboardWidgets.findIndex(w => w.id === id)
      if (index > -1) {
        this.dashboardWidgets.splice(index, 1)
      }
    },

    toggleTask(taskId) {
      const widget = this.dashboardWidgets.find(w => w.type === 'tasks')
      if (widget) {
        const task = widget.data.find(t => t.id === taskId)
        if (task) {
          task.completed = !task.completed
        }
      }
    },

    addTask() {
      if (this.newTask.trim()) {
        const widget = this.dashboardWidgets.find(w => w.type === 'tasks')
        if (widget) {
          widget.data.push({
            id: Date.now(),
            text: this.newTask,
            completed: false,
            priority: 'medium'
          })
          this.newTask = ''
        }
      }
    },

    // Tree View methods
    generateTreeData() {
      this.treeData = [
        {
          id: 'root1',
          name: 'Documents',
          type: 'folder',
          children: [
            { id: 'doc1', name: 'Report.pdf', type: 'file' },
            {
              id: 'folder1',
              name: 'Projects',
              type: 'folder',
              children: [
                { id: 'proj1', name: 'Project A', type: 'file' },
                { id: 'proj2', name: 'Project B', type: 'file' }
              ]
            }
          ]
        },
        {
          id: 'root2',
          name: 'Images',
          type: 'folder',
          children: Array.from({ length: 5 }, (_, i) => ({
            id: `img${i}`,
            name: `Image ${i + 1}.jpg`,
            type: 'file'
          }))
        }
      ]
    },

    expandAllNodes() {
      const getAllIds = (nodes) => {
        let ids = []
        nodes.forEach(node => {
          if (node.children) {
            ids.push(node.id)
            ids = ids.concat(getAllIds(node.children))
          }
        })
        return ids
      }
      this.expandedTreeNodes = getAllIds(this.treeData)
    },

    collapseAllNodes() {
      this.expandedTreeNodes = []
    },

    toggleSelectionMode() {
      this.selectionMode = !this.selectionMode
      if (!this.selectionMode) {
        this.selectedTreeNodes = []
      }
    },

    toggleTreeNode(id) {
      const index = this.expandedTreeNodes.indexOf(id)
      if (index > -1) {
        this.expandedTreeNodes.splice(index, 1)
      } else {
        this.expandedTreeNodes.push(id)
      }
    },

    selectTreeNode(id) {
      if (!this.selectionMode) return
      const index = this.selectedTreeNodes.indexOf(id)
      if (index > -1) {
        this.selectedTreeNodes.splice(index, 1)
      } else {
        this.selectedTreeNodes.push(id)
      }
    },

    clearTreeSelection() {
      this.selectedTreeNodes = []
    },

    // Virtual Scrolling methods
    generateVirtualItems() {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
      this.allVirtualItems = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i + 1}`,
        description: `This is description for item ${i + 1}`,
        category: ['Technology', 'Business', 'Design', 'Marketing', 'Sales'][i % 5],
        date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
        color: colors[i % colors.length],
        initials: `I${i + 1}`,
        count: Math.floor(Math.random() * 100)
      }))
      this.filteredVirtualItems = [...this.allVirtualItems]
      this.updateVisibleVirtualItems()
    },

    filterVirtualList() {
      const query = this.virtualFilter.toLowerCase()
      this.filteredVirtualItems = this.allVirtualItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      )
      this.updateVisibleVirtualItems()
    },

    handleVirtualScroll(e) {
      this.scrollTop = e.target.scrollTop
      this.updateVisibleVirtualItems()
    },

    updateVisibleVirtualItems() {
      const startIndex = Math.floor(this.scrollTop / this.itemHeight)
      const endIndex = Math.min(
        startIndex + Math.ceil(this.containerHeight / this.itemHeight) + 2,
        this.filteredVirtualItems.length
      )
      this.visibleVirtualItems = this.filteredVirtualItems.slice(startIndex, endIndex)
    },

    toggleVirtualItemSelection(id) {
      const index = this.selectedVirtualItems.indexOf(id)
      if (index > -1) {
        this.selectedVirtualItems.splice(index, 1)
      } else {
        this.selectedVirtualItems.push(id)
      }
    },

    navigateVirtualList(direction) {
      if (this.filteredVirtualItems.length === 0) return

      // Initialize focus on first item if not set
      if (this.focusedVirtualIndex === null) {
        this.focusedVirtualIndex = this.filteredVirtualItems[0].id
        this.scrollToVirtualItem(0)
        return
      }

      // Find current index
      const currentIndex = this.filteredVirtualItems.findIndex(item => item.id === this.focusedVirtualIndex)
      if (currentIndex === -1) {
        this.focusedVirtualIndex = this.filteredVirtualItems[0].id
        return
      }

      // Navigate
      let newIndex = currentIndex
      if (direction === 'down' && currentIndex < this.filteredVirtualItems.length - 1) {
        newIndex = currentIndex + 1
      } else if (direction === 'up' && currentIndex > 0) {
        newIndex = currentIndex - 1
      }

      if (newIndex !== currentIndex) {
        this.focusedVirtualIndex = this.filteredVirtualItems[newIndex].id
        this.scrollToVirtualItem(newIndex)
      }
    },

    scrollToVirtualItem(index) {
      const container = document.querySelector('.virtual-list-container')
      if (!container) return

      const itemTop = index * this.itemHeight
      const itemBottom = itemTop + this.itemHeight
      const containerTop = this.scrollTop
      const containerBottom = containerTop + this.containerHeight

      // Scroll if item is not fully visible
      if (itemTop < containerTop) {
        container.scrollTop = itemTop
      } else if (itemBottom > containerBottom) {
        container.scrollTop = itemBottom - this.containerHeight
      }
    },

    // Calendar methods
    generateCalendarEvents() {
      this.calendarEvents = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        title: `Event ${i + 1}`,
        date: new Date(Date.now() + (i - 10) * 86400000),
        time: `${9 + (i % 8)}:00 AM`,
        duration: '1 hour',
        type: ['meeting', 'task', 'reminder'][i % 3]
      }))
    },

    previousPeriod() {
      if (this.currentView === 'month') {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1)
      }
    },

    nextPeriod() {
      if (this.currentView === 'month') {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1)
      }
    },

    setCalendarView(view) {
      this.currentView = view
    },

    selectDay(day) {
      this.selectedCalendarDay = day
    },

    navigateCalendar(direction) {
      // Initialize focus on today or first day if not set
      if (this.focusedCalendarIndex === null) {
        const todayIndex = this.calendarDays.findIndex(day => day.isToday)
        this.focusedCalendarIndex = todayIndex >= 0 ? todayIndex : 0
        return
      }

      const currentIndex = this.focusedCalendarIndex
      let newIndex = currentIndex

      switch (direction) {
        case 'right':
          if (currentIndex < this.calendarDays.length - 1) {
            newIndex = currentIndex + 1
          }
          break
        case 'left':
          if (currentIndex > 0) {
            newIndex = currentIndex - 1
          }
          break
        case 'down':
          // Move down one week (7 days)
          if (currentIndex + 7 < this.calendarDays.length) {
            newIndex = currentIndex + 7
          }
          break
        case 'up':
          // Move up one week (7 days)
          if (currentIndex - 7 >= 0) {
            newIndex = currentIndex - 7
          }
          break
      }

      if (newIndex !== currentIndex) {
        this.focusedCalendarIndex = newIndex
        
        // Auto-scroll to keep focused day visible
        const dayElement = document.querySelectorAll('.calendar-day')[newIndex]
        if (dayElement) {
          dayElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
      }
    },

    // Chat methods
    generateChats() {
      this.chats = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        name: `Contact ${i + 1}`,
        initials: `C${i + 1}`,
        lastMessage: `Last message from contact ${i + 1}`,
        time: `${i + 1}m ago`,
        unread: i % 3 === 0 ? i + 1 : 0,
        status: i % 2 === 0 ? 'online' : 'offline',
        messages: Array.from({ length: 10 }, (_, j) => ({
          id: j,
          sender: j % 2 === 0 ? 'You' : `Contact ${i + 1}`,
          senderInitials: j % 2 === 0 ? 'Y' : `C${i + 1}`,
          text: `Message ${j + 1} in conversation`,
          time: `${j + 1}m ago`,
          attachments: j % 5 === 0 ? [{ name: 'file.pdf' }] : null,
          reactions: j % 3 === 0 ? [{ emoji: '👍', count: 2 }] : [],
          thread: j % 4 === 0 ? { count: 3 } : null
        }))
      }))
      this.filteredChats = [...this.chats]
    },

    selectChat(chat) {
      this.activeChat = chat
      this.focusedMessageIndex = null
      this.chatAnnouncement = `Opened conversation with ${chat.name}. ${chat.messages.length} messages`
      
      // Focus on the input after selecting chat
      this.$nextTick(() => {
        if (this.$refs.chatInput) {
          this.$refs.chatInput.focus()
        }
      })
    },

    navigateChatList(direction) {
      if (this.filteredChats.length === 0) return

      if (this.focusedChatIndex === null) {
        this.focusedChatIndex = 0
        this.chatAnnouncement = `${this.filteredChats[0].name}. ${this.filteredChats[0].unread ? this.filteredChats[0].unread + ' unread messages' : 'No unread messages'}`
        return
      }

      let newIndex = this.focusedChatIndex
      if (direction === 'down' && newIndex < this.filteredChats.length - 1) {
        newIndex++
      } else if (direction === 'up' && newIndex > 0) {
        newIndex--
      }

      if (newIndex !== this.focusedChatIndex) {
        this.focusedChatIndex = newIndex
        const chat = this.filteredChats[newIndex]
        this.chatAnnouncement = `${chat.name}. ${chat.unread ? chat.unread + ' unread messages' : 'No unread messages'}. Last message: ${chat.lastMessage}`
      }
    },

    navigateMessages(direction) {
      if (!this.activeChat || this.activeChat.messages.length === 0) return

      if (this.focusedMessageIndex === null) {
        this.focusedMessageIndex = this.activeChat.messages.length - 1
        const msg = this.activeChat.messages[this.focusedMessageIndex]
        this.chatAnnouncement = `${msg.sender} said: ${msg.text}`
        return
      }

      let newIndex = this.focusedMessageIndex
      if (direction === 'down' && newIndex < this.activeChat.messages.length - 1) {
        newIndex++
      } else if (direction === 'up' && newIndex > 0) {
        newIndex--
      }

      if (newIndex !== this.focusedMessageIndex) {
        this.focusedMessageIndex = newIndex
        const msg = this.activeChat.messages[newIndex]
        this.chatAnnouncement = `${msg.sender} said: ${msg.text}`
      }
    },

    sendChatMessage() {
      if (this.chatMessage.trim() && this.activeChat) {
        const newMessage = {
          id: Date.now(),
          sender: 'You',
          senderInitials: 'Y',
          text: this.chatMessage,
          time: 'Just now',
          attachments: null,
          reactions: [],
          thread: null
        }
        this.activeChat.messages.push(newMessage)
        this.chatAnnouncement = `Message sent: ${this.chatMessage}`
        this.chatMessage = ''
        
        // Scroll to bottom
        this.$nextTick(() => {
          const container = this.$refs.messageContainer
          if (container) {
            container.scrollTop = container.scrollHeight
          }
        })
      }
    },

    toggleReaction(messageId, emoji) {
      const message = this.activeChat?.messages.find(m => m.id === messageId)
      if (message) {
        const reaction = message.reactions.find(r => r.emoji === emoji)
        if (reaction) {
          reaction.count++
          this.chatAnnouncement = `Added ${emoji} reaction. Total: ${reaction.count}`
        } else {
          message.reactions.push({ emoji, count: 1 })
          this.chatAnnouncement = `Added ${emoji} reaction`
        }
      }
    },

    showReactionPicker(messageId) {
      const emojis = ['👍', '❤️', '😂', '😮', '😢', '🎉']
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      this.toggleReaction(messageId, emoji)
    },

    openThread(message) {
      this.chatAnnouncement = `Opening thread with ${message.thread.count} replies`
      console.log('Open thread', message)
    },

    attachFile() {
      this.chatAnnouncement = 'Opening file picker'
      // Simulate file attachment
      setTimeout(() => {
        this.chatAnnouncement = 'File attached: document.pdf'
      }, 500)
      console.log('Attach file')
    },

    downloadAttachment(file) {
      this.chatAnnouncement = `Downloading ${file.name}`
      console.log('Download', file)
    },

    showEmojiPicker() {
      const emojis = ['😊', '👍', '❤️', '😂', '🎉', '👋']
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      this.chatMessage += emoji
      this.chatAnnouncement = `Added ${emoji} emoji`
    },

    showKeyboardShortcuts() {
      this.chatAnnouncement = 'Keyboard shortcuts: Arrow keys to navigate, Enter to select, Ctrl+Enter to send message'
    },

    // Dynamic Form methods
    generateFormSections() {
      this.formSections = [
        {
          id: 'basic',
          title: 'Basic Information',
          description: 'Please provide your basic details',
          fields: [
            { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
            { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
            { id: 'phone', label: 'Phone', type: 'tel', required: false, placeholder: '+1 234 567 8900' },
            {
              id: 'accountType',
              label: 'Account Type',
              type: 'select',
              required: true,
              options: [
                { value: 'personal', label: 'Personal' },
                { value: 'business', label: 'Business' },
                { value: 'enterprise', label: 'Enterprise' }
              ]
            }
          ]
        },
        {
          id: 'business',
          title: 'Business Details',
          condition: (data) => data.accountType === 'business' || data.accountType === 'enterprise',
          fields: [
            { id: 'company', label: 'Company Name', type: 'text', required: true },
            { id: 'industry', label: 'Industry', type: 'select', required: true,
              options: [
                { value: 'tech', label: 'Technology' },
                { value: 'finance', label: 'Finance' },
                { value: 'retail', label: 'Retail' }
              ]
            },
            { id: 'employees', label: 'Number of Employees', type: 'number', required: true }
          ]
        },
        {
          id: 'preferences',
          title: 'Preferences',
          fields: [
            {
              id: 'interests',
              label: 'Interests',
              type: 'checkbox-group',
              options: [
                { value: 'updates', label: 'Product Updates' },
                { value: 'news', label: 'Newsletter' },
                { value: 'offers', label: 'Special Offers' }
              ]
            },
            {
              id: 'notifications',
              label: 'Notification Method',
              type: 'radio-group',
              options: [
                { value: 'email', label: 'Email' },
                { value: 'sms', label: 'SMS' },
                { value: 'both', label: 'Both' }
              ]
            },
            { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself...' }
          ]
        },
        {
          id: 'documents',
          title: 'Documents',
          fields: [
            {
              id: 'resume',
              label: 'Upload Resume',
              type: 'file',
              accept: '.pdf,.doc,.docx',
              multiple: false
            },
            {
              id: 'attachments',
              label: 'Additional Documents',
              type: 'file',
              accept: '*',
              multiple: true
            },
            { id: 'startDate', label: 'Start Date', type: 'date', required: true }
          ]
        }
      ]
    },

    validateField(field) {
      if (field.required && !this.dynamicFormData[field.id]) {
        this.$set(this.formErrors, field.id, 'This field is required')
      } else {
        this.$delete(this.formErrors, field.id)
      }
    },

    handleFieldChange(field) {
      this.validateField(field)
    },

    handleFileUpload(field, event) {
      const files = Array.from(event.target.files)
      if (field.multiple) {
        this.$set(this.uploadedFiles, field.id, files)
      } else {
        this.$set(this.uploadedFiles, field.id, [files[0]])
      }
    },

    removeFile(fieldId, index) {
      if (this.uploadedFiles[fieldId]) {
        this.uploadedFiles[fieldId].splice(index, 1)
      }
    },

    formatFileSize(bytes) {
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    },

    isSectionVisible(section) {
      if (!section.condition) return true
      return section.condition(this.dynamicFormData)
    },

    getVisibleFields(section) {
      return section.fields
    },

    saveDraft() {
      console.log('Saving draft...', this.dynamicFormData)
      alert('Draft saved!')
    },

    submitDynamicForm() {
      console.log('Submitting form...', this.dynamicFormData)
      alert('Form submitted successfully!')
    }
  },

  components: {
    TreeNode: {
      name: 'TreeNode',
      props: ['node', 'expandedNodes', 'selectedNodes', 'selectionMode'],
      template: `
        <div class="tree-node">
          <div class="tree-node-content">
            <button 
              v-if="node.children" 
              @click="$emit('toggle', node.id)"
              class="tree-toggle"
            >
              {{ expandedNodes.includes(node.id) ? '▼' : '▶' }}
            </button>
            <span v-else class="tree-spacer"></span>
            <input 
              v-if="selectionMode"
              type="checkbox"
              :checked="selectedNodes.includes(node.id)"
              @change="$emit('select', node.id)"
            />
            <span :class="'tree-icon ' + node.type">
              {{ node.type === 'folder' ? '📁' : '📄' }}
            </span>
            <span class="tree-label">{{ node.name }}</span>
          </div>
          <div v-if="node.children && expandedNodes.includes(node.id)" class="tree-children">
            <TreeNode
              v-for="child in node.children"
              :key="child.id"
              :node="child"
              :expandedNodes="expandedNodes"
              :selectedNodes="selectedNodes"
              :selectionMode="selectionMode"
              @toggle="$emit('toggle', $event)"
              @select="$emit('select', $event)"
            />
          </div>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.documentation-banner {
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

.banner-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.banner-text {
  flex: 1;
}

.banner-text h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.banner-text p {
  margin: 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

.banner-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

.banner-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .banner-button {
    width: 100%;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.scenario {
  margin-bottom: 3rem;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.scenario h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.scenario p {
  color: #666;
  margin-bottom: 1.5rem;
}

/* Navigation Menu Styles */
.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu button {
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-bottom: 0.25rem;
}

.nav-menu button:hover {
  background: #e9ecef;
}

.nav-menu button.active {
  background: #007bff;
  color: white;
}

.nav-menu button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.badge {
  background: #dc3545;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

.submenu, .submenu-level-2 {
  list-style: none;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

/* Table Styles */
.table-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.table-controls input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.data-table th button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  text-align: left;
}

.data-table tr.selected {
  background: #e7f3ff;
}

.data-table tr.highlighted {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.data-table:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  background: #007bff;
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form Styles */
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
}

.steps {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.steps button {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.steps button.active {
  border-color: #007bff;
  background: #007bff;
  color: white;
}

.steps button.completed {
  border-color: #28a745;
  background: #28a745;
  color: white;
}

.form-content {
  margin-bottom: 2rem;
}

.form-content h3 {
  margin-bottom: 1rem;
}

.form-content input,
.form-content select {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.form-actions button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.form-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Accordion Styles */
.filter-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.accordion {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: hidden;
}

.accordion-section {
  border-bottom: 1px solid #dee2e6;
}

.accordion-section:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: 1rem;
  background: #f8f9fa;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.accordion-header:hover {
  background: #e9ecef;
}

.accordion-content {
  padding: 0.5rem 1rem;
  background: white;
}

.accordion-item {
  margin-bottom: 0.5rem;
}

.accordion-subheader {
  width: 100%;
  padding: 0.75rem;
  background: white;
  border: 1px solid #dee2e6;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
}

.accordion-subheader:hover {
  background: #f8f9fa;
}

.accordion-subcontent {
  padding: 1rem;
  background: #f8f9fa;
  margin-top: 0.5rem;
  border-radius: 4px;
}

.subtasks {
  margin-top: 1rem;
}

.subtask {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.status-active { color: #28a745; }
.status-pending { color: #ffc107; }
.status-completed { color: #6c757d; }
.status-archived { color: #6c757d; font-style: italic; }

/* Dashboard Styles */
.dashboard-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background: white;
  color: #007bff;
  cursor: pointer;
  border-radius: 4px;
}

.dashboard-controls button:hover {
  background: #007bff;
  color: white;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.widget {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.widget.editing {
  border: 2px dashed #007bff;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.widget-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.btn-remove {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.widget-content {
  padding: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.stat-change {
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.stat-change.up { color: #28a745; }
.stat-change.down { color: #dc3545; }

.activity-feed {
  max-height: 300px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-details {
  flex: 1;
}

.activity-time {
  color: #999;
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.task-list {
  max-height: 300px;
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.task-item label {
  flex: 1;
  cursor: pointer;
}

.task-item label.completed {
  text-decoration: line-through;
  color: #999;
}

.priority-high { color: #dc3545; font-weight: bold; }
.priority-medium { color: #ffc107; }
.priority-low { color: #28a745; }

.task-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-top: 0.5rem;
}

/* Tree View Styles */
.tree-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tree-controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.tree-view {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.tree-node {
  margin-left: 1rem;
}

.tree-node-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
}

.tree-node-content:hover {
  background: #f8f9fa;
}

.tree-toggle {
  border: none;
  background: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 0;
}

.tree-spacer {
  width: 20px;
}

.tree-icon {
  font-size: 1.2rem;
}

.tree-children {
  margin-left: 1rem;
}

.tree-selection-info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #e7f3ff;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Virtual Scrolling Styles */
.virtual-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.virtual-controls input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.virtual-list-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  position: relative;
}

.virtual-list-container:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.virtual-spacer {
  position: relative;
}

.virtual-content {
  position: absolute;
  width: 100%;
  will-change: transform;
}

.virtual-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  height: 80px;
  box-sizing: border-box;
}

.virtual-item:hover {
  background: #f8f9fa;
}

.virtual-item.selected {
  background: #e7f3ff;
}

.virtual-item.focused {
  outline: 3px solid #007bff;
  outline-offset: -3px;
  background: #f0f8ff;
}

.item-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.item-content p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  color: #999;
  font-size: 0.85rem;
}

.item-badge {
  background: #007bff;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

/* Calendar Styles */
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.calendar-header h3 {
  margin: 0;
  flex: 1;
  text-align: center;
}

.calendar-header button {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.view-switcher {
  display: flex;
  gap: 0.5rem;
}

.view-switcher button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.calendar-month {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.weekday {
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #dee2e6;
}

.weekday:last-child {
  border-right: none;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 100px;
}

.calendar-day {
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 0.5rem;
  cursor: pointer;
  background: white;
  overflow: hidden;
}

.calendar-day:hover {
  background: #f8f9fa;
}

.calendar-day.other-month {
  background: #fafafa;
  color: #ccc;
}

.calendar-day.today {
  background: #fff9e6;
}

.calendar-day.selected {
  background: #e7f3ff;
  border: 2px solid #007bff;
}

.calendar-day.focused {
  outline: 3px solid #007bff;
  outline-offset: -3px;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  z-index: 1;
  position: relative;
}

.calendar-month:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.day-number {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.day-events {
  font-size: 0.75rem;
}

.event {
  padding: 0.15rem 0.25rem;
  margin-bottom: 0.15rem;
  border-radius: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-meeting { background: #e7f3ff; color: #0056b3; }
.event-task { background: #fff3cd; color: #856404; }
.event-reminder { background: #d4edda; color: #155724; }

.more-events {
  color: #007bff;
  font-weight: bold;
  margin-top: 0.25rem;
}

.event-details {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.event-detail {
  padding: 0.75rem 0;
  border-bottom: 1px solid #dee2e6;
}

.event-detail:last-child {
  border-bottom: none;
}

/* Chat Styles */
.chat-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1rem;
  height: 500px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.chat-sidebar {
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
}

.chat-search {
  padding: 0.75rem;
  border: none;
  border-bottom: 1px solid #dee2e6;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
}

.chat-item:hover {
  background: white;
}

.chat-item.active {
  background: white;
  border-left: 3px solid #007bff;
}

.chat-item.unread {
  background: #e7f3ff;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-info strong {
  display: block;
  margin-bottom: 0.25rem;
}

.chat-info p {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.chat-time {
  font-size: 0.75rem;
  color: #999;
}

.unread-badge {
  background: #007bff;
  color: white;
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  font-size: 0.75rem;
}

.chat-main {
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
}

.chat-status {
  color: #28a745;
  font-size: 0.85rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  max-width: 70%;
}

.message-own {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.message-own .message-avatar {
  background: #007bff;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.message-time {
  font-size: 0.75rem;
  color: #999;
}

.message-text {
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  word-wrap: break-word;
}

.message-own .message-text {
  background: #007bff;
  color: white;
}

.message-attachments {
  margin-top: 0.5rem;
}

.attachment {
  display: inline-block;
  padding: 0.5rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-right: 0.5rem;
}

.message-reactions {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.reaction {
  padding: 0.25rem 0.5rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  font-size: 0.85rem;
  cursor: pointer;
}

.add-reaction {
  padding: 0.25rem 0.5rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  font-size: 0.85rem;
  cursor: pointer;
}

.message-thread {
  margin-top: 0.5rem;
}

.message-thread button {
  padding: 0.25rem 0.5rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
}

.chat-input-area {
  border-top: 1px solid #dee2e6;
  padding: 1rem;
}

.chat-input-area textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;
}

.chat-actions button {
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background: white;
  color: #007bff;
  cursor: pointer;
  border-radius: 4px;
}

.chat-actions button:last-child {
  background: #007bff;
  color: white;
}

.chat-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dynamic Form Styles */
.form-builder {
  max-width: 800px;
}

.form-progress {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-fill {
  height: 100%;
  background: #28a745;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
}

.form-section h3 {
  margin-top: 0;
  color: #2c3e50;
}

.section-description {
  color: #666;
  margin-bottom: 1.5rem;
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.required {
  color: #dc3545;
  margin-left: 0.25rem;
}

.form-field input[type="text"],
.form-field input[type="email"],
.form-field input[type="tel"],
.form-field input[type="number"],
.form-field input[type="date"],
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-group div,
.radio-group div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-upload {
  border: 2px dashed #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
}

.file-upload input[type="file"] {
  width: 100%;
}

.uploaded-files {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.file-item button {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.field-error {
  display: block;
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.btn-secondary {
  background: white;
  color: #007bff;
  border: 1px solid #007bff;
}

.btn-secondary:hover {
  background: #f8f9fa;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-primary:disabled {
  background: #6c757d;
  border-color: #6c757d;
  cursor: not-allowed;
}

/* Chat focused states */
.chat-item.focused {
  background: #e3f2fd;
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.message.focused {
  background: #fff3cd;
  outline: 2px solid #ffc107;
  outline-offset: -2px;
}

.chat-list:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.messages-container:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}
</style>
