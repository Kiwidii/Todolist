# Kinder To-Do Liste

A customizable daily to-do list application for children, allowing parents or guardians to manage tasks, dependencies, reminders, and recurrence efficiently.

## Features

### 1. Child Management
- **Columns**: Each child has their own column in the interface
- **Add/Delete Children**: Buttons to add or remove children from the list
- **Title Display**: The name or nickname of each child is always visible at the top of their respective column
- **Color Coding**: Each child can have a custom color for their column

### 2. Task Management
- **Task Lists**: Each child has their own dedicated to-do list
- **Add/Delete Tasks**: Users can add or remove tasks for each child
- **Task Status**: Each task has a checkbox that can be ticked to mark it as completed
- **Task Types**: Mandatory (red border) and Voluntary (blue border) tasks

### 3. Task Types and Reminders
- **Mandatory Tasks**: Must be completed (marked with red border)
- **Voluntary Tasks**: Optional for the child (marked with blue border)
- **Fixed-Time Tasks**: Tasks with a specific time that trigger an acoustic alarm when due
- **Deadline Tasks**: Tasks that trigger an alarm only if they are not ticked before a programmed deadline

### 4. Task Dependencies
- **Conditional Activation**: Some tasks only become active/available once other tasks are completed
- **Dependency Visualization**: Users can view the dependencies between tasks (e.g., "Task B unlocks only after Task A is done")
- **Locked Tasks**: Tasks with unmet dependencies are visually locked and cannot be completed

### 5. Language Support
- **Default Language**: German
- **Per-Child Language Toggle**: Each child's list can be displayed in English, German, or French, independently of the others
- **Language Switcher**: Each child column has a language toggle button (DE, EN, FR)

### 6. Recurring Tasks
- **Weekday-Specific Entries**: Tasks are tied to specific weekdays (e.g., Monday, Tuesday)
- **Automatic Repetition**: All tasks automatically repeat on the same weekday of the following week, unless explicitly marked as non-repeating
- **Multi-Day Reuse**: Each task can be toggled to appear on additional weekdays (e.g., a task set for Monday can also be enabled for Wednesday and Friday)
- **Weekday Selection**: Each task has a sub-option to select which weekdays it should appear on

### 7. Favorite Tasks
- **Mark as Favorite**: Tasks can be marked as favorites with a star icon
- **Reusability**: Favorite tasks can be quickly selected when creating a new task
- **Shared Favorites**: Favorite tasks are available for all children, allowing reuse across profiles
- **Favorites Sidebar**: A collapsible sidebar showing all favorite tasks that can be clicked to pre-fill the add task form

## Technical Features

- **Local Storage**: All data is saved in the browser's local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Alarm System**: Audio alarms for fixed-time and deadline tasks
- **Multi-language Support**: Full translations for German, English, and French
- **Drag and Drop**: Ready for future drag and drop task reordering

## Installation

Simply open the `index.html` file in a web browser. No server required.

## Usage

1. **Add a Child**: Click the "Kind hinzufügen" (Add Child) button in the header
2. **Add Tasks**: Click the "+" button in a child's column to add tasks
3. **Manage Tasks**: Check tasks as completed, mark as favorites, or view details
4. **Set Reminders**: Configure fixed-time or deadline reminders for tasks
5. **Set Dependencies**: Make tasks dependent on the completion of other tasks
6. **Use Favorites**: Click on favorite tasks in the sidebar to quickly add them to any child

## Settings

- **Default Language**: Set the application's default language
- **Enable Alarms**: Turn on/off audio alarms
- **Alarm Sound**: Choose between different alarm sounds (Bell, Beep, Chime)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## File Structure

```
Kinder-To-Do-Liste/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── app.js              # JavaScript application
└── README.md           # This file
```

## Development

To modify the application:

1. Edit the HTML structure in `index.html`
2. Modify styles in `styles.css`
3. Update functionality in `app.js`

## Future Enhancements

- [ ] Drag and drop task reordering
- [ ] Task categories with custom icons
- [ ] Progress tracking and statistics
- [ ] Parent/child user accounts
- [ ] Cloud synchronization
- [ ] Mobile app version
- [ ] Printable task lists
- [ ] Export/import functionality

## License

This application is provided as-is for personal use. Feel free to modify and distribute as needed.

## Credits

- Font Awesome for icons
- Mixkit for alarm sounds
- Google Fonts for typography

---

**Version**: 1.0.0
**Last Updated**: 2024
**Author**: Kinder To-Do Liste Team