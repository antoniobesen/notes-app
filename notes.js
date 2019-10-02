const fs = require('fs')
const chalk = require('chalk')


const getNotes = function () {
    return 'Your notes...'
}

const addNote = function(title, body) {
	const notes = loadNotes()
	const duplicateNotes = notes.filter(function(note) {
		return note.title == title
	})

	if(duplicateNotes.length == 0) {
		notes.push({
			title: title,
			body: body
		})
		
		saveNotes(notes)
		console.log('Note saved!')	
	} else {
		console.log('Title already taken!')
	}
	

}

const saveNotes = function(notes) {
	dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
	try {
		dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch(e) {
		return []
	}
}

const removeNote = function(title) {
	notes = loadNotes()
	const newNotes = notes.filter(function(note) {
		return note.title != title
	})
	if(newNotes.length < notes.length) {
		saveNotes(newNotes)
		console.log(chalk.bgGreen(title+' sucessfully removed!'))
	} else {
		console.log(chalk.bgRed('invalid title, try again.'))
	}
	
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote
}