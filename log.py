import requests

url = "https://api2.watttime.org/v2/register"

data = {
    "username": "agoswami",
    "password": "ag2006ag@",
    "email": "goswamiarpita641@gmail.com",
    "org": "ecosync"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.text)