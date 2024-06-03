# Using Ruby Driver
# Install the MongoDB Ruby driver
gem install mongo

# Example Ruby script to connect and query MongoDB
require 'mongo'

uri = "<connection string uri>"
client = Mongo::Client.new(uri)

begin
  database = client.use("sample_training")
  routes = database[:routes]
  query = { 'src_airport' => 'JFK' }
  route = routes.find(query).first
  puts route
rescue => error
  puts error.message
ensure
  client.close
end

# Execute the Ruby script
ruby mongodb-ruby.rb

# Learning Mongoid
# Install Mongoid ODM
gem install mongoid

# Include Mongoid in your Gemfile
gem 'mongoid', '~> 8.1.0'
