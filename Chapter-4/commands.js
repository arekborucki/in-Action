# Listing 4.1 inserting a single document to MongoDB
db.routes.insertOne({
  airline: { id: 410, name: 'Lufthansa', alias: 'LH', iata: 'DLH' },
  src_airport: 'MUC',
  dst_airport: 'JFK',
  codeshare: '',
  stops: 0,
  airplane: 'A380'
})

# Listing 4.2 Inserting many documents to MongoDB
db.routes.insertMany([
  {
    airline: { id: 413, name: 'American Airlines', alias: 'AA', iata: 'AAL' },
    src_airport: 'DFW',
    dst_airport: 'LAX',
    codeshare: '',
    stops: 0,
    airplane: '737'
  },
  {
    airline: { id: 411, name: 'British Airways', alias: 'BA', iata: 'BAW' },
    src_airport: 'LHR',
    dst_airport: 'SFO',
    codeshare: 'Y',
    stops: 0,
    airplane: '747'
  },
  {
    airline: { id: 412, name: 'Air France', alias: 'AF', iata: 'AFR' },
    src_airport: 'CDG',
    dst_airport: 'JFK',
    codeshare: '',
    stops: 0,
    airplane: '777'
  }
])

# Listing 4.3 Using the $set operator
db.routes.updateOne(
  { "airline.id": 411, "src_airport": "LHR", "dst_airport": "SFO", "airplane": "747" },
  { $set: { "airplane": "A380" } }
)

# Listing 4.4 Using the $inc operator
db.routes.updateOne(
  { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX", "stops": 0 },
  { $inc: { "stops": 1 } }
)

# Listing 4.5 Using the $push operator
db.routes.updateOne(
  { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" },
  { $push: { "prices": { class: "business", price: 2500 } } }
)

db.routes.updateOne( 
    { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" }, 
    { $push: { prices: { $each: [{ class: "economy", price: 800 }, { class: "first", price: 2000 }] } } } 
) 

db.routes.updateOne( 
    { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" }, 
    { 
        $push: { 
            prices: { 
                $each: [ 
                    { class: "premium economy", price: 1100 }, 
                    { class: "luxury", price: 3000 } 
                ], 
                $sort: { price: 1 }, // Sorts prices 
                $slice: -5 // Keeps the last 5 entries  
            } 
        } 
    } 
) 

# Listing 4.6   The content of the document after an array update 
db.routes.find({ "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" }) 

# Listing 4.7 Using $addToSet operator
db.routes.updateOne(
  { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" },
  { $addToSet: { "prices": { class: 'economy plus', price: 1200 } } }
)

# Listing 4.8 Using the $pull operator
db.routes.updateOne(
  { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" },
  { $pull: { prices: { class: 'first', price: 2000 } } }
)

# Listing 4.9 Using the $pop operator
db.routes.updateOne(
  { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" },
  { $pop: { prices: 1 } } # Removes the last element
)

db.routes.updateOne( 
   { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" }, 
   { $set: { "prices.2.price": 950 } } 
) 

db.routes.updateOne( 
    { 
        "airline.id": 413, 
        "src_airport": "DFW", 
        "dst_airport": "LAX", 
        "prices.class": "luxury" // Condition to identify the element 
    }, 
    { 
        $set: { "prices.$.price": 3500 } // Using the positional operator to update the price 
    } 
) 

# Listing 4.10 The $[<identifier>] operator with arrayFilters
db.routes.updateOne( 
    { "airline.id": 413, "src_airport": "DFW", "dst_airport": "LAX" }, 
    { 
        $set: { 
            "prices.$[elem].price": 600 
        } 
    }, 
    { 
        arrayFilters: [ 
            { "elem.class": "economy" } 
        ] 
    } 
) 

# Listing 4.11 Replacing a document in MongoDB
db.routes.replaceOne(
  { "airline.id": 412, "src_airport": "CDG", "dst_airport": "JFK" },
  {
    flight_info: { airline: "Air France", flight_number: "AF 007" },
    route: { from: "CDG", to: "JFK" },
    aircraft: "Boeing 777",
    status: "Scheduled"
  },
  { upsert: true }
)

# Listing 4.12 Using logical operators
db.routes.find({ "src_airport": "CDG", "dst_airport": "JFK" })

db.routes.find({ 
    $or: [ 
        { "src_airport": "CDG" }, 
        { "dst_airport": "JFK" } 
    ] 
}) 

db.routes.find({ 
    $or: [ 
        { "src_airport": "CDG", "airline.name": { $ne: 'American Airlines' } },  // Find flights from CDG not operated by American Airlines 
        { "dst_airport": "JFK", "airplane": { $ne: '777' } }  // Find flights to JFK not using a 777 airplane 
    ] 
})

# Listing 4.13 Using $in and $nin operators
db.routes.find({ src_airport: { $in: ['MUC', 'JFK', 'LHR', 'DFW'] } }) 

# Listing 4.14 Using projection
db.routes.find(
  {},
  { "airline.name": 1, "src_airport": 1, "dst_airport": 1, "_id": 0 }
)

db.routes.find( 
  {},  
  { "codeshare": 0, "stops": 0 } 
) 

db.routes.find({ 
  "codeshare": "null" 
}); 

db.routes.find({ 
 "codeshare": { $ne: null, $exists: true } 
}) 

db.routes.find({ 
  "codeshare": { $exists: false } 
}) 

db.routes.find({ 
"codeshare": { $type: "null"}  
}) 

db.routes.find({ 
  "airline.name": {$regex: "air", $options: "i"} 
}) 

db.routes.find({ 
"src_airport": { $regex: "^[BC]", $options: "i" } 
}) 

db.routes.find({ 
"dst_airport": { $regex: "X$", $options: "i" }  // Matches destination airport codes ending with 'X' 
}) 

db.customers.find({ 
accounts: 371138 
}) 

db.customers.find({ 
 accounts: [371138, 324287, 276528, 332179, 422649, 387979] 
}) 

db.customers.find({ 
accounts: [371138, 324287, 276528] 
}) 

# Listing 4.15 Using the $all operator
db.customers.find({ 
accounts: { $all: [371138, 324287, 276528] } 
})

db.customers.find({ 
   accounts: { $gt: 300000 } 
})

# Listing 4.16 Using $elemMatch operator
db.customers.find({
  accounts: { $elemMatch: { $gt: 300000, $lt: 400000 } }
})

db.customers.find({ 
'accounts.1': 324287 
}) 

db.customers.find({ 
  "tier_and_details.0df078f33aa74a2e9696e0520c1a828a.active": true, 
  "accounts.0": { $gte: 300000 } 
}) 

# Listing 4.17 Using $size operator
db.customers.find({ 
accounts: { $size: 6 } 
}) 

db.routes.find({ "prices.price": {$lt: 1000}}); 

# Listing Listing 4.19 Using nested document 
db.routes.find({ 
"airline": { "id": 413, "name": "American Airlines", "alias": "AA", "iata": "AAL" } 
}) 

# Listing 4.20 Using deleteOne() method
db.routes.deleteOne({
  "airline.id": 417,
  "src_airport": "MUC",
  "dst_airport": "LAX"
})

# Listing 4.21 Using deleteMany() method
db.routes.deleteMany({
  "airline.id": 417,
  "src_airport": "MUC",
  "dst_airport": "LAX"
})

# Listing 4.22 Syntax of the bulkWrite command in MongoDB 8.0
db.adminCommand({
  bulkWrite: 1,
  ops: [
    {
      insert: 0,
      document: {
        airline: { id: 413, name: 'American Airlines', alias: 'AA', iata: 'AAL' },
        src_airport: 'DFW',
        dst_airport: 'LAX',
        codeshare: '',
        stops: 0,
        airplane: '737'
      }
    },
    {
      insert: 1,
      document: {
        accounts: [371138, 324287],
        tier_and_details: {
          '0df078f33aa74a2e9696e0520c1a828a': {
            tier: 'Bronze',
            id: '0df078f33aa74a2e9696e0520c1a828a',
            active: true,
            benefits: ['sports tickets']
          },
          '699456451cc24f028d2aa99d7534c219': {
            tier: 'Bronze',
            benefits: ['24 hour dedicated line'],
            active: true,
            id: '699456451cc24f028d2aa99d7534c219'
          }
        }
      }
    }
  ],
  nsInfo: [
    { ns: "sample_training.routes" },
    { ns: "sample_analytics.customers" }
  ]
})


# Cursors - Manual iteration
async function manualIteration() {
  const cursor = db.routes.find();
  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }
}
manualIteration();

# Cursors - Fetch all documents into an array
async function fetchAllDocuments() {
  const cursor = db.routes.find({});
  const allValues = await cursor.toArray();
  console.log(allValues);
}
fetchAllDocuments();













