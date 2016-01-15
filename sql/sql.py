#!/usr/bin/python

from json import JSONEncoder, loads
import logging
import MySQLdb
import sys
import cgi
import os

# datefmt='%m/%d/%Y %I:%M:%S %p'
logging.basicConfig(
    format='%(asctime)s: %(levelname)s: %(message)s',
    datefmt='%I:%M:%S',
    level=logging.DEBUG,
    filename='log.txt'
)

def get_url_parameters():

    # for key in os.environ:
    #     logging.debug(str(key) + ": " + str(os.environ[key]))

    # we set our method (either post or get)
    method = os.environ['REQUEST_METHOD'].upper()
    logging.debug(method)

    # arguments is the data returned by _____
    arguments = cgi.FieldStorage()
    logging.debug(arguments)

    # post - both sends data and makes a request (no size limit)
    if method == "POST":
        #if we use post we need to do .value on the arguments
        #loads turns it into json
        data = loads(arguments.value)
        # logging.debug(data)
        # for x in data:
        #     logging.debug(x)
        return data

    # get - you can only send it what you're requesting (size limit)
    if method == "GET":
        data = {}
        for i in arguments.keys():
            data[i] = arguments[i].value
        return data

    raise Exception("unknown request method")

# a map of the parameters to connect to the database
dbs = {
    "user": "",
    "passwd": "",
    "db": "",
    "port": 3306,
    "host": "internal-db..gridserver.com"
}

# the main meat of the function
#
def read_table(ups):
    table = ups["table"]
    # double asterisk gets all the keys of the map as the argument
    db = MySQLdb.connect(**dbs)
    # logging.debug("db connected")
    c = db.cursor()
    # c = db.cursor (MySQLdb.cursors.DictCursor)
    c.execute("SELECT * FROM " + table)
    # logging.debug("db execute")
    rows = c.fetchall()
    # logging.debug("db fetched all")
    # print 'Total Row(s):' + str(c.rowcount)
    data = {
        "count": c.rowcount,
        "rows": rows
    }
    # for row in rows:
        # print row
        #print type(row), row # tuple
        # data["rows"].append(row)
    return data



# content-type needs to be established at the
def json_response(data):
    print "Content-Type: application/json"
    print
    print data


# a map to specify the method we use for each operation
# eventually this will will have such things as create, read, update, delete, etc.
HANDLERS = {
    "get": read_table
}

def handle(ups):
    return HANDLERS[ups["type"]](ups)

def request():
    try:
        ups = get_url_parameters()
        logging.debug(ups)
        data = handle(ups)
        response = JSONEncoder().encode(data)
        # logging.debug(response)
        json_response(response)
    except:
        logging.debug("error")
        logging.debug(sys.exc_info())
        # print sys.exc_info()

# we always expect name to equal main
if __name__ == "__main__":
    request()