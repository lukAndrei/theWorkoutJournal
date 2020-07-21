
export class ExerciseModel {
    
    static idCounter: number = 0;
    public exId: string;
    public name: string;
    public sets: {
        reps: number;
        weight: number;
    }[];
    public distance: number;
    public units: string;
    public totalReps: number ;
    public totalSets: number ;
    public id;
    public time: {
        hours: number,
        minutes: number,
        seconds: number
    }

    constructor(sets?, name?, units?, id?, distance?, time?){

        this.sets = sets;
        this.name = name;
        this.exId = ExerciseModel.idCounter.toString();

        this.totalSets = this.sets.length;
        this.totalReps = this.getAllReps();
        this.distance = distance;
        this.id = id;
        this.units = units;
        this.time = time;
    }

    static fromJSONlist(a:[]){
        return a.map(exData => ExerciseModel.initiateExercise(exData))
    }

    static initiateExercise(exData){
        let setList = [];
        let exUnits = exData.units
        let distance = exData.distance;
        let time = exData.time
        exData.set.forEach(set =>{
            setList.push({
                reps: set.reps,
                weight: set.weight,
            })
        })
        return new ExerciseModel(setList, exData.exName, exUnits, exData.id, distance, time)
    }

    setName(name){
        this.name = name
    }
    addSet(){
        this.sets.push({reps:1, weight:0})  
        this.getAllReps()
        this.updateSets()
    }

    removeSet(){
        this.sets.pop()
        this.getAllReps()
        this.updateSets()
    }

    setReps(index,repNo:number){
        this.sets[index].reps = repNo
        this.getAllReps()
    }
    setWeight(index,weightValue:number){
        this.sets[index].weight = weightValue
    }
    setDistance(distance:number){
        this.distance = distance
    }
    setUnits(units:string){
        this.units = units
    }
    setTime(time:{
        hours: number,
        minutes: number,
        seconds: number
    }){
        this.time = time
    }

    getName(){
        return this.name
    }

    getAllReps(){
         var repNo = 0;
         this.sets.forEach((set)=>{
             repNo = repNo + (+set.reps);
         }) 
        this.totalReps = repNo
        return this.totalReps
    }
    updateSets(){
        this.totalSets = this.sets.length
    }
    getWeight(index){
        return this.sets[index].weight
    }
    getUnits(){
        return this.units
    }

    getexId(){
       return this.exId.toString()
    }
    
}