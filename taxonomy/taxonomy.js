/*

//the kind of order they would have after learning about six terms
var order_1 = ['vert', 'ped', 'cell', 'scop']

approaches to order:
//enveloping

//randomized


their clicking through the sequence should leave a cookie crumb trail
each decision point is somehow stored
and each decision point can be then highlighted

this could work at multiple levels
LEVEL 1: taxonomy
- they've left a cookie crumb trail which is 
'multicellular', 'macroscopic', 'bilateral symmetry', 'vertebrate', 'quadruped', 'carnivore'
if it's lion, that's the right answer
if it's eagle they made a mistake at the PED level
so all that list should be green except quadruped, which should be red
they click on the red and fix it (using the "any element can be a dropdown' appraoch)


LEVEL 2: 



*/


/* 

animals done (not in order)
wolf bear lion horse crow bull 


rough draft order of animals not finished yet:



fly, snail, millipede, kangaroo

mouse, bird, dog, cerberus, cow, centipede, sorpion, bee, fish, rabbit, pig

crocodile,*
scorpion* 
zebra (whitaker =zebra but zebra not in ls)
octopus*
unicorn mŏnŏcĕros, ōtis,
rhinocerus rhīnŏcĕros, ōtis,
chicken*
pig* (sus not porcus)
snail*
kangaroo*
millipede * (also cutio)
centipede (centipes)*
bee*

giraffe
crab
elephant
jellyfish
ram
sheep
donkey (asinine, canine, leonine, bovine)
monkey
deer (save until ablative for ungulate and by means of its hoof)
camel
shark
lobster
whale
vulture
ant
porcupine
worm (save until annelid)
wasp
sparrow
narwhal  (possibly use Mŏnŏdūs, ontos,)
manatee 
hippopotamus
leopard
mole
wombat
penguin
nightingale
wolverine
hamster
ferret
pigeon
oyster
hedgehog
opossum
yak
hummingbird
cheetah
cobra
cockroach
coyote
hawk
beetle
otter
aardvark (tubulidentatus/um??)
albatross
baboon
badger
centipede, boar,, caterpillar, ,,,, dove, dragonfly, duck, manatee, eel,, elk, flamingo,,,, goose, gnat, gorilla,,, heron, hippopotamus,, hyena,, ibis, jaguar,, ,, koala, Komodo dragon, lemur,,, mongoose, moose,, newt,.., ostrich, otter,, panther, parrot. panda, partridge, pelican,, pheasant,,, polar bear,, quai;, raccoon,, salamander, salmon, sand dollar, sardine, sea lion, sea urchin, sea horse, seal,,, shrew, skunk, sloth,,. squirrel, starling, swan, tapir, tarsier, termite, tiger, toad, turkey, turtle, walrus,, water buffalo, weasel,,,,
ibex


hydra (polypus)
hydra




*/


////THE DIFFERENT ANSWERS AT DIFFERENT LEVELS ISSUE////
/*
a human or a bird is a biped at the early level, 
but at a more advanced level the answer is something like: 
default: "biped"
advanced: "biped (originally quadrupedal)"

snake:
default: "no legs at all"
advanced: "vestigial quadruped"


a bear is:
default: "omnivore"
advanced: "omnivore/herbivore/carnivore"  //either a list or a decomposable string like this
	(maybe with an additional note after the correct answer like:
	depends on the species: most bears are omnivores, polar bears are carnivores, panda bears are herbivores)
	(maybe we should call opportunistic carnivore)
*/

////////SOME NOTATIONAL IDEAS//////
/*
@skip
there are a few places where we want to suspend the usual process
of matching a string to a category
for instance, we might want to ask whether spiders are edible or inedible
but we might not want to ask about whether dogs are edible
so we want something like skip or maybe notated as @skip


@review
some categories are hard to answer at first glance
is a dog pentadactyl?
what about species that are tetradactyl on their front legs and pentadactyl on their hind legs?
so we want a category that will mark this as tagged for further review and will suspend the category
e.g.
dactyl: '@review'
*/


var taxonomy_map = {

wolf :
{
	name: "canis lupus",
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	subphylum: "mammalia",
	subclass: "eutheria",
	order: "carnivora",
	family: "canidae",
	vor: "carnivore",
	genus: "canis",
	species: "lupus",


	vor: "carnivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "viviparous",
	therm: "endothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "skip",
	pred: "predator",
	grad: "plantigrade",
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "synapsid",
	placental: "placental"
},

bear :
{
	name: "ursus arctos", 		//ursus arctos arctos is a brown bear
								//other kinds include usrus arctos horribilis = grizzly
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	subphylum: "mammalia",
	subclass: "eutheria",
	order: "carnivora",
	family: "ursidae",
	genus: "ursus",
	species: "arctos",


	vor: {
		"default": "omnivore", 
		"species-specific": "omnivore/herbivore/carnivore"
	},
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "viviparous",
	therm: "endothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "skip",
	pred: "predator",
	grad: "plantigrade",
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "synapsid",
	placental: "placental"
},



horse : {
	name: "equus ferus caballus", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	subphylum: "mammalia",
	subclass: "eutheria",
	order: "perissodactyla",   //periss = uneven, artiodactyl = even 								number of toes
	family: "equidae",
	genus: "ursus",
	species: "arctos",


	vor: "herbivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "viviparous",
	therm: "endothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "skip",
	pred: "prey",
	grad: "plantigrade",
	ungulate: "ungulate",
	dactyl: "review",
	amniote: "amniote",
	psid: "synapsid",
	placental: "placental"
},

crow :
{
	name: "corvus corax", 		//check if there's a difference between 						   crow and raven		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	tax_class: "aves",
	subphylum: "??????",
	subclass: "eutheria",
	order: "passeriformes",   
	family: "corvidae",
	genus: "corvus",
	species: "corax",


	vor: "omnivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: ["biped", "bipedal, originally quadrepedal"],
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "oviparous",
	therm: "endothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",				//or should we say avian??    
	vis: "visible",
	aud: "audible",
	edible: "skip",
	pred: "prey",
	grad: "plantigrade",		//?????
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "sauropsid",
	placental: "na"
},

bull :
{
	name: "bos taurus", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	subphylum: "mammalia",
	subclass: "eutheria",
	order: "artiodactyla",   //periss = uneven, artiodactyl = even 								number of toes
	family: "bovidae",
	genus: "bos",
	species: "taurus",


	vor: "herbivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "viviparous",
	therm: "endothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "polygastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "edible",
	pred: "prey",
	grad: "unguligrade",		//????
	ungulate: "ungulate",
	dactyl: "review",
	amniote: "amniote",
	psid: "synapsid",
	placental: "placental"
},


lizard :
{
	name: "review", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	superclass: "tetrapoda",
	tax_class: "reptilia",
	subclass: "eutheria",
	order: "squamata",   
	suborder: "lacertilia",
	family: "review",
	genus: "review",
	species: "review",


	vor: "insectivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "review",      //are they ovoviparous?
	therm: "exothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "skip",
	pred: "prey",
	grad: "review",		//????
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "sauropsid",
	placental: "na"
},

frog :
{
	name: "???", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	superclass: "tetrapoda",
	tax_class: "amphibia",
	subclass: "??",
	clade: "salientia",
	order: "anura",   
	suborder: "review",
	family: "review",
	genus: "review",
	species: "review",


	vor: "insectivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "oviparous",     
	therm: "exothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "edible",
	pred: "both",
	grad: "review",		//????
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "????",
	placental: "na"
},

chicken :
{
	name: "gallus gallus domesticus", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	superclass: "tetrapoda",
	tax_class: "aves",
	subclass: "review",
	clade: "review",
	order: "galliformes",   
	suborder: "review",
	family: "phasianidae",
	genus: "gallus",
	species: "gallus",


	vor: "omnivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: ["biped", "bipedal, originally quadrepedal"],
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "oviparous",     
	therm: "exothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "edible",
	pred: "predator",
	grad: "review",		
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "review",
	placental: "na"
},


eagle :
{
	name: "review", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	superclass: "tetrapoda",
	tax_class: "aves",
	subclass: "review",
	clade: "review",
	order: "accipitriformes",   
	suborder: "review",
	family: "accipitridae",
	genus: "review",
	species: "review",


	vor: "carnivore",
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: ["biped", "bipedal, originally quadrepedal"],
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "oviparous",     
	therm: "exothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "edible",
	pred: "predator",
	grad: "review",		
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "review",
	placental: "na"
},


spider :
{
	name: "review", 		
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "arthropoda",
	superclass: "review",
	tax_class: "arachnida",
	subclass: "review",
	clade: "review",
	order: "araneae",   
	suborder: "review",
	family: "review",
	genus: "review",
	species: "review",


	vor: "carnivore",
	vert: "invertebrate",
	symmetr: "bilateral symmetry",
	ped: ["arthropod"],
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "oviparous",     
	therm: "ectothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "inaudible",
	edible: "inedible",
	pred: "predator",
	grad: "review",		
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "review",
	placental: "na"
},


lion :
{
	name: "panthera leo", 		//ursus arctos arctos is a brown bear
								//other kinds include usrus arctos horribilis = grizzly
	domain: "eukarya",
	kingdom: "animalia",
	phylum: "chordata",
	subphylum: "mammalia",
	subclass: "eutheria",
	order: "carnivora",
	family: "felidae",
	genus: "panthera",
	species: "leo",


	vor: ["carnivore"],
	vert: "vertebrate",
	symmetr: "bilateral symmetry",
	ped: "quadruped",
	stome: "deuterostome",
	mot: "motile",
	cell: "multicellular",
	scop: "macroscopic",
	par: "viviparous",
	therm: "endothermic",
	XXXXXX: "eukaryotic",
	troph: "heterotroph",
	extinct: "extant",
	gastr: "monogastric",
	habitat: "terrestrial",
	vis: "visible",
	aud: "audible",
	edible: "skip",
	pred: "predator",
	grad: "plantigrade",
	ungulate: "false",
	dactyl: "review",
	amniote: "amniote",
	psid: "synapsid",
	placental: "placental"
},


}