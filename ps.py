import requests

headers = {
    "Authorization": f"Bearer {token}"
}

params = {
    "latitude": 22.5726,
    "longitude": 88.3639
}

response = requests.get(
    "https://api2.watttime.org/v2/index",
    headers=headers,
    params=params
)

print(response.status_code)
print(response.text)