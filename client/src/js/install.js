const butInstall = document.getElementById('buttonInstall');

// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    butInstall.setAttribute('disabled', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event);
});
