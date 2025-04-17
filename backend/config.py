from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# MONGO CRED: username: admin, password: kINNPfWffVyeulVk
# uri = "mongodb+srv://ravigargrud:fn3Qxv0gooZ9rlvI@cluster0.eozxc.mongodb.net"
uri = "mongodb://localhost:27017"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Create a new database, if the database does not exist
db = client.medAI

# Create a new collection, if the collection does not exist
patientCollection = db["patients"]

# Create a new collection, if the collection does not exist
doctorCollection = db["doctors"]

# Create a new collection, if the collection does not exist
appointmentCollection = db["appointments"]