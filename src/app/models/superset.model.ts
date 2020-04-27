import { ExerciseModel } from './exercise.model';

export class SuperSetModel {
    public exerciseList: ExerciseModel[];
    public rounds: number;
    public id?;

    constructor(exerciseList, rounds, id?){
        this.exerciseList = exerciseList;
        this.rounds = rounds;
        this.id = id;
    }
    static fromJSONlist(a:[]){
        return a.map(exData => SuperSetModel.initiateExercise(exData))
    }
    static initiateExercise(exData){
        let setList = [];
        let rounds = exData.rounds
        exData.exercises.forEach(set =>{
            let ex = ExerciseModel.initiateExercise(set)
            setList.push(ex)
        })
        return new SuperSetModel(setList,rounds)
    }
    addSuperSet(exercise: ExerciseModel){
        this.exerciseList.push(exercise)
    }

    setRounds(rounds){
        this.rounds = rounds
    }
    getSuperSetEx(){
        return this.exerciseList
    }

}