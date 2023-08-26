using Microsoft.AspNetCore.Mvc;
using System.Linq;
using api.Entities;
using api.DbOperations;

namespace api.Controllers 
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase 
    {
        private readonly NoteAppDbContext _context;

        public NotesController(NoteAppDbContext context)
        {
            this._context = context;
        }
    
        [HttpGet]
        public IActionResult GetAll([FromQuery]string text = "") {
            var notes = _context.Notes.Where(x => x.Title.Contains(text.ToLower()) || x.Body.Contains(text.ToLower())).ToList<Note>();
            
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id) {
            var note = _context.Notes.SingleOrDefault<Note>(x => x.Id == id);

            return Ok(note);
        }

        [HttpPost]
        public IActionResult Create(Note note) {
            _context.Notes.Add(note);

            _context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public IActionResult Update(Note note) {
            var updatedNote = _context.Notes.SingleOrDefault<Note>(x => x.Id == note.Id);

            updatedNote.Title = note.Title == string.Empty ? updatedNote.Title : note.Title;
            updatedNote.Color = note.Color == string.Empty ? updatedNote.Color : note.Color;
            updatedNote.Body = note.Body == string.Empty ? updatedNote.Body : note.Body;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id) {
            var note = _context.Notes.SingleOrDefault(x => x.Id == id);

            _context.Notes.Remove(note);
            _context.SaveChanges();

            return Ok();
        }
    }
}