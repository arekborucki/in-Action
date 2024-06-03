// Building Aggregation Pipelines

// Example of aggregation pipeline using $match, $group, $sort, and $limit
db.routes.aggregate([
  {
    $match: { airplane: "CR2" } // Filter documents where the airplane is "CR2"
  },
  {
    $group: {
      _id: "$src_airport",       // Group by source airport
      totalRoutes: { $sum: 1 }   // Count the number of routes from each source
    }
  },
  {
    $sort: { totalRoutes: -1 }   // Sort the results by the number of routes in descending order
  },
  {
    $limit: 5                    // Limit the number of displayed documents to 5
  }
]);

// Using $set and $unset instead of $project
db.routes.aggregate([
  {
    $unset: ["codeshare", "stops"] // Excludes 'codeshare' and 'stops' fields from the output documents
  }
]);

db.routes.aggregate([
  {
    $set: {
      isDirect: {
        $eq: ["$stops", 0] // Sets 'isDirect' to true if there are no stops, false otherwise
      }
    }
  },
  {
    $unset: "codeshare" // Removes the 'codeshare' field from all documents in the output
  }
]);

// Using $project for significant document restructuring
db.routes.aggregate([
  {
    $project: {
      src_airport: 1, // Include the source airport
      dst_airport: 1, // Include the destination airport
      _id: 0 // Exclude the MongoDB document ID from the output
    }
  }
]);

// Saving results of aggregation pipelines using $out and $merge

// Example of using $out stage
db.routes.aggregate([
  {
    $match: { airplane: "CR2" } // Filter documents where the airplane is "CR2"
  },
  {
    $project: {
      src_airport: 1,  // Include the source airport field
      airplane: 1      // Include the airplane field
    }
  },
  {
    $out: { db: "output_db", coll: "projected_routes" } // Write the results to the specified database and collection
  }
]);

// Example of using $merge stage
db.routes.aggregate([
  {
    $match: { airplane: "CR2" } // Filter documents where the airplane is "CR2"
  },
  {
    $project: {
      _id: 1,                    // Include the document ID field
      src_airport: 1,            // Include the source airport field
      dst_airport: 1,            // Include the destination airport field
      airline_name: "$airline.name" // Include the airline name field, renaming it to airline_name
    }
  },
  {
    $merge: {
      into: "routes",            // Merge back into the original collection
      whenMatched: "merge",      // Merge the fields with existing documents
      whenNotMatched: "insert"   // Insert as new documents if no match is found
    }
  }
]);

// Joining collections using $lookup
db.transactions.aggregate([
  {
    $lookup: {
      from: "accounts",            // Joining from the accounts collection
      localField: "account_id",    // Field from transactions collection
      foreignField: "account_id",  // Field from the accounts collection
      as: "account_details"
    }
  },
  {
    $unwind: "$account_details"     // Unwind the result to merge objects properly
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$account_details", "$$ROOT"]  // Merging the account details into the transaction
      }
    }
  },
  {
    $unset: "account_details"  // Remove the account_details field from the final output
  }
]);

// Deconstructing arrays with $unwind
db.customers.aggregate([
  {
    $match: { _id: ObjectId("5ca4bbcea2dd94ee58162a76") }
  },
  {
    $unwind: "$accounts"
  },
  {
    $project: {
      _id: 0,
      username: 1,
      accounts: 1
    }
  }
]);

// Counting occurrences of account numbers using $unwind and $group
db.customers.aggregate([
  { $unwind: "$accounts" },
  { 
    $group: { 
      _id: "$accounts", // Group by account number
      count: { $sum: 1 } // Count occurrences of each account number
    }
  },
  { $sort: { count: -1 } } // Sort by the number of occurrences (descending)
]);

// Using aggregation accumulators like $max and $avg
db.customers.aggregate([
  { $unwind: "$accounts" },
  {
    $group: {
      _id: { username: "$username" }, // Group by username
      maxAccountNumber: { $max: "$accounts" } // Find the maximum account number
    }
  }
]);

db.customers.aggregate([
  { 
    $addFields: { 
      numberOfAccounts: { $size: "$accounts" } // Add a field that calculates the number of accounts each user has 
    }
  },
  {
    $group: {
      _id: null, // Group all documents together
      averageNumberOfAccounts: { $avg: "$numberOfAccounts" } // Calculate the average number of accounts
    }
  }
]);

// Creating MongoDB view with $lookup
db.createView("enriched_transactions", "transactions", [
  {
    $lookup: {
      from: "customers",
      let: { account_id: "$account_id" },
      pipeline: [
        { $match: { $expr: { $in: ["$$account_id", "$accounts"] } } }
      ],
      as: "customer_details"
    }
  },
  {
    $unwind: {
      path: "$customer_details",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $set: {
      "Customer Name": "$customer_details.name",
      "Customer Email": "$customer_details.email",
      "Customer Address": "$customer_details.address",
      "Customer Tier and Benefits": "$customer_details.tier_and_details"
    }
  },
  {
    $unset: "customer_details"
  }
]);
