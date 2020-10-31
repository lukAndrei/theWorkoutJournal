
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
    public orderNumber: number;
    public time: {
        hours: number,
        minutes: number,
        seconds: number
    }

    constructor(sets?, name?, units?, id?, distance?, orderNumber?, time?){

        this.sets = sets;
        this.name = name;
        this.exId = ExerciseModel.idCounter.toString();
        this.totalSets = this.sets.length;
        this.totalReps = this.getAllReps();
        this.distance = distance;
        this.id = id;
        this.units = units;
        this.orderNumber = orderNumber
        this.time = time;
        
    }

    static fromJSONlist(a:[]){
        return a.map(exData => ExerciseModel.initiateExercise(exData))
    }

    static initiateExercise(exData){
        let setList = [];
        let exUnits = exData.units
        let distance = exData.distance;
        let orderNumber = exData.orderNumber;
        let time = {hours: exData.time.hours, minutes:exData.time.minutes, seconds:exData.time.seconds};
        exData.set.forEach(set =>{
            setList.push({
                reps: set.reps,
                weight: set.weight,
            })
        })
        return new ExerciseModel(setList, exData.exName, exUnits, exData.id, distance, orderNumber, time)
    }

    setName(name){
        this.name = name
    }
    addSet(){
        let lastSet = this.sets.length -1
        let reps = this.sets[lastSet].reps;
        let weight = this.sets[lastSet].weight;
        this.sets.push({reps:reps, weight:weight})  
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
    setHours(hours){
        this.time.hours = hours
    }
    setMinutes(minutes){
        this.time.minutes = minutes
    }
    setSeconds(seconds){
        this.time.seconds = seconds
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