// Personen To-Do Liste Application
// Main JavaScript file

// Application State
const AppState = {
    children: [],
    favorites: [],
    settings: {
        defaultLanguage: 'de',
        enableSound: true,
        alarmSound: 'bell',
        pauseList: false,
        globalPauseUntil: null
    },
    currentChildId: null,
    currentTaskId: null,
    editingChildId: null,
    editingTaskId: null
};

const activeAlarmTimers = new Map();

// Language Translations
const translations = {
    de: {
        appTitle: 'Personen To-Do Liste',
        addChild: 'Person hinzufügen',
        editChild: 'Person bearbeiten',
        addTask: 'Aufgabe hinzufügen',
        editTask: 'Aufgabe bearbeiten',
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
        edit: 'Bearbeiten',
        taskName: 'Aufgabenname',
        taskDescription: 'Beschreibung',
        taskType: 'Typ',
        mandatory: 'Pflicht',
        voluntary: 'Freiwillig',
        reminderType: 'Erinnerungstyp',
        none: 'Keine',
        fixedTime: 'Feste Zeit',
        deadline: 'Frist',
        fixedTimeLabel: 'Feste Zeit',
        deadlineLabel: 'Frist',
        repetition: 'Wiederholung',
        weekdays: 'Wochentage',
        noRepeat: 'Nicht wiederholen',
        dependencies: 'Abhängigkeiten',
        dependentOn: 'Abhängig von',
        noDependency: 'Keine Abhängigkeit',
        favorite: 'Favorit',
        markAsFavorite: 'Als Favorit markieren',
        favorites: 'Lieblingsaufgaben',
        taskDetails: 'Aufgabendetails',
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
        noTasks: 'Keine Aufgaben für heute',
        allTasksCompleted: 'Alle Aufgaben erledigt!',
        notifications: {
            childAdded: 'Person hinzugefügt',
            childDeleted: 'Person gelöscht',
            taskAdded: 'Aufgabe hinzugefügt',
            taskDeleted: 'Aufgabe gelöscht',
            taskCompleted: 'Aufgabe erledigt',
            notCompleted: 'Aufgabe nicht erledigt',
            childUpdated: 'Person aktualisiert',
            taskUpdated: 'Aufgabe aktualisiert',
            settingsSaved: 'Einstellungen gespeichert'
        }
    },
    en: {
        appTitle: 'People To-Do List',
        addChild: 'Add Person',
        editChild: 'Edit Person',
        addTask: 'Add Task',
        editTask: 'Edit Task',
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
        edit: 'Edit',
        taskName: 'Task Name',
        taskDescription: 'Description',
        taskType: 'Type',
        mandatory: 'Mandatory',
        voluntary: 'Voluntary',
        reminderType: 'Reminder Type',
        none: 'None',
        fixedTime: 'Fixed Time',
        deadline: 'Frist',
        fixedTimeLabel: 'Fixed Time',
        deadlineLabel: 'Frist',
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
            childAdded: 'Person added',
            childDeleted: 'Person deleted',
            taskAdded: 'Task added',
            taskDeleted: 'Task deleted',
            taskCompleted: 'Task completed',
            notCompleted: 'Task not completed',
            childUpdated: 'Person updated',
            taskUpdated: 'Task updated',
            settingsSaved: 'Settings saved'
        }
    },
    fr: {
        appTitle: "Liste de tâches pour personnes",
        addChild: "Ajouter une personne",
        editChild: "Modifier la personne",
        addTask: "Ajouter une tâche",
        editTask: "Modifier la tâche",
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
        edit: "Modifier",
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
            childAdded: "Personne ajoutée",
            childDeleted: "Personne supprimée",
            taskAdded: "Tâche ajoutée",
            taskDeleted: "Tâche supprimée",
            taskCompleted: "Tâche terminée",
            notCompleted: "Tâche non terminée",
            childUpdated: "Personne mise à jour",
            taskUpdated: "Tâche mise à jour",
            settingsSaved: "Paramètres enregistrés"
        }
    }
};

// DOM Elements
const elements = {
    childrenContainer: document.getElementById('children-container'),
    addChildBtn: document.getElementById('add-child-btn'),
    settingsBtn: document.getElementById('settings-btn'),
    importDataBtn: document.getElementById('import-data-btn'),
    exportDataBtn: document.getElementById('export-data-btn'),
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

function buildExportPayload(state = AppState) {
    return {
        version: 1,
        exportedAt: new Date().toISOString(),
        data: {
            children: state.children,
            favorites: state.favorites,
            settings: state.settings
        }
    };
}

function normalizeImportedData(payload) {
    if (!payload || typeof payload !== 'object') {
        throw new Error('Ungültiger Import-Export-Inhalt');
    }

    const data = payload.data || payload;
    const normalizedChildren = Array.isArray(data.children) ? data.children : [];
    const normalizedFavorites = Array.isArray(data.favorites) ? data.favorites : [];
    const normalizedSettings = data.settings && typeof data.settings === 'object' ? data.settings : {};

    return {
        children: normalizedChildren,
        favorites: normalizedFavorites,
        settings: {
            ...AppState.settings,
            ...normalizedSettings
        }
    };
}

function exportData() {
    const payload = buildExportPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'todolist-export.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showNotification('To-Go Liste exportiert');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            try {
                const parsed = JSON.parse(loadEvent.target.result);
                const imported = normalizeImportedData(parsed);
                AppState.children = imported.children;
                AppState.favorites = imported.favorites;
                AppState.settings = { ...AppState.settings, ...imported.settings };
                saveData();
                updateUI();
                showNotification('To-Go Liste importiert');
            } catch (error) {
                showNotification('Import fehlgeschlagen: Ungültige Datei', 'error');
            }
        };
        reader.readAsText(file);
    });
    input.click();
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
    elements.importDataBtn.addEventListener('click', importData);
    elements.exportDataBtn.addEventListener('click', exportData);

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
    document.getElementById('alarm-sound').addEventListener('change', previewAlarmTone);

    // Favorites Sidebar Toggle
    elements.toggleFavorites.addEventListener('click', toggleFavoritesSidebar);

    // Task Details Modal Delete Button
    document.getElementById('delete-task-btn').addEventListener('click', deleteTask);

    // Reminder Type Change
    document.getElementById('task-reminder-type').addEventListener('change', function() {
        setReminderVisibility(this.value);
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
}

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

// Open Modal
function openModal(modalName) {
    const preservedChildId = AppState.currentChildId;
    const preservedTaskId = AppState.currentTaskId;
    const preservedEditingChildId = AppState.editingChildId;
    const preservedEditingTaskId = AppState.editingTaskId;

    closeAllModals();
    AppState.currentChildId = preservedChildId;
    AppState.currentTaskId = preservedTaskId;
    AppState.editingChildId = preservedEditingChildId;
    AppState.editingTaskId = preservedEditingTaskId;
    
    switch(modalName) {
        case 'add-child':
            prepareAddChildModal();
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
    AppState.editingChildId = null;
    AppState.editingTaskId = null;
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

    if (AppState.editingChildId) {
        const child = AppState.children.find(c => c.id === AppState.editingChildId);
        if (!child) return;

        child.name = name;
        child.nickname = nickname || name;
        child.language = language;
        child.color = color;

        saveData();
        updateUI();
        closeAllModals();
        showNotification(getTranslation('notifications.childUpdated'));
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
        showNotification('No person selected', 'error');
        return;
    }

    const child = AppState.children.find(c => c.id === AppState.currentChildId);
    if (!child) return;

    if (AppState.editingTaskId) {
        const task = child.tasks.find(t => t.id === AppState.editingTaskId);
        if (!task) return;

        const previousFavoriteState = task.isFavorite;
        const previousName = task.name;
        const previousDescription = task.description;

        task.name = name;
        task.description = description;
        task.type = type;
        task.reminderType = reminderType;
        task.fixedTime = reminderType === 'fixed' ? fixedTime : null;
        task.deadline = reminderType === 'deadline' ? deadline : null;
        task.weekdays = weekdays;
        task.noRepeat = noRepeat;
        task.dependency = dependency || null;
        task.isFavorite = isFavorite;

        if (previousFavoriteState || isFavorite) {
            AppState.favorites = AppState.favorites.filter(f => !(f.name === previousName && f.description === previousDescription));
            if (isFavorite) {
                addToFavorites(task);
            }
        }

        saveData();
        updateUI();
        closeAllModals();
        showNotification(getTranslation('notifications.taskUpdated'));
        return;
    }

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
function deleteTask(childId = AppState.currentChildId, taskId = AppState.currentTaskId) {
    if (!childId || !taskId) return;

    const child = AppState.children.find(c => c.id === childId);
    if (!child) return;

    const task = child.tasks.find(t => t.id === taskId);
    if (!task) return;

    child.tasks = child.tasks.filter(t => t.id !== taskId);
    child.tasks.forEach(t => {
        if (t.dependency === taskId) {
            t.dependency = null;
        }
    });

    AppState.favorites = AppState.favorites.filter(f =>
        !(f.name === task.name && f.description === task.description)
    );

    saveData();
    updateUI();
    closeAllModals();
    showNotification(getTranslation('notifications.taskDeleted'));
}

// Toggle Task Completion
function toggleTaskCompletion(childId, taskId) {
    const child = AppState.children.find(c => c.id === childId);
    if (!child) return;

    if (isListPausedForChild(child)) {
        showNotification('Die Liste ist gerade pausiert', 'error');
        return;
    }

    const task = child.tasks.find(t => t.id === taskId);
    if (!task) return;

    // Check if task is locked by dependency
    if (isTaskLocked(childId, taskId)) {
        showNotification('This task is locked by a dependency', 'error');
        return;
    }

    task.completed = !task.completed;

    if (task.completed) {
        stopAlarm(child.id, task.id);
    }
    
    // Update dependent tasks
    updateDependentTasks(childId);

    saveData();
    updateUI();
    showNotification(getTranslation(
        task.completed ? 'notifications.taskCompleted' : 'notifications.notCompleted'
    ));
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

// Prepare Add Child Modal
function prepareAddChildModal() {
    const form = document.getElementById('add-child-form');
    const title = document.querySelector('#add-child-modal .modal-header h2');
    const confirmButton = document.getElementById('confirm-add-child');

    form.reset();

    if (AppState.editingChildId) {
        const child = AppState.children.find(c => c.id === AppState.editingChildId);
        if (child) {
            document.getElementById('child-name').value = child.name;
            document.getElementById('child-nickname').value = child.nickname || '';
            document.getElementById('child-language').value = child.language;
            document.getElementById('child-color').value = child.color || '#4CAF50';
        }
        title.textContent = getTranslation('editChild');
        confirmButton.textContent = getTranslation('save');
    } else {
        title.textContent = getTranslation('addChild');
        confirmButton.textContent = getTranslation('add');
    }
}

// Prepare Add Task Modal
function prepareAddTaskModal() {
    // Reset form
    document.getElementById('add-task-form').reset();
    
    const title = document.querySelector('#add-task-modal .modal-header h2');
    const confirmButton = document.getElementById('confirm-add-task');
    
    // Hide time fields initially
    document.getElementById('fixed-time-group').style.display = 'none';
    document.getElementById('deadline-group').style.display = 'none';
    
    let taskToEdit = null;
    if (AppState.editingTaskId && AppState.currentChildId) {
        const child = AppState.children.find(c => c.id === AppState.currentChildId);
        taskToEdit = child ? child.tasks.find(t => t.id === AppState.editingTaskId) : null;
    }

    if (taskToEdit) {
        const taskWeekdays = Array.isArray(taskToEdit.weekdays) ? taskToEdit.weekdays : [];

        document.getElementById('task-name').value = taskToEdit.name;
        document.getElementById('task-description').value = taskToEdit.description || '';
        document.getElementById('task-type').value = taskToEdit.type;
        document.getElementById('task-reminder-type').value = taskToEdit.reminderType || 'none';
        document.getElementById('task-fixed-time').value = taskToEdit.fixedTime || '';
        document.getElementById('task-deadline').value = taskToEdit.deadline || '';
        document.getElementById('task-no-repeat').checked = taskToEdit.noRepeat;
        document.getElementById('task-dependency').value = taskToEdit.dependency || '';
        document.getElementById('task-favorite').checked = taskToEdit.isFavorite;

        document.querySelectorAll('input[name="weekday"]').forEach(cb => {
            cb.checked = taskWeekdays.includes(cb.value);
        });

        title.textContent = getTranslation('editTask');
        confirmButton.textContent = getTranslation('save');
        setReminderVisibility(taskToEdit.reminderType || 'none');
    } else {
        // Set default weekday to current day
        const now = new Date();
        const currentWeekday = getWeekdayName(now.getDay()).toLowerCase();
        document.querySelectorAll(`input[name="weekday"]`).forEach(cb => {
            cb.checked = cb.value === currentWeekday;
        });

        title.textContent = getTranslation('addTask');
        confirmButton.textContent = getTranslation('add');
        setReminderVisibility('none');
    }
    
    // Populate dependency dropdown
    const dependencySelect = document.getElementById('task-dependency');
    dependencySelect.innerHTML = '<option value="">Keine Abhängigkeit</option>';
    
    if (AppState.currentChildId) {
        const child = AppState.children.find(c => c.id === AppState.currentChildId);
        if (child) {
            child.tasks.forEach(task => {
                if (task.id !== AppState.editingTaskId) {
                    const option = document.createElement('option');
                    option.value = task.id;
                    option.textContent = task.name;
                    dependencySelect.appendChild(option);
                }
            });
        }
    }
}

function setReminderVisibility(type) {
    document.getElementById('fixed-time-group').style.display = type === 'fixed' ? 'block' : 'none';
    document.getElementById('deadline-group').style.display = type === 'deadline' ? 'block' : 'none';
}

// Prepare Settings Modal
function prepareSettingsModal() {
    document.getElementById('default-language').value = AppState.settings.defaultLanguage;
    document.getElementById('enable-sound').checked = AppState.settings.enableSound;
    document.getElementById('alarm-sound').value = AppState.settings.alarmSound;
    document.getElementById('pause-list').checked = AppState.settings.pauseList;
    document.getElementById('global-pause-until').value = AppState.settings.globalPauseUntil || '';
}

function previewAlarmTone() {
    const selectedSound = document.getElementById('alarm-sound')?.value || AppState.settings.alarmSound || 'bell';
    AppState.settings.alarmSound = selectedSound;

    const previewTask = {
        name: 'Alarm Preview',
        lastAlarmAt: null
    };

    triggerAlarm({ nickname: 'Preview', name: 'Preview' }, previewTask, true);
}

// Save Settings
function saveSettings() {
    AppState.settings.defaultLanguage = document.getElementById('default-language').value;
    AppState.settings.enableSound = document.getElementById('enable-sound').checked;
    AppState.settings.alarmSound = document.getElementById('alarm-sound').value;
    AppState.settings.pauseList = document.getElementById('pause-list').checked;
    AppState.settings.globalPauseUntil = document.getElementById('global-pause-until').value || null;
    
    saveData();
    closeAllModals();
    showNotification(getTranslation('notifications.settingsSaved'));
    updateUI();
}

function isPauseActive(pauseUntil, referenceDate = new Date()) {
    if (!pauseUntil) return false;

    const compareDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
    const untilDate = new Date(pauseUntil);
    if (Number.isNaN(untilDate.getTime())) return false;

    const normalizedUntilDate = new Date(untilDate.getFullYear(), untilDate.getMonth(), untilDate.getDate());
    return compareDate <= normalizedUntilDate;
}

function getChildPauseState(child, referenceDate = new Date()) {
    if (!child) return { isPaused: false, pauseUntil: null };

    const isPaused = Boolean(child.isPaused && child.pauseUntil && isPauseActive(child.pauseUntil, referenceDate));
    return {
        isPaused,
        pauseUntil: child.pauseUntil || null
    };
}

function isListPausedForChild(child) {
    if (AppState.settings.pauseList && isPauseActive(AppState.settings.globalPauseUntil)) {
        return true;
    }

    return getChildPauseState(child).isPaused;
}

function getPauseMessage(child) {
    if (AppState.settings.pauseList && isPauseActive(AppState.settings.globalPauseUntil)) {
        return `Die gesamte Liste ist pausiert${AppState.settings.globalPauseUntil ? ` bis ${formatPauseDate(AppState.settings.globalPauseUntil)}` : ''}.`;
    }

    if (child && getChildPauseState(child).isPaused) {
        return `Für ${child.nickname || child.name} ist die Liste pausiert${child.pauseUntil ? ` bis ${formatPauseDate(child.pauseUntil)}` : ''}.`;
    }

    return '';
}

function formatPauseDate(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
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
        noChildren.textContent = 'Keine Personen hinzugefügt. Klicken Sie auf "Person hinzufügen" um zu beginnen.';
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

    const pauseChildBtn = document.createElement('button');
    pauseChildBtn.className = 'btn btn-small btn-warning';
    pauseChildBtn.innerHTML = `<i class="fas ${getChildPauseState(child).isPaused ? 'fa-play' : 'fa-pause'}"></i>`;
    pauseChildBtn.title = getChildPauseState(child).isPaused ? 'Pause beenden' : 'Für diese Person pausieren';
    pauseChildBtn.addEventListener('click', () => toggleChildPause(child));

    // Edit Child Button
    const editChildBtn = document.createElement('button');
    editChildBtn.className = 'btn btn-small btn-secondary';
    editChildBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editChildBtn.title = getTranslation('edit', child.language);
    editChildBtn.addEventListener('click', () => {
        AppState.currentChildId = child.id;
        AppState.editingChildId = child.id;
        openModal('add-child');
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
    controls.appendChild(pauseChildBtn);
    controls.appendChild(editChildBtn);
    controls.appendChild(deleteChildBtn);
    controls.appendChild(languageToggle);

    header.appendChild(nameDisplay);
    header.appendChild(controls);

    // Task List
    const taskList = document.createElement('div');
    taskList.className = 'task-list';

    const paused = isListPausedForChild(child);
    if (paused) {
        const pauseNotice = document.createElement('div');
        pauseNotice.className = 'pause-notice';
        pauseNotice.textContent = getPauseMessage(child);
        taskList.appendChild(pauseNotice);
    } else {
        // Show tasks that are scheduled for the current day
        const currentWeekday = getCurrentWeekday();
        const todayTasks = child.tasks.filter(task =>
            Array.isArray(task.weekdays) && task.weekdays.includes(currentWeekday)
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
    }

    // Add Task Button (at bottom)
    const addTaskButton = document.createElement('button');
    addTaskButton.className = 'add-task-btn';
    addTaskButton.innerHTML = '<i class="fas fa-plus"></i> ' + getTranslation('add', child.language);
    addTaskButton.disabled = paused;
    addTaskButton.addEventListener('click', () => {
        if (paused) return;
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

    // Edit Task Button
    const editTaskBtn = document.createElement('button');
    editTaskBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editTaskBtn.title = getTranslation('edit', child.language);
    editTaskBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AppState.currentChildId = child.id;
        AppState.currentTaskId = task.id;
        AppState.editingTaskId = task.id;
        openModal('add-task');
    });

    // Delete Task Button
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.className = 'btn-delete-task';
    deleteTaskBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteTaskBtn.title = getTranslation('delete', child.language);
    deleteTaskBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.confirm('Sind Sie sicher, dass Sie diese Aufgabe löschen möchten?')) {
            deleteTask(child.id, task.id);
        }
    });

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

    actionsContainer.appendChild(editTaskBtn);
    actionsContainer.appendChild(deleteTaskBtn);
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
function toggleChildPause(child) {
    const childPauseState = getChildPauseState(child);
    if (childPauseState.isPaused) {
        child.isPaused = false;
        child.pauseUntil = null;
        saveData();
        updateUI();
        showNotification('Pause für diese Person beendet');
        return;
    }

    const pauseUntil = window.prompt('Pause bis (JJJJ-MM-TT):', getDefaultPauseDate());
    if (!pauseUntil) {
        return;
    }

    child.isPaused = true;
    child.pauseUntil = pauseUntil;
    saveData();
    updateUI();
    showNotification(`Pause für ${child.nickname || child.name} aktiviert`);
}

function getDefaultPauseDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().slice(0, 10);
}

function deleteChild(childId) {
    if (confirm('Sind Sie sicher, dass Sie diese Person und alle ihre Tasks löschen möchten?')) {
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

function getTimeMinutes(timeString) {
    if (!timeString || typeof timeString !== 'string') return null;

    const [hours, minutes] = timeString.split(':').map(part => Number(part));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    return hours * 60 + minutes;
}

function shouldTriggerAlarm(task, currentMinutes, now) {
    if (!task || task.completed) return false;

    const taskTime = task.reminderType === 'fixed' ? task.fixedTime : task.deadline;
    const taskMinutes = getTimeMinutes(taskTime);
    if (taskMinutes === null) return false;

    if (currentMinutes < taskMinutes) return false;

    if (task.lastAlarmAt) {
        const lastAlarm = new Date(task.lastAlarmAt);
        if (!Number.isNaN(lastAlarm.getTime())) {
            const lastAlarmMinutes = lastAlarm.getHours() * 60 + lastAlarm.getMinutes();
            const sameDay = lastAlarm.toDateString() === now.toDateString();
            if (sameDay && lastAlarmMinutes >= taskMinutes) {
                return false;
            }
        }
    }

    return true;
}

// Check Alarms
function checkAlarms() {
    if (!AppState.settings.enableSound) return;
    if (AppState.settings.pauseList && isPauseActive(AppState.settings.globalPauseUntil)) return;

    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5); // HH:mm format
    const currentMinutes = getTimeMinutes(currentTime);
    const currentWeekday = getCurrentWeekday();

    AppState.children.forEach(child => {
        if (isListPausedForChild(child)) return;

        child.tasks.forEach(task => {
            // Check if task is for today
            if (!Array.isArray(task.weekdays) || !task.weekdays.includes(currentWeekday)) return;

            if (task.reminderType === 'fixed' && shouldTriggerAlarm(task, currentMinutes, now)) {
                triggerAlarm(child, task);
            }

            if (task.reminderType === 'deadline' && shouldTriggerAlarm(task, currentMinutes, now)) {
                triggerAlarm(child, task);
            }
        });
    });
}

function playAlarmFallbackTone(frequency = 700, durationMs = 800) {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return false;

    try {
        const context = new AudioContextCtor();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const now = context.currentTime;
        const durationSeconds = durationMs / 1000;

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, now);
        oscillator.frequency.exponentialRampToValueAtTime(Math.max(220, frequency * 0.75), now + durationSeconds);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start(now);
        oscillator.stop(now + durationSeconds);

        if (context.resume && context.state === 'suspended') {
            context.resume().catch(() => {});
        }

        return true;
    } catch (error) {
        console.log('Audio fallback failed:', error);
        return false;
    }
}

// Trigger Alarm
function triggerAlarm(child, task, previewMode = false) {
    const soundChoice = AppState.settings.alarmSound || 'bell';
    const soundFrequency = soundChoice === 'beep' ? 800 : soundChoice === 'chime' ? 600 : 700;

    task.lastAlarmAt = new Date().toISOString();

    const fallbackPlayed = playAlarmFallbackTone(soundFrequency, previewMode ? 2000 : 800);
    if (elements.alarmSound) {
        elements.alarmSound.src = '';
        if (!fallbackPlayed && elements.alarmSound.play) {
            elements.alarmSound.play().catch(() => {});
        }
    }

    // Show notification
    if (!previewMode) {
        showNotification(`Alarm: ${task.name} für ${child.nickname || child.name}`, 'alarm');

        const alarmId = `${child.id}:${task.id}`;
        if (child.id && task.id && !activeAlarmTimers.has(alarmId)) {
            const alarmTimer = setInterval(() => {
                if (task.completed) {
                    stopAlarm(child.id, task.id);
                    return;
                }

                playAlarmFallbackTone(soundFrequency, 800);
            }, 1000);
            if (typeof alarmTimer.unref === 'function') alarmTimer.unref();
            activeAlarmTimers.set(alarmId, alarmTimer);
        }
    }
}

function stopAlarm(childId, taskId) {
    const alarmId = `${childId}:${taskId}`;
    const alarmTimer = activeAlarmTimers.get(alarmId);
    if (!alarmTimer) return;

    clearInterval(alarmTimer);
    activeAlarmTimers.delete(alarmId);
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
        toggleTaskCompletion,
        buildExportPayload,
        normalizeImportedData,
        isPauseActive,
        getChildPauseState,
        checkAlarms,
        deleteTask,
        triggerAlarm
    };
}