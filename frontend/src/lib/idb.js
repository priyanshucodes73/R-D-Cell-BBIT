// Minimal IndexedDB helper for small key/value storage
const DB_NAME = 'bbit_rnd_local'
const STORE = 'kv'

function openDB() {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !window.indexedDB) return reject(new Error('IndexedDB not available'))
        const req = window.indexedDB.open(DB_NAME, 1)
        req.onupgradeneeded = () => {
            const db = req.result
            if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
        }
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
    })
}

export async function idbGet(key) {
    try {
        const db = await openDB()
        return await new Promise((res, rej) => {
            const tx = db.transaction(STORE, 'readonly')
            const store = tx.objectStore(STORE)
            const rq = store.get(key)
            rq.onsuccess = () => res(rq.result)
            rq.onerror = () => rej(rq.error)
        })
    } catch (err) {
        return null
    }
}

export async function idbSet(key, value) {
    try {
        const db = await openDB()
        return await new Promise((res, rej) => {
            const tx = db.transaction(STORE, 'readwrite')
            const store = tx.objectStore(STORE)
            const rq = store.put(value, key)
            rq.onsuccess = () => res(true)
            rq.onerror = () => rej(rq.error)
        })
    } catch (err) {
        return false
    }
}

export async function idbDelete(key) {
    try {
        const db = await openDB()
        return await new Promise((res, rej) => {
            const tx = db.transaction(STORE, 'readwrite')
            const store = tx.objectStore(STORE)
            const rq = store.delete(key)
            rq.onsuccess = () => res(true)
            rq.onerror = () => rej(rq.error)
        })
    } catch (err) {
        return false
    }
}
