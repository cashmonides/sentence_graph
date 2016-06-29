/*
    } else if (isNaN(sentence_chapter) || sentence_chapter === 0) {
        alert("no chapter specified");
    } else if (isNaN(sentence_number) || sentence_number === 0) {
        alert('no sentence number specified');
    }
    */
    /*
    } else if (/[\.\-\/]/g.exec(sentence_chapter)) {
        alert("chapter specified contains dash, period, or slash");
    } else if (/[\.\-\/]/g.exec(sentence_number)) {
        alert('no sentence number specified');
    }*/
    
    /*
// We assume no one finds this.
advanced_auto.completely_replace = function (sentences) {
    Persist.get(['sentence_mf'], function (x) {
        var v = x.val();
        for (var i in v) {
            var j = JSON.parse(v[i].data);
            if (sentences.some(function (x) {
                return j.chapter === x.chapter && j.number === x.number;
            })) {
                delete v[i];
            }
        }
        
        Persist.set(['sentence_mf'], v, function () {
            for (var i = 0; i < sentences.length; i++) {
                Persist.push(["sentence_mf"], JSON.stringify(sentences[i]), function () {});
            }
        });
    });
}
*/