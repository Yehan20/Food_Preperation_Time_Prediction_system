
from flask import Flask,render_template,request
import pickle
import numpy as np
import json

app=Flask(__name__)

def load_md():
    model=pickle.load(open('file2.pkl','rb')) 
    return model

 #get from front end the strings we convert them to numebr format 
def convertCategory(foodCategory):
  if foodCategory == "desert":
   return 3
  elif foodCategory == "bites":
   return 1
  elif foodCategory == "main":
    return 4
  elif foodCategory == "appetizer":
    return 0


def convertSize(size):
    if size=="nm":
        return 1
    elif size=="lg":
        return 0
    elif size=='xl':
        return 2        

def convertExp(exp):
    if exp=='senior':
     return 1
    else:
     return 0

model = load_md() # can get the model 

@app.route('/time',methods=['GET','POST'],strict_slashes=False)
def predictTime():

   request_method_type= request.method
   if(request_method_type=="POST"):
      food_id=0;
      y=request.json; #post request comming from axios
      
      #Get JSON File we created when we train our model with the food id is   
      input_file = open ('export.json')
      json_array = json.load(input_file)

      name=y["foodName"] # get from the front end
      foodCategory=y['category']
      foodSize=y['size']
      exp=y['exp']

      newName=name.lower().replace(" ","")
      newCategory=convertCategory(foodCategory);
      convertedSize=convertSize(foodSize)
      cnvrtdExp=convertExp(exp)
    
     #   For in loop to assign the respective id for the food item which we send from the frotn end
      for item in json_array:
            if(newName==item['name'].lower().replace(" ","")):
                food_id=item['id']
                print(item['id'])
                break

     # Capture food category

  
      data=[food_id,newCategory,convertedSize,y["foodAmt"],y["nonVeg"],y["veg"],y["incompleteOrdrs"],cnvrtdExp,y["hrs"]]
      num= np.array([data])
      #   print(num.astype(np.float))
      time=model.predict(num.astype(np.float)) # make the prediction
      return str(time[0]);
 

# from flask import Flask
# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'