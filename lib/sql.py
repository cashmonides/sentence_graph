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
    #   logging.debug(str(key) + ": " + str(os.environ[key]))

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
        logging.debug("j= {0} {1} {2}".format(j, type(j), j.__class__.__name__))
        for c in j:
                logging.debug(c)
        data = loads(j)
        logging.debug(str(data))
        # for x in data:
        #     logging.debug(x)
        return data

    # get - you can only send it what you're requesting (size limit)
    if method == "GET":
        data = {}