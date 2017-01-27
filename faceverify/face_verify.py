import cognitive_face as CF
import httplib, urllib, base64, json

headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key':'',
}

data = {
    # Reaquest data
    'faceId':'',
    'personId':'',
    'personGroupId':''}

faceData = json.dumps(data)

params = urllib.urlencode({})

def reqHeaders(key,personId,personGroupId):
  try:
    data['personId'] = str(personId)
    data['personGroupId'] = str(personGroupId)
    headers['Ocp-Apim-Subscription-Key']=str(key)
    return data,headers
  except:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))
    
def faceDetect(img_url,KEY):
  try:
    CF.Key.set(KEY)
    result = CF.face.detect(img_url)
    faceID = result[0]
    data['faceId'] = str(faceID['faceId'])
    faceData = json.dumps(data)
    return faceData 
  except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))

def faceVerify(faceData):
  try:
    conn = httplib.HTTPSConnection('api.projectoxford.ai')
    conn.request("POST", "/face/v1.0/verify?%s" % params, faceData, headers)
    response = conn.getresponse()
    data = response.read()
    conn.close()
    return data
  except Exception as e:
    print("[Errno {0}] {1}".format(e.errno, e.strerror))


