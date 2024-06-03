```mongodb
// Inserting a new book into the collection:
db.books.insert({
  "title": "MongoDB 9.0 in Action",
  "publisher": "Manning Publications",
  "status": "Available",
  "publicationYear": 2024
})

// Finding a book by title:
db.books.find({ "title": "MongoDB 8.0 in Action" })

// Updating the publisher of a book:
db.books.updateOne(
  { "title": "MongoDB 8.0 in Action" },
  { $set: { "publisher": "Manning Publications Co" } }
)

// Removing documents based on publication status:
db.books.deleteMany({ "status": "out of print" })
