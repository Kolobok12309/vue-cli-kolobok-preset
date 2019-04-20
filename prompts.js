module.exports = [
    {
        name: 'useCustomDirs',
        message: 'Use custom dir structure?',
        type: 'confirm',
        default: true,
    },
    {
        name: 'addArchiveScript',
        message: 'Add archive script into structure?',
        type: 'confirm',
        default: true
    },
    {
        name: 'addDeploy',
        message: 'Add deploy script(template)?',
        type: 'confirm',
        default: true
    }
];
