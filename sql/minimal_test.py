#!/usr/bin/python

from json import JSONEncoder, loads
import logging
import MySQLdb
import sys
import cgi
import os


logging.basicConfig(
    format='%(asctime)s: %(levelname)s: %(message)s',
    datefmt='%I:%M:%S',
    level=logging.DEBUG,
    filename='log.txt'
)


dbs = {
    "user": "db211804_dummy2",
    "passwd": "Dummy@12345",
    "db": "db211804_bestiary_database",
    "port": 3306,
    "host": "internal-db.s211804.gridserver.com"
}

try:

    arguments = cgi.FieldStorage()
    data = loads(arguments.value)
    table = data["table"]
    columns = ", ".join(data["columns"])
    db = MySQLdb.connect(**dbs)

    c = db.cursor()

    #where the details (e.g. we want high scores or whatever)
    c.execute("SELECT " + columns + " FROM " + table)

    rows = c.fetchall()



    data = {
        "count": c.rowcount,
        "rows": rows,
        "echo": data
    }


    print "Content-Type: text/plain"
    print
    print JSONEncoder().encode(data)

    for key in os.environ:
        logging.debug(str(key) + ": " + str(os.environ[key]))

    # print cgi.FieldStorage()

except Exception as e:
    logging.debug("error")
    logging.debug(sys.exc_info())
    logging.debug(e)
