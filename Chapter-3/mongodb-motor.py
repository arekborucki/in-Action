# Using Motor (Python Async Driver)
# Install the Motor driver
python3 -m pip install motor

# Example Motor script to connect and query MongoDB asynchronously
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pprint import pprint

uri = "<connection_string>"

async def find_route():
  client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
  try:
    database = client['sample_training']
    routes_collection = database['routes']
    query = {"src_airport": "JFK", "airline.id": 3201}
    route = await routes_collection.find_one(query)
    if route:
      print("Found a route:")
      pprint(route)
    else:
      print("No route found from JFK.")
  except Exception as e:
    print(f"An error occurred: {e}")
  finally:
    client.close()

asyncio.run(find_route())

# Execute the Motor script
python3 mongodb-motor.py
