const assert = require('assert');

const mockElement = () => ({
  addEventListener() {},
  classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  appendChild() {},
  append() {},
  innerHTML: '',
  textContent: '',
  value: '',
  checked: false,
  style: {},
  dataset: {},
  reset() {},
  remove() {},
  focus() {},
  blur() {},
  play() { return Promise.resolve(); },
  pause() {}
});

const elements = {
  'children-container': mockElement(),
  'add-child-btn': mockElement(),
  'settings-btn': mockElement(),
  'add-child-modal': mockElement(),
  'add-task-modal': mockElement(),
  'settings-modal': mockElement(),
  'task-details-modal': mockElement(),
  'favorites-sidebar': mockElement(),
  'favorites-list': mockElement(),
  'toggle-favorites': mockElement(),
  'alarm-sound': mockElement()
};

global.document = {
  getElementById(id) {
    return elements[id] || mockElement();
  },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement() { return mockElement(); },
  addEventListener() {},
  body: { appendChild() {} },
  documentElement: { lang: '' },
  title: ''
};

global.window = {
  addEventListener() {},
  setInterval() {},
  clearInterval() {}
};

global.localStorage = {
  getItem() { return null; },
  setItem() {}
};

global.URL = {
  createObjectURL() { return 'blob:mock'; },
  revokeObjectURL() {}
};

global.Blob = class Blob {
  constructor(parts, options) {
    this.parts = parts;
    this.options = options;
  }
};

global.FileReader = class FileReader {
  constructor() { this.onload = null; }
  readAsText() { if (this.onload) this.onload({ target: { result: '{}' } }); }
};

const { normalizeImportedData, buildExportPayload, isPauseActive, getChildPauseState, AppState, checkAlarms, deleteTask, triggerAlarm } = require('../app.js');

const originalDate = global.Date;
class MockDate extends originalDate {
  constructor(...args) {
    if (args.length === 0) {
      return new originalDate('2026-08-10T09:05:00');
    }
    return new originalDate(...args);
  }
  static now() {
    return new originalDate('2026-08-10T09:05:00').getTime();
  }
}

global.Date = MockDate;

const normalized = normalizeImportedData({
  children: [{ id: 'child-1', name: 'Mina', tasks: [{ id: 'task-1', name: 'Putzen' }] }],
  favorites: [{ id: 'favorite-1', name: 'Lesen' }],
  settings: { defaultLanguage: 'en' }
});

assert.strictEqual(normalized.children[0].name, 'Mina');
assert.strictEqual(normalized.children[0].tasks[0].name, 'Putzen');
assert.deepStrictEqual(normalized.settings, {
  defaultLanguage: 'en',
  enableSound: true,
  alarmSound: 'bell',
  pauseList: false,
  globalPauseUntil: null
});

const exported = buildExportPayload({
  children: [{ id: 'child-1', name: 'Mina' }],
  favorites: [],
  settings: { defaultLanguage: 'de' }
});

assert.strictEqual(exported.version, 1);
assert.deepStrictEqual(exported.data.children, [{ id: 'child-1', name: 'Mina' }]);

const activePause = isPauseActive('2026-08-10');
assert.strictEqual(activePause, true);

const inactivePause = isPauseActive('2020-01-01');
assert.strictEqual(inactivePause, false);

const childPause = getChildPauseState({ isPaused: true, pauseUntil: '2026-08-10' });
assert.strictEqual(childPause.isPaused, true);
assert.strictEqual(childPause.pauseUntil, '2026-08-10');

AppState.settings.enableSound = true;
AppState.children = [{
  id: 'child-2',
  name: 'Mina',
  nickname: 'Mina',
  language: 'de',
  color: '#ff0000',
  tasks: [{
    id: 'task-2',
    name: 'Deadline task',
    reminderType: 'deadline',
    deadline: '09:00',
    weekdays: ['monday'],
    completed: false,
    lastAlarmAt: null
  }]
}];
checkAlarms();
assert.ok(AppState.children[0].tasks[0].lastAlarmAt, 'deadline alarm should fire once the deadline has passed');

AppState.children = [{
  id: 'child-3',
  name: 'Noah',
  tasks: [
    { id: 'task-3', name: 'To delete', description: '', dependency: null },
    { id: 'task-4', name: 'Keep me', description: '', dependency: 'task-3' }
  ]
}];
AppState.favorites = [{ id: 'fav-1', name: 'To delete', description: '' }];
AppState.currentChildId = 'child-3';
AppState.currentTaskId = 'task-3';
AppState.children[0].tasks[0].weekdays = ['monday'];
AppState.children[0].tasks[1].weekdays = ['monday'];
deleteTask();
assert.strictEqual(AppState.children[0].tasks.length, 1);
assert.strictEqual(AppState.children[0].tasks[0].id, 'task-4');
assert.strictEqual(AppState.children[0].tasks[0].dependency, null);
assert.strictEqual(AppState.favorites.length, 0);

const audioContextCalls = { created: 0, resumed: 0 };
function MockAudioContext() {
  this.state = 'running';
  this.currentTime = 0;
  this.createOscillator = () => {
    const oscillator = {
      type: '',
      frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
      connect() {},
      start() {},
      stop() {}
    };
    return oscillator;
  };
  this.createGain = () => ({
    gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
    connect() {}
  });
  this.destination = {};
  this.resume = () => {
    audioContextCalls.resumed += 1;
    return Promise.resolve();
  };
  audioContextCalls.created += 1;
}
window.AudioContext = MockAudioContext;
const audioElement = document.getElementById('alarm-sound');
audioElement.play = () => Promise.reject(new Error('blocked'));
triggerAlarm({ nickname: 'Mina', name: 'Mina' }, { name: 'Reminder', lastAlarmAt: null });
assert.strictEqual(audioContextCalls.created, 1, 'alarm should create a browser audio context fallback');

global.Date = originalDate;

console.log('Import/export tests passed');
