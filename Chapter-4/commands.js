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

# Listing 4.14 Using projection
db.routes.find(
  {},
  { "airline.name": 1, "src_airport": 1, "dst_airport": 1, "_id": 0 }
)



# Listing 4.16 Using $elemMatch operator
db.customers.find({
  accounts: { $elemMatch: { $gt: 300000, $lt: 400000 } }
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















