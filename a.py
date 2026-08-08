import requests
from requests.auth import HTTPBasicAuth

response = requests.get(
    "https://api2.watttime.org/v2/login",
    auth=HTTPBasicAuth("agoswami", "ag2006ag")
)

token = response.json()["token"]