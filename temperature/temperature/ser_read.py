import serial
import json
import time
def get_info():
    ser=serial.Serial('/dev/ttyUSB0',9600)
    print(ser.write(bytes([1])))
    stamp = time.time()
    info = {}
    info["status"] = "success"
    while not ser.in_waiting:
        if time.time()-stamp>10:
            info["status"]="fail"
            break
    if info["status"] == "success":
       res = ser.read(ser.in_waiting)
       info.update(json.loads(res))
    return info
if __name__ == '__main__':
    print(get_info())
