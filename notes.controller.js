const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
async function addNote(title) {
    // const notes = require('./db.json')
//    const buffer = await fs.readFile(notesPath)
//    const notes= Buffer.from(buffer).toString('utf-8')
const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('note was added'))
}
async function getNotes() {
const notes = await fs.readFile(notesPath,  {encording: 'utf-8' })

    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes () {
    const notes = await getNotes()
    notes.forEach(note => console.log(chalk.blue(note.title)))
    
}
module.exports = {
    addNote,
    printNotes

}