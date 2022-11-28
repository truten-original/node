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

// const yargs = require('yargs')
// const { addNote, printNotes, removeNote } = require('./notes.controller')
// yargs.command({
//   command: 'add',
//   describe: 'Add new note to List',
//   builder: {
//     title: {
//       type: 'string',
//       describe: 'note title',
//       demandOption: true,
//     },
//   },
//   handler({ title }) {
//     addNote(title)
//   },
// })
// yargs.command({
//   command: 'list',
//   describe: 'print list',
//   handler() {
//     printNotes()
//   },
// })
// yargs.command({
//   command: 'remove',
//   describe: 'remove some note',
//   builder: {
//     id: {
//       type: 'string',
//       describe: 'note id',
//       demandOption: true,
//     },
//   },
//   handler({ id }) {
//     removeNote(id)
//   },
// })
// yargs.parse()

/*создание http сервера */
// const http = require('http')
// const chalk = require('chalk')
// const fs = require('fs/promises')
// const path = require('path')
// const { addNote } = require('./notes.controller')
// const port = 3000
// const basePath = path.join(__dirname, 'pages')
// const server = http.createServer(async (request, response) => {
//   // console.log('request object:', request.method)
//   // console.log('request object:', request.url)
//   // response.end('hello from server')
//   if (request.method === 'GET') {
//     const content = await fs.readFile(path.join(basePath, 'index.html'))
//     //  response.setHeader('Content-Type', 'text/html')
//     response.writeHead(200, {
//       'Content-Type': 'text/html',
//     })
//     response.end(content)
//   } else if ((request.method = 'POST')) {
//     const body = []
//     response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
//     request.on('data', (data) => {
//       // console.log(data)
//       body.push(Buffer.from(data))
//     })
//     request.on('end', () => {
//       const title = body.toString().split('=')[1].replaceAll('+', ' ')
//       addNote(title)
//       response.end(`title: ${title}`)
//     })
    
//   }
// })

// server.listen(port, () => {
//   console.log(chalk.green(`server has been started on ${port}`))
// })

/*создание сервера express */
const express = require('express')
const path = require('path')
const chalk = require('chalk')
const {addNote, getNotes, removeNote, updateNote} = require('./notes.controller')
const port = 3000
// const basePath = path.join(__dirname, 'pages')
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/', async (req, res) => {
  // res.sendFile(path.join(basePath, 'index.html'))
  res.render('index', {title: 'Express App',notes: await getNotes(), created: false})
})
app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
  // res.sendFile(path.join(basePath, 'index.html'))
} )
app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})
app.put('/:id', async (req, res) => {
  await updateNote(req.body)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})
app.listen(port, () => {
  console.log(chalk.green(`server has been started on ${port}`))
})