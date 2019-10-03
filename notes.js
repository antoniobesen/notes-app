const fs = require('fs')
const chalk = require('chalk')


const readNote = (title) => {
	const noteFound = loadNotes().find((note) => note.title === title)

	if(noteFound) {
		console.log(chalk.green.inverse(noteFound.title))
		console.log(noteFound.body)	
	} else {
		console.log(chalk.red.inverse('Unable to find note'))
	}
}

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

	if(duplicateNote === undefined) {
		notes.push({
			title: title,
			body: body
		})
		
		saveNotes(notes)
		console.log(chalk.green.inverse('Note saved!'))	
	} else {
		console.log(chalk.red.inverse('Title already taken!'))
	}
}

const saveNotes = (notes) => {
	dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try {
		dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch(e) {
		return []
	}
}

const removeNote = (title) => {
	notes = loadNotes()
	const newNotes = notes.filter((note) => note.title != title)
	if(newNotes.length < notes.length) {
		saveNotes(newNotes)
		console.log(chalk.bgGreen(title+' sucessfully removed!'))
	} else {
		console.log(chalk.bgRed('invalid title, try again.'))
	}
	
}

const listNotes = () => {
	console.log(chalk.bgGreen("Your notes:"))
	loadNotes().forEach((note) => {
		console.log(chalk.bgGreen(note.title))
	})
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}