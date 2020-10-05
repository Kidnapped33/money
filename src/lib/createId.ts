// 给我一个 ID
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0

function createId() {
    id++
    return id
}

export default createId