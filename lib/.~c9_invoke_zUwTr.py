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
        j = arguments.value
        logging.debug("J={0} {1}".format(j, type(j)))
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
    "user": "db211804_dummy2",
    "passwd": "Dummy2@12345",
    "db": "db211804_bestiary_database",
    "port": 3306,
    "host": "internal-db.s211804.gridserver.com"
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

#todo add a try catch statement at c.execute
def insert_time_data(ups):
    try:
        row = ups["data"]
        # modes = ups["modes"]
        logging.debug("in insert time data row={0}".format(row))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        c.execute("INSERT INTO time_metrics VALUES (null, %s, %s, %s, %s,  now(), null,)", row)   # slice = (row[0], row[1], row[2], row[3])
        # c.execute("INSERT INTO time_metrics VALUES (null, %s, null, null, null, null, null, %s, %s, now(), " + ups["null_string"] + ")", row)
        
        
        
        # c.execute("INSERT INTO time_metrics VALUES (null, %s, null, null, null, null, null, %s, %s, now(), " + ups["null_string"] + ")", row)
        
        
        time_data_id = c.lastrowid
        # for i in modes:
        #     c.execute("INSERT INTO accuracy_id VALUES (" + str(time_data_id)
        #     + ", null, null, null, null, \"" + i + "\")", [])
        #returns the unique id of the row just inserted
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True,
            "id": time_data_id
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "row": row
        }
        
        return data
        
def update_time_data(ups):
    try:
        row = ups["data"]
        logging.debug("in update time data row={0}".format(row))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        c.execute("UPDATE time_metrics SET stop_time = now() WHERE id = %s", [row])
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "row": row
        }
        
        return data


def insert_mf_metrics(ups):
    try:
        row = ups["data"]
        # modes = ups["modes"]
        logging.debug("in insert mf row={0}".format(row))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        c.execute("INSERT INTO mf1_metrics VALUES (null, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, now(), null)", row)   # slice = (row[0], row[1], row[2], row[3])
        # c.execute("INSERT INTO time_metrics VALUES (null, %s, null, null, null, null, null, %s, %s, now(), " + ups["null_string"] + ")", row)
        
        
        
        # c.execute("INSERT INTO time_metrics VALUES (null, %s, null, null, null, null, null, %s, %s, now(), " + ups["null_string"] + ")", row)
        
        
        mf_metrics_id = c.lastrowid
        # for i in modes:
        #     c.execute("INSERT INTO accuracy_id VALUES (" + str(time_data_id)
        #     + ", null, null, null, null, \"" + i + "\")", [])
        #returns the unique id of the row just inserted
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True,
            "id": mf_metrics_id
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "row": row
        }
        
        return data


def update_mf_metrics(ups):
    try:
        row = ups["data"]
        logging.debug("in update time data row={0}".format(row))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        c.execute("UPDATE time_metrics SET completed_ratio = %s, skipped_ratio = %s, " +
        "status = %s, stop_time = now() WHERE id = %s", row)
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "row": row
        }
        
        return data


'''
#todo add a try catch statement at c.execute
def insert_accuracy_data(ups):
    try:
        row = ups["data"]
        modes = ups["modes"]
        logging.debug("row={0}".format(row))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        # c.execute("INSERT INTO time_metrics VALUES (null, %s, %s, %s, %s, %s, %s, %s, %s, now(), " + ups["null_string"] + ")", row)   # slice = (row[0], row[1], row[2], row[3])
        time_data_id = row["last_id"]
        for i in modes:
            c.execute("INSERT INTO accuracy_id VALUES (" + str(time_data_id)
            + ", null, null, null, null, \"" + i + "\")", [])
        #returns the unique id of the row just inserted
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True,
            "id": time_data_id
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "row": row,
            "modes": modes
        }
        
        return data



def update_accuracy_data(ups):
    try:
        row = ups["data"]
        logging.debug("row={0}".format(row))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        c.execute("UPDATE time_metrics SET stop_time = now() WHERE id = %s", [row])
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "row": row
        }
        
        return data
'''

'''
def update_accuracy_old(ups):
    try:
        row = ups["data"]
        accuracy_dictionary = ups["accuracy_dictionary"]
        # accuracy_dict2 = ups["accuracy_dict2"]
        logging.debug("in update accuracy old row, accuracy_dictionary = {0}, {1}".
        format(row, accuracy_dictionary))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        # logging.debug("accuracy_dictionary={0}".format(accuracy_dictionary))
        # This should work.
        for i in accuracy_dictionary:
            csv = accuracy_dictionary[i]
            c.execute("UPDATE time_metrics SET " + str(i) + " = " + str(csv) +
            " WHERE id =" + str(row), [])
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "accuracy_dictionary": accuracy_dictionary
        }
        
        return data
'''


def update_accuracy_new(ups):
    try:
        row = ups["data"]
        accuracy_dictionary = ups["accuracy_dictionary"]
        logging.debug("in update accuracy new row, accuracy_dictionary = {0}, {1}".
        format(row, accuracy_dictionary))
        # double asterisk gets all the keys of the map as the argument
        db = MySQLdb.connect(**dbs)
        # logging.debug("db connected")
        c = db.cursor()
        # c = db.cursor (MySQLdb.cursors.DictCursor)
        
        #shouldn't it be str(row[0])? Or is row[0] given as str?
        # In python, "INSERT INTO time_metrics VALUES (" + 6 gives an error.
        #c.execute("INSERT INTO time_metrics VALUES (" + row[0] + ", " + row[1] + \
        #    ", " + row[2] + ", \"" + row[3] + "\", \"" + row[4] + "\")")
        # Makes sure everything (even None) becomes a string.
        #c.execute("INSERT INTO time_metrics VALUES (" + str(row[0])+ ", " + str(row[1]) + \
        #  ", " + str(row[2]) + ", \"" + str(row[3]) + "\", \"" + str(row[4]) + "\")")
        # logging.debug("accuracy_dictionary={0}".format(accuracy_dictionary))
        # This should work.
        for j in accuracy_dictionary:
            l = []
            for k in range(0, 4):
                l.append(str(accuracy_dictionary[j][str(k)]))
            c.execute("INSERT INTO accuracy_metrics VALUES (null, " + str(row) + ", " + ", ".join(l) +
            ", \"" + j + "\")", [])
        db.commit()
        # logging.debug("db execute")
        # rows = c.fetchall()
        # logging.debug("db fetched all")
        # print 'Total Row(s):' + str(c.rowcount)
        data = {
            "success": True
        }
        # for row in rows:
            # print row
            #print type(row), row # tuple
            # data["rows"].append(row)
        return data
    except Exception as e:
        logging.debug(str(e))
        data = {
            "success": False,
            "error": str(e),
            "error_type": type(e),
            "accuracy_dictionary": accuracy_dictionary
        }
        
        return data

# content-type needs to be established at the
def json_response(data):
    print "Content-Type: application/json"
    print
    print data


# a map to specify the method we use for each operation
# eventually this will will have such things as create, read, update, delete, etc.
HANDLERS = {
    "get": read_table,
    "insert_time_data": insert_time_data,
    "update_time_data": update_time_data,
    "insert_mf_metrics": insert_mf_metrics,
    "update_mf_metrics": update_mf_metrics,
    # "update_accuracy_old": update_accuracy_old,
    "update_accuracy_new": update_accuracy_new
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
