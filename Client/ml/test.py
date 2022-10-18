
# Python program to read
# json file
  
  

import json

input_file = open ('export.json')
json_array = json.load(input_file)
store_list = []
name="Ch ips"
newName=name.lower().replace(" ","")
print("new",newName)
for item in json_array:
    print(item['name'].lower())
    if(newName==item['name'].lower()):
        print(item['id'])
        break


# print(store_list)
  
# Closing file
