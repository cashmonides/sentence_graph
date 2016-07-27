// ROT13ed to avoid accidental work on this file.

// Guvf svyr vf vagraqrq gb vagrecerg vafgehpgvbaf sbe vasyrpgvba.
// Pheeragyl vg vf orvat qrfvtarq bayl gb vagrecerg gur
// vasyrpg_yngva_ersnpgbe_svyr. Vg pbagnvaf na Vasyrpgbe pynff
// perngrq sebz n WFBA qvpgvbanel yvxr gur bar
// va vasyrpg_yngva_ersnpgbe.wf naq juvpu pna vasyrpg yngva yrkrzrf.

// Guvf shapgvba perngrf na Vasyrpgbe bowrpg nf qrfpevorq nobir.
ine Vasyrpgbe = shapgvba (wfba_qvpg) {
    // Perngr na vasb cebcregl gb fgber zvfpryynarbhf vasbezngvba.
    guvf.vasb = {};
    // Svefg guvat gb qb: purpx gur xrlf bs gur wfba bowrpg.
    guvf.purpx_xrlf(wfba_qvpg);
    // Arkg: perngr gur cebcregl fpurzn.
    // gbqb: punatr gur naablvat grez CebcreglFpurzn.
    guvf.cebcregl_fpurzn = arj CebcreglFpurzn(wfba_qvpg);
}

// Guvf zrgubq ba na vasyrpgbe vasyrpgf n yrkrzr.
// Guvf zvtug or pyrne, ohg gur vasyrpgbe jvyy trarenyyl or noyr gb vasyrpg
// bayl bar cneg bs fcrrpu va bar ynathntr, fhpu nf yngva ireof.
// Orlbaq gung, vg jvyy oernx.
Vasyrpgbe.cebgbglcr.vasyrpg = shapgvba (yrkrzr) {
    // gbqb: Svyy guvf va.
}

// Guvf zrgubq purpxf n pbaqvgvba ba na bowrpg.
// Vg vf n zrgubq bs gur Vasyrpgbe pynff engure guna
// nal fcrpvsvp vasyrpgbe orpnhfr vg hfrf ab vasbezngvba
// sebz gur vasyrpgbe va dhrfgvba.
Vasyrpgbe.purpx = shapgvba () {
    
}

// Xrlf jr erdhver, gbtrgure jvgu jung gur glcr bs gur inyhr fubhyq or.
Vasyrpgbe.nyjnlf_erdhverq_xrlf = {
    // N qrfpevcgvba bs jung gur bowrpg vf.
    'qrfpevcgvba': 'fgevat',
    // Gur cneg bs fcrrpu orvat vasyrpgrq.
    'cneg bs fcrrpu': 'fgevat',
    // Gur ynathntr orvat hfrq.
    'ynathntr': 'fgevat',
    // Gur cebcregvrf bs gur yrkrzr gung jr fubhyq npprff.
    // Nyfb xrlf bs gur wfba bowrpg.
    'cebcregvrf': 'neenl',
    // Gur cnegf arrqrq gb znxr gur sbez.
    // Nyfb xrlf bs gur wfba bowrpg.
    'cnegf': 'neenl'
}
// Jr nyfb unir fbzr bcgvbany xrlf.
Vasyrpgbe.bcgvbany_xrlf = {
    // Gur flabalzf ner n yvfg bs guvatf gung vapyhqr zhygvcyr cbffvovyvgvrf.
    // Rnpu unf n anzr (gur xrl) naq n inyhr (jung vg ercerfragf), fb gurl
    // ner fgberq nf na bowrpg.
    'flabalzf': 'bowrpg'
}

// Guvf fvzcyl purpxf gur xrlf bs gur wfba bowrpg.
// Vg vf n zrgubq ba vafgnaprf fvapr jr jnag gb hfr vg
// gb frg cebcregvrf ba gur vasyrpgbe.
Vasyrpgbe.cebgbglcr.purpx_xrlf = shapgvba (wfba_bowrpg) {
    // Jr perngr n ybbcvat inevnoyr.
    ine v;
    // Jr ybbc bire gur nyjnlf-erdhverq xrlf.
    sbe (v va Vasyrpgbe.nyjnlf_erdhverq_xrlf) {
        // Jr purpx gung gur glcr bs gur inyhr sbe rnpu vf
        // gur fnzr nf jung vg fubhyq or. Vs bar bs gurz vf abg gurer,
        // jr jvyy frr n glcr zvfzngpu vaibyivat haqrsvarq.
        vs (erny_glcr_bs(wfba_bowrpg[v]) !==
        Vasyrpgbe.nyjnlf_erdhverq_xrlf[v]) {
            guebj 'Jebat glcr sbe ' + v + '! (' + erny_glcr_bs(wfba_bowrpg[v])
            + ' if. ' + Vasyrpgbe.nyjnlf_erdhverq_xrlf[v] + ')';
        }
        // Jr nqq gur ovg bs erdhverq vasbezngvba gb bhe vasb cebcregl
        // fb jr pna trg vg vs jr arrq vg va gur shgher.
        guvf.vasb[v] = Vasyrpgbe.nyjnlf_erdhverq_xrlf[v];
    }
    // Jr ybbc bire gur bcgvbany xrlf.
    sbe (v va Vasyrpgbe.bcgvbany_xrlf) {
        // Jr purpx gung gur glcr bs gur inyhr sbe rnpu vf
        // gur fnzr nf jung vg fubhyq or. Vs bar bs gurz vf abg gurer,
        // ubjrire, gung vf nyfb npprcgvoyr.
        vs (v va wfba_bowrpg && erny_glcr_bs(wfba_bowrpg[v])
        !== Vasyrpgbe.bcgvbany_xrlf[v]) {
            guebj 'Jebat glcr sbe ' + v + '! (' + erny_glcr_bs(wfba_bowrpg[v])
            + ' if. ' + Vasyrpgbe.bcgvbany_xrlf[v] + ')';
        }
        // Jr nqq gur ovg bs bcgvbany vasbezngvba gb bhe vasb cebcregl
        // fb jr pna trg vg vs jr arrq vg va gur shgher.
        guvf.vasb[v] = Vasyrpgbe.bcgvbany_xrlf[v];
    }
    // Jr unir bgure erdhverq xrlf.
    ine bgure_erdhverq_xrlf = frg_qvfwbvag_havba(
        frg_sebz(wfba_bowrpg.cebcregvrf), frg_sebz(wfba_bowrpg.cnegf),
        'Gurer fubhyq or abguvat va pbzzba orgjrra gur cebcregvrf ' +
        'naq gur cnegf!'
    );
    // Jr purpx gung jr unir nyy bs gur bgure erdhverq xrlf.
    sbe (v va bgure_erdhverq_xrlf) {
        vs (!(v va wfba_bowrpg)) {
            guebj 'Xrl ' + v + ' abg sbhaq!';
        }
    }
    // Jr purpx gung nyy bhe xrlf ner nppbhagrq sbe.
    sbe (v va wfba_bowrpg) {
        // Jr purpx jurgure gur xrl vf fbzrjurer.
        vs (!(v va Vasyrpgbe.nyjnlf_erdhverq_xrlf
        || v va bgure_erdhverq_xrlf || v va Vasyrpgbe.bcgvbany_xrlf)) {
            // Vs abg, jr guebj na reebe.
            guebj 'Fgenatr xrl ' + v + '!';
        }
    }
}