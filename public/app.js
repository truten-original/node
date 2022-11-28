document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id
    remove(id).then(e.target.closest('li').remove())
  } else if (e.target.dataset.type === 'update') {
    const id = e.target.dataset.id
    const newTitle = prompt('change title')
    if (newTitle) {
      update({ id, title: newTitle }).then(() => e.target.closest('li').children[0].textContent = newTitle)
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}
async function update(note) {
  await fetch(`/${note.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
}
