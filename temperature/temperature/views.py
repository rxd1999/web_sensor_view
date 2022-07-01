from django.http import HttpResponse
from data import models
import time
import json
from . import ser_read
BASE_DIR = '/root/web/temperature/'

def upload(request):
        if request.GET["humi"]:
            status = models.current_status.objects.get(pk=1)
            status.update_count+=1
            status.humi = request.GET["humi"]
            status.temper = request.GET["temp"]
            if status.update_count==600:
                data = models.temperature(date=time.strftime("%Y-%m-%d %H:%M"), humi = request.GET["humi"], temper = request.GET["temp"])
                data.save()
                status.update_count=0
            status.save()
        return HttpResponse('ok')

#def return_data(request):
#    datas ={}
#    infomation = models.current_status.objects.values('humi','temper')[0]
#    datas["humi"]=infomation["humi"].to_eng_string()
#    datas["temp"]=infomation["temper"].to_eng_string()
#    return HttpResponse(json.dumps(datas))

def return_data(request):
    info = ser_read.get_info()
    return HttpResponse(json.dumps(info))

def draw_data(request):
    data={}
    data["temperature"]=[]
    data["time"]=[]
    data["humi"]=[]
    if request.GET:
        month = request.GET["month"]
        day = request.GET["day"]
        infomation = models.temperature.objects.filter(date__contains=(time.strftime("%Y")+'-'+month+'-'+day))
        for i in infomation:
            data["time"].append(str(i.date).split(' ')[-1])
            data["temperature"].append(str(i.temper))
            data["humi"].append(str(i.humi))
        #data["time"]=str(data["time"])
        #data["humi"]=str(data["humi"])
        #data["temperature"]=str(data["temperature"])
    return HttpResponse(json.dumps(data))

def index(request):
    f = open(BASE_DIR+'/temperature/static/index.html','r',encoding='utf-8').read()
    return HttpResponse(f)
