class Monster{
    constructor(name){
        this.name=name;
        this.level=1;
    }
    attack(){
        console.log("monster attack");
    }
    print(){
        console.log("Monster: " +this.name + ",lv: "+ this.level);
    }
}

class Orc extends Monster{
    constructor(finger){
        super.constructor("asdf", 1);
        this.finger = finger;
    }

    attack()
    {
        console.log("orc attack");
    }
    speak()
    {
        console.log("orc say hi");
    }
}


var mob1=new Monster("mob1");
mob1.attack();