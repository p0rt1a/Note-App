using System;
using System.Linq;
using api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace api.DbOperations
{
    public static class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider) {
            using(var context = new NoteAppDbContext(serviceProvider.GetRequiredService<DbContextOptions<NoteAppDbContext>>())) {
                if (context.Notes.Any()) {
                    return;
                }

                context.Notes.AddRange(
                    new Note {
                        Id = "1",
                        Color = "43aa8b",
                        Title = "Note 1",
                        Body = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, corporis ipsa doloremque ipsam nobis deleniti accusantium ex ut voluptates est?"
                    },
                    new Note {
                        Id = "2",
                        Color = "f94144",
                        Title = "Note 2",
                        Body = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, corporis ipsa doloremque ipsam nobis deleniti accusantium ex ut voluptates est?"
                    },
                    new Note {
                        Id = "3",
                        Color = "f9844a",
                        Title = "Note 3",
                        Body = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, corporis ipsa doloremque ipsam nobis deleniti accusantium ex ut voluptates est?"
                    },
                    new Note {
                        Id = "4",
                        Color = "4d908e",
                        Title = "Note 4",
                        Body = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, corporis ipsa doloremque ipsam nobis deleniti accusantium ex ut voluptates est?"
                    }
                );

                context.SaveChanges();
            }
        }
    }
}