from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello_world():
    return 'Lumoz Main Core'

@app.route('/process/<xvalue>/<yvalue>')
def process(xvalue,yvalue):
    x = int(xvalue)
    y = int(yvalue)
    

    red = [255,0,0]

    img = np.zeros((100, 100, 3), dtype = "uint8")
    img.fill(225)

    cv2.circle(img, (x,y), 2, red, -1)

    pil_img = Image.fromarray(img)
    buff = BytesIO()
    pil_img.save(buff, format="PNG")
    new_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")
    
    return jsonify("data:image/png;base64,"+new_image_string)
