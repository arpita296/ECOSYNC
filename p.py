
# To reset your password, use this code:

import requests
password_url = 'https://api.watttime.org/password/?username=freddo'
rsp = requests.get(password_url)
print(rsp.json())
