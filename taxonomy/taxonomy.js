/* rough draft order of animals not finished yet:
fly, snail, millipede, kangaroo

lion, mouse, bird, dog, cerberus, cow, centipede, sorpion, bee, fish, rabbit, pig

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


	vor: ["carnivore", "opportunistic omnivore"],
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

horse :
{
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

}