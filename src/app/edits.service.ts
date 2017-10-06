
export class EditsService {

    constructor() { }

    public saveshop(shop: any) {
        console.log("saved shop", shop);
    }

    public savesnack(snack: any) {
        console.log("saved snack", snack);
    }

    public saveedit(type: string, edit: any) {
        console.log("saved edited "+type, edit);
    }

    public accept(id: any) {
        console.log("accepted edit", id);
    }

    public remove(id: any) {
        console.log("removed edit", id);
    }

}