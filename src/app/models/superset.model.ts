import { ExerciseModel } from './exercise.model';

export class SuperSetModel {
    public name = ""
    public exerciseList: ExerciseModel[];
    public rounds: number;
    public id?;
    public time: {
        hours: number,
        minutes: number,
        seconds: number
    }
    public notes: string[];
    public orderNumber: number;

    constructor(exerciseList, rounds, id?, name?, time?, notes?, orderNumber?){
        this.exerciseList = exerciseList;
        this.rounds = rounds;
        this.id = id;
        this.name = name;
        this.time = time;
        this.notes = notes;
        this.orderNumber = orderNumber
    }
    static fromJSONlist(a:[]){
        return a.map(exData => SuperSetModel.initiateExercise(exData))
    }
    static initiateExercise(exData){
        let name = exData.name;
        let setList = [];
        let rounds = exData.rounds;
        let id = exData.id;
        let time = exData.time;
        let notes = exData.notes;
        let orderNumber = exData.orderNumber;
        exData.exercises.forEach(set =>{
            let ex = ExerciseModel.initiateExercise(set);
            setList.push(ex);
        })
        return new SuperSetModel(setList,rounds,id,name,time, notes, orderNumber)
    }
    addExToSuperSet(exercise: ExerciseModel){
        this.exerciseList.push(exercise);
        this.updateExerciseOrder();
    }
    deleteExFromSet(exercise){
        this.exerciseList = this.exerciseList.filter(ex=> exercise.id !== ex.id);
        this.updateExerciseOrder();
    }
    getSuperSetEx(){
        return this.exerciseList
    }
    updateExerciseOrder(){
        this.exerciseList.map(exercise => {
            let exerciseIndex = this.exerciseList.indexOf(exercise);
            exercise.orderNumber = exerciseIndex;
        })
    }
    setRounds(rounds){
        this.rounds = rounds
    }
    addNote(note){
        this.notes.push(note)
    }
    removeNote(index){
        this.notes.splice(index,1)
    }

}