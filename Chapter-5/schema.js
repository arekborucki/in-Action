// Designing MongoDB Schema

// Example of embedding airline data for quick access in the routes collection
db.routes.insertOne({
  "_id": ObjectId("56e9b39b732b6122f877facc"),
  "flight_id": "FL123",
  "airline": {
    "id": 410,
    "name": "Delta Airlines",
    "alias": "2B",
    "iata": "ARD"
  },
  "src_airport": "JFK",
  "dst_airport": "LAX",
  "codeshare": "",
  "stops": 0,
  "airplane": "ATP"
});

// Using references for airports in the routes collection
db.airports.insertOne({
  "_id": "JFK",
  "name": "JFK International Airport",
  "location": {
    "city": "New York",
    "country": "USA"
  },
  "facilities": ["Wi-Fi", "Lounge", "VIP Services"]
});

// Example of using the Subset Pattern
db.routes.insertOne({
  "_id": ObjectId("56e9b39b732b6122f877fa35"),
  "flight_id": "FL123",
  "airline": {
    "id": 410,
    "name": "Delta Airlines",
    "alias": "2B",
    "iata": "ARD"
  },
  "src_airport": {
    "code": "JFK",
    "name": "JFK International Airport"
  },
  "dst_airport": {
    "code": "LAX",
    "name": "Los Angeles International Airport"
  },
  "airplane": "CR2",
  "stops": 0
});

// Example of using the Computed Pattern in the airports collection
db.airports.insertOne({
  "_id": "JFK",
  "name": "JFK International Airport",
  "location": {
    "city": "New York",
    "country": "USA"
  },
  "facilities": ["Wi-Fi", "Lounge", "VIP Services"],
  "total_flights": 3500 // Computed field representing the total number of flights from/to this airport
});

// Example of using Schema Validation
db.runCommand({
  collMod: "routes",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["flight_id", "airline", "src_airport", "dst_airport"],
      properties: {
        flight_id: {
          bsonType: "string",
          pattern: "^FL\\d+$",
          description: "must be a string starting with 'FL' followed by numbers"
        },
        airline: {
          bsonType: "object",
          properties: {
            id: {
              bsonType: "int",
              minimum: 1,
              description: "must be a positive integer"
            }
          }
        },
        src_airport: {
          bsonType: "object",
          properties: {
            code: {
              bsonType: "string",
              description: "must be a valid airport code"
            }
          }
        },
        dst_airport: {
          bsonType: "object",
          properties: {
            code: {
              bsonType: "string",
              description: "must be a valid airport code"
            }
          }
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "error"
});

// Example of testing schema validation rule
db.routes.insert({
  flight_id: "XYZ123", // flight_id should start with "FL"
  airline: {
    id: -410, // airline.id must be a positive integer
    name: "Delta Airlines",
    alias: "2B",
    iata: "ARD"
  },
  src_airport: {
    code: "JFK",
    name: "JFK International Airport"
  },
  dst_airport: {
    code: "999", // dst_airport.code must be a valid code
    name: "Unknown Airport"
  },
  airplane: "CR2",
  stops: 0
});

// Example of using the Archive Pattern
db.logs.insertOne({
  "log_id": "abc123",
  "user_id": "98765",
  "activity": "login",
  "timestamp": ISODate("2024-05-12T10:00:00Z"),
  "status": "active"
});

// Example of using the Attribute Pattern
db.products.insertOne({
  "product_id": "98765",
  "common_attributes": {
    "name": "Laptop",
    "price": 1200,
    "in_stock": true
  },
  "rare_attributes": [
    {"key": "special_offer", "value": "10% off"},
    {"key": "warranty_years", "value": 3}
  ]
});

// Example of using the Bucket Pattern
db.sensor_readings.insertOne({
  "sensor_id": "abc123",
  "date": "2024-04-20",
  "readings": [
    {"time": "08:00", "value": 22.5},
    {"time": "08:05", "value": 22.7},
    {"time": "08:10", "value": 22.9}
  ]
});

// Example of using the Computed Pattern
db.products.insertOne({
  "product_id": "321",
  "product_name": "Wireless Headphones",
  "ratings": [5, 4, 5, 3, 4],
  "average_rating": 4.2 // Average rating is pre-computed whenever new ratings are added.
});

// Example of using the Document Versioning Pattern
db.documents.insertOne({
  "document_id": "456",
  "version": 3,
  "content": "Latest content here.",
  "previous_versions": [
    {
      "version": 2,
      "content": "Older content here.",
      "date_modified": "2023-12-01"
    },
    {
      "version": 1,
      "content": "Original content here.",
      "date_modified": "2023-11-01"
    }
  ]
});

// Example of using the Extended Reference Pattern
db.posts.insertOne({
  "post_id": "789",
  "content": "Check out these new features!",
  "user": {
    "user_id": "555",
    "name": "Alex",
    "profile_picture": "/images/alex-profile.jpg"
  },
  "timestamp": "2024-04-20T15:00:00Z"
});

// Example of using the Outlier Pattern
db.sensor_readings.insertOne({
  "sensor_id": "xyz987",
  "regular_readings": [
    {"time": "09:00", "value": 19.5},
    {"time": "09:05", "value": 19.7}
  ],
  "outlier_reading": {
    "time": "09:10",
    "value": 50.1,
    "stored_in": "outliers_collection"
  },
  "date": "2024-04-20"
});

// Example of using the Pre-allocation Pattern
db.students.insertOne({
  "student_id": "12345",
  "name": "John Doe",
  "academic_year": "2024",
  "monthly_records": {
    "January": {"attendance": [], "grades": []},
    "February": {"attendance": [], "grades": []}
    // Other months follow the same structure.
  }
});

// Example of using the Polymorphic Pattern
db.athletes.insertOne({
  "athlete_id": "78910",
  "type": "tennis_player",
  "name": "Alice Smith",
  "age": 25,
  "tennis_specific": {
    "ranking": 15,
    "hand": "right"
  }
});

db.athletes.insertOne({
  "athlete_id": "78911",
  "type": "soccer_player",
  "name": "Bob Johnson",
  "age": 22,
  "soccer_specific": {
    "position": "forward",
    "goals_scored": 30
  }
});

// Example of using the Schema Versioning Pattern
db.products.insertOne({
  "document_id": "456789",
  "schema_version": 2,
  "name": "Product XYZ",
  "price": 199.99,
  "new_feature": "Improved battery life"
});

// Example of using the Subset Pattern
db.users.insertOne({
  "user_id": "112233",
  "name": "Emily White",
  "recent_posts": [
    {"post_id": "p100", "content": "Exciting news today!", "date": "2024-04-18"},
    {"post_id": "p101", "content": "Loved the weather!", "date": "2024-04-17"}
  ],
  "older_posts_link": "posts_archive/112233"
});

// Example of using the Tree Pattern
db.employees.insertOne({
  "employee_id": "2001",
  "name": "Michael Scott",
  "position": "Regional Manager",
  "reports_to": ["1001"],
  "direct_reports": [
    {"employee_id": "2002", "name": "Jim Halpert"},
    {"employee_id": "2003", "name": "Pam Beesly"}
  ]
});
