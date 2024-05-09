import { Cim } from "./cim";
import { Kosar } from "./kosar";

export interface Rendeles {

    id: string;
    azonosito: string;
    datum: Date;
    cim: Cim;
    felhasznaloId: string;
    kosar: Kosar;
    
}
