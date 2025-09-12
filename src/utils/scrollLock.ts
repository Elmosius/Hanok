import { ref, watchEffect } from 'vue'

let scrollPosition = 0

function preventDefault(e: WheelEvent | TouchEvent) {
    e.preventDefault()
}

function blockKeys(e: KeyboardEvent) {
    const keys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End']
    if (keys.includes(e.key)) {
        e.preventDefault()
    }
}

function enableLock() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop
    document.addEventListener('wheel', preventDefault, { passive: false })
    document.addEventListener('touchmove', preventDefault, { passive: false })
    document.addEventListener('keydown', blockKeys, { passive: false })
}

function disableLock() {
    window.scrollTo(0, scrollPosition)
    document.removeEventListener('wheel', preventDefault as EventListener, )
    document.removeEventListener('touchmove', preventDefault as EventListener, )
    document.removeEventListener('keydown', blockKeys as EventListener, )
}


export function useScrollLock(initial = false) {
    const isLocked = ref(initial)

    watchEffect(() => {
        if (isLocked.value) {
            enableLock()
        } else {
            disableLock()
        }
    })

    function scrollToId(id: string) {
        const el = document.getElementById(id)
        if(!el) return

        setTimeout(() => {
            window.scrollTo(el.offsetLeft, el.offsetTop)

        }, 500)

    }

    return {
        isLocked,
        lock: () => (isLocked.value = true),
        unlock: () => (isLocked.value = false),
        scrollToId,
    }
}
