import os
import glob
import time
import MySQLdb
"""Leest temperatuursensor elke 10 seconden uit, 10 times, en 
   schrijft waarden met tijd in database"""
db = MySQLdb.connect("localhost","root","GJdI8045","pi")
cursor = db.cursor()

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

def read_temp_raw():
  f = open(device_file,'r')
  lines = f.readlines()
  f.close()
  return lines

def read_temp():
  lines = read_temp_raw()
  while lines[0].strip()[-3:] != 'YES':
    time.sleep(0.2)
    lines = read_temp_raw()
  equals_pos = lines[1].find('t=')
  if equals_pos != -1:
    temp_string = lines[1][equals_pos+2:]
    temp_c = float(temp_string)/1000.0
    temp_f = temp_c * 9.0 / 5.0 +32.0
    return temp_c, temp_f


while True:
  (temp_c, temp_f) = read_temp()
  t = time.strftime("%Y-%m-%d %H:%M:%S")
  print t, temp_c, temp_f
  time.sleep(1)
  try:
    cursor.execute('INSERT INTO Temp1 VALUES("%s","%s","%s")' % \
      (t, temp_c, temp_f))
    db.commit()
  except:
    db.rollback()
