const request = require('supertest');
const app = require('../app'); // Asegúrate de que sea la ruta correcta de tu app
const mongoose = require('mongoose');
const Note = require('../models/Note');

beforeAll(async () => {
  // Conecta a la base de datos de prueba
  const uri = 'mongodb://localhost:27017/testnotesdb';  // Usa una base de datos de prueba
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Limpia la base de datos después de las pruebas
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Notes API', () => {
  
  it('should create a new note', async () => {
    const noteData = {
      title: 'Test Note',
      content: 'This is a test note.',
      author: 'Test Author',
    };

    const response = await request(app).post('/api/notes').send(noteData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota Guardada');
    
    // Verificar que la nota haya sido guardada en la base de datos
    const note = await Note.findOne({ title: 'Test Note' });
    expect(note).toBeTruthy();
    expect(note.content).toBe('This is a test note.');
  });

  it('should get all notes', async () => {
    const response = await request(app).get('/api/notes');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific note by ID', async () => {
    const note = new Note({
      title: 'Note to Retrieve',
      content: 'Content for specific note retrieval',
      author: 'Test Author',
    });
    await note.save();

    const response = await request(app).get(`/api/notes/${note._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Note to Retrieve');
  });

  it('should update a note', async () => {
    const note = new Note({
      title: 'Note to Update',
      content: 'Old content',
      author: 'Test Author',
    });
    await note.save();

    const updatedData = {
      title: 'Updated Note',
      content: 'Updated content',
      author: 'Updated Author',
    };

    const response = await request(app).put(`/api/notes/${note._id}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota Actualizada');

    // Verificar que la nota ha sido actualizada
    const updatedNote = await Note.findById(note._id);
    expect(updatedNote.title).toBe('Updated Note');
    expect(updatedNote.content).toBe('Updated content');
  });

  it('should delete a note', async () => {
    const note = new Note({
      title: 'Note to Delete',
      content: 'This note will be deleted.',
      author: 'Test Author',
    });
    await note.save();

    const response = await request(app).delete(`/api/notes/${note._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota Eliminada');

    // Verificar que la nota ha sido eliminada
    const deletedNote = await Note.findById(note._id);
    expect(deletedNote).toBeNull();
  });
});
