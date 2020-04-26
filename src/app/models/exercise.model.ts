export class ExerciseModel {
    static idCounter: number = 0;
    public exId: string;
    public name: string;
    public sets: {
        reps: number;
        weight: number;  
    }[];
    public totalReps: number ;
    public totalSets: number ;
    public id;

    constructor(sets, name?, id?){
        this.sets = sets
        this.name = name
        this.exId = ExerciseModel.idCounter.toString()
        ExerciseModel.idCounter =  ExerciseModel.idCounter+1 ;
        this.totalSets = this.sets.length
        this.id = id
    }
    static fromJSONlist(a:[]){
        return a.map(exData => ExerciseModel.initiateExercise(exData))
    }
    static fromJSONSuperSet(a:[]){
        console.log(a)
        //return a.map(exData => ExerciseModel.initiateExercise(exData))
    }

    static initiateExercise(exData){
        let setList = [];
        exData.set.forEach(set =>{
            setList.push({
                reps: set.reps,
                weight: set.weight
            })
        })
        return new ExerciseModel(setList, exData.exName,exData.id)
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

  
    }
    setWeight(index,weightValue:number){
        this.sets[index].weight = weightValue
    }

    getName(){
        return this.name
    }

    getAllReps(){
         var repNo = 0;
         this.sets.forEach((set)=>{
             repNo = repNo + (+set.reps);
         }) 
        console.log(repNo)
        this.totalReps = repNo
    }
    updateSets(){
        this.totalSets = this.sets.length
    }
    getWeight(index){
        return this.sets[index].weight
    }

    getexId(){
       return this.exId.toString()
    }
    
}