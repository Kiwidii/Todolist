// Kinder To-Do Liste Application
// Main JavaScript file

// Application State
const AppState = {
    children: [],
    favorites: [],
    settings: {
        defaultLanguage: 'de',
        enableSound: true,
        alarmSound: 'bell'
    },
    currentChildId: null,
    currentTaskId: null
};

// Language Translations
const translations = {
    de: {
        appTitle: 'Kinder To-Do Liste',
        addChild: 'Kind hinzufügen',
        settings: 'Einstellungen',
        name: 'Name',
        nickname: 'Spitzname',
        language: 'Sprache',
        color: 'Farbe',
        add: 'Hinzufügen',
        cancel: 'Abbrechen',
        save: 'Speichern',
        close: 'Schließen',
        delete: 'Löschen',
        taskName: 'Taskname',
        taskDescription: 'Beschreibung',
        taskType: 'Typ',
        mandatory: 'Pflicht',
        voluntary: 'Freiwillig',
        reminderType: 'Erinnerungstyp',
        none: 'Keine',
        fixedTime: 'Feste Zeit',
        deadline: 'Deadline',
        fixedTimeLabel: 'Feste Zeit',
        deadlineLabel: 'Deadline',
        repetition: 'Wiederholung',
        weekdays: 'Wochentage',
        noRepeat: 'Nicht wiederholen',
        dependencies: 'Abhängigkeiten',
        dependentOn: 'Abhängig von',
        noDependency: 'Keine Abhängigkeit',
        favorite: 'Favorit',
        markAsFavorite: 'Als Favorit markieren',
        favorites: 'Lieblingstasks',
        taskDetails: 'Task-Details',
        defaultLanguage: 'Standardsprache',
        enableAlarms: 'Alarme aktivieren',
        alarmSound: 'Alarmton',
        bell: 'Glocke',
        beep: 'Piepton',
        chime: 'Klang',
        monday: 'Montag',
        tuesday: 'Dienstag',
        wednesday: 'Mittwoch',
        thursday: 'Donnerstag',
        friday: 'Freitag',
        saturday: 'Samstag',
        sunday: 'Sonntag',
        completed: 'Erledigt',
        notCompleted: 'Nicht erledigt',
        locked: 'Gesperrt',
        unlocksAfter: 'Wird freigeschaltet nach',
        noTasks: 'Keine Tasks für heute',
        allTasksCompleted: 'Alle Tasks erledigt!',
        notifications: {
            childAdded: 'Kind hinzugefügt',
            childDeleted: 'Kind gelöscht',
            taskAdded: 'Task hinzugefügt',
            taskDeleted: 'Task gelöscht',
            taskCompleted: 'Task erledigt',
            settingsSaved: 'Einstellungen gespeichert'
        }
    },
    en: {
        appTitle: 'Children To-Do List',
        addChild: 'Add Child',
        settings: 'Settings',
        name: 'Name',
        nickname: 'Nickname',
        language: 'Language',
        color: 'Color',
        add: 'Add',
        cancel: 'Cancel',
        save: 'Save',
        close: 'Close',
        delete: 'Delete',
        taskName: 'Task Name',
        taskDescription: 'Description',
        taskType: 'Type',
        mandatory: 'Mandatory',
        voluntary: 'Voluntary',
        reminderType: 'Reminder Type',
        none: 'None',
        fixedTime: 'Fixed Time',
        deadline: 'Deadline',
        fixedTimeLabel: 'Fixed Time',
        deadlineLabel: 'Deadline',
        repetition: 'Repetition',
        weekdays: 'Weekdays',
        noRepeat: 'Do not repeat',
        dependencies: 'Dependencies',
        dependentOn: 'Depends on',
        noDependency: 'No dependency',
        favorite: 'Favorite',
        markAsFavorite: 'Mark as favorite',
        favorites: 'Favorite Tasks',
        taskDetails: 'Task Details',
        defaultLanguage: 'Default Language',
        enableAlarms: 'Enable Alarms',
        alarmSound: 'Alarm Sound',
        bell: 'Bell',
        beep: 'Beep',
        chime: 'Chime',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        completed: 'Completed',
        notCompleted: 'Not completed',
        locked: 'Locked',
        unlocksAfter: 'Unlocks after',
        noTasks: 'No tasks for today',
        allTasksCompleted: 'All tasks completed!',
        notifications: {
            childAdded: 'Child added',
            childDeleted: 'Child deleted',
            taskAdded: 'Task added',
            taskDeleted: 'Task deleted',
            taskCompleted: 'Task completed',
            settingsSaved: 'Settings saved'
        }
    },
    fr: {
        appTitle: "Liste de tâches pour enfants",
        addChild: "Ajouter un enfant",
        settings: "Paramètres",
        name: "Nom",
        nickname: "Surnom",
        language: "Langue",
        color: "Couleur",
        add: "Ajouter",
        cancel: "Annuler",
        save: "Sauvegarder",
        close: "Fermer",
        delete: "Supprimer",
        taskName: "Nom de la tâche",
        taskDescription: "Description",
        taskType: "Type",
        mandatory: "Obligatoire",
        voluntary: "Facultatif",
        reminderType: "Type de rappel",
        none: "Aucun",
        fixedTime: "Heure fixe",
        deadline: "Date limite",
        fixedTimeLabel: "Heure fixe",
        deadlineLabel: "Date limite",
        repetition: "Répétition",
        weekdays: "Jours de la semaine",
        noRepeat: "Ne pas répéter",
        dependencies: "Dépendances",
        dependentOn: "Dépend de",
        noDependency: "Aucune dépendance",
        favorite: "Favoris",
        markAsFavorite: "Marquer comme favori",
        favorites: "Tâches favorites",
        taskDetails: "Détails de la tâche",
        defaultLanguage: "Langue par défaut",
        enableAlarms: "Activer les alarmes",
        alarmSound: "Son d'alarme",
        bell: "Cloche",
        beep: "Bip",
        chime: "Carillon",
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        sunday: "Dimanche",
        completed: "Terminé",
        notCompleted: "Non terminé",
        locked: "Verrouillé",
        unlocksAfter: "Se débloque après",
        noTasks: "Aucune tâche pour aujourd'hui",
        allTasksCompleted: "Toutes les tâches terminées !",
        notifications: {
            childAdded: "Enfant ajouté",
            childDeleted: "Enfant supprimé",
            taskAdded: "Tâche ajoutée",
            taskDeleted: "Tâche supprimée",
            taskCompleted: "Tâche terminée",
            settingsSaved: "Paramètres enregistrés"
        }
    }
};

// DOM Elements
const elements = {
    childrenContainer: document.getElementById('children-container'),
    addChildBtn: document.getElementById('add-child-btn'),
    settingsBtn: document.getElementById('settings-btn'),
    addChildModal: document.getElementById('add-child-modal'),
    addTaskModal: document.getElementById('add-task-modal'),
    settingsModal: document.getElementById('settings-modal'),
    taskDetailsModal: document.getElementById('task-details-modal'),
    favoritesSidebar: document.getElementById('favorites-sidebar'),
    favoritesList: document.getElementById('favorites-list'),
    toggleFavorites: document.getElementById('toggle-favorites'),
    alarmSound: document.getElementById('alarm-sound')
};

// Initialize Application
function initApp() {
    loadData();
    setupEventListeners();
    updateUI();
    startAlarmChecker();
}

// Load Data from LocalStorage
function loadData() {
    const savedChildren = localStorage.getItem('todolist_children');
    const savedFavorites = localStorage.getItem('todolist_favorites');
    const savedSettings = localStorage.getItem('todolist_settings');

    if (savedChildren) {
        AppState.children = JSON.parse(savedChildren);
    }

    if (savedFavorites) {
        AppState.favorites = JSON.parse(savedFavorites);
    }

    if (savedSettings) {
        AppState.settings = { ...AppState.settings, ...JSON.parse(savedSettings) };
    }
}

// Save Data to LocalStorage
function saveData() {
    localStorage.setItem('todolist_children', JSON.stringify(AppState.children));
    localStorage.setItem('todolist_favorites', JSON.stringify(AppState.favorites));
    localStorage.setItem('todolist_settings', JSON.stringify(AppState.settings));
}

// Setup Event Listeners
function setupEventListeners() {
    // Header buttons
    elements.addChildBtn.addEventListener('click', () => openModal('add-child'));
    elements.settingsBtn.addEventListener('click', () => openModal('settings'));

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Add Child Modal
    document.getElementById('confirm-add-child').addEventListener('click', addChild);

    // Add Task Modal
    document.getElementById('confirm-add-task').addEventListener('click', addTask);

    // Settings Modal
    document.getElementById('save-settings').addEventListener('click', saveSettings);

    // Favorites Sidebar Toggle
    elements.toggleFavorites.addEventListener('click', toggleFavoritesSidebar);

    // Task Details Modal Delete Button
    document.getElementById('delete-task-btn').addEventListener('click', deleteTask);

    // Reminder Type Change
    document.getElementById('task-reminder-type').addEventListener('change', function() {
        const type = this.value;
        document.getElementById('fixed-time-group').style.display = type === 'fixed' ? 'block' : 'none';
        document.getElementById('deadline-group').style.display = type === 'deadline' ? 'block' : 'none';
    });

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

// Select Preset Weekdays
function selectPreset(preset) {
    const checkboxes = document.querySelectorAll('input[name="weekday"]');
    
    // Uncheck all first
    checkboxes.forEach(cb => cb.checked = false);
    
    // Check based on preset
    switch(preset) {
        case 'workdays':
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
                const checkbox = document.querySelector(`input[name="weekday"][value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
            break;
        case 'weekend':
            ['saturday', 'sunday'].forEach(day => {
                const checkbox = document.querySelector(`input[name="weekday"][value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
            break;
        case 'all':
            checkboxes.forEach(cb => cb.checked = true);
            break;
    }
}

}

// Open Modal
function openModal(modalName) {
    closeAllModals();
    
    switch(modalName) {
        case 'add-child':
            elements.addChildModal.classList.add('open');
            break;
        case 'add-task':
            prepareAddTaskModal();
            elements.addTaskModal.classList.add('open');
            break;
        case 'settings':
            prepareSettingsModal();
            elements.settingsModal.classList.add('open');
            break;
        case 'task-details':
            prepareTaskDetailsModal();
            elements.taskDetailsModal.classList.add('open');
            break;
    }
}

// Close All Modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('open');
    });
    AppState.currentChildId = null;
    AppState.currentTaskId = null;
}

// Toggle Favorites Sidebar
function toggleFavoritesSidebar() {
    elements.favoritesSidebar.classList.toggle('open');
    const icon = elements.toggleFavorites.querySelector('i');
    if (elements.favoritesSidebar.classList.contains('open')) {
        icon.className = 'fas fa-chevron-right';
    } else {
        icon.className = 'fas fa-chevron-left';
    }
}

// Add Child
function addChild() {
    const name = document.getElementById('child-name').value.trim();
    const nickname = document.getElementById('child-nickname').value.trim();
    const language = document.getElementById('child-language').value;
    const color = document.getElementById('child-color').value;

    if (!name) {
        showNotification('Please enter a name', 'error');
        return;
    }

    const newChild = {
        id: generateId(),
        name: name,
        nickname: nickname || name,
        language: language,
        color: color,
        tasks: []
    };

    AppState.children.push(newChild);
    saveData();
    updateUI();
    closeAllModals();
    showNotification(getTranslation('notifications.childAdded'));
}

// Add Task
function addTask() {
    const name = document.getElementById('task-name').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const type = document.getElementById('task-type').value;
    const reminderType = document.getElementById('task-reminder-type').value;
    const fixedTime = document.getElementById('task-fixed-time').value;
    const deadline = document.getElementById('task-deadline').value;
    const noRepeat = document.getElementById('task-no-repeat').checked;
    const dependency = document.getElementById('task-dependency').value;
    const isFavorite = document.getElementById('task-favorite').checked;

    // Get selected weekdays
    const weekdayCheckboxes = document.querySelectorAll('input[name="weekday"]:checked');
    const weekdays = Array.from(weekdayCheckboxes).map(cb => cb.value);

    if (!name) {
        showNotification('Please enter a task name', 'error');
        return;
    }

    if (!AppState.currentChildId) {
        showNotification('No child selected', 'error');
        return;
    }

    const child = AppState.children.find(c => c.id === AppState.currentChildId);
    if (!child) return;

    const newTask = {
        id: generateId(),
        name: name,
        description: description,
        type: type,
        reminderType: reminderType,
        fixedTime: reminderType === 'fixed' ? fixedTime : null,
        deadline: reminderType === 'deadline' ? deadline : null,
        weekdays: weekdays,
        noRepeat: noRepeat,
        dependency: dependency || null,
        isFavorite: isFavorite,
        completed: false,
        createdAt: new Date().toISOString()
    };

    child.tasks.push(newTask);

    // Add to favorites if marked as favorite
    if (isFavorite) {
        addToFavorites(newTask);
    }

    saveData();
    updateUI();
    closeAllModals();
    showNotification(getTranslation('notifications.taskAdded'));
}

// Add to Favorites
function addToFavorites(task) {
    // Check if task already exists in favorites (by name and description)
    const exists = AppState.favorites.some(f => 
        f.name === task.name && f.description === task.description
    );

    if (!exists) {
        const favoriteTask = {
            id: generateId(),
            name: task.name,
            description: task.description,
            type: task.type,
            reminderType: task.reminderType,
            fixedTime: task.fixedTime,
            deadline: task.deadline,
            weekdays: task.weekdays,
            noRepeat: task.noRepeat
        };
        AppState.favorites.push(favoriteTask);
        saveData();
    }
}

// Delete Task
function deleteTask() {
    if (!AppState.currentChildId || !AppState.currentTaskId) return;

    const child = AppState.children.find(c => c.id === AppState.currentChildId);
    if (!child) return;

    child.tasks = child.tasks.filter(task => task.id !== AppState.currentTaskId);
    
    saveData();
    updateUI();
    closeAllModals();
    showNotification(getTranslation('notifications.taskDeleted'));
}

// Toggle Task Completion
function toggleTaskCompletion(childId, taskId) {
    const child = AppState.children.find(c => c.id === childId);
    if (!child) return;

    const task = child.tasks.find(t => t.id === taskId);
    if (!task) return;

    // Check if task is locked by dependency
    if (isTaskLocked(childId, taskId)) {
        showNotification('This task is locked by a dependency', 'error');
        return;
    }

    task.completed = !task.completed;
    
    // Update dependent tasks
    updateDependentTasks(childId);

    saveData();
    updateUI();
    showNotification(getTranslation('notifications.taskCompleted'));
}

// Check if Task is Locked by Dependency
function isTaskLocked(childId, taskId) {
    const child = AppState.children.find(c => c.id === childId);
    if (!child) return false;

    const task = child.tasks.find(t => t.id === taskId);
    if (!task || !task.dependency) return false;

    const dependencyTask = child.tasks.find(t => t.id === task.dependency);
    if (!dependencyTask) return false;

    return !dependencyTask.completed;
}

// Update Dependent Tasks
function updateDependentTasks(childId) {
    const child = AppState.children.find(c => c.id === childId);
    if (!child) return;

    // Find all tasks that depend on completed tasks
    child.tasks.forEach(task => {
        if (task.dependency) {
            const dependencyTask = child.tasks.find(t => t.id === task.dependency);
            if (dependencyTask && dependencyTask.completed) {
                // Dependency is completed, so this task should be unlocked
                // (No action needed as locked state is determined dynamically)
            }
        }
    });
}

// Prepare Add Task Modal
function prepareAddTaskModal() {
    // Reset form
    document.getElementById('add-task-form').reset();
    
    // Hide time fields initially
    document.getElementById('fixed-time-group').style.display = 'none';
    document.getElementById('deadline-group').style.display = 'none';
    
    // Set default weekday to current day
    const now = new Date();
    const currentWeekday = getWeekdayName(now.getDay()).toLowerCase();
    document.querySelectorAll(`input[name="weekday"]`).forEach(cb => {
        cb.checked = cb.value === currentWeekday;
    });
    
    // Populate dependency dropdown
    const dependencySelect = document.getElementById('task-dependency');
    dependencySelect.innerHTML = '<option value="">Keine Abhängigkeit</option>';
    
    if (AppState.currentChildId) {
        const child = AppState.children.find(c => c.id === AppState.currentChildId);
        if (child) {
            child.tasks.forEach(task => {
                if (task.id !== AppState.currentTaskId) {
                    const option = document.createElement('option');
                    option.value = task.id;
                    option.textContent = task.name;
                    dependencySelect.appendChild(option);
                }
            });
        }
    }
}

// Prepare Settings Modal
function prepareSettingsModal() {
    document.getElementById('default-language').value = AppState.settings.defaultLanguage;
    document.getElementById('enable-sound').checked = AppState.settings.enableSound;
    document.getElementById('alarm-sound').value = AppState.settings.alarmSound;
}

// Save Settings
function saveSettings() {
    AppState.settings.defaultLanguage = document.getElementById('default-language').value;
    AppState.settings.enableSound = document.getElementById('enable-sound').checked;
    AppState.settings.alarmSound = document.getElementById('alarm-sound').value;
    
    saveData();
    closeAllModals();
    showNotification(getTranslation('notifications.settingsSaved'));
    updateUI();
}

// Prepare Task Details Modal
function prepareTaskDetailsModal() {
    if (!AppState.currentChildId || !AppState.currentTaskId) return;

    const child = AppState.children.find(c => c.id === AppState.currentChildId);
    if (!child) return;

    const task = child.tasks.find(t => t.id === AppState.currentTaskId);
    if (!task) return;

    const content = document.getElementById('task-details-content');
    const lang = child.language;

    content.innerHTML = `
        <div class="form-group">
            <label>${getTranslation('taskName', lang)}:</label>
            <p>${task.name}</p>
        </div>
        <div class="form-group">
            <label>${getTranslation('taskDescription', lang)}:</label>
            <p>${task.description || '-'}</p>
        </div>
        <div class="form-group">
            <label>${getTranslation('taskType', lang)}:</label>
            <p>${task.type === 'mandatory' ? getTranslation('mandatory', lang) : getTranslation('voluntary', lang)}</p>
        </div>
        <div class="form-group">
            <label>${getTranslation('reminderType', lang)}:</label>
            <p>${getReminderTypeText(task.reminderType, lang)}</p>
        </div>
        ${task.reminderType === 'fixed' && task.fixedTime ? `
        <div class="form-group">
            <label>${getTranslation('fixedTimeLabel', lang)}:</label>
            <p>${task.fixedTime}</p>
        </div>
        ` : ''}
        ${task.reminderType === 'deadline' && task.deadline ? `
        <div class="form-group">
            <label>${getTranslation('deadlineLabel', lang)}:</label>
            <p>${task.deadline}</p>
        </div>
        ` : ''}
        <div class="form-group">
            <label>${getTranslation('weekdays', lang)}:</label>
            <p>${task.weekdays.map(day => getTranslation(day, lang)).join(', ')}</p>
        </div>
        <div class="form-group">
            <label>${getTranslation('noRepeat', lang)}:</label>
            <p>${task.noRepeat ? getTranslation('yes', lang) : getTranslation('no', lang)}</p>
        </div>
        ${task.dependency ? `
        <div class="form-group">
            <label>${getTranslation('dependentOn', lang)}:</label>
            <p>${getDependencyTaskName(child, task.dependency)}</p>
        </div>
        ` : ''}
        <div class="form-group">
            <label>${getTranslation('favorite', lang)}:</label>
            <p>${task.isFavorite ? getTranslation('yes', lang) : getTranslation('no', lang)}</p>
        </div>
    `;
}

// Helper function to get dependency task name
function getDependencyTaskName(child, dependencyId) {
    const task = child.tasks.find(t => t.id === dependencyId);
    return task ? task.name : 'Unknown';
}

// Helper function to get reminder type text
function getReminderTypeText(type, lang) {
    switch(type) {
        case 'none': return getTranslation('none', lang);
        case 'fixed': return getTranslation('fixedTime', lang);
        case 'deadline': return getTranslation('deadline', lang);
        default: return '';
    }
}

// Update UI
function updateUI() {
    updateChildrenColumns();
    updateFavoritesSidebar();
    updateLanguage();
}

// Update Children Columns
function updateChildrenColumns() {
    elements.childrenContainer.innerHTML = '';
    
    AppState.children.forEach(child => {
        const column = createChildColumn(child);
        elements.childrenContainer.appendChild(column);
    });

    // If no children, show a message
    if (AppState.children.length === 0) {
        const noChildren = document.createElement('div');
        noChildren.className = 'no-children';
        noChildren.textContent = 'Keine Kinder hinzugefügt. Klicken Sie auf "Kind hinzufügen" um zu beginnen.';
        elements.childrenContainer.appendChild(noChildren);
    }
}

// Create Child Column
function createChildColumn(child) {
    const column = document.createElement('div');
    column.className = 'child-column';
    column.dataset.color = child.color;
    column.dataset.id = child.id;

    // Child Header
    const header = document.createElement('div');
    header.className = 'child-header';

    const nameDisplay = document.createElement('div');
    nameDisplay.className = 'child-name';
    nameDisplay.textContent = child.nickname || child.name;

    const controls = document.createElement('div');
    controls.className = 'child-controls';

    // Add Task Button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.className = 'btn btn-small btn-primary';
    addTaskBtn.innerHTML = '<i class="fas fa-plus"></i>';
    addTaskBtn.title = getTranslation('add', child.language);
    addTaskBtn.addEventListener('click', () => {
        AppState.currentChildId = child.id;
        openModal('add-task');
    });

    // Delete Child Button
    const deleteChildBtn = document.createElement('button');
    deleteChildBtn.className = 'btn btn-small btn-danger';
    deleteChildBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteChildBtn.title = getTranslation('delete', child.language);
    deleteChildBtn.addEventListener('click', () => {
        deleteChild(child.id);
    });

    // Language Toggle
    const languageToggle = document.createElement('div');
    languageToggle.className = 'language-toggle';
    
    const languages = [
        { code: 'de', label: 'DE' },
        { code: 'en', label: 'EN' },
        { code: 'fr', label: 'FR' }
    ];

    languages.forEach(lang => {
        const langBtn = document.createElement('button');
        langBtn.textContent = lang.label;
        langBtn.className = child.language === lang.code ? 'active' : '';
        langBtn.addEventListener('click', () => {
            changeChildLanguage(child.id, lang.code);
        });
        languageToggle.appendChild(langBtn);
    });

    controls.appendChild(addTaskBtn);
    controls.appendChild(deleteChildBtn);
    controls.appendChild(languageToggle);

    header.appendChild(nameDisplay);
    header.appendChild(controls);

    // Task List
    const taskList = document.createElement('div');
    taskList.className = 'task-list';

    // Filter tasks for current day
    const currentWeekday = getCurrentWeekday();
    const todayTasks = child.tasks.filter(task => 
        task.weekdays.includes(currentWeekday) && !task.noRepeat
    );

    if (todayTasks.length === 0) {
        const noTasks = document.createElement('div');
        noTasks.className = 'no-tasks';
        noTasks.textContent = getTranslation('noTasks', child.language);
        taskList.appendChild(noTasks);
    } else {
        todayTasks.forEach(task => {
            const taskElement = createTaskElement(child, task);
            taskList.appendChild(taskElement);
        });
    }

    // Add Task Button (at bottom)
    const addTaskButton = document.createElement('button');
    addTaskButton.className = 'add-task-btn';
    addTaskButton.innerHTML = '<i class="fas fa-plus"></i> ' + getTranslation('add', child.language);
    addTaskButton.addEventListener('click', () => {
        AppState.currentChildId = child.id;
        openModal('add-task');
    });

    column.appendChild(header);
    column.appendChild(taskList);
    column.appendChild(addTaskButton);

    return column;
}

// Create Task Element
function createTaskElement(child, task) {
    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.type} ${task.completed ? 'completed' : ''} ${isTaskLocked(child.id, task.id) ? 'locked' : ''}`;
    taskElement.dataset.taskId = task.id;

    // Checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'task-checkbox';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        toggleTaskCompletion(child.id, task.id);
    });

    const taskName = document.createElement('span');
    taskName.className = 'task-name';
    taskName.textContent = task.name;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(taskName);

    // Description
    let descriptionElement = null;
    if (task.description) {
        descriptionElement = document.createElement('div');
        descriptionElement.className = 'task-description';
        descriptionElement.textContent = task.description;
    }

    // Meta Information
    const metaContainer = document.createElement('div');
    metaContainer.className = 'task-meta';

    const timeInfo = document.createElement('div');
    timeInfo.className = 'task-time';

    // Add time information based on reminder type
    if (task.reminderType === 'fixed' && task.fixedTime) {
        timeInfo.innerHTML = `<i class="fas fa-clock"></i> ${task.fixedTime}`;
    } else if (task.reminderType === 'deadline' && task.deadline) {
        timeInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> ${task.deadline}`;
    }

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'task-actions';

    // Favorite Button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = `favorite ${task.isFavorite ? 'active' : ''}`;
    favoriteBtn.innerHTML = '<i class="fas fa-star"></i>';
    favoriteBtn.title = getTranslation('favorite', child.language);
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(child.id, task.id);
    });

    // Details Button
    const detailsBtn = document.createElement('button');
    detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    detailsBtn.title = getTranslation('taskDetails', child.language);
    detailsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AppState.currentChildId = child.id;
        AppState.currentTaskId = task.id;
        openModal('task-details');
    });

    actionsContainer.appendChild(favoriteBtn);
    actionsContainer.appendChild(detailsBtn);

    metaContainer.appendChild(timeInfo);
    metaContainer.appendChild(actionsContainer);

    // Dependency Info
    let dependencyInfo = null;
    if (task.dependency) {
        dependencyInfo = document.createElement('div');
        dependencyInfo.className = 'dependency-info';
        const dependencyTask = child.tasks.find(t => t.id === task.dependency);
        if (dependencyTask) {
            dependencyInfo.textContent = `${getTranslation('unlocksAfter', child.language)}: ${dependencyTask.name}`;
        }
    }

    // Assemble Task Element
    taskElement.appendChild(checkboxContainer);
    if (descriptionElement) {
        taskElement.appendChild(descriptionElement);
    }
    taskElement.appendChild(metaContainer);
    if (dependencyInfo) {
        taskElement.appendChild(dependencyInfo);
    }

    return taskElement;
}

// Toggle Favorite
function toggleFavorite(childId, taskId) {
    const child = AppState.children.find(c => c.id === childId);
    if (!child) return;

    const task = child.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.isFavorite = !task.isFavorite;

    if (task.isFavorite) {
        addToFavorites(task);
    } else {
        // Remove from favorites
        AppState.favorites = AppState.favorites.filter(f => 
            !(f.name === task.name && f.description === task.description)
        );
    }

    saveData();
    updateUI();
}

// Update Favorites Sidebar
function updateFavoritesSidebar() {
    elements.favoritesList.innerHTML = '';
    
    if (AppState.favorites.length === 0) {
        const noFavorites = document.createElement('div');
        noFavorites.className = 'no-favorites';
        noFavorites.textContent = 'Keine Favoriten';
        elements.favoritesList.appendChild(noFavorites);
    } else {
        AppState.favorites.forEach(favorite => {
            const favoriteElement = document.createElement('div');
            favoriteElement.className = 'favorite-item';
            favoriteElement.addEventListener('click', () => {
                // Pre-fill the add task form with favorite data
                if (AppState.currentChildId) {
                    document.getElementById('task-name').value = favorite.name;
                    document.getElementById('task-description').value = favorite.description || '';
                    document.getElementById('task-type').value = favorite.type;
                    document.getElementById('task-reminder-type').value = favorite.reminderType;
                    
                    if (favorite.reminderType === 'fixed' && favorite.fixedTime) {
                        document.getElementById('task-fixed-time').value = favorite.fixedTime;
                        document.getElementById('fixed-time-group').style.display = 'block';
                    } else if (favorite.reminderType === 'deadline' && favorite.deadline) {
                        document.getElementById('task-deadline').value = favorite.deadline;
                        document.getElementById('deadline-group').style.display = 'block';
                    }
                    
                    // Set weekdays
                    document.querySelectorAll(`input[name="weekday"]`).forEach(cb => {
                        cb.checked = favorite.weekdays.includes(cb.value);
                    });
                    
                    document.getElementById('task-no-repeat').checked = favorite.noRepeat;
                    document.getElementById('task-favorite').checked = true;
                    
                    closeAllModals();
                    openModal('add-task');
                }
            });

            const favoriteName = document.createElement('div');
            favoriteName.className = 'favorite-name';
            favoriteName.textContent = favorite.name;

            const favoriteType = document.createElement('div');
            favoriteType.className = 'favorite-type';
            favoriteType.textContent = favorite.type === 'mandatory' ? 'Pflicht' : 'Freiwillig';

            favoriteElement.appendChild(favoriteName);
            favoriteElement.appendChild(favoriteType);
            elements.favoritesList.appendChild(favoriteElement);
        });
    }
}

// Delete Child
function deleteChild(childId) {
    if (confirm('Sind Sie sicher, dass Sie dieses Kind und alle seine Tasks löschen möchten?')) {
        AppState.children = AppState.children.filter(child => child.id !== childId);
        saveData();
        updateUI();
        showNotification(getTranslation('notifications.childDeleted'));
    }
}

// Change Child Language
function changeChildLanguage(childId, language) {
    const child = AppState.children.find(c => c.id === childId);
    if (child) {
        child.language = language;
        saveData();
        updateUI();
    }
}

// Update Language
function updateLanguage() {
    document.documentElement.lang = AppState.settings.defaultLanguage;
    document.title = getTranslation('appTitle');
}

// Get Translation
function getTranslation(key, lang = null) {
    if (!lang) {
        lang = AppState.settings.defaultLanguage;
    }
    
    const translation = translations[lang];
    if (!translation) return key;
    
    // Handle nested keys
    const keys = key.split('.');
    let value = translation;
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Return key if translation not found
        }
    }
    
    return value;
}

// Get Current Weekday
function getCurrentWeekday() {
    const now = new Date();
    return getWeekdayName(now.getDay()).toLowerCase();
}

// Get Weekday Name
function getWeekdayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

// Generate Unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Start Alarm Checker
function startAlarmChecker() {
    // Check every minute
    setInterval(checkAlarms, 60000);
    
    // Initial check
    checkAlarms();
}

// Check Alarms
function checkAlarms() {
    if (!AppState.settings.enableSound) return;

    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5); // HH:mm format
    const currentWeekday = getCurrentWeekday();

    AppState.children.forEach(child => {
        child.tasks.forEach(task => {
            // Check if task is for today
            if (!task.weekdays.includes(currentWeekday)) return;
            
            // Check if task is already completed
            if (task.completed) return;

            // Check fixed time alarms
            if (task.reminderType === 'fixed' && task.fixedTime === currentTime) {
                triggerAlarm(child, task);
            }

            // Check deadline alarms
            if (task.reminderType === 'deadline' && task.deadline === currentTime) {
                // Only trigger if task is not completed
                triggerAlarm(child, task);
            }
        });
    });
}

// Trigger Alarm
function triggerAlarm(child, task) {
    // Set alarm sound
    let soundSrc = '';
    switch(AppState.settings.alarmSound) {
        case 'bell':
            soundSrc = 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3';
            break;
        case 'beep':
            soundSrc = 'https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3';
            break;
        case 'chime':
            soundSrc = 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3';
            break;
    }

    elements.alarmSound.src = soundSrc;
    elements.alarmSound.play().catch(e => console.log('Audio play failed:', e));

    // Show notification
    showNotification(`Alarm: ${task.name} für ${child.nickname || child.name}`, 'alarm');
}

// Initialize Application when DOM is loaded
window.addEventListener('DOMContentLoaded', initApp);

// Add some default translations for missing keys
translations.de.yes = 'Ja';
translations.de.no = 'Nein';
translations.en.yes = 'Yes';
translations.en.no = 'No';
translations.fr.yes = 'Oui';
translations.fr.no = 'Non';

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        translations,
        getTranslation,
        generateId,
        getCurrentWeekday,
        isTaskLocked,
        toggleTaskCompletion
    };
}