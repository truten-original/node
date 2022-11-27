// require('./module')
// const person = {
//     name: 'Vladilen',
//     age: 28
// }

// function getName(p) {
//     return p.name
// }
// // console.log(getName(person))

// console.log(__filename)
// console.log(__dirname)
// console.log(process.argv)

const yargs = require('yargs')
const { addNote, printNotes } = require('./notes.controller')
yargs.command({
  command: 'add',
  describe: 'Add new note to List',
  builder: {
    title: {
      type: 'string',
      describe: 'note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title)
  },
})
yargs.command({
  command: 'list',
  describe: 'print list',
   handler() {
    printNotes()
  },
})

yargs.parse()
