if ('wakeLock' in navigator) {
    isWakeLockSupported = true;
    console.info('Screen Wake Lock API supported!')
} else {
    isWakeLockSupported = false;
    console.error('Wake lock is not supported by this browser.')
}

let wakeLock = null;

let lock = async () =>{
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.info('Wake Lock is active!')
  } catch (err) {
    console.error(`The Wake Lock request has failed - usually system related, such as battery:\n${err.name}, ${err.message}`)
  }
}

document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    wakeLock = await navigator.wakeLock.request('screen');
    console.info('Wake Lock is active again.')
  }
});

lock()

  