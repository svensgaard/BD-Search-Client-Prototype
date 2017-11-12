export class BDDocument {
  refnummer: string;
  id: string;
  bId: string;
  udskriftsDato: string;
  dokType: string;
  visRaadgiver: string;
  synligNetbank: string;
  sletDato: string;
  fejlMarkeret: string;
  forsendelsesKode: string;
  n1: string;
  n1_value: string;
  n2: string;
  n2_value: string;
  tekst: string;
  tekst_value: string;
  
  detail = 'Details';
  
  constructor(refnummer: string, id: string, bId: string, udskriftsDato: string, dokType: string, visRaadgiver: string,
  synligNetbank: string, sletDato: string, fejlMarkeret: string, forsendelsesKode: string, n1: string, n1_value: string, n2: string,
  n2_value: string, tekst: string, tekst_value: string) {
    this.refnummer = refnummer;
    this.id = id;
    this.bId = bId;
    this.udskriftsDato = udskriftsDato;
    this.dokType = dokType;
    this.visRaadgiver = visRaadgiver;
    this.synligNetbank = synligNetbank;
    this.sletDato = sletDato;
    this.fejlMarkeret = fejlMarkeret;
    this.forsendelsesKode = forsendelsesKode;
    this.n1 = n1;
    this.n1_value = n1_value;
    this.n2 = n2;
    this.n2_value = n2_value;
    this.tekst = tekst;
    this.tekst_value = tekst_value;
  }
  
  get details(): string {
    console.log();
    return this.n1 + ' ' + this.n1_value + '\t' + this.n2 + this.n2_value + '\t' + this.tekst + ' ' + this.tekst_value;
  }
  
}