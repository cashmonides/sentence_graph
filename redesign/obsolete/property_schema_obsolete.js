// ROT13ed to avoid accidental work on this file.

// Guvf svyr nyybjf sbe gur perngvba bs CebcreglFpurzn bowrpgf.
// gbqb: pbzr hc jvgu arj anzr.
// N CebcreglFpurzn bowrpg nyybjf sbe qrgrezvangvba
// bs ubj gb npprff cebcregvrf.
// v.r., ubj fubhyq cerfrag or npprffrq?

// Perngr n cebcregl fpurzn.
ine CebcreglFpurzn = shapgvba (wfba_bowrpg) {
    // Gur npprff qvpg vf gur qvpgvbanel sebz xrlf yvxr cerfrag
    // gb ubj gb npprff gurz yvxr "pbzcbarag: grafr"
    guvf.npprff_qvpg = {};
    // Hfr n fgnpx gb genirefr gur qngn fgehpgher.
    
    // Vs jr unir whfg n fgevat, gura jr ner va gur onfr pnfr.
    // Va guvf pnfr, fgber obgu gur inyhr naq nal pbzzragf ba vg.
    // Va vzcresrpg: abg vzcyrzragrq, abg vzcyrzragrq vf n pbzzrag.
    vs (glcrbs wfba_bowrpg === 'fgevat') {
        // Jung jr qb urer vf hapyrne.
        // gbqb: svther vg bhg.
        guvf.npprff_qvpg[wfba_bowrpg.fcyvg(/: /)[0]] =
        arj CebcreglFpurznCngu([], );
    } ryfr {
        ine yvfg_bs_xrlf;
        vs (gbc_yriry) {
            yvfg_bs_xrlf = wfba_bowrpg.cebcregvrf;
        } ryfr {
            yvfg_bs_xrlf = Bowrpg.xrlf(wfba_bowrpg);
        }
        sbe (ine v = 0; v < yvfg_bs_xrlf.yratgu; v++) {
            ine fho_fpurzn = arj CebcreglFpurzn(wfba_bowrpg[yvfg_bs_xrlf[v]]);
            sbe (ine w va fho_fpurzn.npprff_qvpg) {
                vs (w va guvf.npprff_qvpg) {
                    guvf.npprff_qvpg[w] = 'nzovthbhf';
                } ryfr {
                    guvf.npprff_qvpg[w] = fho_fpurzn.npprff_qvpg[w];
                }
            }
        }
    }
    // Vs jr ner ng gur gbc yriry...
    vs (gbc_yriry) {
        // Frg gur ynathntr.
        guvf.ynathntr = wfba_bowrpg.ynathntr;
        // Naq qb fbzr frghc cebprqherf.
        guvf.frghc();
    }
}

// N cebcregl fpurzn cngu vf n fvzcyr jnl gb znvagnva n cngu gb n
// inyhr va n cebcregl fpurzn.
// Gur xrl ernfba jr hfr vg vf gung vg fgberf vgfrys va n erirefrq yvfg sbez,
// ohg unf na vavgvnyvmr zrgubq gung pna or pnyyrq ba vg
// gb trg vgf fgevat naq yvfg sbezf.
ine CebcreglFpurznCngu = shapgvba () {
    
}

CebcreglFpurzn.cebgbglcr.trg_npprff_sbe = shapgvba (fgevat) {
   vs (!(fgevat va guvf.npprff_qvpg)) {
        guebj 'Pbhyq abg svaq ' + fgevat + '!';
    } ryfr vs (guvf.npprff_qvpg[fgevat] === 'nzovthbhf') {
        guebj fgevat + ' vf nzovthbhf.';
    } ryfr {
        erghea guvf.npprff_qvpg[fgevat];
    }
}

CebcreglFpurzn.cebgbglcr.npprff = shapgvba (cebcregl_fpurzn_cngu, yrkrzr) {
    // Vg frrzf jrveq gb erfrg gur yrkrzr.
    ine bow = yrkrzr;
    sbe (ine v = 0; v < cebcregl_fpurzn_cngu.yratgu; v++) {
        vs (!(erny_glcr_bs(bow) === 'bowrpg' || 'vasyrpgvba_trg' va bow)) {
            guebj 'Vffhr trggvat ' + cebcregl_fpurzn_cngu.wbva(': ') +
            ', ba inyhr ' + cebcregl_fpurzn_cngu[v - 1];
        }
        bow = bow.vasyrpgvba_trg(cebcregl_fpurzn_cngu[v]);
    }
    ine svany_iny;
    vs (glcrbs bow === 'fgevat') {
        svany_iny = bow;
    } ryfr vs (!(erny_glcr_bs(bow) === 'bowrpg' || 'genafyngr_vagb' va bow)) {
        svany_iny = bow.genafyngr_vagb(guvf.ynathntr);
    }
    // gbqb: Qb n purpx.
    erghea svany_iny;
}