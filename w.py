import requests

url = "https://api2.watttime.org/v2/password"

params = {
    "username": "agoswami"
}

response = requests.get(url, params=params)

print(response.status_code)
print(response.text)