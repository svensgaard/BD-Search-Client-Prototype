import { Category } from './category';

export enum SortBy {
    Dato,
    DokType
}

export enum SortType {
    Faldende,
    Stigende
}



export class ResultWrapper {
    categories: Category[];
    sortType: SortType;
    sortBy: SortBy;

    compareDates(a: Category, b: Category): number {
        if(new Date(a.documents[0].udskriftsDato).getTime() < new Date(b.documents[0].udskriftsDato).getTime()) {
            if(this.sortType === SortType.Faldende) {
                return -1;                
            } else {
                return 1;
            }
        }
        if(new Date(a.documents[0].udskriftsDato).getTime() > new Date(b.documents[0].udskriftsDato).getTime()) {
            if(this.sortType === SortType.Faldende) {
                return 1;                
            } else {
                return -1;
            }
        }
        return 0;
    }

    compareDokTypes(a: Category, b: Category): number {
        if(a.documents[0].dokType < b.documents[0].dokType) {
            if(this.sortType === SortType.Faldende) {
                return 1;                
            } else {
                return -1;
            }
        }
        if(a.documents[0].dokType > b.documents[0].dokType) {
            if(this.sortType === SortType.Faldende) {
                return -1;                
            } else {
                return 1;
            }
        }
        return 0;
    }

    sort() {
        for(let cat of this.categories) {
            cat.sort();
        }
        if(this.sortBy === SortBy.Dato) {
            this.categories.sort(this.compareDates.bind(this));            
        } else {
            this.categories.sort(this.compareDokTypes.bind(this));
        }
    }
}