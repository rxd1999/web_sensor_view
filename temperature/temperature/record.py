import pymysql
import ser_read
import time
db = pymysql.connect(host="127.0.0.1",user="root",password="1999511326RXD",database="temperature")
cursor = db.cursor()
infomation = ser_read.get_info()
if infomation["status"] == "success":
    humi = infomation["RH"]
    temp = infomation["T"]
    sql = "INSERT INTO data_temperature (date,temper,humi) VALUES ('DATE',TEMP,HUMI)"
    sql = sql.replace("DATE",time.strftime("%Y-%m-%d %H:%M",time.localtime())).replace("TEMP",str(temp)).replace("HUMI",str(humi))
    print(sql)
    cursor.execute(sql)
    db.commit()
db.close()
