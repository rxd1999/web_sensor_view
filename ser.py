import serial
ser = serial.Serial(port='/dev/ttyUSB0', baudrate=9600, timeout=10)
ser.write(1)
print(ser.read())
