<template>
  <div class="scenarios-documentation">
    <h1>How to Use Vue A11y Directives</h1>
    <p class="page-intro">
      Simple examples showing HOW TO USE 
      <code>v-a11y-keyboard</code>, <code>v-a11y-aria</code>, and <code>v-a11y-announce</code> directives.
      No complex logic needed - the directives handle keyboard navigation, ARIA attributes, and screen reader announcements automatically!
    </p>

    <div class="table-of-contents">
      <h2>📚 Scenarios</h2>
      <ol>
        <li><a href="#scenario-1">Multi-Level Navigation Menu</a></li>
        <li><a href="#scenario-2">Data Table with Sorting & Filtering</a></li>
        <li><a href="#scenario-3">Multi-Step Form Wizard</a></li>
        <li><a href="#scenario-4">Nested Accordion</a></li>
        <li><a href="#scenario-5">Interactive Dashboard</a></li>
        <li><a href="#scenario-6">Tree View with Selection</a></li>
        <li><a href="#scenario-7">Virtual Scrolling List</a></li>
        <li><a href="#scenario-8">Calendar with Events</a></li>
        <li><a href="#scenario-9">Real-time Chat</a></li>
        <li><a href="#scenario-10">Dynamic Form Builder</a></li>
      </ol>
    </div>

    <!-- Scenario 1: Navigation Menu -->
    <div id="scenario-1">
      <ScenarioDoc
        title="1. Multi-Level Navigation Menu"
        description="Just add v-a11y-keyboard and v-a11y-aria directives - the keyboard navigation works automatically!"
        :features="[
          'Arrow keys navigate automatically (handled by directive)',
          'Disabled items skipped automatically',
          'ARIA attributes updated automatically',
          'Screen reader announcements included',
          'No complex methods or computed properties needed'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus the navigation menu' },
          { keys: ['↓', '↑'], action: 'Navigate menu items (automatic)' },
          { keys: ['Enter'], action: 'Activate menu item' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="navigationTemplateCode"
        :scriptCode="navigationScriptCode"
        :notes="[
          'The <code>v-a11y-keyboard</code> directive handles all arrow key navigation automatically',
          'The <code>v-a11y-aria</code> directive updates <code>aria-expanded</code> and <code>aria-disabled</code> based on your data',
          'No need for complex keyboard handler methods - the directive does it!',
          'Just bind your data to the directive attributes and it works'
        ]"
      >
        <template #demo>
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
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 2: Data Table -->
    <div id="scenario-2">
      <ScenarioDoc
        title="2. Data Table with Keyboard Navigation"
        description="Just add v-a11y-keyboard to your table - arrow key navigation works automatically!"
        :features="[
          'Arrow keys navigate rows automatically',
          'ARIA sort indicators updated automatically',
          'Selection announcements included',
          'Works with any table data'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus the table' },
          { keys: ['↓', '↑'], action: 'Navigate rows (automatic)' },
          { keys: ['Enter', 'Space'], action: 'Select row' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="tableTemplateCode"
        :scriptCode="tableScriptCode"
        :notes="[
          'The <code>v-a11y-keyboard</code> directive handles row navigation automatically',
          'The <code>v-a11y-aria</code> directive updates sort indicators',
          'No need for complex keyboard handler methods'
        ]"
      >
        <template #demo>
          <div style="max-width: 600px;">
            <div v-a11y-announce="tableAnnouncement"></div>
            <input 
              v-model="tableFilter" 
              placeholder="Filter employees..." 
              style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;" 
            />
            <table 
              v-a11y-keyboard="tableKeyboard" 
              tabindex="0"
              style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #ddd;"
            >
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #ddd;">Name</th>
                  <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #ddd;">Email</th>
                  <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #ddd;">Department</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="employee in filteredEmployees" 
                  :key="employee.id"
                  style="border-bottom: 1px solid #eee;"
                  @click="selectEmployee(employee)"
                  :style="{ background: employee.selected ? '#e3f2fd' : 'white', cursor: 'pointer' }"
                >
                  <td style="padding: 0.75rem;">{{ employee.name }}</td>
                  <td style="padding: 0.75rem;">{{ employee.email }}</td>
                  <td style="padding: 0.75rem;">{{ employee.department }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 3: Multi-Step Form -->
    <div id="scenario-3">
      <ScenarioDoc
        title="3. Multi-Step Form with Progress"
        description="Progress bar ARIA attributes set automatically - no manual aria-valuenow needed!"
        :features="[
          'Progress bar ARIA handled automatically',
          'Form labels without label tags',
          'Required indicators automatic',
          'Step change announcements'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Navigate form fields' }
        ]"
        :directives="['v-a11y-aria', 'v-a11y-announce']"
        :templateCode="formTemplateCode"
        :scriptCode="formScriptCode"
        :notes="[
          'Use <code>v-a11y-aria</code> with valuenow/valuemin/valuemax for progress bars',
          'No need for <code>&lt;label&gt;</code> elements - directive adds aria-label',
          'Required fields get aria-required automatically'
        ]"
      >
        <template #demo>
          <div style="max-width: 500px; padding: 1.5rem; background: white; border: 1px solid #ddd; border-radius: 8px;">
            <div v-a11y-announce="formAnnouncement"></div>
            
            <!-- Progress bar -->
            <div style="margin-bottom: 2rem;">
              <div 
                v-a11y-aria="{ 
                  valuenow: demoCurrentStep, 
                  valuemin: 1, 
                  valuemax: 3 
                }"
                role="progressbar"
                style="text-align: center; font-weight: bold; margin-bottom: 0.5rem;"
              >
                Step {{ demoCurrentStep }} of 3
              </div>
              <div style="height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
                <div :style="{ width: (demoCurrentStep / 3 * 100) + '%', height: '100%', background: '#4caf50', transition: 'width 0.3s' }"></div>
              </div>
            </div>
            
            <!-- Step 1 -->
            <div v-if="demoCurrentStep === 1">
              <h4 style="margin-bottom: 1rem;">Personal Information</h4>
              <input 
                v-model="demoFormData.name"
                v-a11y-aria="{ label: 'Full Name', required: true }"
                placeholder="Full Name"
                style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;"
              />
              <input 
                v-model="demoFormData.email"
                v-a11y-aria="{ label: 'Email Address', required: true }"
                placeholder="Email"
                style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;"
              />
            </div>
            
            <!-- Step 2 -->
            <div v-if="demoCurrentStep === 2">
              <h4 style="margin-bottom: 1rem;">Contact Details</h4>
              <input 
                v-model="demoFormData.phone"
                v-a11y-aria="{ label: 'Phone Number', required: false }"
                placeholder="Phone"
                style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;"
              />
              <input 
                v-model="demoFormData.address"
                v-a11y-aria="{ label: 'Address', required: false }"
                placeholder="Address"
                style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 4px;"
              />
            </div>
            
            <!-- Step 3 -->
            <div v-if="demoCurrentStep === 3">
              <h4 style="margin-bottom: 1rem;">Review</h4>
              <p><strong>Name:</strong> {{ demoFormData.name || 'Not provided' }}</p>
              <p><strong>Email:</strong> {{ demoFormData.email || 'Not provided' }}</p>
              <p><strong>Phone:</strong> {{ demoFormData.phone || 'Not provided' }}</p>
            </div>
            
            <!-- Navigation -->
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
              <button 
                @click="demoCurrentStep--"
                :disabled="demoCurrentStep === 1"
                style="padding: 0.5rem 1rem; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;"
                :style="{ opacity: demoCurrentStep === 1 ? 0.5 : 1 }"
              >
                Previous
              </button>
              <button 
                @click="nextFormStep"
                style="padding: 0.5rem 1rem; border: none; background: #2196f3; color: white; border-radius: 4px; cursor: pointer; flex: 1;"
              >
                {{ demoCurrentStep === 3 ? 'Submit' : 'Next' }}
              </button>
            </div>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 4: Accordion -->
    <div id="scenario-4">
      <ScenarioDoc
        title="4. Accordion with Keyboard Navigation"
        description="Arrow navigation through sections, aria-expanded handled automatically!"
        :features="[
          'Arrow keys navigate sections automatically',
          'aria-expanded updates automatically',
          'Checkbox labels handled',
          'Expand/collapse with keyboard'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus accordion' },
          { keys: ['↓', '↑'], action: 'Navigate sections (automatic)' },
          { keys: ['Enter'], action: 'Toggle section' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="accordionTemplateCode"
        :scriptCode="accordionScriptCode"
        :notes="[
          'Directive handles keyboard navigation through accordion sections',
          '<code>aria-expanded</code> updates based on your data automatically',
          'No need for complex toggle logic'
        ]"
      >
        <template #demo>
          <div style="max-width: 600px;">
            <div v-a11y-announce="accordionAnnouncement"></div>
            
            <div 
              v-a11y-keyboard="accordionKeyboard" 
              tabindex="0"
              style="background: white; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;"
            >
              <div 
                v-for="section in demoSections" 
                :key="section.id"
                style="border-bottom: 1px solid #eee;"
              >
                <button 
                  v-a11y-aria="{ expanded: section.isOpen }"
                  @click="toggleSection(section)"
                  style="width: 100%; padding: 1rem; text-align: left; border: none; background: #f8f9fa; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1rem; font-weight: 500;"
                >
                  <span>{{ section.title }}</span>
                  <span style="font-size: 1.2rem;">{{ section.isOpen ? '−' : '+' }}</span>
                </button>
                
                <div 
                  v-if="section.isOpen"
                  style="padding: 1rem; background: white;"
                >
                  <p style="margin-bottom: 1rem;">{{ section.content }}</p>
                  <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input 
                      type="checkbox" 
                      v-model="section.checked"
                      v-a11y-aria="{ label: section.checkboxLabel }"
                    />
                    <span>{{ section.checkboxLabel }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 5: Dashboard -->
    <div id="scenario-5">
      <ScenarioDoc
        title="5. Dashboard with Widgets"
        description="Navigate between widgets with arrow keys automatically!"
        :features="[
          'Arrow navigation between widgets',
          'Accessible button labels',
          'Edit mode support',
          'Simple grid layout'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus dashboard' },
          { keys: ['↓', '↑', '←', '→'], action: 'Navigate widgets (automatic)' },
          { keys: ['Enter'], action: 'Edit widget' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="dashboardTemplateCode"
        :scriptCode="dashboardScriptCode"
        :notes="[
          'Directive handles 2D navigation through grid automatically',
          'Button labels set via <code>v-a11y-aria</code>',
          'No complex grid navigation logic needed'
        ]"
      >
        <template #demo>
          <div style="max-width: 700px;">
            <div v-a11y-announce="dashboardAnnouncement"></div>
            
            <div 
              class="dashboard-grid"
              v-a11y-keyboard="true" 
              tabindex="0"
              style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;"
            >
              <div 
                v-for="widget in demoWidgets" 
                :key="widget.id"
                style="padding: 1.5rem; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
              >
                <h3 style="margin: 0 0 1rem 0; font-size: 1.1rem; color: #333;">{{ widget.title }}</h3>
                <p style="margin: 0 0 1rem 0; font-size: 2rem; font-weight: bold; color: #2196f3;">{{ widget.value }}</p>
                <button 
                  v-a11y-aria="{ label: 'Edit ' + widget.title }"
                  @click="editWidget(widget)"
                  style="padding: 0.5rem 1rem; border: 1px solid #2196f3; background: white; color: #2196f3; border-radius: 4px; cursor: pointer;"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 6: Tree View -->
    <div id="scenario-6">
      <ScenarioDoc
        title="6. Tree View with Selection"
        description="Hierarchical navigation, aria-expanded and aria-selected automatic!"
        :features="[
          'Tree navigation with arrows',
          'aria-expanded for nodes',
          'aria-selected for selection',
          'Multi-level support'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus tree' },
          { keys: ['↓', '↑'], action: 'Navigate nodes (automatic)' },
          { keys: ['→'], action: 'Expand node' },
          { keys: ['←'], action: 'Collapse node' },
          { keys: ['Space'], action: 'Select node' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="treeTemplateCode"
        :scriptCode="treeScriptCode"
        :notes="[
          'Directive handles tree navigation patterns automatically',
          'Both <code>aria-expanded</code> and <code>aria-selected</code> supported',
          'Works with any tree structure'
        ]"
      >
        <template #demo>
          <div style="max-width: 500px;">
            <div v-a11y-announce="treeAnnouncement"></div>
            
            <ul 
              v-a11y-keyboard="true" 
              tabindex="0" 
              role="tree"
              style="list-style: none; padding: 1rem; background: white; border: 1px solid #ddd; border-radius: 8px;"
            >
              <li 
                v-for="node in demoTreeData" 
                :key="node.id"
                role="treeitem"
                v-a11y-aria="{ 
                  expanded: node.isExpanded,
                  selected: node.isSelected
                }"
                style="margin-bottom: 0.5rem;"
              >
                <div 
                  @click="toggleTreeNode(node)"
                  style="padding: 0.5rem; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem;"
                  :style="{ background: node.isSelected ? '#e3f2fd' : 'transparent' }"
                >
                  <span v-if="node.children" style="width: 20px; font-weight: bold;">{{ node.isExpanded ? '▼' : '▶' }}</span>
                  <span v-else style="width: 20px;"></span>
                  <span>📁 {{ node.label }}</span>
                </div>
                <ul 
                  v-if="node.children && node.isExpanded"
                  style="list-style: none; padding-left: 2rem; margin-top: 0.5rem;"
                >
                  <li 
                    v-for="child in node.children" 
                    :key="child.id"
                    v-a11y-aria="{ selected: child.isSelected }"
                    @click.stop="selectTreeNode(child)"
                    style="padding: 0.5rem; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem;"
                    :style="{ background: child.isSelected ? '#e3f2fd' : 'transparent' }"
                  >
                    <span>📄 {{ child.label }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 7: Virtual List -->
    <div id="scenario-7">
      <ScenarioDoc
        title="7. Virtual Scrolling List (1000+ Items)"
        description="Keyboard scrolling through large lists - automatic!"
        :features="[
          'Arrow key scrolling automatic',
          'Handles 1000+ items efficiently',
          'Home/End key support',
          'Focus management included'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus list' },
          { keys: ['↓', '↑'], action: 'Scroll items (automatic)' },
          { keys: ['Home', 'End'], action: 'Jump to start/end' },
          { keys: ['Enter'], action: 'Select item' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-announce']"
        :templateCode="virtualListTemplateCode"
        :scriptCode="virtualListScriptCode"
        :notes="[
          'Directive handles virtual scrolling automatically',
          'No need to manually manage focus indices',
          'Works with any large dataset'
        ]"
      >
        <template #demo>
          <div style="max-width: 500px;">
            <div v-a11y-announce="virtualListAnnouncement"></div>
            <p style="margin-bottom: 1rem; color: #666;">Showing 1000 items - Tab to focus, then use arrow keys to navigate</p>
            
            <div 
              class="virtual-list"
              v-a11y-keyboard="virtualListKeyboard" 
              tabindex="0"
              style="height: 300px; overflow-y: auto; background: white; border: 1px solid #ddd; border-radius: 8px; padding: 0.5rem;"
            >
              <div 
                v-for="item in demoVirtualItems" 
                :key="item.id"
                style="padding: 0.75rem; border-bottom: 1px solid #eee; cursor: pointer;"
                :style="{ background: item.selected ? '#e3f2fd' : 'white' }"
                @click="selectVirtualItem(item)"
              >
                <strong>{{ item.title }}</strong>
                <span style="color: #666; margin-left: 0.5rem; font-size: 0.9rem;">ID: {{ item.id }}</span>
              </div>
            </div>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 8: Calendar -->
    <div id="scenario-8">
      <ScenarioDoc
        title="8. Calendar with Events"
        description="Navigate days and weeks with arrow keys automatically!"
        :features="[
          'Arrow navigation through days',
          'Week navigation (7 days)',
          'Event count in labels',
          'Selected day indicator'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus calendar' },
          { keys: ['→', '←'], action: 'Next/previous day (automatic)' },
          { keys: ['↓', '↑'], action: 'Next/previous week (automatic)' },
          { keys: ['Home', 'End'], action: 'Start/end of month' },
          { keys: ['Enter'], action: 'Select day' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="calendarTemplateCode"
        :scriptCode="calendarScriptCode"
        :notes="[
          'Directive handles calendar grid navigation automatically',
          '<code>aria-label</code> can include event count',
          'No need for complex date navigation logic'
        ]"
      >
        <template #demo>
          <div style="max-width: 600px;">
            <div v-a11y-announce="calendarAnnouncement"></div>
            
            <div 
              class="calendar-grid"
              v-a11y-keyboard="calendarKeyboard" 
              tabindex="0"
              style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; padding: 1rem; background: white; border: 1px solid #ddd; border-radius: 8px;"
            >
              <div 
                v-for="day in demoDays" 
                :key="day.date"
                v-a11y-aria="{ 
                  label: 'Day ' + day.date + (day.events.length ? ', ' + day.events.length + ' events' : ''),
                  selected: day.isSelected
                }"
                @click="selectDay(day)"
                style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; position: relative;"
                :style="{ 
                  background: day.isSelected ? '#2196f3' : (day.events.length ? '#e3f2fd' : 'white'),
                  color: day.isSelected ? 'white' : '#333',
                  fontWeight: day.isSelected || day.events.length ? 'bold' : 'normal'
                }"
              >
                <span>{{ day.date }}</span>
                <span 
                  v-if="day.events.length" 
                  style="position: absolute; top: 2px; right: 4px; font-size: 0.7rem; background: #ff9800; color: white; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;"
                >
                  {{ day.events.length }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 9: Chat -->
    <div id="scenario-9">
      <ScenarioDoc
        title="9. Real-time Chat"
        description="Navigate conversations and messages with arrow keys!"
        :features="[
          'Chat list navigation automatic',
          'Message history navigation',
          'Accessible labels with unread counts',
          'Button labels for actions'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Focus chat list' },
          { keys: ['↓', '↑'], action: 'Navigate chats (automatic)' },
          { keys: ['Enter'], action: 'Open chat' },
          { keys: ['Ctrl', 'Enter'], action: 'Send message' }
        ]"
        :directives="['v-a11y-keyboard', 'v-a11y-aria', 'v-a11y-announce']"
        :templateCode="chatTemplateCode"
        :scriptCode="chatScriptCode"
        :notes="[
          'Directive handles chat list navigation automatically',
          'Labels can include dynamic data like unread counts',
          'Ctrl+Enter for sending works automatically'
        ]"
      >
        <template #demo>
          <div style="max-width: 600px;">
            <div v-a11y-announce="chatAnnouncement"></div>
            
            <div style="display: flex; gap: 1rem; height: 400px; background: white; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
              <!-- Chat list -->
              <div 
                class="chat-list" 
                v-a11y-keyboard="chatKeyboard" 
                tabindex="0"
                style="width: 200px; border-right: 1px solid #ddd; overflow-y: auto;"
              >
                <div 
                  v-for="chat in demoChats" 
                  :key="chat.id"
                  v-a11y-aria="{ 
                    label: chat.name + (chat.unread ? ', ' + chat.unread + ' unread messages' : '')
                  }"
                  @click="selectChat(chat)"
                  style="padding: 1rem; cursor: pointer; border-bottom: 1px solid #eee; position: relative;"
                  :style="{ background: chat.isActive ? '#e3f2fd' : 'white' }"
                >
                  <strong style="display: block; margin-bottom: 0.25rem;">{{ chat.name }}</strong>
                  <span style="font-size: 0.85rem; color: #666;">{{ chat.lastMessage }}</span>
                  <span 
                    v-if="chat.unread" 
                    style="position: absolute; top: 0.5rem; right: 0.5rem; background: #f44336; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;"
                  >
                    {{ chat.unread }}
                  </span>
                </div>
              </div>
              
              <!-- Messages -->
              <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1; padding: 1rem; overflow-y: auto;">
                  <p v-if="!selectedChat" style="color: #999; text-align: center; padding: 2rem;">Select a chat to view messages</p>
                  <div v-else>
                    <h3 style="margin: 0 0 1rem 0;">{{ selectedChat.name }}</h3>
                    <p style="color: #666;">Chat conversation would appear here...</p>
                  </div>
                </div>
                
                <!-- Input -->
                <div style="padding: 1rem; border-top: 1px solid #ddd; display: flex; gap: 0.5rem;">
                  <input 
                    v-model="demoMessage"
                    v-a11y-aria="{ label: 'Type a message' }"
                    placeholder="Type a message..." 
                    style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"
                    @keydown.ctrl.enter="sendMessage"
                  />
                  <button 
                    v-a11y-aria="{ label: 'Send message' }"
                    @click="sendMessage"
                    style="padding: 0.5rem 1rem; border: none; background: #2196f3; color: white; border-radius: 4px; cursor: pointer;"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ScenarioDoc>
    </div>

    <div class="scenario-divider"></div>

    <!-- Scenario 10: Dynamic Form -->
    <div id="scenario-10">
      <ScenarioDoc
        title="10. Dynamic Form Builder"
        description="Labels, required, invalid - all handled by the directive!"
        :features="[
          'aria-label without label tags',
          'aria-required automatic',
          'aria-invalid for errors',
          'Works with all input types'
        ]"
        :keyboardShortcuts="[
          { keys: ['Tab'], action: 'Navigate form fields' }
        ]"
        :directives="['v-a11y-aria', 'v-a11y-announce']"
        :templateCode="dynamicFormTemplateCode"
        :scriptCode="dynamicFormScriptCode"
        :notes="[
          'No <code>&lt;label&gt;</code> elements needed - use <code>v-a11y-aria</code>',
          '<code>aria-required</code> and <code>aria-invalid</code> set automatically',
          'Error announcements via <code>v-a11y-announce</code>'
        ]"
      >
        <template #demo>
          <div style="max-width: 500px;">
            <div v-a11y-announce="dynamicFormAnnouncement"></div>
            
            <form 
              @submit.prevent="submitDynamicForm"
              style="padding: 1.5rem; background: white; border: 1px solid #ddd; border-radius: 8px;"
            >
              <h3 style="margin: 0 0 1rem 0;">Dynamic Form Builder</h3>
              
              <div 
                v-for="field in demoFormFields" 
                :key="field.name"
                style="margin-bottom: 1rem;"
              >
                <input
                  v-if="field.type === 'text' || field.type === 'email'"
                  v-model="demoFormValues[field.name]"
                  v-a11y-aria="{ 
                    label: field.label,
                    required: field.required,
                    invalid: field.error
                  }"
                  :type="field.type"
                  :placeholder="field.label"
                  style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"
                  :style="{ borderColor: field.error ? '#f44336' : '#ddd' }"
                  @blur="validateField(field)"
                />
                
                <select
                  v-if="field.type === 'select'"
                  v-model="demoFormValues[field.name]"
                  v-a11y-aria="{ 
                    label: field.label,
                    required: field.required
                  }"
                  style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"
                >
                  <option value="">Select {{ field.label }}</option>
                  <option v-for="opt in field.options" :key="opt" :value="opt">
                    {{ opt }}
                  </option>
                </select>
                
                <textarea
                  v-if="field.type === 'textarea'"
                  v-model="demoFormValues[field.name]"
                  v-a11y-aria="{ 
                    label: field.label,
                    required: field.required
                  }"
                  :placeholder="field.label"
                  rows="3"
                  style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"
                ></textarea>
                
                <span v-if="field.error" style="display: block; color: #f44336; font-size: 0.85rem; margin-top: 0.25rem;">
                  {{ field.errorMessage }}
                </span>
              </div>
              
              <button 
                type="submit"
                style="width: 100%; padding: 0.75rem; border: none; background: #4caf50; color: white; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 500;"
              >
                Submit Form
              </button>
            </form>
          </div>
        </template>
      </ScenarioDoc>
    </div>

  </div>
</template>

<script>
import ScenarioDoc from '../components/ScenarioDoc.vue'
import { keyboardDirective, ariaDirective, announceDirective } from '../../../src/index.js'

export default {
  name: 'ScenariosDocumentation',
  components: {
    ScenarioDoc
  },
  directives: {
    'a11y-keyboard': keyboardDirective,
    'a11y-aria': ariaDirective,
    'a11y-announce': announceDirective
  },
  data() {
    return {
      // Navigation Menu Data
      menuAnnouncement: '',
      activeMenuItem: 0,
      expandedMenus: [],
      menuItems: [
        {
          id: 1,
          label: 'Home',
          icon: '🏠'
        },
        {
          id: 2,
          label: 'Products',
          badge: '12',
          children: [
            { id: 21, label: 'Electronics' },
            { 
              id: 22, 
              label: 'Clothing',
              children: [
                { id: 221, label: 'Men' },
                { id: 222, label: 'Women' },
                { id: 223, label: 'Kids', disabled: true }
              ]
            },
            { id: 23, label: 'Books' }
          ]
        },
        {
          id: 3,
          label: 'Services',
          disabled: true
        },
        {
          id: 4,
          label: 'About',
          children: [
            { id: 41, label: 'Company' },
            { id: 42, label: 'Team' }
          ]
        }
      ],

      // Code examples
      navigationTemplateCode: `<template>
  <!-- Announcement area for screen readers -->
  <div v-a11y-announce="announcement"></div>
  
  <!-- Simple navigation - directive handles keyboard navigation! -->
  <nav>
    <ul v-a11y-keyboard="true" tabindex="0">
      <li v-for="item in menuItems" :key="item.id">
        <button
          v-a11y-aria="{
            expanded: item.isOpen,
            disabled: item.disabled
          }"
          :disabled="item.disabled"
          @click="item.isOpen = !item.isOpen"
        >
          {{ item.label }}
          <span v-if="item.badge">{{ item.badge }}</span>
        </button>
        
        <!-- Nested submenu -->
        <ul v-if="item.isOpen && item.children">
          <li v-for="child in item.children" :key="child.id">
            <button :disabled="child.disabled">
              {{ child.label }}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>`,

      navigationScriptCode: `export default {
  data() {
    return {
      announcement: '',
      menuItems: [
        { id: 1, label: 'Home', isOpen: false },
        { 
          id: 2, 
          label: 'Products',
          badge: '12',
          isOpen: false,
          children: [
            { id: 21, label: 'Electronics' },
            { id: 22, label: 'Clothing' }
          ]
        },
        { id: 3, label: 'Services', disabled: true, isOpen: false }
      ]
    }
  }
  // That's it! No methods or computed properties needed.
  // The v-a11y-keyboard directive handles all navigation automatically!
}`,

      // Scenario 2: Data Table
      tableFilter: '',
      tableTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <table v-a11y-keyboard="true" tabindex="0">
      <thead>
        <tr>
          <th v-a11y-aria="{ sort: 'ascending' }">Name</th>
          <th v-a11y-aria="{ sort: 'none' }">Email</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>`,

      tableScriptCode: `export default {
  data() {
    return {
      announcement: '',
      employees: [
        { id: 1, name: 'Alice', email: 'alice@example.com', department: 'Engineering' },
        { id: 2, name: 'Bob', email: 'bob@example.com', department: 'Marketing' }
      ]
    }
  }
}`,

      // Scenario 3: Multi-Step Form
      formTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <!-- Progress bar - valuenow updates automatically! -->
    <div 
      v-a11y-aria="{ 
        valuenow: currentStep, 
        valuemin: 1, 
        valuemax: 3 
      }"
      role="progressbar"
    >
      Step {{ currentStep }} of 3
    </div>
    
    <!-- Form fields - no label tags needed! -->
    <div v-if="currentStep === 1">
      <input 
        v-model="formData.name"
        v-a11y-aria="{ label: 'Full Name', required: true }"
      />
      <input 
        v-model="formData.email"
        v-a11y-aria="{ label: 'Email Address', required: true }"
      />
    </div>
    
    <button @click="currentStep++">Next</button>
  </div>
</template>`,

      formScriptCode: `export default {
  data() {
    return {
      announcement: '',
      currentStep: 1,
      formData: {
        name: '',
        email: '',
        phone: ''
      }
    }
  }
}`,

      // Scenario 4: Accordion
      accordionTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <div v-a11y-keyboard="true" tabindex="0">
      <div v-for="section in sections" :key="section.id">
        <button 
          v-a11y-aria="{ expanded: section.isOpen }"
          @click="section.isOpen = !section.isOpen"
        >
          {{ section.title }}
        </button>
        
        <div v-if="section.isOpen">
          <p>{{ section.content }}</p>
          <label v-a11y-aria="{ label: section.checkboxLabel }">
            <input type="checkbox" v-model="section.checked" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>`,

      accordionScriptCode: `export default {
  data() {
    return {
      announcement: '',
      sections: [
        { 
          id: 1, 
          title: 'Section 1', 
          content: 'Content...', 
          isOpen: false,
          checked: false,
          checkboxLabel: 'I agree to terms'
        }
      ]
    }
  }
}`,

      // Scenario 5: Dashboard
      dashboardTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <div class="dashboard" v-a11y-keyboard="true" tabindex="0">
      <div 
        v-for="widget in widgets" 
        :key="widget.id"
        class="widget"
      >
        <h3>{{ widget.title }}</h3>
        <p>{{ widget.value }}</p>
        <button v-a11y-aria="{ label: 'Edit ' + widget.title }">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>`,

      dashboardScriptCode: `export default {
  data() {
    return {
      announcement: '',
      widgets: [
        { id: 1, title: 'Sales', value: '$12,345', editable: true },
        { id: 2, title: 'Users', value: '1,234', editable: true }
      ]
    }
  }
}`,

      // Scenario 6: Tree View
      treeTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <ul v-a11y-keyboard="true" tabindex="0" role="tree">
      <li 
        v-for="node in treeData" 
        :key="node.id"
        role="treeitem"
        v-a11y-aria="{ 
          expanded: node.isExpanded,
          selected: node.isSelected
        }"
      >
        {{ node.label }}
        <ul v-if="node.children && node.isExpanded">
          <li 
            v-for="child in node.children" 
            :key="child.id"
            v-a11y-aria="{ selected: child.isSelected }"
          >
            {{ child.label }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>`,

      treeScriptCode: `export default {
  data() {
    return {
      announcement: '',
      treeData: [
        { 
          id: 1, 
          label: 'Folder 1', 
          isExpanded: false,
          isSelected: false,
          children: [
            { id: 11, label: 'File 1.1', isSelected: false }
          ]
        }
      ]
    }
  }
}`,

      // Scenario 7: Virtual List
      virtualListTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <div 
      class="virtual-list"
      v-a11y-keyboard="true" 
      tabindex="0"
    >
      <div 
        v-for="item in items" 
        :key="item.id"
        class="list-item"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>`,

      virtualListScriptCode: `export default {
  data() {
    return {
      announcement: '',
      items: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        title: \`Item \${i + 1}\`
      }))
    }
  }
}`,

      // Scenario 8: Calendar
      calendarTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <div class="calendar" v-a11y-keyboard="true" tabindex="0">
      <div 
        v-for="day in days" 
        :key="day.date"
        class="day"
        v-a11y-aria="{ 
          label: day.date + (day.events.length ? ', ' + day.events.length + ' events' : ''),
          selected: day.isSelected
        }"
        @click="selectDay(day)"
      >
        {{ day.date }}
        <span v-if="day.events.length">{{ day.events.length }}</span>
      </div>
    </div>
  </div>
</template>`,

      calendarScriptCode: `export default {
  data() {
    return {
      announcement: '',
      days: Array.from({ length: 30 }, (_, i) => ({
        date: i + 1,
        events: [],
        isSelected: false
      }))
    }
  },
  methods: {
    selectDay(day) {
      this.days.forEach(d => d.isSelected = false)
      day.isSelected = true
    }
  }
}`,

      // Scenario 9: Chat
      chatTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <div class="chat-list" v-a11y-keyboard="true" tabindex="0">
      <div 
        v-for="chat in chats" 
        :key="chat.id"
        class="chat-item"
        v-a11y-aria="{ 
          label: chat.name + (chat.unread ? ', ' + chat.unread + ' unread' : '')
        }"
      >
        <strong>{{ chat.name }}</strong>
        <span v-if="chat.unread">{{ chat.unread }}</span>
      </div>
    </div>
    
    <div class="message-input">
      <input v-model="message" placeholder="Type a message..." />
      <button v-a11y-aria="{ label: 'Send message' }">Send</button>
    </div>
  </div>
</template>`,

      chatScriptCode: `export default {
  data() {
    return {
      announcement: '',
      message: '',
      chats: [
        { id: 1, name: 'Alice', unread: 3 },
        { id: 2, name: 'Bob', unread: 0 }
      ]
    }
  }
}`,

      // Scenario 10: Dynamic Form
      dynamicFormTemplateCode: `<template>
  <div>
    <div v-a11y-announce="announcement"></div>
    
    <form>
      <div v-for="field in formFields" :key="field.name">
        <input
          v-if="field.type === 'text'"
          v-model="formValues[field.name]"
          v-a11y-aria="{ 
            label: field.label,
            required: field.required,
            invalid: field.error
          }"
        />
        <select
          v-if="field.type === 'select'"
          v-model="formValues[field.name]"
          v-a11y-aria="{ 
            label: field.label,
            required: field.required
          }"
        >
          <option v-for="opt in field.options" :key="opt">
            {{ opt }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>`,

      dynamicFormScriptCode: `export default {
  data() {
    return {
      announcement: '',
      formValues: {},
      formFields: [
        { 
          name: 'username', 
          type: 'text', 
          label: 'Username', 
          required: true,
          error: false
        },
        { 
          name: 'country', 
          type: 'select', 
          label: 'Country', 
          required: false,
          options: ['USA', 'Canada', 'UK']
        }
      ]
    }
  }
}`,

      // Demo data
      tableAnnouncement: '',
      tableFocusIndex: 0,
      employees: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', selected: false },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', selected: false },
        { id: 3, name: 'Carol Williams', email: 'carol@example.com', department: 'Sales', selected: false },
        { id: 4, name: 'David Brown', email: 'david@example.com', department: 'Engineering', selected: false },
        { id: 5, name: 'Eve Davis', email: 'eve@example.com', department: 'HR', selected: false }
      ],
      
      formAnnouncement: '',
      demoCurrentStep: 1,
      demoFormData: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      
      accordionAnnouncement: '',
      accordionFocusIndex: 0,
      demoSections: [
        { 
          id: 1, 
          title: 'Personal Information', 
          content: 'Please review your personal details and confirm they are correct.', 
          isOpen: false,
          checked: false,
          checkboxLabel: 'I confirm my information is accurate'
        },
        { 
          id: 2, 
          title: 'Privacy Settings', 
          content: 'Manage how your data is used and shared with third parties.', 
          isOpen: false,
          checked: false,
          checkboxLabel: 'I agree to the privacy policy'
        },
        { 
          id: 3, 
          title: 'Notifications', 
          content: 'Choose which notifications you would like to receive via email.', 
          isOpen: false,
          checked: false,
          checkboxLabel: 'Enable email notifications'
        }
      ],
      
      dashboardAnnouncement: '',
      demoWidgets: [
        { id: 1, title: 'Total Sales', value: '$12,345', editable: true },
        { id: 2, title: 'Active Users', value: '1,234', editable: true },
        { id: 3, title: 'Pending Orders', value: '56', editable: true },
        { id: 4, title: 'Revenue Growth', value: '+15%', editable: true }
      ],
      
      treeAnnouncement: '',
      demoTreeData: [
        { 
          id: 1, 
          label: 'Projects', 
          isExpanded: false,
          isSelected: false,
          children: [
            { id: 11, label: 'Website Redesign', isSelected: false },
            { id: 12, label: 'Mobile App', isSelected: false }
          ]
        },
        { 
          id: 2, 
          label: 'Documents', 
          isExpanded: false,
          isSelected: false,
          children: [
            { id: 21, label: 'Reports.docx', isSelected: false },
            { id: 22, label: 'Budget.xlsx', isSelected: false }
          ]
        }
      ],
      
      virtualListAnnouncement: '',
      virtualListFocusIndex: 0,
      demoVirtualItems: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        selected: false
      })),
      
      calendarAnnouncement: '',
      calendarFocusIndex: 0,
      demoDays: [
        ...Array.from({ length: 30 }, (_, i) => ({
          date: i + 1,
          events: i % 5 === 0 ? [{ title: 'Meeting' }] : [],
          isSelected: false
        }))
      ],
      
      chatAnnouncement: '',
      chatFocusIndex: 0,
      demoMessage: '',
      selectedChat: null,
      demoChats: [
        { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?', unread: 3, isActive: false },
        { id: 2, name: 'Bob', lastMessage: 'Thanks for the help!', unread: 0, isActive: false },
        { id: 3, name: 'Carol', lastMessage: 'See you tomorrow', unread: 1, isActive: false },
        { id: 4, name: 'David', lastMessage: 'Great work on the project', unread: 0, isActive: false }
      ],
      
      dynamicFormAnnouncement: '',
      demoFormValues: {},
      demoFormFields: [
        { 
          name: 'username', 
          type: 'text', 
          label: 'Username', 
          required: true,
          error: false,
          errorMessage: ''
        },
        { 
          name: 'email', 
          type: 'email', 
          label: 'Email Address', 
          required: true,
          error: false,
          errorMessage: ''
        },
        { 
          name: 'country', 
          type: 'select', 
          label: 'Country', 
          required: false,
          options: ['USA', 'Canada', 'UK', 'Germany', 'France']
        },
        { 
          name: 'bio', 
          type: 'textarea', 
          label: 'Bio', 
          required: false
        }
      ]
    }
  },
  computed: {
    filteredEmployees() {
      if (!this.tableFilter) return this.employees
      const filter = this.tableFilter.toLowerCase()
      return this.employees.filter(emp => 
        emp.name.toLowerCase().includes(filter) ||
        emp.email.toLowerCase().includes(filter) ||
        emp.department.toLowerCase().includes(filter)
      )
    },
    navKeyboardHandlers() {
      return {
        arrowDown: () => this.navigateMenu('next'),
        arrowUp: () => this.navigateMenu('prev'),
        arrowRight: () => this.expandCurrentMenu(),
        arrowLeft: () => this.collapseCurrentMenu(),
        enter: () => this.activateMenuItem(),
        escape: () => this.closeAllMenus(),
        home: () => this.navigateMenu('first'),
        end: () => this.navigateMenu('last')
      }
    },
    flatMenuItems() {
      const flatten = (items, parentDisabled = false) => {
        return items.reduce((acc, item) => {
          const isDisabled = item.disabled || parentDisabled
          acc.push({ ...item, disabled: isDisabled })
          if (item.children && this.expandedMenus.includes(item.id)) {
            acc.push(...flatten(item.children, isDisabled))
          }
          return acc
        }, [])
      }
      return flatten(this.menuItems)
    },
    
    virtualListKeyboard() {
      return {
        arrowDown: () => {
          if (this.virtualListFocusIndex < this.demoVirtualItems.length - 1) {
            this.virtualListFocusIndex++
            this.selectVirtualItem(this.demoVirtualItems[this.virtualListFocusIndex])
          }
        },
        arrowUp: () => {
          if (this.virtualListFocusIndex > 0) {
            this.virtualListFocusIndex--
            this.selectVirtualItem(this.demoVirtualItems[this.virtualListFocusIndex])
          }
        },
        home: () => {
          this.virtualListFocusIndex = 0
          this.selectVirtualItem(this.demoVirtualItems[0])
        },
        end: () => {
          this.virtualListFocusIndex = this.demoVirtualItems.length - 1
          this.selectVirtualItem(this.demoVirtualItems[this.virtualListFocusIndex])
        }
      }
    },
    
    calendarKeyboard() {
      return {
        arrowRight: () => {
          if (this.calendarFocusIndex < this.demoDays.length - 1) {
            this.calendarFocusIndex++
            this.selectDay(this.demoDays[this.calendarFocusIndex])
          }
        },
        arrowLeft: () => {
          if (this.calendarFocusIndex > 0) {
            this.calendarFocusIndex--
            this.selectDay(this.demoDays[this.calendarFocusIndex])
          }
        },
        arrowDown: () => {
          if (this.calendarFocusIndex + 7 < this.demoDays.length) {
            this.calendarFocusIndex += 7
            this.selectDay(this.demoDays[this.calendarFocusIndex])
          }
        },
        arrowUp: () => {
          if (this.calendarFocusIndex - 7 >= 0) {
            this.calendarFocusIndex -= 7
            this.selectDay(this.demoDays[this.calendarFocusIndex])
          }
        },
        home: () => {
          this.calendarFocusIndex = 0
          this.selectDay(this.demoDays[0])
        },
        end: () => {
          this.calendarFocusIndex = this.demoDays.length - 1
          this.selectDay(this.demoDays[this.calendarFocusIndex])
        }
      }
    },
    
    chatKeyboard() {
      return {
        arrowDown: () => {
          if (this.chatFocusIndex < this.demoChats.length - 1) {
            this.chatFocusIndex++
            this.selectChat(this.demoChats[this.chatFocusIndex])
          }
        },
        arrowUp: () => {
          if (this.chatFocusIndex > 0) {
            this.chatFocusIndex--
            this.selectChat(this.demoChats[this.chatFocusIndex])
          }
        },
        enter: () => {
          if (this.demoChats[this.chatFocusIndex]) {
            this.selectChat(this.demoChats[this.chatFocusIndex])
          }
        }
      }
    },
    
    tableKeyboard() {
      return {
        arrowDown: () => {
          const filtered = this.filteredEmployees
          if (this.tableFocusIndex < filtered.length - 1) {
            this.tableFocusIndex++
            this.selectEmployee(filtered[this.tableFocusIndex])
          }
        },
        arrowUp: () => {
          const filtered = this.filteredEmployees
          if (this.tableFocusIndex > 0) {
            this.tableFocusIndex--
            this.selectEmployee(filtered[this.tableFocusIndex])
          }
        },
        enter: () => {
          const filtered = this.filteredEmployees
          if (filtered[this.tableFocusIndex]) {
            this.selectEmployee(filtered[this.tableFocusIndex])
          }
        }
      }
    },
    
    accordionKeyboard() {
      return {
        arrowDown: () => {
          if (this.accordionFocusIndex < this.demoSections.length - 1) {
            this.accordionFocusIndex++
            this.accordionAnnouncement = `Focused on ${this.demoSections[this.accordionFocusIndex].title}`
          }
        },
        arrowUp: () => {
          if (this.accordionFocusIndex > 0) {
            this.accordionFocusIndex--
            this.accordionAnnouncement = `Focused on ${this.demoSections[this.accordionFocusIndex].title}`
          }
        },
        enter: () => {
          const section = this.demoSections[this.accordionFocusIndex]
          if (section) {
            this.toggleSection(section)
          }
        }
      }
    }
  },
  methods: {
    navigateMenu(direction) {
      const items = this.flatMenuItems.filter(item => !item.disabled)
      const currentIndex = items.findIndex(
        item => item === this.flatMenuItems[this.activeMenuItem]
      )
      
      let newIndex
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % items.length
      } else if (direction === 'prev') {
        newIndex = (currentIndex - 1 + items.length) % items.length
      } else if (direction === 'first') {
        newIndex = 0
      } else if (direction === 'last') {
        newIndex = items.length - 1
      }
      
      const newItem = items[newIndex]
      this.activeMenuItem = this.flatMenuItems.findIndex(item => item === newItem)
      this.menuAnnouncement = `${newItem.label}${newItem.badge ? ', ' + newItem.badge + ' items' : ''}`
    },
    expandCurrentMenu() {
      const currentItem = this.flatMenuItems[this.activeMenuItem]
      if (currentItem.children && !this.expandedMenus.includes(currentItem.id)) {
        this.expandedMenus.push(currentItem.id)
        this.menuAnnouncement = `${currentItem.label} submenu expanded`
      }
    },
    collapseCurrentMenu() {
      const currentItem = this.flatMenuItems[this.activeMenuItem]
      if (currentItem.children && this.expandedMenus.includes(currentItem.id)) {
        this.expandedMenus = this.expandedMenus.filter(id => id !== currentItem.id)
        this.menuAnnouncement = `${currentItem.label} submenu collapsed`
      }
    },
    activateMenuItem() {
      const currentItem = this.flatMenuItems[this.activeMenuItem]
      if (!currentItem.disabled) {
        this.toggleMenu(currentItem.id)
      }
    },
    toggleMenu(id) {
      const item = this.flatMenuItems.find(i => i.id === id)
      if (item && item.children) {
        if (this.expandedMenus.includes(id)) {
          this.expandedMenus = this.expandedMenus.filter(menuId => menuId !== id)
          this.menuAnnouncement = `${item.label} collapsed`
        } else {
          this.expandedMenus.push(id)
          this.menuAnnouncement = `${item.label} expanded`
        }
      } else if (item && !item.disabled) {
        this.menuAnnouncement = `${item.label} selected`
      }
    },
    closeAllMenus() {
      this.expandedMenus = []
      this.menuAnnouncement = 'All menus closed'
    },
    setActiveMenuItem(index) {
      this.activeMenuItem = index
    },
    selectMenuItem(item) {
      this.menuAnnouncement = `${item.label} selected`
    },
    
    // Demo methods
    selectEmployee(employee) {
      this.employees.forEach(emp => emp.selected = false)
      employee.selected = true
      this.tableAnnouncement = `Selected ${employee.name} from ${employee.department}`
    },
    
    nextFormStep() {
      if (this.demoCurrentStep === 3) {
        this.formAnnouncement = 'Form submitted successfully!'
        this.demoCurrentStep = 1
        this.demoFormData = { name: '', email: '', phone: '', address: '' }
      } else {
        this.demoCurrentStep++
        this.formAnnouncement = `Moved to step ${this.demoCurrentStep}`
      }
    },
    
    toggleSection(section) {
      section.isOpen = !section.isOpen
      this.accordionAnnouncement = `${section.title} ${section.isOpen ? 'expanded' : 'collapsed'}`
    },
    
    editWidget(widget) {
      this.dashboardAnnouncement = `Editing ${widget.title} widget`
    },
    
    toggleTreeNode(node) {
      this.demoTreeData.forEach(n => n.isSelected = false)
      node.isSelected = true
      if (node.children) {
        node.isExpanded = !node.isExpanded
        this.treeAnnouncement = `${node.label} ${node.isExpanded ? 'expanded' : 'collapsed'}`
      } else {
        this.treeAnnouncement = `${node.label} selected`
      }
    },
    
    selectTreeNode(node) {
      this.demoTreeData.forEach(n => {
        n.isSelected = false
        if (n.children) {
          n.children.forEach(c => c.isSelected = false)
        }
      })
      node.isSelected = true
      this.treeAnnouncement = `${node.label} selected`
    },
    
    selectVirtualItem(item) {
      this.demoVirtualItems.forEach(i => i.selected = false)
      item.selected = true
      this.virtualListFocusIndex = this.demoVirtualItems.indexOf(item)
      this.virtualListAnnouncement = `Selected ${item.title}`
      
      // Scroll item into view
      this.$nextTick(() => {
        const container = document.querySelector('.virtual-list')
        const itemEl = container?.children[this.virtualListFocusIndex]
        if (itemEl) {
          itemEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
      })
    },
    
    selectDay(day) {
      this.demoDays.forEach(d => d.isSelected = false)
      day.isSelected = true
      this.calendarFocusIndex = this.demoDays.indexOf(day)
      const eventText = day.events.length ? ` with ${day.events.length} event${day.events.length > 1 ? 's' : ''}` : ''
      this.calendarAnnouncement = `Selected day ${day.date}${eventText}`
    },
    
    selectChat(chat) {
      this.demoChats.forEach(c => c.isActive = false)
      chat.isActive = true
      this.selectedChat = chat
      this.chatFocusIndex = this.demoChats.indexOf(chat)
      chat.unread = 0
      this.chatAnnouncement = `Opened chat with ${chat.name}`
    },
    
    sendMessage() {
      if (this.demoMessage.trim() && this.selectedChat) {
        this.chatAnnouncement = 'Message sent'
        this.demoMessage = ''
      }
    },
    
    validateField(field) {
      if (field.required && !this.demoFormValues[field.name]) {
        field.error = true
        field.errorMessage = `${field.label} is required`
        this.dynamicFormAnnouncement = `Error: ${field.label} is required`
      } else if (field.type === 'email' && this.demoFormValues[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.demoFormValues[field.name])) {
          field.error = true
          field.errorMessage = 'Please enter a valid email address'
          this.dynamicFormAnnouncement = 'Error: Invalid email format'
        } else {
          field.error = false
          field.errorMessage = ''
        }
      } else {
        field.error = false
        field.errorMessage = ''
      }
    },
    
    submitDynamicForm() {
      let hasErrors = false
      this.demoFormFields.forEach(field => {
        this.validateField(field)
        if (field.error) hasErrors = true
      })
      
      if (!hasErrors) {
        this.dynamicFormAnnouncement = 'Form submitted successfully!'
        this.demoFormValues = {}
        this.demoFormFields.forEach(field => {
          field.error = false
          field.errorMessage = ''
        })
      } else {
        this.dynamicFormAnnouncement = 'Please fix the errors before submitting'
      }
    }
  }
}
</script>

<style scoped>
.scenarios-documentation {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.page-intro {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.page-intro code {
  background: #f8f9fa;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  color: #e83e8c;
  font-family: monospace;
}

.table-of-contents {
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1.5rem;
  margin-bottom: 3rem;
  border-radius: 4px;
}

.table-of-contents h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.table-of-contents ol {
  margin: 0;
  padding-left: 1.5rem;
}

.table-of-contents li {
  margin: 0.5rem 0;
}

.table-of-contents a {
  color: #007bff;
  text-decoration: none;
  font-size: 1.1rem;
}

.table-of-contents a:hover {
  text-decoration: underline;
}

.scenario-divider {
  height: 3px;
  background: linear-gradient(to right, #007bff, transparent);
  margin: 4rem 0;
  border-radius: 2px;
}

/* Navigation Menu Styles for Demo */
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

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #2c3e50;
  border-radius: 8px;
  max-width: 400px;
}

.nav-menu:focus {
  outline: 3px solid #007bff;
  outline-offset: 2px;
}

.nav-menu button {
  width: 100%;
  text-align: left;
  padding: 1rem;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1rem;
}

.nav-menu button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.nav-menu button.active {
  background: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #007bff;
}

.nav-menu button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  text-decoration: line-through;
}

.badge {
  background: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8em;
  margin-left: 0.5rem;
}

.submenu {
  list-style: none;
  padding-left: 0;
  background: rgba(0, 0, 0, 0.2);
  margin: 0;
}

.submenu button {
  padding-left: 2rem;
}

.submenu-level-2 {
  list-style: none;
  padding-left: 0;
  background: rgba(0, 0, 0, 0.3);
  margin: 0;
}

.submenu-level-2 button {
  padding-left: 3rem;
}
</style>
