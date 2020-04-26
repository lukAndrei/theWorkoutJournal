
import { ExerciseModel } from '../models/exercise.model'
export class WorkoutModel {
    public name: string;
    public type: string;
    public exerciseList: ExerciseModel[]=[];
    public superSet = [];
    public id;
    public date;
  
    constructor(exerciseList,name?, type?, id?,date?){
          this.exerciseList = exerciseList;
          this.name = name;
          this.type = type;
          this.id = id;
          this.date = date
    }

    static fromJSONlist(a:[]){
        return a.map(w=>WorkoutModel.initiateWorkout(w))
    }
    static initiateWorkout(w){
        let emptyExerciseList = []
        return new WorkoutModel(emptyExerciseList, w.name, w.type, w.id, w.date)
    }
    addEx(exercise){
        this.exerciseList.push(exercise)
    }
    addSuperSet(superSet,noOfTimes){
        let workSet = {
            noOfTimes: noOfTimes,
            setList: superSet
        }
        this.superSet.push(workSet)  
    }
    addExToSuperSet(index,ex){
        this.superSet[index].setList.push(ex)
    }
    removeExFromSuperSet(index,name){
        this.superSet[index].setList.forEach((ex,j)=>{
            if (ex.name==name){
                this.superSet[index].setList.splice(j,1)
            }
            if (this.superSet[index].setList.length==0){
                this.removeSuperSet(index)
            }
        });
    }
    removeEx(index){
        this.exerciseList.splice(index,1)
    }
    removeSuperSet(index){
        this.superSet.splice(index,1)
    }
    removeExFromAll(name){
        this.superSet.forEach((set,i)=>{
            set.setList.forEach((ex,j)=>{
                if (ex.name==name){
                    this.superSet[i].setList.splice(j,1)
                }
            })
            if (set.length==0){
                this.removeSuperSet(i)
            }
        })

    }
 
}