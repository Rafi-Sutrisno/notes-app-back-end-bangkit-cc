const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {

    // untuk isi datanya
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // untuk object notes nya dan isi data tadi
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    // menambahkan object newNote ke dalam array Notes
    notes.push(newNote);

    // cek apakah succes (cek ada tidaknya note didalam array notes dengan id note yg ditambahkan)
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // cek response dan return kan response itu beserta isi responsenya
    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        });
        response.code(201);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    // ambil nilai id di parameter routes
    const { id } = request.params;

    // ambil note dengan id tersebut
    const note = notes.filter((n) => n.id === id)[0];

    // cek jika memang ada note dengan id tersebut (cek tidak undefined)
    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;

};

const editNoteByIdHandler = (request, h) => {
    // ambil id dari paramater routes
    const { id } = request.params;
    // ambil title,tags, body dari payload karena method PUT dan biasanya akan mengirin JSON
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
          // ambil semua key dulu dari notes ini (ini hanya ambil key)
          ...notes[index],
          // lalu isi value nya dengan data baru yg telah diambil tadi
          title,
          tags,
          body,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal meghapus catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
};

module.exports = { addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler, 
    deleteNoteByIdHandler};