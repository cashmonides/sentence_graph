// This is a way to test kernels.
// dumping ground of arbitrary test data


var testing_allowed_library = {
    time: ['past', 'present', 'future'],
    voice: ['active', 'passive'],
    mood: ['indicative', 'subjunctive'],
    transitivity: ['transitive', 'intransitive'],
    person_and_number: ['1s', '2s', '3s', '1p', '2p', '3p']
}


var testing_rules = [
    'transitive | active',
    'main & secondary => past',
    'main => indicative'
];

var testing_kernels = {
    attack : {
        transitivity: 'transitive',
        lexical_properties: null,
        english : {
            indicative: {
                active: {
                    past: 'attacked',
                    present: 'attacks',
                    future: 'will attack'
                },
                passive: {
                    past: 'was attacking',
                    present: 'is attacked',
                    future: 'will be attacked'
                }
            },
            subjunctive : {
                active: {
                    past: 'attacked',
                    present: 'attacks',
                    future: 'will attack'
                },
                passive: {
                    past: 'was attacked',
                    present: 'is attacked',
                    future: 'will be attacked'
                }
            }
        },
        latin : {
            indicative: {
                active: {
                    past: 'oppugnabat',
                    present: 'oppugnat',
                    future: 'oppugnabit'
                },
                passive: {
                    past: 'oppugnabatur',
                    present: 'oppugnatur',
                    future: 'oppugnabitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'oppugnaverit',
                    present: 'oppugnet',
                    future: 'oppugnaturus sit'
                },
                passive: {
                    past: 'oppugnatus sit',
                    present: 'oppugnetur',
                    future: 'NO SUCH FORM'
                }
            }
        },
        ssslatin : {
            indicative: {
                active: {
                    past: 'sssoppugnabat',
                    present: 'sssoppugnat',
                    future: 'sssoppugnabit'
                },
                passive: {
                    past: 'sssoppugnabatur',
                    present: 'sssoppugnatur',
                    future: 'sssoppugnabitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'sssoppugnaverit',
                    present: 'sssoppugnet',
                    future: 'sssoppugnaturus sit'
                },
                passive: {
                    past: 'sssoppugnatus sit',
                    present: 'sssoppugnetur',
                    future: 'sssNO SUCH FORM'
                }
            }
    },
    },
    speak : {
        transitivity: 'intransitive',
        lexical_properties: 'mental verb',
        english : {
            indicative: {
                active: {
                    past: 'spoke',
                    present: 'speaks',
                    future: 'will speak'
                },
                passive: {
                    past: 'was speaking',
                    present: 'is spoken',
                    future: 'will be spoken'
                }
            },
            subjunctive : {
                active: {
                    past: 'spoke',
                    present: 'speaks',
                    future: 'will speak'
                },
                passive: {
                    past: 'was spoken',
                    present: 'is spoken',
                    future: 'will be spoken'
                }
            }
        },
        latin : {
            indicative: {
                active: {
                    past: 'dicebat',
                    present: 'dicit',
                    future: 'dicet'
                },
                passive: {
                    past: 'dicebatur',
                    present: 'dicitur',
                    future: 'dicetur'
                }
            },
            subjunctive: {
                active: {
                    past: 'dixerit',
                    present: 'dicat',
                    future: 'dicturus sit'
                },
                passive: {
                    past: 'dictus sit',
                    present: 'dicatur',
                    future: 'NO SUCH FORM'
                }
            }
        },
        ssslatin : {
            indicative: {
                active: {
                    past: 'sssdicebat',
                    present: 'sssdicit',
                    future: 'sssdicet'
                },
                passive: {
                    past: 'sssdicebatur',
                    present: 'sssdicitur',
                    future: 'sssdicetur'
                }
            },
            subjunctive: {
                active: {
                    past: 'sssdixerit',
                    present: 'sssdicat',
                    future: 'sssdicturus sit'
                },
                passive: {
                    past: 'sssdictus sit',
                    present: 'sssdicatur',
                    future: 'sssNO SUCH FORM'
                }
            }
    },
    },
    love : {
        transitivity: 'transitive',
        lexical_properties: null,
        english : {
            indicative: {
                active: {
                    past: 'loved',
                    present: 'loves',
                    future: 'will love'
                },
                passive: {
                    past: 'was loved',
                    present: 'is loved',
                    future: 'will be loved'
                }
            },
            subjunctive : {
                active: {
                    past: 'loved',
                    present: 'loves',
                    future: 'will love'
                },
                passive: {
                    past: 'was loved',
                    present: 'is loved',
                    future: 'will be loved'
                }
            }
        },
        latin : {
            indicative: {
                active: {
                    past: 'amabat',
                    present: 'amat',
                    future: 'amabit'
                },
                passive: {
                    past: 'amabatur',
                    present: 'amatur',
                    future: 'amabitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'amaverit',
                    present: 'amet',
                    future: 'amaturus sit'
                },
                passive: {
                    past: 'amatus sit',
                    present: 'ametur',
                    future: 'NO SUCH FORM'
                }
            }
        },
        ssslatin : {
            indicative: {
                active: {
                    past: 'sssamabat',
                    present: 'sssamat',
                    future: 'sssamabit'
                },
                passive: {
                    past: 'sssamabatur',
                    present: 'sssamatur',
                    future: 'sssamabitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'sssamaverit',
                    present: 'sssamet',
                    future: 'sssamaturus sit'
                },
                passive: {
                    past: 'sssamatus sit',
                    present: 'sssametur',
                    future: 'sssNO SUCH FORM'
                }
            }
        }
    },
    command : {
        transitivity: 'transitive if alone',
        lexical_properties: 'verb of commanding',
        english : {
            indicative: {
                active: {
                    past: 'commanded',
                    present: 'commands',
                    future: 'will command'
                },
                passive: {
                    past: 'was commanded',
                    present: 'is commanded',
                    future: 'will be commanded'
                }
            },
            subjunctive : {
                active: {
                    past: 'commanded',
                    present: 'commands',
                    future: 'will command'
                },
                passive: {
                    past: 'was commanded',
                    present: 'is commanded',
                    future: 'will be commanded'
                }
            }
        },
        latin : {
            indicative: {
                active: {
                    past: 'iubebat',
                    present: 'iubet',
                    future: 'iubebit'
                },
                passive: {
                    past: 'iubebatur',
                    present: 'iubetur',
                    future: 'iubebitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'iuberet',
                    present: 'iubeat',
                    future: 'iussurus sit'
                },
                passive: {
                    past: 'iussus est',
                    present: 'iubetur',
                    future: 'NO SUCH FORM'
                }
            }
        },
        ssslatin : {
            indicative: {
                active: {
                    past: 'sssamabat',
                    present: 'sssamat',
                    future: 'sssamabit'
                },
                passive: {
                    past: 'sssamabatur',
                    present: 'sssamatur',
                    future: 'sssamabitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'sssamaverit',
                    present: 'sssamet',
                    future: 'sssamaturus sit'
                },
                passive: {
                    past: 'sssamatus sit',
                    present: 'sssametur',
                    future: 'sssNO SUCH FORM'
                }
            }
        }
    },
    fear : {
        transitivity: 'transitive if alone',
        lexical_properties: 'verb of fearing',
        english : {
            indicative: {
                active: {
                    past: 'feared',
                    present: 'fears',
                    future: 'will fear'
                },
                passive: {
                    past: 'was feared',
                    present: 'is feared',
                    future: 'will be feared'
                }
            },
            subjunctive : {
                active: {
                    past: 'feared',
                    present: 'fears',
                    future: 'will fear'
                },
                passive: {
                    past: 'was feared',
                    present: 'is feared',
                    future: 'will be feared'
                }
            }
        },
        latin : {
            indicative: {
                active: {
                    past: 'timebat',
                    present: 'timet',
                    future: 'timebit'
                },
                passive: {
                    past: 'timebatur',
                    present: 'timetur',
                    future: 'timebitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'timeret',
                    present: 'timeat',
                    future: 'timiturus sit'
                },
                passive: {
                    past: 'timitus est',
                    present: 'timetur',
                    future: 'NO SUCH FORM'
                }
            }
        },
        ssslatin : {
            indicative: {
                active: {
                    past: 'ssstimebat',
                    present: 'ssstimet',
                    future: 'ssstimebit'
                },
                passive: {
                    past: 'ssstimebatur',
                    present: 'ssstimetur',
                    future: 'ssstimebitur'
                }
            },
            subjunctive: {
                active: {
                    past: 'ssstimeret',
                    present: 'ssstimeat',
                    future: 'ssstimiturus sit'
                },
                passive: {
                    past: 'ssstimitus est',
                    present: 'ssstimetur',
                    future: 'sssNO SUCH FORM'
                }
            }
        }
    }
}