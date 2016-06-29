#!/usr/bin/python
#following 4 lines are for testing, remove when operational
print("Content-Type: application/json")
# print
# print '{"x":123}'
# exit
# The previous comment simply establishes this file as a python file.
# It also lets us determine what happened
# if we get it when we should get JSON.
from json import JSONEncoder, loads
import logging
# import MySQLdb
import sys
import cgi

import os
import re

from cltk.stem.lemma import LemmaReplacer
from cltk.tokenize.word import WordTokenizer
from peewee import *
from playhouse.csv_loader import load_csv

db = SqliteDatabase('mf_vocab.db')
lemmatizer = LemmaReplacer('latin')
tokenizer = WordTokenizer('latin')


class Word(Model):
    POS = CharField(max_length=30,default="")
    definition = TextField(default="")
    lemma = CharField(max_length=30, default="")
    princ_part_1 = CharField(max_length=30, default="")
    princ_part_2 = CharField(max_length=30, default="")
    princ_part_3 = CharField(max_length=30, default="")
    princ_part_4 = CharField(max_length=30, default="")
    unit = IntegerField(default=0)
    
    class Meta:
        database = db


def clear():
    os.system('cls' if os.name == 'nt' else 'clear')


# need to prevent adding duplicates
def seed(fname):
    load_csv(Word, fname)


def initialize():
    db.connect()


def check(word):
    words = q(word) 
    if len(words) == 0:
        return False
    else:
        return True
    

def q(word):
    words = Word.select().where(Word.lemma.contains(word))
    return words


def menu():
    print('\nEnter q to quit')
    while True:
        word = input("Enter a word to see if it is in Moreland and Fleischer: ")
        clear()
        if word == "q":
            break
        if re.match(r'.*isse$', word):
            word = word.replace('isse', 'i')

        word = lemmatizer.lemmatize(word)

        if check(word):
            print("That word is in Moreland and Fleischer")
            print("Here are the matches: \n")
            for subword in q(word):
                print(subword.princ_part_1 + ", " + subword.princ_part_2
                      + ":\t" + subword.definition)
                print('\n')
        else:
            print("That word was not found in Moreland and Fleischer\n\n")
    

def parse_input(fname):
    
    with open(fname) as f:
        text = f.read().splitlines()

    text = "".join(text)
    
    words = []
    missing = []

    text = tokenizer.tokenize(text)

    for word in text:
        word = re.split(r'[?.,-;:]', word)
        for sub in word:
            words.append(sub.lower())
    
    for word in words:
        if re.match(r'.*isse$', str(word)):
            word = str(word).replace('isse','i')

        try:
            lemma = lemmatizer.lemmatize(word, return_string=True)
        except:
            continue

        if not check(lemma):
            if re.match('[a-z]', lemma):
                print("word: " + word.ljust(20) 
                    + "lemma:" + lemma)
                missing.append(word)
        #else:
         #  print(word + " is found")

    print("\n\nPercent not in MF:  " + str(float(len(missing)/len(words))))


def main():
    initialize()
    parse_input('caligula_1.txt')

if __name__ == '__main__':
    main()